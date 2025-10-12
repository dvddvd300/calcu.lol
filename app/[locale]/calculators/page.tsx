import {setRequestLocale} from 'next-intl/server';
import {getTranslations} from 'next-intl/server';
import {routing, type Locale} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import FloatingBackToTop from '@/components/FloatingBackToTop';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const t = await getTranslations({locale, namespace: 'calculators'});
  
  return {
    metadataBase: new URL('https://calcu.lol'),
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://calcu.lol/${locale}/calculators`,
      languages: {
        'en': 'https://calcu.lol/en/calculators',
        'es': 'https://calcu.lol/es/calculadoras',
        'de': 'https://calcu.lol/de/rechner',
        'fr': 'https://calcu.lol/fr/calculateurs',
        'x-default': 'https://calcu.lol/en/calculators'
      }
    }
  };
}

export default async function CalculatorsPage({params}: Props) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations('calculators');

  // Define calculator categories and their calculators
  const categories = [
    {
      id: 'technology',
      name: t('categories.technology'),
      calculators: [
        {
          key: 'speed',
          name: t('calculators.speed.name'),
          description: t('calculators.speed.description'),
          path: '/ti/speed-calculator',
          icon: '🚀'
        },
        {
          key: 'storage',
          name: t('calculators.storage.name'),
          description: t('calculators.storage.description'),
          path: '/ti/storage-calculator',
          icon: '💾'
        }
      ]
    },
    {
      id: 'math',
      name: t('categories.math'),
      calculators: [
        {
          key: 'percentage',
          name: t('calculators.percentage.name'),
          description: t('calculators.percentage.description'),
          path: '/math/percentage-calculator',
          icon: '📊'
        }
      ]
    },
    {
      id: 'finance',
      name: t('categories.finance'),
      calculators: [
        {
          key: 'tip',
          name: t('calculators.tip.name'),
          description: t('calculators.tip.description'),
          path: '/finance/tip-calculator',
          icon: '💰'
        }
      ]
    },
    {
      id: 'time',
      name: t('categories.time'),
      calculators: [
        {
          key: 'age',
          name: t('calculators.age.name'),
          description: t('calculators.age.description'),
          path: '/time/age-calculator',
          icon: '🎂'
        },
        {
          key: 'time',
          name: t('calculators.time.name'),
          description: t('calculators.time.description'),
          path: '/time/time-calculator',
          icon: '⏰'
        },
        {
          key: 'date',
          name: t('calculators.date.name'),
          description: t('calculators.date.description'),
          path: '/time/date-calculator',
          icon: '📅'
        },
        {
          key: 'timezone',
          name: t('calculators.timezone.name'),
          description: t('calculators.timezone.description'),
          path: '/time/timezone-converter',
          icon: '🌍'
        },
        {
          key: 'workHours',
          name: t('calculators.workHours.name'),
          description: t('calculators.workHours.description'),
          path: '/time/work-hours-calculator',
          icon: '💼'
        },
        {
          key: 'countdown',
          name: t('calculators.countdown.name'),
          description: t('calculators.countdown.description'),
          path: '/time/countdown-timer',
          icon: '⏳'
        }
      ]
    },
    {
      id: 'conversion',
      name: t('categories.conversion'),
      calculators: [
        {
          key: 'distance',
          name: t('calculators.distance.name'),
          description: t('calculators.distance.description'),
          path: '/conversion/distance-converter',
          icon: '📏'
        },
        {
          key: 'weight',
          name: t('calculators.weight.name'),
          description: t('calculators.weight.description'),
          path: '/conversion/weight-converter',
          icon: '⚖️'
        },
        {
          key: 'temperature',
          name: t('calculators.temperature.name'),
          description: t('calculators.temperature.description'),
          path: '/conversion/temperature-converter',
          icon: '🌡️'
        },
        {
          key: 'speed',
          name: t('calculators.speed.name'),
          description: t('calculators.speed.description'),
          path: '/conversion/speed-converter',
          icon: '🚀'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Category Navigation */}
        <div className="mb-16" id="category-navigation">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="px-6 py-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 hover:text-blue-600 font-medium border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>

        {/* Categories and Calculators */}
        <div className="space-y-20">
          {categories.map((category, categoryIndex) => (
            <section key={category.id} id={category.id} className="scroll-mt-20">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                  {category.name}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.calculators.map((calculator, index) => (
                  <Link
                    key={calculator.key}
                    href={`/${locale}${calculator.path}`}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
                    style={{ animationDelay: `${(categoryIndex * 100) + (index * 100)}ms` }}
                  >
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300 text-2xl">
                      {calculator.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {calculator.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {calculator.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700">
                      Try it now
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Floating Back to top - only visible when category nav is not visible */}
        <FloatingBackToTop />

        {/* Regular Back to top for mobile/fallback */}
        <div className="text-center mt-16 md:hidden">
          <a
            href="#top"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Back to Top
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
