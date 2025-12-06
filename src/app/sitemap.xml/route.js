export async function GET() {
  const baseUrl = 'https://dopo-bstudios.vercel.app';
  
  const staticPages = [
    { url: '', priority: 1.0, changefreq: 'daily' },
    { url: '/projects/discover', priority: 0.95, changefreq: 'hourly' },
    { url: '/projects/new-proposal', priority: 0.9, changefreq: 'daily' },
    { url: '/projects/top-growing', priority: 0.9, changefreq: 'hourly' },
    { url: '/about/company', priority: 0.85, changefreq: 'monthly' },
    { url: '/contact', priority: 0.8, changefreq: 'monthly' },
    { url: '/dashboard', priority: 0.75, changefreq: 'daily' },
    { url: '/upcoming-features', priority: 0.7, changefreq: 'weekly' },
    { url: '/auth', priority: 0.65, changefreq: 'monthly' },
    { url: '/pricing', priority: 0.6, changefreq: 'weekly' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <mobile:mobile/>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}