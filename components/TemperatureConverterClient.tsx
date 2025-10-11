'use client';

import {useState, useMemo, JSX} from 'react';
import {useTranslations} from 'next-intl';
import Calculator2In1Out, {CalculatorConfig} from './Calculator2In1Out';

export default function TemperatureConverterClient() {
  const t = useTranslations('temperatureConverter');
  
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('celsius');
  const [toUnit, setToUnit] = useState('fahrenheit');

  const convertTemperature = (value: string | number, fromUnitValue: string, toUnitValue: string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (numValue === null || numValue === undefined || isNaN(numValue)) {
      return null;
    }

    // Convert to Celsius first
    let celsius: number;
    switch (fromUnitValue) {
      case 'celsius':
        celsius = numValue;
        break;
      case 'fahrenheit':
        celsius = (numValue - 32) * 5/9;
        break;
      case 'kelvin':
        celsius = numValue - 273.15;
        break;
      case 'rankine':
        celsius = (numValue - 491.67) * 5/9;
        break;
      default:
        celsius = numValue;
    }

    // Convert from Celsius to target unit
    let result: number;
    switch (toUnitValue) {
      case 'celsius':
        result = celsius;
        break;
      case 'fahrenheit':
        result = (celsius * 9/5) + 32;
        break;
      case 'kelvin':
        result = celsius + 273.15;
        break;
      case 'rankine':
        result = (celsius + 273.15) * 9/5;
        break;
      default:
        result = celsius;
    }

    // Format result
    const formattedResult = `${result.toFixed(2)}°${t(`units.${toUnitValue}`)}`;

    return {
      value: result,
      unit: t(`units.${toUnitValue}`),
      formatted: (
        <div>
          <div className="text-2xl font-bold text-orange-900">
            {formattedResult}
          </div>
          <div className="text-sm text-gray-600 mt-2">
            {t('result.convertedFrom', {value: value, fromUnit: t(`units.${fromUnitValue}`)})}
          </div>
        </div>
      ),
      title: t('result.title'),
      subtitle: t('result.subtitle')
    };
  };

  // Configuration for the calculator
  const config: CalculatorConfig = useMemo(() => ({
    title: t('title'),
    description: t('subtitle'),
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    iconBgColor: 'bg-gradient-to-r from-orange-600 to-red-600',
    
    input1: {
      label: t('form.value'),
      placeholder: t('form.valuePlaceholder'),
      value: value,
      unit: fromUnit,
      units: [
        {value: 'celsius', label: t('units.celsius')},
        {value: 'fahrenheit', label: t('units.fahrenheit')},
        {value: 'kelvin', label: t('units.kelvin')},
        {value: 'rankine', label: t('units.rankine')}
      ],
      onChange: setValue,
      onUnitChange: setFromUnit
    },
    
    input2: {
      label: t('form.toUnit'),
      placeholder: t('form.toUnitPlaceholder'),
      value: '', // Empty value for unit converters
      unit: toUnit,
      units: [
        {value: 'celsius', label: t('units.celsius')},
        {value: 'fahrenheit', label: t('units.fahrenheit')},
        {value: 'kelvin', label: t('units.kelvin')},
        {value: 'rankine', label: t('units.rankine')}
      ],
      onChange: () => {}, // Not used for output
      onUnitChange: setToUnit
    },
    
    calculateButton: {
      text: t('form.convert'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-r from-orange-600 to-red-600',
      hoverColor: 'hover:from-orange-700 hover:to-red-700',
      focusColor: 'focus:ring-orange-300'
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
      bgColor: 'bg-gradient-to-r from-green-600 to-emerald-600',
      hoverColor: 'hover:from-green-700 hover:to-emerald-700',
      focusColor: 'focus:ring-green-300'
    },
    
    result: {
      title: t('result.title'),
      subtitle: t('result.subtitle'),
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-r from-orange-50 to-red-50',
      borderColor: 'border-2 border-orange-200',
      textColor: 'text-orange-900',
      iconBgColor: 'bg-gradient-to-r from-orange-500 to-red-500'
    },
    
    calculate: (value: string | number, fromUnitValue: string, _unused: string | number, toUnitValue: string) => convertTemperature(value, fromUnitValue, toUnitValue),
    
    urlParams: {
      enabled: true,
      input1Param: 'value',
      input1UnitParam: 'fromUnit',
      input2Param: 'toUnit',
      input2UnitParam: 'toUnit'
    }
  }), [t, value, fromUnit, toUnit]);

  return <Calculator2In1Out config={config} />;
}

