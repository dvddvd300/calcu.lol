'use client';

import {useState, useMemo, JSX} from 'react';
import {useTranslations} from 'next-intl';
import Calculator2In1Out, {CalculatorConfig} from './Calculator2In1Out';

export default function AgeCalculatorClient() {
  const t = useTranslations('ageCalc');
  
  const [birthday, setBirthday] = useState('');
  const [currentDate, setCurrentDate] = useState(() => {
    // Auto-fill with current date in YYYY-MM-DD format
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const calculateAge = (birthdayValue: string, currentDateValue: string) => {
    if (!birthdayValue || !currentDateValue) {
      return null;
    }

    const birthDate = new Date(birthdayValue);
    const today = new Date(currentDateValue);
    
    // Validate dates
    if (isNaN(birthDate.getTime()) || isNaN(today.getTime())) {
      return null;
    }

    // Check if birthday is in the future
    if (birthDate > today) {
      return {
        value: 0,
        unit: t('result.years'),
        formatted: t('result.futureBirthday'),
        title: t('result.title'),
        subtitle: t('result.futureSubtitle')
      };
    }

    // Calculate age
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Adjust age if birthday hasn't occurred this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    // Calculate days until next birthday or days since last birthday
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday <= today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const daysUntilNext = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const daysSinceLast = Math.ceil((today.getTime() - new Date(today.getFullYear() - (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? 1 : 0), birthDate.getMonth(), birthDate.getDate()).getTime()) / (1000 * 60 * 60 * 24));

    // Determine what to show based on the 3-month rule
    const threeMonthsAgo = new Date(today);
    threeMonthsAgo.setMonth(today.getMonth() - 3);
    
    const lastBirthday = new Date(today.getFullYear() - (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? 1 : 0), birthDate.getMonth(), birthDate.getDate());
    
    let birthdayInfo: string | JSX.Element;
    if (lastBirthday >= threeMonthsAgo) {
      // Show days since last birthday (within 3 months)
      birthdayInfo = (
        <div className="text-sm text-gray-600 mt-2">
          {t('result.daysSinceBirthday', {days: daysSinceLast})}
        </div>
      );
    } else {
      // Show days until next birthday (more than 3 months ago)
      birthdayInfo = (
        <div className="text-sm text-gray-600 mt-2">
          {t('result.daysUntilBirthday', {days: daysUntilNext})}
        </div>
      );
    }

    return {
      value: age,
      unit: t('result.years'),
      formatted: (
        <div>
          <div className="text-2xl font-bold text-purple-900">
            {age} {t('result.years')}
          </div>
          {birthdayInfo}
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
      label: t('form.birthday'),
      placeholder: t('form.birthdayPlaceholder'),
      value: birthday,
      type: 'date',
      onChange: setBirthday
    },
    
    input2: {
      label: t('form.currentDate'),
      placeholder: t('form.currentDatePlaceholder'),
      value: currentDate,
      type: 'date',
      onChange: setCurrentDate
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
    
    calculate: (birthdayValue: string, _unit1: string, currentDateValue: string, _unit2: string) => calculateAge(birthdayValue, currentDateValue),
    
    urlParams: {
      enabled: true,
      input1Param: 'birthday',
      input2Param: 'currentDate'
    }
  }), [t, birthday, currentDate]);

  return <Calculator2In1Out config={config} />;
}
