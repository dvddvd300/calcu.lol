'use client';

import {useTranslations} from 'next-intl';

export default function TemperatureConverterExamples() {
  const t = useTranslations('temperatureConverter');

  const examples = [
    {
      title: t('examples.celsiusToFahrenheit.title'),
      description: t('examples.celsiusToFahrenheit.description'),
      value: '25',
      fromUnit: 'celsius',
      toUnit: 'fahrenheit',
      result: t('examples.celsiusToFahrenheit.result')
    },
    {
      title: t('examples.fahrenheitToCelsius.title'),
      description: t('examples.fahrenheitToCelsius.description'),
      value: '77',
      fromUnit: 'fahrenheit',
      toUnit: 'celsius',
      result: t('examples.fahrenheitToCelsius.result')
    },
    {
      title: t('examples.celsiusToKelvin.title'),
      description: t('examples.celsiusToKelvin.description'),
      value: '0',
      fromUnit: 'celsius',
      toUnit: 'kelvin',
      result: t('examples.celsiusToKelvin.result')
    },
    {
      title: t('examples.kelvinToCelsius.title'),
      description: t('examples.kelvinToCelsius.description'),
      value: '273.15',
      fromUnit: 'kelvin',
      toUnit: 'celsius',
      result: t('examples.kelvinToCelsius.result')
    },
    {
      title: t('examples.fahrenheitToKelvin.title'),
      description: t('examples.fahrenheitToKelvin.description'),
      value: '32',
      fromUnit: 'fahrenheit',
      toUnit: 'kelvin',
      result: t('examples.fahrenheitToKelvin.result')
    },
    {
      title: t('examples.rankineToCelsius.title'),
      description: t('examples.rankineToCelsius.description'),
      value: '491.67',
      fromUnit: 'rankine',
      toUnit: 'celsius',
      result: t('examples.rankineToCelsius.result')
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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
                      <div className="text-orange-700">{example.value}°{t(`units.${example.fromUnit}`)}</div>
                    </div>
                    <div>
                      <span className="font-medium text-orange-900">{t('examples.toLabel')}:</span>
                      <div className="text-orange-700">°{t(`units.${example.toUnit}`)}</div>
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
                {t('examples.features.scientific.title')}
              </h4>
              <p className="text-gray-600">
                {t('examples.features.scientific.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {t('examples.features.accurate.title')}
              </h4>
              <p className="text-gray-600">
                {t('examples.features.accurate.description')}
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

