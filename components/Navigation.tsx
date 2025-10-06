'use client';

import Link from 'next/link';
import {useTranslations} from 'next-intl';

type Props = {
  locale: string;
};

export default function Navigation({locale}: Props) {
  const t = useTranslations('common.navigation');

  const navItems = [
    {
      key: 'home',
      label: t('home'),
      href: `/${locale}`
    },
    {
      key: 'calculators',
      label: t('calculators'),
      href: `/${locale}/calculators`
    },
    {
      key: 'about',
      label: t('about'),
      href: `/${locale}/about`
    },
    {
      key: 'contact',
      label: t('contact'),
      href: `/${locale}/contact`
    }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-2">
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="relative px-4 py-2 text-gray-700 hover:text-blue-600 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-50 group"
          >
            <span className="relative z-10">{item.label}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button className="p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </>
  );
}
