'use client';

import {useState, useMemo, useEffect, JSX} from 'react';
import {useTranslations} from 'next-intl';
import Calculator2In1Out, {CalculatorConfig} from './Calculator2In1Out';

export default function CountdownTimerClient() {
  const t = useTranslations('countdownTimer');
  
  const [targetDate, setTargetDate] = useState('');
  const [targetTime, setTargetTime] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
  } | null>(null);

  // Auto-fill with current date and time + 1 hour
  useEffect(() => {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
    
    if (!targetDate) {
      setTargetDate(now.toISOString().split('T')[0]);
    }
    if (!targetTime) {
      setTargetTime(oneHourLater.toTimeString().slice(0, 5));
    }
  }, [targetDate, targetTime]);

  // Countdown timer effect - runs continuously when target date/time is set
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (targetDate && targetTime) {
      // Always calculate and display the countdown, regardless of isRunning state
      const updateCountdown = () => {
        const target = new Date(`${targetDate}T${targetTime}`);
        const now = new Date();
        const diff = target.getTime() - now.getTime();
        
        if (diff <= 0) {
          setTimeLeft({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            total: 0
          });
          setIsRunning(false);
          return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          total: diff
        });
      };
      
      // Update immediately
      updateCountdown();
      
      // Then update every second
      interval = setInterval(updateCountdown, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [targetDate, targetTime]);

  const startCountdown = () => {
    if (!targetDate || !targetTime) return;
    
    const target = new Date(`${targetDate}T${targetTime}`);
    const now = new Date();
    
    if (target <= now) {
      alert(t('errors.pastDate'));
      return;
    }
    
    setIsRunning(true);
  };

  const stopCountdown = () => {
    setIsRunning(false);
  };

  const resetCountdown = () => {
    setIsRunning(false);
    setTimeLeft(null);
    setTargetDate('');
    setTargetTime('');
  };

  const formatTimeLeft = (timeLeft: {days: number; hours: number; minutes: number; seconds: number; total: number}) => {
    const {days, hours, minutes, seconds, total} = timeLeft;
    
    if (total <= 0) {
      return (
        <div className="text-center">
          <div className="text-4xl font-bold text-red-600 mb-4">
            {t('result.timeUp')}
          </div>
          <div className="text-lg text-gray-600">
            {t('result.countdownComplete')}
          </div>
        </div>
      );
    }
    
    return (
      <div className="text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold mb-2">{days.toString().padStart(2, '0')}</div>
            <div className="text-sm opacity-90 font-medium">{t('result.days')}</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold mb-2">{hours.toString().padStart(2, '0')}</div>
            <div className="text-sm opacity-90 font-medium">{t('result.hours')}</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold mb-2">{minutes.toString().padStart(2, '0')}</div>
            <div className="text-sm opacity-90 font-medium">{t('result.minutes')}</div>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold mb-2 animate-pulse">{seconds.toString().padStart(2, '0')}</div>
            <div className="text-sm opacity-90 font-medium">{t('result.seconds')}</div>
          </div>
        </div>
        
        <div className="text-lg text-gray-600 mb-4 flex items-center justify-center">
          <span className="mr-2">{t('result.timeRemaining')}</span>
          {isRunning ? (
            <div className="flex items-center text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
              <span className="text-sm font-medium">{t('form.running')}</span>
            </div>
          ) : (
            <div className="flex items-center text-orange-600">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-1"></div>
              <span className="text-sm font-medium">{t('form.paused')}</span>
            </div>
          )}
        </div>
        
        {total > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-red-500 h-2 rounded-full transition-all duration-1000"
              style={{width: `${Math.max(0, Math.min(100, (total / (24 * 60 * 60 * 1000)) * 100))}%`}}
            ></div>
          </div>
        )}
      </div>
    );
  };

  const calculateCountdown = (dateValue: string | number, timeValue: string | number) => {
    if (!dateValue || !timeValue) {
      return null;
    }

    const target = new Date(`${dateValue}T${timeValue}`);
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    
    if (diff <= 0) {
      return {
        value: 0,
        unit: t('result.timeUp'),
        formatted: (
          <div className="text-center">
            <div className="text-4xl font-bold text-red-600 mb-4">
              {t('result.timeUp')}
            </div>
            <div className="text-lg text-gray-600">
              {t('result.pastDate')}
            </div>
          </div>
        ),
        title: t('result.title'),
        subtitle: t('result.subtitle')
      };
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return {
      value: diff,
      unit: t('result.timeRemaining'),
      formatted: (
        <div className="text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-lg">
              <div className="text-4xl font-bold mb-2">{days.toString().padStart(2, '0')}</div>
              <div className="text-sm opacity-90 font-medium">{t('result.days')}</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 shadow-lg">
              <div className="text-4xl font-bold mb-2">{hours.toString().padStart(2, '0')}</div>
              <div className="text-sm opacity-90 font-medium">{t('result.hours')}</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg p-6 shadow-lg">
              <div className="text-4xl font-bold mb-2">{minutes.toString().padStart(2, '0')}</div>
              <div className="text-sm opacity-90 font-medium">{t('result.minutes')}</div>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg p-6 shadow-lg">
              <div className="text-4xl font-bold mb-2">{seconds.toString().padStart(2, '0')}</div>
              <div className="text-sm opacity-90 font-medium">{t('result.seconds')}</div>
            </div>
          </div>
          <div className="text-lg text-gray-600">
            {t('result.timeRemaining')}
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
    iconBgColor: 'bg-gradient-to-r from-orange-600 to-red-600',
    
    input1: {
      label: t('form.targetDate'),
      placeholder: t('form.targetDatePlaceholder'),
      value: targetDate,
      type: 'date',
      onChange: setTargetDate
    },
    
    input2: {
      label: t('form.targetTime'),
      placeholder: t('form.targetTimePlaceholder'),
      value: targetTime,
      type: 'time',
      onChange: setTargetTime
    },
    
    calculateButton: {
      text: t('form.calculate'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-r from-orange-50 to-red-50',
      borderColor: 'border-2 border-orange-200',
      textColor: 'text-orange-900',
      iconBgColor: 'bg-gradient-to-r from-orange-500 to-red-500'
    },
    
    calculate: (dateValue: string | number, _unit1: string, timeValue: string | number, _unit2: string) => calculateCountdown(dateValue, timeValue),
    
    urlParams: {
      enabled: true,
      input1Param: 'targetDate',
      input1UnitParam: 'targetDateUnit',
      input2Param: 'targetTime',
      input2UnitParam: 'targetTimeUnit'
    }
  }), [t, targetDate, targetTime]);

  return (
    <div>
      <Calculator2In1Out config={config} />
      
      {/* Live Countdown Timer */}
      {timeLeft && (
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              {t('form.liveCountdown')}
            </h3>
            
            {formatTimeLeft(timeLeft)}
            
            <div className="flex justify-center space-x-4 mt-6">
              {!isRunning ? (
                <button
                  onClick={startCountdown}
                  className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-medium hover:from-orange-700 hover:to-red-700 transition-all duration-200 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-8a2 2 0 012-2z" />
                  </svg>
                  {t('form.start')}
                </button>
              ) : (
                <button
                  onClick={stopCountdown}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('form.stop')}
                </button>
              )}
              
              <button
                onClick={resetCountdown}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {t('form.reset')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
