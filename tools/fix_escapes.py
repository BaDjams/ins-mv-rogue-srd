#!/usr/bin/env python3
"""Supprime les caractères d'échappement Pandoc résiduels dans les fichiers .md."""
import re
from pathlib import Path

DOCS = Path(__file__).parent.parent / "docs"


def fix_file(path: Path, fixfunc):
    text = path.read_bytes().decode("utf-8").replace("\r\n", "\n")
    fixed = fixfunc(text)
    path.write_bytes(fixed.encode("utf-8"))
    print(f"Corrigé : {path.name}")


def fix_trailing_backslashes(t: str) -> str:
    """Supprime les \\ de fin de ligne (sauts de ligne durs Pandoc)."""
    return re.sub(r"\\\n", "\n", t)


def fix_blessures(t: str) -> str:
    t = fix_trailing_backslashes(t)
    t = t.replace(r"\< 100 g", "< 100 g")
    t = t.replace(r"\> 100 tonnes", "> 100 tonnes")
    return t


def fix_equipement(t: str) -> str:
    t = fix_trailing_backslashes(t)
    # 1\. → 1.  (listes numérotées échappées par Pandoc)
    t = re.sub(r"^(\d+)\\\.", r"\1.", t, flags=re.MULTILINE)
    return t


def fix_progression(t: str) -> str:
    return fix_trailing_backslashes(t)


def fix_contexte(t: str) -> str:
    t = fix_trailing_backslashes(t)
    # Exposant échappé : \^334 → <sup>334</sup>
    t = re.sub(r"\\\^(\w+)", r"<sup>\1</sup>", t)
    return t


if __name__ == "__main__":
    fix_file(DOCS / "blessures.md", fix_blessures)
    fix_file(DOCS / "equipement.md", fix_equipement)
    fix_file(DOCS / "progression.md", fix_progression)
    fix_file(DOCS / "contexte.md", fix_contexte)
    print("Terminé.")
