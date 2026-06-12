---
title: INS-MV ROGUE — SRD
sidebar:
  order: 0
---

Bienvenue dans le System Reference Document d'**INS-MV ROGUE**.

Ce site contient l'ensemble des règles du jeu, organisées par section.

## Sections

- [Contexte](contexte/contexte)
- [Personnage](personnage/caracteristiques)
- [Mécanique](mecanique/resolution)
- [Référence](reference/mots-cles)
- [Simulateur](simulateur)
- [Générateur](generateur)

---

## Système de dégâts des armes

**Dégâts finaux = Code** _(de l'arme/effet)_ **+ max(Marge,** [**Dé rouge**](mecanique/resolution)**) — PA** _(min 0)._

Applique ensuite les effets spéciaux (critique, sacré, etc.).

- **Code** : valeur fixe de l'arme/effet.
- **Marge** : différence entre le seuil de réussite et le résultat du Dé d'action.
- **Dé rouge** : [dé d'intensité](mecanique/resolution) — explosif si indiqué.
- **max(Marge, Dé rouge)** : on retient le meilleur des deux, sans les additionner.
- **PA** : Points d'Armure de la **zone touchée**. Sans visée : utilise la **PA du torse**. Les boucliers portés **ajoutent** leur PA au torse.

<div class="admonition note">
<p class="admonition-title">Pourquoi max() et non addition ?</p>

À bas niveau de [compétence](mecanique/competences), le dé rouge peut compenser une faible marge. À haut niveau, la compétence domine naturellement. Le dé rouge explosif (déclenché par l'[avantage](mecanique/resolution#avantage) ou un critique) reste le levier des personnages puissants — il peut toujours surprendre, mais ne s'empile plus avec une déjà grande marge.
</div>

1. Code de dégâts :

- Armes à distance : déterminée en fonction du projectile et de la longueur du canon.
- Armes de mêlée : FOR + modificateur de l'arme
- Armes de mêlée basées sur l'AGI plutôt que la FOR : Rapière, Fleuret, Wakizashi, Nunchaku
- Explosifs : code dégât de zone de l'explosif en fonction de la matière et de la quantité. Le dé d'intensité associé à l'utilisation d'explosifs est toujours... explosif!

2. Tir en rafale : le joueur lance les dés une fois et compare avec son seuil de réussite : la [marge de réussite](mecanique/resolution#3-marge-de-réussite), c'est le nombre de balles qui touchent (maximum 3). Les dégâts sont égaux au dé d'intensité + (code de dégâts de l'arme x le nombre de balles qui touchent).

3. Tir de saturation : tir en continu d'une dizaine de balles pour « saturer » une zone. Toutes les cibles dans la zone auront un désavantage à toute action autre que rester ou se mettre à couvert.

4. Dégâts de zone : Une fois calculés, les dégâts sont infligés à 100% à toutes les cibles situées dans le rayon d'action principal, et à 50% à toutes les cibles situées dans le rayon d'action secondaire.

Exemple du tir au pistolet :

Glock 17 : Code **2**, tu réussis avec **Marge 2**, dé rouge **3** →
max(2, 3) = **3** → **Dégâts bruts = 2 + 3 = 5**. La cible a **PA 2** → **3** dégâts finaux.

_(Avec l'ancienne formule addition : 2 + 2 + 3 = 7. La nouvelle formule est plus sobre et avantage la compétence sur le hasard.)_
