---
title: Ma bibliothèque de personnages
sidebar:
  order: 6
  label: "Bibliothèque de personnages"
tableOfContents: false
---

Créez vos âmes angéliques ou démoniaques, choisissez le personnage actif et conservez les hôtes de leurs incarnations.

<div class="rogue-character-library"></div>

<details>
  <summary>Progressions de départ et évolution</summary>
  <p>C'est le maître de jeu qui décide quand un personnage reçoit une progression. À sa création, il peut disposer de zéro progression (débutant), de cinq progressions ou de tout autre nombre convenu pour le scénario. Chaque progression correspond à une seule amélioration : un attribut de l'âme, un pouvoir, un niveau de compétence résiduelle déjà acquis ou un nouveau trait d'âme.</p>
  <p>Une âme conserve ses caractéristiques et son histoire lorsqu'elle change d'hôte. Une compétence résiduelle est une exception encadrée : la règle particulière d'acquisition reste applicable. Consultez les <a href="../progression/">règles de progression</a> et les <a href="../../mecanique/competences/">compétences</a>.</p>
</details>

<details>
  <summary>Bibliothèque locale, archivage et sauvegardes</summary>
  <p>La bibliothèque utilise IndexedDB. Un personnage archivé reste enregistré avec ses évolutions et ses hôtes, mais n'est plus sélectionnable comme personnage actif tant qu'il n'a pas été désarchivé. La suppression, elle, est définitive.</p>
  <p>Ces données sont stockées uniquement dans <strong>ce navigateur sur cet appareil</strong>. Elles ne sont ni synchronisées entre téléphones et ordinateurs, ni envoyées à GitHub, ni accessibles automatiquement au MJ. Effacer les données du site peut supprimer les fiches : exportez-les régulièrement en JSON pour pouvoir les réimporter.</p>
</details>

<details>
  <summary>Association d'un hôte et impression PDF</summary>
  <p>Lorsque vous choisissez une carte dans le <a href="../../generateur/">générateur de boosters</a>, l'hôte est automatiquement enregistré dans le personnage actif. L'ancienne incarnation reste dans l'historique de sa fiche. Sans âme active, le choix du booster fonctionne toujours, mais aucune association n'est réalisée.</p>
  <p>Le bouton <strong>Fiche PDF / imprimer</strong> ouvre le dialogue d'impression du navigateur avec une fiche A4 consacrée à l'âme, ses pouvoirs, ses traits et ses progressions, suivie des compétences, caractéristiques et équipements de son hôte. Sur Android et les navigateurs compatibles, sélectionnez <strong>Enregistrer au format PDF</strong> comme destination. Aucun service externe n'est requis.</p>
</details>
