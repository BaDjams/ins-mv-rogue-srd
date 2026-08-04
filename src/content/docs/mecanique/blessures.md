---
title: Dégâts & Blessures
sidebar:
  order: 6
  label: Dégâts & Blessures
---

Pour éviter toute confusion, le jeu utilise la terminologie suivante :

On INFLIGE des dégâts (actif, offensif)

-   Les dégâts sont le montant brut avant réductions
-   Exemple : "Cette attaque inflige 10 dégâts"

On SUBIT des blessures (passif, résultat final)

-   Les blessures sont marquées sur la fiche de PV après réductions
-   Exemple : "Le défenseur subit 3 blessures"

De l'attaque à la blessure :

Lorsqu'une attaque inflige des dégâts :

1. Calcul des dégâts bruts = Intensité finale + modificateurs (le code de dégât d'une arme, le rang d'un pouvoir, etc...)
2. Réduction : on soustrait les PA de l'armure ou autre réductions de dégâts (sauf mention contraire)
3. Réduction : on divise le résultat précédent par la Résilience s'il y a lieu (arrondi à l'inférieur)
4. Blessures finales : Le résultat indique le nombre de blessures subies par le défenseur.

Certains effets utilisent directement le verbe "subir" sans mentionner de dégâts (par exemple "sur une réussite, la cible subit une blessure létale"), cela implique donc qu'il n'y a aucune réduction (ni PA, ni Résilience) te que cette blessure est indiquée immédiatement sur la fiche.

Natures de dégâts et blessures

Dégâts non-létaux (fatigue, contusions légères...) conduisent à des Blessures non-létales (/)

- Guérissent rapidement (1 par 5min de repos). 

Dégâts létaux (blessures graves : blessures ouvertes, impacts de bales, coupures, fractures, commotions...) conduisent à des Blessures létales (X)

- Guérissent naturellement (1 par semaine)

Dégâts aggravés (amputations, dégâts magiques particuliers...) conduisent à des Blessures aggravées (⭙)

- Ne guérissent jamais naturellement.

Règle d'arrondi

L'arrondi est toujours favorable au personnage actif. Ainsi les dégâts infligés par un personnage sont arrondis au supérieur (favorable à l'attaquant) alors que lors de la division des dégâts par la Résilience, l'arrondi se fait toujours à l'inférieur (favorable au défenseur).

Exemple : Azrael active son aura de sainteté qui **inflige** ([rang ](../../personnage/rang)de pouvoir + Intensité finale) /2 dégâts aggravés à toutes les cibles démoniaques au contact. 3+6/2 = 4,5, donc arrondi à 5 dégâts (l'arrondi profite au personnage actif, en l'état on calcul les dégâts d'Azrael, l'arrondi profite donc à Azrael).
Belphess la démone aux belles dagues qui n'a pour armure qu'un t-shirt mouillé est très très au contact et **subit** donc 5/3=1 blessure aggravée (on arrondit à l'inférieur lors de la division par la résilience car dans ce calcul, l'arrondi profite à Belphess, le personnage actif du calcul). Belphess pousse un gémissement équivoque.

