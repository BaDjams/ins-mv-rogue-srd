# Résolution — Le D666

Le jeu utilise trois dés à 6 faces (D6), chacun identifié par une couleur spécifique, pour former un **D666**, offrant ainsi 216 résultats possibles. Les dés doivent être lus dans cet ordre :

- **Dé bleu (centaines)** : représente la partie angélique du personnage.
- **Dé blanc (dizaines)** : représente la partie humaine du personnage.
- **Dé rouge (unités)** : détermine l'intensité de la réussite de l'action.

---

## 1. Préparation de l'action

Avant de lancer les dés, il est essentiel de déterminer la nature de l'action à effectuer :

**Pouvoir surnaturel ou attribut angélique** : Dans ce cas, le dé bleu sera utilisé pour déterminer le succès de l'action. Le seuil de réussite est égal à l'attribut angélique (valeur de 1 à 5) associé au pouvoir.

**[Compétence](competences.md) ou caractéristique humaine** : Si l'action repose sur une compétence ou une caractéristique humaine de l'hôte, c'est le dé blanc qui sera utilisé. Le seuil de réussite est alors égal à la somme de la compétence (de +0 à +2) et de la caractéristique humaine (de 1 à 3) associée à cette compétence.

!!! note "Important"
    Les [compétences](competences.md) appartiennent au cerveau de l'hôte, pas à l'âme surnaturelle. L'ange ou le démon accède temporairement aux compétences de son hôte actuel. Si l'hôte meurt et que l'âme se [réincarne](reincarnation.md), les compétences disponibles seront celles du nouvel hôte.

À partir de cette étape, le dé utilisé pour déterminer le succès de l'action (bleu ou blanc, selon la nature de l'action) sera appelé **"Dé d'action"**.

Il n'y a aucun bonus ou malus qui s'applique au seuil de réussite. Les bonus ou malus circonstanciels sont gérés grâce à la mécanique d'avantages / désavantages (voir ci-dessous).

---

## 2. Lancer des dés et détermination du succès

On lance toujours les trois dés (bleu, blanc et rouge) en même temps, mais seul le Dé d'action est pris en compte pour déterminer le succès.

Pour réussir l'action, le résultat du Dé d'action doit être **inférieur ou égal** au seuil établi précédemment.

**Règles à garder en tête** :

1. Un **6** sur le Dé d'action est toujours un échec, même si le seuil est de 6 ou plus.
2. Un **1** sur le Dé d'action est toujours une réussite.
3. Bien que chaque dé soit calculé indépendamment, on les lance simultanément pour gagner du temps. Par exemple, un résultat de "352" sur le D666 signifie que le dé bleu a donné 3, le dé blanc 5, et le dé rouge 2.

---

## 3. Marge de réussite

Il s'agit de la différence entre le seuil de réussite et le résultat du Dé d'action. Pour le calcul des dégâts, la marge et le dé rouge ne s'additionnent pas : on retient le meilleur des deux — **max(Marge, Dé rouge)**. Une grande marge garantit un résultat minimum solide ; le dé rouge peut rattraper une faible marge, mais ne s'empile pas avec une bonne.

!!! note "Note sur les seuils élevés"
    Si le seuil est de 6 ou plus (par exemple, un ange avec PUI 5 qui dépense 2 PE pour substituer PUI à FOR et possède +2 en Corps à Corps, donnant un seuil de 7), le 6 reste toujours un échec. L'intérêt d'avoir un seuil supérieur ou égal à 6 réside alors dans le fait qu'un résultat de 5 ou moins réussit et génère une marge importante.

    **Exemple** : Seuil 7, dé d'action = 1 → Réussite avec marge de 6 !

    Cela récompense les combinaisons optimisées d'[attributs célestes](caracteristiques.md) et de compétences élevées en générant des marges spectaculaires.

Si une règle précise que la marge n'est pas prise en compte, considérer la marge comme égale à 0.

---

## 4. Intensité de la réussite

Le dé rouge, appelé **"dé d'intensité"**, détermine l'ampleur de la réussite ou de l'échec de l'action. Plus le résultat est élevé, plus l'effet de l'action sera spectaculaire ou significatif.

Toutes les actions nécessitent un résultat plus ou moins élevé sur le dé d'intensité :

- **1** pour les actions faciles
- **3** pour les actions normales
- **5** pour les actions difficiles
- **7 et +** pour les actions extrêmes

En situation normale, la plupart des actions sont considérées comme faciles. En situation de stress (combat, oral du bac français, première fois au lit, etc.), c'est pas pareil.

### Dé explosif (règle de base)

Dans certains cas précisés dans les règles, le dé d'intensité (rouge) peut devenir **explosif** : cela signifie que **quel que soit le score du premier jet**, on le relance et on ajoute le nouveau résultat. Par la suite, le dé continue d'exploser s'il indique un 6. On procède ainsi jusqu'à ce que le dé indique un autre résultat que 6. Il n'y a alors pas de limite au résultat du dé d'intensité, si ce n'est la chance du lanceur.

**Garantie** : Un dé explosif génère toujours au minimum un résultat de 2 (pire cas : 1+1).

