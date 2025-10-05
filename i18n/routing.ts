import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es', 'de', 'fr'],
  defaultLocale: 'en',
  pathnames: {
    '/': {
      en: '/',
      es: '/',
      de: '/',
      fr: '/'
    },
    '/speed-calculator': {
      en: '/speed-calculator',
      es: '/calculadora-velocidad',
      de: '/geschwindigkeit-rechner',
      fr: '/calculateur-vitesse'
    },
    '/bmi-calculator': {
      en: '/bmi-calculator',
      es: '/calculadora-imc',
      de: '/bmi-rechner',
      fr: '/calculateur-imc'
    },
    '/percentage-calculator': {
      en: '/percentage-calculator',
      es: '/calculadora-porcentaje',
      de: '/prozentsatz-rechner',
      fr: '/calculateur-pourcentage'
    },
    '/tip-calculator': {
      en: '/tip-calculator',
      es: '/calculadora-propina',
      de: '/trinkgeld-rechner',
      fr: '/calculateur-pourboire'
    },
    '/age-calculator': {
      en: '/age-calculator',
      es: '/calculadora-edad',
      de: '/alter-rechner',
      fr: '/calculateur-age'
    },
    '/time-calculator': {
      en: '/time-calculator',
      es: '/calculadora-tiempo',
      de: '/zeit-rechner',
      fr: '/calculateur-temps'
    },
    '/date-calculator': {
      en: '/date-calculator',
      es: '/calculadora-fecha',
      de: '/datum-rechner',
      fr: '/calculateur-date'
    },
    '/unit-converter': {
      en: '/unit-converter',
      es: '/convertidor-unidades',
      de: '/einheiten-umrechner',
      fr: '/convertisseur-unites'
    },
    '/currency-converter': {
      en: '/currency-converter',
      es: '/convertidor-moneda',
      de: '/wahrungsrechner',
      fr: '/convertisseur-devise'
    },
    '/temperature-converter': {
      en: '/temperature-converter',
      es: '/convertidor-temperatura',
      de: '/temperatur-umrechner',
      fr: '/convertisseur-temperature'
    }
  }
});

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing.pathnames;
