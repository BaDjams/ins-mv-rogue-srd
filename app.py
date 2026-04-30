#!/usr/bin/env python3
"""
Portail WYSIWYG — INS-MV ROGUE SRD
Flask + SQLite — déploiement PythonAnywhere
Variables d'env : ADMIN_PASSWORD (défaut : rogue2025), SECRET_KEY
"""

import os
import sqlite3
import json
from pathlib import Path
from flask import Flask, request, jsonify, render_template_string, Response, session, redirect, url_for

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "ins-mv-rogue-secret-changeme")

BASE_DIR  = Path(__file__).parent
DB_PATH   = BASE_DIR / "srd.db"
DOCS_DIR  = BASE_DIR / "docs"
PASSWORD  = os.environ.get("ADMIN_PASSWORD", "rogue2025")

NAV = [
    {"label": "Accueil",                    "file": "index.md",                     "indent": 0},
    {"label": "SRD",                        "file": "srd.md",                       "indent": 0},
    {"label": "Contexte",                   "section": True},
    {"label": "Le monde du jeu",            "file": "contexte.md",                  "indent": 1},
    {"label": "Personnage",                 "section": True},
    {"label": "Caractéristiques",           "file": "caracteristiques.md",          "indent": 1},
    {"label": "Création d'âme",             "file": "creation.md",                  "indent": 1},
    {"label": "Rang céleste",               "file": "rang.md",                      "indent": 1},
    {"label": "Progression",                "file": "progression.md",               "indent": 1},
    {"label": "Réincarnation",              "file": "reincarnation.md",             "indent": 1},
    {"label": "Mécanique",                  "section": True},
    {"label": "Résolution D666",            "file": "resolution.md",                "indent": 1},
    {"label": "Combat & initiative",        "file": "combat.md",                    "indent": 1},
    {"label": "Pouvoirs",                   "file": "pouvoirs.md",                  "indent": 1},
    {"label": "Compétences",                "file": "competences.md",               "indent": 1},
    {"label": "Énergie",                    "file": "energie.md",                   "indent": 1},
    {"label": "Blessures",                  "file": "blessures.md",                 "indent": 1},
    {"label": "Référence",                  "section": True},
    {"label": "Mots-clés",                  "file": "mots-cles.md",                 "indent": 1},
    {"label": "États",                      "file": "etats.md",                     "indent": 1},
    {"label": "Équipement",                 "file": "equipement.md",                "indent": 1},
    {"label": "Armes de mêlée",             "file": "equipement-melee.md",          "indent": 2},
    {"label": "Armes à feu",                "file": "equipement-armes-feu.md",      "indent": 2},
    {"label": "Armes à distance",           "file": "equipement-distance.md",       "indent": 2},
    {"label": "Explosifs",                  "file": "equipement-explosifs.md",      "indent": 2},
    {"label": "Protections",                "file": "equipement-protections.md",    "indent": 2},
    {"label": "Boucliers",                  "file": "equipement-boucliers.md",      "indent": 2},
    {"label": "Simulateur",                 "file": "simulateur.md",                "indent": 0},
    {"label": "Générateur",                 "file": "generateur.md",                "indent": 0},
]

# ─── Database ──────────────────────────────────────────────────────────────────

def get_db():
    db = sqlite3.connect(str(DB_PATH))
    db.row_factory = sqlite3.Row
    return db


