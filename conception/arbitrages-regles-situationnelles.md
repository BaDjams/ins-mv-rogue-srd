# Arbitrages — règles situationnelles (28 choix)

> **STATUT : CHOIX DE CONCEPTION DE L'AUTEUR, NON TRANSCRITS AU SRD.** Les 28 choix de conception sont consignés (S06, S22, S02/S28 et S19 précisés ; S24 révisé le 9 novembre 2026), et peuvent encore être affinés. **Ne pas intégrer au SRD sans validation expresse.**
>
> Pour chaque situation : **A**, **B**, recommandation et raison, puis **choix réel de l'auteur**. Le moteur du SRD actuel (1 action complexe + 1 simple + 1 réaction, opposition D666, états) reste la base. Les règles de posture en cours de discussion ne sont **pas** encore intégrées au SRD.

## Synthèse des décisions de l'auteur — 8 novembre 2026

- **28 situations arbitrées** : 23 options A, 4 options B, et **S06 combinant A et B** (terrain difficile : ralentissement + désavantage en combat).
- **Options B retenues : S03, S13, S22, S28** (S28 précisé : TAILLE + bonus d'allonge de l'arme).
- **Options A retenues : S01, S02, S04, S05, S07–S12, S14–S21, S23–S27**.
- Les choix expriment l'intention du créateur. **Ils ne constituent pas encore un texte normatif** ; les cas limites ci-dessous restent à résoudre avant l'intégration au SRD.

### Règle d'or — Qui reçoit l'avantage ou le désavantage ? (arbitrage du 9 novembre 2026)

> **Par défaut, les avantages et désavantages circonstanciels s'appliquent au jet de celui qui initie l'action**, et non au jet de l'adversaire qui y réagit. **Une règle explicite peut prévoir une exception.**

- Une circonstance qui facilite l'attaque donne **un avantage à l'attaquant** : on n'impose pas en miroir un désavantage au défenseur pour cette même circonstance.
- Une circonstance qui gêne l'action entreprise donne **un désavantage à celui qui entreprend cette action** : on ne donne pas automatiquement un avantage à l'opposant pour la même gêne.
- **Si une réaction est possible**, le défenseur effectue son jet selon ses règles habituelles ; il n'est pas pénalisé **du seul fait qu'il réagit plutôt qu'il n'initie**. Ses propres contraintes explicites (état, terrain difficile si la règle le prévoit, pouvoirs, etc.) peuvent néanmoins modifier son jet.
- Les règles qui désignent explicitement **le jet du défenseur** ou **le jet de l'attaquant** conservent leur priorité (ex. posture, état ou manœuvre dont l'effet est spécifié).
- Cette règle vise notamment à éviter de transformer **un seul facteur circonstanciel** en un avantage de l'initiateur **et** un désavantage du réacteur.

**Exemple normatif envisagé pour S19 :** l'attaquant caché initie une attaque surprise et reçoit **un avantage**. La victime qui ignore l'attaque **n'effectue aucun jet de défense et ne peut utiliser de réaction** contre elle. Si elle possède **Sixième sens**, elle peut dépenser sa réaction pour esquiver au **jet normal**, malgré sa surprise : **l'attaquant conserve son avantage**. En revanche, **Spider Sense** détecte la menace avant l'attaque : la cible est déjà en combat, **n'est jamais surprise**, et l'attaquant **n'obtient aucun avantage de surprise**. Les sources indépendantes d'avantage restent possibles.

**À harmoniser lors de la future révision du SRD :** `mecanique/resolution.md`, section « Jets en opposition », indique actuellement qu'un protagoniste pris au dépourvu subit un désavantage à son jet d'opposition. Pour l'attaque surprise S19, cette formulation entre en conflit avec le nouvel arbitrage et avec l'absence de jet de défense de la cible réellement inconsciente du danger. Supprimer ou reformuler ce cas, **sans modifier le SRD normatif dans cette PR**. Réexaminer également les exemples d'esquive de `mecanique/combat.md` afin d'appliquer les modificateurs au bon jet.

### Traits défensifs face à S19 — clarification du 9 novembre 2026

Le **Sixième sens** autorise seulement l'esquive d'une attaque normalement imprévisible, en dépensant la réaction habituelle, **au jet normal** ; l'attaquant conserve l'avantage lié à la surprise.

Le **Spider Sense** se distingue de cette simple permission : le personnage **anticipe les menaces avant leur déclenchement, est toujours considéré comme en combat et ne subit jamais la surprise**. L'assaillant ne reçoit **aucun avantage de surprise**, même si le personnage dissimule sa vigilance. Il peut exploiter ses autres traits défensifs :
- **Agilité surhumaine** : avantage à **tous ses jets d'esquive** (exception explicite sur le jet du réacteur à la règle d'or) ;
- **Réaction rapide** : lorsque sa réaction normale est déjà dépensée, **une esquive gratuite contre chaque attaque entrante**, sans offrir une riposte ou une attaque gratuite.

