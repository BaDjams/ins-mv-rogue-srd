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

## Décisions de game design actées

### Formule de dégâts des armes (Option A)
Dégâts = Code + max(Marge, Dé rouge)
La chance rattrape une mauvaise réussite mais n'amplifie plus une bonne.

### Système Énergie / Drain / Consommation
- PE = Rang céleste (recharge journalière)
- Trait Conduit Divin X : +X PE permanents
- Pouvoirs de base : gratuits (Boost 1 = 0 dé de drain)
- Pouvoirs boostés (Boost 1–6) : dégâts × Boost, drain = Boost−1 dés, chaque 6 = 1 affaiblissement d'âme
- Seuil gratuit = PE du jour ; au-delà = blessure aggravée directe (Consommation)
- Si l'hôte meurt par Consommation : réincarnation normale, compteur remis à zéro

### Rôle des armes spéciales
Les armes spéciales (argent, armes célestes) ne font pas plus de dégâts bruts.
Elles réduisent ou annulent la Résilience de l'adversaire.
C'est le levier des humains préparés (inquisiteurs, chasseurs) contre les êtres surnaturels.

---

## État actuel du SRD

Le contenu vient d'un fichier source `.md` (export Google Docs). Le découpage en fichiers par section a été fait et le contenu est à jour avec la dernière version des règles (avril 2026).

### Dernières modifications (avril 2026)

- `energie.md` : refonte complète — PE = Rang céleste, système de drain/Consommation, Conduit Divin X, suppression de l'ancienne règle "blessure aggravée pour PE > 1"
- `pouvoirs.md` : ajout section "Pouvoirs boostés et Drain" avec formule dégâts × Boost, mécanique des dés de drain et exemple chiffré
- `mots-cles.md` : ajout trait Conduit Divin X dans les mots-clés d'âme
- `etats.md` : "Incarnation ratée" — "Consommation de 1 PE par tour" remplacé par "1 affaiblissement d'âme par tour"
- `creation.md` : récapitulatif corrigé (PE = Rang céleste, mention Conduit Divin)
- `caracteristiques.md`, `competences.md`, `mots-cles.md`, `etats.md` : réécriture complète (artefacts Pandoc `    >` supprimés, admonitions ajoutées, états promus en `###` headers, compétences secondaires nettoyées + ~400 lignes de règles D666 dupliquées supprimées de competences.md)

## Ce qu'il reste à faire

- Créer la liste des pouvoirs disponibles par rôle/archange (section Pouvoirs incomplète — les exemples Résilience/Feu Ardent/Rapidité Céleste sont là mais pas la liste exhaustive)
- Créer les fiches Archanges et Princes-Démons (référencées dans la création de personnage mais absentes du SRD)
- Compléter `equipement.md` avec les tableaux d'armes, armures et équipement standard
- Créer les tables de génération d'hôtes (cartes Soldats de Dieu / Citoyens) référencées dans la réincarnation
- Enrichir certaines pages avec des admonitions MkDocs Material (`!!! note`, `!!! warning`, etc.) là où c'est utile
- Créer une page dédiée aux Traits d'Âme (référencés à l'étape 5 de la création mais non détaillés)

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
