import {routing} from '@/i18n/routing';

export const dynamic = 'force-static';

export default function sitemap() {
  const calculators = [
    'speed-calculator',
    'bmi-calculator', 
    'percentage-calculator',
    'tip-calculator',
    'age-calculator',
    'time-calculator',
    'date-calculator',
    'unit-converter',
    'currency-converter',
    'temperature-converter'
  ];
  
  const urls = [];
  
  // Add homepage for each locale
  for (const locale of routing.locales) {
    urls.push({
      url: `https://calcu.lol/${locale}`,
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
  }
  
  // Add calculator pages for each locale
  for (const locale of routing.locales) {
    for (const calc of calculators) {
      const pathname = `/${calc}` as keyof typeof routing.pathnames;
      const translatedPath = routing.pathnames[pathname]?.[locale as keyof typeof routing.pathnames[typeof pathname]] || `/${calc}`;
      
      urls.push({
        url: `https://calcu.lol/${locale}${translatedPath}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map(l => {
              const translatedPathForLocale = routing.pathnames[pathname]?.[l as keyof typeof routing.pathnames[typeof pathname]] || `/${calc}`;
              return [l, `https://calcu.lol/${l}${translatedPathForLocale}`];
            })
          )
        }
      });
    }
  }
  
  return urls;
}
