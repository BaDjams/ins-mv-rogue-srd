import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://BaDjams.github.io',
  base: '/ins-mv-rogue-srd',
  integrations: [
    starlight({
      title: 'INS·MV ROGUE SRD',
      description: 'System Reference Document pour INS-MV ROGUE',
      defaultLocale: 'root',
      locales: {
        root: { label: 'Français', lang: 'fr' },
      },
      social: {
        github: 'https://github.com/BaDjams/ins-mv-rogue-srd',
      },
      customCss: ['./src/styles/rogue-srd.css'],
      head: [
        {
          tag: 'script',
          attrs: { src: '/ins-mv-rogue-srd/scripts/rogue-srd.js', defer: true },
        },
      ],
      sidebar: [
        { label: 'Accueil', slug: 'index' },
        { label: 'SRD', slug: 'srd' },
        {
          label: 'Contexte',
          items: [
            { label: 'Le monde du jeu', slug: 'contexte/contexte' },
            { label: 'Setting', slug: 'contexte/ins-mv-rogue' },
          ],
        },
        {
          label: 'Personnage',
          items: [
            { label: 'Caractéristiques & Attributs', slug: 'personnage/caracteristiques' },
            { label: "Création d'âme", slug: 'personnage/creation' },
            { label: 'Rang céleste', slug: 'personnage/rang' },
            { label: 'Position hiérarchique', slug: 'personnage/progression' },
            { label: 'Réincarnation', slug: 'personnage/reincarnation' },
          ],
        },
        {
          label: 'Mécanique',
          items: [
            { label: 'Résolution D666', slug: 'mecanique/resolution' },
            { label: 'Compétences', slug: 'mecanique/competences' },
            { label: 'Combat & initiative', slug: 'mecanique/combat' },
            { label: 'Dégâts & Blessures', slug: 'mecanique/blessures' },
            { label: 'Pouvoirs', slug: 'mecanique/pouvoirs' },
            { label: 'Énergie, Drain & Consommation', slug: 'mecanique/energie' },
            { label: 'Mots-clés de pouvoirs', slug: 'mecanique/mots-cles-pouvoirs' },
            { label: 'Santé Mentale', slug: 'mecanique/sante-mentale' },
          ],
        },
        {
          label: 'Référence',
          items: [
            {
              label: 'Équipement',
              collapsed: true,
              items: [
                { label: "Vue d'ensemble", slug: 'reference/equipement' },
                { label: 'Armes de mêlée', slug: 'reference/equipement/melee' },
                { label: 'Armes à distance', slug: 'reference/equipement/distance' },
                { label: 'Armes à feu', slug: 'reference/equipement/armes-feu' },
                { label: 'Explosifs', slug: 'reference/equipement/explosifs' },
                { label: 'Protections', slug: 'reference/equipement/protections' },
                { label: 'Boucliers', slug: 'reference/equipement/boucliers' },
              ],
            },
            { label: 'Mots-clés', slug: 'reference/mots-cles' },
            { label: 'États', slug: 'reference/etats' },
          ],
        },
        { label: 'Simulateur', slug: 'simulateur' },
        { label: 'Générateur', slug: 'generateur' },
        { label: '↓ Télécharger', slug: 'telecharger' },
      ],
    }),
  ],
});
