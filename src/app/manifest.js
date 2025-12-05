export default function manifest() {
  return {
    name: 'DOPO by BStudios - Premier Creator Collaboration Platform',
    short_name: 'DOPO',
    description: 'Premier creator collaboration platform connecting elite developers, designers, and innovators worldwide for revolutionary project development',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}