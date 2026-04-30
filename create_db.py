#!/usr/bin/env python3
"""
Crée srd.db en local depuis les fichiers docs/*.md
À lancer avant de déployer sur PythonAnywhere.
"""

import sqlite3
import json
from pathlib import Path

BASE_DIR = Path(__file__).parent
DB_PATH  = BASE_DIR / "srd.db"
DOCS_DIR = BASE_DIR / "docs"

NAV = [
    {"label": "Accueil",                    "file": "index.md",                     "indent": 0},
    {"label": "SRD",                        "file": "srd.md",                       "indent": 0},
    {"label": "Contexte",                   "section": True},
    {"label": "Le monde du jeu",            "file": "contexte.md",                  "indent": 1},
    {"label": "Personnage",                 "section": True},
    {"label": "Caractéristiques",           "file": "caracteristiques.md",          "indent": 1},
    {"label": "Création d'âme",             "file": "creation.md",                  "indent": 1},
    {"label": "Rang céleste",               "file": "rang.md",                      "indent": 1},
    {"label": "Progression",               "file": "progression.md",               "indent": 1},
    {"label": "Réincarnation",             "file": "reincarnation.md",             "indent": 1},
    {"label": "Mécanique",                 "section": True},
    {"label": "Résolution D666",           "file": "resolution.md",                "indent": 1},
    {"label": "Combat & initiative",       "file": "combat.md",                    "indent": 1},
    {"label": "Pouvoirs",                  "file": "pouvoirs.md",                  "indent": 1},
    {"label": "Compétences",              "file": "competences.md",               "indent": 1},
    {"label": "Énergie",                  "file": "energie.md",                   "indent": 1},
    {"label": "Blessures",               "file": "blessures.md",                 "indent": 1},
    {"label": "Référence",               "section": True},
    {"label": "Mots-clés",              "file": "mots-cles.md",                 "indent": 1},
    {"label": "États",                   "file": "etats.md",                     "indent": 1},
    {"label": "Équipement",             "file": "equipement.md",                "indent": 1},
    {"label": "Armes de mêlée",         "file": "equipement-melee.md",          "indent": 2},
    {"label": "Armes à feu",            "file": "equipement-armes-feu.md",      "indent": 2},
    {"label": "Armes à distance",       "file": "equipement-distance.md",       "indent": 2},
    {"label": "Explosifs",              "file": "equipement-explosifs.md",      "indent": 2},
    {"label": "Protections",            "file": "equipement-protections.md",    "indent": 2},
    {"label": "Boucliers",              "file": "equipement-boucliers.md",      "indent": 2},
    {"label": "Simulateur",            "file": "simulateur.md",                "indent": 0},
    {"label": "Générateur",            "file": "generateur.md",                "indent": 0},
]

if DB_PATH.exists():
    DB_PATH.unlink()
    print(f"  Ancien srd.db supprimé.")

db = sqlite3.connect(str(DB_PATH))
db.execute("""
    CREATE TABLE pages (
        filename   TEXT PRIMARY KEY,
        content    TEXT NOT NULL DEFAULT '',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")

ok = 0
missing = []
for item in NAV:
    if "file" not in item:
        continue
    fname = item["file"]
    doc_path = DOCS_DIR / fname
    if doc_path.exists():
        content = doc_path.read_text(encoding="utf-8")
        ok += 1
    else:
        content = ""
        missing.append(fname)
    db.execute("INSERT INTO pages (filename, content) VALUES (?, ?)", (fname, content))

db.commit()
db.close()

print(f"\n  srd.db créé — {ok} fichiers importés")
if missing:
    print(f"  MANQUANTS (contenu vide) : {', '.join(missing)}")
print(f"  Taille : {DB_PATH.stat().st_size // 1024} Ko\n")
print("  Prochaine étape : uploader srd.db sur PythonAnywhere via Files ou SFTP.")
