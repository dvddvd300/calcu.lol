'use client';

import {useState, useEffect, useCallback} from 'react';
import {useTranslations} from 'next-intl';
import {useRouter, useSearchParams} from 'next/navigation';

export default function SpeedCalculator() {
  const t = useTranslations('speedCalc');
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [fileSize, setFileSize] = useState('');
  const [fileSizeUnit, setFileSizeUnit] = useState('mb');
  const [speed, setSpeed] = useState('');
  const [speedUnit, setSpeedUnit] = useState('mbps');
  const [result, setResult] = useState<{
    time: number;
    unit: string;
    formatted: string;
  } | null>(null);

  // Read URL parameters on component mount
  useEffect(() => {
    const fileSizeParam = searchParams.get('fileSize');
    const fileSizeUnitParam = searchParams.get('fileSizeUnit');
    const speedParam = searchParams.get('speed');
    const speedUnitParam = searchParams.get('speedUnit');

    // Validate and set file size
    if (fileSizeParam) {
      const fileSizeNum = parseFloat(fileSizeParam);
      if (!isNaN(fileSizeNum) && fileSizeNum > 0) {
        setFileSize(fileSizeParam);
      }
    }
    
    // Validate and set file size unit
    if (fileSizeUnitParam && ['bytes', 'kb', 'mb', 'gb', 'tb'].includes(fileSizeUnitParam)) {
      setFileSizeUnit(fileSizeUnitParam);
    }
    
    // Validate and set speed
    if (speedParam) {
      const speedNum = parseFloat(speedParam);
      if (!isNaN(speedNum) && speedNum > 0) {
        setSpeed(speedParam);
      }
    }
    
    // Validate and set speed unit
    if (speedUnitParam && ['bps', 'kbps', 'mbps', 'gbps'].includes(speedUnitParam)) {
      setSpeedUnit(speedUnitParam);
    }
  }, [searchParams]);

  // Debounced URL update function
  const updateURLParams = useCallback((newFileSize: string, newFileSizeUnit: string, newSpeed: string, newSpeedUnit: string) => {
    const params = new URLSearchParams();
    
    if (newFileSize) params.set('fileSize', newFileSize);
    if (newFileSizeUnit && newFileSizeUnit !== 'mb') params.set('fileSizeUnit', newFileSizeUnit);
    if (newSpeed) params.set('speed', newSpeed);
    if (newSpeedUnit && newSpeedUnit !== 'mbps') params.set('speedUnit', newSpeedUnit);

    const newURL = params.toString() ? `?${params.toString()}` : window.location.pathname;
    router.replace(newURL, { scroll: false });
  }, [router]);

  // Debounced version for input fields
  const debouncedUpdateURL = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (newFileSize: string, newFileSizeUnit: string, newSpeed: string, newSpeedUnit: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          updateURLParams(newFileSize, newFileSizeUnit, newSpeed, newSpeedUnit);
        }, 500);
      };
    })(),
    [updateURLParams]
  );

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
    // Clear URL parameters
    router.replace(window.location.pathname, { scroll: false });
  };

  const shareURL = () => {
    const params = new URLSearchParams();
    
    if (fileSize) params.set('fileSize', fileSize);
    if (fileSizeUnit && fileSizeUnit !== 'mb') params.set('fileSizeUnit', fileSizeUnit);
    if (speed) params.set('speed', speed);
    if (speedUnit && speedUnit !== 'mbps') params.set('speedUnit', speedUnit);

    const shareUrl = params.toString() ? `${window.location.origin}${window.location.pathname}?${params.toString()}` : window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: t('share.title'),
        text: t('share.text'),
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      // You could add a toast notification here
      alert(t('share.copied'));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                {t('form.fileSize')}
              </label>
              <div className="flex rounded-2xl overflow-hidden shadow-lg border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-300">
                <input
                  type="number"
                  value={fileSize}
                  onChange={(e) => {
                    setFileSize(e.target.value);
                    debouncedUpdateURL(e.target.value, fileSizeUnit, speed, speedUnit);
                  }}
                  placeholder={t('form.fileSizePlaceholder')}
                  className="flex-1 px-6 py-4 text-lg focus:outline-none bg-white"
                />
                <select
                  value={fileSizeUnit}
                  onChange={(e) => {
                    setFileSizeUnit(e.target.value);
                    updateURLParams(fileSize, e.target.value, speed, speedUnit);
                  }}
                  className="px-6 py-4 text-lg focus:outline-none bg-gray-50 border-l border-gray-200 font-medium"
                >
                  <option value="bytes">{t('units.fileSize.bytes')}</option>
                  <option value="kb">{t('units.fileSize.kb')}</option>
                  <option value="mb">{t('units.fileSize.mb')}</option>
                  <option value="gb">{t('units.fileSize.gb')}</option>
                  <option value="tb">{t('units.fileSize.tb')}</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                {t('form.speed')}
              </label>
              <div className="flex rounded-2xl overflow-hidden shadow-lg border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-300">
                <input
                  type="number"
                  value={speed}
                  onChange={(e) => {
                    setSpeed(e.target.value);
                    debouncedUpdateURL(fileSize, fileSizeUnit, e.target.value, speedUnit);
                  }}
                  placeholder={t('form.speedPlaceholder')}
                  className="flex-1 px-6 py-4 text-lg focus:outline-none bg-white"
                />
                <select
                  value={speedUnit}
                  onChange={(e) => {
                    setSpeedUnit(e.target.value);
                    updateURLParams(fileSize, fileSizeUnit, speed, e.target.value);
                  }}
                  className="px-6 py-4 text-lg focus:outline-none bg-gray-50 border-l border-gray-200 font-medium"
                >
                  <option value="bps">{t('units.speed.bps')}</option>
                  <option value="kbps">{t('units.speed.kbps')}</option>
                  <option value="mbps">{t('units.speed.mbps')}</option>
                  <option value="gbps">{t('units.speed.gbps')}</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={calculate}
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                {t('form.calculate')}
              </span>
            </button>
            <button
              onClick={reset}
              className="group bg-gray-100 text-gray-700 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {t('form.reset')}
              </span>
            </button>
            {(fileSize || speed) && (
              <button
                onClick={shareURL}
                className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                    Share
                </span>
              </button>
            )}
          </div>

          {result && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-8 shadow-lg animate-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-900 mb-4">
                  {t('result.title')}
                </h3>
                <div className="text-4xl md:text-5xl font-bold text-green-800 mb-2">
                  {result.formatted}
                </div>
                <p className="text-green-700 text-lg">
                  Estimated download time
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
