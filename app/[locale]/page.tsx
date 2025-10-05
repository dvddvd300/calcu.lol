import {setRequestLocale} from 'next-intl/server';
import {getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import Link from 'next/link';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as any)) {
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
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations('home');

  const calculators = [
    {
      key: 'speed',
      name: t('featured.speed'),
      path: '/speed-calculator',
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          {t('subtitle')}
        </p>
        <p className="text-lg text-gray-500">
          {t('description')}
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
          {t('featured.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {calculators.map((calculator) => (
            <Link
              key={calculator.key}
              href={`/${locale}${calculator.path}` as any}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {calculator.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {calculator.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-semibold text-blue-900 mb-4">
          Why Choose calcu.lol?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">🚀</div>
            <h4 className="font-semibold text-blue-900 mb-2">Fast & Accurate</h4>
            <p className="text-blue-700 text-sm">
              Get instant, accurate calculations for all your needs
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🌍</div>
            <h4 className="font-semibold text-blue-900 mb-2">Multi-Language</h4>
            <p className="text-blue-700 text-sm">
              Available in English, Spanish, German, and French
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">💯</div>
            <h4 className="font-semibold text-blue-900 mb-2">100% Free</h4>
            <p className="text-blue-700 text-sm">
              All calculators are completely free to use
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
