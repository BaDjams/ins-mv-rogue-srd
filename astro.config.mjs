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
          autogenerate: { directory: 'contexte' },
        },
        {
          label: 'Personnage',
          autogenerate: { directory: 'personnage' },
        },
        {
          label: 'Mécanique',
          autogenerate: { directory: 'mecanique' },
        },
        {
          label: 'Référence',
          autogenerate: { directory: 'reference' },
        },
        { label: 'Simulateur', slug: 'simulateur' },
        { label: 'Générateur', slug: 'generateur' },
      ],
    }),
  ],
});
