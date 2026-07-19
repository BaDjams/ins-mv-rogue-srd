import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import AstroPWA from '@vite-pwa/astro';

const base = '/ins-mv-rogue-srd';

export default defineConfig({
  site: 'https://BaDjams.github.io',
  base,
  integrations: [
    AstroPWA({
      registerType: 'autoUpdate',
      // vite-plugin-pwa attend une base terminée par "/" (Astro, lui, la stocke sans slash final).
      base: base + '/',
      scope: base + '/',
      includeAssets: ['icon.svg', 'favicon-32.png'],
      manifest: {
        id: base + '/',
        name: 'INS·MV ROGUE — SRD',
        short_name: 'ROGUE SRD',
        description: 'System Reference Document pour INS-MV ROGUE, disponible hors-ligne.',
        lang: 'fr',
        start_url: base + '/',
        scope: base + '/',
        display: 'standalone',
        background_color: '#0f0f1a',
        theme_color: '#0f0f1a',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Toujours vérifier une version plus récente en priorité ; ne retombe sur le
        // cache que si le réseau est indisponible, pour garder le contenu à jour hors-ligne.
        navigateFallback: base + '/',
        globPatterns: ['**/*.{css,js,html,svg,png,ico,woff2}'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: { cacheName: 'pages', networkTimeoutSeconds: 3 },
          },
          {
            urlPattern: ({ request }) =>
              ['style', 'script', 'image', 'font'].includes(request.destination),
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'assets' },
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
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
      favicon: '/favicon-32.png',
      head: [
        {
          tag: 'script',
          attrs: { src: '/ins-mv-rogue-srd/scripts/rogue-srd.js', defer: true },
        },
        {
          tag: 'link',
          attrs: { rel: 'manifest', href: base + '/manifest.webmanifest' },
        },
        {
          tag: 'link',
          attrs: { rel: 'apple-touch-icon', href: base + '/icons/apple-touch-icon.png' },
        },
        {
          tag: 'meta',
          attrs: { name: 'apple-mobile-web-app-capable', content: 'yes' },
        },
        {
          tag: 'meta',
          attrs: { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        },
        {
          tag: 'meta',
          attrs: { name: 'apple-mobile-web-app-title', content: 'ROGUE SRD' },
        },
        {
          tag: 'meta',
          attrs: { name: 'theme-color', content: '#0f0f1a' },
        },
        // @vite-pwa/astro ne génère le service worker (sw.js) qu'au build, sans jamais
        // l'enregistrer lui-même sur les pages statiques Starlight : on le fait ici.
        {
          tag: 'script',
          content: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('${base}/sw.js', { scope: '${base}/' });
              });
            }
          `,
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
