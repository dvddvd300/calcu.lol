'use client';

import {useState, useMemo, JSX} from 'react';
import {useTranslations} from 'next-intl';
import Calculator2In1Out, {CalculatorConfig} from './Calculator2In1Out';

export default function DateCalculatorClient() {
  const t = useTranslations('dateCalc');
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(() => {
    // Auto-fill with current date in YYYY-MM-DD format
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const calculateDateDifference = (startDateValue: string, endDateValue: string) => {
    if (!startDateValue || !endDateValue) {
      return null;
    }

    const start = new Date(startDateValue);
    const end = new Date(endDateValue);
    
    // Validate dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return null;
    }

    // Calculate the difference in milliseconds
    const diffInMs = Math.abs(end.getTime() - start.getTime());
    
    // Calculate different units
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30.44); // Average days per month
    const diffInYears = Math.floor(diffInDays / 365.25); // Account for leap years

    // Calculate remaining days after years
    const remainingDays = diffInDays % 365;
    const remainingMonths = Math.floor(remainingDays / 30.44);

    // Determine which date is earlier/later
    const isStartEarlier = start <= end;
    const direction = isStartEarlier ? t('result.forward') : t('result.backward');

    // Format the result based on the time span
    let formattedResult: string | JSX.Element;
    
    if (diffInDays === 0) {
      formattedResult = t('result.sameDay');
    } else if (diffInDays === 1) {
      formattedResult = t('result.oneDay');
    } else if (diffInDays < 7) {
      formattedResult = `${diffInDays} ${t('result.days')}`;
    } else if (diffInDays < 30) {
      formattedResult = (
        <div>
          <div className="text-2xl font-bold text-purple-900">
            {diffInDays} {t('result.days')}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {diffInWeeks} {t('result.weeks')}
          </div>
        </div>
      );
    } else if (diffInDays < 365) {
      formattedResult = (
        <div>
          <div className="text-2xl font-bold text-purple-900">
            {diffInMonths} {t('result.months')}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {diffInDays} {t('result.days')} • {diffInWeeks} {t('result.weeks')}
          </div>
        </div>
      );
    } else {
      formattedResult = (
        <div>
          <div className="text-2xl font-bold text-purple-900">
            {diffInYears} {t('result.years')}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {remainingMonths} {t('result.months')} • {remainingDays} {t('result.days')}
          </div>
        </div>
      );
    }

    return {
      value: diffInDays,
      unit: t('result.days'),
      formatted: (
        <div>
          {formattedResult}
          <div className="text-sm text-purple-700 mt-2 font-medium">
            {direction}
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    iconBgColor: 'bg-gradient-to-r from-purple-600 to-pink-600',
    
    input1: {
      label: t('form.startDate'),
      placeholder: t('form.startDatePlaceholder'),
      value: startDate,
      type: 'date',
      onChange: setStartDate
    },
    
    input2: {
      label: t('form.endDate'),
      placeholder: t('form.endDatePlaceholder'),
      value: endDate,
      type: 'date',
      onChange: setEndDate
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-r from-purple-50 to-pink-50',
      borderColor: 'border-2 border-purple-200',
      textColor: 'text-purple-900',
      iconBgColor: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    
    calculate: (startDateValue: string, _unit1: string, endDateValue: string, _unit2: string) => calculateDateDifference(startDateValue, endDateValue),
    
    urlParams: {
      enabled: true,
      input1Param: 'startDate',
      input2Param: 'endDate'
    }
  }), [t, startDate, endDate]);

  return <Calculator2In1Out config={config} />;
}