def init_db():
    """Crée la table et importe les fichiers .md si la base est vide."""
    with get_db() as db:
        db.execute("""
            CREATE TABLE IF NOT EXISTS pages (
                filename   TEXT PRIMARY KEY,
                content    TEXT NOT NULL DEFAULT '',
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        for item in NAV:
            if "file" not in item:
                continue
            fname = item["file"]
            exists = db.execute(
                "SELECT 1 FROM pages WHERE filename=?", (fname,)
            ).fetchone()
            if not exists:
                doc_path = DOCS_DIR / fname
                content  = doc_path.read_text(encoding="utf-8") if doc_path.exists() else ""
                db.execute(
                    "INSERT INTO pages (filename, content) VALUES (?, ?)",
                    (fname, content),
                )
        db.commit()


init_db()

# ─── Auth ──────────────────────────────────────────────────────────────────────

LOGIN_HTML = """<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Connexion — INS-MV ROGUE</title>
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  background: #0f0f1a; color: #d0d0e0;
  font-family: 'Segoe UI', system-ui, sans-serif; font-size: 14px;
}
.card {
  background: #141428; border: 1px solid #2a2a45; border-radius: 12px;
  padding: 40px 36px; width: 320px; display: flex; flex-direction: column; gap: 20px;
}
h1 { font-size: 16px; font-weight: 800; color: #e64a19; letter-spacing: .06em; text-transform: uppercase; }
label { font-size: 12px; color: #666688; display: block; margin-bottom: 6px; }
input[type=password] {
  width: 100%; padding: 9px 12px; border-radius: 6px;
  border: 1px solid #2a2a45; background: #0f0f1a; color: #d0d0e0;
  font-size: 14px; outline: none;
}
input[type=password]:focus { border-color: #e64a19; }
button {
  width: 100%; padding: 10px; border-radius: 6px; border: none;
  background: #e64a19; color: #fff; font-size: 14px; font-weight: 700; cursor: pointer;
}
button:hover { background: #ff6d3a; }
.error { color: #e64a19; font-size: 12px; }
</style>
</head>
<body>
<div class="card">
  <h1>⚔ INS·MV ROGUE</h1>
  <form method="post">
    <label>Mot de passe</label>
    <input type="password" name="password" autofocus>
    {% if error %}<p class="error">{{ error }}</p>{% endif %}
    <br>
    <button type="submit">Connexion</button>
  </form>
</div>
</body>
</html>"""

EDITOR_HTML = """<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Éditeur WYSIWYG — INS-MV ROGUE</title>
<link rel="stylesheet" href="https://uicdn.toast.com/editor/3.2.2/toastui-editor.min.css">
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:       #0f0f1a;
  --sidebar:  #141428;
  --header:   #0d0d1f;
  --border:   #2a2a45;
  --text:     #d0d0e0;
  --muted:    #666688;
  --accent:   #e64a19;
  --accent2:  #ff6d3a;
  --section:  #e8b04a;
  --saved:    #4caf50;
  --unsaved:  #e64a19;
  --w-side:   260px;
  --h-head:   52px;
}

html, body { height: 100%; background: var(--bg); color: var(--text); font-family: 'Segoe UI', system-ui, sans-serif; font-size: 14px; }

#header {
  position: fixed; top: 0; left: 0; right: 0;
  height: var(--h-head);
  background: var(--header); border-bottom: 1px solid var(--border);
  display: flex; align-items: center; padding: 0 16px; gap: 12px; z-index: 200;
}
#logo { font-size: 13px; font-weight: 800; color: var(--accent); letter-spacing: .06em; text-transform: uppercase; white-space: nowrap; flex-shrink: 0; }
#file-bar { flex: 1; display: flex; align-items: center; gap: 10px; min-width: 0; overflow: hidden; }
#file-title { font-size: 13px; font-weight: 600; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
#file-path { font-size: 11px; color: var(--muted); font-family: monospace; white-space: nowrap; flex-shrink: 0; }
#status {
  font-size: 11px; font-weight: 700; white-space: nowrap;
  padding: 3px 10px; border-radius: 20px; flex-shrink: 0; transition: all .25s;
}
.st-clean { background: rgba(76,175,80,.15); color: var(--saved); }
.st-dirty  { background: rgba(230,74,25,.15); color: var(--unsaved); }
#btn-save {
  padding: 6px 18px; border-radius: 6px; border: none;
  background: var(--accent); color: #fff;
  font-size: 13px; font-weight: 700; cursor: pointer; transition: background .2s; flex-shrink: 0;
}
#btn-save:hover:not(:disabled) { background: var(--accent2); }
#btn-save:disabled { background: #252540; color: var(--muted); cursor: default; }
#btn-theme {
  padding: 5px 12px; border-radius: 6px; border: 1px solid var(--border);
  background: transparent; color: var(--muted); font-size: 12px; cursor: pointer; flex-shrink: 0;
  transition: all .2s;
}
#btn-theme:hover { color: var(--text); border-color: var(--text); }
#btn-logout {
  padding: 5px 12px; border-radius: 6px; border: 1px solid var(--border);
  background: transparent; color: var(--muted); font-size: 12px; cursor: pointer; flex-shrink: 0;
}
#btn-logout:hover { color: var(--text); border-color: var(--text); }

