'use client';

import { useTranslations } from 'next-intl';

export default function TipCalculatorExamples() {
  const t = useTranslations('tipCalc');

  const examples = [
    {
      title: '15% Tip on $50',
      description: 'Standard restaurant tip',
      billAmount: '50',
      tipPercentage: '15',
      tipAmount: '7.50',
      totalBill: '57.50',
      icon: '🍽️'
    },
    {
      title: '20% Tip on $75',
      description: 'Good service tip',
      billAmount: '75',
      tipPercentage: '20',
      tipAmount: '15.00',
      totalBill: '90.00',
      icon: '⭐'
    },
    {
      title: '18% Tip on $120',
      description: 'Group dinner tip',
      billAmount: '120',
      tipPercentage: '18',
      tipAmount: '21.60',
      totalBill: '141.60',
      icon: '👥'
    },
    {
      title: '10% Tip on $30',
      description: 'Basic service tip',
      billAmount: '30',
      tipPercentage: '10',
      tipAmount: '3.00',
      totalBill: '33.00',
      icon: '☕'
    },
    {
      title: '25% Tip on $40',
      description: 'Excellent service tip',
      billAmount: '40',
      tipPercentage: '25',
      tipAmount: '10.00',
      totalBill: '50.00',
      icon: '🌟'
    },
    {
      title: '12% Tip on $80',
      description: 'Average service tip',
      billAmount: '80',
      tipPercentage: '12',
      tipAmount: '9.60',
      totalBill: '89.60',
      icon: '🍕'
    }
  ];

  return (
    <div className="mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {t('examples.title')}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t('examples.subtitle')}
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
                <span className="text-sm font-medium text-gray-600">Bill Amount:</span>
                <span className="font-semibold text-gray-900">${example.billAmount}</span>
              </div>
              <div className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Tip Percentage:</span>
                <span className="font-semibold text-gray-900">{example.tipPercentage}%</span>
              </div>
              <div className="flex justify-between items-center py-2 px-4 bg-green-50 rounded-lg border border-green-200">
                <span className="text-sm font-medium text-green-700">Tip Amount:</span>
                <span className="font-bold text-green-900">${example.tipAmount}</span>
              </div>
              <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <span className="text-sm font-medium text-green-700">Total Bill:</span>
                <span className="font-bold text-green-900 text-lg">${example.totalBill}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-200">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-green-900 mb-4">
            Tip Calculation Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 mt-1">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Standard Tips</h4>
                  <p className="text-green-700 text-sm">
                    15-20% for restaurants, 10-15% for delivery, 15-20% for taxis.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 mt-1">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Service Quality</h4>
                  <p className="text-green-700 text-sm">
                    Adjust tip based on service quality: poor (10%), good (15-18%), excellent (20%+).
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
                  <h4 className="font-semibold text-green-900 mb-1">Group Dining</h4>
                  <p className="text-green-700 text-sm">
                    For large groups (6+ people), consider 18-20% as many restaurants add automatic gratuity.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 mt-1">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Split Bills</h4>
                  <p className="text-green-700 text-sm">
                    Calculate tip on the total bill, then divide equally among all diners.
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
