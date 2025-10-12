import {routing} from '@/i18n/routing';

export const dynamic = 'force-static';

export default function sitemap() {
  const urls = [];
  
  // Add homepage (using default locale as primary URL)
  urls.push({
    url: `https://calcu.lol/en`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1.0,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map(l => [
          l, 
          `https://calcu.lol/${l}`
        ])
      )
    }
  });
  
  // Add calculators page (using default locale as primary URL)
  const calculatorsPath = routing.pathnames['/calculators']?.['en' as keyof typeof routing.pathnames['/calculators']] || '/calculators';
  urls.push({
    url: `https://calcu.lol/en${calculatorsPath}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map(l => {
          const translatedPath = routing.pathnames['/calculators']?.[l as keyof typeof routing.pathnames['/calculators']] || '/calculators';
          return [l, `https://calcu.lol/${l}${translatedPath}`];
        })
      )
    }
  });
  
  // Add all calculator pages (one entry per calculator with all language variants)
  for (const pathname of Object.keys(routing.pathnames)) {
    if (pathname !== '/' && pathname !== '/calculators') {
      const pathnameKey = pathname as keyof typeof routing.pathnames;
      const pathnameConfig = routing.pathnames[pathnameKey];
      
      // Use English as the primary URL
      const primaryPath = pathnameConfig?.['en' as keyof typeof pathnameConfig] || pathname;
      
      urls.push({
        url: `https://calcu.lol/en${primaryPath}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map(l => {
              const translatedPath = pathnameConfig?.[l as keyof typeof pathnameConfig] || pathname;
              return [l, `https://calcu.lol/${l}${translatedPath}`];
            })
          )
        }
      });
    }
  }
  
  return urls;
}
