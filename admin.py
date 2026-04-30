#!/usr/bin/env python3
"""
Portail WYSIWYG — INS-MV ROGUE SRD
Usage : python admin.py   →   ouvrir http://localhost:8080
Ctrl+C pour arrêter le serveur.
"""

import http.server
import json
import threading
import urllib.parse
import webbrowser
from pathlib import Path

DOCS_DIR = Path(__file__).parent / "docs"
PORT = 8080

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

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Éditeur WYSIWYG — INS-MV ROGUE</title>
<link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.min.css">
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

/* ─── Header ─────────────────────────────────────────────────────── */
#header {
  position: fixed; top: 0; left: 0; right: 0;
  height: var(--h-head);
  background: var(--header); border-bottom: 1px solid var(--border);
  display: flex; align-items: center; padding: 0 16px; gap: 12px; z-index: 200;
}
#logo {
  font-size: 13px; font-weight: 800; color: var(--accent);
  letter-spacing: .06em; text-transform: uppercase; white-space: nowrap; flex-shrink: 0;
}
#file-bar { flex: 1; display: flex; align-items: center; gap: 10px; min-width: 0; overflow: hidden; }
#file-title {
  font-size: 13px; font-weight: 600; color: var(--text);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
#file-path {
  font-size: 11px; color: var(--muted); font-family: monospace;
  white-space: nowrap; flex-shrink: 0;
}
#status {
  font-size: 11px; font-weight: 700; white-space: nowrap;
  padding: 3px 10px; border-radius: 20px; flex-shrink: 0; transition: all .25s;
}
.st-clean { background: rgba(76,175,80,.15); color: var(--saved); }
.st-dirty { background: rgba(230,74,25,.15); color: var(--unsaved); }
#btn-save {
  padding: 6px 18px; border-radius: 6px; border: none;
  background: var(--accent); color: #fff;
  font-size: 13px; font-weight: 700; cursor: pointer;
  transition: background .2s; flex-shrink: 0;
}
#btn-save:hover:not(:disabled) { background: var(--accent2); }
#btn-save:disabled { background: #252540; color: var(--muted); cursor: default; }

/* ─── Layout ─────────────────────────────────────────────────────── */
#layout { display: flex; height: 100vh; padding-top: var(--h-head); }

/* ─── Sidebar ────────────────────────────────────────────────────── */
#sidebar {
  width: var(--w-side); flex-shrink: 0;
  background: var(--sidebar); border-right: 1px solid var(--border);
  overflow-y: auto; overflow-x: hidden; padding: 8px 0 32px;
}
#sidebar::-webkit-scrollbar { width: 5px; }
#sidebar::-webkit-scrollbar-track { background: transparent; }
#sidebar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

.nav-section {
  padding: 16px 16px 4px;
  font-size: 10px; font-weight: 700; letter-spacing: .1em;
  text-transform: uppercase; color: var(--section);
}
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
.nav-item.active {
  background: rgba(230,74,25,.12);
  border-left-color: var(--accent);
  color: #fff; font-weight: 600;
}

/* ─── Main ───────────────────────────────────────────────────────── */
#main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

#placeholder {
  flex: 1; display: flex; align-items: center; justify-content: center;
  flex-direction: column; gap: 16px; color: var(--muted);
}
#placeholder svg { opacity: .2; }
#placeholder h2 { font-size: 16px; font-weight: 400; color: var(--muted); }
#placeholder p { font-size: 13px; color: #444466; }

#editor-wrap { flex: 1; display: none; overflow: hidden; }
#editor { height: 100%; }

