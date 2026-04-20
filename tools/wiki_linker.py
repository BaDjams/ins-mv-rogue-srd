#!/usr/bin/env python3
"""
wiki_linker.py — Outil de wiki-linking pour INS-MV ROGUE SRD

Identifie les mentions de règles et chapitres dans les fichiers .md
et crée des liens automatiques pointant vers la page définissant la règle,
à la manière d'un wiki.

Usage :
    python tools/wiki_linker.py [--dry-run] [--file docs/combat.md]

Options :
    --dry-run   Affiche les modifications sans écrire les fichiers
    --file      Traite uniquement le fichier spécifié
    --reset     Supprime tous les liens wiki existants (mode déliage)
"""

import re
import sys
import argparse
from pathlib import Path

# Fix Windows console encoding
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout = open(sys.stdout.fileno(), mode="w", encoding="utf-8", buffering=1)

try:
    import yaml
except ImportError:
    print("PyYAML manquant. Installe avec : pip install pyyaml")
    sys.exit(1)

TOOLS_DIR = Path(__file__).parent
DOCS_DIR = TOOLS_DIR.parent / "docs"
CONFIG_FILE = TOOLS_DIR / "wiki_links.yml"

# ── Tokenisation ─────────────────────────────────────────────────────────────

# Zones protégées : ne jamais y appliquer de liens
PROTECTED_PATTERNS = [
    r"```[\s\S]*?```",          # blocs de code délimités
    r"~~~[\s\S]*?~~~",          # blocs de code alternatifs
    r"`[^`\n]+`",               # code en ligne
    r"!\[[^\]]*\]\([^)]*\)",    # images ![alt](url)
    r"\[[^\]]*\]\([^)]*\)",     # liens existants [text](url)
    r"\[[^\]]*\]\[[^\]]*\]",    # liens référence [text][ref]
    r"^\s{0,3}#{1,6}[^\n]*",   # titres
    r"^\s{0,3}[!?]{3}[^\n]*",  # en-têtes d'admonitions (!!!  ???)
    r"^\s*\|[^\n]*",            # lignes de tableau
    r"<[^>]+>",                 # balises HTML
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
            tokens.append(("text", text[last : m.start()]))
        tokens.append(("protected", m.group()))
        last = m.end()
    if last < len(text):
        tokens.append(("text", text[last:]))
    return tokens


def untokenize(tokens: list[tuple[str, str]]) -> str:
    return "".join(v for _, v in tokens)


# ── Application des liens ─────────────────────────────────────────────────────


def build_url(entry: dict) -> str:
    url = entry["target"]
    if entry.get("anchor"):
        url += "#" + entry["anchor"]
    return url


def apply_links_to_text(
    segment: str, term_pattern: re.Pattern, url: str, already_linked: set
) -> tuple[str, bool]:
    """
    Remplace la première occurrence non encore liée du terme dans segment.
    Retourne (nouveau_segment, a_modifié).
    """
    m = term_pattern.search(segment)
    if m and m.group(0).lower() not in already_linked:
        matched = m.group(0)
        replacement = f"[{matched}]({url})"
        segment = segment[: m.start()] + replacement + segment[m.end() :]
        already_linked.add(matched.lower())
        return segment, True
    return segment, False


def process_content(text: str, links_config: list, current_file: str) -> str:
    """Applique tous les liens wiki sur le contenu d'un fichier."""
    tokens = tokenize(text)
    # Terme déjà lié dans cette page (première occurrence seulement par défaut)
    linked_terms: set[str] = set()

    for entry in links_config:
        # Ne pas lier un terme à la page qui le définit
        if entry["target"] == current_file:
            continue

        url = build_url(entry)
        first_only = entry.get("first_only", True)

        for term in entry["terms"]:
            if first_only and term.lower() in linked_terms:
                continue

            # Regex : correspondance de mot entier, insensible à la casse
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
                    new_value, changed = apply_links_to_text(
                        value, pattern, url, linked_terms
                    )
                    modified_tokens.append((kind, new_value))
                    if changed:
                        term_linked = True
                else:
                    modified_tokens.append((kind, value))
            tokens = modified_tokens

    return untokenize(tokens)


# ── Mode déliage ──────────────────────────────────────────────────────────────

_WIKI_LINK_RE = re.compile(r"\[([^\]]+)\]\(([^)]+\.md[^)]*)\)")


def remove_wiki_links(text: str, links_config: list) -> str:
    """Supprime les liens wiki générés (garde les liens non-SRD)."""
    all_targets = {entry["target"] for entry in links_config}

    def replacer(m):
        label, url = m.group(1), m.group(2)
        # Ne supprime que les liens vers des pages du SRD
        base = url.split("#")[0]
        if base in all_targets:
            return label
        return m.group(0)

    return _WIKI_LINK_RE.sub(replacer, text)


# ── Entrée principale ─────────────────────────────────────────────────────────


def load_config() -> list:
    with CONFIG_FILE.open(encoding="utf-8") as f:
        data = yaml.safe_load(f)
    return data.get("links", [])


def process_file(path: Path, links_config: list, dry_run: bool, reset: bool):
    text = path.read_bytes().decode("utf-8").replace("\r\n", "\n")
    current_file = path.name

    if reset:
        result = remove_wiki_links(text, links_config)
    else:
        result = process_content(text, links_config, current_file)

    if result == text:
        print(f"  (inchangé)  {path.name}")
        return

    if dry_run:
        # Affiche un diff compact
        import difflib
        diff = difflib.unified_diff(
            text.splitlines(keepends=True),
            result.splitlines(keepends=True),
            fromfile=f"a/{path.name}",
            tofile=f"b/{path.name}",
            n=1,
        )
        print("".join(list(diff)[:60]))
    else:
        path.write_bytes(result.encode("utf-8"))
        print(f"  ✓  {path.name}")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true", help="Pas d'écriture")
    parser.add_argument("--file", help="Traite uniquement ce fichier")
    parser.add_argument("--reset", action="store_true", help="Supprime les liens wiki")
    args = parser.parse_args()

    links_config = load_config()

    if args.file:
        files = [Path(args.file)]
    else:
        files = sorted(DOCS_DIR.glob("*.md"))

    mode = "RESET" if args.reset else ("DRY-RUN" if args.dry_run else "APPLY")
    print(f"[wiki_linker] Mode : {mode} — {len(files)} fichier(s)\n")

    for path in files:
        process_file(path, links_config, dry_run=args.dry_run, reset=args.reset)

    print("\nTerminé.")


if __name__ == "__main__":
    main()
