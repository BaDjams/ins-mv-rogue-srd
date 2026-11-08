# Règles situationnelles — propositions à arbitrer

> **STATUT : DOCUMENT DE TRAVAIL, NON NORMATIF** — Version de conception du 8 novembre 2026.
> Toutes les propositions portant la mention **[PROPOSITION]** sont soumises à validation. Les faits marqués **[SRD]** sont constatés dans les pages actuelles de `src/content/docs/mecanique/` et `src/content/docs/reference/etats.md`. Les règles du site ne sont pas modifiées par ce document.
>
> Objectif : définir d'abord **les options de tous les personnages**, puis seulement créer les traits qui modifient la portée, le coût ou les conditions de ces options.
>
> Inspirations de structures : Savage Worlds (désengagement, groupement, agrippement, « finishing move », armes de contact, attaque de suppression), Pathfinder 2e (détection relative, feinte, déplacements, prise de flanc), adaptés au D666 et non transposés à l'identique.

## Invariants : ne pas refaire le moteur

- **[SRD]** 1 action complexe, 1 action simple, 1 réaction par round ; l'action complexe peut être échangée contre une action simple. Les réactions incluent esquive/parade, contre-attaque et attaque d'opportunité.
- **[SRD]** Opposition au D666 : un succès bat un échec ; entre succès, plus petit dé d'action gagnant ; à égalité de succès, les deux actions aboutissent.
- **[SRD]** Avantage/désavantage ; un second avantage déclenche l'explosion d'intensité. Ne pas multiplier les bonus numériques.
- **[SRD]** Le tir en rafale touche `1 + marge` balles, limité par la rafale et les munitions disponibles.
- **[SRD]** Se relever coûte une action simple ; `À Terre` : avantage aux attaques de mêlée contre la cible, désavantage au tir au-delà de 6 m.
- **[SRD]** `Agrippé`, `Entravé`, `Inconscient`, `Paralysé` existent déjà ; sur victime inconsciente ou paralysée, une attaque de mêlée réussie est critique.
- **[SRD]** Discrétion et Vigilance existent ; jet fermé possible ; adversaire pris au dépourvu subit déjà un désavantage lors d'une opposition.
- **À MIGRER** : les postures actuelles contiennent des effets intrinsèques et des manœuvres gratuites pour tous ; les décisions de conception récentes prévoient un trait d'accès à la posture, aucune récompense intrinsèque, et une première manœuvre au choix. Voir [Carnet de conception](./idees-disciplines-et-traditions.md).

## Principes d'application proposés

1. Une situation évidente et sans opposition ne demande pas nécessairement de jet.
2. Une option ordinaire doit consommer **au plus une action complexe** ; pas de sous-système à points d'action ni de jet additionnel automatique.
3. Les conséquences se notent par position, état, avantage/désavantage ou consommation d'une action/réaction.
4. Le cumul des avantages situationnels n'est pas automatique si les déclencheurs décrivent le même phénomène (ex. « deux alliés au contact » et « flanc découvert ») : ne pas récompenser deux fois la même ouverture.
5. Une cible inconsciente n'est pas équivalente à une cible seulement distraite. Une attaque furtive réussie ne tue pas automatiquement un être conscient et capable de se défendre.
6. Une situation n'accorde pas une réaction supplémentaire : chaque personnage ne dispose normalement que de sa réaction par round.

## A. Placement, contact, zone de contrôle — arbitrage prioritaire

### S01. Arriver au contact

