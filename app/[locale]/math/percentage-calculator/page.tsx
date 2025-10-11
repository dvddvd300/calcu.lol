import {setRequestLocale} from 'next-intl/server';
import {getTranslations} from 'next-intl/server';
import {routing, type Locale} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import {Suspense} from 'react';
import PercentageCalculatorClient from '@/components/PercentageCalculatorClient';
import PercentageCalculatorExamples from '@/components/PercentageCalculatorExamples';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const t = await getTranslations({locale, namespace: 'percentageCalc'});
  
  return {
    metadataBase: new URL('https://calcu.lol'),
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://calcu.lol/${locale}/percentage-calculator`,
      languages: {
        'en': 'https://calcu.lol/en/percentage-calculator',
        'es': 'https://calcu.lol/es/calculadora-porcentaje',
        'de': 'https://calcu.lol/de/prozentsatz-rechner',
        'fr': 'https://calcu.lol/fr/calculateur-pourcentage',
        'x-default': 'https://calcu.lol/en/percentage-calculator'
      }
    }
  };
}

export default async function PercentageCalculatorPage({params}: Props) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div></div>}>
          <PercentageCalculatorClient />
        </Suspense>

        <PercentageCalculatorExamples />
      </div>
    </div>
  );
}
