---
title: Dégâts & Blessures
sidebar:
  order: 6
  label: Dégâts & Blessures
---

Terminologie : INFLIGER vs SUBIR

Pour éviter toute confusion, le jeu utilise une terminologie stricte :

On INFLIGE des dégâts (actif, offensif)

-   Les dégâts sont le montant brut avant réductions
-   Exemple : "Cette attaque inflige 10 dégâts"

On SUBIT des blessures (passif, résultat final)

-   Les blessures sont marquées sur la fiche de PV après réductions
-   Exemple : "Le défenseur subit 3 blessures"

Flux de résolution : De l'attaque à la blessure

Lorsqu'une attaque inflige des dégâts :

1.  Calcul des dégâts bruts (`Code + max(Marge, Dé rouge)` + modificateurs — voir [Résolution](../resolution#marge-de-réussite))
2.  Nature des dégâts (normaux, aggravés, ou non-létaux)
3.  Réduction : Armure (soustraction du PA, sauf mention contraire)
4.  Réduction : Résilience (division, arrondi inférieur)
5.  Blessures finales : Le défenseur subit X blessures (marquées sur la
    fiche)

Exception : Blessures directes

Certains effets utilisent directement le verbe "subir" sans mentionner
de dégâts :

-   Aucune réduction (ni PA, ni Résilience)
-   Marquées immédiatement sur la fiche

Indicateur clé : Si le texte dit "subit des blessures" sans mentionner
"inflige des dégâts" au préalable, c'est direct.

Natures de dégâts et blessures

Dégâts normaux conduisent à des Blessures létales (X)

-   Guérissent naturellement (voir [Restauration](#restauration-des-points-de-vie))

Dégâts aggravés conduisent à des Blessures aggravées (⭙)

-   Ne guérissent jamais naturellement
-   Nécessitent [intervention divine](../resolution#interventions-divine-et-démoniaque) ou démoniaque

Dégâts non-létaux conduisent à des Blessures non-létales (/)

-   Disparaissent lors du prochain repos hors combat (pas de minuterie)
-   Accumulation : état [Meurtri](../reference/etats#meurtri) dès la moitié des PV en (/), [Épuisé niveau 1](../reference/etats#épuisé-niveaux-16) si jauge entièrement en (/)
-   Les âmes surnaturelles sont immunisées à ces états — le corps subit les coups, l'âme les ignore. Certains effets portant un mot-clé explicite peuvent lever cette immunité.

Règle d'arrondi

L'arrondi est toujours favorable au personnage actif. Ainsi les dégâts
infligés par un personnage sont arrondis au supérieur (favorable à
l'attaquant) alors que lors de la division des dégâts par la
Résilience, l'arrondi se fait toujours à l'inférieur (favorable au
défenseur).

Exemple : Azrael active son aura de sainteté (pouvoir de Rang 1, option [Stigmate](../energie#rang-des-pouvoirs-et-drain)) qui **inflige** 5 dégâts aggravés à toutes les cibles démoniaques au contact.
Belphess la démone aux belles fesses est très très au contact. Le Rang 1 du pouvoir réduit sa Résilience 3 à un facteur 2 : elle **subit** donc 5/2 = 2 blessures aggravées (on arrondit à l'inférieur lors de la division par la résilience). Belphess pousse un gémissement nettement moins équivoque.

Pour les effets bénéfiques (soins, récupération), l'arrondi se fait à
l'[avantage](../resolution#avantage) du lanceur.

# POINTS DE VIE

# **SYSTÈME DE BLESSURES**

## **Principe Général**

Les points de vie (PV) sont déterminés par la caractéristique Vigueur
selon la formule **VIG x 2 + Taille**. Un humain dispose donc d'entre 8
et 12 PV.

Plutôt que de soustraire des points de vie, le système utilise une
**jauge de blessures** composée d'un nombre de cases égal aux PV
maximum du personnage. Les blessures sont cochées de gauche à droite, et
leur gravité détermine le type de marque utilisée.

## **Types de Blessures**

**Blessures Non Létales (/)**

**Marquage :** Simple trait diagonal

**Causes :** Fatigue extrême, coups assommants, douleur intense,
épuisement magique léger

**Restriction :** Ne peut être cochée que dans une case vide

**Guérison :** Toutes les blessures non-létales disparaissent lors d'un repos hors combat. Aucune minuterie — une pause entre deux scènes suffit.

**États associés :** [Meurtri](../reference/etats#meurtri) (≥ moitié des PV en /) et [Épuisé niveau 1](../reference/etats#épuisé-niveaux-16) (jauge entièrement en /). Les créatures surnaturelles sont immunisées à ces états.

**Blessures Létales (X)**

**Marquage :** Croix complète

**Causes :** Armes tranchantes, balles, feu, acide, la plupart des
dégâts de combat

**Upgrade :** Peut transformer une blessure non létale (/) en blessure
létale (X) en complétant la croix

**Guérison :** Récupération naturelle selon le rang céleste (voir
[Restauration](#restauration-des-points-de-vie))

**Blessures Aggravées (⭙)**

**Marquage :** Croix entourée

**Causes :**

-   La [Consommation](../energie#le-seuil-de-tolérance) : tout
    affaiblissement d'âme au-delà du seuil de tolérance
-   Les armes portant le mot-clé **Stigmate**
-   Les pouvoirs lancés avec l'option **Stigmate**

**Upgrade :** Peut transformer n'importe quelle blessure existante

\*\*Ces blessures ne guérissent jamais naturellement. Seule une
intervention divine, démoniaque, une capacité surnaturelle ou un pouvoir
adapté peut les soigner.\*\*

## **Règles de Progression des Blessures**

Les blessures s'**upgradent** toujours vers le type le plus grave :

-   Une case vide peut recevoir n'importe quel type de blessure
-   Une case (/) peut devenir (X) ou (⭙)
-   Une case (X) peut devenir (⭙)
-   Une case (⭙) reste (⭙)

**Important :** Seules les blessures non létales nécessitent une case
vide. Les blessures plus graves peuvent toujours upgrader une blessure
existante.

## **Seuils Critiques**

**Jauge Pleine - Dernière Case (/)**

**Prochaine blessure non létale :** Jet de Vigueur ou inconscience

**Jauge Pleine - Dernière Case (X)**

**Prochaine blessure :** Devient automatiquement (⭙) + Jet de Vigueur ou
inconscience

**Jauge Pleine - Dernière Case (⭙)**

**Prochaine blessure :** **MORT** (quel que soit le type de dégât reçu)

## **Guérison Accélérée**

**Pouvoirs de Guérison Rapide**

**Guérison Rapide 1** (Rang requis 2, Passif permanent)

-   Blessures létales : 1 jour par coche

**Guérison Rapide 2** (Rang requis 3)

-   Blessures létales : 1 heure par coche

**Guérison Rapide 3** (Rang requis 4)

-   Blessures létales : 1 minute par coche

**Guérison Rapide 4** (Rang requis 5)

-   Blessures létales : 1 tour par coche

**Régénération (Rang requis 2, Concentration)**

Toutes les blessures guérissent simultanément au rythme de la capacité
de guérison du personnage, plutôt qu'une après l'autre.

## **Blessures Aggravées - Règles Spéciales**

**Limitation des Pouvoirs**

-   **Aucun pouvoir de guérison** ne peut directement soigner les
    blessures aggravées
-   La "Guérison Rapide" n'affecte que les blessures (/) et (X)

**Conversion Nécessaire**

Pour guérir d'une blessure aggravée (⭙), il faut d'abord la
**convertir** en blessure létale (X) via :

-   Pouvoirs de conversion spécifiques
-   Rituels de purification spirituelle
-   Intervention divine

**Objets Exceptionnels**

Certains artefacts légendaires comme **le Saint Graal** peuvent guérir
directement toutes les blessures, y compris aggravées, sans conversion
préalable.

## **Exemple Pratique**

**Mirael** (Ange, 10 PV, Résilience 3) reçoit plusieurs attaques en combat :

1.  Une attaque inflige 9 dégâts non létaux → après Résilience (9/3=3), Mirael **subit** 3 blessures non létales → coche (/) (/) (/) dans les cases 1-3.
2.  Une attaque inflige 6 dégâts létaux → après Résilience (6/3=2), Mirael **subit** 2 blessures létales → les cases 1-2 s'upgradent en (X) (X), la case 3 reste (/).
3.  Mirael lance un pouvoir qui dépasse son seuil de tolérance → **subit** directement 1 blessure aggravée (sans réduction), la case 1 devient (⭙).
4.  État intermédiaire : (⭙) (X) (/) + 7 cases vides.
5.  Une balle inflige 9 dégâts létaux → après Résilience (9/3=3), Mirael **subit** 3 blessures létales → les cases 3 (qui upgrade depuis /), 4 et 5 deviennent (X).
6.  État final : (⭙) (X) (X) (X) (X) + 5 cases vides.

**Guérison :**

-   Cases 2-6 (X) : récupération naturelle selon le rang céleste (voir [Restauration](#restauration-des-points-de-vie)) — la case 3, anciennement (/), guérit comme une blessure létale depuis qu'elle a été upgradée
-   Case 1 (⭙) : Conversion nécessaire puis 1 semaine

voici les points de vie d'autres créatures, pour exemple :

| **Tranche de poids** | **Exemple d'animaux** | **Taille** | **Taille (SW)** | **Taille (D&D)** |
| --- | --- | --- | --- | --- |
| < 100 g | Colibri, Souris, Musaraigne, Moineau | 1 | Taille -2 | Minuscule (Tiny) |
| 100 g – 1 kg | Rat, Pigeon, Écureuil, Furet | 2 | Taille -1 à -2 | Minuscule (Tiny) |
| 1 kg – 5 kg | Chat domestique, Lapin, Renard, Chien (petites races), Compsognathus | 3 | Taille -1 | Petite (Small) |
| 5 kg – 20 kg | Chien (races moyennes), Kangourou, Chèvre (jeune), Velociraptor | 4 | Taille 0 | Petite à Moyenne |
| 20 kg – 50 kg | Chien (grandes races), Mouton, Porc (jeune), Guépard, Loup | 5 | Taille 0 | Moyenne (Medium) |
| 50 kg – 100 kg | Humain, Puma, Mouton (adulte), Porc (adulte) | 6 | Taille 0 à +1 | Moyenne (Medium) |
| 100 kg – 200 kg | Lionne, Gorille, Dauphin, Cerf | 7 | Taille +2 | Grande (Large) |
| 200 kg – 500 kg | Tigre, Ours brun, Vache, Cheval, Licorne | 8 | Taille +2 à +3 | Grande (Large) |
| 500 kg – 1 tonne | Vache (grande race), Hippopotame (jeune), Ours polaire | 9 | Taille +3 | Grande (Large) |
| 1 – 5 tonnes | Rhinocéros, Hippopotame (adulte), Girafe, Éléphant d'Asie, Drake | 10 | Taille +4 à +5 | Très grande (Huge) |
| 5 – 10 tonnes | Éléphant d'Afrique, Baleine de Minke, Triceratops, T. rex, Dragon jeune | 11 | Taille +6 | Très grande (Huge) |
| 10 – 50 tonnes | Baleine à bosse, Requin-baleine, Diplodocus, Apatosaurus, Dragon adulte | 12 | Taille +7 | Gigantesque (Gargantuan) |
| 50 – 100 tonnes | Rorqual commun, Brachiosaurus, Argentinosaurus | 13 | Taille +8 | Gigantesque (Gargantuan) |
| > 100 tonnes | Baleine bleue | 14 | Taille +9 | Gigantesque (Gargantuan) |

## Division des dommages encaissés :

Certaines créatures surnaturelles sont particulièrement robustes ainsi,
bon nombre de créatures de Dieu disposent du pouvoir "Résilience" qui
leur permet de diviser les dégâts qu'ils encaissent par un facteur
pouvant aller jusqu'à leur rang céleste. Tous les anges et démons
disposent du pouvoir Résilience 3, leur permettant de diviser tous les
dommages par 3.

Ainsi, les humains et tous les êtres vivants sur terre ne divisent pas
les dégâts, les êtres surnaturels inférieurs peuvent diviser les dégâts
par 2 s'ils disposent du pouvoir Résilience. Un Archange attaqué
diviserait les dégâts d'une attaque par 4.

Cette division s'applique **avant** de déterminer le nombre de cases à
cocher, mais ne change pas le type de blessure infligée.

La Résilience ne protège que du profane. Tout ce qui est surnaturel la
traverse, en tout ou partie :

-   **Pouvoirs** : le [rang de lancement](../energie#rang-des-pouvoirs-et-drain)
    réduit d'autant le facteur de division, jusqu'à un minimum de 1. Un
    pouvoir de Rang 2 face à une Résilience 3 divise par 1 —
    c'est-à-dire pas du tout.
-   **Armes spéciales** : le mot-clé **Fléau X** réduit le facteur de
    division de X, le cas échéant contre une catégorie de créatures
    précisée entre parenthèses. Les balles en argent portent *Fléau 1
    (Maudits)* — de quoi rendre les loups-garous et les vampires
    particulièrement nerveux. Les armes forgées au Paradis ou en Enfer
    portent un Fléau fixé à la forge, généralement sans condition.

Enfin, certaines créatures peuvent être tout bonnement insensibles à
certaines formes de dommages ou états. Voir la section "états".

<div class="admonition note">
<p class="admonition-title">Rôle des armes spéciales</p>

Les armes spéciales ne font pas plus de dégâts bruts — elles percent les défenses surnaturelles (**Fléau**) ou laissent des plaies qui ne se referment pas (**Stigmate**), au cas par cas selon leur description. C'est le seul levier qui permet à un humain bien préparé (inquisiteur, chasseur) de menacer réellement un être surnaturel de haut rang.
</div>

## Restauration des points de vie :

une créature vivante récupère les points de vie au rythme de (rang) /
semaine (voir chapitre sur le rang céleste).
En plus de cette récupération naturelle, une créature surnaturelle
récupère des points de vie au rythme de (rang)/jour (au même moment que
l'énergie, voir la section "[restauration de l'énergie](../energie)").
Note : Certaines créatures maudites comme les vampires ne restaurent pas
leur points de vie automatiquement, ils sont obligés de les prendre à
leur victime (et disposent d'une capacité spéciale pour cela). ces
créatures disposent du trait "Maudit".
