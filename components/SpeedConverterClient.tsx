'use client';

import {useState, useMemo, JSX} from 'react';
import {useTranslations} from 'next-intl';
import Calculator2In1Out, {CalculatorConfig} from './Calculator2In1Out';

export default function SpeedConverterClient() {
  const t = useTranslations('speedConverter');
  
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('kmh');
  const [toUnit, setToUnit] = useState('mph');

  const convertSpeed = (value: string | number, fromUnitValue: string, toUnitValue: string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (!numValue || numValue <= 0) {
      return null;
    }

    // Convert to m/s first
    const msPerUnit: {[key: string]: number} = {
      'mps': 1, // meters per second
      'kmh': 1000/3600, // kilometers per hour (1000m/3600s = 0.2778 m/s)
      'mph': 1609.344/3600, // miles per hour (1 mile = 1609.344m)
      'fps': 0.3048, // feet per second (1ft = 0.3048m)
      'knots': 1852/3600, // knots (1 nautical mile = 1852m)
      'mach': 343 // mach (speed of sound at sea level)
    };

    const valueInMs = numValue * (msPerUnit[fromUnitValue] || 1);
    const result = valueInMs / (msPerUnit[toUnitValue] || 1);

    // Format result based on magnitude
    let formattedResult: string | JSX.Element;
    
    if (result >= 1000) {
      formattedResult = `${(result / 1000).toFixed(2)}K ${t(`units.${toUnitValue}`)}`;
    } else if (result >= 1) {
      formattedResult = `${result.toFixed(2)} ${t(`units.${toUnitValue}`)}`;
    } else {
      formattedResult = `${result.toFixed(6)} ${t(`units.${toUnitValue}`)}`;
    }

    return {
      value: result,
      unit: t(`units.${toUnitValue}`),
      formatted: (
        <div>
          <div className="text-2xl font-bold text-orange-900">
            {formattedResult}
          </div>
          <div className="text-sm text-gray-600 mt-2">
            {t('result.convertedFrom', {value: numValue, fromUnit: t(`units.${fromUnitValue}`)})}
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    iconBgColor: 'bg-gradient-to-r from-orange-600 to-red-600',
    
    input1: {
      label: t('form.value'),
      placeholder: t('form.valuePlaceholder'),
      value: value,
      unit: fromUnit,
      units: [
        {value: 'mps', label: t('units.mps')},
        {value: 'kmh', label: t('units.kmh')},
        {value: 'mph', label: t('units.mph')},
        {value: 'fps', label: t('units.fps')},
        {value: 'knots', label: t('units.knots')},
        {value: 'mach', label: t('units.mach')}
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
        {value: 'mps', label: t('units.mps')},
        {value: 'kmh', label: t('units.kmh')},
        {value: 'mph', label: t('units.mph')},
        {value: 'fps', label: t('units.fps')},
        {value: 'knots', label: t('units.knots')},
        {value: 'mach', label: t('units.mach')}
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-r from-orange-50 to-red-50',
      borderColor: 'border-2 border-orange-200',
      textColor: 'text-orange-900',
      iconBgColor: 'bg-gradient-to-r from-orange-500 to-red-500'
    },
    
    calculate: (value: string | number, fromUnitValue: string, _unused: string | number, toUnitValue: string) => convertSpeed(value, fromUnitValue, toUnitValue),
    
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

