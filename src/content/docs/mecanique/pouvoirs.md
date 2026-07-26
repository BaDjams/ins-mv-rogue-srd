---
title: Pouvoirs
sidebar:
  order: 3
  label: ''
---

## Principe Général

Le [rang céleste](../../personnage/rang) d'une créature détermine sa capacité à maîtriser des pouvoirs surnaturels. Plus une créature a un rang élevé, plus elle peut accéder à des pouvoirs puissants et les développer à un niveau avancé.

**Prérequis :** 

Une créature ne peut acquérir un pouvoir que si son rang céleste (RC) est
**supérieur ou égal** au rang prérequis du pouvoir.

_Exemple : Un ange de rang 3 peut acquérir des pouvoirs ayant pour
prérequis les rangs 1, 2 ou 3, mais pas ceux nécessitant un rang 4 ou
plus._
Certains pouvoirs précisent également d'autres prérequis, comme "Ange", "Démon" ou "Magie du sang", qui limitent leur obtention à certains types de créatures uniquement.

***

## Pouvoirs actifs et pouvoirs passifs

Au-delà du prérequis d'accès, tout dépend de la nature du pouvoir.

Un **pouvoir passif** ne se lance pas : il est toujours actif et ne génère aucun drain. Il est impossible de surcharger un pouvoir passif. Les pouvoirs passifs ont des rangs que le personnage peut acheter afin de les renforcer. Il est impossible de posséder un pouvoir passif d'un rang supérieur à son rang céleste.

Un **pouvoir actif** se lance : il faut faire un jet de lancement, et ce pouvoir génèrera du [drain](../energie#rang-des-pouvoirs-et-drain), avec une éventuelle [Surcharge](../energie#rang-des-pouvoirs-et-drain). Chaque pouvoir actif dispose d'un rang de base. Il est impossible de posséder un pouvoir actif avec un rang de base supérieur à son rang céleste. En revanche, rien n'interdit de le lancer plus fort qu'il n'a été appris : la Surcharge permet de monter jusqu'au rang 6, le drain se chargeant de rappeler à chacun où se situent ses limites réelles.

_Exemples :_

- _Résilience_ (passif, prérequis : RC 2) : Un ange de rang céleste 3 peut posséder résilience rang 2 puis l'améliorer par l'apprentissage jusqu'à rang 3 mais ne pourra jamais le faire évoluer au delà, car le rang de résilience serait alors supérieur à son rang céleste.
- _Feu Ardent_ (actif, prérequis : RC 2) : une lyche de Rang 2 peut l'acquérir et le surcharger jusqu'au rang effectif 6. mais elle subira alors un drain énorme! (voir ci-dessous)
- _Aura divin_ (passif, prérequis : RC 4, Ange) : inaccessible en dessous du Rang 4 ; seuls les Archanges

## Rang des pouvoirs et Drain

Chaque pouvoir possède un rang (1 à 6). Le rang détermine à la fois l'accès et le coût en [drain](../energie#rang-des-pouvoirs-et-drain).

- le rang effectif de lancement détermine le drain — 1 dé de drain par rang jusqu'au Rang Céleste (un 6 inflige 1 blessure non-létale), 1 drain automatique par rang au-delà (1 blessure aggravée directe, sauf conversion par [Conduit Divin](../energie#conduit-divin)).
- **Accès** : rang de base ≤ Rang Céleste pour les pouvoirs actifs ; les pouvoirs passifs sont calés sur le Rang Céleste. Pas de downgrade possible.
- **Surcharge** : lancer un pouvoir actif à un rang supérieur à son rang de base, jusqu'à 6 — y compris au-delà du Rang Céleste. Les dégâts sont calculés sur le rang de lancement.
- **Mots-clés** : rang effectif = rang de lancement + somme des coûts des [mots-clés](../mots-cles-pouvoirs), plafonné à 6. Ne compte que pour le drain.
- **Dégâts offensifs** : `PUI + rang de lancement + max(Marge, Dé rouge)`

<div class="admonition example">
<p class="admonition-title">Exemple : Ange Rang 3, pouvoir Rang 2 surchargé à 4</p>

- Drain : 3 dés (jusqu'au Rang Céleste) + 1 drain automatique (1 rang au-delà du Rang 3)
- Résultat supposé : un 6 sur les dés → 1 blessure non-létale
- Le drain automatique inflige en plus 1 blessure aggravée directe, sauf conversion par Conduit Divin
</div>

Pour le détail complet du mécanisme (Consommation, Conduit Divin, Présence Surnaturelle), voir le chapitre Énergie.

## **Règles spécifiques aux Pouvoirs**

**Légende des Types**

-   **Instantané :** Effet immédiat, pas de durée
-   **Concentration :** Coût initial + coût par tour, se brise si
    perturbé
-   **Durée fixe :** Maximum 3 tours automatiques
-   **Permanent :** Effet durable jusqu'à condition spéciale
-   **Scène entière :** Dure toute la scène/rencontre
-   **Passif permanent :** Toujours actif

**Mécaniques**

-   **Intensité :** Résultat du [dé rouge](../resolution) + [marge de réussite](../resolution#3-marge-de-réussite)
-   **Dé explosif :** Le [dé d'intensité](../resolution) explose sur un 6 (relance et
    additionne)
-   **Non-réductible :** Ne peut être réduit par l'armure ou la
    résistance physique
-   **Concentration :** Coût initial + coût par tour. Maintenir un pouvoir au-delà du tour de lancement requiert d'adopter la [posture de Concentration](../combat#postures-tactiques), avec les contreparties qu'elle implique.
-   **Durée fixe :** Exactement 3 tours puis dissipation automatique.
    Prolongation = nouveau jet + nouveau coût
-   **Couper un pouvoir :** [Action gratuite](../combat#déclaration-des-actions), peut être fait à tout
    moment
-   **Contrôle mental/Possession :** Le contrôleur ne dispose toujours que d'une [Action Complexe](../combat#déclaration-des-actions) et d'une [Action Simple](../combat#déclaration-des-actions) par tour, à répartir entre son hôte et ses cibles contrôlées.
-   Certains pouvoir précisent que le lanceur subit une ou plusieurs
    blessures aggravées. Ces blessures aggravées sont infligées
    directement (le personnage les subit), elles ne passent pas par
    les réductions de PA ou Résilience. C'est le prix à payer pour
    utiliser une puissance qui dépasse les limites naturelles du
    corps.

**Interactions entre Pouvoirs**

-   Il est normalement impossible de maintenir sa **concentration** sur
    plus d'un pouvoir à la fois,
-   Les pouvoirs de **durée fixe** ne nécessitent pas d'attention une
    fois lancés,
-   Les effets **permanents** persistent jusqu'à dissipation active ou
    condition spéciale,
-   **Prolonger un pouvoir :** Nouveau jet de pouvoir + nouveau drain
    complet au rang de lancement initial, au tour 4, 7, 10, etc.
-   **Arrêter un pouvoir de concentration :** Action gratuite, effet immédiat.

## Note sur les armes

_Les armes sacrées, magiques ou maudites conservent leurs effets
spéciaux pour pénétrer ou contourner certaines défenses, indépendamment
du niveau de Résilience._