/* ─── Toast UI Editor — dark theme overrides ─────────────────────── */
.toastui-editor-defaultUI { background: #1c1c30 !important; border: none !important; }

.toastui-editor-toolbar {
  background: #131326 !important;
  border-bottom: 1px solid var(--border) !important;
}
.toastui-editor-toolbar-group { border-right: 1px solid var(--border) !important; }
.toastui-editor-toolbar-icons {
  border: none !important; background: transparent !important; color: #8888aa !important;
}
.toastui-editor-toolbar-icons:hover { background: rgba(255,255,255,.07) !important; color: #cccce0 !important; }
.toastui-editor-toolbar-icons.active { background: rgba(230,74,25,.2) !important; color: var(--accent) !important; }

.toastui-editor-mode-switch { background: #131326 !important; border-top: 1px solid var(--border) !important; }
.toastui-editor-mode-switch .tab-item { color: var(--muted) !important; background: transparent !important; border: none !important; }
.toastui-editor-mode-switch .tab-item.active { color: var(--accent) !important; background: rgba(230,74,25,.1) !important; }

.toastui-editor-contents { color: #d0d0e0 !important; }
.toastui-editor-contents h1,
.toastui-editor-contents h2,
.toastui-editor-contents h3,
.toastui-editor-contents h4 { color: #f0f0ff !important; border-bottom-color: var(--border) !important; }
.toastui-editor-contents a { color: var(--accent) !important; }
.toastui-editor-contents strong { color: #f0d080 !important; }
.toastui-editor-contents em { color: #a0c0ff !important; }
.toastui-editor-contents code { background: #252540 !important; color: #e8a87c !important; border: none !important; }
.toastui-editor-contents pre { background: #18182e !important; border: 1px solid var(--border) !important; }
.toastui-editor-contents blockquote { border-left: 3px solid var(--accent) !important; background: rgba(230,74,25,.05) !important; color: var(--muted) !important; }
.toastui-editor-contents table th { background: #252545 !important; color: #f0f0f0 !important; }
.toastui-editor-contents table td,
.toastui-editor-contents table th { border-color: var(--border) !important; }
.toastui-editor-contents table tr:nth-child(even) td { background: rgba(255,255,255,.02) !important; }

.ProseMirror { background: #1c1c30 !important; color: #d0d0e0 !important; padding: 24px 40px !important; min-height: 300px; }

.CodeMirror { background: #1c1c30 !important; color: #d0d0e0 !important; height: 100% !important; }
.CodeMirror-cursor { border-left-color: var(--accent) !important; }
.CodeMirror-selected,
.CodeMirror-focused .CodeMirror-selected { background: rgba(230,74,25,.2) !important; }
.cm-header { color: #f09090 !important; font-weight: 700; }
.cm-strong { color: #f0d080 !important; }
.cm-em { color: #90b0f0 !important; }
.cm-link { color: var(--accent) !important; }
.cm-url { color: var(--accent) !important; opacity: .8; }
.cm-comment { color: #667799 !important; }
</style>
</head>
<body>

<header id="header">
  <div id="logo">⚔ INS·MV ROGUE</div>
  <div id="file-bar">
    <span id="file-title">Aucun fichier sélectionné</span>
    <span id="file-path"></span>
  </div>
  <span id="status" class="st-clean">✓ Sauvegardé</span>
  <button id="btn-save" disabled>Sauvegarder</button>
</header>

<div id="layout">
  <aside id="sidebar">
    <div id="nav-list"></div>
  </aside>
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

    <div id="editor-wrap">
      <div id="editor"></div>
    </div>

  </main>
</div>

<script src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js"></script>
<script>
const NAV = __NAV_JSON__;

let editor = null;
let currentFile = null;
let dirty = false;

const elNavList    = document.getElementById('nav-list');
const elTitle      = document.getElementById('file-title');
const elPath       = document.getElementById('file-path');
const elStatus     = document.getElementById('status');
const elBtnSave    = document.getElementById('btn-save');
const elPlaceholder= document.getElementById('placeholder');
const elEditorWrap = document.getElementById('editor-wrap');

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
  if (dirty) {
    if (!confirm('Modifications non sauvegardées — continuer quand même ?')) return;
  }

  document.querySelectorAll('.nav-item').forEach(e => e.classList.remove('active'));
  document.querySelector(`.nav-item[data-file="${filename}"]`)?.classList.add('active');

  try {
    const resp = await fetch('/api/file?f=' + encodeURIComponent(filename));
    const data = await resp.json();
    if (data.error) { alert('Erreur : ' + data.error); return; }

    currentFile = filename;
    elTitle.textContent = label || filename;
    elPath.textContent  = 'docs/' + filename;

    elPlaceholder.style.display = 'none';
    elEditorWrap.style.display  = 'block';

    if (!editor) {
      initEditor(data.content);
    } else {
      editor.setMarkdown(data.content);
    }
    setDirty(false);

  } catch (err) {
    alert('Erreur de chargement : ' + err.message);
  }
}

function editorHeight() {
  return (window.innerHeight - 52) + 'px';
}

function initEditor(initialValue) {
  editor = new toastui.Editor({
    el: document.getElementById('editor'),
    initialEditType: 'wysiwyg',
    previewStyle: 'tab',
    height: editorHeight(),
    initialValue: initialValue || '',
    usageStatistics: false,
    toolbarItems: [
      ['heading', 'bold', 'italic', 'strike'],
      ['hr', 'quote'],
      ['ul', 'ol', 'task', 'indent', 'outdent'],
      ['table', 'link'],
      ['code', 'codeBlock'],
    ],
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

elBtnSave.addEventListener('click', saveFile);

document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    if (dirty) saveFile();
  }
});

window.addEventListener('beforeunload', e => {
  if (dirty) { e.preventDefault(); e.returnValue = ''; }
});

buildNav();
</script>
</body>
</html>"""


def build_html() -> bytes:
    nav_json = json.dumps(NAV, ensure_ascii=False)
    return HTML_TEMPLATE.replace("__NAV_JSON__", nav_json).encode("utf-8")


class Handler(http.server.BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(200)
        self._cors()
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        qs = urllib.parse.parse_qs(parsed.query)

        if parsed.path in ("/", "/editor"):
            body = build_html()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self._cors()
            self.send_header("Content-Length", len(body))
            self.end_headers()
            self.wfile.write(body)

        elif parsed.path == "/api/file":
            fname = qs.get("f", [""])[0]
            self._serve_file(fname)

        else:
            self.send_error(404)

    def do_POST(self):
        if self.path == "/api/file":
            n = int(self.headers.get("Content-Length", 0))
            data = json.loads(self.rfile.read(n).decode("utf-8"))
            self._save_file(data)
        else:
            self.send_error(404)

    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")

    def _json(self, obj, status: int = 200):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self._cors()
        self.send_header("Content-Length", len(body))
        self.end_headers()
        self.wfile.write(body)

    def _safe_path(self, fname: str):
        if not fname or ".." in fname or "/" in fname or "\\" in fname:
            return None
        p = DOCS_DIR / fname
        if p.suffix != ".md" or not p.exists():
            return None
        return p

    def _serve_file(self, fname: str):
        p = self._safe_path(fname)
        if not p:
            self._json({"error": "Fichier introuvable"}, 404)
            return
        self._json({"file": fname, "content": p.read_text(encoding="utf-8")})

    def _save_file(self, data: dict):
        fname = data.get("file", "")
        content = data.get("content", "")
        p = self._safe_path(fname)
        if not p:
            self._json({"error": "Fichier introuvable"}, 404)
            return
        p.write_text(content, encoding="utf-8")
        print(f"  [saved]  docs/{fname}")
        self._json({"ok": True})

    def log_message(self, *_):
        pass


if __name__ == "__main__":
    print(f"\n  INS-MV ROGUE — Éditeur WYSIWYG")
    print(f"  → http://localhost:{PORT}")
    print(f"  Ctrl+C pour arrêter\n")
    threading.Timer(0.6, lambda: webbrowser.open(f"http://localhost:{PORT}")).start()
    try:
        with http.server.HTTPServer(("", PORT), Handler) as srv:
            srv.serve_forever()
    except KeyboardInterrupt:
        print("\n  Serveur arrêté.")
