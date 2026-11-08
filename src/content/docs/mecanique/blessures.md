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

Certains effets utilisent directement le verbe "subir" sans mentionner de dégâts (par exemple "sur une réussite, la cible subit une blessure létale"), cela implique donc qu'il n'y a aucune réduction (ni PA, ni Résilience) et que cette blessure est indiquée immédiatement sur la fiche.

Natures de dégâts et blessures

Dégâts non-létaux (fatigue, contusions légères...) conduisent à des Blessures non-létales (/)

- Guérissent rapidement (1 par 5min de repos). 

Dégâts létaux (blessures graves : blessures ouvertes, impacts de balles, coupures, fractures, commotions...) conduisent à des Blessures létales (X)

- Guérissent naturellement (1 par semaine)

Les marques **aggravées (⭙)** servent à représenter la destruction progressive d'un corps en état terminal, selon la nature de l'âme. Elles ne constituent plus une catégorie ordinaire de dégâts d'attaque.

Règle d'arrondi

L'arrondi est toujours favorable au personnage actif. Ainsi les dégâts infligés par un personnage sont arrondis au supérieur (favorable à l'attaquant) alors que lors de la division des dégâts par la Résilience, l'arrondi se fait toujours à l'inférieur (favorable au défenseur).

Exemple : une attaque inflige 5 dégâts après arrondi, puis la Résilience 3 les réduit à **1 blessure** (arrondi inférieur).