L'ensemble ne donne aucune attaque hors tour supplémentaire. **Arbitrage tranché le 9 novembre 2026 :** le Spider Sense **supprime entièrement l'avantage de surprise** de l'assaillant. Exemple : Peter Parker sent Deadpool préparer son tir de sniper sur un toit *au moins deux tours avant* dans la scène décrite. Il peut faire semblant de ne rien avoir remarqué, mais il est déjà prêt : aucun avantage de surprise pour Deadpool. Les deux tours illustrent cet exemple, **sans imposer de durée universelle fixe**. Référence détaillée : [Traits et Spider Sense](./idees-disciplines-et-traditions.md#exemple-de-construction-par-traits-complémentaires--sixième-sens-et-spider-sense).

### Principe complémentaire — manœuvres martiales

> **Décision de conception exprimée le 8 novembre 2026 :** les manœuvres spéciales universelles telles que **Feinte**, **Désarmement**, **Projection** et **Poussée** ont, de base, des **effets tactiques sans dégâts** (S08–S12). Des traits de discipline, notamment **Escrime** et **Arts martiaux**, peuvent permettre d'**infliger les dégâts normaux de l'arme en plus de l'effet** avec **une seule action complexe**, sans ajouter un second jet de dégâts ou une seconde attaque.
>
> Exemples de manœuvres spécialisées **à concevoir, non encore validées** : *Botte feinteuse* (frappe normale + ouverture), *Désarmement offensif* (frappe + désarmement), *Projection martiale* (frappe + À Terre), *Coup repoussant* (frappe + recul).
>
> **Point de vigilance :** l'opposition d'une feinte ordinaire n'est pas nécessairement la même qu'une attaque normale. La version offensive doit résoudre sa frappe **contre la défense appropriée**, sans permettre de contourner gratuitement l'esquive ou la parade. Une seule réussite ne doit pas être comptée comme deux attaques distinctes.

### Cohérence et précisions nécessaires avant rédaction normative

1. **S02 + S28 — ARBITRAGE CLARIFIÉ le 9 novembre 2026 :** aucune contradiction. **Allonge / zone de contrôle = TAILLE du combattant + bonus d'allonge de l'arme employée.** La TAILLE représente l'allonge corporelle (notamment la longueur des bras) ; une arme peut l'étendre. S02 retient le principe de portée réelle, S28 donne son calcul. **Pas d'avantage d'attaque automatique au seul motif d'une TAILLE supérieure.** Les valeurs des bonus d'allonge par arme restent à définir dans l'équipement, sans modifier la formule.
2. **S22 B précisé le 9 novembre 2026 — risque de tir ami sur un 6 au dé d'action.** Le tir dans une mêlée s'effectue sans désavantage automatique. **Si le dé d'action effectivement retenu indique 6, le tir échoue et peut provoquer une complication, notamment atteindre un allié exposé dans l'axe de tir.** Un échec sur 4 ou 5 (lorsque le seuil est inférieur) ne déclenche pas ce risque spécifique. Le 6 n'est pas forcément un échec critique : le SRD réserve celui-ci au double 6 sur les deux dés d'action. Les avantages/désavantages sont appliqués avant de déterminer le dé d'action retenu. **À préciser avant rédaction normative :** l'allié touchable doit être vraisemblablement exposé, et la procédure exacte de choix de la cible collatérale / dégâts éventuels reste à définir. Ne pas faire d'un 6 un impact automatique sur un allié absent de la ligne de tir.
3. **S19 A — CLARIFIÉ LE 9 NOVEMBRE 2026 :** surprise = avantage au jet de l'attaquant ; **aucune défense ni réaction** pour la victime ignorant réellement l'attaque. **Sixième sens** autorise exceptionnellement une réaction d'esquive au jet normal, **sans retirer l'avantage de surprise** de l'attaquant. **Spider Sense** signifie **absence réelle de surprise**, donc **aucun avantage de surprise** pour l'assaillant, avec défense et autres traits normalement disponibles. Ne pas additionner des modifications pour une même circonstance. Harmoniser ultérieurement avec le SRD.
4. **S03 B + S04 A — déclenchement unique :** entrer et circuler dans l'allonge ne provoque rien ; **sortir** de l'allonge provoque au plus une attaque d'opportunité par adversaire ayant encore sa réaction, sauf repli prudent. Les ennemis ne reçoivent pas de réaction supplémentaire. Une attaque d'opportunité ratée n'empêche pas la sortie sauf autre capacité.
5. **S08–S12 — coût des oppositions défensives :** une résistance à une manœuvre (retenir son arme, ne pas tomber, ne pas être agrippé) n'exige pas automatiquement une réaction, contrairement à une esquive/parade active. À expliciter, sinon chaque feinte consommerait de facto la réaction du défenseur, contrairement à l'intention.
6. **S13 B — flanc sans orientation sur grille :** définir une prise de flanc crédible en théâtre de l'esprit, sans introduire une règle permanente d'orientation. Ne pas additionner les mêmes circonstances comme « surnombre » et « flanc » pour provoquer mécaniquement un double avantage.
7. **S24 — DISTINCTION STRUCTURANTE DE L'AUTEUR, 9 NOVEMBRE 2026 :** la règle précédemment construite concerne **le tir de barrage/couverture** (feu qui dissuade de s'exposer). Le **tir de suppression**, lui, est d'abord **une attaque de zone contre les cibles visibles et exposées**, puis **le tir de barrage/couverture peut en être le prolongement**, après neutralisation des cibles exposées, afin d'empêcher les autres de quitter leur abri. **Deux phases d'un même feu, sans imposer deux actions complexes ni deux jets initiaux à ce stade.** La phase de couverture conserve les arbitrages validés : D666 initial de référence, désavantage au personnage qui s'expose, jet opposé sans seuil propre pour déplacement simple, égalité des deux réussites = action accomplie + une balle, défaite = action interrompue + une balle, échec critique = trois balles, dé rouge initial comme intensité, aucun comptage individuel des munitions ni test d'INT. **Phase d'attaque de zone encore à concevoir** : une rafale courte de PM ne doit pas avoir la puissance d'un feu nourri de mitrailleuse alimentée par bande ; discriminer le volume de feu sans perdre la simplicité (paramètre d'arme ou manœuvre), préciser les défenses des cibles visibles et le passage entre les phases. L'ancienne règle SRD « tir de saturation » dans l'équipement décrit plutôt la couverture et devra être renommée/harmonisée ultérieurement.
8. **S25 A — timing de l'action préparée :** déterminer à quel moment le déclencheur interrompt les autres actions et comment il interagit avec une réaction déjà consommée.
9. **S26 A — aide et double avantage :** plusieurs assistants ne doivent pas produire automatiquement plusieurs avantages lorsque tous offrent la même aide ; définir brièvement quand deux contributions sont indépendantes.
10. **S07 A / S20 A — états existants :** conserver les effets normatifs `À Terre`, `Inconscient`, `Paralysé`, et la capacité à réagir si l'état le permet.
11. **S27 A — refonte des postures :** le SRD actuel donne déjà un effet à la posture défensive ; S27 A suppose la future refonte des postures en traits débloquant des manœuvres, **pas encore promulguée**.
12. **S14 A — absence de compétence :** le SRD pénalise déjà l'Incompétent ; ne pas appliquer deux fois un désavantage pour la même incompétence.

