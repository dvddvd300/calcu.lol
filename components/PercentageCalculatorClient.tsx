'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Calculator2In1Out, { CalculatorConfig } from './Calculator2In1Out';

export default function PercentageCalculatorClient() {
  const t = useTranslations('percentageCalc');
  
  const [value, setValue] = useState('');
  const [percentage, setPercentage] = useState('');
  const [valueUnit, setValueUnit] = useState('number');
  const [percentageUnit, setPercentageUnit] = useState('percent');

  const calculatePercentage = (inputValue: string | number, inputValueUnit: string, inputPercentage: string | number, inputPercentageUnit: string) => {
    const numInputValue = typeof inputValue === 'string' ? parseFloat(inputValue) : inputValue;
    const numInputPercentage = typeof inputPercentage === 'string' ? parseFloat(inputPercentage) : inputPercentage;
    
    if (!numInputValue || numInputValue <= 0 || !numInputPercentage || numInputPercentage < 0) return null;

    let result: number;
    let title: string;
    let subtitle: string;

    if (inputPercentageUnit === 'percent') {
      // Calculate percentage of value
      result = (numInputValue * numInputPercentage) / 100;
      title = t('result.percentage');
      subtitle = `${numInputPercentage}% of ${numInputValue.toLocaleString()}`;
    } else {
      // Calculate percentage from two values
      result = (numInputPercentage / numInputValue) * 100;
      title = t('result.percentage');
      subtitle = `${numInputPercentage} is ${result.toFixed(2)}% of ${numInputValue.toLocaleString()}`;
    }

    return {
      value: result,
      unit: inputValueUnit,
      formatted: result.toLocaleString(undefined, { 
        maximumFractionDigits: 2,
        minimumFractionDigits: 0 
      }),
      title,
      subtitle
    };
  };

  const config: CalculatorConfig = {
    title: t('title'),
    description: t('subtitle'),
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    iconBgColor: 'bg-gradient-to-r from-green-600 to-emerald-600',

    input1: {
      label: t('form.value'),
      placeholder: t('form.value'),
      value,
      unit: valueUnit,
      units: [
        { value: 'number', label: 'Number' },
        { value: 'currency', label: 'Currency' },
        { value: 'people', label: 'People' }
      ],
      onChange: setValue,
      onUnitChange: setValueUnit
    },

    input2: {
      label: t('form.percentage'),
      placeholder: t('form.percentage'),
      value: percentage,
      unit: percentageUnit,
      units: [
        { value: 'percent', label: '%' },
        { value: 'number', label: 'Number' }
      ],
      onChange: setPercentage,
      onUnitChange: setPercentageUnit
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
      text: 'Share',
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
      subtitle: t('result.value'),
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50',
      borderColor: 'border-2 border-green-200',
      textColor: 'text-green-900',
      iconBgColor: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },

    calculate: calculatePercentage,

    urlParams: {
      enabled: true,
      input1Param: 'value',
      input1UnitParam: 'valueUnit',
      input2Param: 'percentage',
      input2UnitParam: 'percentageUnit'
    }
  };

  return <Calculator2In1Out config={config} />;
}
