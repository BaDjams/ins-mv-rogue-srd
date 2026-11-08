---
title: Équipement
sidebar:
  order: 3
  label: Vue d'ensemble
---

## Système de dégâts des armes :

**Dégâts finaux = Code + Dé rouge − PA** (minimum 0), puis application éventuelle de la Résilience.

Applique ensuite les effets spéciaux (critique, sacré, etc.).

- **Code** : valeur fixe de l'arme/effet.
- **Marge** : réservée au nombre de touches en rafale ; jamais ajoutée aux dégâts.
- **Dé rouge** : [dé d'intensité](../../mecanique/resolution) — explosif si indiqué.
- **Dé rouge** : intensité indépendante de la marge.
- **PA** : Points d'Armure de la **zone touchée**. Sans visée : utilise la **PA du torse**. Les boucliers portés **ajoutent** leur PA au torse.

<div class="admonition note">
<p class="admonition-title">Pourquoi max() et non addition ?</p>

À bas niveau de [compétence](../../mecanique/competences), le dé rouge peut compenser une faible marge. À haut niveau, la compétence domine naturellement. Le dé rouge explosif (déclenché par l'[avantage](../../mecanique/resolution#avantage) ou un critique) reste le levier des personnages puissants — il peut toujours surprendre, mais ne s'empile plus avec une déjà grande marge.
</div>

1. Code de dégâts :

- Armes à distance : déterminée en fonction du projectile et de la
longueur du canon.
- Armes de mêlée : FOR + modificateur de l'arme
- Armes de mêlée basées sur l'AGI plutôt que la FOR : Rapière, Fleuret,
Wakizashi, Nunchaku
- Explosifs : code dégât de zone de l'explosif en fonction de la matière
et de la quantité. Le dé d'intensité associé à l'utilisation
d'explosifs est toujours... explosif!

2. Tir en rafale : en cas de réussite, **1 + marge** balles touchent, dans la limite de la valeur de rafale de l'arme (généralement 3, parfois 5) et des munitions disponibles. Dégâts bruts : **Dé rouge + Code × nombre de balles touchant**. La marge ne s'ajoute pas aux dégâts.
3. Tir de saturation : tir en continu d'une dizaine de balles pour
« saturer » une zone. Toutes les cibles dans la zone auront un
désavantages à toute action autre que rester ou se mettre à couvert.
4. Dégâts de zone : Une fois calculés, les dégâts sont infligés à 100%
à toutes les cibles situées dans le rayon d'action principal, et à 50% à
toutes les cibles situées dans le rayon d'action secondaire.

Exemple du tir au pistolet :

Glock 17 : Code **2**, dé rouge **3**, tir simple réussi → **5 dégâts bruts**. PA 2 → **3 dégâts** avant éventuelle Résilience.
