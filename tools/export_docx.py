#!/usr/bin/env python3
"""
Génère public/downloads/ins-mv-rogue-srd.docx à partir des fichiers markdown du SRD.

Dépendances :
    pip install python-docx markdown

Usage :
    python tools/export_docx.py
"""

import re
from pathlib import Path

from docx import Document
from docx.shared import Pt, RGBColor, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

DOCS_DIR = Path("src/content/docs")
OUTPUT   = Path("public/downloads/ins-mv-rogue-srd.docx")

EXPORT_ORDER = [
    "srd",
    "contexte/contexte",
    "personnage/caracteristiques",
    "personnage/creation",
    "personnage/progression",
    "personnage/rang",
    "personnage/reincarnation",
    "mecanique/resolution",
    "mecanique/combat",
    "mecanique/competences",
    "mecanique/energie",
    "mecanique/pouvoirs",
    "mecanique/blessures",
    "reference/mots-cles",
    "reference/etats",
    "reference/equipement/index",
    "reference/equipement/armes-feu",
    "reference/equipement/melee",
    "reference/equipement/distance",
    "reference/equipement/explosifs",
    "reference/equipement/protections",
    "reference/equipement/boucliers",
]

# ── Couleurs thème ────────────────────────────────────────────────────────────

BLUE_ANGEL  = RGBColor(0x2B, 0x6C, 0xB0)   # saphir angélique
RED_INTENSE = RGBColor(0xC5, 0x30, 0x30)   # rouge intensité
GOLD_DIVINE = RGBColor(0x92, 0x70, 0x0A)   # or divin
GREY_DIM    = RGBColor(0x4A, 0x4A, 0x6A)

# ── Helpers XML ──────────────────────────────────────────────────────────────

def _set_cell_shading(cell, hex_fill):
    tc   = cell._tc
    tcPr = tc.get_or_add_tcPr()
    shd  = OxmlElement("w:shd")
    shd.set(qn("w:val"),   "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"),  hex_fill)
    tcPr.append(shd)


def _add_border_left(paragraph, hex_color="2B6CB0", size_pt=12):
    pPr = paragraph._p.get_or_add_pPr()
    pBdr = OxmlElement("w:pBdr")
    left = OxmlElement("w:left")
    left.set(qn("w:val"),   "single")
    left.set(qn("w:sz"),    str(size_pt * 8))
    left.set(qn("w:space"), "8")
    left.set(qn("w:color"), hex_color)
    pBdr.append(left)
    pPr.append(pBdr)


# ── Markdown inline parser ────────────────────────────────────────────────────

_INLINE_RE = re.compile(
    r'(\*\*\*(?P<boi>.+?)\*\*\*'
    r'|\*\*(?P<bo>.+?)\*\*'
    r'|\*(?P<it>.+?)\*'
    r'|`(?P<code>.+?)`'
    r'|\[(?P<lt>[^\]]+)\]\([^\)]+\)'   # lien → texte seul
    r')'
)

def add_inline(para, raw_text):
    """Ajoute du texte avec mise en forme inline (gras/italique/code/liens)."""
    text = re.sub(r'<[^>]+>', '', raw_text)   # strip HTML résiduel
    last = 0
    for m in _INLINE_RE.finditer(text):
        before = text[last:m.start()]
        if before:
            para.add_run(before)
        if m.group("boi"):
            r = para.add_run(m.group("boi"))
            r.bold = True; r.italic = True
        elif m.group("bo"):
            para.add_run(m.group("bo")).bold = True
        elif m.group("it"):
            para.add_run(m.group("it")).italic = True
        elif m.group("code"):
            r = para.add_run(m.group("code"))
            r.font.name = "Courier New"; r.font.size = Pt(9)
        elif m.group("lt"):
            r = para.add_run(m.group("lt"))
            r.font.color.rgb = BLUE_ANGEL
        last = m.end()
    tail = text[last:]
    if tail:
        para.add_run(tail)


# ── Frontmatter ───────────────────────────────────────────────────────────────

def strip_frontmatter(text):
    """Retourne (title, body) après suppression du frontmatter YAML."""
    m = re.match(r'^---\n(.*?)\n---\n?(.*)', text, re.DOTALL)
    if not m:
        return '', text
    fm, body = m.group(1), m.group(2)
    t = re.search(r'^title:\s*["\']?(.+?)["\']?\s*$', fm, re.MULTILINE)
    return (t.group(1).strip() if t else ''), body.strip()


# ── Convertisseur principal ───────────────────────────────────────────────────

