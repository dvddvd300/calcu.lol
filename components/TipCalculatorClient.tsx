'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Calculator2In1Out, { CalculatorConfig } from './Calculator2In1Out';

export default function TipCalculatorClient() {
  const t = useTranslations('tipCalc');
  
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState('');
  const [people, setPeople] = useState('1');
  const [billUnit, setBillUnit] = useState('currency');
  const [tipUnit, setTipUnit] = useState('percent');

  const calculateTip = (billValue: string | number, billUnit: string, tipValue: string | number, tipUnit: string) => {
    const numBillValue = typeof billValue === 'string' ? parseFloat(billValue) : billValue;
    const numTipValue = typeof tipValue === 'string' ? parseFloat(tipValue) : tipValue;
    
    if (!numBillValue || numBillValue <= 0 || !numTipValue || numTipValue < 0) return null;

    let tipAmount: number;
    let totalBill: number;
    let totalPerPerson: number;
    let peopleCount = parseInt(people) || 1;

    if (tipUnit === 'percent') {
      // Calculate tip as percentage of bill
      tipAmount = (numBillValue * numTipValue) / 100;
    } else {
      // Calculate tip as fixed amount
      tipAmount = numTipValue;
    }

    totalBill = numBillValue + tipAmount;
    totalPerPerson = totalBill / peopleCount;

    const result = {
      value: totalPerPerson,
      unit: billUnit,
      formatted: `$${totalPerPerson.toFixed(2)}`,
      title: t('result.totalPerPerson'),
      subtitle: `${t('result.tipAmount')}: $${tipAmount.toFixed(2)} | ${t('result.totalBill')}: $${totalBill.toFixed(2)}`
    };

    return result;
  };

  const config: CalculatorConfig = {
    title: t('title'),
    description: t('subtitle'),
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    iconBgColor: 'bg-gradient-to-r from-green-600 to-emerald-600',

    input1: {
      label: t('form.billAmount'),
      placeholder: t('form.billAmount'),
      value: billAmount,
      unit: billUnit,
      units: [
        { value: 'currency', label: '$' },
        { value: 'euro', label: '€' },
        { value: 'pound', label: '£' }
      ],
      onChange: setBillAmount,
      onUnitChange: setBillUnit
    },

    input2: {
      label: t('form.tipPercentage'),
      placeholder: t('form.tipPercentage'),
      value: tipPercentage,
      unit: tipUnit,
      units: [
        { value: 'percent', label: '%' },
        { value: 'amount', label: 'Amount' }
      ],
      onChange: setTipPercentage,
      onUnitChange: setTipUnit
    },

    calculateButton: {
      text: t('form.calculate'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-r from-green-600 to-emerald-600',
      hoverColor: 'hover:from-green-700 hover:to-emerald-700',
      focusColor: 'focus:ring-green-300'
    },

    resetButton: {
      text: t('form.reset'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      bgColor: 'bg-gray-100 text-gray-700',
      hoverColor: 'hover:bg-gray-200',
      focusColor: 'focus:ring-gray-300'
    },

    shareButton: {
      text: t('form.share'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      hoverColor: 'hover:from-blue-700 hover:to-indigo-700',
      focusColor: 'focus:ring-blue-300'
    },

    result: {
      title: t('result.title'),
      subtitle: t('result.tipAmount'),
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50',
      borderColor: 'border-2 border-green-200',
      textColor: 'text-green-900',
      iconBgColor: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },

    calculate: calculateTip,

    urlParams: {
      enabled: true,
      input1Param: 'billAmount',
      input1UnitParam: 'billUnit',
      input2Param: 'tipPercentage',
      input2UnitParam: 'tipUnit'
    }
  };

  return (
    <div>
      <Calculator2In1Out config={config} />
      
      {/* Additional People Input */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('form.people')}
            </h3>
            <p className="text-lg text-gray-600">
              {t('form.peopleDescription')}
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              {t('form.people')}
            </label>
            <div className="flex rounded-2xl overflow-hidden shadow-lg border border-gray-200 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition-all duration-300">
              <input
                type="number"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                placeholder={t('form.peoplePlaceholder')}
                min="1"
                className="flex-1 px-6 py-4 text-lg focus:outline-none bg-white"
              />
              <div className="px-6 py-4 text-lg bg-gray-50 border-l border-gray-200 font-medium flex items-center">
                👥
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
