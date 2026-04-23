# POUVOIRS

## Principe Général

Le [rang céleste](rang.md) d'une créature détermine sa capacité à maîtriser des
pouvoirs surnaturels. Plus une créature a un rang élevé, plus elle peut
accéder à des pouvoirs puissants et les développer à un niveau avancé.

## Rang des pouvoirs et Drain

Chaque pouvoir possède un rang (0 à 6). Le rang détermine à la fois l'accès et le coût en [drain](energie.md).

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

## Règles d'Acquisition des Pouvoirs

**Limitation par Rang Prérequis**

Une créature ne peut acquérir un pouvoir que si son rang céleste est
**supérieur ou égal** au rang prérequis du pouvoir.

*Exemple : Un ange de rang 3 peut acquérir des pouvoirs ayant pour
prérequis les rangs 0, 1, 2 ou 3, mais pas ceux nécessitant un rang 4 ou
plus.*

## Limitation des Niveaux de Pouvoir

Pour les pouvoirs possédant plusieurs niveaux (notés X), le niveau
maximum qu'une créature peut atteindre est limité par son Rang Céleste.
Quel que soit le niveau prérequis d'un pouvoir, il ne pourra être
augmenté au-delà du Rang Céleste du personnage.

**Formule : Niveau max = Rang Céleste − Prérequis + 1**

-   **Exemple :** *Rapidité Céleste* (Prérequis Rang 3) — Un Ange de Rang 3 peut l'atteindre au niveau 1 (3 − 3 + 1 = 1). Un Archange de Rang 4 peut l'atteindre au niveau 2 (4 − 3 + 1 = 2).

-   **Exemple :** *Sens Surnaturel* (Prérequis Rang 1) — Un Ange de Rang 3 peut l'atteindre au niveau 3 (3 − 1 + 1 = 3).

## Règles spécifiques aux Pouvoirs

**Légende des Types**

-   **Instantané :** Effet immédiat, pas de durée

-   **Concentration :** Se brise si perturbé ; désavantage permanent sur toutes les actions tant que maintenue

-   **Durée fixe :** Exactement 3 tours puis dissipation automatique. Prolongation = nouveau jet + nouveau coût

-   **Permanent :** Effet durable jusqu'à condition spéciale

-   **Scène entière :** Dure toute la scène/rencontre

-   **Passif permanent :** Toujours actif, aucun jet nécessaire

**Mécaniques**

-   **Intensité :** Résultat du [dé rouge](resolution.md) + [marge de réussite](resolution.md)