### S06 — Terrain difficile (arbitrage complémentaire du 9 novembre 2026)

**Décision de l'auteur : cumuler les deux contraintes.** Le terrain difficile gêne **à la fois le déplacement et le combat**.

- **Déplacement :** distance parcourue avec une action simple **divisée par deux** (sans test ordinaire).
- **Combat :** **désavantage aux jets de combat** réalisés alors que le personnage évolue sur le terrain difficile, y compris les attaques et les esquives/parades actives. L'effet résulte du terrain, pas d'un nouvel état spécifique.
- **Obstacle dangereux :** si l'environnement comporte un obstacle ou danger distinct (chute, passage périlleux), un jet approprié peut rester requis, indépendamment du terrain difficile.
- **Cumul à préciser avant rédaction normative :** les états environnementaux déjà définis par le SRD (dont ceux qui changent le coût du déplacement) sont prioritaires lorsqu'ils décrivent le même obstacle ; ne pas compter deux fois la même gêne. Les deux contraintes voulues ici (mobilité et combat) sont bien distinctes et s'appliquent ensemble.
- **Périmètre des jets à préciser lors de la mise au propre :** déterminer si les tirs depuis une position stabilisée à l'intérieur du terrain difficile restent pénalisés ou si seuls les gestes de combat demandant appui et mobilité le sont. L'intention générale de pénaliser le combat demeure actée.

## I. Contact, déplacement et contrôle du terrain

### S01 — Entrer au contact

- **Option A :** entrée libre, puis action complexe pour attaquer ; pas de réaction provoquée.
- **Option B :** entrer dans l'allonge d'un ennemi vigilant déclenche une réaction.
- **Ma préférence : A.** L'entrée en mêlée ne doit pas punir les personnages qui cherchent le contact.
- **Arbitrage de l'auteur : A RETENU** (8 novembre 2026 ; décision de conception, non intégrée au SRD).

### S02 — Zone de menace

- **Option A initiale :** zone définie par l'allonge réelle du combattant équipé de son arme ; réaction possible quand une règle la déclenche.
- **Option B initiale :** zone standard centrée sur chaque adversaire, quelle que soit l'arme.
- **Arbitrage de l'auteur : A RETENU, PRÉCISÉ LE 9 NOVEMBRE 2026.** La zone de contrôle est basée sur **TAILLE + bonus d'allonge de l'arme** ; voir S28. Il n'existe pas de zone de contact identique pour tous. Ce calcul décrit la portée réelle, sans bonus d'attaque automatique.