#layout { display: flex; height: 100vh; padding-top: var(--h-head); }

#sidebar {
  width: var(--w-side); flex-shrink: 0;
  background: var(--sidebar); border-right: 1px solid var(--border);
  overflow-y: auto; overflow-x: hidden; padding: 8px 0 32px;
}
#sidebar::-webkit-scrollbar { width: 5px; }
#sidebar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

.nav-section { padding: 16px 16px 4px; font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--section); }
.nav-item {
  display: block; width: 100%;
  padding: 7px 16px 7px calc(16px + var(--d, 0) * 14px);
  font-size: 13px; color: var(--text);
  background: none; border: none; border-left: 2px solid transparent;
  text-align: left; cursor: pointer;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  transition: background .12s, border-color .12s;
}
.nav-item:hover { background: rgba(255,255,255,.05); }
.nav-item.active { background: rgba(230,74,25,.12); border-left-color: var(--accent); color: #fff; font-weight: 600; }

#main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
#placeholder { flex: 1; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 16px; color: var(--muted); }
#placeholder svg { opacity: .2; }
#placeholder h2 { font-size: 16px; font-weight: 400; color: var(--muted); }
#placeholder p { font-size: 13px; color: #444466; }
#editor-wrap { flex: 1; display: none; overflow: hidden; }
#editor { height: 100%; }

.toastui-editor-defaultUI { background: #1c1c30 !important; border: none !important; }
.toastui-editor-toolbar { background: #131326 !important; border-bottom: 1px solid var(--border) !important; }
.toastui-editor-toolbar-group { border-right: 1px solid var(--border) !important; }
.toastui-editor-toolbar-icons { border: none !important; background: transparent !important; color: #8888aa !important; }
.toastui-editor-toolbar-icons:hover { background: rgba(255,255,255,.07) !important; color: #cccce0 !important; }
.toastui-editor-toolbar-icons.active { background: rgba(230,74,25,.2) !important; color: var(--accent) !important; }
.toastui-editor-mode-switch { background: #131326 !important; border-top: 1px solid var(--border) !important; }
.toastui-editor-mode-switch .tab-item { color: var(--muted) !important; background: transparent !important; border: none !important; }
.toastui-editor-mode-switch .tab-item.active { color: var(--accent) !important; background: rgba(230,74,25,.1) !important; }
.toastui-editor-contents { color: #d0d0e0 !important; }
.toastui-editor-contents h1, .toastui-editor-contents h2,
.toastui-editor-contents h3, .toastui-editor-contents h4 { color: #f0f0ff !important; border-bottom-color: var(--border) !important; }
.toastui-editor-contents a { color: var(--accent) !important; }
.toastui-editor-contents strong { color: #f0d080 !important; }
.toastui-editor-contents em { color: #a0c0ff !important; }
.toastui-editor-contents code { background: #252540 !important; color: #e8a87c !important; border: none !important; }
.toastui-editor-contents pre { background: #18182e !important; border: 1px solid var(--border) !important; }
.toastui-editor-contents blockquote { border-left: 3px solid var(--accent) !important; background: rgba(230,74,25,.05) !important; color: var(--muted) !important; }
.toastui-editor-contents table th { background: #252545 !important; color: #f0f0f0 !important; }
.toastui-editor-contents table td, .toastui-editor-contents table th { border-color: var(--border) !important; }
.toastui-editor-contents table tr:nth-child(even) td { background: rgba(255,255,255,.02) !important; }
.ProseMirror { background: #1c1c30 !important; color: #d0d0e0 !important; padding: 24px 40px !important; min-height: 300px; }
.CodeMirror { background: #1c1c30 !important; color: #d0d0e0 !important; height: 100% !important; }
.CodeMirror-cursor { border-left-color: var(--accent) !important; }
.CodeMirror-selected, .CodeMirror-focused .CodeMirror-selected { background: rgba(230,74,25,.2) !important; }
.cm-header { color: #f09090 !important; font-weight: 700; }
.cm-strong { color: #f0d080 !important; }
.cm-em { color: #90b0f0 !important; }
.cm-link, .cm-url { color: var(--accent) !important; }

/* ─── Thème Angélique (clair) ─────────────────────────────────────── */
html.angelic {
  --bg:      #f5f4f0;
  --sidebar: #eceae4;
  --header:  #e8e5de;
  --border:  #d0ccc0;
  --text:    #1a1820;
  --muted:   #887870;
  --accent:  #c03010;
  --accent2: #e04828;
  --section: #7050a0;
  --saved:   #2a7a30;
  --unsaved: #c03010;
}
html.angelic .nav-item:hover { background: rgba(0,0,0,.05); }
html.angelic .nav-item.active { background: rgba(192,48,16,.10); color: #1a1820; }
html.angelic #placeholder p { color: #aaa090; }
html.angelic #btn-save:disabled { background: #ddd8d0; }
html.angelic #btn-theme { border-color: #c0bab0; }

html.angelic .toastui-editor-defaultUI { background: #ffffff !important; }
html.angelic .toastui-editor-toolbar { background: #f5f4f0 !important; border-bottom: 1px solid var(--border) !important; }
html.angelic .toastui-editor-toolbar-group { border-right: 1px solid var(--border) !important; }
html.angelic .toastui-editor-toolbar-icons { color: #887060 !important; }
html.angelic .toastui-editor-toolbar-icons:hover { background: rgba(0,0,0,.07) !important; color: #1a1820 !important; }
html.angelic .toastui-editor-toolbar-icons.active { background: rgba(192,48,16,.15) !important; }
html.angelic .toastui-editor-mode-switch { background: #f0ece4 !important; border-top: 1px solid var(--border) !important; }
html.angelic .toastui-editor-mode-switch .tab-item { color: var(--muted) !important; }
html.angelic .toastui-editor-mode-switch .tab-item.active { color: var(--accent) !important; background: rgba(192,48,16,.08) !important; }
html.angelic .toastui-editor-contents { color: #1a1820 !important; }
html.angelic .toastui-editor-contents h1,
html.angelic .toastui-editor-contents h2,
html.angelic .toastui-editor-contents h3,
html.angelic .toastui-editor-contents h4 { color: #0a0810 !important; border-bottom-color: var(--border) !important; }
html.angelic .toastui-editor-contents strong { color: #804000 !important; }
html.angelic .toastui-editor-contents em { color: #204080 !important; }
html.angelic .toastui-editor-contents code { background: #ede8e0 !important; color: #804020 !important; }
html.angelic .toastui-editor-contents pre { background: #f0ece4 !important; border: 1px solid var(--border) !important; }
html.angelic .toastui-editor-contents blockquote { background: rgba(192,48,16,.04) !important; }
html.angelic .toastui-editor-contents table th { background: #e0dcd4 !important; color: #1a1820 !important; }
html.angelic .toastui-editor-contents table tr:nth-child(even) td { background: rgba(0,0,0,.02) !important; }
html.angelic .ProseMirror { background: #ffffff !important; color: #1a1820 !important; }
html.angelic .CodeMirror { background: #ffffff !important; color: #1a1820 !important; }
html.angelic .CodeMirror-selected,
html.angelic .CodeMirror-focused .CodeMirror-selected { background: rgba(192,48,16,.15) !important; }
html.angelic .cm-header { color: #8b1a10 !important; }
html.angelic .cm-strong { color: #804000 !important; }
html.angelic .cm-em { color: #204080 !important; }
</style>
</head>
<script>if (localStorage.getItem('theme') === 'angelic') document.documentElement.classList.add('angelic');</script>
<body>

<header id="header">
  <div id="logo">⚔ INS·MV ROGUE</div>
  <div id="file-bar">
    <span id="file-title">Aucun fichier sélectionné</span>
    <span id="file-path"></span>
  </div>
  <span id="status" class="st-clean">✓ Sauvegardé</span>
  <button id="btn-save" disabled>Sauvegarder</button>
  <button id="btn-theme" title="Basculer le thème">☀ Angélique</button>
  <form action="/logout" method="post" style="display:inline">
    <button id="btn-logout" type="submit">Déconnexion</button>
  </form>
</header>

<div id="layout">
  <aside id="sidebar"><div id="nav-list"></div></aside>
  <main id="main">
    <div id="placeholder">
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10,9 9,9 8,9"/>
      </svg>
      <h2>Éditeur WYSIWYG — INS-MV ROGUE SRD</h2>
      <p>Sélectionnez un fichier dans la sidebar pour commencer</p>
    </div>
    <div id="editor-wrap"><div id="editor"></div></div>
  </main>
</div>

<script src="https://uicdn.toast.com/editor/3.2.2/toastui-editor-all.min.js"></script>
<script>
const NAV = __NAV_JSON__;

let editor = null, currentFile = null, dirty = false;

const elNavList     = document.getElementById('nav-list');
const elTitle       = document.getElementById('file-title');
const elPath        = document.getElementById('file-path');
const elStatus      = document.getElementById('status');
const elBtnSave     = document.getElementById('btn-save');
const elPlaceholder = document.getElementById('placeholder');
const elEditorWrap  = document.getElementById('editor-wrap');

function buildNav() {
  NAV.forEach(item => {
    if (item.section) {
      const el = document.createElement('div');
      el.className = 'nav-section';
      el.textContent = item.label;
      elNavList.appendChild(el);
    } else {
      const el = document.createElement('button');
      el.className = 'nav-item';
      el.style.setProperty('--d', item.indent || 0);
      el.textContent = item.label;
      el.dataset.file = item.file;
      el.addEventListener('click', () => openFile(item.file, item.label));
      elNavList.appendChild(el);
    }
  });
}

function setDirty(d) {
  dirty = d;
  if (d) {
    elStatus.className = 'st-dirty';
    elStatus.textContent = '● Modifié';
    elBtnSave.disabled = false;
  } else {
    elStatus.className = 'st-clean';
    elStatus.textContent = '✓ Sauvegardé';
    elBtnSave.disabled = true;
  }
}

async function openFile(filename, label) {
  if (dirty && !confirm('Modifications non sauvegardées — continuer quand même ?')) return;
  document.querySelectorAll('.nav-item').forEach(e => e.classList.remove('active'));
  document.querySelector(`.nav-item[data-file="${filename}"]`)?.classList.add('active');
  try {
    const resp = await fetch('/api/file?f=' + encodeURIComponent(filename));
    if (!resp.ok) {
      const text = await resp.text();
      console.error('API error', resp.status, text.slice(0, 200));
      alert('Erreur HTTP ' + resp.status + ' — voir console');
      return;
    }
    const data = await resp.json();
    console.log('API response:', data);
    if (data.error) { alert('Erreur : ' + data.error); return; }
    currentFile = filename;
    elTitle.textContent = label || filename;
    elPath.textContent  = filename;
    elPlaceholder.style.display = 'none';
    elEditorWrap.style.display  = 'block';
    const content = data.content ?? '';
    if (!editor) initEditor(content);
    else editor.setMarkdown(content);
    setDirty(false);
  } catch (err) {
    console.error('openFile error:', err);
    alert('Erreur de chargement : ' + err.message + ' [' + (err.constructor?.name ?? '?') + ']');
  }
}

function editorHeight() { return (window.innerHeight - 52) + 'px'; }

function initEditor(initialValue) {
  editor = new toastui.Editor({
    el: document.getElementById('editor'),
    initialEditType: 'wysiwyg',
    previewStyle: 'tab',
    height: editorHeight(),
    initialValue: initialValue || '',
    usageStatistics: false,
  });
  editor.on('change', () => { if (!dirty) setDirty(true); });
  window.addEventListener('resize', () => editor.setHeight(editorHeight()));
}

async function saveFile() {
  if (!currentFile || !editor || !dirty) return;
  elBtnSave.textContent = '…';
  elBtnSave.disabled = true;
  try {
    const resp = await fetch('/api/file', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file: currentFile, content: editor.getMarkdown() }),
    });
    const data = await resp.json();
    if (data.ok) {
      setDirty(false);
      elStatus.textContent = '✓ Sauvegardé !';
      setTimeout(() => { if (!dirty) elStatus.textContent = '✓ Sauvegardé'; }, 2000);
    } else {
      alert('Erreur de sauvegarde : ' + JSON.stringify(data));
    }
  } catch (err) {
    alert('Erreur réseau : ' + err.message);
  } finally {
    elBtnSave.textContent = 'Sauvegarder';
  }
}

// Theme toggle
const elBtnTheme = document.getElementById('btn-theme');
function applyTheme(angelic) {
  document.documentElement.classList.toggle('angelic', angelic);
  elBtnTheme.textContent = angelic ? '🌑 Démoniaque' : '☀ Angélique';
  localStorage.setItem('theme', angelic ? 'angelic' : 'demonic');
}
elBtnTheme.addEventListener('click', () => applyTheme(!document.documentElement.classList.contains('angelic')));
applyTheme(localStorage.getItem('theme') === 'angelic');

elBtnSave.addEventListener('click', saveFile);
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); if (dirty) saveFile(); }
});
window.addEventListener('beforeunload', e => { if (dirty) { e.preventDefault(); e.returnValue = ''; } });

buildNav();
</script>
</body>
</html>"""


# ─── Routes ───────────────────────────────────────────────────────────────────

@app.before_request
def require_login():
    if request.endpoint in ("login", "logout"):
        return
    if not session.get("logged_in"):
        return redirect(url_for("login"))


@app.route("/login", methods=["GET", "POST"])
def login():
    error = None
    if request.method == "POST":
        if request.form.get("password") == PASSWORD:
            session["logged_in"] = True
            return redirect("/")
        error = "Mot de passe incorrect"
    return render_template_string(LOGIN_HTML, error=error)


@app.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return redirect(url_for("login"))


@app.route("/")
def index():
    html = EDITOR_HTML.replace("__NAV_JSON__", json.dumps(NAV, ensure_ascii=False))
    return Response(html, mimetype="text/html")


@app.route("/api/file", methods=["GET"])
def api_get():
    fname = request.args.get("f", "")
    if not fname or ".." in fname:
        return jsonify({"error": "Fichier introuvable"}), 404
    with get_db() as db:
        row = db.execute(
            "SELECT content FROM pages WHERE filename=?", (fname,)
        ).fetchone()
    if not row:
        return jsonify({"error": "Fichier introuvable"}), 404
    return jsonify({"file": fname, "content": row["content"]})


@app.route("/api/file", methods=["POST"])
def api_save():
    data  = request.get_json(silent=True) or {}
    fname = data.get("file", "")
    content = data.get("content", "")
    if not fname or ".." in fname:
        return jsonify({"error": "Fichier introuvable"}), 404
    with get_db() as db:
        updated = db.execute(
            "UPDATE pages SET content=?, updated_at=CURRENT_TIMESTAMP WHERE filename=?",
            (content, fname),
        ).rowcount
        db.commit()
    if not updated:
        return jsonify({"error": "Fichier introuvable"}), 404
    return jsonify({"ok": True})


if __name__ == "__main__":
    print(f"\n  INS-MV ROGUE — Éditeur WYSIWYG (Flask)")
    print(f"  → http://localhost:8080")
    print(f"  Ctrl+C pour arrêter\n")
    app.run(host="0.0.0.0", port=8080, debug=True)
