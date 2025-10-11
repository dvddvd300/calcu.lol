'use client';

import {useTranslations} from 'next-intl';

export default function SpeedConverterExamples() {
  const t = useTranslations('speedConverter');

  const examples = [
    {
      title: t('examples.kmhToMph.title'),
      description: t('examples.kmhToMph.description'),
      value: '100',
      fromUnit: 'kmh',
      toUnit: 'mph',
      result: t('examples.kmhToMph.result')
    },
    {
      title: t('examples.mphToKmh.title'),
      description: t('examples.mphToKmh.description'),
      value: '60',
      fromUnit: 'mph',
      toUnit: 'kmh',
      result: t('examples.mphToKmh.result')
    },
    {
      title: t('examples.mpsToKmh.title'),
      description: t('examples.mpsToKmh.description'),
      value: '10',
      fromUnit: 'mps',
      toUnit: 'kmh',
      result: t('examples.mpsToKmh.result')
    },
    {
      title: t('examples.knotsToMph.title'),
      description: t('examples.knotsToMph.description'),
      value: '30',
      fromUnit: 'knots',
      toUnit: 'mph',
      result: t('examples.knotsToMph.result')
    },
    {
      title: t('examples.fpsToMph.title'),
      description: t('examples.fpsToMph.description'),
      value: '88',
      fromUnit: 'fps',
      toUnit: 'mph',
      result: t('examples.fpsToMph.result')
    },
    {
      title: t('examples.machToKmh.title'),
      description: t('examples.machToKmh.description'),
      value: '1',
      fromUnit: 'mach',
      toUnit: 'kmh',
      result: t('examples.machToKmh.result')
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {t('examples.features.comprehensive.title')}
              </h4>
              <p className="text-gray-600">
                {t('examples.features.comprehensive.description')}
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

