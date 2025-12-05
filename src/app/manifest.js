export default function manifest() {
  return {
    name: 'Braynix Studios - Creator Collaboration Platform',
    short_name: 'Braynix Studios',
    description: 'Discover innovative projects and collaborate with talented creators worldwide',
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