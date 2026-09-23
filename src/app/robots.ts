import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/painel-secreto-x9f2', '/cliente/chat'],
    },
    sitemap: 'https://nexsitess.netlify.app/sitemap.xml',
  };
}
