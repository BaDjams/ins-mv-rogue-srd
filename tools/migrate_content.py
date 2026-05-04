#!/usr/bin/env python3
"""
Migration MkDocs → Astro Starlight
- Ajoute frontmatter (title, description, sidebar.order)
- Convertit les admonitions MkDocs en blocs HTML stylables
- Place chaque fichier dans son sous-répertoire Starlight
"""
import re
import os
from pathlib import Path

ROOT   = Path(__file__).parent.parent
DOCS   = ROOT / "docs"
OUT    = ROOT / "src" / "content" / "docs"

# Mapping source → (destination, sidebar.order, sidebar.label override)
PAGES = [
    # (source,                       dest,                                         order, label)
    ("index.md",                    "index.md",                                    0,    None),
    ("srd.md",                      "srd.md",                                      1,    None),
    ("contexte.md",                 "contexte/contexte.md",                        1,    "Le monde du jeu"),
    ("caracteristiques.md",         "personnage/caracteristiques.md",              1,    None),
    ("creation.md",                 "personnage/creation.md",                      2,    "Création d'âme"),
    ("rang.md",                     "personnage/rang.md",                          3,    "Rang céleste"),
    ("progression.md",              "personnage/progression.md",                   4,    None),
    ("reincarnation.md",            "personnage/reincarnation.md",                 5,    "Réincarnation"),
    ("resolution.md",               "mecanique/resolution.md",                     1,    "Résolution D666"),
    ("combat.md",                   "mecanique/combat.md",                         2,    "Combat & initiative"),
    ("pouvoirs.md",                 "mecanique/pouvoirs.md",                       3,    None),
    ("competences.md",              "mecanique/competences.md",                    4,    "Compétences"),
    ("energie.md",                  "mecanique/energie.md",                        5,    "Énergie"),
    ("blessures.md",                "mecanique/blessures.md",                      6,    None),
    ("mots-cles.md",                "reference/mots-cles.md",                      1,    "Mots-clés"),
    ("etats.md",                    "reference/etats.md",                          2,    "États"),
    ("equipement.md",               "reference/equipement/index.md",               3,    "Vue d'ensemble"),
    ("equipement-melee.md",         "reference/equipement/melee.md",               1,    "Armes de mêlée"),
    ("equipement-armes-feu.md",     "reference/equipement/armes-feu.md",           2,    "Armes à feu"),
    ("equipement-distance.md",      "reference/equipement/distance.md",            3,    "Armes à distance"),
    ("equipement-explosifs.md",     "reference/equipement/explosifs.md",           4,    None),
    ("equipement-protections.md",   "reference/equipement/protections.md",         5,    None),
    ("equipement-boucliers.md",     "reference/equipement/boucliers.md",           6,    None),
    ("simulateur.md",               "simulateur.md",                               10,   None),
    ("generateur.md",               "generateur.md",                               11,   None),
]

# Types d'admonitions MkDocs → classe CSS
ADMONITION_TYPES = {
    "note": "note", "info": "note", "abstract": "note", "summary": "note", "tldr": "note",
    "tip": "tip", "hint": "tip", "important": "tip",
    "warning": "warning", "caution": "warning", "attention": "warning",
    "danger": "danger", "error": "danger",
    "example": "example",
    "quote": "quote", "cite": "quote",
}


def extract_title(content: str) -> tuple[str, str]:
    """Retourne (titre_plain, contenu_sans_h1)."""
    lines = content.splitlines(keepends=True)
    for i, line in enumerate(lines):
        m = re.match(r'^#\s+(.+)', line)
        if m:
            raw = m.group(1).strip()
            # Retire les marqueurs Markdown (**, *, __, _, `)
            title = re.sub(r'[*_`]+', '', raw).strip()
            rest = "".join(lines[:i] + lines[i+1:]).lstrip("\n")
            return title, rest
    return "Sans titre", content


def convert_admonitions(content: str) -> str:
    """
    Convertit les admonitions MkDocs en divs HTML.
    Forme : !!! type "Titre optionnel"\n    contenu indenté (4 espaces)
    Forme collapsible : ??? type "Titre" (même traitement)
    """
    def replace(m):
        kind_raw = m.group(1).lower()
        kind = ADMONITION_TYPES.get(kind_raw, "note")
        title = m.group(2) if m.group(2) else kind_raw.capitalize()
        body_indented = m.group(3)
        # Retire l'indentation de 4 espaces
        body = re.sub(r"^ {4}", "", body_indented, flags=re.MULTILINE).strip()
        return (
            f'\n<div class="admonition {kind}">\n'
            f'<p class="admonition-title">{title}</p>\n\n'
            f'{body}\n'
            f'</div>\n'
        )

    pattern = re.compile(
        r'^[!?]{3} (\w+)(?:\s+"([^"]*)")?\n((?:(?:    |\t).+\n?)*)',
        re.MULTILINE
    )
    return pattern.sub(replace, content)


def build_frontmatter(title: str, order: int, label: str | None) -> str:
    fm = f"---\ntitle: {title}\n"
    if label:
        fm += f"sidebar:\n  order: {order}\n  label: \"{label}\"\n"
    else:
        fm += f"sidebar:\n  order: {order}\n"
    fm += "---\n\n"
    return fm


def migrate():
    for src_name, dest_rel, order, label in PAGES:
        src_path = DOCS / src_name
        if not src_path.exists():
            print(f"  ABSENT  {src_name}")
            continue

        raw = src_path.read_text(encoding="utf-8")
        title, body = extract_title(raw)
        body = convert_admonitions(body)
        fm = build_frontmatter(title, order, label)

        dest_path = OUT / dest_rel
        dest_path.parent.mkdir(parents=True, exist_ok=True)
        dest_path.write_text(fm + body, encoding="utf-8")
        print(f"  OK  {src_name:40s} -> {dest_rel}")

    print("\nMigration terminée.")


if __name__ == "__main__":
    migrate()
