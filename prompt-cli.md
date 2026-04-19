# Contexte projet — INS-MV ROGUE SRD

## Ce qu'on est en train de faire

On construit un site web SRD (System Reference Document) pour un jeu de rôle maison appelé **INS-MV ROGUE**. Le stack choisi est **GitHub + MkDocs Material**.

Le site est déjà en ligne : https://badjams.github.io/ins-mv-rogue-srd/

Le repo GitHub : https://github.com/BaDjams/ins-mv-rogue-srd

## Structure du repo

```
ins-mv-rogue-srd/
├── docs/                   ← fichiers .md du SRD (un par section)
│   ├── index.md
│   ├── contexte.md
│   ├── caracteristiques.md
│   ├── creation.md
│   ├── rang.md
│   ├── progression.md
│   ├── reincarnation.md
│   ├── resolution.md       ← section LE D666 (système de résolution)
│   ├── combat.md
│   ├── pouvoirs.md
│   ├── competences.md
│   ├── energie.md
│   ├── blessures.md
│   ├── mots-cles.md
│   ├── etats.md
│   └── equipement.md
├── mkdocs.yml              ← config MkDocs Material (thème sombre, orange)
└── .github/workflows/
    └── deploy.yml          ← GitHub Actions, publie sur branche gh-pages
```

Chaque `git push` sur `main` reconstruit et publie le site automatiquement.

## Le jeu — INS-MV ROGUE

Jeu de rôle de guerre secrète entre anges et démons dans le monde contemporain. Les joueurs incarnent des anges (ou démons) qui s'incarnent dans des corps humains (hôtes). Dimension roguelike : si l'hôte meurt, l'ange se réincarne aléatoirement dans un nouvel humain proche.

**Système de résolution : le D666**
3 dés D6 de couleurs différentes lancés simultanément :
- Dé bleu (centaines) : partie angélique — utilisé pour les actions surnaturelles
- Dé blanc (dizaines) : partie humaine — utilisé pour les actions de compétence
- Dé rouge (unités) : intensité de la réussite

Le dé d'action (bleu ou blanc selon la nature de l'action) doit être ≤ au seuil de réussite.
Intensité finale = dé rouge + marge de réussite (seuil - résultat du dé d'action).
Avantage = prendre le plus favorable entre bleu et blanc. Désavantage = le moins favorable.
Critique : dés bleu et blanc identiques. Intervention divine : 111. Intervention démoniaque : 666.

**Caractéristiques de l'hôte (physiques) :** FOR, AGI, VIG, PER
**Attributs de l'âme (surnaturels) :** PUI, INF, RES, CLA

## État actuel du SRD

Le contenu vient d'un fichier source `.md` (export Google Docs). Le découpage en fichiers par section a été fait automatiquement. Le formatage est brut — certaines pages ont des artefacts de conversion (`\*\*`, `\#\#` échappés, listes mal formatées) qui restent à nettoyer.

La section `resolution.md` a été mise à jour avec la version complète du D666.

## Ce qu'il reste à faire

- Nettoyer le formatage markdown dans les fichiers (artefacts de conversion)
- Enrichir certaines pages avec des admonitions MkDocs Material (`!!! note`, `!!! warning`, etc.)
- Vérifier la cohérence de la navigation dans `mkdocs.yml`
- Compléter les sections courtes (équipement notamment)

## Conventions MkDocs Material utilisées

```yaml
theme:
  name: material
  palette:
    scheme: slate
    primary: deep orange
```

Admonitions disponibles : `note`, `warning`, `tip`, `example`, `danger`
Syntaxe : `!!! note "Titre"` suivi du contenu indenté de 4 espaces.