### S03 — Traverser la zone ennemie

- **Option A :** réaction dès qu'on traverse la zone, même sans la quitter.
- **Option B :** réaction seulement quand on quitte l'allonge ennemie.
- **Ma préférence : B.** Un déclencheur unifié réduit l'arbitrage sur la trajectoire.
- **Arbitrage de l'auteur : B RETENU** (8 novembre 2026 ; décision de conception, non intégrée au SRD).

### S04 — Rompre la mêlée

- **Option A :** retrait normal = attaque d'opportunité (réaction) ; retrait prudent = action complexe sacrifiée + déplacement simple, sans réaction.
- **Option B :** retrait via opposition d'Agilité/Sport ; succès annule l'opportunité.
- **Ma préférence : A.** Coût clair, sans jet supplémentaire.
- **Arbitrage de l'auteur : A RETENU** (8 novembre 2026 ; décision de conception, non intégrée au SRD).

### S05 — Bloquer un passage

- **Option A :** opposition physique (action complexe de celui qui force) ; succès permet de passer, échec bloque.
- **Option B :** le défenseur bloque automatiquement tant qu'il tient sa place, sauf attaque qui le déplace.
- **Ma préférence : A.** Laisser une chance à la ruse et au mouvement.
- **Arbitrage de l'auteur : A RETENU** (8 novembre 2026 ; décision de conception, non intégrée au SRD).

### S06 — Terrain difficile

- **Option A initiale :** demi-déplacement, sans jet ordinaire ; les obstacles dangereux demandent un test.
- **Option B initiale :** déplacement normal, mais désavantage aux actions physiques concernées.
- **Arbitrage de l'auteur : A + B CUMULÉS** (9 novembre 2026). Le déplacement est divisé par deux **et** les jets de combat sur le terrain difficile subissent un désavantage. Voir la précision en synthèse ; pas encore intégré au SRD.

## II. Mêlée et manœuvres universelles

### S07 — Frapper une cible À Terre

- **Option A :** conserver le SRD (avantage en mêlée) ; esquive/parade encore possible si la cible peut agir.
- **Option B :** la cible À Terre perd aussi le droit d'esquiver/parader.
- **Ma préférence : A.** Ne pas ajouter une seconde pénalité à un état déjà vulnérable.
- **Arbitrage de l'auteur : A RETENU** (8 novembre 2026 ; décision de conception, non intégrée au SRD).

### S08 — Feinte

- **Option A :** action complexe opposée (Corps à corps/Influence contre Vigilance) ; victoire donne un avantage à la prochaine attaque liée.
- **Option B :** attaque avec désavantage ; si elle touche, procure un avantage à la prochaine attaque.
- **Ma préférence : A.** Une manœuvre générique accessible à tous, que les traits pourront accélérer.
- **Arbitrage de l'auteur : A RETENU** (8 novembre 2026 ; décision de conception, non intégrée au SRD).

### S09 — Désarmer

- **Option A :** action complexe opposée, sans dégâts ; victoire fait lâcher l'objet.
- **Option B :** attaque avec désavantage ; une touche inflige les dégâts et désarme.
- **Ma préférence : A.** Une action = un objectif ; les traits débloqueront les combinaisons.
- **Arbitrage de l'auteur : A RETENU** (8 novembre 2026 ; décision de conception, non intégrée au SRD).

### S10 — Projeter / renverser

- **Option A :** opposition physique, action complexe, sans dégâts ; victoire applique À Terre.
- **Option B :** attaque avec désavantage ; une touche blesse et renverse.
- **Ma préférence : A.** Évite de banaliser le contrôle + dégâts pour tous.
- **Arbitrage de l'auteur : A RETENU** (8 novembre 2026 ; décision de conception, non intégrée au SRD).

### S11 — Agripper

- **Option A :** opposition de Corps à corps/FOR, action complexe, sans dégâts ; victoire applique Agrippé, libération selon SRD.
- **Option B :** attaque ordinaire réussie qui inflige aussi l'état Agrippé.
- **Ma préférence : A.** Conserver l'économie SRD ; une seule opposition, pas un jet pour toucher puis un jet pour saisir.
- **Arbitrage de l'auteur : A RETENU** (8 novembre 2026 ; décision de conception, non intégrée au SRD).

### S12 — Pousser / repousser

- **Option A :** opposition physique, action complexe, sans dégâts ; la cible recule d'environ 2 m.
- **Option B :** attaque ordinaire avec désavantage ; touche et repousse, avec dégâts.
- **Ma préférence : A.** Les effets du décor (falaise, vitre) comptent séparément.
- **Arbitrage de l'auteur : A RETENU** (8 novembre 2026 ; décision de conception, non intégrée au SRD).

### S13 — Surnombre / prise de flanc

