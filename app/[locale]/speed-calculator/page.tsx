import {setRequestLocale} from 'next-intl/server';
import {getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import SpeedCalculator from '@/components/SpeedCalculator';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({locale, namespace: 'speedCalc'});
  
  return {
    metadataBase: new URL('https://calcu.lol'),
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://calcu.lol/${locale}/speed-calculator`,
      languages: {
        'en': 'https://calcu.lol/en/speed-calculator',
        'es': 'https://calcu.lol/es/calculadora-velocidad',
        'de': 'https://calcu.lol/de/geschwindigkeit-rechner',
        'fr': 'https://calcu.lol/fr/calculateur-vitesse',
        'x-default': 'https://calcu.lol/en/speed-calculator'
      }
    }
  };
}

export default async function SpeedCalculatorPage({params}: Props) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations('speedCalc');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-600">
          {t('subtitle')}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <SpeedCalculator />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {t('examples.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">
              {t('examples.movie')}
            </h3>
            <p className="text-sm text-gray-600">
              {t('examples.movieResult')}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">
              {t('examples.album')}
            </h3>
            <p className="text-sm text-gray-600">
              {t('examples.albumResult')}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">
              {t('examples.game')}
            </h3>
            <p className="text-sm text-gray-600">
              {t('examples.gameResult')}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">
              {t('examples.document')}
            </h3>
            <p className="text-sm text-gray-600">
              {t('examples.documentResult')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
