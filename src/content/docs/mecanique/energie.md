---
title: Énergie, Drain & Consommation
sidebar:
  order: 5
  label: Énergie, Drain, Consommation
---

La puissance divine est partout. Elle imprègne chaque atome de création, circule dans les lignes invisibles qui relient le Paradis à la Terre, et se manifeste dès qu'une âme surnaturelle tend la main vers elle. Une telle créature n'a pas besoin de _stocker_ cette énergie — elle est inépuisable, infinie, généreusement offerte par un Dieu qui a certes d'autres préoccupations mais n'a jamais coupé le robinet.

Le problème n'est pas la quantité. Le problème est la taille du tuyau.

Chaque âme surnaturelle peut canaliser la puissance divine librement, pour ses usages courants — se déplacer, percevoir l'invisible, maintenir un pouvoir passif, ou simplement exister avec grâce. Ces actions ne coûtent rien. Là où les choses se compliquent, c'est lorsqu'elle décide de canaliser plus que ce que son âme peut raisonnablement soutenir.

***

## Rang des pouvoirs et Drain

Chaque pouvoir possède un rang, de 0 à 6. Les pouvoirs de Rang 0 sont des tours de passe-passe mineurs, accessibles à tout humain initié — ils ne génèrent aucun drain et ne coûtent rien, même sans âme surnaturelle.

Un pouvoir actif ne peut être acquis qu'à un rang de base inférieur ou égal au Rang Céleste de son propriétaire. Les pouvoirs passifs, eux, sont calés sur le Rang Céleste et évoluent avec lui — voir [Pouvoirs](../pouvoirs#pouvoirs-actifs-et-pouvoirs-passifs). Les dégâts d'un pouvoir offensif lancé au rang R sont :

> `PUI + R + max(Marge, Dé rouge)`

Le drain se calcule au moment du lancement, rang par rang. Tant que le rang de lancement reste dans les limites du Rang Céleste, chaque rang génère un **dé de drain** : un 6 inflige une **blessure non-létale** — de la fatigue magique, qui se soigne aussi vite qu'un coup de mou (1 case par minute). Chaque rang de lancement au-delà du Rang Céleste génère à la place un **drain automatique** : pas de dé, pas de chance, une **blessure aggravée** directe, non réduite par l'armure ni par la [Résilience](../blessures).

La **Surcharge** permet de lancer un pouvoir actif à un rang supérieur à son rang de base, jusqu'au plafond universel de 6 — y compris au-delà de son propre Rang Céleste, pour les âmes qui considèrent la prudence comme une vertu strictement humaine. On ne peut pas faire l'inverse — un pouvoir de rang de base 3 se lance au rang 3 minimum. Si le pouvoir génère des dégâts, ils sont calculés sur le rang de lancement, surcharge comprise.

Un pouvoir peut par ailleurs être modulé au lancement par des **mots-clés** — [Multicible, Portée, Durée](../mots-cles-pouvoirs) et quelques autres. Chaque mot-clé a un coût, qui s'ajoute au rang de lancement pour donner le **rang effectif** du pouvoir, plafonné à 6. Le rang effectif ne sert qu'à une seule chose : déterminer le drain, selon la même règle que la Surcharge — des dés jusqu'au Rang Céleste, des drains automatiques au-delà. Les dégâts et la pénétration, eux, restent calculés sur le rang de lancement : multiplier les cibles n'a jamais rendu une boule de feu plus chaude.

Il est tout à fait possible de combiner Surcharge et mots-clés sur un même lancement, mais le rang effectif ne peut jamais dépasser 6. Un pouvoir lancé au rang 6 n'a donc droit à aucun mot-clé. Mais ces pouvoirs divins sont largement assez puissants pour ne pas en avoir besoin.

<div class="admonition example">
<p class="admonition-title">Exemple : Ange Rang 3, pouvoir Rang 2 surchargé à 4</p>

- Drain : 3 dés (dans les limites du Rang Céleste) + 1 drain automatique (1 rang au-delà)
- Résultat supposé : un 6 sur les dés → 1 blessure non-létale
- Le drain automatique inflige quant à lui 1 blessure aggravée directe, sauf conversion par [Conduit Divin](#conduit-divin)
- Bilan : 1 blessure non-létale + 1 blessure aggravée, pour un pouvoir lancé bien au-delà de ce que ce Rang 3 devrait tenir
</div>

***

## Conduit Divin

Certaines âmes anciennes ont appris à gérer des débits que leurs pairs ne sauraient supporter. Le trait **Conduit Divin** (niveaux 1 à 3) permet, **une fois par combat et par niveau**, de transformer un drain automatique en simple dé de drain — troquant une blessure aggravée garantie contre 1 chance sur 6 d'une blessure non-létale. Ce trait ne modifie pas le Rang Céleste lui-même ni l'accès aux pouvoirs : uniquement la capacité à absorber les excès de canalisation sans en payer immédiatement le prix.

Un ange de Rang 2 avec Conduit Divin 3 peut ainsi encaisser jusqu'à 3 dépassements de rang par combat avant que la situation ne devienne vraiment risquée. Ce qui ne l'empêche pas de rester un ange de Rang 2 sur tout le reste, mais lui donne un sang-froid remarquable pour quelqu'un de son niveau.

***

## Présence Surnaturelle _(pouvoir intrinsèque)_

_Rang 1 — Actif —_ [_action gratuite_](../combat#déclaration-des-actions)

Toute âme incarnée peut, en une action gratuite déclarée avant le jet, soit prendre l'[avantage](../resolution#avantage) sur ce jet, soit substituer un attribut d'âme à une caractéristique physique. Ces deux options représentent le même phénomène : laisser transparaître, l'espace d'un instant, la véritable nature de l'être qui habite ce corps. Cela génère 1 dé de drain — un seul 6 suffit à infliger une blessure non-létale. Surcharge impossible.

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

Un drain automatique n'est jamais une question de chance : c'est la puissance de l'âme, quelle que soit sa nature — divine, infernale, ou toute autre —, qui déborde ce qu'elle peut contenir et brûle littéralement l'enveloppe charnelle de l'intérieur. Rien ne l'arrête à part le [Conduit Divin](#conduit-divin) : ni l'armure, ni la Résilience, ni la bonne volonté.
</div>

Un ange de Rang 1 qui surcharge un pouvoir au rang 6 lance 1 dé de drain et encaisse 5 drains automatiques d'un coup — cinq blessures aggravées avant même de savoir si le pouvoir a fait effet. Ce n'est plus de l'imprudence, c'est un plan de carrière de martyr. Un Archange de Rang 5, à l'inverse, peut surcharger largement avant de sentir quoi que ce soit mordre pour de vrai.

Si la Consommation tue l'hôte, l'ange se [réincarne](../../personnage/reincarnation) normalement. Les anges qui abusent de cette mécanique finissent par consumer leurs hôtes en série, ce qui finit par attirer l'attention — des démons, des inquisiteurs, ou pire, de la hiérarchie.
