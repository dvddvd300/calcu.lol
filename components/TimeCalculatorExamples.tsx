'use client';

import {useTranslations} from 'next-intl';

export default function TimeCalculatorExamples() {
  const t = useTranslations('timeCalc');

  const examples = [
    {
      title: t('examples.addition.title'),
      description: t('examples.addition.description'),
      time1: '2',
      time1Unit: 'hours',
      time2: '30',
      time2Unit: 'minutes',
      operation: 'add',
      result: t('examples.addition.result')
    },
    {
      title: t('examples.subtraction.title'),
      description: t('examples.subtraction.description'),
      time1: '3',
      time1Unit: 'hours',
      time2: '45',
      time2Unit: 'minutes',
      operation: 'subtract',
      result: t('examples.subtraction.result')
    },
    {
      title: t('examples.mixedUnits.title'),
      description: t('examples.mixedUnits.description'),
      time1: '1',
      time1Unit: 'days',
      time2: '6',
      time2Unit: 'hours',
      operation: 'add',
      result: t('examples.mixedUnits.result')
    },
    {
      title: t('examples.largeNumbers.title'),
      description: t('examples.largeNumbers.description'),
      time1: '2',
      time1Unit: 'days',
      time2: '12',
      time2Unit: 'hours',
      operation: 'add',
      result: t('examples.largeNumbers.result')
    },
    {
      title: t('examples.seconds.title'),
      description: t('examples.seconds.description'),
      time1: '3600',
      time1Unit: 'seconds',
      time2: '30',
      time2Unit: 'minutes',
      operation: 'add',
      result: t('examples.seconds.result')
    },
    {
      title: t('examples.negativeResult.title'),
      description: t('examples.negativeResult.description'),
      time1: '1',
      time1Unit: 'hours',
      time2: '2',
      time2Unit: 'hours',
      operation: 'subtract',
      result: t('examples.negativeResult.result')
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
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                <div className="bg-purple-50 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-purple-900">{t('examples.time1Label')}:</span>
                      <div className="text-purple-700">{example.time1} {t(`units.${example.time1Unit}`)}</div>
                    </div>
                    <div>
                      <span className="font-medium text-purple-900">{t('examples.time2Label')}:</span>
                      <div className="text-purple-700">{example.time2} {t(`units.${example.time2Unit}`)}</div>
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium text-purple-900">{t('examples.operationLabel')}:</span>
                      <div className="text-purple-700">{t(`form.${example.operation}`)}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4">
                  <div className="text-purple-900 font-medium">
                    {t('examples.result')}: {example.result}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {t('examples.features.title')}
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            {t('examples.features.subtitle')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {t('examples.features.flexible.title')}
              </h4>
              <p className="text-gray-600">
                {t('examples.features.flexible.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {t('examples.features.smart.title')}
              </h4>
              <p className="text-gray-600">
                {t('examples.features.smart.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