- **Option A :** deux attaquants ou plus au contact suffisent à accorder un avantage.
- **Option B :** un avantage seulement si la cible est véritablement prise de flanc / doit surveiller deux axes.
- **Ma préférence : B.** Évite un avantage automatique permanent dans chaque mêlée à deux.
- **Arbitrage de l'auteur : B RETENU** (8 novembre 2026 ; décision de conception, non intégrée au SRD).

### S14 — Arme improvisée

- **Option A :** dégâts par analogie ; désavantage uniquement si objet difficile à manier ou absence de compétence appropriée.
- **Option B :** désavantage systématique pour toute arme improvisée.
- **Ma préférence : A.** Une bouteille cassée n'est pas inutilisable ; les obstacles réels priment.
- **Arbitrage de l'auteur : A RETENU** (8 novembre 2026 ; décision de conception, non intégrée au SRD).

## III. Discrétion, perception et surprise

### S15 — Se cacher

- **Option A :** action complexe de Discrétion contre Vigilance pertinente, avec abri plausible ; état de détection relatif à chaque observateur.
- **Option B :** réussite statique contre seuil fixé par MJ ; pas d'opposition.
- **Ma préférence : A.** Respecte les compétences et la notion d'observateur.
- **Arbitrage de l'auteur : A RETENU** (8 novembre 2026 ; décision de conception, non intégrée au SRD).

### S16 — Progresser furtivement

- **Option A :** déplacement discret à demi-vitesse ; relancer la Discrétion seulement si l'exposition change.
- **Option B :** vitesse normale, mais désavantage au jet de Discrétion.
- **Ma préférence : A.** La vitesse normale furtive peut devenir un trait ; B pourra rester une prise de risque ponctuelle.
- **Arbitrage de l'auteur : A RETENU** (8 novembre 2026 ; décision de conception, non intégrée au SRD).

### S17 — Rechercher un intrus

- **Option A :** recherche active = action complexe de Vigilance opposée à la Discrétion ; percevoir l'évident ne coûte rien.
- **Option B :** Vigilance automatique à chaque tour sans action déclarée.
- **Ma préférence : A.** Ne pas multiplier les jets de détection gratuits.
- **Arbitrage de l'auteur : A RETENU** (8 novembre 2026 ; décision de conception, non intégrée au SRD).

### S18 — Créer une diversion

- **Option A :** action complexe appropriée ; succès ouvre une possibilité crédible de se cacher ou passer, sans invisibilité automatique.
- **Option B :** succès impose directement un désavantage temporaire à toute Vigilance de la cible.
- **Ma préférence : A.** L'effet fictionnel est plus polyvalent et demande moins de suivi.
- **Arbitrage de l'auteur : A RETENU** (8 novembre 2026 ; décision de conception, non intégrée au SRD).

### S19 — Attaque surprise / embuscade

- **Option A initiale :** une cible ignorant totalement l'attaquant ne peut réagir à sa première attaque ; celle-ci a un avantage.
- **Option B initiale :** la cible ne peut réagir, mais pas d'avantage d'attaque automatique.
- **Arbitrage de l'auteur : A RETENU, PRÉCISÉ LE 9 NOVEMBRE 2026.**
  1. **Initiateur (attaquant) :** avantage à son attaque surprise.
  2. **Victime réellement inconsciente de l'attaque :** **aucune défense** (pas de jet d'esquive/parade, aucune réaction contre cette attaque).
  3. **Victime avec Sixième sens :** surprise réelle, mais le trait autorise à utiliser la **réaction habituelle d'esquive** avec un **jet normal**. L'attaquant **conserve l'avantage de surprise**.
  4. **Victime avec Spider Sense :** **aucune surprise réelle** ; elle sent le danger en amont, est **toujours en combat** et peut réagir normalement, même si elle feint l'insouciance. L'attaquant **n'obtient pas l'avantage de surprise**. Les autres avantages indépendants ne sont pas annulés.
  5. **Aucun désavantage de surprise** n'est appliqué en miroir au défenseur. Un trait comme *Agilité surhumaine* peut, par exception explicite, lui conférer son propre avantage sur un jet d'esquive.
- **Principe applicable :** règle d'or de l'initiateur ci-dessus. **Protection surnaturelle passive et états normatifs** restent applicables selon leurs textes. Aucun changement du SRD normatif pour le moment.

### S20 — Cible sans défense / coup de grâce

- **Option A :** hors menace immédiate et si mort certaine d'un humain ordinaire impuissant, pas de jet ; sinon appliquer le critique SRD.
- **Option B :** toujours jeter les dés ; une touche de mêlée sur Inconscient/Paralysé est critique (SRD).
- **Ma préférence : A.** Ne pas confondre être distrait avec être physiquement sans défense ; protections surnaturelles respectées.
- **Arbitrage de l'auteur : A RETENU** (8 novembre 2026 ; décision de conception, non intégrée au SRD).

## IV. Combat à distance

### S21 — Arme à feu au contact

