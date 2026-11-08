---
title: Rangs de pouvoirs, Drain & Consommation
sidebar:
  order: 5
  label: Rangs de pouvoirs, Drain & Consommation
---

La puissance divine est partout. Elle imprègne chaque atome de création, circule dans les lignes invisibles qui relient le Paradis à la Terre, et se manifeste dès qu'une âme surnaturelle tend la main vers elle. Une telle créature n'a pas besoin de _stocker_ cette énergie — elle est inépuisable, infinie, généreusement offerte par Dieu.

Le problème n'est pas la quantité. Le problème est la capacité d'une âme à encaisser une telle quantité d'energie.

Chaque âme surnaturelle peut canaliser la puissance divine librement, pour ses usages courants — se déplacer, percevoir l'invisible, maintenir un pouvoir passif, ou simplement exister avec grâce. Ces actions ne coûtent rien. Là où les choses se compliquent, c'est lorsqu'elle décide de canaliser plus que ce que son âme peut raisonnablement soutenir.

***

## Rang des pouvoirs et Drain

Les pouvoirs sont répartis en 2 grandes classes : les pouvoirs actifs et les pouvoirs passifs. Chaque pouvoir possède un rang, de 1 à 6. Un pouvoir actif ne peut être acquis qu'à un rang de base inférieur ou égal au Rang Céleste de son propriétaire. Les pouvoirs passifs, eux, sont calés sur le Rang Céleste et évoluent avec lui — voir [Pouvoirs](../pouvoirs#pouvoirs-actifs-et-pouvoirs-passifs).

La **Surcharge** permet de lancer un pouvoir actif à un rang supérieur à son rang de base, jusqu'au plafond universel de 6 — y compris au-delà de son propre Rang Céleste, pour les âmes qui considèrent la prudence comme une vertu strictement humaine. On ne peut pas faire l'inverse — un pouvoir de rang de base 3 se lance au rang 3 minimum. Si le pouvoir génère des dégâts, ils sont calculés sur le rang de lancement, surcharge comprise. 

Les dégâts d'un pouvoir offensif lancé au rang R effectif (donc en prenant en compte les rangs de surcharge) sont :

> `PUI + R + Dé rouge`

Un pouvoir peut par ailleurs être modulé au lancement par des **mots-clés** — [Multicible, Portée, Durée](../mots-cles-pouvoirs) et quelques autres. Chaque mot-clé a un coût, qui s'ajoute au rang de lancement pour donner le **rang effectif** du pouvoir, plafonné à 6. Le rang effectif ne sert qu'à une seule chose : déterminer le drain, selon la même règle que la Surcharge — des dés jusqu'au Rang Céleste, des drains automatiques au-delà. Les dégâts et la pénétration, eux, restent calculés sur le rang de lancement : multiplier les cibles n'a jamais rendu une boule de feu plus chaude.

Le drain se calcule au moment du lancement, à partir du **rang effectif** (rang de lancement, Surcharge et mots-clés compris). Pour chaque rang jusqu'au Rang Céleste du lanceur, lancez **un dé de drain** : chaque 6 inflige **une blessure non létale** (fatigue magique). Pour chaque rang effectif au-delà du Rang Céleste, le lanceur subit **une blessure non létale automatique**, sans jet de dé. Ces blessures sont subies directement, sans réduction par l'armure ou la [Résilience](../blessures). Elles guérissent à raison d'**une blessure toutes les cinq minutes, uniquement au repos**. Les anges et les démons ne font pas de jet de Vigueur pour éviter l'inconscience lorsque la jauge est entièrement remplie de blessures non létales ; les autres conséquences de la saturation restent applicables, notamment la conversion des nouvelles blessures non létales en blessures létales.

Il est tout à fait possible de combiner Surcharge et mots-clés sur un même lancement, mais le rang effectif ne peut jamais dépasser 6. Un pouvoir lancé au rang 6 n'a donc droit à aucun mot-clé. Mais ces pouvoirs divins sont largement assez puissants pour ne pas en avoir besoin.

<div class="admonition example">
<p class="admonition-title">Exemple : Ange Rang 3, pouvoir Rang 2 surchargé à 4</p>

- Drain : 3 dés (dans les limites du Rang Céleste) + 1 drain automatique (1 rang au-delà)
- Résultat supposé : un 6 sur les dés → 1 blessure non-létale
- Le drain automatique inflige quant à lui 1 blessure non létale directe.
- Bilan : 2 blessures non létales (une aléatoire et une automatique), pour un pouvoir lancé au-delà du Rang Céleste du personnage.
</div>

***

## Présence Surnaturelle _(pouvoir intrinsèque)_

_Rang 1 — Actif —_ [_activation accessoire_](../combat#déclaration-des-actions)

Toute âme incarnée peut, par une activation accessoire déclarée avant le jet, soit prendre l'[avantage](../resolution#avantage) sur ce jet, soit substituer un attribut d'âme à une caractéristique physique. Ces deux options représentent le même phénomène : laisser transparaître, l'espace d'un instant, la véritable nature de l'être qui habite ce corps. Cela génère 1 dé de drain — un seul 6 suffit à infliger une blessure non-létale. Surcharge impossible.

| Caractéristique physique | Attribut d'âme substituable |
| --- | --- |
| FOR | PUI |
| AGI | INF |
| VIG | RES |
| PER | CLA |

***

## La Consommation

<div class="admonition danger">
<p class="admonition-title">La Consommation</p>

Un drain automatique n'est jamais une question de chance : c'est la puissance de l'âme, quelle que soit sa nature, qui déborde et épuise son hôte. Il inflige directement une blessure non létale, sans réduction par l'armure ou la Résilience. Lorsque la jauge est pleine, tout nouveau drain est converti en blessure létale, conformément aux [règles de blessures](../blessures).
</div>

Un ange de Rang 1 qui surcharge un pouvoir au rang 6 lance 1 dé de drain et subit 5 blessures non létales automatiques. Un Archange de Rang 5, à l'inverse, lance 5 dés de drain et ne subit qu'une blessure non létale automatique. Dans les deux cas, si la jauge est pleine, les nouveaux drains deviennent des blessures létales : la puissance reste accessible, mais l'hôte finit par en payer le prix.

Si le drain finit par tuer l'hôte, l'ange se [réincarne](../../personnage/reincarnation) normalement. Les abus répétés peuvent néanmoins attirer l'attention de la hiérarchie : les hôtes ne sont pas officiellement du matériel consommable.
