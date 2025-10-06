import {setRequestLocale} from 'next-intl/server';
import {getTranslations} from 'next-intl/server';
import {routing, type Locale} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import {Suspense} from 'react';
import StorageCalculatorClient from '@/components/StorageCalculatorClient';
import StorageCalculatorExamples from '@/components/StorageCalculatorExamples';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const t = await getTranslations({locale, namespace: 'storageCalc'});
  
  return {
    metadataBase: new URL('https://calcu.lol'),
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://calcu.lol/${locale}/ti/storage-calculator`,
      languages: {
        'en': 'https://calcu.lol/en/ti/storage-calculator',
        'es': 'https://calcu.lol/es/ti/convertidor-almacenamiento',
        'de': 'https://calcu.lol/de/ti/speicher-konverter',
        'fr': 'https://calcu.lol/fr/ti/convertisseur-stockage',
        'x-default': 'https://calcu.lol/en/ti/storage-calculator'
      }
    }
  };
}

export default async function StorageCalculatorPage({params}: Props) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div></div>}>
          <StorageCalculatorClient />
        </Suspense>

        <StorageCalculatorExamples />
      </div>
    </div>
  );
}
