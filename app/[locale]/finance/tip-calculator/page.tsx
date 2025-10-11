import {setRequestLocale} from 'next-intl/server';
import {getTranslations} from 'next-intl/server';
import {routing, type Locale} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import {Suspense} from 'react';
import TipCalculatorClient from '@/components/TipCalculatorClient';
import TipCalculatorExamples from '@/components/TipCalculatorExamples';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const t = await getTranslations({locale, namespace: 'tipCalc'});
  
  return {
    metadataBase: new URL('https://calcu.lol'),
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://calcu.lol/${locale}/finance/tip-calculator`,
      languages: {
        'en': 'https://calcu.lol/en/finance/tip-calculator',
        'es': 'https://calcu.lol/es/finanzas/calculadora-propina',
        'de': 'https://calcu.lol/de/finanzen/trinkgeld-rechner',
        'fr': 'https://calcu.lol/fr/finance/calculateur-pourboire',
        'x-default': 'https://calcu.lol/en/finance/tip-calculator'
      }
    }
  };
}

export default async function TipCalculatorPage({params}: Props) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div></div>}>
          <TipCalculatorClient />
        </Suspense>

        <TipCalculatorExamples />
      </div>
    </div>
  );
}