**Exemple simple** :
- Dé explosif, premier jet : 3 → relance automatique → 6 → continue → 2 → stop
- **Total : 3 + 6 + 2 = 11**

### Dés Explosifs Empilables

Lorsque plusieurs effets rendent le dé d'intensité explosif (Critique, Double Avantage, arme explosive, etc.), ils se cumulent.

**Mécanique** :

1. Lance le dé d'intensité initial (quel que soit son résultat, tu continues)
2. Lance autant de dés d'intensité supplémentaires que de sources d'explosion
3. Tous les dés qui indiquent 6 explosent : relance-les et additionne le résultat
4. Continue jusqu'à ce qu'aucun dé n'indique 6
5. Additionne tous les résultats

**Nombre de sources** :

- 1 source : dé initial + 1 dé supplémentaire (minimum garanti : 2)
- 2 sources : dé initial + 2 dés supplémentaires (minimum garanti : 3)
- 3 sources : dé initial + 3 dés supplémentaires (minimum garanti : 4)

---

## 5. Avantages et désavantages

### Avantage

Lorsqu'un personnage bénéficie d'un avantage (par exemple, grâce à un contexte favorable ou un pouvoir spécifique), il prend le résultat **le plus bas** entre le dé bleu et le dé blanc pour déterminer le succès de son action.

**Exemple** : Si un joueur obtient 3 sur le dé bleu et 5 sur le dé blanc, il prend le 3, car c'est le plus bas. Cela lui permet de maximiser ses chances de réussite sans dépenser de ressources supplémentaires.

### Désavantage

En cas de désavantage, le système fonctionne de manière inverse : le joueur doit prendre le résultat **le plus haut** entre le dé bleu et le dé blanc.

**Exemple** : Si un joueur obtient 3 sur le dé bleu et 5 sur le dé blanc, il doit prendre le 5, car c'est le plus haut. Cela diminue ses chances de réussite de manière significative.

### Avantage + Désavantage

Si, pour un même jet, on cumule à la fois un avantage et un désavantage, alors ils s'annulent et on fait le jet sans avantage ni désavantage.

### Double avantage

Si pour un même jet, on cumule deux avantages ou plus, alors le dé d'intensité (rouge) devient **explosif**. Le personnage choisit le plus bas entre le dé bleu et le dé blanc (premier avantage), puis bénéficie d'un dé explosif (second avantage).

**Exemple** : Sur un jet avec double avantage, le résultat indique 254, le joueur choisit 2 grâce à son premier avantage. Son dé d'intensité devient explosif (second avantage) : 4 → relance → 6 → relance → 3, pour un résultat d'intensité de 13 (4+6+3), auquel on ajoute la marge de réussite.

!!! note
    Il n'y a aucun intérêt à cumuler plus de deux avantages sur un même jet.

### Double désavantage

Si par malheur, un personnage vient à cumuler 2 désavantages, alors, en plus du désavantage, le dé d'intensité sera lancé 2 fois et on conservera le moins bon résultat.

### Règles importantes

- Utiliser une compétence que l'hôte ne possède pas entraîne un désavantage.
- Utiliser une compétence que l'hôte possède sans le matériel adéquat (s'il existe) entraîne un désavantage. Les compétences nécessitant un matériel spécifique sont indiquées par un astérisque sur la fiche.
- Utiliser une [spécialisation](competences.md) que l'hôte possède, en rapport avec la situation, accorde un avantage (après approbation du MJ).

---

## 6. Résultats spéciaux

### Réussite critique

Une réussite critique se produit lorsque les deux dés d'action (bleu ET blanc) indiquent exactement le seuil de réussite (ou 5 si le seuil est supérieur ou égal à 6), et que ce résultat constitue une réussite.

Le dé d'intensité devient explosif (compte comme 1 source d'explosion). Cela compense l'absence ou la faible marge générée par un résultat au seuil exact.

### Échec critique

Un échec critique se produit lorsque les deux dés d'action indiquent **double 6**.

L'action échoue lamentablement et une complication se produit. En combat, le personnage aura un désavantage sur sa prochaine action.

### Interventions divine et démoniaque

Lorsque le D666 indique **111**, il s'agit d'une **intervention divine**. Lorsque le D666 indique **666**, il s'agit d'une **intervention démoniaque**. En fonction du camp, les effets diffèrent : les forces du bien bénéficient d'une intervention divine alors que les forces du mal en font les frais (et inversement pour les interventions démoniaques).

#### Pour les Anges

**Intervention divine (111)** : L'action réussit de manière particulièrement spectaculaire

