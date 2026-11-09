# Cohérence du D666 — un jet par action

> Carnet de conception, 9 novembre 2026. Ce texte ne fait pas partie des règles du jeu. Les arbitrages de la PR #21 restent dans `arbitrages-regles-situationnelles.md`.

## Le point de départ

Rogue doit conserver un principe simple : **une action donne lieu, au plus, à un jet**. Une esquive n'est pas une nouvelle action ; c'est une **réaction** qui rend l'attaque plus difficile. Elle ne déclenche donc aucun D666 chez le défenseur. Le même raisonnement s'applique à la parade ordinaire.

Cette précision explique une contradiction du SRD actuel. Le chapitre Combat parlait d'un « jet en opposition » pour l'esquive, mais son exemple faisait seulement subir un désavantage à l'attaquant. Ce dernier fonctionnement correspond à l'intention de l'auteur ; il est retenu dans la branche d'intégration. La confusion était présente dans le texte : inutile de proposer à nouveau ce que l'exemple avait déjà trouvé.

Les oppositions entre **deux actions effectivement entreprises** respectent ce principe : chaque protagoniste a sa propre action et son propre jet. En revanche, **résister à une attaque par une simple réaction** ne justifie pas de jeter les dés une seconde fois.

## Le duel de mêlée — nouvel arbitrage du 9 novembre

Pour l'auteur, un **duel à l'épée ou à mains nues** est un véritable échange de coups : les deux protagonistes consacrent leur action au combat. **Chacun fait donc un D666 pour son action complexe.** Si l'un réussit et l'autre échoue, seul le premier touche. Si les deux échouent, rien ne se passe. Si **les deux réussissent**, le **plus petit dé d'action** l'emporte et touche seul. Si les deux dés d'action **réussis sont égaux**, **les deux touches s'appliquent**. Le duel suit donc **sans exception les oppositions ordinaires du D666** ; l'ancienne interprétation « deux réussites suffisent pour une touche mutuelle, même si les chiffres diffèrent » était une erreur de l'assistant et doit être tenue pour abandonnée.

**Exemple donné par l'auteur :** Ben (seuil 3) contre Magus (seuil 4). Tour 1 : Ben `345` réussit, Magus `522` échoue ; Ben touche. Tour 2 : Ben `513` et Magus `634` échouent ; aucun ne touche. Tour 3 : Magus `213` et Ben `324` réussissent, mais Magus **2** bat Ben **3** et touche seul. Tour 4 : Ben `213` et Magus `234` réussissent avec le **même dé d'action 2** : ils se touchent mutuellement, Magus infligeant davantage grâce à l'intensité **4**, contre **3** pour Ben.

L'**esquive en réaction** est destinée aux personnages occupés à autre chose qu'à échanger les coups ou à ceux qui reçoivent une attaque impossible à parer avec leurs moyens : par exemple un coup de poing de mécha contre un fleuret. Elle dépense une réaction, **ne déclenche aucun jet**, et impose normalement un désavantage à l'attaque. Une parade hors duel n'est envisageable que si le coup peut réellement être dévié.

**Fréquence des touches mutuelles (corrigée) :** en l'absence de modificateurs et avec des dés d'action indépendants, une égalité **réussie** survient `min(seuil A, seuil B) / 36`. Pour deux combattants de seuil 3, c'est **3/36 = 8,3 %** ; pour deux combattants de seuil 5, **5/36 = 13,9 %** ; pour Ben contre Magus (seuils 3 et 4), **3/36 = 8,3 %**. Les précédents chiffres **25 % et 69,4 %** comptaient à tort toutes les doubles réussites comme des touches mutuelles.

**Arbitrage du 9 novembre — initiative du duel :** l'échange est résolu **à l'initiative du premier combattant qui engage son action complexe**. L'adversaire doit immédiatement choisir : **jouer son action complexe maintenant** et effectuer son propre D666 dans l'opposition, ou **garder cette action pour son tour** et recourir à **l'esquive par réaction**, sans jet. La décision se prend avant les dés ; le personnage ayant utilisé son action complexe en avance ne peut pas la rejouer à son initiative. Si son action complexe est déjà dépensée, il ne peut plus entrer dans cet échange offensif. Cette précision respecte bien **un jet par action**, et ne crée aucun tour supplémentaire.

**Restent à préciser :** l'articulation des techniques de feinte, désarmement et projection avec le duel et surtout la **Riposte** de la posture défensive actuellement présente au SRD, qui pourrait autrement ajouter une contre-attaque à un échange où chacun a déjà attaqué. Il faut éviter de créer une attaque supplémentaire involontaire lorsqu'un combattant a déjà joué son action complexe.