Pour les effets bénéfiques (soins, récupération), l'arrondi se fait à l'[avantage](../resolution#avantage) du lanceur.

# POINTS DE VIE

# **SYSTÈME DE BLESSURES**

## **Principe Général**

Les points de vie (PV) sont déterminés par la caractéristique Vigueur
selon la formule **VIG x 2 + Taille**. La Vigueur d'un hôte humain varie de 1 à 3 ; son total de PV peut donc être inférieur à 8.

Plutôt que de soustraire des points de vie, le système utilise une **jauge de blessures** composée d'un nombre de cases égal aux PV maximum du personnage. Les blessures sont cochées de gauche à droite, et leur gravité détermine le type de marque utilisée. Les nouvelles blessures d'un même type « poussent » les anciennes vers la droite. Les blessures létales remplacent prioritairement les non létales lorsque la jauge est saturée. Les marques aggravées ne sont utilisées que pour l'agonie des âmes humaines ordinaires.

## Types de blessures et saturation

- **Non létales (/)** : fatigue, contusions, drain. Elles guérissent à raison d'une marque toutes les 5 minutes de repos. Une blessure non létale supplémentaire sur une jauge saturée devient létale.
- **Létales (X)** : traumatismes graves, tirs, coupures, brûlures. Elles guérissent naturellement à raison d'une marque par semaine, sauf règle de guérison particulière.
- **Aggravées (⭙)** : marques terminales qui remplacent les marques létales lorsque le corps d'un humain agonise. Ce n'est **pas un type ordinaire de dégâts** utilisable par une arme ou un pouvoir.

Les marques s'inscrivent dans la jauge de **PV = 2 × VIG + Taille**. Une nouvelle blessure létale remplace prioritairement une marque non létale si la jauge est saturée. Lorsque toutes les cases sont létales, le devenir de l'hôte dépend **de la nature de l'âme** :

### Âme humaine ordinaire

Le lien entre l'âme humaine et son corps est très fort. Lorsque **toutes les cases sont létales**, le corps est en état critique, mais l'âme reste attachée à lui. **Sans stabilisation par premiers secours ou médicalisation, une case létale devient aggravée chaque minute.** Toute blessure supplémentaire transforme immédiatement autant de cases létales en aggravées. Lorsque **toutes les cases sont aggravées**, l'âme quitte le corps : c'est la mort de l'hôte.

### Stabilisation par premiers secours

Pour stabiliser un **hôte humain ordinaire** dont la jauge est entièrement létale, un soignant consacre une **action complexe** à un jet de **PER + Premiers soins**. Il applique les règles habituelles du seuil (plafond 5, avantages et désavantages), notamment le désavantage si le matériel approprié manque.

- **Réussite** : le blessé est stabilisé. La conversion automatique d'une marque létale en marque aggravée **chaque minute s'arrête**, mais les cases déjà aggravées ne sont pas effacées.
- **Échec** : le blessé n'est pas stabilisé et la dégradation continue ; une nouvelle tentative reste possible si l'intervenant peut agir.
- **Nouvelle blessure avant guérison** : si toutes les cases restent occupées par des blessures létales ou aggravées, elle convertit immédiatement autant de marques létales en aggravées ; les soins ne protègent pas d'une nouvelle agression.

Les premiers secours permettent de **gagner du temps**, pas de restaurer des PV. Une médicalisation et des soins ultérieurs sont nécessaires pour guérir. Ce procédé ne retient pas artificiellement une **âme surnaturelle**, qui a déjà quitté son hôte à saturation létale ; il ne met pas non plus fin à la **stase d'une âme damnée**, qui relève des règles particulières de la créature.

### Âme surnaturelle (ange, démon et autres âmes non damnées)

Le lien au corps est plus ténu. Lorsque **toutes les cases sont létales**, l'hôte meurt et l'âme le quitte immédiatement. Elle suit alors les règles de [réincarnation](../../personnage/reincarnation) ou de retour à son plan d'origine. **La mort de l'hôte ne détruit pas l'âme.**

### Âme damnée (vampire et autres créatures maudites concernées)

L'âme maudite reste liée au corps. Lorsque **toutes les cases sont létales**, le corps entre en **stase** : il cesse de fonctionner normalement, mais l'âme ne le quitte pas. Les conditions permettant de mettre fin à la stase ou de détruire définitivement une telle créature relèvent de ses règles spécifiques.

### Mort de l'hôte, retour et destruction de l'âme

Ces trois événements sont distincts : **mort de l'hôte** = départ de l'âme du corps ; **retour de l'âme à son plan d'origine** = conséquence possible de l'échec ou de l'épuisement des incarnations ; **destruction de l'âme** = événement exceptionnel, réputé extrêmement rare, voire impossible. Une blessure ordinaire ne détruit jamais l'âme.

### Jauge saturée de blessures non létales

Lorsque toutes les cases sont non létales, un humain ordinaire doit réussir un jet de VIG pour éviter l'inconscience. Les anges et démons ne font pas ce jet pour les seules blessures non létales ; ils restent cependant exposés à leur conversion en blessures létales, notamment par le drain surnaturel.

## **Guérison Accélérée**

**Certains pouvoirs ou capacités, comme la guérison rapide ou la régénération, accélèrent la guérison des blessures.**

**Guérison rapide** est un pouvoir passif (prérequis Rang Céleste 2) dont l'efficacité dépend directement du **Rang Céleste**, sans achat de niveaux supplémentaires :

| Rang Céleste | Récupération des blessures létales |
|---|---|
| **2** | Une marque par jour |
| **3** | Une marque par heure |
| **4** | Une marque par minute |
| **5 ou plus** | Une marque par tour |

**Régénération (Rang céleste 2, Concentration, pas de surcharge)**
Toutes les blessures de même type guérissent simultanément au rythme de la capacité de guérison du personnage, plutôt qu'une après l'autre.

## **Exemple Pratique**

**Exemple :** Mirael, ange incarné, remplit progressivement sa jauge de blessures létales. Dès que toutes les cases sont létales, l'hôte meurt et Mirael se désincarne ; il n'attend pas une conversion en marques aggravées, réservée à l'agonie des humains ordinaires.

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

La **pénétration** des armes ignore des points d'armure, **jamais la Résilience**. Les éventuels effets surnaturels propres à une arme sacrée ou maudite sont décrits séparément et ne sont pas assimilés à de la pénétration. </div>

Note : Certaines créatures maudites comme les vampires ne restaurent pas leur points de vie automatiquement, ils sont obligés de les prendre à leur victime (et disposent d'une capacité spéciale pour cela). Ces créatures, incapables de guérir naturellement, disposent du trait "Maudit".
