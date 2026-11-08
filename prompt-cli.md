# INS/MV : Rogue — consignes techniques actuelles

## Source de vérité

Le **SRD courant** est la seule source de règles normative : https://badjams.github.io/ins-mv-rogue-srd/ ; dans le dépôt, voir `src/content/docs/`.
Toute ancienne documentation ou conversation, y compris les règles contenues précédemment dans ce fichier, est obsolète si elle contredit ce SRD.

## Architecture

- Application documentaire : Astro 5 + Starlight, `astro.config.mjs`.
- Moteur et interface du simulateur/générateur : `public/scripts/rogue-srd.js`.
- Tirage du deck officiel : `public/scripts/host-deck-engine.mjs` et `public/data/hotes-officiels.json`, administrables via `public/admin/config.yml`.
- Export DOCX : `tools/export_docx.py`. Export imprimable : `src/components/ExportContent.astro`.
- Vérifications PR : `.github/workflows/check.yml`.

## Synthèse mécanique à respecter

1. D666 : dé bleu pour l'âme, blanc pour l'hôte, rouge pour l'intensité. Le dé d'action réussit s'il est inférieur ou égal au seuil **effectif**, plafonné à 5 ; un 6 échoue.
2. Un seuil **théorique de 6 ou plus neutralise une source de désavantage**. Il ne donne jamais automatiquement un avantage.
3. Avantage : conserver le plus petit dé bleu/blanc ; désavantage : le plus grand. Plusieurs sources d'explosion s'additionnent : un dé bonus par source, immédiatement, puis relances des seuls dés d'explosion obtenant 6.
4. Réussite critique si les deux dés d'action sont identiques et que l'action réussit ; double 6 = échec critique. 111 et 666 : interventions surnaturelles.
5. La **marge** (seuil effectif moins dé réussi) existe encore pour les rafales : **1 + marge** projectiles touchent, plafonnés par l'arme et les munitions. Aucune marge dans les dégâts ni dans l'arbitrage des oppositions.
6. Dégâts des attaques simples : **Code + intensité**, puis PA de l'armure et Résilience ; la pénétration ignore les PA, jamais la Résilience. En opposition, le plus petit dé d'action réussi gagne, les égalités entre réussites produisent deux actions simultanées.
7. Combat : action complexe, action simple, réaction ; les gestes accessoires ne sont pas une quatrième catégorie. Viser accorde un avantage au tir suivant.
8. Âme humaine : à saturation létale, conversion d'une case en marque aggravée chaque minute sans stabilisation, puis mort de l'hôte lorsque toutes sont aggravées. Âme surnaturelle : hôte mort dès saturation létale. Âme damnée : stase. La destruction d'une âme n'est pas la mort de son hôte.
9. Les pouvoirs actifs se lancent au rang choisi et génèrent du drain. Pas d'achat de niveaux de pouvoirs ; les pouvoirs passifs suivent le Rang Céleste.
10. Le **deck officiel** d'hôtes et le jeu ordinaire de **54 cartes de remplacement** sont distincts. Le deck officiel peut contenir des cartes événementielles à taux de tirage individuels, indépendants des poids du paquet ordinaire.

## Vérifier les modifications

Après une modification de règles, synchroniser les renvois, exemples, scripts de simulation, générateur, cartes, export DOCX et export imprimable.

Sur un environnement de développement : `npm ci`, `node --check public/scripts/rogue-srd.js`, `node --test tests/*.test.mjs`, `python tools/export_docx.py`, puis `npm run build`.

La validation GitHub Actions de la PR doit réussir avant fusion. Ce document ne remplace jamais les chapitres du SRD.