Pour les effets bénéfiques (soins, récupération), l'arrondi se fait à l'[avantage](../resolution#avantage) du lanceur.

# POINTS DE VIE

# **SYSTÈME DE BLESSURES**

## **Principe Général**

Les points de vie (PV) sont déterminés par la caractéristique Vigueur
selon la formule **VIG x 2 + Taille**. Un humain dispose donc d'entre 8
et 12 PV.

Plutôt que de soustraire des points de vie, le système utilise une **jauge de blessures** composée d'un nombre de cases égal aux PV maximum du personnage. Les blessures sont cochées de gauche à droite, et leur gravité détermine le type de marque utilisée. Les nouvelles blessures d'un même type "poussent" les anciennes vers la droite.

## **Types de Blessures**

**Blessures Non Létales (/)**

**Marquage :** Simple trait diagonal
**Causes :** Fatigue extrême, coups assommants, douleur intense, drain magique dans les limites du [Rang Céleste](../../personnage/rang) (un 6 sur un dé de [drain](../energie#rang-des-pouvoirs-et-drain))
**Restriction :** Ne peut être cochée que dans une case vide
**Guérison :** 1 / 5min de repos.

<div class="admonition note">
<p class="admonition-title">Immunités à la fatigue</p>

Certaines âmes sont immunisées aux blessures non-létales d'origine physique ordinaire (fatigue, essoufflement, coups assommants) — l'immunité, si elle existe, dépend du type d'âme incarnée et est précisée dans sa description. Le drain magique, lui, reste toujours efficace : ce n'est pas de la fatigue du corps, mais l'usure du canal entre l'âme et son hôte.
</div>

**Blessures Létales (X)**

**Marquage :** Croix complète
**Causes :** Armes tranchantes, balles, feu, acide, la plupart des dégâts de combat
**Guérison :** 1 semaine par coche (récupération naturelle selon le rang céleste)

**Blessures Aggravées (⭙)**

**Marquage :** Croix entourée 
**Causes :** Blessures très graves laissant des séquelles permanentes (amputations...), drain automatique généré par un rang de lancement de sort au-delà du [Rang Céleste](../../personnage/rang) (voir [Énergie](../energie)), certaines sources de dégâts surnaturels décrites comme infligeant ce type de dégats
Guérison : Ces blessures ne guérissent jamais naturellement. Au mieux une cicatrisation. 

## **Règles de Progression des Blessures**

Les blessures s'**aggravent** toujours vers le type le plus grave :

-   Une case vide peut recevoir n'importe quel type de blessure
-   Une case (/) peut devenir (X) ou (⭙)
-   Une case (X) peut devenir (⭙)
-   Une case (⭙) reste (⭙)

**Important :** Seules les blessures non létales nécessitent une case vide. Les blessures plus graves peuvent toujours aggraver une blessure existante.

## **Seuils Critiques**

A chaque fois que le personnage subit une blessure, on vérifie d'abord si l'un des cas suivant s'applique : 

**Jauge Pleine - Dernière Case (/) :**  Le personnage doit réussir un jet de VIG ou sombrer dans l'inconscience.
les prochaines blessures non létales subies seront obligatoirement de type létal (X).

**Jauge Pleine - Dernière Case (X) :**   Le personnage doit réussir un jet de VIG ou sombrer en état critique. Il est alors inconscient et doit recevoir des soins rapidement : tant qu'il n'est pas stabilisé, il subit 1 blessure non létale à chaque tour. Les prochaines blessures létales ou non létales subies seront obligatoirement de type  aggravée (⭙).

**Jauge Pleine - Dernière Case (⭙) :**  **MORT** (pas de jet de sauvegarde contre la mort dans ce jeu)**.**

## **Guérison Accélérée**

**Certains pouvoir ou capacité, comme laguérison rapide ou la régénération permettent de guérir les blessures plus rapidement.**

**Guérison Rapide 1** (Rang céleste requis 2, Passif permanent) : Les blessures létales guérissent au rythme accéléré de 1 jour par coche

**Guérison Rapide 2** (Rang céleste requis 3)  Les blessures létales guérissent au rythme impressionnant de 1 heure par coche

**Guérison Rapide 3** (Rang céleste requis 4): Les blessures létales guérissent au rythme effréné de 1 minute par coche

**Guérison Rapide 4** (Rang céleste requis 5) : Les blessures létales guérissent au rythme inquiétant de 1 tour par coche

**Régénération (Rang céleste 2, Concentration, pas de surcharge)**
Toutes les blessures de même type guérissent simultanément au rythme de la capacité de guérison du personnage, plutôt qu'une après l'autre.

## **Blessures Aggravées - Règles Spéciales**

**Limitation des Pouvoirs**

-   **Aucun pouvoir de guérison** ne peut directement soigner les blessures aggravées
-   La "Guérison Rapide" n'affecte que les blessures (/) et (X)

**Conversion Nécessaire**

Pour guérir d'une blessure aggravée (⭙), il faut d'abord la **convertir** en blessure létale (X) via :

-   Pouvoirs de conversion spécifiques
-   Rituels de purification spirituelle
-   Intervention divine

**Objets Exceptionnels**

Certains artefacts légendaires comme **le Saint Graal** peuvent guérir directement toutes les blessures, y compris aggravées, sans conversion préalable.

## **Exemple Pratique**

**Mirael** (Ange, 10 PV, Résilience 3) reçoit plusieurs attaques au cours d'un combat :

1.  Une attaque inflige 9 dégâts non létaux → après Résilience (9/3=3), Mirael **subit** 3 blessures non létales → coche (/) (/) (/) 
2.  Une attaque inflige 6 dégâts létaux → après Résilience (6/3=2), Mirael **subit** 2 blessures létales → les cases 1-2 s'upgradent en (X) (X), la case 3 reste (/) et Mirael décale ses cases (/) (/) vers la droite pour bien avoir (X) (X) (/) (/) (/)
3.  Mirael surcharge un pouvoir au rang 4, donc au-delà de son Rang Céleste → drain automatique → **subit** directement 1 blessure aggravée (sans réduction), De plus, 1 dé de drain génère un 6, il subit une blessure non létale en plus  → (⭙) (X) (X) (/) (/) (/) (/) + 3 cases vides.
4.  Une balle inflige 9 dégâts létaux → après Résilience (9/3=3), Mirael **subit** 3 blessures létales →  (⭙) (X) (X) (X) (X) (X) (X) (/) (/) (/). Comme sa dernière case est cochée en non létal, il doit réussir un jet de VIG ou sombrer dans l'inconscience. Il à 3 en VIG et fait 221. C'est réussi (l'intensité de ce jet importe peu), il peut continuer le combat.
5.  Mirael se prend une attaque massive d'un démon armé de sa lame maudite. Malgré la résilience, Mirael subit 4 blessures aggravées. Sa barre de vie devient : (⭙)(⭙)(⭙)(⭙)(⭙) (X) (X) (X) (X) (X). Sa dernière case est cochée en létal, il doit réussir un jet de VIG ou sombrer en état critique. C'est raté cette fois-ci et Mirael sombre dans l'inconscience, son hôte de son sang. si personne ne vient le sauver, l'hote mourra et Mirael pourra se réincarener.

## Calcul des points de vie par type de créatures :

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

Certaines créatures surnaturelles sont particulièrement robustes ainsi, bon nombre de créatures de Dieu disposent du pouvoir "Résilience" qui leur permet de diviser les dégâts qu'ils encaissent par un facteur pouvant aller jusqu'à leur rang céleste. Tous les anges et démons disposent du pouvoir Résilience 3, leur permettant de diviser tous les dommages par 3.

Ainsi, les humains et tous les êtres vivants sur terre ne divisent pas les dégâts, les êtres surnaturels inférieurs peuvent diviser les dégâts par 2 s'ils disposent du pouvoir Résilience. Un Archange attaqué diviserait les dégâts d'une attaque par 4.

Cette division s'applique **avant** de déterminer le nombre de cases à cocher, mais ne change pas le type de blessure infligée.

Notons que certaines armes "magiques" ou "célestes" réduisent, voire annulent l'effet de division des dommages. Les balles en argent en sont un exemple parfait puisqu'ils réduisent le facteur de division de 1 contre les loups garous et les vampires, les rendant particulièrement vulnérables.

Enfin, certaines créatures peuvent être tout bonnement insensibles à certaines formes de dommages ou états. Voir la section "états".

<div class="admonition note">
<p class="admonition-title">Rôle des armes spéciales</p>

Les armes spéciales (argent, armes célestes, armes maudites) ne font pas plus de dégâts bruts — elles réduisent ou annulent la Résilience de l'adversaire. C'est le seul levier qui permet à un humain bien préparé (inquisiteur, chasseur) de menacer réellement un être surnaturel de haut rang. </div>

Note : Certaines créatures maudites comme les vampires ne restaurent pas leur points de vie automatiquement, ils sont obligés de les prendre à leur victime (et disposent d'une capacité spéciale pour cela). Ces créatures, incapables de guérir naturellement, disposent du trait "Maudit".
