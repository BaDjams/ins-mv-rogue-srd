---
title: Générateur d'Hôtes & PNJ
sidebar:
  order: 11
tableOfContents: false
---

Génération aléatoire d'hôtes humains sous forme de cartes de personnage, avec les **cinq qualités** et les budgets d'attributs et de compétences du [chapitre Hôtes](../personnage/hotes). Le tirage par défaut simule **uniquement le jeu de 54 cartes de remplacement** : 24 grises, 12 vertes, 12 bleues, 4 violettes et 2 or. **Il ne simule pas les probabilités du deck officiel**, dont la composition peut évoluer, notamment avec des hôtes spéciaux permanents ou saisonniers. Les pondérations du générateur sont configurables à titre de simulation, indépendamment des règles du deck officiel. Les identités, professions et équipements proposés ici sont **indicatifs** tant que les tables D66 officielles ne sont pas publiées. Chaque PNJ possède une identité, un rang, une profession, des traits, de l'équipement et des [caractéristiques](../personnage/caracteristiques).

## Deux modes de tirage

Le **jeu de 54 cartes** constitue une méthode de remplacement : ses 24 cartes grises, 12 vertes, 12 bleues, 4 violettes et 2 or ne fixent en rien les fréquences du deck officiel.

Le **deck officiel**, lorsqu'il est activé, combine une répartition configurable des hôtes ordinaires et des **hôtes spéciaux** définis par l'administrateur. Chacun peut disposer d'une identité, d'un portrait, de caractéristiques, de compétences, de traits et d'un équipement **fixes**. Sa probabilité peut être définie individuellement et son activation être permanente ou limitée à une période.

À chaque tirage, les probabilités des cartes spéciales **actives** sont réservées en premier. Leur somme ne peut excéder 100 %. La probabilité restante est attribuée aux hôtes ordinaires, selon les **poids propres au deck officiel**, et non ceux des 54 cartes. Une carte spéciale à 5 % possède exactement **5 % de probabilité à chaque tirage indépendant** : cela ne garantit pas cinq apparitions sur cent tirages.

### Administration

La composition officielle se modifie dans le [CMS du SRD](../admin/) (rubrique **Deck officiel des hôtes**) ; les données sont versionnées dans `public/data/hotes-officiels.json`. L'administrateur peut activer ou désactiver le deck, renseigner ses poids ordinaires, créer des fiches spéciales et préciser pour chacune le taux de tirage et les dates de disponibilité (journées UTC incluses). Les caractéristiques exceptionnelles d'un hôte spécial sont celles explicitement définies sur sa fiche.

**Le deck officiel est initialement désactivé**, dans l'attente des premières données officielles. Le générateur utilise alors le jeu de remplacement.

<div class="rogue-gen"></div>