- **Option A :** pistolet utilisable au contact ; arme longue avec désavantage si elle peut encore être pointée.
- **Option B :** tous les tirs au contact subissent un désavantage, sauf trait Gun-Fu.
- **Ma préférence : A.** Différencier les armes courtes et longues sans sous-système.
- **Arbitrage de l'auteur : A RETENU** (8 novembre 2026 ; décision de conception, non intégrée au SRD).

### S22 — Tirer dans une mêlée

- **Option A initiale :** désavantage pour viser une cible au contact d'un allié ; échec critique = risque de tir ami.
- **Option B initiale :** jet ordinaire, mais risque de toucher un allié sur n'importe quel échec.
- **Arbitrage de l'auteur : B RETENU, PRÉCISÉ LE 9 NOVEMBRE 2026.** Pas de désavantage automatique ; **le risque de tir ami se déclenche lorsque le dé d'action retenu affiche 6** (échec automatique). Les autres échecs ne provoquent pas cette complication spécifique. Un 6 simple suffit : le double 6 constitue toujours l'échec critique déjà prévu par le SRD. Le tir ne peut blesser un allié que si la géométrie de la scène le permet ; la résolution exacte de cette complication reste à préciser. **Ne pas modifier le SRD à ce stade.**

### S23 — Couvert

- **Option A :** couvert partiel = désavantage, total = ligne de tir bloquée ; matière pénétrable gérée par l'arme.
- **Option B :** plusieurs degrés de couvert, allant jusqu'au double désavantage.
- **Ma préférence : A.** Une seule distinction utile, sans barème.
- **Arbitrage de l'auteur : A RETENU** (8 novembre 2026 ; décision de conception, non intégrée au SRD).

### S24 — Tir de suppression puis tir de barrage/couverture

**Distinction ajoutée par l'auteur le 9 novembre 2026 — conception non normative.**

**Un même feu automatique peut avoir deux effets successifs :**

1. **Tir de suppression — attaque de zone immédiate.** L'arme bat une zone et **attaque les cibles visibles et exposées qui s'y trouvent**. Ce n'est pas seulement une menace en cas de mouvement futur. **Le nombre/la gravité des touches doit dépendre du volume de feu réellement soutenable par l'arme** : une courte rafale de pistolet-mitrailleur n'a pas l'effet d'un feu soutenu à la mitrailleuse (ex. FN M249 Para). **Mécanique précise à concevoir**, sans ajouter arbitrairement un nombre de balles touchantes ou de bonus de dégâts que l'auteur n'a pas approuvé.
2. **Tir de barrage/couverture — effet persistant.** **Une fois les cibles exposées neutralisées**, le tireur peut maintenir la pression sur la zone : les adversaires encore à l'abri sont dissuadés d'en sortir ou d'attaquer. **La règle d'exposition ci-dessous, déjà arbitrée, correspond à cette phase de couverture**, et non à l'attaque initiale de zone.

**Architecture suggérée, à valider avant normative :** une **seule manœuvre de feu automatique**, avec une phase d'attaque initiale et une phase de couverture consécutive, **sans coût supplémentaire systématique en action complexe ni second jet initial**. Le même D666 pourrait servir aux deux phases : jet d'attaque de zone initial sur les cibles visibles, puis référence d'opposition à ceux qui s'exposent ; **ce réemploi n'est pas encore un arbitrage de l'auteur**. La transition « après neutralisation des cibles visibles » indique la séquence fictionnelle voulue, **pas encore un déclencheur mécanique exhaustif**.

#### Phase de couverture — règles déjà arbitrées

Un personnage bat une zone en consacrant **une action complexe** au feu automatique et dispose d'un **D666 initial** (par exemple `345`). Dans la **phase de couverture**, ce résultat ne constitue pas une nouvelle attaque sur une cible déterminée : il est **l'étalon de l'opposition** pour les personnages s'exposant ensuite au feu.

