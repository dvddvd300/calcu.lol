'use client';

import {useTranslations} from 'next-intl';

export default function CountdownTimerExamples() {
  const t = useTranslations('countdownTimer');

  const examples = [
    {
      title: t('examples.events.title'),
      description: t('examples.events.description'),
      scenarios: [
        {
          input: t('examples.events.scenario1.input'),
          output: t('examples.events.scenario1.output'),
          explanation: t('examples.events.scenario1.explanation')
        },
        {
          input: t('examples.events.scenario2.input'),
          output: t('examples.events.scenario2.output'),
          explanation: t('examples.events.scenario2.explanation')
        }
      ]
    },
    {
      title: t('examples.deadlines.title'),
      description: t('examples.deadlines.description'),
      scenarios: [
        {
          input: t('examples.deadlines.scenario1.input'),
          output: t('examples.deadlines.scenario1.output'),
          explanation: t('examples.deadlines.scenario1.explanation')
        },
        {
          input: t('examples.deadlines.scenario2.input'),
          output: t('examples.deadlines.scenario2.output'),
          explanation: t('examples.deadlines.scenario2.explanation')
        }
      ]
    },
    {
      title: t('examples.personal.title'),
      description: t('examples.personal.description'),
      scenarios: [
        {
          input: t('examples.personal.scenario1.input'),
          output: t('examples.personal.scenario1.output'),
          explanation: t('examples.personal.scenario1.explanation')
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {t('examples.title')}
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {t('examples.subtitle')}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {examples.map((example, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {example.title}
              </h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              {example.description}
            </p>

            <div className="space-y-4">
              {example.scenarios.map((scenario, scenarioIndex) => (
                <div key={scenarioIndex} className="bg-gray-50 rounded-lg p-4">
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      {t('examples.input')}
                    </span>
                    <p className="text-gray-900 font-medium">
                      {scenario.input}
                    </p>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      {t('examples.output')}
                    </span>
                    <p className="text-orange-600 font-medium">
                      {scenario.output}
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      {t('examples.explanation')}
                    </span>
                    <p className="text-gray-700 text-sm">
                      {scenario.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {t('examples.tips.title')}
          </h3>
          <p className="text-gray-600 mb-6">
            {t('examples.tips.description')}
          </p>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium text-gray-900">{t('examples.tips.tip1.title')}</span>
              </div>
              <p className="text-sm text-gray-600">{t('examples.tips.tip1.description')}</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium text-gray-900">{t('examples.tips.tip2.title')}</span>
              </div>
              <p className="text-sm text-gray-600">{t('examples.tips.tip2.description')}</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium text-gray-900">{t('examples.tips.tip3.title')}</span>
              </div>
              <p className="text-sm text-gray-600">{t('examples.tips.tip3.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
