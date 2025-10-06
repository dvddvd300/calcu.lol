'use client';

import {useState, useMemo} from 'react';
import {useTranslations} from 'next-intl';
import Calculator2In1Out, {CalculatorConfig} from './Calculator2In1Out';

export default function SpeedCalculatorClient() {
  const t = useTranslations('speedCalc');
  
  const [fileSize, setFileSize] = useState('');
  const [fileSizeUnit, setFileSizeUnit] = useState('mb');
  const [speed, setSpeed] = useState('');
  const [speedUnit, setSpeedUnit] = useState('mbps');

  const convertToBytes = (size: number, unit: string): number => {
    const units: {[key: string]: number} = {
      'bytes': 1,
      'kb': 1000,
      'mb': 1000 * 1000,
      'gb': 1000 * 1000 * 1000,
      'tb': 1000 * 1000 * 1000 * 1000
    };
    return size * (units[unit] || 1);
  };

  const convertToBps = (speed: number, unit: string): number => {
    const units: {[key: string]: number} = {
      // Bits per second units (already divided by 8)
      'bps': 1 / 8,
      'kbps': 1000 / 8,
      'mbps': 1000 * 1000 / 8,
      'gbps': 1000 * 1000 * 1000 / 8,
      // Bytes per second units (no division needed)
      'B/s': 1,
      'KB/s': 1000,
      'MB/s': 1000 * 1000,
      'GB/s': 1000 * 1000 * 1000
    };
    
    return speed * (units[unit] || 1);
  };

  const formatTime = (seconds: number): {time: number; unit: string; formatted: string} => {
    if (seconds < 60) {
      return {
        time: Math.round(seconds * 100) / 100,
        unit: t('result.seconds'),
        formatted: `${Math.round(seconds * 100) / 100} ${t('result.seconds')}`
      };
    } else if (seconds < 3600) {
      const minutes = seconds / 60;
      return {
        time: Math.round(minutes * 100) / 100,
        unit: t('result.minutes'),
        formatted: `${Math.round(minutes * 100) / 100} ${t('result.minutes')}`
      };
    } else if (seconds < 86400) {
      const hours = seconds / 3600;
      return {
        time: Math.round(hours * 100) / 100,
        unit: t('result.hours'),
        formatted: `${Math.round(hours * 100) / 100} ${t('result.hours')}`
      };
    } else {
      const days = seconds / 86400;
      return {
        time: Math.round(days * 100) / 100,
        unit: t('result.days'),
        formatted: `${Math.round(days * 100) / 100} ${t('result.days')}`
      };
    }
  };

  const calculate = (fileSizeValue: number, fileSizeUnitValue: string, speedValue: number, speedUnitValue: string) => {
    const fileSizeBytes = convertToBytes(fileSizeValue, fileSizeUnitValue);
    const speedBps = convertToBps(speedValue, speedUnitValue);
    const timeInSeconds = fileSizeBytes / speedBps;
    const formattedResult = formatTime(timeInSeconds);

    return {
      value: formattedResult.time,
      unit: formattedResult.unit,
      formatted: formattedResult.formatted,
      title: t('result.title'),
      subtitle: 'Estimated download time'
    };
  };

  const config: CalculatorConfig = useMemo(() => ({
    title: t('title'),
    description: t('subtitle'),
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    iconBgColor: 'bg-gradient-to-r from-blue-600 to-indigo-600',
    
    input1: {
      label: t('form.fileSize'),
      placeholder: t('form.fileSizePlaceholder'),
      value: fileSize,
      unit: fileSizeUnit,
      units: [
        {value: 'bytes', label: t('units.fileSize.bytes')},
        {value: 'kb', label: t('units.fileSize.kb')},
        {value: 'mb', label: t('units.fileSize.mb')},
        {value: 'gb', label: t('units.fileSize.gb')},
        {value: 'tb', label: t('units.fileSize.tb')}
      ],
      onChange: setFileSize,
      onUnitChange: setFileSizeUnit
    },
    
    input2: {
      label: t('form.speed'),
      placeholder: t('form.speedPlaceholder'),
      value: speed,
      unit: speedUnit,
      units: [
        {value: 'bps', label: t('units.speed.bps')},
        {value: 'kbps', label: t('units.speed.kbps')},
        {value: 'mbps', label: t('units.speed.mbps')},
        {value: 'gbps', label: t('units.speed.gbps')},
        {value: 'B/s', label: t('units.speed.Bps')},
        {value: 'KB/s', label: t('units.speed.KBps')},
        {value: 'MB/s', label: t('units.speed.MBps')},
        {value: 'GB/s', label: t('units.speed.GBps')}
      ],
      onChange: setSpeed,
      onUnitChange: setSpeedUnit
    },
    
    calculateButton: {
      text: t('form.calculate'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      hoverColor: 'hover:from-blue-700 hover:to-indigo-700',
      focusColor: 'focus:ring-blue-300'
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
      subtitle: 'Estimated download time',
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
      input1Param: 'fileSize',
      input1UnitParam: 'fileSizeUnit',
      input2Param: 'speed',
      input2UnitParam: 'speedUnit'
    }
  }), [t, fileSize, fileSizeUnit, speed, speedUnit]);

  return <Calculator2In1Out config={config} />;
}
