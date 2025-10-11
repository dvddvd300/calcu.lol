'use client';

import {useTranslations} from 'next-intl';

export default function WeightConverterExamples() {
  const t = useTranslations('weightConverter');

  const examples = [
    {
      title: t('examples.kgToPounds.title'),
      description: t('examples.kgToPounds.description'),
      value: '70',
      fromUnit: 'kilograms',
      toUnit: 'pounds',
      result: t('examples.kgToPounds.result')
    },
    {
      title: t('examples.poundsToKg.title'),
      description: t('examples.poundsToKg.description'),
      value: '150',
      fromUnit: 'pounds',
      toUnit: 'kilograms',
      result: t('examples.poundsToKg.result')
    },
    {
      title: t('examples.ouncesToGrams.title'),
      description: t('examples.ouncesToGrams.description'),
      value: '16',
      fromUnit: 'ounces',
      toUnit: 'grams',
      result: t('examples.ouncesToGrams.result')
    },
    {
      title: t('examples.gramsToOunces.title'),
      description: t('examples.gramsToOunces.description'),
      value: '500',
      fromUnit: 'grams',
      toUnit: 'ounces',
      result: t('examples.gramsToOunces.result')
    },
    {
      title: t('examples.stoneToKg.title'),
      description: t('examples.stoneToKg.description'),
      value: '10',
      fromUnit: 'stone',
      toUnit: 'kilograms',
      result: t('examples.stoneToKg.result')
    },
    {
      title: t('examples.tonsToKg.title'),
      description: t('examples.tonsToKg.description'),
      value: '2',
      fromUnit: 'tons',
      toUnit: 'kilograms',
      result: t('examples.tonsToKg.result')
    }
  ];

  return (
    <div className="mt-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {t('examples.title')}
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {t('examples.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {examples.map((example, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-orange-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3-1m-3 1l-3 9" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {example.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {example.description}
                </p>
                <div className="bg-orange-50 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-orange-900">{t('examples.valueLabel')}:</span>
                      <div className="text-orange-700">{example.value} {t(`units.${example.fromUnit}`)}</div>
                    </div>
                    <div>
                      <span className="font-medium text-orange-900">{t('examples.toLabel')}:</span>
                      <div className="text-orange-700">{t(`units.${example.toUnit}`)}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-4">
                  <div className="text-orange-900 font-medium">
                    {t('examples.result')}: {example.result}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {t('examples.features.title')}
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            {t('examples.features.subtitle')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {t('examples.features.precise.title')}
              </h4>
              <p className="text-gray-600">
                {t('examples.features.precise.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3-1m-3 1l-3 9" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {t('examples.features.versatile.title')}
              </h4>
              <p className="text-gray-600">
                {t('examples.features.versatile.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {t('examples.features.fast.title')}
              </h4>
              <p className="text-gray-600">
                {t('examples.features.fast.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