- **Les dés d'action du tireur** fournissent la **référence d'opposition** : la qualité du feu de suppression est représentée par son jet de rafale, et **non par un seuil arbitraire de difficulté pour la cible**. Utiliser le dé d'action pertinent du tireur selon le mécanisme D666.
- **Le dé rouge du tireur** fournit **l'intensité unique des dégâts** pour toutes les expositions à ce feu. Exemple : `345` → intensité **5**.
- **Choix libre de s'exposer :** joueurs et MJ décident librement de sortir du couvert, tirer ou traverser la zone. **Aucun jet d'INT ni autre test de comportement.**
- **Action exposée comportant déjà un jet :** elle se résout **avec désavantage**. La conséquence d'un échec au cours de l'exposition est aussi de recevoir une balle, et celle d'un échec critique, trois balles. **Articulation précise avec la valeur d'opposition du tireur à harmoniser** pour éviter de créer deux jets ou deux tests de réussite inutiles.
- **Action simple normalement sans jet** (déplacement, se relever, traversée, etc.) : effectuer exceptionnellement un **jet d'opposition D666 avec désavantage contre le jet de rafale du tireur**. **Aucun seuil d'exposition chiffré distinct n'existe** ; la comparaison s'effectue avec le dé d'action du tireur. Les règles d'opposition du SRD servent de base, sous réserve des adaptations explicitement mentionnées ci-dessous.
- **Victoire du personnage exposé :** son action a lieu et il ne reçoit aucune balle au titre de la suppression.
- **Égalité entre deux réussites (simultanéité) :** **les deux effets se produisent**. Le personnage **réussit son action** et **reçoit une balle** : s'il tirait, il touche sa cible et est lui-même touché ; s'il se déplaçait, il atteint son point d'arrivée et est touché en chemin. **Ceci n'est pas une action interrompue.**
- **Défaite ordinaire du personnage exposé :** son action **échoue ou est interrompue** et il reçoit **une balle**. S'il se déplaçait, **il n'atteint pas sa destination**, contrairement au cas d'égalité ; s'il tirait, son tir ne touche pas la cible. Aucun effet d'action réussie n'est conservé par défaut.
- **Échec critique (double 6 des dés d'action du personnage exposé) :** l'action échoue et il reçoit **exactement trois balles**. Ce nombre est **fixe**, même si la valeur Rafale de l'arme n'est pas 3.
- **Dégâts bruts en cas de touche :** `intensité rouge du tir initial + (Code de l'arme × nombre de balles reçues)`, avant armure et Résilience.
- **Comptage abstrait des munitions :** si plusieurs personnages s'exposent, chacun résout son risque indépendamment ; ne jamais limiter rétroactivement les balles reçues par la somme des projectiles tirés ni par la capacité du chargeur.
- **Aucun état `Cloué`** n'est créé. L'ancienne idée d'imposer un échec d'INT aux PNJ humains pour sortir du couvert est **abandonnée**.

**Point distinct prioritaire : l'attaque de zone initiale** doit être créée et équilibrée. Le SRD actuel définit la rafale courte via `1 + marge` et un plafonnement par la valeur de rafale, mais le catalogue d'armes à feu exposé ne renseigne pas aujourd'hui une caractéristique numérique commune de volume de feu soutenu (il indique surtout FA / capacité / Code). Ne pas assimiler un chargeur de 30 coups à une mitrailleuse alimentée par bande uniquement en fonction des dégâts du calibre.

**Seuls les cas limites suivants restent à harmoniser avant la rédaction normative :**
1. **Égalité entre deux réussites — TRANCHÉ :** **action réussie ET une balle reçue**. La réussite simultanée standard du SRD s'applique exactement : tir réussi mais tireur exposé touché ; déplacement achevé mais personnage touché. Attention, une égalité de **deux échecs** ne constitue pas une réussite simultanée ; ce cas relève encore du traitement des jets initiaux échoués.
2. **Dé d'action 6 du tireur :** le 6 est toujours un échec dans une action ordinaire. Fixer le traitement d'un jet initial dont le dé d'action pertinent indique 6, puisqu'il s'agit ici d'un **étalon de suppression**, non d'une attaque sur une cible donnée.
3. **Actions complexes :** préciser si le seul jet d'action avec désavantage est également comparé au jet initial du tireur, et comment la réussite de l'action et le fait d'être touché s'articulent sans second jet.
4. **Durée et étendue :** fixer la zone contrôlée et la durée de validité du jet de rafale.

**Exemple :** un tireur obtient `345` avec une arme de Code 2. Son dé d'action pertinent (bleu 3 ou blanc 4 selon l'action) est conservé pour les oppositions ultérieures, et son dé rouge **5** pour les dégâts. **Victoire de l'exposé : 0 dégât**. **Égalité entre deux réussites : action accomplie + 7 dégâts bruts** (une balle). **Défaite ordinaire : action manquée/interrompue + 7 dégâts bruts** (une balle). **Échec critique : action manquée/interrompue + 11 dégâts bruts** (trois balles). Les protections s'appliquent ensuite. Aucun seuil indépendant d'exposition n'est créé.


### S25 — Action préparée / embuscade

- **Option A :** sacrifier son action complexe pour armer un déclencheur ; l'exécuter dépense sa réaction avant le prochain tour.
- **Option B :** action en attente sans dépense de réaction, mais on perd sa prochaine action complexe.
- **Ma préférence : A.** Réutilise la réaction existante et clarifie la priorité d'action.
- **Arbitrage de l'auteur : A RETENU** (8 novembre 2026 ; décision de conception, non intégrée au SRD).

## V. Soutien, défense et gabarit

### S26 — Aider un allié

- **Option A :** action complexe crédible : donne un avantage ; jet seulement si aide risquée ou contestée.
- **Option B :** chaque aide exige un jet de compétence réussi pour accorder l'avantage.
- **Ma préférence : A.** Éviter deux jets systématiques pour une seule action coordonnée.
- **Arbitrage de l'auteur : A RETENU** (8 novembre 2026 ; décision de conception, non intégrée au SRD).