- **[PROPOSITION]** Entrer dans la portée d'une arme de mêlée ne déclenche pas d'attaque d'opportunité. Se déplacer coûte une action simple comme prévu ; attaquer après arrivée exige de disposer encore de son action complexe.
- **Alternative** : attaquer immédiatement en arrivant au contact imposerait un désavantage ; mais ce risque de doublonner la Charge déjà décrite dans le SRD.
- **Futurs traits** : Charge, Allonge, Première frappe (réaction spéciale à l'entrée dans la zone).

### S02. Zone de contrôle / de menace

- **[PROPOSITION]** Une créature consciente, mobile et équipée d'une attaque de mêlée menace son allonge (contact ordinaire, portée étendue pour arme longue). La zone de contrôle n'empêche pas de se déplacer : elle permet seulement certaines réactions.
- **Alternative** : zone de contrôle abstraite sans distance fixe (« à portée réelle de l'arme »), idéale pour le jeu sans carte.
- **Futurs traits** : Sentinelle, Garde longue, Contrôle du terrain.

### S03. Traverser la zone sans engager l'adversaire

- **[PROPOSITION]** Traverser la portée d'un ennemi conscient et capable de réagir, pour passer derrière lui ou continuer sa course, provoque une attaque d'opportunité à sa discrétion. La réaction est dépensée. Un même ennemi ne peut réagir qu'une fois à ce déplacement.
- **Alternative** : ne déclencher qu'au **moment de quitter la zone**, ce qui uniformise cette règle avec le désengagement et réduit les discussions de trajectoire.
- **Futurs traits** : Insaisissable, Interception, Acrobate.

### S04. Battre en retraite / se désengager

- **[PROPOSITION]** Quitter le contact précipitamment : action simple de déplacement, mais chaque ennemi menaçant pouvant réagir peut effectuer une attaque d'opportunité. **Repli prudent** : dépenser aussi son action complexe pour quitter la mêlée sans provoquer ces réactions.
- **Alternative** : repli prudent = test d'AGI / Sport opposé à l'adversaire, plus rapide mais avec risque.
- **Futurs traits** : Extraction (repli prudent sans action complexe), Retraite couverte (protège un allié).

### S05. Bloquer un passage / intercepter

- **[PROPOSITION]** Si le passage est physiquement possible mais contesté (porte, escalier, couloir), celui qui barre l'accès effectue une opposition pour empêcher le passage. Ne pas ajouter une seconde attaque gratuite.
- **Futurs traits** : Rempart, Interception, Percée.

### S06. Terrain difficile / obstacle

- **[PROPOSITION]** Marcher sur terrain difficile réduit le déplacement d'une action simple à la moitié de TAILLE (minimum 1 m). Passer un obstacle risqué utilise une action complexe de Sport ; une réussite franchit, un échec laisse sur place avec complication si critique.
- **Futurs traits** : Tout-terrain, Acrobaties, Parkour.

## B. Mêlée, manœuvres et placement

### S07. Cible À Terre

- **[SRD]** Avantage pour l'attaquer en mêlée ; désavantage aux tirs de plus de 6 m ; la cible se relève pour une action simple. **Ne pas recréer cette règle.**
- **À confirmer** : son esquive/parade active reste-t-elle possible ? Recommandation : oui, sauf état empêchant d'agir.
- **Futurs traits** : Combattant au sol (supprime une pénalité de position), Frappe au sol.

### S08. Feinte

- **[PROPOSITION]** Action complexe ; opposition entre Corps à corps / Influence (selon la feinte) et Vigilance / PER de la cible. En cas de victoire, l'auteur ou un allié désigné gagne un avantage sur **sa prochaine attaque** contre cette cible avant la fin du prochain tour de l'auteur ; sinon rien.
- **Alternative** : la feinte n'aide que l'auteur, pour éviter une manœuvre de soutien sans condition.
- **Futurs traits** : Feinte éclair (feinte et attaque dans la même action complexe, avec contrepartie), Trompeur.

### S09. Désarmement

- **[PROPOSITION]** Action complexe, opposition de compétence martiale pertinente contre celle du porteur ; sur succès net, l'objet tenu tombe à proximité, **sans dégâts**. En cas d'égalité de réussites, ne pas désarmer : les deux conservent leur prise, quitte à narrer un échange tendu.
- **Futurs traits** : Désarmement expert (récupère l'arme), Main légère.

### S10. Faire tomber / projeter

- **[PROPOSITION]** Action complexe, opposition Corps à corps / Sport contre AGI / Sport ou Corps à corps ; sur victoire, la cible prend l'état `À Terre`, sans dégâts supplémentaires.
- **Futurs traits** : Projection brutale (dégâts mineurs), Judoka (projection dans une attaque).

### S11. Agripper / immobiliser / se libérer

- **[SRD]** `Agrippé` supprime le déplacement ; se libérer requiert déjà une action complexe et une opposition FOR/AGI.
- **[PROPOSITION]** Agripper par une action complexe opposée de Corps à corps / FOR ; le succès donne `Agrippé`. On ne cause pas de dégâts dans la même action. Maintenir la prise ne génère pas automatiquement de nouveau jet.
- **Futurs traits** : Étreinte, Immobilisation, Étranglement (soumis aux règles d'incapacité).

### S12. Pousser / déplacer de force

- **[PROPOSITION]** Action complexe, opposition FOR / Sport ou Corps à corps contre FOR ou AGI ; si victoire, repousser la cible d'environ 1–2 m (distance à fixer selon TAILLE), sans dégâts directs. Un terrain dangereux produit ses propres effets.
- **Futurs traits** : Charge de bouclier, Bousculade, Projection à distance.

### S13. Supériorité numérique / prise de flanc

- **[PROPOSITION]** Si un défenseur doit surveiller simultanément plusieurs ennemis menaçants en mêlée, **un seul avantage situationnel** peut être accordé aux attaques du camp surnuméraire. Un avantage total, pas un avantage par allié. Plusieurs alliés ne déclenchent pas automatiquement un double avantage.
- **Alternative** : réserver ce bénéfice à une prise de flanc réellement constatée pour limiter les effets en théâtre de l'esprit.
- **Futurs traits** : Combat en meute, Dos au mur (neutraliser l'avantage), Tacticien.

### S14. Arme improvisée / combattant désarmé

- **[PROPOSITION]** Objet maniable utilisé comme arme : dégâts définis par analogie avec une arme existante ; désavantage si sa forme gêne l'action ou si le personnage n'a aucune compétence pertinente. Aucun -1/-2 ad hoc.
- **Futurs traits** : Bagarreur, Cogneur, Art des objets improvisés.

## C. Discrétion, observation, surprise

### S15. Se cacher

- **[PROPOSITION]** Nécessite une possibilité crédible de se soustraire à la perception (couvert, obscurité, foule, diversion). Action complexe de Discrétion opposée à Vigilance des observateurs actifs ; jet potentiellement fermé.
- Trois situations relationnelles simples : **repéré** (connu et visible), **dissimulé** (position approximative connue), **ignoré** (la cible ne sait pas où vous êtes / ignore votre présence). Ces statuts sont **relatifs à chaque observateur**, pas des états globaux.
- **Futurs traits** : Camouflage, Disparition, Ombre familière.

### S16. Progresser discrètement

- **[PROPOSITION]** Se déplacer dans un contexte furtif utilise une action simple mais limite le déplacement à la moitié de TAILLE. Un nouveau test de Discrétion n'est demandé qu'en cas de changement significatif : traversée éclairée, surface bruyante, garde tournant la tête.
- **Alternative** : progresser à pleine vitesse avec désavantage au jet de Discrétion.
- **Futurs traits** : Pas feutrés (vitesse normale), Marche fantôme.

### S17. Détecter / chercher

- **[PROPOSITION]** Vigilance passive via la situation et les caractéristiques déclarées ; chercher activement un intrus ou un indice consomme une action complexe et provoque une opposition de Vigilance contre Discrétion lorsqu'un intrus se cache. Un échec ne certifie pas l'absence d'ennemi.
- **Futurs traits** : Œil de lynx, Sens du danger, Vigilance partagée.

### S18. Diversion

- **[PROPOSITION]** Une action complexe (Influence, Larcins ou autre compétence pertinente) peut détourner l'attention d'un témoin ; succès opposé à Vigilance : permet à une personne de tenter immédiatement de se cacher, sans accorder automatiquement l'invisibilité.
- **Futurs traits** : Diversion éclair, Comédien, Magicien de rue.

### S19. Attaque contre une cible ignorant la menace

- **[SRD]** Un adversaire qui ignore l'opposition subit déjà un désavantage à son jet d'opposition.
- **[PROPOSITION]** La cible qui ignore réellement la présence de l'assaillant ne peut pas utiliser de réaction contre **la première attaque** de celui-ci. L'attaquant bénéficie d'un avantage pour cette première attaque. L'agression révèle normalement l'attaquant après résolution. La cible reste soumise à ses protections surnaturelles ordinaires.
- **Alternative** : pas d'avantage automatique, seulement impossibilité de réaction + désavantage à une éventuelle opposition passive, pour limiter l'explosion de létalité.
- **Futurs traits** : Assassin, Embuscade, Lame silencieuse.

### S20. Achever une cible sans défense

- **[SRD]** `Inconscient` et `Paralysé` empêchent les réactions ; une attaque de mêlée réussie devient critique.
- **[PROPOSITION]** Hors pression immédiate, contre une personne ordinaire totalement sans défense (endormie, attachée et maîtrisée, inconsciente) avec une arme réellement létale : action complexe, issue létale sans jet **si aucune protection surnaturelle, intervention ou danger ne la rend incertaine**. Sinon utiliser la règle actuelle du coup critique. Une personne consciente, prise par surprise ou simplement À Terre n'est **jamais** automatiquement éliminée.
- **Alternative prudente** : conserver toujours un jet, en appliquant seulement le critique SRD.
- **Futurs traits** : Coup de grâce, Assassin patient ; ces traits ne doivent pas banaliser l'exécution de PNJ sans défense.

## D. Tirs et combat à distance

### S21. Tir au contact

- **[PROPOSITION]** Arme de poing utilisable au contact ; arme d'épaule longue subit un désavantage au contact ou devient inutilisable en cas d'agrippement sévère. Les réactions défensives restent possibles.
- **Futurs traits** : Gun-Fu, Tir à bout portant, Rétention d'arme.

### S22. Tir dans une mêlée

- **[PROPOSITION]** Tirer sur une cible étroitement mêlée à un allié impose un désavantage ; en cas d'échec critique, risque de toucher un tiers, au jugement du MJ. Éviter de tirer automatiquement sur un allié à chaque échec.
- **Futurs traits** : Tireur de précision, Tir chirurgical.

### S23. Couvert / dissimulation

- **[PROPOSITION]** Couvert partiel : désavantage pour toucher ; couvert total : pas de tir direct sans détruire/traverser l'obstacle. Obscurité, fumée et camouflage relèvent plutôt de la visibilité et de la discrétion ; ne pas cumuler automatiquement plusieurs fois le même défaut de perception.
- **[SRD]** Viser (action simple) confère déjà avantage au prochain tir.
- **Futurs traits** : Tir de couverture, Percée, Tireur d'élite.

### S24. Tir de suppression

- **[PROPOSITION]** Action complexe avec arme capable de rafale ; au lieu de dégâts, le tireur crée une **zone dangereuse restreinte** jusqu'à son prochain tour. Si le jet réussit, les adversaires qui s'y exposent perdent l'avantage d'un mouvement sûr et subissent un désavantage sur leur prochaine action liée à cette traversée ; demeurer à couvert ne coûte rien de plus. Coût en munitions correspondant à la rafale.
- **Alternative** : représenter la suppression par un état `Cloué` éphémère, mais n'ajouter l'état qu'après avoir vérifié sa nécessité.
- **Futurs traits** : Feu nourri, Mitrailleur, Suppression mobile.

### S25. Tir préparé / attente

- **[PROPOSITION]** Le personnage consacre son action complexe à déclarer une action et un déclencheur vérifiable (« je tire si la porte s'ouvre »). Il la résout lors du déclenchement avant son prochain tour, en dépensant sa réaction. Pas de seconde action complexe gratuite.
- **Futurs traits** : Tir réflexe, Vigilance de combat, Embuscade.

## E. Soutien et environnement

### S26. Aider un allié

- **[PROPOSITION]** Une action complexe de soutien appropriée, éventuellement résolue par un jet, offre un avantage sur la prochaine action liée de l'allié. Une même aide ne fournit pas plusieurs avantages ; si l'aide suffit à elle seule, pas de jet.
- **Futurs traits** : Meneur, Soutien instantané, Coordination.

### S27. Se défendre sans attaquer

- **[SRD]** Esquive/parade : réaction et opposition ; Parade Totale est actuellement une manœuvre de posture.
- **[PROPOSITION]** Tous peuvent renoncer à leur attaque pour se repositionner/se mettre à couvert, sans bénéficier automatiquement de l'ensemble des manœuvres de Défenseur. La posture et ses manœuvres doivent rester une acquisition intéressante.
- **Futurs traits** : Défenseur, Garde du corps, Parade totale.

### S28. Taille, allonge, adversaires atypiques

- **[PROPOSITION]** Ne pas confondre TAILLE (déplacement et gabarit) avec allonge de l'arme. Un adversaire bien plus grand peut contrôler une zone plus large, mais les écarts de taille n'accordent pas automatiquement plusieurs avantages.
- **Futurs traits** : Allonge, Géant, Combat contre les grandes créatures.

## Questions à arbitrer en priorité

| Priorité | IDs | Décision principale |
| --- | --- | --- |
| **P0** | S01–S04 | Contact, zone de menace, déclenchement des attaques d'opportunité, désengagement |
| **P0** | S15–S20 | Discrétion, surprise, attaque sur cible non consciente du danger, élimination d'un adversaire sans défense |
| **P1** | S08–S13 | Feinte, désarmement, saisie, poussée, flanc et surnombre |
| **P1** | S21–S25 | Tir au contact, couverture, tir dans la mêlée, suppression et attente |
| **P2** | S05–S07, S14, S26–S28 | Obstacles, terrain, aides, improvision et tailles |

## Points de vigilance avant fusion au SRD

- Les réactions consommées par les attaques d'opportunité entrent en concurrence avec les esquives/parades et protections.
- La manœuvre Charge est déjà dans le SRD ; définir S01–S04 avant de la réécrire.
- L'état `À Terre` et le critique contre l'inconscient sont déjà normatifs : éviter de les dupliquer ou de les contredire.
- **[PROPOSITION]** Élimination automatique des cibles sans défense : sujet sensible pour la simulation et la létalité des PJ ; décider la portée avant d'introduire un trait d'assassinat.
- Les postures et leurs manœuvres sont en cours de refonte ; aucun accès spécial ne doit être attribué aux personnages ordinaires avant cette validation.

## Sources de conception

- SRD : `src/content/docs/mecanique/combat.md`, `resolution.md`, `competences.md`, `src/content/docs/reference/etats.md`.
- Savage Worlds Adventure Edition : manœuvres générales (repli, gang up, grapple, finishing move, firing into melee, free attacks), adaptation conceptuelle sans reprise du système de modificateurs.
- Pathfinder 2e : détection, Hide/Sneak, feinte et flanc comme inspirations structurelles. Pas de reproduction des quatre niveaux de perception ou des DD.
