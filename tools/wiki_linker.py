#!/usr/bin/env python3
"""
wiki_linker.py — Outil de wiki-linking pour INS-MV ROGUE SRD (Astro/Starlight)

Identifie les mentions de règles dans les fichiers .md de src/content/docs/
et crée des liens relatifs conformes à Astro Starlight.

Usage :
    python tools/wiki_linker.py [--dry-run] [--file src/content/docs/mecanique/combat.md]

Options :
    --dry-run   Affiche les modifications sans écrire les fichiers
    --file      Traite uniquement le fichier spécifié
    --reset     Supprime tous les liens wiki existants (mode déliage)
"""

import os
import re
import sys
import argparse
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = open(sys.stdout.fileno(), mode="w", encoding="utf-8", buffering=1)

try:
    import yaml
except ImportError:
    print("PyYAML manquant. Installe avec : pip install pyyaml")
    sys.exit(1)

TOOLS_DIR = Path(__file__).parent
DOCS_DIR = TOOLS_DIR.parent / "src" / "content" / "docs"
CONFIG_FILE = TOOLS_DIR / "wiki_links.yml"


# ── Index des pages ────────────────────────────────────────────────────────────

def build_page_index() -> dict[str, Path]:
    """
    Construit slug → chemin absolu pour tous les .md dans DOCS_DIR.
    Le slug est le chemin relatif à DOCS_DIR sans extension.
    Ex: "mecanique/resolution" → Path(".../mecanique/resolution.md")
    """
    index = {}
    for path in DOCS_DIR.rglob("*.md"):
        slug = path.relative_to(DOCS_DIR).with_suffix("").as_posix()
        index[slug] = path
    return index


def resolve_link(source_path: Path, target_slug: str, page_index: dict, anchor: str = "") -> str:
    """
    Calcule le lien relatif (sans .md) de source_path vers target_slug.
    Ex: de mecanique/combat.md vers reference/etats → ../reference/etats
    """
    target_path = page_index.get(target_slug)
    if target_path is None:
        return target_slug  # fallback si slug inconnu

    rel = os.path.relpath(str(target_path), str(source_path.parent))
    rel = Path(rel).with_suffix("").as_posix()  # supprime .md, normalise séparateurs

    if anchor:
        rel += "#" + anchor
    return rel


# ── Tokenisation ───────────────────────────────────────────────────────────────

PROTECTED_PATTERNS = [
    r"```[\s\S]*?```",           # blocs de code délimités
    r"~~~[\s\S]*?~~~",           # blocs de code alternatifs
    r"`[^`\n]+`",                # code inline
    r"!\[[^\]]*\]\([^)]*\)",     # images ![alt](url)
    r"\[[^\]]*\]\([^)]*\)",      # liens existants [text](url)
    r"\[[^\]]*\]\[[^\]]*\]",     # liens référence [text][ref]
    r"^\s{0,3}#{1,6}[^\n]*",    # titres
    r"^\s{0,3}[!?]{3}[^\n]*",   # en-têtes d'admonitions
    r"^\s*\|[^\n]*",             # lignes de tableau
    r"<[^>]+>",                  # balises HTML
]

_PROTECTED_RE = re.compile(
    "|".join(f"(?:{p})" for p in PROTECTED_PATTERNS),
    re.MULTILINE,
)


def tokenize(text: str) -> list[tuple[str, str]]:
    """Découpe le texte en segments (protected | text)."""
    tokens = []
    last = 0
    for m in _PROTECTED_RE.finditer(text):
        if m.start() > last:
            tokens.append(("text", text[last:m.start()]))
        tokens.append(("protected", m.group()))
        last = m.end()
    if last < len(text):
        tokens.append(("text", text[last:]))
    return tokens


def untokenize(tokens: list[tuple[str, str]]) -> str:
    return "".join(v for _, v in tokens)


# ── Application des liens ──────────────────────────────────────────────────────

def apply_links_to_text(
    segment: str, term_pattern: re.Pattern, url: str, already_linked: set
) -> tuple[str, bool]:
    m = term_pattern.search(segment)
    if m and m.group(0).lower() not in already_linked:
        matched = m.group(0)
        replacement = f"[{matched}]({url})"
        segment = segment[:m.start()] + replacement + segment[m.end():]
        already_linked.add(matched.lower())
        return segment, True
    return segment, False


