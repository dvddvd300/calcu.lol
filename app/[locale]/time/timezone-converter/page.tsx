import {setRequestLocale} from 'next-intl/server';
import {getTranslations} from 'next-intl/server';
import {routing, type Locale} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import {Suspense} from 'react';
import TimezoneConverterClient from '@/components/TimezoneConverterClient';
import TimezoneConverterExamples from '@/components/TimezoneConverterExamples';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const t = await getTranslations({locale, namespace: 'timezoneConverter'});
  
  return {
    metadataBase: new URL('https://calcu.lol'),
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://calcu.lol/${locale}/time/timezone-converter`,
      languages: {
        'en': 'https://calcu.lol/en/time/timezone-converter',
        'es': 'https://calcu.lol/es/tiempo/convertidor-zona-horaria',
        'de': 'https://calcu.lol/de/zeit/zeitzonen-umrechner',
        'fr': 'https://calcu.lol/fr/temps/convertisseur-fuseau-horaire',
        'x-default': 'https://calcu.lol/en/time/timezone-converter'
      }
    }
  };
}

export default async function TimezoneConverterPage({params}: Props) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations('timezoneConverter');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}>
          <TimezoneConverterClient />
        </Suspense>

        <TimezoneConverterExamples />
      </div>
    </div>
  );
}
