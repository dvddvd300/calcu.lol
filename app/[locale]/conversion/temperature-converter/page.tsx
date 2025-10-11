import {setRequestLocale} from 'next-intl/server';
import {getTranslations} from 'next-intl/server';
import {routing, type Locale} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import {Suspense} from 'react';
import TemperatureConverterClient from '@/components/TemperatureConverterClient';
import TemperatureConverterExamples from '@/components/TemperatureConverterExamples';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const t = await getTranslations({locale, namespace: 'temperatureConverter'});
  
  return {
    metadataBase: new URL('https://calcu.lol'),
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://calcu.lol/${locale}/conversion/temperature-converter`,
      languages: {
        'en': 'https://calcu.lol/en/conversion/temperature-converter',
        'es': 'https://calcu.lol/es/conversion/convertidor-temperatura',
        'de': 'https://calcu.lol/de/umrechnung/temperatur-umrechner',
        'fr': 'https://calcu.lol/fr/conversion/convertisseur-temperature',
        'x-default': 'https://calcu.lol/en/conversion/temperature-converter'
      }
    }
  };
}

export default async function TemperatureConverterPage({params}: Props) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations('temperatureConverter');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div></div>}>
          <TemperatureConverterClient />
        </Suspense>

        <TemperatureConverterExamples />
      </div>
    </div>
  );
}

