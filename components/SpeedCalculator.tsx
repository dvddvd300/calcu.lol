'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';

export default function SpeedCalculator() {
  const t = useTranslations('speedCalc');
  const [fileSize, setFileSize] = useState('');
  const [fileSizeUnit, setFileSizeUnit] = useState('mb');
  const [speed, setSpeed] = useState('');
  const [speedUnit, setSpeedUnit] = useState('mbps');
  const [result, setResult] = useState<{
    time: number;
    unit: string;
    formatted: string;
  } | null>(null);

  const convertToBytes = (size: number, unit: string): number => {
    const units: {[key: string]: number} = {
      'bytes': 1,
      'kb': 1024,
      'mb': 1024 * 1024,
      'gb': 1024 * 1024 * 1024,
      'tb': 1024 * 1024 * 1024 * 1024
    };
    return size * (units[unit] || 1);
  };

  const convertToBps = (speed: number, unit: string): number => {
    const units: {[key: string]: number} = {
      'bps': 1,
      'kbps': 1000,
      'mbps': 1000 * 1000,
      'gbps': 1000 * 1000 * 1000
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

  const calculate = () => {
    if (!fileSize || !speed) return;

    const fileSizeNum = parseFloat(fileSize);
    const speedNum = parseFloat(speed);

    if (isNaN(fileSizeNum) || isNaN(speedNum) || fileSizeNum <= 0 || speedNum <= 0) {
      return;
    }

    const fileSizeBytes = convertToBytes(fileSizeNum, fileSizeUnit);
    const speedBps = convertToBps(speedNum, speedUnit);

    const timeInSeconds = fileSizeBytes / speedBps;
    const formattedResult = formatTime(timeInSeconds);

    setResult(formattedResult);
  };

  const reset = () => {
    setFileSize('');
    setSpeed('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.fileSize')}
          </label>
          <div className="flex">
            <input
              type="number"
              value={fileSize}
              onChange={(e) => setFileSize(e.target.value)}
              placeholder={t('form.fileSizePlaceholder')}
              className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <select
              value={fileSizeUnit}
              onChange={(e) => setFileSizeUnit(e.target.value)}
              className="rounded-r-md border border-l-0 border-gray-300 px-3 py-2 focus:outline-none bg-white"
            >
              <option value="bytes">{t('units.fileSize.bytes')}</option>
              <option value="kb">{t('units.fileSize.kb')}</option>
              <option value="mb">{t('units.fileSize.mb')}</option>
              <option value="gb">{t('units.fileSize.gb')}</option>
              <option value="tb">{t('units.fileSize.tb')}</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.speed')}
          </label>
          <div className="flex">
            <input
              type="number"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              placeholder={t('form.speedPlaceholder')}
              className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <select
              value={speedUnit}
              onChange={(e) => setSpeedUnit(e.target.value)}
              className="rounded-r-md border border-l-0 border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="bps">{t('units.speed.bps')}</option>
              <option value="kbps">{t('units.speed.kbps')}</option>
              <option value="mbps">{t('units.speed.mbps')}</option>
              <option value="gbps">{t('units.speed.gbps')}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={calculate}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          {t('form.calculate')}
        </button>
        <button
          onClick={reset}
          className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
        >
          {t('form.reset')}
        </button>
      </div>

      {result && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            {t('result.title')}
          </h3>
          <div className="text-2xl font-bold text-green-800">
            {result.formatted}
          </div>
        </div>
      )}
    </div>
  );
}