-   **Dé explosif :** Le [dé d'intensité](resolution.md) explose sur un 6 (relance et additionne)

-   **Non-réductible :** Ne peut être réduit par l'armure ou la résistance physique

-   **Couper un pouvoir :** [Action gratuite](combat.md), peut être fait à tout moment

-   **Contrôle mental/Possession :** Le contrôleur partage ses PA totaux entre son hôte et toutes ses cibles contrôlées

-   Les blessures aggravées infligées par un pouvoir sont directes — elles ne passent pas par les réductions de PA ou Résilience

**Interactions entre Pouvoirs**

-   Impossible de maintenir sa **concentration** sur plus d'un pouvoir à la fois

-   Les pouvoirs de **durée fixe** ne nécessitent pas d'attention une fois lancés

-   Les effets **permanents** persistent jusqu'à dissipation active ou condition spéciale

---

# Liste des Pouvoirs

Les pouvoirs de Rang 0 ne génèrent aucun dé de drain — ce sont des manifestations mineures accessibles à tout être ayant appris le pouvoir. Ils n'infligent pas de dégâts et n'ont aucun effet mécanique offensif.

Les rangs 4 à 6 sont réservés aux archanges, princes-démons et entités majeures. Les PJ (Rang Céleste 3) peuvent les atteindre uniquement par **surcharge**.

---

## Pouvoirs Génériques

*Accessibles aux anges et aux démons indépendamment de leur camp.*

---

### Passifs

---

**Résilience X** — *Passif permanent · Prérequis Rang 2*

Divise tous les dégâts physiques subis par X. Automatique pour tout être céleste incarné — le corps humain ne supporte pas impunément une âme surnaturelle.

- **Niveau 2 :** divise les dégâts par 2 *(min PJ)*
- **Niveau 3 :** divise par 3 *(max PJ)*
- **Niveau 4 :** divise par 4
- **Niveau 5 :** divise par 5
- **Niveau 6 :** divise par 6 ; les dommages normaux deviennent anecdotiques

*Les armes sacrées, magiques ou maudites conservent leurs effets spéciaux indépendamment de la Résilience.*

---

**Rapidité Céleste X** — *Passif permanent · Prérequis Rang 2*

Le temps s'écoule légèrement différemment pour les créatures célestes.

- **Niveau 2 :** +2 PA par tour *(min PJ)*
- **Niveau 3 :** +3 PA par tour ; avantage à l'initiative *(max PJ)*
- **Niveau 4 :** +4 PA par tour
- **Niveau 5 :** +5 PA par tour ; agit toujours en premier à égalité d'initiative
- **Niveau 6 :** +6 PA par tour ; peut réagir même surpris

---

**Réflexes Surhumains X** — *Passif permanent · Prérequis Rang 1*

L'avantage du premier coup peut tout changer.

- **Niveau 1 :** score d'initiative +1
- **Niveau 2 :** score d'initiative +2 ; les réactions coûtent 1 PA de moins
- **Niveau 3 :** score d'initiative +3 ; les réactions coûtent 2 PA de moins *(max PJ)*
- **Niveau 4 :** score d'initiative +4 ; une réaction gratuite par tour
- **Niveau 5 :** score d'initiative +5 ; deux réactions gratuites par tour
- **Niveau 6 :** score d'initiative +6 ; peut agir pendant le tour d'un adversaire

---

**Force Spirituelle X** — *Passif permanent · Prérequis Rang 1*

La force de l'âme transcende celle du corps.

- **Niveau 1 :** lors d'une substitution PUI→FOR, ajoute +1 aux dégâts (pas au jet)
- **Niveau 2 :** +2 aux dégâts lors de substitution PUI→FOR
- **Niveau 3 :** +3 aux dégâts lors de substitution PUI→FOR *(max PJ)*
- **Niveau 4 :** +4 aux dégâts ; la substitution s'applique aussi aux jets de FOR purs
- **Niveau 5 :** +5 aux dégâts ; FOR de l'hôte ignorée, utilise PUI directement
- **Niveau 6 :** +6 aux dégâts ; force dévastatrice capable de briser la matière

---

**Sens Surnaturel X** — *Passif permanent · Prérequis Rang 1*

Un *spider-sense* céleste — la présence du surnaturel laisse une trace que l'âme entraînée perçoit.

- **Niveau 1 :** détecte toute créature surnaturelle dans un rayon de 5m (présence, pas direction)
- **Niveau 2 :** portée 10m ; indique la direction (cône de 90°) et l'alignement (bien/mal/neutre)
- **Niveau 3 :** portée 20m ; direction précise (cône 45°) et puissance approximative (Rang céleste) *(max PJ)*
- **Niveau 4 :** portée 40m ; identifie la nature exacte de la créature
- **Niveau 5 :** portée 100m ; perçoit les pouvoirs actifs sur la cible
- **Niveau 6 :** portée 500m ; détecte même les créatures camouflées ou dissimulées magiquement

---

**Guérison Rapide X** — *Passif permanent · Prérequis Rang 2*

Les blessures mortelles ne sont que temporaires, pour qui sait canaliser la puissance divine.

- **Niveau 2 :** récupère 1 PV par heure (au lieu d'1 par jour) *(min PJ)*
- **Niveau 3 :** récupère 1 PV par 10 minutes *(max PJ)*
- **Niveau 4 :** récupère 1 PV par minute
- **Niveau 5 :** récupère 1 PV par tour hors combat
- **Niveau 6 :** récupère 1 PV par tour même en combat ; les blessures légères se ferment à vue d'œil

---

### Actifs — Offensifs

---

**Projectile Céleste X** — *Instantané · Prérequis Rang 1 · Attribut : PUI · Portée : 30m*

Un trait d'énergie pure — lumière, ombre ou feu selon la nature de l'être — propulsé vers une cible à portée de vue.

- **Rang 0 :** un point lumineux/ténébreux frappe la cible sans dégâts (distraction visuelle, signal)
- **Rang 1 :** `max(Marge, Intensité)` dégâts
- **Rang 2 :** `2 × max(Marge, Intensité)` dégâts ; peut cibler 2 cibles adjacentes
- **Rang 3 :** `3 × max(Marge, Intensité)` dégâts ; traverse les armures physiques *(max PJ)*
- **Rang 4 :** `4 × max(Marge, Intensité)` dégâts ; jusqu'à 3 cibles distinctes
- **Rang 5 :** `5 × max(Marge, Intensité)` dégâts ; ignore toutes les résistances physiques et magiques légères
- **Rang 6 :** `6 × max(Marge, Intensité)` dégâts ; dégâts collatéraux sur 2m autour de l'impact

*Trapping Ange : traits de lumière pure. Trapping Démon : lances d'ombre ou de feu.*

---

**Frappe Céleste X** — *Durée fixe · Prérequis Rang 1 · Attribut : PUI · Portée : Personnel*

L'arme tenue devient un conduit pour la puissance de l'âme — elle brille ou fume, et chaque coup transmet quelque chose de plus que le métal.

- **Rang 0 :** l'arme brille ou fume (cosmétique ; peut servir de source de lumière faible)
- **Rang 1 :** +1 dégât aux attaques au corps à corps pendant 3 tours ; dé d'intensité explosif
- **Rang 2 :** +2 dégâts ; le dé d'intensité explosif s'applique à toutes les attaques
- **Rang 3 :** +3 dégâts ; les attaques ignorent 1 point de PA *(max PJ)*
- **Rang 4 :** +4 dégâts ; les attaques ignorent 2 points de PA
- **Rang 5 :** +5 dégâts ; les attaques sont considérées comme sacrées/maudites
- **Rang 6 :** +6 dégâts ; chaque coup réussi inflige un état au choix (Ébranlé, Ralenti ou Aveuglé, 1 tour)

*Trapping Ange : arme bénie brillante. Trapping Démon : arme maudite fumante.*

---

**Feu Ardent X** — *Durée fixe · Prérequis Rang 2 · Attribut : PUI · Portée : Personnel (rayon 2m)*

Le lanceur s'enveloppe d'une aura de flammes surnaturelles qui brûle quiconque s'approche ou frappe au corps à corps.

- **Rang 0 :** lueur de chaleur (ou de froid) autour du corps — pas de dégâts, simple effet visuel
- **Rang 1 :** non applicable (prérequis Rang 2 — rang minimum de lancement : 2)
- **Rang 2 :** `max(Marge, Intensité)` dégâts à quiconque frappe ou est frappé au corps à corps *(min PJ)*
- **Rang 3 :** `2 × max(Marge, Intensité)` dégâts ; les attaquants sont repoussés d'1m *(max PJ)*
- **Rang 4 :** `3 × max(Marge, Intensité)` dégâts ; rayon étendu à 4m
- **Rang 5 :** `4 × max(Marge, Intensité)` dégâts ; l'aura met en feu les matériaux inflammables
- **Rang 6 :** `5 × max(Marge, Intensité)` dégâts ; rayon 6m ; l'air ambiant devient irrespirable

*Trapping Ange : flammes sacrées dorées. Trapping Démon : braises infernales et fumée noire.*

---

**Explosion X** — *Instantané · Prérequis Rang 2 · Attribut : PUI · Portée : 30m*

Un point dans l'espace explose avec une violence surnaturelle, blessant tout ce qui se trouve dans le rayon.

- **Rang 0 :** une détonation sonore sans dégâts — les cibles sont distraites pendant 1 round
- **Rang 1 :** non applicable (prérequis Rang 2 — rang minimum de lancement : 2)
- **Rang 2 :** `2 × max(Marge, Intensité)` dégâts dans un rayon de 3m *(min PJ)*
- **Rang 3 :** `3 × max(Marge, Intensité)` dégâts dans un rayon de 5m *(max PJ)*
- **Rang 4 :** `4 × max(Marge, Intensité)` dégâts ; rayon 8m ; les cibles sont projetées
- **Rang 5 :** `5 × max(Marge, Intensité)` dégâts ; rayon 12m ; détruit les structures légères
- **Rang 6 :** `6 × max(Marge, Intensité)` dégâts ; rayon 20m ; tremblement de terrain localisé

*Trapping Ange : colonne de feu sacré. Trapping Démon : boule de feu infernale.*

---

**Châtiment X** — *Instantané · Prérequis Rang 3 · Attribut : PUI · Portée : Toucher*

Le jugement dernier en version express — une attaque spirituelle pure qui traverse toute protection physique.

- **Rang 0 :** contact qui fait ressentir à la cible le poids de ses actes (narratif, aucun effet mécanique)
- **Rang 1–2 :** non applicable (prérequis Rang 3 — rang minimum de lancement : 3)
- **Rang 3 :** `3 × max(Marge, Intensité)` dégâts **non-réductibles** par l'armure ou la Résilience *(max PJ)*
- **Rang 4 :** `4 × max(Marge, Intensité)` dégâts non-réductibles ; la cible est Ébranlée 1 tour
- **Rang 5 :** `5 × max(Marge, Intensité)` dégâts non-réductibles ; portée étendue à 5m
- **Rang 6 :** `6 × max(Marge, Intensité)` dégâts non-réductibles ; peut cibler l'âme directement (ignore même les protections magiques)

---

**Aura de Terreur X** — *Durée fixe · Prérequis Rang 2 · Attribut : INF · Portée : Rayon 5m*

La présence du céleste se fait écrasante — quelque chose dans le regard ou la posture déclenche une peur instinctive et irrationnelle.

- **Rang 0 :** présence imposante — les humains hésitent une fraction de seconde avant d'agir (narratif)
- **Rang 1 :** non applicable (prérequis Rang 2 — rang minimum de lancement : 2)
- **Rang 2 :** les ennemis de Rang Céleste ≤2 dans le rayon ont un désavantage aux attaques ; jet RES vs INF pour résister *(min PJ)*
- **Rang 3 :** affecte aussi les ennemis de Rang 3 ; les cibles qui ratent le jet fuient ou se paralysent (choix du lanceur) *(max PJ)*
- **Rang 4 :** rayon 10m ; la panique se propage aux témoins humains
- **Rang 5 :** rayon 20m ; affecte même les créatures surnaturelles de Rang 4
- **Rang 6 :** rayon 30m ; la terreur est absolue — les cibles sont incapables d'agir tant qu'elles restent dans le rayon

*Trapping Ange : manifestation de la colère divine. Trapping Démon : aura de terreur pure.*

---

**Entrave X** — *Durée fixe · Prérequis Rang 1 · Attribut : PUI · Portée : 20m*

Des liens surnaturels — chaînes de lumière, tentacules d'ombre, lianes d'énergie — immobilisent la cible.

- **Rang 0 :** gêne légère — la cible ressent une résistance dans ses mouvements (désavantage sur les jets d'AGI, 1 round, narratif)
- **Rang 1 :** état **Entravé** sur une cible ; jet FOR vs PUI du lanceur pour se libérer chaque tour
- **Rang 2 :** Entravé sur 2 cibles adjacentes, ou Entravé+1 dégât/tour sur une cible
- **Rang 3 :** zone de 3m de rayon, toutes les cibles Entravées *(max PJ)*
- **Rang 4 :** zone 5m ; les tentatives de libération subissent un désavantage
- **Rang 5 :** zone 8m ; entrave aussi les créatures célestes de Rang ≤4
- **Rang 6 :** zone 12m ; entrave totale — même la téléportation est bloquée

*Trapping Ange : chaînes de lumière. Trapping Démon : tentacules d'ombre.*

---

### Actifs — Défensifs

---

**Armure Spirituelle X** — *Durée fixe · Prérequis Rang 1 · Attribut : RES · Portée : Personnel ou Toucher*

Une armure d'énergie pure enveloppe le corps — elle brille ou s'assombrit selon la nature de l'être.

- **Rang 0 :** lueur protectrice (cosmétique ; désavantage en Discrétion mais aucun bonus de PA)
- **Rang 1 :** +1 PA pendant 3 tours ; désavantage en Discrétion tant qu'elle est active
- **Rang 2 :** +2 PA pendant 3 tours
- **Rang 3 :** +3 PA ; l'armure brille intensément (peut aveugler sur résultat critique) *(max PJ)*
- **Rang 4 :** +4 PA ; l'armure absorbe 1 dégât de feu/lumière/ombre par tour
- **Rang 5 :** +5 PA ; résistance aux critiques (l'ennemi doit rater deux fois pour un critique)
- **Rang 6 :** +6 PA ; immunité aux dégâts normaux ce tour-ci, traite tout comme des dégâts aggravés

*Trapping Ange : aura dorée scintillante. Trapping Démon : plaques d'ombre solidifiée.*

---

**Déflexion X** — *Durée fixe · Prérequis Rang 1 · Attribut : RES · Portée : Personnel*

Un vent divin ou une distorsion spatiale dévie les projectiles et les coups avant qu'ils n'atteignent leur cible.

- **Rang 0 :** présence légère — les projectiles semblent dévier imperceptiblement (narratif)
- **Rang 1 :** désavantage sur toutes les attaques à distance contre le lanceur
- **Rang 2 :** désavantage sur les attaques à distance ET au corps à corps
- **Rang 3 :** double désavantage sur les attaques à distance *(max PJ)*
- **Rang 4 :** double désavantage sur toutes les attaques ; les projectiles peuvent être renvoyés sur un résultat critique
- **Rang 5 :** triple désavantage à distance ; certaines attaques ratent automatiquement
- **Rang 6 :** l'espace autour du lanceur est distordu — toute attaque à distance subit un double désavantage et ne peut pas faire de critique

*Trapping Ange : vent divin déviant. Trapping Démon : distorsion spatiale.*

---

**Bouclier de la Foi X** — *Durée jusqu'à destruction · Prérequis Rang 2 · Attribut : RES · Portée : Personnel*

Un bouclier d'énergie condensée se matérialise — il absorbe les coups jusqu'à l'épuisement.

- **Rang 0 :** étincelle protectrice (cosmétique, aucun PV de bouclier)
- **Rang 1 :** non applicable (prérequis Rang 2 — rang minimum de lancement : 2)
- **Rang 2 :** bouclier avec 4 PA et `2 + max(Marge, Intensité)` PV *(min PJ)*
- **Rang 3 :** bouclier avec 6 PA et `3 + max(Marge, Intensité)` PV *(max PJ)*
- **Rang 4 :** bouclier avec 8 PA et `4 + max(Marge, Intensité)` PV
- **Rang 5 :** bouclier avec 10 PA et `5 + max(Marge, Intensité)` PV ; protège aussi les alliés adjacents
- **Rang 6 :** bouclier quasi-indestructible — 12 PA et `6 + max(Marge, Intensité)` PV

!!! note "Explosion de Foi (Anges uniquement)"
    Quand le Bouclier de la Foi d'un ange est détruit, il explose dans un rayon de 2m. Toutes les créatures non-divines dans le rayon subissent `max(Marge, Intensité)` dégâts (intensité au moment de la destruction du bouclier).

---

**Régénération X** — *Concentration · Prérequis Rang 2 · Attribut : RES · Portée : Personnel*

La puissance divine afflue dans les plaies et les referme à vue d'œil.

- **Rang 0 :** sensation de chaleur curative — la douleur diminue légèrement (narratif, 0 PV)
- **Rang 1 :** non applicable (prérequis Rang 2 — rang minimum de lancement : 2)
- **Rang 2 :** récupère `max(Marge, Intensité)` PV par tour tant que la concentration est maintenue *(min PJ)*
- **Rang 3 :** récupère `2 × max(Marge, Intensité)` PV par tour *(max PJ)*
- **Rang 4 :** récupère `3 × max(Marge, Intensité)` PV par tour ; peut viser un allié à portée Toucher
- **Rang 5 :** récupère `4 × max(Marge, Intensité)` PV par tour ; peut régénérer des membres perdus
- **Rang 6 :** récupère `5 × max(Marge, Intensité)` PV par tour ; régénération quasi-instantanée visible à l'œil nu

---

**Forme Éthérée X** — *Concentration · Prérequis Rang 2 · Attribut : PUI · Portée : Personnel*

Le corps devient partiellement ou totalement intangible — la matière solide n'est plus qu'une suggestion.

- **Rang 0 :** légère translucidité visible dans l'obscurité (cosmétique)
- **Rang 1 :** non applicable (prérequis Rang 2 — rang minimum de lancement : 2)
- **Rang 2 :** intangible — peut traverser les obstacles solides ; ne peut ni attaquer ni être attaqué physiquement *(min PJ)*
- **Rang 3 :** intangible + invisibilité partielle (désavantage pour être vu ou ciblé) *(max PJ)*
- **Rang 4 :** intangible + invisible aux sens normaux ; peut interagir avec des objets éthérés
- **Rang 5 :** complètement éthéré — invisible aux sens surnaturels aussi
- **Rang 6 :** maîtrise totale — peut choisir d'être tangible ou intangible à tout moment, action gratuite

---

**Sanctuaire X** — *Scène entière · Prérequis Rang 3 · Attribut : RES · Portée : Rayon 3m × Rang*

Un espace consacré ou maudit où les créatures hostiles trouvent chaque geste ralenti, chaque intention contrecarrée.

- **Rang 0 :** espace légèrement chargé — les humains se sentent mal à l'aise sans savoir pourquoi (narratif)
- **Rang 1–2 :** non applicable (prérequis Rang 3 — rang minimum de lancement : 3)
- **Rang 3 :** rayon 9m ; les créatures hostiles ont un désavantage permanent ; les alliés gagnent +1 en RES *(max PJ)*
- **Rang 4 :** rayon 12m ; désavantage doublé pour les créatures hostiles
- **Rang 5 :** rayon 15m ; les créatures hostiles de Rang ≤3 ne peuvent entrer sans jet VOL réussi
- **Rang 6 :** rayon 18m ; zone infranchissable pour les créatures de Rang ≤4 sans jet VOL à désavantage

*Trapping Ange : cercle de lumière bénie. Trapping Démon : territoire maudit et fumant.*

---

### Actifs — Soutien

---

**Lumière / Ténèbres X** — *Scène entière · Prérequis Rang 0 · Attribut : CLA · Portée : Rayon variable*

Le pouvoir le plus fondamental : illuminer ou plonger dans l'obscurité.

- **Rang 0 :** lumière/obscurité dans un rayon de 5m (comme une torche ou l'absence totale de lumière)
- **Rang 1 :** rayon 10m ; la lumière peut aveugler brièvement sur un résultat critique (1 tour)
- **Rang 2 :** rayon 20m ; lumière ciblée (n'affecte que certaines créatures au choix) ou ténèbres totales ignorant les lanternes
- **Rang 3 :** rayon 30m ; les créatures d'alignement opposé subissent 1 dégât par tour dans la zone *(max PJ)*
- **Rang 4 :** rayon 60m ; la lumière brûle les créatures photo-sensibles ou les ténèbres suffoquent
- **Rang 5 :** rayon 150m ; visible depuis l'orbite ou obscurité totale sur un quartier
- **Rang 6 :** rayon 500m ; phare divin ou vide total — les humains à l'intérieur sont désorientés définitivement jusqu'à dissipation

*Trapping Ange : lumière divine dorée. Trapping Démon : ténèbres dévorantes.*

---

**Dialogue Éthéré X** — *Scène entière · Prérequis Rang 0 · Attribut : CLA*

Communication avec ce qui n'appartient plus tout à fait au monde des vivants.

- **Rang 0 :** sent la présence d'âmes dans les Limbes proches (oui/non, aucune communication)
- **Rang 1 :** communique avec les âmes errantes dans les Limbes ; la communication est floue et symbolique
- **Rang 2 :** détecte automatiquement les âmes errantes dans 30m ; communication claire
- **Rang 3 :** peut forcer une âme à répondre (jet CLA vs VOL de l'âme) *(max PJ)*
- **Rang 4 :** peut voir à travers les yeux d'une âme errante
- **Rang 5 :** peut lier temporairement une âme à un objet ou lieu (scène entière)
- **Rang 6 :** contact direct avec les Limbes — ouvre brièvement une fenêtre sur l'au-delà visible de tous

---

**Vision Nocturne X** — *Scène entière · Prérequis Rang 1 · Attribut : CLA · Portée : Personnel*

Les yeux voient dans l'obscurité totale, puis au-delà.

- **Rang 0 :** vision légèrement améliorée dans la pénombre (avantage dans dim light uniquement)
- **Rang 1 :** ignore toutes les pénalités d'obscurité naturelle
- **Rang 2 :** ignore l'obscurité même magique ; voit les créatures invisibles comme des silhouettes floues
- **Rang 3 :** voit l'invisible clairement ; perce les illusions (jet CLA vs INF du créateur) *(max PJ)*
- **Rang 4 :** voit à travers les obstacles minces (murs de plâtre, tissu) ; perçoit les auras d'énergie
- **Rang 5 :** voit à travers n'importe quelle matière jusqu'à 1m d'épaisseur
- **Rang 6 :** vision omnidirectionnelle dans un rayon de 20m ; impossible d'être surpris

*Trapping Ange : yeux lumineux dorés. Trapping Démon : yeux rouges brillants.*

---

**Soins X** — *Instantané · Prérequis Rang 1 · Attribut : CLA · Portée : Toucher*

Les mains qui bénissent... ou qui corrompent. Les premiers soignent ; les seconds se soignent eux-mêmes en empruntant la vitalité d'autrui.

- **Rang 0 :** soulage la douleur et stoppe les saignements (narratif ; aucun PV mécanique rendu)
- **Rang 1 :** soigne `max(Marge, Intensité)` PV
- **Rang 2 :** soigne `2 × max(Marge, Intensité)` PV ; supprime les états mineurs (Ébranlé, Ralenti)
- **Rang 3 :** soigne `3 × max(Marge, Intensité)` PV ; supprime 1 état négatif non-permanent *(max PJ)*
- **Rang 4 :** soigne `4 × max(Marge, Intensité)` PV ; soigne à distance (portée 5m)
- **Rang 5 :** soigne `5 × max(Marge, Intensité)` PV ; supprime tous les états négatifs ; peut soigner une blessure aggravée
- **Rang 6 :** soigne `6 × max(Marge, Intensité)` PV ; régénération complète d'un membre ou organe

*Trapping Démon : le Drain de Vie utilise ce même pouvoir mais inverse le transfert — la cible perd les PV que le démon gagne.*

---

**Vol X** — *Durée fixe · Prérequis Rang 1 · Attribut : PUI · Portée : Personnel*

Les ailes apparaissent — de lumière, membraneuses, ou purement psychokinétiques selon la nature de l'être.

- **Rang 0 :** lévitation à 30cm du sol ; déplacement horizontal impossible, mais le personnage ne tombe pas
- **Rang 1 :** vol à vitesse réduite (vitesse/2) et stationnaire
- **Rang 2 :** vol à vitesse normale ; peut porter une personne consentante
- **Rang 3 :** vol à vitesse ×2 ; manœuvres complexes possibles *(max PJ)*
- **Rang 4 :** vol à vitesse ×3 ; peut effectuer des piqués dévastateurs (+rang aux dégâts)
- **Rang 5 :** vol à vitesse ×4 ; peut quitter l'atmosphère brièvement
- **Rang 6 :** vol supersonique ; peut traverser les plans si un portail existe

*Trapping Ange : ailes de lumière. Trapping Démon : ailes membraneuses ou propulsion par les ténèbres.*

---

**Illusion X** — *Concentration ou Durée fixe (3 tours) · Prérequis Rang 1 · Attribut : INF · Portée : 30m*

Pourquoi mentir quand on peut faire voir ce qui n'existe pas ?

- **Rang 0 :** image fixe et silencieuse de la taille d'une main (aucune interaction possible)
- **Rang 1 :** illusion visuelle immobile, taille humaine maximum ; inanimée et silencieuse
- **Rang 2 :** illusion visuelle et sonore, mobile ; jet CLA vs INF pour percer l'illusion au toucher
- **Rang 3 :** illusion complète (tous les sens) ou taille bâtiment ; jet CLA vs INF pour percer *(max PJ)*
- **Rang 4 :** illusion tangible limitée (peut interagir superficiellement, fait 1 dégât au toucher)
- **Rang 5 :** illusion parfaite — résiste aux sens surnaturels ; jet CLA à double désavantage pour percer
- **Rang 6 :** illusion permanente sans concentration ; peut modifier la réalité perçue d'une scène entière

*Trapping Ange : mirages paradisiaques. Trapping Démon : visions infernales.*

---

**Invisibilité X** — *Concentration · Prérequis Rang 2 · Attribut : INF · Portée : Personnel*

La lumière contourne le corps — ou les ombres l'avalent.

- **Rang 0 :** légère distorsion dans l'air (silhouette visible en regardant attentivement)
- **Rang 1 :** non applicable (prérequis Rang 2 — rang minimum de lancement : 2)
- **Rang 2 :** invisible aux sens normaux ; avantage en Discrétion ; les ennemis ont un désavantage pour cibler *(min PJ)*
- **Rang 3 :** résiste aux détections magiques et surnaturelles légères (jet CLA vs INF) *(max PJ)*
- **Rang 4 :** invisible même aux Sens Surnaturels de niveau ≤3
- **Rang 5 :** invisibilité parfaite — seul Dieu ou une entité équivalente peut détecter le lanceur
- **Rang 6 :** disparition totale de la réalité perceptible ; même les effets de zone ne le touchent pas (le lanceur est techniquement ailleurs)

*Trapping Ange : fusion avec la lumière. Trapping Démon : fusion avec les ombres.*

---

**Télékinésie X** — *Concentration · Prérequis Rang 2 · Attribut : PUI · Portée : 20m*

La volonté de l'âme s'exerce sur la matière sans intermédiaire corporel.

- **Rang 0 :** déplace un objet léger (< 1kg) lentement (1m/tour) — ouvre une porte, ramasse un verre
- **Rang 1 :** non applicable (prérequis Rang 2 — rang minimum de lancement : 2)
- **Rang 2 :** déplace des objets avec FOR = INF du lanceur ; peut tenir une personne immobile (jet FOR vs PUI) *(min PJ)*
- **Rang 3 :** peut lancer des objets comme projectiles (`max(Marge, Intensité) × 2` dégâts) *(max PJ)*
- **Rang 4 :** déplace plusieurs objets simultanément ; peut saisir et retenir des créatures célestes de Rang ≤2
- **Rang 5 :** FOR télékinétique = INF ×2 ; peut retourner des véhicules
- **Rang 6 :** maîtrise structurelle — peut effondrer des murs, modifier l'architecture d'un bâtiment

*Trapping Ange : main divine invisible. Trapping Démon : griffes spectrales.*

---

**Augmentation / Diminution X** — *Durée fixe · Prérequis Rang 1 · Attribut : INF · Portée : Toucher*

Un souffle de grâce divine ou une malédiction affaiblissante altère temporairement les capacités d'une créature.

- **Rang 0 :** sentiment vague de confiance ou de malaise (narratif ; aucun bonus/malus mécanique)
- **Rang 1 :** +1 ou −1 à une caractéristique ou compétence pendant 3 tours
- **Rang 2 :** +2 ou −2 ; peut affecter deux attributs différents sur la même cible
- **Rang 3 :** +3 ou −3 ; portée étendue à 5m *(max PJ)*
- **Rang 4 :** +4 ou −4 ; peut affecter jusqu'à 3 cibles
- **Rang 5 :** +5 ou −5 ; l'effet dure la scène entière
- **Rang 6 :** +6 ou −6 ; peut pousser un attribut à 0 (créature incapacitée) ou à 6 (performance surhumaine)

*Trapping Ange : bénédiction lumineuse. Trapping Démon : malédiction affaiblissante.*

---

**Sommeil X** — *Instantané · Prérequis Rang 2 · Attribut : INF · Portée : 20m*

Un berceuse céleste ou des vapeurs soporifiques plongent la cible dans un sommeil contre sa volonté.

- **Rang 0 :** la cible bâille irrésistiblement et semble légèrement ensommeillée (−1 à l'initiative, narratif)
- **Rang 1 :** non applicable (prérequis Rang 2 — rang minimum de lancement : 2)
- **Rang 2 :** endort les créatures de Rang Céleste ≤2 (jet RES vs INF pour résister) *(min PJ)*
- **Rang 3 :** affecte les créatures de Rang 3 ; sommeil profond — difficile à réveiller (jet FOR seuil 5) *(max PJ)*
- **Rang 4 :** zone de 5m de rayon ; toutes les créatures de Rang ≤3 doivent résister
- **Rang 5 :** zone 10m ; affecte les créatures de Rang ≤4 ; le sommeil dure la scène
- **Rang 6 :** zone 20m ; sommeil de plomb — ne se réveille pas sans dissipation active ou soins de Rang 4+

*Trapping Ange : berceuse céleste. Trapping Démon : vapeurs soporifiques.*

---

**Contrôle Mental X** — *Concentration · Prérequis Rang 2 · Attribut : INF · Portée : Voix*

La volonté du lanceur s'impose à celle d'autrui — les corps obéissent pendant que les esprits hurlent.

- **Rang 0 :** suggestion légère — la cible est vaguement encline à ce que vous proposez (avantage sur le prochain jet social, narratif)
- **Rang 1 :** non applicable (prérequis Rang 2 — rang minimum de lancement : 2)
- **Rang 2 :** contrôle 1 humain (jet INF vs VOL) ; le contrôleur partage ses PA entre lui et la cible *(min PJ)*
- **Rang 3 :** contrôle 2 humains OU 1 créature surnaturelle mineure (Rang ≤1) *(max PJ)*
- **Rang 4 :** contrôle jusqu'à 3 humains OU 1 créature de Rang ≤2
- **Rang 5 :** contrôle 1 créature de Rang ≤3 ; les ordres complexes sont exécutés sans résistance
- **Rang 6 :** contrôle absolu ; la cible ne conserve aucun souvenir de la période de contrôle

---

**Altération Mémorielle X** — *Permanent · Prérequis Rang 2 · Attribut : INF · Portée : Toucher*

Ce qui n'est pas su n'a jamais existé.

- **Rang 0 :** la cible est légèrement confuse sur les dernières minutes (narratif ; aucun souvenir effacé)
- **Rang 1 :** non applicable (prérequis Rang 2 — rang minimum de lancement : 2)
- **Rang 2 :** efface ou modifie jusqu'à 1 heure de souvenirs (jet INF vs RES pour résister) *(min PJ)*
- **Rang 3 :** efface jusqu'à 24h ; peut implanter un faux souvenir simple *(max PJ)*
- **Rang 4 :** efface des semaines ; les faux souvenirs implantés sont cohérents et détaillés
- **Rang 5 :** efface des années ; l'identité de la cible peut être remodelée
- **Rang 6 :** réécriture complète de la mémoire — la cible croit sincèrement à sa nouvelle histoire ; seule une dissipation de Rang 5+ peut révéler la manipulation

---

**Dissipation X** — *Instantané · Prérequis Rang 2 · Attribut : CLA · Portée : 30m*

Un pouvoir actif s'effondre sous la pression d'une volonté contraire suffisamment puissante.

- **Rang 0 :** détecte les pouvoirs actifs sur une cible ou dans une zone (aucune dissipation)
- **Rang 1 :** non applicable (prérequis Rang 2 — rang minimum de lancement : 2)
- **Rang 2 :** annule 1 pouvoir de Rang ≤2 (jet CLA vs INF du lanceur cible) *(min PJ)*
- **Rang 3 :** annule 1 pouvoir de Rang ≤3 OU tous les pouvoirs de Rang ≤1 sur une cible *(max PJ)*
- **Rang 4 :** annule tous les pouvoirs de Rang ≤3 sur une cible
- **Rang 5 :** zone de dissipation 5m — tous les pouvoirs actifs dans la zone s'effondrent
- **Rang 6 :** dissipation massive — tous les pouvoirs dans une zone de 15m ; les pouvoirs passifs sont supprimés pendant 1 tour

*Trapping Ange : purification divine. Trapping Démon : corruption dévorante.*

---

**Barrière X** — *Durée fixe · Prérequis Rang 3 · Attribut : PUI · Portée : 5m*

Un mur de lumière solide, d'os et de chair, ou d'énergie compressée bloque le passage.

- **Rang 0 :** ligne d'énergie visible mais intangible — avertissement visuel sans effet physique
- **Rang 1–2 :** non applicable (prérequis Rang 3 — rang minimum de lancement : 3)
- **Rang 3 :** mur de 2m de large × 2m de haut ; 10 PV, 4 PA *(max PJ)*
- **Rang 4 :** mur de 4m × 3m ; 15 PV, 6 PA
- **Rang 5 :** mur de 8m × 4m ; 25 PV, 8 PA ; émet chaleur/froid au toucher (1 dégât)
- **Rang 6 :** mur de 20m × 6m ; 40 PV, 10 PA ; infranchissable même par les créatures éthérées

*Trapping Ange : mur de lumière solide. Trapping Démon : mur d'os et de chair.*

---

**Bannissement X** — *Instantané · Prérequis Rang 3 · Attribut : PUI · Portée : 20m*

La créature hors de son plan est expulsée et renvoyée d'où elle vient.

- **Rang 0 :** perçoit si une créature est originaire d'un autre plan (oui/non)
- **Rang 1–2 :** non applicable (prérequis Rang 3 — rang minimum de lancement : 3)
- **Rang 3 :** renvoie une créature de Rang ≤3 dans son plan d'origine (jet PUI vs RES) *(max PJ)*
- **Rang 4 :** bannit les créatures de Rang ≤4 ; la créature ne peut revenir pendant 24h
- **Rang 5 :** bannit les créatures de Rang ≤5 ; interdiction de retour pendant 1 semaine
- **Rang 6 :** bannissement absolu — la créature est renvoyée et scellée hors de ce plan pendant 1 an

*Trapping Ange : exorcisme sacré. Trapping Démon : portail de bannissement forcé.*

---

**Téléportation X** — *Instantané · Prérequis Rang 3 · Attribut : PUI · Portée : Variable*

Pourquoi marcher quand on peut apparaître dramatiquement ?

- **Rang 0 :** blink de 50cm — clignote et réapparaît juste à côté (cosmétique)
- **Rang 1–2 :** non applicable (prérequis Rang 3 — rang minimum de lancement : 3)
- **Rang 3 :** téléportation jusqu'à 100m (lieu visible) ou 10km (lieu connu) ; peut emmener 1 personne consentante *(max PJ)*
- **Rang 4 :** jusqu'à 100km ; peut emmener 2 personnes consentantes
- **Rang 5 :** n'importe où sur Terre (lieu connu) ; peut emmener jusqu'à 4 personnes
- **Rang 6 :** téléportation interplanaire — peut rejoindre les plans adjacents (Paradis, Enfer, Limbes) ; risque narratif important

*Trapping Ange : éclair de lumière. Trapping Démon : passage par les ombres.*

---

**Divination X** — *Instantané · Prérequis Rang 3 · Attribut : CLA*

Le futur proche murmure à qui sait écouter — la réponse est vraie mais jamais simple.

- **Rang 0 :** pressentiment vague — quelque chose va se passer (oui/non, aucune précision)
- **Rang 1–2 :** non applicable (prérequis Rang 3 — rang minimum de lancement : 3)
- **Rang 3 :** pose 1 question sur les 24h à venir ; réponse cryptique mais vraie (MJ) *(max PJ)*
- **Rang 4 :** pose 2 questions ; les réponses sont plus directes
- **Rang 5 :** pose 3 questions ; horizon temporel étendu à 1 semaine
- **Rang 6 :** vision complète d'un événement futur sur 1 mois ; les réponses sont claires — ce qui est parfois pire

*Trapping Ange : vision prophétique. Trapping Démon : lecture des entrailles.*

---

## Pouvoirs Angéliques

*Réservés aux anges et aux âmes en état de grâce.*

---

### Passifs

---

**Aura de Sainteté X** — *Passif permanent · Prérequis Rang 2*

La présence de l'ange apaise les alliés et dérange les démons.

- **Niveau 2 :** +1 aux jets contre les créatures du Mal ; les démons dans un rayon de 2m ont un léger désavantage *(min PJ)*
- **Niveau 3 :** +2 aux jets contre les créatures du Mal ; aura de 2m où les démons subissent un désavantage *(max PJ)*
- **Niveau 4 :** +3 aux jets ; aura de 5m ; les humains dans l'aura récupèrent 1 PV par scène
- **Niveau 5 :** +4 aux jets ; aura de 10m ; les démons dans l'aura subissent 1 dégât non-réductible par tour
- **Niveau 6 :** +5 aux jets ; aura de 20m ; les créatures du Mal de Rang ≤3 ne peuvent entrer sans résistance

---

**Détection du Mal X** — *Passif permanent · Prérequis Rang 1*

Le mal a une odeur... de soufre et de regrets.

- **Niveau 1 :** détecte automatiquement les créatures du Mal dans un rayon de 10m
- **Niveau 2 :** portée 20m ; indique la direction et l'intensité du mal (Rang Céleste approximatif)
- **Niveau 3 :** portée 40m ; identifie la nature du mal (démon, humain corrompu, objet maudit) *(max PJ)*
- **Niveau 4 :** portée 100m ; perçoit les péchés récents d'un humain au contact
- **Niveau 5 :** portée 500m ; détecte même les créatures du Mal déguisées ou occultées
- **Niveau 6 :** portée 1km ; détecte les actions malveillantes planifiées avant qu'elles ne se produisent

---

**Inspiration Divine X** — *Passif permanent · Prérequis Rang 1*

La grâce de l'ange rejaillit sur ses compagnons.

- **Niveau 1 :** peut donner 1 fois par scène un avantage à un allié (action gratuite)
- **Niveau 2 :** 2 fois par scène
- **Niveau 3 :** 3 fois par scène ; peut aussi annuler un désavantage *(max PJ)*
- **Niveau 4 :** 4 fois par scène ; l'avantage donné devient double avantage
- **Niveau 5 :** 5 fois par scène ; peut être donné en réaction (hors de son tour)
- **Niveau 6 :** illimité par scène ; l'inspiration de l'ange s'étend à tous les alliés dans 10m

---

### Actifs — Offensifs

---

**Feu Purificateur X** — *Instantané · Prérequis Rang 2 · Attribut : PUI · Portée : Cône 10m*

Un souffle de flammes sacrées qui purifie le mal — avec un enthousiasme regrettable pour tout le reste aussi.

- **Rang 0 :** chaleur divine légère — les créatures du Mal dans le cône se sentent mal à l'aise (narratif)
- **Rang 1 :** non applicable (prérequis Rang 2 — rang minimum de lancement : 2)
- **Rang 2 :** `2 × max(Marge, Intensité)` dégâts dans le cône ; le dé d'intensité est explosif contre les créatures du Mal *(min PJ)*
- **Rang 3 :** `3 × max(Marge, Intensité)` dégâts ; cône étendu à 15m *(max PJ)*
- **Rang 4 :** `4 × max(Marge, Intensité)` dégâts ; les créatures du Mal sont Aveuglées 1 tour si elles ratent un jet RES
- **Rang 5 :** `5 × max(Marge, Intensité)` dégâts ; les morts-vivants subissent des dégâts doublés
- **Rang 6 :** `6 × max(Marge, Intensité)` dégâts ; cône 25m ; les créatures du Mal de Rang ≤4 doivent fuir

---

**Épée de Lumière X** — *Durée fixe · Prérequis Rang 2 · Attribut : PUI · Portée : Personnel*

Une arme de lumière pure se matérialise — elle tranche les protections des créatures du Mal.

- **Rang 0 :** lueur de lumière dans la paume (éclairage ; peut servir à impressionner)
- **Rang 1 :** non applicable (prérequis Rang 2 — rang minimum de lancement : 2)
- **Rang 2 :** arme lumineuse : +3 dégâts ; considérée Sacrée (réduit la Résilience des créatures du Mal de 1) *(min PJ)*
- **Rang 3 :** +4 dégâts ; ignore 2 PA contre les créatures du Mal ; les blessures infligées sont aggravées pour les démons *(max PJ)*
- **Rang 4 :** +5 dégâts ; porte se double ; l'arme revient dans la main si projetée
- **Rang 5 :** +6 dégâts ; peut être projetée (portée 20m) et revient automatiquement
- **Rang 6 :** +7 dégâts ; l'arme ignore toutes les défenses des créatures du Mal ; dégâts non-réductibles

---

**Colère Divine X** — *Instantané · Prérequis Rang 3 · Attribut : PUI · Portée : Ligne 20m*

Un rayon de lumière pure qui fend l'obscurité et tout ce qui se trouve sur son chemin.

- **Rang 0 :** trait de lumière décoratif, inoffensif (mais très impressionnant)
- **Rang 1–2 :** non applicable (prérequis Rang 3 — rang minimum de lancement : 3)
- **Rang 3 :** `3 × max(Marge, Intensité)` dégâts sur toutes les cibles dans la ligne ; traverse les obstacles non-magiques ; dégâts doublés contre les morts-vivants *(max PJ)*
- **Rang 4 :** `4 × max(Marge, Intensité)` dégâts ; ligne étendue à 30m
- **Rang 5 :** `5 × max(Marge, Intensité)` dégâts ; la ligne peut être courbée
- **Rang 6 :** `6 × max(Marge, Intensité)` dégâts ; toutes les créatures du Mal dans la ligne sont bannies si elles échouent un jet RES

---

**Jugement X** — *Instantané · Prérequis Rang 2 · Attribut : INF · Portée : 30m*

La cible est révélée à elle-même et aux autres — ses péchés écrits dans la lumière pour tous à voir.

- **Rang 0 :** regard pesant — la cible se sent légèrement coupable (narratif)
- **Rang 1 :** non applicable (prérequis Rang 2 — rang minimum de lancement : 2)
- **Rang 2 :** la cible révèle involontairement son péché le plus récent (visible de tous présents) ; jet VOL vs INF pour résister *(min PJ)*
- **Rang 3 :** révèle tous les péchés majeurs ; paralysie 1 tour si jet VOL raté *(max PJ)*
- **Rang 4 :** +2 dégâts par péché majeur révélé ; la cible ne peut mentir pendant 1 scène
- **Rang 5 :** révèle les péchés futurs (intentions) ; paralysie dure 3 tours
- **Rang 6 :** jugement définitif — la cible est marquée visiblement par ses péchés pendant une semaine (impossible de se dissimuler dans la société)

---

### Actifs — Défensifs

---

**Protection Divine X** — *Durée fixe · Prérequis Rang 1 · Attribut : RES · Portée : Toucher*

La cible est enveloppée d'une grâce protectrice spécifiquement tournée contre les attaques démoniaques.

- **Rang 0 :** légère réassurance divine (cosmétique ; aucun effet mécanique)
- **Rang 1 :** +1 PA contre les attaques des créatures du Mal uniquement
- **Rang 2 :** +2 PA contre le Mal ; les effets d'états infligés par des démons durent 1 tour de moins
- **Rang 3 :** +3 PA contre le Mal ; immunité aux effets de possession *(max PJ)*
- **Rang 4 :** +4 PA contre le Mal ; peut être appliqué à distance (portée 10m)
- **Rang 5 :** +5 PA contre le Mal ; s'étend à tous les alliés dans un rayon de 3m
- **Rang 6 :** +6 PA contre le Mal ; toute attaque démoniaque qui rate de 3+ se retourne contre son auteur

---

**Cercle de Protection X** — *Scène entière · Prérequis Rang 2 · Attribut : RES · Portée : Rayon 2m × Rang*

Un cercle tracé dans la lumière — les créatures du Mal ne peuvent y entrer librement.

- **Rang 0 :** cercle visible mais franchissable ; les créatures du Mal le perçoivent comme désagréable
- **Rang 1 :** non applicable (prérequis Rang 2 — rang minimum de lancement : 2)
- **Rang 2 :** rayon 4m ; les créatures du Mal ne peuvent entrer sans jet VOL réussi *(min PJ)*
- **Rang 3 :** rayon 6m ; inflige 1 dégât non-réductible par tour aux démons à l'intérieur *(max PJ)*
- **Rang 4 :** rayon 8m ; les jets VOL pour entrer se font à désavantage
- **Rang 5 :** rayon 10m ; même les créatures du Mal de Rang 4 doivent résister
- **Rang 6 :** rayon 15m ; infranchissable pour les créatures du Mal de Rang ≤5 ; les tentatives infligent 3 dégâts non-réductibles

---

### Actifs — Soutien

---

**Bénédiction X** — *Durée fixe · Prérequis Rang 1 · Attribut : INF · Portée : Toucher*

La grâce divine rejaillit sur ceux que l'ange choisit de bénir.

- **Rang 0 :** sentiment de bien-être fugace — la cible se sent encouragée (narratif)
- **Rang 1 :** la cible gagne un avantage sur 1 type de jet au choix pendant 3 tours
- **Rang 2 :** avantage sur 2 types de jets ; peut viser 2 cibles
- **Rang 3 :** avantage sur 3 types de jets ; peut viser 3 cibles *(max PJ)*
- **Rang 4 :** double avantage sur 1 type de jet ; la durée passe à la scène entière
- **Rang 5 :** la bénédiction s'étend à un groupe entier (5m de rayon) ; dure 1 heure
- **Rang 6 :** bénédiction permanente jusqu'à dissipation ; protège contre la prochaine attaque critique (annulée)

---

**Purification X** — *Instantané · Prérequis Rang 2 · Attribut : CLA · Portée : Toucher*

Les malédictions, maladies et corruptions se dissolvent sous la lumière divine.

- **Rang 0 :** soulage légèrement les symptômes d'une maladie ou d'un empoisonnement (narratif, aucun effet mécanique)
- **Rang 1 :** non applicable (prérequis Rang 2 — rang minimum de lancement : 2)
- **Rang 2 :** supprime 1 malédiction ou maladie (non-permanente) *(min PJ)*
- **Rang 3 :** supprime tous les effets négatifs non-permanents sur la cible *(max PJ)*
- **Rang 4 :** peut dissoudre des malédictions permanentes (jet CLA vs INF du lanceur de la malédiction)
- **Rang 5 :** purifie un objet maudit ; cleanse les corruptions d'âme légères
- **Rang 6 :** purification totale — renverse même les corruptions profondes de l'âme ; les démons exorcisés d'un hôte

---

**Révélation X** — *Instantané · Prérequis Rang 1 · Attribut : CLA · Portée : Vue*

La vérité se montre à qui sait regarder.

- **Rang 0 :** pressentiment — quelque chose n'est pas ce qu'il semble (oui/non, aucune précision)
- **Rang 1 :** révèle les illusions et les déguisements actifs (jet CLA vs INF du créateur)
- **Rang 2 :** révèle la vraie nature des créatures (ange, démon, humain, etc.)
- **Rang 3 :** prédit les intentions immédiates de la cible (prochain tour) *(max PJ)*
- **Rang 4 :** lit les auras — voit les pouvoirs passifs actifs, l'alignement et la santé
- **Rang 5 :** révèle les mensonges en temps réel (désavantage automatique sur toute tromperie contre l'ange)
- **Rang 6 :** vision de la Vérité — perçoit la réalité telle qu'elle est, sans filtres ni illusions ; ne peut être trompé ce tour-ci

---

**Résurrection X** — *Instantané (rituel 10 minutes) · Prérequis Rang 3 · Attribut : CLA · Portée : Toucher*

Ramener un mort n'est pas une décision à prendre à la légère. L'âme doit accepter de revenir.

- **Rang 0 :** perçoit si une âme proche est encore liée à son corps (mort récente, oui/non)
- **Rang 1–2 :** non applicable (prérequis Rang 3 — rang minimum de lancement : 3)
- **Rang 3 :** ramène un mort de moins de 3 jours ; revient avec 1 PV et l'état Épuisé niv.2 ; l'âme doit accepter *(max PJ)*
- **Rang 4 :** jusqu'à 1 semaine ; revient avec `max(Marge, Intensité)` PV
- **Rang 5 :** jusqu'à 1 mois ; revient en pleine santé (sauf blessures aggravées préexistantes)
- **Rang 6 :** jusqu'à 1 an ; peut ressusciter sans le consentement de l'âme ; blessures aggravées également guéries

---

## Pouvoirs Démoniaques

*Réservés aux démons et aux âmes corrompues.*

---

### Passifs

---

**Aura de Corruption X** — *Passif permanent · Prérequis Rang 2*

La présence du démon trouble les humains et dérange les anges proches.

- **Niveau 2 :** +1 aux jets de manipulation et corruption ; les anges dans 2m subissent un léger malaise *(min PJ)*
- **Niveau 3 :** +2 aux jets ; aura de 2m où les anges ont un désavantage *(max PJ)*
- **Niveau 4 :** +3 aux jets ; aura de 5m ; les humains dans l'aura ont tendance à dire la vérité (ironie)
- **Niveau 5 :** +4 aux jets ; aura de 10m ; les anges de Rang ≤3 subissent 1 dégât non-réductible par tour
- **Niveau 6 :** +5 aux jets ; aura de 20m ; les humains dans l'aura sont légèrement corrompus après 1 scène complète

---

**Résistance à la Foi X** — *Passif permanent · Prérequis Rang 1*

Les siècles passés à côtoyer le divin ont au moins servi à apprendre à s'en protéger.

- **Niveau 1 :** réduit les effets des pouvoirs angéliques de 1 (dégâts, durée des états)
- **Niveau 2 :** réduit de 2 ; avantage sur les jets de résistance contre les pouvoirs angéliques
- **Niveau 3 :** réduit de 3 ; immunité à la Détection du Mal *(max PJ)*
- **Niveau 4 :** réduit de 4 ; les pouvoirs angéliques de Rang ≤2 n'ont aucun effet
- **Niveau 5 :** réduit de 5 ; les Cercles de Protection ne bloquent pas le démon
- **Niveau 6 :** immunité totale aux effets des pouvoirs angéliques de Rang ≤4

---

**Pacte de Sang X** — *Passif permanent · Prérequis Rang 2*

Tuer est une transaction. Le sang versé nourrit l'âme démoniaque.

- **Niveau 2 :** récupère 2 PV en tuant une créature vivante *(min PJ)*
- **Niveau 3 :** récupère 3 PV et 1 PE en tuant une créature vivante *(max PJ)*
- **Niveau 4 :** récupère 4 PV et 1 PE ; peut activer sur un mort récent (< 1 tour)
- **Niveau 5 :** récupère 5 PV et 2 PE ; le meurtre efface également 1 affaiblissement d'âme
- **Niveau 6 :** récupère 6 PV et 2 PE ; peut déclencher sur une créature réduite à 0 PV sans achèvement

---

### Actifs — Offensifs

---

**Flammes Infernales X** — *Instantané · Prérequis Rang 2 · Attribut : PUI · Portée : Cône 10m*

Feu infernal — brûle tout, s'attarde sur les créatures du Bien.

- **Rang 0 :** chaleur sinistre — les créatures du Bien dans le cône se sentent immédiatement en danger (narratif)
- **Rang 1 :** non applicable (prérequis Rang 2 — rang minimum de lancement : 2)
- **Rang 2 :** `2 × max(Marge, Intensité)` dégâts de feu ; met en feu les matériaux inflammables ; dé explosif contre les créatures du Bien *(min PJ)*
- **Rang 3 :** `3 × max(Marge, Intensité)` dégâts ; les cibles brûlent (2 dégâts/tour pendant 3 tours) *(max PJ)*
- **Rang 4 :** `4 × max(Marge, Intensité)` dégâts ; cône étendu à 15m ; les anges subissent des dégâts doublés
- **Rang 5 :** `5 × max(Marge, Intensité)` dégâts ; le feu infernal brûle même sous l'eau
- **Rang 6 :** `6 × max(Marge, Intensité)` dégâts ; cône 25m ; les anges de Rang ≤4 doivent fuir

---

**Griffes d'Ombre X** — *Durée fixe · Prérequis Rang 1 · Attribut : PUI · Portée : Personnel*

Les mains se transforment en armes — griffes, lames d'ombre, crocs — taillées pour déchirer.

- **Rang 0 :** les mains noircissent légèrement ou semblent légèrement translucides (cosmétique)
- **Rang 1 :** griffes d'ombre : +2 dégâts aux attaques à mains nues
- **Rang 2 :** +3 dégâts ; les griffes traversent les armures légères (ignorent 1 PA)
- **Rang 3 :** +4 dégâts ; causent l'état **Empoisonné** sur un critique *(max PJ)*
- **Rang 4 :** +5 dégâts ; les griffes peuvent blesser les créatures intangibles
- **Rang 5 :** +6 dégâts ; les blessures infligées résistent aux soins (PV soignés réduits de moitié)
- **Rang 6 :** +7 dégâts ; toute créature touchée perd 1 PE en plus des dégâts normaux

---

**Drain de Vie X** — *Instantané · Prérequis Rang 2 · Attribut : PUI · Portée : Toucher*

La vitalité d'autrui devient la vôtre. Simple, efficace, répréhensible.

- **Rang 0 :** contact froid — la cible se sent légèrement fatiguée (narratif ; aucun PV volé)
- **Rang 1 :** non applicable (prérequis Rang 2 — rang minimum de lancement : 2)
- **Rang 2 :** vole `2 × max(Marge, Intensité)` PV à la cible ; récupère la moitié *(min PJ)*
- **Rang 3 :** vole `3 × max(Marge, Intensité)` PV ; récupère la moitié + vole 1 PE *(max PJ)*
- **Rang 4 :** vole `4 × max(Marge, Intensité)` PV ; récupère les 3/4 ; portée 5m (pas besoin de toucher)
- **Rang 5 :** vole `5 × max(Marge, Intensité)` PV et récupère tout ; la cible vieillit visuellement
- **Rang 6 :** vole `6 × max(Marge, Intensité)` PV et récupère tout ; peut tuer instantanément si la cible est déjà à moins de 5 PV

---

**Terreur X** — *Instantané · Prérequis Rang 1 · Attribut : INF · Portée : Regard 10m*

Le regard du démon porte quelque chose d'ancien et d'absolument pas rassurant.

- **Rang 0 :** regard pesant — la cible hésite, perd le fil de sa pensée (−1 à sa prochaine action, narratif)
- **Rang 1 :** cible effrayée 1 tour (état **Effrayé**, jet RES vs INF pour résister)
- **Rang 2 :** fuite ou paralysie au choix du démon ; 1 tour
- **Rang 3 :** affecte tous ceux qui regardent le démon dans un rayon de 5m *(max PJ)*
- **Rang 4 :** panique totale ; les cibles fuient pendant 3 tours minimum
- **Rang 5 :** terreur permanente jusqu'à sortie de vue ; les humains peuvent devenir traumatisés
- **Rang 6 :** terreur absolue — les cibles de Rang ≤4 tombent incapacitées (jet RES vs INF à double désavantage)

---

### Actifs — Défensifs

---

**Forme Démoniaque X** — *Durée fixe · Prérequis Rang 2 · Attribut : PUI · Portée : Personnel*

Le masque humain glisse. Ce qui se cache en dessous est considérablement moins sympathique.

- **Rang 0 :** traits légèrement distordus — les humains se sentent mal à l'aise (avantage en Intimidation, narratif)
- **Rang 1 :** non applicable (prérequis Rang 2 — rang minimum de lancement : 2)
- **Rang 2 :** +2 PUI, +2 INF, griffes (+2 dégâts) ; apparence monstrueuse (avantage en Intimidation) *(min PJ)*
- **Rang 3 :** +3 à tous les attributs ; vol ; récupère 1 PV/tour ; les humains doivent tester la terreur *(max PJ)*
- **Rang 4 :** +4 à tous les attributs ; régénération 2 PV/tour ; l'apparence est terrifiante (Terreur automatique Rang 2)
- **Rang 5 :** +5 à tous les attributs ; régénération 3 PV/tour ; immunité au feu
- **Rang 6 :** +6 à tous les attributs ; forme démoniaque suprême ; immunité au feu et aux dégâts normaux

---

**Armure d'Ombres X** — *Durée fixe · Prérequis Rang 1 · Attribut : RES · Portée : Personnel*

L'obscurité se coagule autour du corps — protection et camouflage simultanés.

- **Rang 0 :** légère distorsion d'ombres autour du corps (cosmétique)
- **Rang 1 :** +1 PA ; camouflage automatique dans l'obscurité (avantage en Discrétion) ; −1 PA contre la lumière divine
- **Rang 2 :** +2 PA ; avantage en Discrétion même en lumière faible
- **Rang 3 :** +3 PA ; invisibilité partielle dans l'obscurité (désavantage pour être ciblé) *(max PJ)*
- **Rang 4 :** +4 PA ; les ombres absorbent 1 dégât de lumière/feu par tour
- **Rang 5 :** +5 PA ; immunité aux effets d'aveuglement ; se déplace sans bruit
- **Rang 6 :** +6 PA ; disparaît dans les ombres au niveau conceptuel — impossible à cibler tant que la lumière est absente

---

**Peau de Fer X** — *Durée fixe · Prérequis Rang 2 · Attribut : RES · Portée : Personnel*

La chair durcit. Pas métaphoriquement.

- **Rang 0 :** peau légèrement plus froide et dure au toucher (cosmétique ; narratif)
- **Rang 1 :** non applicable (prérequis Rang 2 — rang minimum de lancement : 2)
- **Rang 2 :** +3 PA ; −1 AGI *(min PJ)*
- **Rang 3 :** +4 PA ; immunité aux coups critiques ; −1 AGI *(max PJ)*
- **Rang 4 :** +5 PA ; immunité aux critiques et aux blessures par balle/lame légère
- **Rang 5 :** +6 PA ; les attaques à mains nues contre le démon infligent 1 dégât réfléchi à l'attaquant
- **Rang 6 :** +7 PA ; immunité aux dégâts non-magiques ; se déplace toujours au ralenti (−2 AGI cumulatif)

---

### Actifs — Soutien

---

**Malédiction X** — *Permanent · Prérequis Rang 2 · Attribut : INF · Portée : Voix 30m*

Les mots ont du poids quand c'est un démon qui les prononce.

- **Rang 0 :** murmure qui crée une sensation de malchance (narratif ; aucun effet mécanique)
- **Rang 1 :** non applicable (prérequis Rang 2 — rang minimum de lancement : 2)
- **Rang 2 :** la cible a un désavantage sur 1 type de jets choisi par le démon ; jet RES vs INF pour résister *(min PJ)*
- **Rang 3 :** désavantage sur 2 types de jets ; la malédiction est contagieuse par le toucher *(max PJ)*
- **Rang 4 :** désavantage sur 3 types ; la dissipation nécessite une Purification de Rang ≥3
- **Rang 5 :** la cible subit 1 malchance par scène (le MJ choisit le pire moment pour que quelque chose tourne mal)
- **Rang 6 :** malédiction totale — désavantage sur tous les jets ; ne peut être dissipée que par un ange de Rang ≥4

---

**Corruption de l'Âme X** — *Permanent · Prérequis Rang 2 · Attribut : INF · Portée : Toucher*

Planter une graine. La laisser pousser. Revenir voir le résultat quelques semaines plus tard.

- **Rang 0 :** contact qui laisse une légère tentation (le MJ peut noter un penchant narratif)
- **Rang 1 :** non applicable (prérequis Rang 2 — rang minimum de lancement : 2)
- **Rang 2 :** implante un vice ou une obsession mineure dans l'âme (jet INF vs VOL) *(min PJ)*
- **Rang 3 :** le désir mineur devient une obsession qui influence les décisions *(max PJ)*
- **Rang 4 :** l'obsession modifie progressivement le comportement sur plusieurs scènes
- **Rang 5 :** peut changer l'alignement moral d'un humain sur 1 semaine de jeu
- **Rang 6 :** corruption totale — l'âme humaine devient un outil du démon ; seul un rituel d'exorcisme de Rang 5+ peut inverser

---

**Possession X** — *Concentration · Prérequis Rang 3 · Attribut : PUI · Portée : 10m*

Le démon quitte son hôte et entre dans un autre corps. C'est invasif, inconfortable pour tout le monde, et parfaitement efficace.

- **Rang 0 :** effleure l'esprit de la cible — elle ressent brièvement la présence du démon (narratif, aucun effet)
- **Rang 1–2 :** non applicable (prérequis Rang 3 — rang minimum de lancement : 3)
- **Rang 3 :** contrôle total d'un humain (jet PUI vs VOL) ; le démon quitte son hôte et entre dans la cible ; si la concentration se brise, retour forcé à l'hôte original *(max PJ)*
- **Rang 4 :** peut posséder une créature surnaturelle de Rang ≤2
- **Rang 5 :** peut posséder à distance (portée 30m) ; l'hôte original reste mobile (géré par un autre joueur ou le MJ)
- **Rang 6 :** possession permanente sans concentration ; la cible perd progressivement sa personnalité

---

**Invocation Mineure X** — *Scène entière · Prérequis Rang 3 · Attribut : INF · Portée : 5m*

Des créatures mineures des enfers répondent à l'appel. Ils obéissent. C'est leur seule qualité.

- **Rang 0 :** un murmure infernal — les animaux proches se sentent mal à l'aise (désavantage sur les jets de comportement animal)
- **Rang 1–2 :** non applicable (prérequis Rang 3 — rang minimum de lancement : 3)
- **Rang 3 :** invoque 2 créatures mineures (imps, corbeaux démoniaques) — 2 PV, 1 PA, 1 attaque (+0, 1 dégât) *(max PJ)*
- **Rang 4 :** invoque 3 créatures ou 1 créature intermédiaire (5 PV, 2 PA, 2 attaques)
- **Rang 5 :** invoque une meute (5 mineures) ou 1 créature majeure (10 PV, 4 PA)
- **Rang 6 :** invoque un démon Rang 2 lié par un pacte (obéit pendant la scène ; peut négocier)

---

**Animation de Morts X** — *Scène entière · Prérequis Rang 3 · Attribut : PUI · Portée : Toucher*

Les morts n'ont pas à rester là où on les a mis.

- **Rang 0 :** perçoit si un cadavre est animable (mort récente, intégrité du corps)
- **Rang 1–2 :** non applicable (prérequis Rang 3 — rang minimum de lancement : 3)
- **Rang 3 :** anime 1 cadavre (3 PV, 2 PA, FOR 2) ; obéit parfaitement *(max PJ)*
- **Rang 4 :** anime jusqu'à 3 cadavres ; les corps peuvent être partiellement détruits
- **Rang 5 :** anime une masse (10 cadavres) ou 1 cadavre puissant (10 PV, 4 PA, FOR 4)
- **Rang 6 :** animation permanente — les morts continuent sans concentration ; peuvent devenir autonomes (le MJ décide)

---

## Pouvoirs de Supérieur

*Chaque ange ou démon reçoit à la création UN pouvoir spécial de son supérieur hiérarchique. Ces pouvoirs reflètent la vision unique de chaque Archange ou Prince-Démon sur la directive "Vendez-moi du rêve".*

*Ces pouvoirs ont un rang fixe (indiqué) qui détermine les dés de drain générés à l'activation. Ils peuvent être surchargés jusqu'au rang 6 pour amplifier leurs effets selon l'appréciation du MJ.*

---

### Archanges

---

**Lame de Justice** *(Dominique, Archange de la Justice) — Rang 2 — Durée fixe*

L'arme tenue devient une extension de la Justice Divine.

- +3 dégâts contre ceux qui ont rompu un serment
- Révèle les crimes cachés de la cible touchée
- Dégâts doublés contre les parjures amoureux

*"Dominique applique la loi à la lettre, même celle du cœur."*

---

**Sacrifice Héroïque** *(Michel, Archange de la Guerre) — Rang 3 — Instantané*

Transforme un acte désespéré en légende.

- Prochain jet d'attaque avec double avantage
- Si l'attaque tue la cible, tous les alliés récupèrent 1 PE
- Si le personnage meurt dans les 3 tours suivants, il devient une légende (résurrection automatique après la scène)

*"Michel veut des héros, morts ou vifs, de préférence les deux."*

---

**Élan du Cœur** *(Gabriel, Archange de la Charité) — Rang 2 — Instantané*

Force deux personnes à exprimer leurs vrais sentiments.

- Les cibles doivent réussir un jet de VOL vs INF ou avouer leur amour/haine
- Si amour mutuel révélé : soigne `max(Marge, Intensité)` PV aux deux cibles
- Si confession publique réussie : l'ange récupère 1 PE

*"Gabriel mise tout sur les happy endings et les déclarations publiques."*

---

**Archives Akashiques** *(Yves, Archange de la Connaissance) — Rang 2 — Instantané*

Accède aux souvenirs significatifs de n'importe qui.

- Révèle l'historique émotionnel complet d'une cible (jet CLA)
- Peut utiliser ces informations pour avantage au prochain jet d'INF contre cette cible
- Découvre le "talon d'Achille émotionnel"

*"Yves compile des statistiques sur l'amour. C'est terrifiant."*

---

**Bouclier du Protecteur** *(Laurent, Archange de l'Épée) — Rang 2 — Réaction gratuite*

Quand un être aimé est attaqué dans votre champ de vision.

- Téléportation instantanée pour intercepter l'attaque
- Absorption totale des dégâts de l'attaque
- Si le lanceur survit : la cible protégée gagne un avantage permanent envers lui (narratif)

*"Laurent comprend que la vraie force est de protéger ceux qu'on aime."*

---

**Instinct Animal** *(Jordi, Archange des Animaux) — Rang 2 — Scène entière*

Invoque l'animal de compagnie parfait pour amadouer une cible.

- L'animal apparaît et charme automatiquement sa cible (désavantage en combattant l'ange)
- +3 en Influence tant que l'animal est présent et que la cible l'accepte
- Si la cible adopte l'animal : objectif narratif accompli, l'ange récupère 1 PE

*"Jordi sait que le vrai amour passe par les animaux."*

---

**Sérénité Verdoyante** *(Novalis, Archange des Plantes) — Rang 3 — Scène entière*

Crée une atmosphère de paix totale dans une zone de 20m.

- Impossible d'initier un combat dans la zone sans jet VOL vs INF de Novalis
- Les couples en conflit se réconcilient automatiquement si les deux parties restent dans la zone
- Odeur de weed subtile mais persistante
- Les snacks deviennent irrésistiblement attirants

*"Novalis prône l'amour universel... et les munchies."*

---

**Foudre Vengeresse** *(Jean, Archange de la Foudre) — Rang 3 — Instantané*

Frappe divine guidée par GPS céleste.

- Localise instantanément un être aimé en danger (fonctionne entre plans)
- Téléportation + frappe de foudre sur l'agresseur (`3 × max(Marge, Intensité)` dégâts)
- L'effet est filmé par tous les smartphones alentour

*"Jean fait du sauvetage spectaculaire son business model."*

---

**Innocence Retrouvée** *(Christophe, Archange des Enfants) — Rang 3 — Durée fixe*

Fait ressortir l'enfant intérieur de tous dans une zone de 10m.

- Immunité à la violence dans la zone : personne ne peut initier une attaque (jet VOL vs INF à désavantage)
- Les adultes retrouvent leur capacité d'émerveillement
- Résolution des conflits possible par arbitrage naïf mais étonnamment efficace

*"Christophe refuse le drame mais accepte les jeux d'enfants."*

---

**Châtiment Ardent** *(Uriel, Archange du Châtiment) — Rang 2 — Instantané*

Punit les trahisons.

- Dégâts = nombre de fois que la cible a brisé une promesse × 3 (MJ arbitre)
- La cible revit chaque trahison significative commise
- Ignore les défenses si la cible a trahi délibérément

*"Uriel punit par principe, que ce soit par amour ou non."*

---

### Princes-Démons

---

**Rage de Guerre** *(Baal, Prince de la Guerre) — Rang 2 — Durée fixe*

Transforme la tension en violence.

- Les couples ou groupes en conflit dans un rayon de 10m passent automatiquement aux actes (jet VOL vs INF pour résister)
- +1 dégât par personne qui se bat à cause du démon dans la zone
- Si un meurtre passionnel survient dans la scène : récupère 1 PE

*"Baal préfère Roméo et Juliette version Battle Royale."*

---

**Pacte d'Amour** *(Asmodée, Prince du Jeu) — Rang 3 — Permanent*

Transforme une relation en contrat démoniaque.

- Les sujets du pacte signent (littéralement, sang ou encre) les termes de leur relation
- Chaque trahison des termes cause `max(Marge, Intensité)` blessures aggravées
- Le démon peut invoquer les termes du contrat à volonté pour déclencher les pénalités

*"Asmodée fait de l'amour un jeu où personne ne gagne."*

---

**Cauchemar Éveillé** *(Beleth, Princesse des Cauchemars) — Rang 2 — Concentration*

Fait vivre les pires scénarios amoureux en temps réel.

- La cible voit des visions de trahison impliquant ses proches (jet RES vs INF)
- Paranoïa amoureuse : désavantage à tous les jets sociaux tant que la concentration est maintenue
- Sur un échec critique du jet de résistance : peut déclencher une crise de jalousie meurtière

*"Beleth sait que la jalousie est le meilleur des cauchemars."*

---

**Humiliation Publique** *(Kobal, Prince de l'Humour) — Rang 2 — Instantané*

Transforme un moment romantique en fiasco mémorable.

- La prochaine déclaration d'amour ou action romantique de la cible devient ridicule (désavantage et complication narrative au MJ)
- Tous les témoins filment instinctivement
- La vidéo devient virale si elle sort (la cible perd sa réputation dans son cercle social)

*"Kobal préfère les comédies romantiques... qui finissent mal."*

---

**Discorde Familiale** *(Malphas, Prince de la Discorde) — Rang 3 — Scène entière*

Monte les familles les unes contre les autres.

- Les beaux-parents et proches de la cible développent une hostilité immédiate envers son partenaire (jet VOL vs INF)
- Révèle involontairement les secrets de famille les plus explosifs au pire moment
- Les enfants dans la zone prennent parti (camp aléatoire, jet par le MJ)

*"Malphas adore les dîners de famille qui dégénèrent."*

---

**Obsession Charnelle** *(Andrealphus, Prince de la Luxure) — Rang 2 — Durée fixe*

Transforme l'attirance en obsession destructrice.

- La cible ne peut penser qu'à l'objet de son désir (désavantage à tous les jets sauf ceux liés à rejoindre cette personne)
- Actions irrationnelles automatiques pour attirer l'attention si la cible rate un jet VOL
- Ignore tout danger pour rejoindre l'être désiré

*"Andrealphus vend l'obsession, pas l'amour."*

---

**Faim Dévorante** *(Haagenti, Princesse de la Gourmandise) — Rang 2 — Instantané*

Dévore littéralement les sentiments d'un couple.

- Vole les émotions positives de deux personnes liées (jet INF vs VOL des deux) ; le démon récupère `max(Marge, Intensité)` PV
- Les victimes perdent tout attachement émotionnel l'une pour l'autre (jusqu'à dissipation ou Purification Rang 3+)
- Les ex-amoureux deviennent des coquilles vides émotionnellement pendant 1 scène

*"Haagenti trouve que l'amour a un goût de poulet."*

---

**Amour d'Outre-Tombe** *(Samigina, Prince de la Nécromancie) — Rang 3 — Scène entière*

Ramène temporairement un amour perdu pour le pire des effets.

- Invoque le fantôme parfaitement réaliste d'un être aimé décédé d'une cible
- L'illusion est indiscernable de la réalité pendant 1 heure (jet CLA vs INF à double désavantage)
- Quand l'illusion disparaît ou est percée : `3 × max(Marge, Intensité)` blessures aggravées de désespoir à la cible

*"Samigina vend le rêve de retrouvailles impossibles."*

---

**Vol de Cœur** *(Valefor, Prince des Voleurs) — Rang 2 — Instantané*

Transfère les sentiments d'une personne vers une autre.

- Vole l'amour ou l'affection que A ressent pour B et le transfère à C (jet INF vs VOL de A)
- Les sentiments volés durent 24h puis s'évaporent, laissant A dans un vide émotionnel
- Parfait pour briser des couples et créer des triangles explosifs

*"Valefor vole tout, même ce qui ne devrait pas l'être."*

---

**Animation Macabre** *(Bifrons, Prince des Morts) — Rang 3 — Concentration*

Les morts rejouent leurs histoires d'amour. C'est exactement aussi perturbant que ça en a l'air.

- Anime jusqu'à 3 cadavres récents ; ils recherchent instinctivement leurs anciens amours
- Les cadavres se comportent comme la personne de son vivant (souvenirs fragmentaires)
- Tout témoin doit tester Terreur (jet RES vs INF) ou fuir

*"Bifrons trouve que l'amour est plus drôle après la mort."*

---

### Factions Secrètes

---

**Double Visage** *(Les Murmures de Lilith) — Passif permanent*

Maîtrise parfaite du double jeu — ni ange ni démon, ou les deux à la fois.

- Peut utiliser les pouvoirs angéliques ET démoniaques sans restriction d'alignement
- Détection de l'alignement impossible sauf par une entité de Rang 5+
- Change d'aura (bien/mal/neutre) à volonté — action gratuite

*"Emmanuel a enseigné l'art de servir deux maîtres."*

---

**Banalité Forcée** *(Sympathisants de Jésus) — Rang 3 — Scène entière*

Annule tout potentiel dramatique dans une zone de 15m. Parfois, c'est la chose la plus puissante qui soit.

- Les conflits en cours s'atténuent ; initier un combat requiert un jet VOL à désavantage
- Les passions intenses deviennent des affections tièdes pendant la durée
- Immunité aux manipulations émotionnelles (pouvoirs basés sur INF sont annulés dans la zone)

*"Jésus sait que l'amour vrai est dans les petits gestes du quotidien."*
