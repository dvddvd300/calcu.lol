'use client';

import {useState, useMemo, JSX} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import Calculator1In1Out, {Calculator1In1OutConfig} from './Calculator1In1Out';

export default function StorageCalculatorClient() {
  const t = useTranslations('storageCalc');
  const locale = useLocale();
  
  const [fromValue, setFromValue] = useState('');
  const [fromUnit, setFromUnit] = useState('gb');
  const [toUnit, setToUnit] = useState('mb');

  const convertToBytes = (value: number, unit: string): number => {
    const units: {[key: string]: number} = {
      'bytes': 1,
      'kb': 1000,
      'mb': 1000 * 1000,
      'gb': 1000 * 1000 * 1000,
      'tb': 1000 * 1000 * 1000 * 1000,
      'pb': 1000 * 1000 * 1000 * 1000 * 1000,
      'eb': 1000 * 1000 * 1000 * 1000 * 1000 * 1000,
      'zb': 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000,
      'yb': 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000
    };
    return value * (units[unit] || 1);
  };

  const convertFromBytes = (bytes: number, unit: string): number => {
    const units: {[key: string]: number} = {
      'bytes': 1,
      'kb': 1000,
      'mb': 1000 * 1000,
      'gb': 1000 * 1000 * 1000,
      'tb': 1000 * 1000 * 1000 * 1000,
      'pb': 1000 * 1000 * 1000 * 1000 * 1000,
      'eb': 1000 * 1000 * 1000 * 1000 * 1000 * 1000,
      'zb': 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000,
      'yb': 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000
    };
    return bytes / (units[unit] || 1);
  };

  const formatResult = (value: number, targetUnit: string): {value: number; unit: string; formatted: string} => {
    // Format the number with appropriate decimal places
    let formattedValue: number;
    if (value < 0.001) {
      formattedValue = Math.round(value * 1000000) / 1000000;
    } else if (value < 1) {
      formattedValue = Math.round(value * 1000) / 1000;
    } else if (value < 1000) {
      formattedValue = Math.round(value * 100) / 100;
    } else {
      formattedValue = Math.round(value * 10) / 10;
    }

    // Use the correct modern number formatting conventions
    let formattedNumber: string;
    
    if (locale === 'es') {
      // Spanish: 100 000 (thin space for thousands)
      formattedNumber = formattedValue.toLocaleString('es-ES', {
        useGrouping: true,
        minimumFractionDigits: 0,
        maximumFractionDigits: 10
      });
    } else if (locale === 'de') {
      // German: 100 000 (thin space for thousands) or 100.000 (dot)
      formattedNumber = formattedValue.toLocaleString('de-DE', {
        useGrouping: true,
        minimumFractionDigits: 0,
        maximumFractionDigits: 10
      });
    } else if (locale === 'fr') {
      // French: 100 000 (thin space for thousands)
      formattedNumber = formattedValue.toLocaleString('fr-FR', {
        useGrouping: true,
        minimumFractionDigits: 0,
        maximumFractionDigits: 10
      });
    } else {
      // English: 100,000 (comma for thousands)
      formattedNumber = formattedValue.toLocaleString('en-US', {
        useGrouping: true,
        minimumFractionDigits: 0,
        maximumFractionDigits: 10
      });
    }
    
    return {
      value: formattedValue,
      unit: targetUnit,
      formatted: `${formattedNumber} ${targetUnit}`
    };
  };

  const calculate = (fromValue: number, fromUnitValue: string, toUnitValue: string) => {
    const bytes = convertToBytes(fromValue, fromUnitValue);
    const result = convertFromBytes(bytes, toUnitValue);
    const formattedResult = formatResult(result, toUnitValue);

    return {
      value: formattedResult.value,
      unit: formattedResult.unit,
      formatted: formattedResult.formatted,
      title: t('result.title'),
      subtitle: t('result.subtitle')
    };
  };

  const config: Calculator1In1OutConfig = useMemo(() => ({
    title: t('title'),
    description: t('subtitle'),
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    iconBgColor: 'bg-gradient-to-r from-purple-600 to-pink-600',
    
    input: {
      label: t('form.fromValue'),
      placeholder: t('form.fromValuePlaceholder'),
      value: fromValue,
      unit: fromUnit,
      units: [
        {value: 'bytes', label: t('units.bytes')},
        {value: 'kb', label: t('units.kb')},
        {value: 'mb', label: t('units.mb')},
        {value: 'gb', label: t('units.gb')},
        {value: 'tb', label: t('units.tb')},
        {value: 'pb', label: t('units.pb')},
        {value: 'eb', label: t('units.eb')},
        {value: 'zb', label: t('units.zb')},
        {value: 'yb', label: t('units.yb')}
      ],
      onChange: setFromValue,
      onUnitChange: setFromUnit
    },
    
    output: {
      label: t('form.toUnit'),
      placeholder: t('form.toUnitPlaceholder'),
      unit: toUnit,
      units: [
        {value: 'bytes', label: t('units.bytes')},
        {value: 'kb', label: t('units.kb')},
        {value: 'mb', label: t('units.mb')},
        {value: 'gb', label: t('units.gb')},
        {value: 'tb', label: t('units.tb')},
        {value: 'pb', label: t('units.pb')},
        {value: 'eb', label: t('units.eb')},
        {value: 'zb', label: t('units.zb')},
        {value: 'yb', label: t('units.yb')}
      ],
      onUnitChange: setToUnit
    },
    
    calculateButton: {
      text: t('form.convert'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-r from-purple-600 to-pink-600',
      hoverColor: 'hover:from-purple-700 hover:to-pink-700',
      focusColor: 'focus:ring-purple-300'
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50',
      borderColor: 'border-2 border-green-200',
      textColor: 'text-green-900',
      iconBgColor: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    
    calculate,
    
    urlParams: {
      enabled: true,
      inputParam: 'fromValue',
      inputUnitParam: 'fromUnit',
      outputParam: 'toUnit',
      outputUnitParam: 'toUnit'
    }
  }), [t, fromValue, fromUnit, toUnit]);

  return <Calculator1In1Out config={config} />;
}