def process_content(doc, content):
    lines = content.split('\n')
    i = 0
    table_rows = []

    def flush_table():
        nonlocal table_rows
        if not table_rows:
            return
        cols = max(len(r) for r in table_rows)
        t = doc.add_table(rows=len(table_rows), cols=cols)
        t.style = "Table Grid"
        for ri, row in enumerate(table_rows):
            for ci in range(cols):
                cell = t.rows[ri].cells[ci]
                val  = row[ci] if ci < len(row) else ''
                val  = re.sub(r'\*\*(.+?)\*\*', r'\1', val)
                val  = re.sub(r'\*(.+?)\*',     r'\1', val)
                val  = re.sub(r'`(.+?)`',        r'\1', val)
                val  = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', val)
                cell.text = val.strip()
                if ri == 0:
                    _set_cell_shading(cell, "E8E8F0")
                    for run in cell.paragraphs[0].runs:
                        run.bold = True
        doc.add_paragraph()
        table_rows = []

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Ligne vide
        if not stripped:
            flush_table()
            i += 1
            continue

        # Blocs HTML (admonitions, cards, div personnalisés)
        if stripped.startswith('<') and not stripped.startswith('</'):
            html_lines = []
            depth = 0
            while i < len(lines):
                l = lines[i]
                html_lines.append(l)
                depth += l.count('<div') - l.count('</div')
                i += 1
                if depth <= 0 and len(html_lines) > 1:
                    break
            block = '\n'.join(html_lines)
            text  = re.sub(r'<[^>]+>', ' ', block)
            text  = re.sub(r'\s+', ' ', text).strip()
            if not text:
                continue
            is_title = 'admonition-title' in block
            p = doc.add_paragraph()
            if is_title:
                r = p.add_run(text)
                r.bold = True; r.font.color.rgb = BLUE_ANGEL
            else:
                _add_border_left(p)
                p.paragraph_format.left_indent = Cm(0.5)
                add_inline(p, text)
            continue

        # Séparateur horizontal
        if re.match(r'^[-*_]{3,}$', stripped):
            flush_table()
            p = doc.add_paragraph('─' * 60)
            p.runs[0].font.color.rgb = GREY_DIM
            i += 1
            continue

        # Titres
        m = re.match(r'^(#{1,6})\s+(.+)$', stripped)
        if m:
            flush_table()
            level = min(len(m.group(1)), 6)
            text  = re.sub(r'<[^>]+>', '', m.group(2))
            text  = re.sub(r'\*\*(.+?)\*\*', r'\1', text)
            text  = re.sub(r'\*(.+?)\*',     r'\1', text)
            doc.add_heading(text.strip(), level=level)
            i += 1
            continue

        # Tableau markdown
        if '|' in stripped and stripped.startswith('|'):
            if re.match(r'^\|[-:\s|]+\|$', stripped):
                i += 1
                continue
            cells = [c.strip() for c in stripped.strip('|').split('|')]
            table_rows.append(cells)
            i += 1
            continue

        flush_table()

        # Listes à puces
        m_ul = re.match(r'^(\s*)-\s+(.+)$', line)
        if m_ul:
            indent = len(m_ul.group(1)) // 2
            p = doc.add_paragraph(style='List Bullet')
            p.paragraph_format.left_indent = Cm(0.5 + indent * 0.5)
            add_inline(p, m_ul.group(2))
            i += 1
            continue

        # Listes numérotées
        m_ol = re.match(r'^(\s*)\d+\.\s+(.+)$', line)
        if m_ol:
            indent = len(m_ol.group(1)) // 2
            p = doc.add_paragraph(style='List Number')
            p.paragraph_format.left_indent = Cm(0.5 + indent * 0.5)
            add_inline(p, m_ol.group(2))
            i += 1
            continue

        # Paragraphe ordinaire
        if stripped:
            p = doc.add_paragraph()
            add_inline(p, stripped)
        i += 1

    flush_table()


# ── Document setup ────────────────────────────────────────────────────────────

def setup_styles(doc):
    """Applique les styles de base au document."""
    normal = doc.styles['Normal']
    normal.font.name = 'Cambria'
    normal.font.size = Pt(11)

    for i in range(1, 7):
        try:
            h = doc.styles[f'Heading {i}']
            h.font.name  = 'Cambria'
            h.font.color.rgb = BLUE_ANGEL if i <= 2 else RGBColor(0x1A, 0x1A, 0x2E)
            h.font.size  = Pt(max(20 - i * 2, 10))
        except KeyError:
            pass

    # Marges du document
    for section in doc.sections:
        section.top_margin    = Cm(2.5)
        section.bottom_margin = Cm(2.5)
        section.left_margin   = Cm(3)
        section.right_margin  = Cm(3)


# ── Page de titre ─────────────────────────────────────────────────────────────

def add_title_page(doc):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(120)
    r = p.add_run("INS·MV ROGUE")
    r.font.name  = "Cambria"
    r.font.size  = Pt(32)
    r.font.bold  = True
    r.font.color.rgb = BLUE_ANGEL

    p2 = doc.add_paragraph()
    p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r2 = p2.add_run("System Reference Document")
    r2.font.name = "Cambria"
    r2.font.size = Pt(18)
    r2.font.color.rgb = GREY_DIM

    doc.add_page_break()


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    doc = Document()
    setup_styles(doc)
    add_title_page(doc)

    for slug in EXPORT_ORDER:
        path = DOCS_DIR / (slug + '.md')
        if not path.exists():
            print(f"  ⚠ {path} introuvable, ignoré.")
            continue

        text         = path.read_text(encoding='utf-8')
        title, body  = strip_frontmatter(text)
        print(f"  ✓ {slug}: {title}")

        if title:
            doc.add_heading(title, level=1)

        process_content(doc, body)
        doc.add_page_break()

    doc.save(OUTPUT)
    print(f"\nFichier généré : {OUTPUT}")


if __name__ == '__main__':
    main()
