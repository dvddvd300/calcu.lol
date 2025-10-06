import {setRequestLocale} from 'next-intl/server';
import {getTranslations} from 'next-intl/server';
import {routing, type Locale} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import Link from 'next/link';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const t = await getTranslations({locale, namespace: 'home'});
  
  return {
    metadataBase: new URL('https://calcu.lol'),
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://calcu.lol/${locale}`,
      languages: {
        'en': 'https://calcu.lol/en',
        'es': 'https://calcu.lol/es',
        'de': 'https://calcu.lol/de',
        'fr': 'https://calcu.lol/fr',
        'x-default': 'https://calcu.lol/en'
      }
    }
  };
}

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations('home');

  const calculators = [
    {
      key: 'speed',
      name: t('featured.speed'),
      path: '/ti/speed-calculator',
      description: 'Calculate download time based on file size and connection speed'
    },
    {
      key: 'bmi',
      name: t('featured.bmi'),
      path: '/bmi-calculator',
      description: 'Calculate your Body Mass Index'
    },
    {
      key: 'percentage',
      name: t('featured.percentage'),
      path: '/percentage-calculator',
      description: 'Calculate percentages easily'
    },
    {
      key: 'tip',
      name: t('featured.tip'),
      path: '/tip-calculator',
      description: 'Calculate tip amount and total bill'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-8 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Featured Calculators */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {t('featured.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {calculators.map((calculator, index) => (
              <Link
                key={calculator.key}
                href={`/${locale}${calculator.path}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {calculator.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {calculator.description}
                </p>
                <div className="mt-4 flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700">
                  Try it now
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-8">
            Why Choose calcu.lol?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🚀</span>
              </div>
              <h4 className="text-xl font-bold mb-3">Fast & Accurate</h4>
              <p className="text-blue-100 leading-relaxed">
                Get instant, accurate calculations for all your needs
              </p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🌍</span>
              </div>
              <h4 className="text-xl font-bold mb-3">Multi-Language</h4>
              <p className="text-blue-100 leading-relaxed">
                Available in English, Spanish, German, and French
              </p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">💯</span>
              </div>
              <h4 className="text-xl font-bold mb-3">100% Free</h4>
              <p className="text-blue-100 leading-relaxed">
                All calculators are completely free to use
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
