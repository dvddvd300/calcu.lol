import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'calcu.lol - Free Online Calculators',
  description: 'Free online calculators for speed, time, percentages, and more. Calculate anything with our comprehensive collection of tools.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
