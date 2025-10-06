import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing, type Locale} from '@/i18n/routing';
import {setRequestLocale} from 'next-intl/server';
import {ReactNode} from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Navigation from '@/components/Navigation';
import '../globals.css';

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
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                  <div className="flex items-center">
                    <a 
                      href={`/${locale}`} 
                      className="flex items-center space-x-3 text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span>calcu.lol</span>
                    </a>
                  </div>
                  <Navigation locale={locale} />
                  <LanguageSwitcher />
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="relative">
              {children}
            </main>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-2xl font-bold">calcu.lol</span>
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                      Free online calculators for speed, time, BMI, percentages, and more. 
                      Calculate anything with our comprehensive collection of tools.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Calculators</h3>
                    <ul className="space-y-2">
                      <li><a href={`/${locale}/speed-calculator`} className="text-gray-300 hover:text-white transition-colors duration-200">Speed Calculator</a></li>
                      <li><a href={`/${locale}/bmi-calculator`} className="text-gray-300 hover:text-white transition-colors duration-200">BMI Calculator</a></li>
                      <li><a href={`/${locale}/percentage-calculator`} className="text-gray-300 hover:text-white transition-colors duration-200">Percentage Calculator</a></li>
                      <li><a href={`/${locale}/tip-calculator`} className="text-gray-300 hover:text-white transition-colors duration-200">Tip Calculator</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Support</h3>
                    <ul className="space-y-2">
                      <li><a href={`/${locale}/about`} className="text-gray-300 hover:text-white transition-colors duration-200">About</a></li>
                      <li><a href={`/${locale}/contact`} className="text-gray-300 hover:text-white transition-colors duration-200">Contact</a></li>
                      <li><a href={`/${locale}/privacy`} className="text-gray-300 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                      <li><a href={`/${locale}/terms`} className="text-gray-300 hover:text-white transition-colors duration-200">Terms of Service</a></li>
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 mt-12 pt-8">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                      &copy; 2024 calcu.lol. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                      <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                        <span className="sr-only">Twitter</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                        <span className="sr-only">GitHub</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
