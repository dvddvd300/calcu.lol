import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing, type Locale} from '@/i18n/routing';
import {setRequestLocale} from 'next-intl/server';
import {ReactNode} from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Navigation from '@/components/Navigation';

type Props = {
  children: ReactNode;
  params: Promise<{locale: string}>;
};

// This function runs at build time
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    metadataBase: new URL('https://calcu.lol'),
    title: {
      template: '%s | calcu.lol',
      default: 'Free Online Calculators | calcu.lol'
    },
    description: 'Free online calculators for speed, time, BMI, percentages, and more. Calculate anything with our comprehensive collection of tools.',
    keywords: ['calculator', 'online calculator', 'free calculator', 'speed calculator', 'BMI calculator', 'percentage calculator'],
    authors: [{name: 'calcu.lol'}],
    creator: 'calcu.lol',
    publisher: 'calcu.lol',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: `https://calcu.lol/${locale}`,
      siteName: 'calcu.lol',
      title: 'Free Online Calculators | calcu.lol',
      description: 'Free online calculators for speed, time, BMI, percentages, and more.',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'calcu.lol - Free Online Calculators',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Free Online Calculators | calcu.lol',
      description: 'Free online calculators for speed, time, BMI, percentages, and more.',
      images: ['/og-image.png'],
    },
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

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center">
                    <a href={`/${locale}`} className="text-2xl font-bold text-blue-600">
                      calcu.lol
                    </a>
                  </div>
                  <Navigation locale={locale} />
                  <LanguageSwitcher />
                </div>
              </div>
            </header>
            <main>
              {children}
            </main>
            <footer className="bg-gray-800 text-white py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <p>&copy; 2024 calcu.lol. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
