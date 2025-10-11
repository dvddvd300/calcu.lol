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
    '/ti/speed-calculator': {
      en: '/ti/speed-calculator',
      es: '/ti/calculadora-velocidad',
      de: '/ti/geschwindigkeit-rechner',
      fr: '/ti/calculateur-vitesse'
    },
    '/math/percentage-calculator': {
      en: '/math/percentage-calculator',
      es: '/matematicas/calculadora-porcentaje',
      de: '/mathematik/prozentsatz-rechner',
      fr: '/mathematiques/calculateur-pourcentage'
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
    },
    '/calculators': {
      en: '/calculators',
      es: '/calculadoras',
      de: '/rechner',
      fr: '/calculateurs'
    },
    '/finance/tip-calculator': {
      en: '/finance/tip-calculator',
      es: '/finanzas/calculadora-propina',
      de: '/finanzen/trinkgeld-rechner',
      fr: '/finance/calculateur-pourboire'
    },
    '/time/age-calculator': {
      en: '/time/age-calculator',
      es: '/tiempo/calculadora-edad',
      de: '/zeit/alter-rechner',
      fr: '/temps/calculateur-age'
    },
    '/time/date-calculator': {
      en: '/time/date-calculator',
      es: '/tiempo/calculadora-fecha',
      de: '/zeit/datum-rechner',
      fr: '/temps/calculateur-date'
    },
    '/time/time-calculator': {
      en: '/time/time-calculator',
      es: '/tiempo/calculadora-tiempo',
      de: '/zeit/zeit-rechner',
      fr: '/temps/calculateur-temps'
    },
    '/conversion/distance-converter': {
      en: '/conversion/distance-converter',
      es: '/conversion/convertidor-distancia',
      de: '/umrechnung/entfernung-umrechner',
      fr: '/conversion/convertisseur-distance'
    },
    '/conversion/weight-converter': {
      en: '/conversion/weight-converter',
      es: '/conversion/convertidor-peso',
      de: '/umrechnung/gewicht-umrechner',
      fr: '/conversion/convertisseur-poids'
    },
    '/conversion/temperature-converter': {
      en: '/conversion/temperature-converter',
      es: '/conversion/convertidor-temperatura',
      de: '/umrechnung/temperatur-umrechner',
      fr: '/conversion/convertisseur-temperature'
    },
    '/conversion/speed-converter': {
      en: '/conversion/speed-converter',
      es: '/conversion/convertidor-velocidad',
      de: '/umrechnung/geschwindigkeit-umrechner',
      fr: '/conversion/convertisseur-vitesse'
    }
  }
});

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing.pathnames;
