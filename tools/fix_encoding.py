"""Corrige le mojibake UTF-8→Latin-1 dans les fichiers docs/equipement-*.md."""
import re
import os
import glob

DOCS = os.path.join(os.path.dirname(__file__), "..", "docs")
PATTERN = re.compile(r"[\xc0-\xfd][\x80-\xbf]+")


def fix(text: str) -> str:
    def rep(m):
        try:
            return m.group().encode("latin-1").decode("utf-8")
        except (UnicodeEncodeError, UnicodeDecodeError):
            return m.group()
    return PATTERN.sub(rep, text)


files = glob.glob(os.path.join(DOCS, "equipement-*.md"))
for path in files:
    with open(path, "r", encoding="utf-8") as f:
        original = f.read()
    fixed = fix(original)
    if fixed != original:
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            f.write(fixed)
        print(f"Fixed: {os.path.basename(path)}")
    else:
        print(f"Clean: {os.path.basename(path)}")