def process_content(text: str, links_config: list, source_path: Path, page_index: dict) -> str:
    """Applique tous les liens wiki sur le contenu d'un fichier."""
    tokens = tokenize(text)
    linked_terms: set[str] = set()
    source_slug = source_path.relative_to(DOCS_DIR).with_suffix("").as_posix()

    for entry in links_config:
        target_slug = entry["target"]
        # Ne pas lier un terme à la page qui le définit
        if target_slug == source_slug:
            continue

        url = resolve_link(source_path, target_slug, page_index, entry.get("anchor", ""))
        first_only = entry.get("first_only", True)

        for term in entry["terms"]:
            if first_only and term.lower() in linked_terms:
                continue

            try:
                pattern = re.compile(
                    r"(?<!\w)" + re.escape(term) + r"(?!\w)",
                    re.IGNORECASE,
                )
            except re.error:
                continue

            modified_tokens = []
            term_linked = False
            for kind, value in tokens:
                if kind == "text" and not (first_only and term_linked):
                    new_value, changed = apply_links_to_text(value, pattern, url, linked_terms)
                    modified_tokens.append((kind, new_value))
                    if changed:
                        term_linked = True
                else:
                    modified_tokens.append((kind, value))
            tokens = modified_tokens

    return untokenize(tokens)


# ── Mode déliage ───────────────────────────────────────────────────────────────

# Correspond à tout lien Markdown inline [text](url) — exclut les images ![alt](url)
_WIKI_LINK_RE = re.compile(r"(?<!!)(?<!\])\[([^\]]+)\]\(([^)]+)\)")


def remove_wiki_links(text: str, links_config: list) -> str:
    """
    Supprime les liens vers des pages du SRD (avec ou sans extension .md).
    Identifie une cible par son stem/nom (sans extension ni répertoire).
    Ignore les URLs externes (contenant ://).
    """
    known_stems = {entry["target"].split("/")[-1] for entry in links_config}

    def replacer(m):
        label, url = m.group(1), m.group(2)
        if "://" in url:
            return m.group(0)  # lien externe, on ne touche pas
        path = url.split("#")[0].rstrip("/")
        # Stem : nom de fichier sans extension (gère .md et sans extension)
        p = Path(path)
        stem = p.stem if p.suffix else p.name
        if stem in known_stems:
            return label
        return m.group(0)

    return _WIKI_LINK_RE.sub(replacer, text)


# ── Entrée principale ──────────────────────────────────────────────────────────

def load_config() -> list:
    with CONFIG_FILE.open(encoding="utf-8") as f:
        data = yaml.safe_load(f)
    return data.get("links", [])


def process_file(path: Path, links_config: list, page_index: dict, dry_run: bool, reset: bool):
    text = path.read_bytes().decode("utf-8").replace("\r\n", "\n")

    if reset:
        result = remove_wiki_links(text, links_config)
    else:
        result = process_content(text, links_config, path, page_index)

    if result == text:
        print(f"  (inchangé)  {path.relative_to(DOCS_DIR)}")
        return

    if dry_run:
        import difflib
        diff = difflib.unified_diff(
            text.splitlines(keepends=True),
            result.splitlines(keepends=True),
            fromfile=f"a/{path.relative_to(DOCS_DIR)}",
            tofile=f"b/{path.relative_to(DOCS_DIR)}",
            n=1,
        )
        print("".join(list(diff)[:80]))
    else:
        path.write_bytes(result.encode("utf-8"))
        print(f"  ✓  {path.relative_to(DOCS_DIR)}")


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--dry-run", action="store_true", help="Pas d'écriture")
    parser.add_argument("--file", help="Chemin vers un fichier .md spécifique")
    parser.add_argument("--reset", action="store_true", help="Supprime les liens wiki existants")
    args = parser.parse_args()

    links_config = load_config()
    page_index = build_page_index()

    if not page_index:
        print(f"Aucun fichier .md trouvé dans {DOCS_DIR}. Vérifie le chemin.")
        sys.exit(1)

    if args.file:
        files = [Path(args.file)]
    else:
        files = sorted(DOCS_DIR.rglob("*.md"))

    mode = "RESET" if args.reset else ("DRY-RUN" if args.dry_run else "APPLY")
    print(f"[wiki_linker] Mode : {mode} — {len(files)} fichier(s)")
    print(f"[wiki_linker] Docs : {DOCS_DIR}\n")

    for path in files:
        process_file(path, links_config, page_index, dry_run=args.dry_run, reset=args.reset)

    print("\nTerminé.")


if __name__ == "__main__":
    main()
