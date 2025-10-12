'use client';

import { useState, useMemo, JSX } from 'react';
import { useTranslations } from 'next-intl';
import Calculator2In1Out, { CalculatorConfig } from './Calculator2In1Out';

export default function WorkHoursCalculatorClient() {
  const t = useTranslations('workHoursCalc');

  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [breakDuration, setBreakDuration] = useState('60');
  const [breakUnit, setBreakUnit] = useState('minutes');

  const calculateWorkHours = (startTimeValue: string | number, endTimeValue: string | number, breakValue: string | number, breakUnitValue: string) => {
    if (!startTimeValue || !endTimeValue || !breakValue) {
      return null;
    }

    try {
      // Debug logging
      console.log('Calculating work hours:', { startTimeValue, endTimeValue, breakValue, breakUnitValue });
      // Parse start and end times - handle both HH:MM and HH:MM AM/PM formats
      let startTimeStr = String(startTimeValue).trim();
      let endTimeStr = String(endTimeValue).trim();

      // Convert to 24-hour format if needed
      const parseTime = (timeStr: string) => {
        const time = timeStr.toLowerCase();
        const isPM = time.includes('p.m.') || time.includes('pm');
        const isAM = time.includes('a.m.') || time.includes('am');

        // Remove AM/PM indicators
        const cleanTime = time.replace(/\s*(am|pm|a\.m\.|p\.m\.)/g, '').trim();
        const [hourStr, minuteStr] = cleanTime.split(':');
        let hour = parseInt(hourStr, 10);
        const minute = parseInt(minuteStr || '0', 10);

        // Convert to 24-hour format
        if (isPM && hour !== 12) {
          hour += 12;
        } else if (isAM && hour === 12) {
          hour = 0;
        }

        return { hour, minute };
      };

      const startTime = parseTime(startTimeStr);
      const endTime = parseTime(endTimeStr);

      console.log('Parsed times:', { startTime, endTime });

      // Convert to minutes for easier calculation
      const startMinutes = startTime.hour * 60 + startTime.minute;
      const endMinutes = endTime.hour * 60 + endTime.minute;

      console.log('Minutes:', { startMinutes, endMinutes });

      // Handle overnight shifts
      let totalMinutes = endMinutes - startMinutes;
      if (totalMinutes < 0) {
        totalMinutes += 24 * 60; // Add 24 hours for overnight shift
      }

      // Convert break duration to minutes
      const breakMinutes = Number(breakValue);
      const breakInMinutes = breakUnitValue === 'hours' ? breakMinutes * 60 : breakMinutes;

      // Calculate work hours
      const workMinutes = Math.max(0, totalMinutes - breakInMinutes);
      const workHours = workMinutes / 60;

      console.log('Final calculation:', { totalMinutes, breakInMinutes, workMinutes, workHours });

      // Format results
      const hours = Math.floor(workHours);
      const minutes = Math.round((workHours - hours) * 60);

      // Calculate overtime (assuming 8 hours is standard)
      const standardHours = 8;
      const overtime = workHours > standardHours ? workHours - standardHours : 0;

      return {
        value: workHours,
        unit: t('result.hours'),
        formatted: (
          <div>
            <div className="text-2xl font-bold text-green-900 mb-4">
              {hours}h {minutes}m {t('result.worked')}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-green-50 rounded-lg p-3">
                <div className="font-medium text-green-800 mb-2">{t('result.breakdown')}</div>
                <div className="space-y-1 text-green-700">
                  <div>{t('result.totalTime')}: {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m</div>
                  <div>{t('result.breakTime')}: {Math.floor(breakInMinutes / 60)}h {breakInMinutes % 60}m</div>
                  <div>{t('result.workTime')}: {hours}h {minutes}m</div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-3">
                <div className="font-medium text-blue-800 mb-2">{t('result.overtime')}</div>
                <div className="space-y-1 text-blue-700">
                  <div>{t('result.standardHours')}: {standardHours}h</div>
                  <div>{t('result.overtimeHours')}: {overtime > 0 ? `${overtime.toFixed(1)}h` : t('result.none')}</div>
                  <div>{t('result.efficiency')}: {((workHours / standardHours) * 100).toFixed(1)}%</div>
                </div>
              </div>
            </div>

            {workHours > 0 && (
              <div className="mt-4 bg-gray-50 rounded-lg p-3">
                <div className="font-medium text-gray-800 mb-2">{t('result.workHours')}</div>
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-700">
                  <div>
                    <div className="font-medium">{t('result.dailyHours')}</div>
                    <div>{hours}h {minutes}m</div>
                  </div>
                  <div>
                    <div className="font-medium">{t('result.weeklyHours')}</div>
                    <div>{Math.floor(workHours * 5)}h {Math.round(((workHours * 5) % 1) * 60)}m</div>
                  </div>
                  <div>
                    <div className="font-medium">{t('result.monthlyHours')}</div>
                    <div>{Math.floor(workHours * 22)}h {Math.round(((workHours * 22) % 1) * 60)}m</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ),
        title: t('result.title'),
        subtitle: t('result.subtitle')
      };
    } catch (error) {
      return null;
    }
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
    iconBgColor: 'bg-gradient-to-r from-green-600 to-emerald-600',

    input1: {
      label: t('form.startTime'),
      placeholder: t('form.startTimePlaceholder'),
      value: startTime,
      type: 'time',
      onChange: setStartTime
    },

    input2: {
      label: t('form.endTime'),
      placeholder: t('form.endTimePlaceholder'),
      value: endTime,
      type: 'time',
      onChange: setEndTime
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
      bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50',
      borderColor: 'border-2 border-green-200',
      textColor: 'text-green-900',
      iconBgColor: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },

    calculate: (startTimeValue: string | number, _unit1: string, endTimeValue: string | number, _unit2: string) => calculateWorkHours(startTimeValue, endTimeValue, breakDuration, breakUnit),

    urlParams: {
      enabled: true,
      input1Param: 'startTime',
      input1UnitParam: 'startTimeUnit',
      input2Param: 'endTime',
      input2UnitParam: 'endTimeUnit'
    }
  }), [t, startTime, endTime, breakDuration, breakUnit]);

  return (
    <div>
      <Calculator2In1Out config={config} />

      {/* Break Duration Selector */}
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            {t('form.breakDuration')}
          </h3>
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="number"
                value={breakDuration}
                onChange={(e) => setBreakDuration(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="60"
                min="0"
                max="480"
              />
              <select
                value={breakUnit}
                onChange={(e) => setBreakUnit(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              >
                <option value="minutes">{t('form.minutes')}</option>
                <option value="hours">{t('form.hours')}</option>
              </select>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              {t('form.breakNote')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
