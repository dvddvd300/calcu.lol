import {setRequestLocale} from 'next-intl/server';
import {getTranslations} from 'next-intl/server';
import {routing, type Locale} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import {Suspense} from 'react';
import CountdownTimerClient from '@/components/CountdownTimerClient';
import CountdownTimerExamples from '@/components/CountdownTimerExamples';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const t = await getTranslations({locale, namespace: 'countdownTimer'});
  
  return {
    metadataBase: new URL('https://calcu.lol'),
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://calcu.lol/${locale}/time/countdown-timer`,
      languages: {
        'en': 'https://calcu.lol/en/time/countdown-timer',
        'es': 'https://calcu.lol/es/tiempo/cronometro-cuenta-regresiva',
        'de': 'https://calcu.lol/de/zeit/countdown-timer',
        'fr': 'https://calcu.lol/fr/temps/compte-a-rebours',
        'x-default': 'https://calcu.lol/en/time/countdown-timer'
      }
    }
  };
}

export default async function CountdownTimerPage({params}: Props) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations('countdownTimer');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div></div>}>
          <CountdownTimerClient />
        </Suspense>

        <CountdownTimerExamples />
      </div>
    </div>
  );
}