## Choix entre duel immédiat et esquive puis action — examen du 9 novembre

**Aucune nouvelle règle n'est arrêtée dans cette section.** Lorsque Ben engage le combat à son initiative, Magus peut actuellement répondre en dépensant son action complexe tout de suite, ou esquiver avec sa réaction et conserver son action pour plus tard. Ce second choix est tactiquement séduisant : il réduit le risque immédiat tout en préservant la possibilité de changer de cible, de fuir ou d'utiliser un pouvoir. Il peut aussi prolonger les affrontements et multiplier les décisions dans un même round.

**Calculs exacts à dés d'action uniformes**, pour des combattants de même seuil et sans modificateurs indépendants, avec chacun sa réaction disponible : dans le duel immédiat, la probabilité qu'au moins un des deux touche est de **75 % au seuil 3**, **88,9 % au seuil 4**, et **97,2 % au seuil 5**. Si chacun esquive l'attaque de l'autre et attaque ensuite à son tour, les deux attaques deviennent désavantagées et cette probabilité descend à **43,8 %**, **69,1 %** et **90,7 %** respectivement, en supposant que les deux attaques ont effectivement lieu. En particulier, au seuil 3, les échanges sans aucune touche passent de **25 %** à **56,3 %**. Si une première touche empêche le second de riposter, la comparaison se complique encore et la différence de calendrier devient importante.

**Exemple Ben 3 contre Magus 4 :** en duel immédiat, Ben a **41,7 %** de chances de toucher et Magus **50 %**. Si Magus esquive puis attaque plus tard, tandis que Ben utilise lui aussi sa réaction d'esquive contre cette attaque, Ben n'a plus que **25 %** de chances de toucher Magus et Magus **44,4 %** de toucher Ben, si son attaque a bien lieu. Magus échange donc une faible baisse de son efficacité offensive contre une réduction notable du risque immédiat.

**Attention : ce choix n'est pas toujours une défense supérieure.** Avec deux personnages de seuil 5, une attaque faite avec un désavantage touche encore dans **69,4 %** des cas (sauf autre circonstance). Par ailleurs, les deux attaques successives peuvent **toutes les deux toucher** : au seuil 5, le risque que les deux attaques réussissent est de **48,2 %**, contre **13,9 %** de touches mutuelles en duel, puisque ce dernier n'autorise la double touche qu'à égalité des dés d'action réussis. L'esquive différée ralentit donc parfois la progression du combat, mais peut aussi augmenter la brutalité totale à haut niveau.

**Les avantages et les postures changent ces résultats.** Une maîtrise exceptionnelle (seuil théorique de 6 ou plus) ignore une source de désavantage ; les postures défensives actuelles ajoutent aussi des désavantages qui peuvent se cumuler avec la réaction. Il faudra tester les vrais personnages, pas seulement les seuils nus, avant de transformer ce choix en règle définitive.

**Précédent COPS :** le jeu distinguait les attitudes de combat, puis demandait de choisir son initiative à l'intérieur d'une plage, ce qui multipliait les étapes tactiques. Le combat de mêlée COPS reposait aussi sur une opposition et se résolvait à un moment fixe (initiative 0). Dans Rogue, ne pas importer les attitudes variables ni une nouvelle phase de déclaration d'initiative. Le choix entre répondre immédiatement et esquiver peut se faire à l'engagement, mais la question est de savoir si **conserver son action complexe** en plus d'une esquive ne devient pas systématiquement préférable.

**Recommandation de conception, non appliquée au SRD :** mesurer la fréquence réelle des choix de défense et leur effet sur le nombre de tours. Si tout le monde choisit de « réagir maintenant, attaquer plus tard », le duel simultané disparaîtra de fait au profit de deux frappes séparées. Une solution éventuelle consisterait à faire du refus de duel une **véritable action défensive**, consommant l'action complexe au lieu de la différer. Cela éviterait d'ouvrir une deuxième séquence d'attaque, mais il ne faut pas retenir cette restriction sans arbitrage de l'auteur. La PR #22 conserve donc **l'option actuellement validée**, en signalant le risque d'optimisation et de ralentissement.

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

La branche d'intégration ne transpose dans le SRD que les situations suffisamment définies, **dont le duel de mêlée en échange simultané**. Elle n'inscrit pas encore les manœuvres résistées, la furtivité opposée à la vigilance, les trois manœuvres de feu automatique ni les effets chiffrés des nouveaux traits héroïques. Elle retire le jet d'esquive parasite, distingue la **réaction défensive sans jet** du **duel à deux actions** et conserve le principe de la touche mutuelle sur deux réussites.
