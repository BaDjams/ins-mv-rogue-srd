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

La composition officielle se modifie dans le [CMS du SRD](/ins-mv-rogue-srd/admin/) (rubrique **Deck officiel des hôtes**) ; les données sont versionnées dans `public/data/hotes-officiels.json`. L'administrateur peut activer ou désactiver le deck, renseigner ses poids ordinaires, créer des fiches spéciales et préciser pour chacune le taux de tirage et les dates de disponibilité (journées UTC incluses). Les caractéristiques exceptionnelles d'un hôte spécial sont celles explicitement définies sur sa fiche.

**Le deck officiel est initialement désactivé**, dans l'attente des premières données officielles. Le générateur utilise alors le jeu de remplacement.

## Ouverture de booster

Choisissez le camp, le moment de l'incarnation et le **booster proposé pour votre scénario**. Le paquet est ouvert avec une animation ; les cartes sont ensuite révélées, avec une mise en valeur de la **qualité la plus élevée**. Cette mise en valeur n'impose aucun choix : le joueur désigne librement son hôte parmi les cartes obtenues et peut exporter sa fiche.

L'animation laisse le temps de découvrir chaque carte puis déclenche un **flash lumineux et un halo** sur celle(s) ayant la qualité la plus élevée. L'administrateur peut définir la **couleur d'ambiance du booster** (`themeColor`, format `#RRGGBB`) ; cette couleur anime le flash et le halo, tandis que les cadres conservent la couleur propre à chaque qualité. Le rythme des effets est adapté à la préférence « réduire les animations » du système.

Sur les cartes, les qualités sont présentées sous les intitulés **Personnage commun, Expérimenté, Professionnel, Vétéran et Élite** ; ce changement est **purement visuel** et ne modifie ni les cinq qualités officielles ni leurs probabilités.

Pour les **hôtes ordinaires**, le booster réutilise les tables du générateur de PNJ : profession, traits et loisirs déterminent des objets associés, auxquels s'ajoutent deux objets usuels. La carte présente désormais les **caractéristiques, les compétences et le matériel sous forme de tableaux**, et la **fiche détaillée en plein écran**, puis l'export JSON, conservent toutes ces informations. Les hôtes spéciaux conservent, sans altération, les traits et équipements fixés dans le CMS.

**Ouverture immersive :** lorsque vous lancez le tirage, l'animation apparaît en **superposition plein écran**. Les cartes révélées forment une **galerie horizontale sur téléphone**, navigable par glissement ou avec les flèches. Touchez une carte pour lire sa fiche complète, puis naviguez entre les hôtes sans quitter le plein écran. Le bouton **« Choisir cet hôte »** valide seul l'incarnation ; consulter une carte ne la sélectionne pas.

Les **traits** affichent leur résumé au survol de la souris, au focus clavier ou au toucher. Les traits encore dépourvus de définition disposent d'un texte de substitution explicite, sans effet de règle inventé. Vous pouvez **fermer la superposition sans perdre le tirage**, puis la rouvrir depuis la page ; un nouveau tirage remplace le précédent. La galerie et ses dialogues permettent une fermeture à la touche Échap.

Chaque booster appartient à un vivier, possède son **nom, ses pondérations, ses cartes spéciales éventuelles et son nombre de cartes**, ainsi que des conditions d'activation liées au camp, à la première incarnation ou à la réincarnation et à la période de l'année. Le CMS permet d'en ajouter sans créer de nouvelles règles ou modifier le code de l'application. Les taux de tirage des cartes spéciales restent ceux de leur vivier, sauf configuration explicite d'un booster particulier.

Lors d'une réincarnation, la densité de population limite le nombre de cartes proposées à **trois, deux, une ou zéro** selon le contexte. En l'absence d'hôte humain, les règles particulières du SRD s'appliquent.

<div class="rogue-booster"></div>

## Générateur de PNJ (hors booster)

Le générateur classique reste disponible pour constituer des listes de PNJ ou exporter plusieurs fiches.

<div class="rogue-gen"></div>
