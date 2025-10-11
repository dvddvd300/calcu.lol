'use client';

import {useState, useMemo, JSX} from 'react';
import {useTranslations} from 'next-intl';
import Calculator2In1Out, {CalculatorConfig} from './Calculator2In1Out';

export default function TimeCalculatorClient() {
  const t = useTranslations('timeCalc');
  
  const [time1, setTime1] = useState('');
  const [time1Unit, setTime1Unit] = useState('hours');
  const [time2, setTime2] = useState('');
  const [time2Unit, setTime2Unit] = useState('hours');
  const [operation, setOperation] = useState('add');

  const convertToSeconds = (value: number, unit: string): number => {
    const units: {[key: string]: number} = {
      'seconds': 1,
      'minutes': 60,
      'hours': 3600,
      'days': 86400
    };
    return value * (units[unit] || 1);
  };

  const formatTime = (seconds: number): {time: number; unit: string; formatted: string | JSX.Element} => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (seconds < 60) {
      return {
        time: seconds,
        unit: t('units.seconds'),
        formatted: `${seconds} ${t('units.seconds')}`
      };
    } else if (seconds < 3600) {
      return {
        time: minutes,
        unit: t('units.minutes'),
        formatted: (
          <>
            {minutes} {t('units.minutes')}{' '}
            <span className="text-sm text-gray-500">
              ({seconds} {t('units.seconds')})
            </span>
          </>
        )
      };
    } else if (seconds < 86400) {
      return {
        time: hours,
        unit: t('units.hours'),
        formatted: (
          <>
            {hours} {t('units.hours')}{' '}
            <span className="text-sm text-gray-500">
              ({minutes} {t('units.minutes')})
            </span>
          </>
        )
      };
    } else {
      return {
        time: days,
        unit: t('units.days'),
        formatted: (
          <>
            {days} {t('units.days')}{' '}
            <span className="text-sm text-gray-500">
              ({hours} {t('units.hours')}, {minutes} {t('units.minutes')})
            </span>
          </>
        )
      };
    }
  };

  const calculateTime = (time1Value: string | number, time1UnitValue: string, time2Value: string | number, time2UnitValue: string) => {
    const numTime1 = typeof time1Value === 'string' ? parseFloat(time1Value) : time1Value;
    const numTime2 = typeof time2Value === 'string' ? parseFloat(time2Value) : time2Value;
    
    if (!numTime1 || !numTime2) {
      return null;
    }

    const time1Seconds = convertToSeconds(numTime1, time1UnitValue);
    const time2Seconds = convertToSeconds(numTime2, time2UnitValue);
    
    let resultSeconds: number;
    let operationText: string;
    
    if (operation === 'add') {
      resultSeconds = time1Seconds + time2Seconds;
      operationText = t('result.added');
    } else {
      resultSeconds = Math.abs(time1Seconds - time2Seconds);
      operationText = t('result.subtracted');
    }

    const formattedResult = formatTime(resultSeconds);

    return {
      value: formattedResult.time,
      unit: formattedResult.unit,
      formatted: (
        <div>
          <div className="text-2xl font-bold text-purple-900">
            {formattedResult.formatted}
          </div>
          <div className="text-sm text-gray-600 mt-2">
            {operationText}
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconBgColor: 'bg-gradient-to-r from-purple-600 to-pink-600',
    
    input1: {
      label: t('form.time1'),
      placeholder: t('form.time1Placeholder'),
      value: time1,
      unit: time1Unit,
      units: [
        {value: 'seconds', label: t('units.seconds')},
        {value: 'minutes', label: t('units.minutes')},
        {value: 'hours', label: t('units.hours')},
        {value: 'days', label: t('units.days')}
      ],
      onChange: setTime1,
      onUnitChange: setTime1Unit
    },
    
    input2: {
      label: t('form.time2'),
      placeholder: t('form.time2Placeholder'),
      value: time2,
      unit: time2Unit,
      units: [
        {value: 'seconds', label: t('units.seconds')},
        {value: 'minutes', label: t('units.minutes')},
        {value: 'hours', label: t('units.hours')},
        {value: 'days', label: t('units.days')}
      ],
      onChange: setTime2,
      onUnitChange: setTime2Unit
    },
    
    calculateButton: {
      text: t('form.calculate'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-r from-purple-50 to-pink-50',
      borderColor: 'border-2 border-purple-200',
      textColor: 'text-purple-900',
      iconBgColor: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    
    calculate: (time1Value: string | number, time1UnitValue: string, time2Value: string | number, time2UnitValue: string) => calculateTime(time1Value, time1UnitValue, time2Value, time2UnitValue),
    
    urlParams: {
      enabled: true,
      input1Param: 'time1',
      input1UnitParam: 'time1Unit',
      input2Param: 'time2',
      input2UnitParam: 'time2Unit'
    }
  }), [t, time1, time1Unit, time2, time2Unit, operation]);

  return (
    <div>
      <Calculator2In1Out config={config} />
      
      {/* Operation Selector */}
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            {t('form.operation')}
          </h3>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setOperation('add')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                operation === 'add'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {t('form.add')}
            </button>
            <button
              onClick={() => setOperation('subtract')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                operation === 'subtract'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
              </svg>
              {t('form.subtract')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
