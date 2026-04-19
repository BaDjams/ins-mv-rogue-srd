# POUVOIRS

## Principe Général

Le rang céleste d\'une créature détermine sa capacité à maîtriser des
pouvoirs surnaturels. Plus une créature a un rang élevé, plus elle peut
accéder à des pouvoirs puissants et les développer à un niveau avancé.

## Rang des pouvoirs et Drain

Chaque pouvoir possède un rang (0 à 6). Le rang détermine à la fois l'accès et le coût en drain.

- **Rang 0** : gratuit, accessible aux humains initiés, 0 dé de drain.
- **Rang 1–6** : dés de drain = rang effectif de lancement. Chaque 6 = 1 affaiblissement d'âme.
- **Accès** : Rang Céleste ≥ rang du pouvoir. Pas de downgrade possible.
- **Surcharge** : lancer un pouvoir à un rang supérieur à son rang naturel (jusqu'à 6). Les dés de drain et les dégâts correspondent au rang effectif.
- **Dégâts offensifs** : `(Code + max(Marge, Dé rouge)) × rang effectif`

??? example "Exemple : Ange Rang 3 (3 PE), pouvoir Rang 2 surchargé à 4"
    - Dés de drain : 4 (rang effectif)
    - Résultat supposé : deux 6 → 2 affaiblissements d'âme
    - L'ange dispose de 3 PE → quota non dépassé → 0 blessure aggravée
    - Il lui reste 1 PE de marge pour la journée

Pour le détail complet du mécanisme (seuil de tolérance, Consommation, Présence Surnaturelle), voir le chapitre [Énergie](energie.md).

---

## Règles d\'Acquisition des Pouvoirs

**Limitation par Rang Prérequis**

Une créature ne peut acquérir un pouvoir que si son rang céleste est
**supérieur ou égal** au rang prérequis du pouvoir.

*Exemple : Un ange de rang 3 peut acquérir des pouvoirs ayant pour
prérequis les rangs 1, 2 ou 3, mais pas ceux nécessitant un rang 4 ou
plus.*

## Limitation des Niveaux de Pouvoir

Pour les pouvoirs possédant plusieurs niveaux (notés X), le niveau
maximum qu\'une créature peut atteindre est limité par son Rang Céleste.
Quel que soit le niveau prérequis d\'un pouvoir, il ne pourra être
augmenté au-delà du Rang Céleste du personnage.

-   **Exemple 1 :** Un pouvoir avec un prérequis de Rang 1 (comme
    > *Résilience*) peut être amélioré deux fois par un Ange de Rang 3,
    > atteignant *Résilience 3*.

-   **Exemple 2 :** Un pouvoir avec un prérequis de Rang 2 (comme *Feu
    > Ardent*) peut être amélioré une seule fois par un Ange de Rang 3,
    > atteignant *Feu Ardent 2*.

-   **Exemple 3 :** Un pouvoir avec un prérequis de Rang 3 (comme
    > *Châtiment*) ne peut pas être amélioré au-delà du Rang 3 par un
    > Ange de Rang 3.

## **Règles de spécifiques aux Pouvoirs**

**Légende des Types**

-   **Instantané :** Effet immédiat, pas de durée

-   **Concentration :** Coût initial + coût par tour, se brise si
    > perturbé

-   **Durée fixe :** Maximum 3 tours automatiques

-   **Permanent :** Effet durable jusqu\'à condition spéciale

-   **Scène entière :** Dure toute la scène/rencontre

-   **Passif permanent :** Toujours actif

**Mécaniques**

-   **PE :** Points d\'Énergie

-   **Intensité :** Résultat du dé rouge + marge de réussite

-   **Dé explosif :** Le dé d\'intensité explose sur un 6 (relance et
    > additionne)

-   **Non-réductible :** Ne peut être réduit par l\'armure ou la
    > résistance physique

-   **Concentration :** Désavantage permanent sur toutes les actions
    > tant que maintenue, aucune limite de durée

-   **Durée fixe :** Exactement 3 tours puis dissipation automatique.
    > Prolongation = nouveau jet + nouveau coût

-   **Couper un pouvoir :** Action gratuite, peut être fait à tout
    > moment

-   **Contrôle mental/Possession :** Le contrôleur partage ses PA totaux
    > entre son hôte et toutes ses cibles contrôlées.

-   Certains pouvoir précisent que le lanceur subit une ou plusieurs
    > blessures aggravées. Ces blessures aggravées sont infligées
    > directement (le personnage les subit), elles ne passent pas par
    > les réductions de PA ou Résilience. C\'est le prix à payer pour
    > utiliser une puissance qui dépasse les limites naturelles du
    > corps.

**Interactions entre Pouvoirs**

-   Il est normalement impossible de maintenir sa **concentration** sur
    > plus d'un pouvoir à la fois,

-   Les pouvoirs de **durée fixe** ne nécessitent pas d\'attention une
    > fois lancés,

-   Les effets **permanents** persistent jusqu\'à dissipation active ou
    > condition spéciale,

-   **Prolonger un pouvoir :** Nouveau jet de pouvoir + dépense complète
    > des PE au tour 4, 7, 10, etc.

-   **Arrêter un pouvoir de concentration :** Action gratuite, effet
    > immédiat, récupération immédiate de l\'efficacité normale (perte
    > du désavantage).

## **Exemples Pratiques**

**Résilience X**

-   **Prérequis :** Rang 2

-   **Type :** Passif, Permanent

-   **Effet :** Divise tous les dégâts subis par X

-   **Pouvoir automatique** pour tous les anges et démons incarnés

**Calculs :**

-   Ange Rang 3 : Niveau maximum = 3 - 1 + 1 = **3** → Résilience 3

-   Archange Rang 4 : Niveau maximum = 4 - 1 + 1 = **4** → Résilience 4

-   Humain Rang 1 : Ne peut pas disposer de ce pouvoir (et ça servirait
    > de toute façon à rien de diviser les dégâts par 1)

**Feu Ardent X**

-   **Prérequis :** Rang 2

-   **Type :** Actif, Durée 3 tours

-   **Effet :** Génère une aura de feu qui consume les adversaires
    > proches

**Calculs :**

-   Ange Rang 3 : Niveau maximum = 3 - 2 + 1 = **2** → Feu Ardent 2

-   Démon Rang 3 : Feu Ardent 3 impossible (3 + 2 - 1 = 4 \> 3)

-   Archange Rang 4 : Niveau maximum = 4 - 2 + 1 = **3** → Feu Ardent 3

**Rapidité Céleste X**

-   **Prérequis :** Rang 3

-   **Type :** Passif

-   **Effet :** Bonus d\'initiative et d\'actions

**Calculs :**

-   Ange Rang 3 : Niveau maximum = 3 - 3 + 1 = **1** → Rapidité Céleste
    > 1

-   Archange Rang 4 : Niveau maximum = 4 - 3 + 1 = **2** → Rapidité
    > Céleste 2

-   Ange Rang 2 : Pouvoir inaccessible (rang insuffisant)

*Note : Les armes sacrées, magiques ou maudites conservent leurs effets
spéciaux pour pénétrer ou contourner certaines défenses, indépendamment
du niveau de Résilience.*

