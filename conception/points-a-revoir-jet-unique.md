# Cohérence du D666 — un jet par action

> Carnet de conception, 9 novembre 2026. Ce texte ne fait pas partie des règles du jeu. Les arbitrages de la PR #21 restent dans `arbitrages-regles-situationnelles.md`.

## Le point de départ

Rogue doit conserver un principe simple : **une action donne lieu, au plus, à un jet**. Une esquive n'est pas une nouvelle action ; c'est une **réaction** qui rend l'attaque plus difficile. Elle ne déclenche donc aucun D666 chez le défenseur. Le même raisonnement s'applique à la parade ordinaire.

Cette précision explique une contradiction du SRD actuel. Le chapitre Combat parlait d'un « jet en opposition » pour l'esquive, mais son exemple faisait seulement subir un désavantage à l'attaquant. Ce dernier fonctionnement correspond à l'intention de l'auteur ; il est retenu dans la branche d'intégration. La confusion était présente dans le texte : inutile de proposer à nouveau ce que l'exemple avait déjà trouvé.

Les oppositions entre **deux actions effectivement entreprises** ne sont pas nécessairement contraires au principe : chaque protagoniste a alors sa propre action et son propre jet. En revanche, **résister à une attaque par une simple réaction** ne justifie pas de jeter les dés une seconde fois.

## Les manœuvres à harmoniser

Les arbitrages S05 et S08 à S12 décrivent encore certaines tentatives — forcer un passage, feinter, désarmer, renverser, agripper ou repousser — comme des « oppositions » entre l'initiateur et quelqu'un qui ne dépense pas d'action. Il manque donc une façon de tenir compte de la résistance de la cible **sans demander un second jet**. C'est à résoudre avant leur passage dans le SRD. Il serait prématuré de leur inventer un seuil, une défense fixe ou une réaction gratuite.

De même, S15 et S17 décrivent la Discrétion face à la Vigilance. Quand un garde recherche activement quelqu'un, sa recherche est bien une action ; quand il ne fait que surveiller ou qu'un intrus se cache, il ne faut pas systématiquement lancer deux D666 au nom de l'opposition. La frontière entre vigilance passive et recherche active devra être écrite.

Le tir de barrage/couverture de S24 peut déjà utiliser deux D666 **à des moments différents** : celui du tireur pour établir son feu, puis celui de chaque personnage qui **entreprend ensuite sa propre action** en s'exposant. Ce n'est donc pas une esquive qui lance gratuitement un second dé. Il reste néanmoins à décider comment reconnaître une victoire lors d'une action simple dépourvue de seuil, et comment comparer une action complexe à la valeur du barrage.

## Les avantages défensifs

La règle d'or attribue les avantages ou désavantages circonstanciels au jet de celui qui entreprend l'action. Une esquive ordinaire impose précisément **un désavantage à l'attaque** : elle est déjà compatible avec ce principe.

Deux précisions deviennent toutefois nécessaires. D'abord, **Sixième sens** permet à un personnage surpris de dépenser sa réaction pour esquiver : l'attaquant garde la **cause** de son avantage de surprise, mais l'esquive lui impose normalement un désavantage, de sorte que les deux s'annulent. Cette conséquence découle du choix « aucun jet d'esquive » et mérite une validation distincte si l'auteur souhaite que l'avantage de surprise demeure effectif malgré la réaction.

Ensuite, **Agilité surhumaine** ne peut plus accorder « un avantage à tous les jets d'esquive », puisque ces jets n'existent plus. Il faut réécrire cet effet **sur le jet unique de l'attaquant**, sans décider arbitrairement s'il ajoute un désavantage, produit un double désavantage ou offre une autre protection. **Spider Sense** demeure distinct : l'assaillant n'obtient aucun avantage de surprise contre un personnage prévenu en amont. **Réaction rapide** autorise encore des réactions d'esquive supplémentaires, sans ajouter de jets.

Le terrain difficile doit également être revu : il gêne le combat, mais une esquive sans jet ne peut pas subir personnellement le « désavantage au jet d'esquive » prévu lors des premiers arbitrages. L'effet sur une attaque entreprise en terrain difficile est déjà clair ; l'effet sur une esquive défensive reste à exprimer sans nouveau jet.

## Une réserve sur les postures

Le SRD actuel attribue déjà un désavantage aux attaques visant un personnage en posture défensive. Si celui-ci esquive en plus, il inflige une **deuxième source de désavantage**. Ce cumul est possible dans le D666, mais la refonte des postures envisagée par l'auteur doit précisément en modifier le fonctionnement. Ne pas changer les postures par inadvertance dans une PR dédiée aux règles situationnelles.

## Portée de la nouvelle PR

La branche d'intégration ne transpose dans le SRD que les situations suffisamment définies. Elle n'inscrit pas encore les manœuvres résistées, la furtivité opposée à la vigilance, les trois manœuvres de feu automatique ni les effets chiffrés des nouveaux traits héroïques. Elle remplace le jet d'esquive parasite par **un désavantage sur le jet d'attaque** et corrige l'exemple de combat correspondant.
