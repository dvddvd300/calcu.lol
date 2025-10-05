'use client';

import Link from 'next/link';
import {useTranslations} from 'next-intl';
import {routing} from '@/i18n/routing';

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
    <nav className="hidden md:flex space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
