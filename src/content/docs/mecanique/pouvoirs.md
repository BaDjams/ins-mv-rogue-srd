---
title: Pouvoirs
sidebar:
  order: 3
  label: ''
---

## Principe Général

Le [rang céleste](../../personnage/rang) d'une créature détermine sa capacité à maîtriser des
pouvoirs surnaturels. Plus une créature a un rang élevé, plus elle peut
accéder à des pouvoirs puissants et les développer à un niveau avancé.

## Rang des pouvoirs et Drain

Chaque pouvoir possède un rang (0 à 6). Le rang détermine à la fois l'accès et le coût en [drain](../energie#rang-des-pouvoirs-et-drain).

- **Rang 0** : gratuit, accessible aux humains initiés, 0 dé de drain.
- **Rang 1–6** : le rang effectif de lancement détermine le drain — 1 dé de drain par rang jusqu'au Rang Céleste (un 6 inflige 1 blessure non-létale), 1 drain automatique par rang au-delà (1 blessure aggravée directe, sauf conversion par [Conduit Divin](../energie#conduit-divin)).
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

***

## Règles d'Acquisition des Pouvoirs

**Limitation par Rang Prérequis**

Une créature ne peut acquérir un pouvoir que si son rang céleste est
**supérieur ou égal** au rang prérequis du pouvoir.

_Exemple : Un ange de rang 3 peut acquérir des pouvoirs ayant pour
prérequis les rangs 1, 2 ou 3, mais pas ceux nécessitant un rang 4 ou
plus._

## Pouvoirs actifs et pouvoirs passifs

Au-delà du prérequis d'accès, tout dépend de la nature du pouvoir.

Un **pouvoir actif** se lance : jet, [drain](../energie#rang-des-pouvoirs-et-drain), éventuelle [Surcharge](../energie#rang-des-pouvoirs-et-drain). Son rang de base, choisi à l'acquisition et améliorable par la [progression](../../personnage/progression), ne peut jamais dépasser le Rang Céleste de son propriétaire. En revanche, rien n'interdit de le lancer plus fort qu'il n'a été appris : la Surcharge permet de monter jusqu'au rang 6, le drain se chargeant de rappeler à chacun où se situent ses limites réelles.

Un **pouvoir passif** ne se lance pas : il est toujours actif, ne génère aucun drain, et son rang est calé sur le Rang Céleste de son propriétaire — ni plus, ni moins. Il évolue automatiquement avec lui. Un ange de Rang 3 a _Résilience 3_ ; s'il devient Archange, sa Résilience passe à 4 sans rien dépenser. C'est un des rares avantages de la promotion interne.

_Exemples :_

- _Résilience_ (passif, prérequis Rang 1) : calée sur le Rang Céleste. Ange Rang 3 → Résilience 3 ; Archange Rang 4 → Résilience 4 ; humain Rang 1 → Résilience 1, sans effet pratique.
- _Feu Ardent_ (actif, prérequis Rang 2) : un ange de Rang 3 peut l'acquérir au rang de base 2 ou 3, et le surcharger jusqu'au rang 6 au lancement.
- _Rapidité Céleste_ (passif, prérequis Rang 3) : inaccessible en dessous du Rang 3 ; calée sur le Rang Céleste au-delà.

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
