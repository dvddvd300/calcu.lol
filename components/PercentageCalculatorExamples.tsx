'use client';

import { useTranslations } from 'next-intl';

export default function PercentageCalculatorExamples() {
  const t = useTranslations('percentageCalc');

  const examples = [
    {
      title: '20% of 100',
      description: 'Calculate 20% of 100',
      value: '100',
      percentage: '20',
      result: '20',
      icon: '📊'
    },
    {
      title: '15% of 250',
      description: 'Calculate 15% of 250',
      value: '250',
      percentage: '15',
      result: '37.5',
      icon: '💰'
    },
    {
      title: '25% of 80',
      description: 'Calculate 25% of 80',
      value: '80',
      percentage: '25',
      result: '20',
      icon: '📈'
    },
    {
      title: '10% of 1000',
      description: 'Calculate 10% of 1000',
      value: '1000',
      percentage: '10',
      result: '100',
      icon: '🎯'
    },
    {
      title: '50% of 200',
      description: 'Calculate 50% of 200',
      value: '200',
      percentage: '50',
      result: '100',
      icon: '⚖️'
    },
    {
      title: '75% of 120',
      description: 'Calculate 75% of 120',
      value: '120',
      percentage: '75',
      result: '90',
      icon: '📋'
    }
  ];

  return (
    <div className="mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Common Percentage Examples
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Try these common percentage calculations to see how the calculator works
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((example, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-green-200 hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-2xl mr-4">
                {example.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {example.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {example.description}
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Value:</span>
                <span className="font-semibold text-gray-900">{example.value}</span>
              </div>
              <div className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Percentage:</span>
                <span className="font-semibold text-gray-900">{example.percentage}%</span>
              </div>
              <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <span className="text-sm font-medium text-green-700">Result:</span>
                <span className="font-bold text-green-900 text-lg">{example.result}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-200">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-green-900 mb-4">
            Percentage Calculation Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 mt-1">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Basic Percentage</h4>
                  <p className="text-green-700 text-sm">
                    To find X% of a number, multiply the number by X and divide by 100.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 mt-1">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Percentage Increase</h4>
                  <p className="text-green-700 text-sm">
                    To increase a number by X%, multiply by (1 + X/100).
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 mt-1">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Percentage Decrease</h4>
                  <p className="text-green-700 text-sm">
                    To decrease a number by X%, multiply by (1 - X/100).
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 mt-1">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Reverse Calculation</h4>
                  <p className="text-green-700 text-sm">
                    To find what percentage X is of Y, divide X by Y and multiply by 100.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
