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

**Arbitrage du 9 novembre — initiative du duel et prix de la réaction :** l'échange se résout **à l'initiative du premier combattant qui engage son action complexe**. L'adversaire peut **jouer son action complexe immédiatement** et combattre en opposition, ou **dépenser sa réaction pour esquiver**, sans jet supplémentaire. **Dans les deux cas, s'il n'a pas encore joué son action complexe du round, elle est consommée ou perdue.** Il ne pourra pas attaquer à nouveau plus tard dans ce round. Celui qui a déjà employé son action complexe ne peut plus répondre par une action offensive, mais peut encore réagir si sa réaction est disponible. La décision est prise avant les dés. Cette règle s'étend **à toutes les réactions**, pas seulement aux esquives : on ne gagne pas le droit de garder une action complexe à venir en se défendant.

**Restent à préciser :** l'articulation des techniques de feinte, désarmement et projection avec le duel et surtout la **Riposte** de la posture défensive actuellement présente au SRD, qui pourrait autrement ajouter une contre-attaque à un échange où chacun a déjà attaqué. Il faut éviter de créer une attaque supplémentaire involontaire lorsqu'un combattant a déjà joué son action complexe.

## Réagir avant son tour — arbitrage du 9 novembre

**L'auteur tranche la question du ralentissement.** Une réaction sert à faire face à un imprévu. **Si le personnage n'a pas encore utilisé son action complexe dans le round, la réaction la lui fait perdre.** Son action simple lui reste acquise. S'il a déjà utilisé son action complexe, la réaction ne lui coûte rien de plus. Les personnages dont l'initiative est basse ou qui hésitent à engager le duel ne peuvent donc pas esquiver, puis conserver tranquillement une attaque pour plus tard.

**Exemple :** Ben joue avant Magus et l'engage au corps à corps. Magus répond tout de suite avec son action complexe : les deux effectuent leur D666 en opposition et Magus ne pourra plus attaquer à son tour. S'il choisit de dépenser sa réaction pour esquiver, Ben attaque seul avec désavantage, **mais Magus perd tout de même son action complexe du round**. Il pourra encore accomplir son action simple à son initiative. Dans les deux cas, l'échange ne se dédouble pas.

Le même prix vaut pour une parade, une riposte ou une attaque d'opportunité effectuée avant d'avoir joué son action complexe. Ce prix est unique : si l'action complexe a déjà été consommée, on ne perd rien de plus en réagissant, sous réserve de disposer d'une réaction.

**Les calculs comparant un duel immédiat à « esquiver puis attaquer » ne décrivent plus une tactique autorisée.** Ils étaient utiles pour montrer le problème, mais **ne doivent plus guider l'équilibrage**. Ce changement favorise les initiatives élevées, ce que l'auteur recherche, sans ajouter d'attitudes déclarées ni de phases de choix comme dans *COPS*.

**Interaction à surveiller avec S25 :** une action préparée dépense déjà l'action complexe lors de sa préparation et se déclenche plus tard par une réaction. Si elle est déclenchée **au début du round suivant, avant le propre tour du personnage**, la règle générale fait aussi perdre l'action complexe qui n'a pas encore été jouée **dans ce nouveau round**. Cette conséquence découle strictement de l'arbitrage global. Elle doit être vérifiée en partie, sans inventer une exception silencieuse. Une action préparée déclenchée dans le même round, après la dépense de l'action complexe, ne crée pas ce problème.

## Esquive active — transformer la défense en attaque grâce à une technique apprise

**Précision de l'auteur du 9 novembre :** l'esquive en réaction n'est pas la seule façon d'éviter un coup. Un combattant entraîné peut avoir appris à **attendre l'attaque d'un adversaire, se dérober et frapper juste après**, à la manière de Link face à un boss. Cette **esquive active** n'est **ni une surprise ni une réaction**, mais une **manœuvre utilisant l'action complexe**. Elle est inaccessible à un personnage qui n'a pas appris la technique.

Sa valeur ne réside pas nécessairement dans un bonus aux dés, mais dans la **possibilité de répondre offensivement à un coup qu'on ne peut pas parer**. Un combattant ordinaire est réduit à l'esquive en réaction ; s'il n'a pas encore joué son action complexe, il la perd. Le personnage formé dépense son action complexe pour **esquiver et contre-attaquer dans le même mouvement**. Une seule action de sa part, donc un seul D666, et aucune réaction consommée.

**Proposition d'intégration sans sous-système :** résoudre la manœuvre par **l'opposition ordinaire du duel**, lorsque le boss engage son action : victoire du personnage = coup évité et attaque qui touche ; victoire du boss = coup reçu ; deux échecs = rien ; égalité de deux réussites = touche mutuelle. Ce point de résolution reste **une proposition**, non un arbitrage supplémentaire de l'auteur. La manœuvre ne justifie pas un avantage systématique, une attaque gratuite ou une nouvelle catégorie de jet.

**Choix de calendrier encore à valider :** le personnage ayant l'initiative avant le boss peut **garder son action complexe disponible** pour l'utiliser lors de l'attaque redoutée. Cette dépense n'est pas une **action préparée déclenchée par réaction** ; elle constitue l'exception accordée par la technique. Si le boss n'attaque pas au cours du round ou si l'action complexe a déjà été dépensée, la manœuvre ne peut pas être employée. Aucune seconde action n'est créée.

C'est le véritable intérêt des disciplines martiales de Rogue : **une technique apprise autorise un geste que les autres ne savent pas accomplir**. La décision « j'esquive ou je duelle ? » ne devrait plus produire de tactique systématiquement avantageuse ; la compétence doit mériter l'exception.

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