### S27 — Renoncer à attaquer pour se défendre

- **Option A :** convertir son action complexe en action simple (repli, couvert, etc.) ; aucun bonus défensif automatique.
- **Option B :** tous peuvent sacrifier leur action complexe pour imposer un désavantage à leurs attaquants.
- **Ma préférence : A.** Préserve la valeur des futures manœuvres de Défenseur et Parade totale.
- **Arbitrage de l'auteur : A RETENU** (8 novembre 2026 ; décision de conception, non intégrée au SRD).

### S28 — Taille et allonge

- **Option A initiale :** zone menacée dépend de l'allonge effective, sans expliciter la part de TAILLE.
- **Option B initiale :** TAILLE influe sur la zone menacée et/ou l'avantage tactique.
- **Arbitrage de l'auteur : B RETENU, PRÉCISÉ LE 9 NOVEMBRE 2026.** **Allonge / zone de contrôle = TAILLE + bonus d'allonge de l'arme.** La TAILLE reflète l'allonge naturelle (bras/membres), l'arme apporte son éventuelle extension. **La TAILLE ne crée pas, à elle seule, d'avantage au jet d'attaque.** Les bonus d'allonge des armes restent à calibrer.

## Remarques pour l'intégration ultérieure

- **S07** : état À Terre déjà défini dans `reference/etats.md` ; ne pas dupliquer la mécanique existante.
- **S11** : libération d'Agrippé déjà détaillée dans `reference/etats.md`.
- **S19 / règle d'or** : `resolution.md` décrit actuellement un désavantage du protagoniste pris au dépourvu. **Ce passage doit être harmonisé plus tard** : avantage sur le jet de l'attaquant lorsqu'il y a surprise réelle ; aucune défense si la victime ignore l'attaque ; **Sixième sens** permet une esquive normale sans neutraliser cet avantage ; **Spider Sense** rend la victime déjà alertée et supprime la surprise elle-même. Ne pas compter deux fois la même circonstance.
- **S20** : `Inconscient` et `Paralysé` permettent déjà un critique sur touche en mêlée. L'option A ajoute le seul cas de mise à mort certaine hors pression ; ce n'est pas une règle d'assassinat instantané sur cible vigilante.
- **S21** : une saisie/agrippement peut rendre l'arme impossible à diriger ; traiter la cohérence fictionnelle avant les jets.
- **S24** : distinguer désormais **suppression = attaque immédiate des cibles visibles dans une zone** et **barrage/couverture = effet résiduel empêchant de se découvrir**. **La mécanique de couverture est déjà arbitrée** (opposition au jet du tireur, égalité = action accomplie + une balle, défaite = action interrompue + une balle, critique = trois balles, pas de comptabilité des munitions entre les exposés). **La mécanique d'attaque de zone initiale reste à concevoir**, en tenant compte du volume de feu (PM à rafale courte vs mitrailleuse à bande), et du fait que le SRD appelle aujourd'hui « tir de saturation » un effet plutôt apparenté à la couverture. Préciser également le 6 du tireur, la durée, la zone et le passage entre phases.
- **S25** : ne pas accorder deux actions complexes dans le même round ; l'action préparée prend la place de l'action complexe déclarée.
- Les futures manœuvres de posture ou discipline sont des **exceptions** aux règles communes ci-dessus. Exemples : retrait sans attaque d'opportunité, feinte et attaque combinées, tir au contact sans pénalité, garde du corps, tirs en mouvement, projection offensive.

## Contributions de Savage Worlds et du Monde des Ténèbres

- **Savage Worlds** : retrait de mêlée, surnombre, agrippement, achèvement d'une cible totalement impuissante, suppression, action d'attente, tir dans la mêlée, soutien et prises de risques.
- **World of Darkness / Vampire V20** : embuscade opposant Discrétion à Perception, attaques de flanc, localisation des coups, lutte/saisie et distinction entre parade, esquive et blocage. Ne pas recopier les réserves de dés ni les modificateurs de difficulté de Storyteller.
- **Chronicles of Darkness** : intéressant pour les conflits non létaux, les enquêtes et la pression sociale sur plusieurs scènes, **hors de cette première série de 28 arbitrages**.

## Situations supplémentaires à envisager après cette série

- S29 : attaque localisée (main, jambe, tête, cœur) et conséquences non létales.
- S30 : course-poursuite et fuite prolongée hors combat.
- S31 : intimidation, pression, négociation et manipulation sociale ; volonté et refus raisonnable.
- S32 : prise d'otage et menace d'une arme à bout portant.
- S33 : embuscades collectives, planification et préparatifs.
- S34 : action risquée prolongée / défi de compétence à plusieurs étapes.

## Suivi

Après réponse du créateur : conserver chaque option choisie (A/B), commentaires et éventuelles modifications, avec date, sans confondre les propositions avec le SRD validé.
