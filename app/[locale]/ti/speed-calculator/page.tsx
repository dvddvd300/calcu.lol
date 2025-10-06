import {setRequestLocale} from 'next-intl/server';
import {getTranslations} from 'next-intl/server';
import {routing, type Locale} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import SpeedCalculatorClient from '@/components/SpeedCalculatorClient';
import SpeedCalculatorExamples from '@/components/SpeedCalculatorExamples';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const t = await getTranslations({locale, namespace: 'speedCalc'});
  
  return {
    metadataBase: new URL('https://calcu.lol'),
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://calcu.lol/${locale}/ti/speed-calculator`,
      languages: {
        'en': 'https://calcu.lol/en/ti/speed-calculator',
        'es': 'https://calcu.lol/es/ti/calculadora-velocidad',
        'de': 'https://calcu.lol/de/ti/geschwindigkeit-rechner',
        'fr': 'https://calcu.lol/fr/ti/calculateur-vitesse',
        'x-default': 'https://calcu.lol/en/ti/speed-calculator'
      }
    }
  };
}

export default async function SpeedCalculatorPage({params}: Props) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations('speedCalc');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SpeedCalculatorClient />

        <SpeedCalculatorExamples />
      </div>
    </div>
  );
}