- La créature ciblée est éliminée automatiquement sans même calculer les dommages de l'attaque de manière particulièrement cinématographique, faisant intervenir les archanges ou la main de dieu elle-même, OU l'issue du combat devient particulièrement favorable (dégâts de zone centrés sur le lanceur sur toutes les créatures du mal, aura de paix qui calme tout le monde si humains, etc, à la discrétion du MJ)
- Hors combat, l'action entreprise réussit de manière spectaculaire et peut s'étendre à l'intégralité de la scène, à la discrétion du MJ. Afin de préserver la narration, le MJ peut décider à la place de donner un jeton **"Touché par la Grâce"** qui permettra à son détenteur de déclencher les effets supplémentaires listés ci-dessous au moment de son choix. Le jeton sera alors détruit. Les éventuels effets durables persistent jusqu'à la tombée de la nuit.
- **Effets supplémentaires** :
    - Le compteur d'affaiblissements d'âme du lanceur est remis à zéro, et ceux de ses compagnons sont réduits de moitié (arrondi inférieur).
    - Toutes les actions du personnage et de ses alliés bénéficient d'un double avantage jusqu'au début du prochain tour du lanceur.

**Intervention démoniaque (666)** : L'action de l'ange échoue de façon particulièrement humiliante

- L'ange gagne immédiatement un nombre d'affaiblissements d'âme égal à la moitié de ses PE (arrondi supérieur), pouvant déclencher des blessures aggravées si le seuil est dépassé.
- Double désavantage pour l'ange et tous ses alliés jusqu'à la fin de son prochain tour

#### Pour les Démons

**Intervention divine (111)** : L'action échoue de façon particulièrement humiliante

- Le démon gagne immédiatement un nombre d'affaiblissements d'âme égal à la moitié de ses PE (arrondi supérieur).
- Double désavantage pour le démon et tous ses alliés jusqu'à la fin de son prochain tour

**Intervention démoniaque (666)** : L'action réussit de manière particulièrement spectaculaire

- En combat, la créature ciblée est éliminée de manière particulièrement cinématographique, faisant intervenir les princes démons ou Satan lui-même, OU l'issue du combat devient particulièrement favorable (dégâts de zone centrés sur le lanceur sur toutes les créatures, démons mineurs qui investissent la zone pour foutre le bordel etc, à la discrétion du MJ)
- Hors combat, l'action entreprise réussit de manière spectaculaire et peut s'étendre à l'intégralité de la scène, à la discrétion du MJ. Afin de préserver la narration, le MJ peut décider à la place de donner un jeton **"Marque du Diable"** qui permettra à son détenteur de déclencher les effets supplémentaires listés ci-dessous au moment de son choix. Le jeton sera alors détruit. Les éventuels effets durables persistent jusqu'au lever du soleil.
- **Effets supplémentaires** :
    - Le compteur d'affaiblissements d'âme du lanceur est remis à zéro, et ceux de ses compagnons sont réduits de moitié (arrondi inférieur).
    - Toutes les actions du personnage bénéficient d'un double avantage jusqu'au début de son prochain tour.
    - Toutes les actions ciblant le personnage obtiennent un double désavantage, même celles visant à l'aider ou le soigner.

---

## 7. Jets ouverts et fermés

Dans INS/MV Rogue, certaines actions méritent plus de mystère que d'autres. C'est pourquoi nous distinguons deux types de jets :

### Jets Ouverts

Ces jets sont visibles de tous et constituent la majorité des actions. Le joueur lance ses dés devant l'assemblée, créant ainsi une tension dramatique partagée. Les jets ouverts concernent typiquement :

- Les actions de combat
- Les tests de compétences évidentes
- Les jets de résistance
- Les tests d'attributs visibles

### Jets Fermés

Pour préserver le suspense ou éviter de révéler des informations cruciales, certains jets sont effectués en secret, visibles uniquement du MJ. Le joueur annonce son action et le MJ effectue le jet. Sont concernés :

- Les jets de Perception
- Les tentatives de discrétion
- La détection de mensonges
- Toute action où la connaissance du résultat pourrait influencer le roleplay

Le MJ peut toujours décider de transformer un jet ouvert en jet fermé (ou vice-versa) s'il estime que cela sert mieux la narration.

!!! tip
    Dans le cas des jets fermés, le roleplay est particulièrement encouragé puisque le joueur devra interpréter son personnage sans connaître le résultat exact de son action.

---

## 8. Jets en opposition

Lorsqu'on effectue un jet en opposition, chacun des 2 (ou plus) protagonistes fait un jet de la caractéristique/compétence appropriée. On ajoute alors la marge de réussite au résultat du dé d'intensité. Le plus haut résultat l'emporte et c'est la marge d'intensité (la différence entre les 2 intensités finales) qui représente l'intensité de la réussite de l'action. En cas d'égalité, le MJ décidera entre :

- Les 2 actions échouent (on ignore les résultats et on passe au tour/joueur suivant)
- Les 2 actions réussissent (les 2 actions sont résolues en même temps. Oui, un double KO est possible)

!!! note
    Lors d'un jet en opposition, si l'un des protagonistes n'est pas au courant de ce qu'il se passe, il est alors "pris au dépourvu" et subira un désavantage sur son jet.

---

## 9. Jets de caractéristique "pure"

Parfois, aucune compétence ne s'applique à un jet. Dans ce cas, le seuil de réussite sera déterminé uniquement par le score dans la caractéristique. Cette situation est à distinguer de celle où une compétence s'applique, mais l'hôte n'en dispose pas : en effet, dans ce dernier cas, un désavantage s'applique.
