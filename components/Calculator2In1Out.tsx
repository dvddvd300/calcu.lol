'use client';

import {useState, useEffect, useCallback, ReactNode} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';

// Type definitions for the reusable component
export interface InputConfig {
  label: string;
  placeholder: string;
  value: string;
  unit: string;
  units: Array<{value: string; label: string}>;
  onChange: (value: string) => void;
  onUnitChange: (unit: string) => void;
}

export interface ResultConfig {
  value: number;
  unit: string;
  formatted: string | ReactNode;
  title: string;
  subtitle: string;
}

export interface CalculatorConfig {
  // Header configuration
  title: string;
  description: string;
  icon?: ReactNode;
  iconBgColor?: string;
  
  // Input configurations
  input1: InputConfig;
  input2: InputConfig;
  
  // Button configurations
  calculateButton: {
    text: string;
    icon?: ReactNode;
    bgColor?: string;
    hoverColor?: string;
    focusColor?: string;
  };
  resetButton: {
    text: string;
    icon?: ReactNode;
    bgColor?: string;
    hoverColor?: string;
    focusColor?: string;
  };
  shareButton?: {
    text: string;
    icon?: ReactNode;
    bgColor?: string;
    hoverColor?: string;
    focusColor?: string;
  };
  
  // Result configuration
  result: {
    title: string;
    subtitle: string;
    icon?: ReactNode;
    bgColor?: string;
    borderColor?: string;
    textColor?: string;
    iconBgColor?: string;
  };
  
  // Calculation function
  calculate: (input1Value: number, input1Unit: string, input2Value: number, input2Unit: string) => ResultConfig | null;
  
  // URL parameters (optional)
  urlParams?: {
    enabled: boolean;
    input1Param: string;
    input1UnitParam: string;
    input2Param: string;
    input2UnitParam: string;
  };
}

interface Calculator2In1OutProps {
  config: CalculatorConfig;
  className?: string;
}

export default function Calculator2In1Out({config, className = ''}: Calculator2In1OutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [result, setResult] = useState<ResultConfig | null>(null);
  const [urlParamsLoaded, setUrlParamsLoaded] = useState(false);

  // URL parameter support - only run once on mount
  useEffect(() => {
    if (!config.urlParams?.enabled || urlParamsLoaded) return;

    const input1Param = searchParams.get(config.urlParams.input1Param);
    const input1UnitParam = searchParams.get(config.urlParams.input1UnitParam);
    const input2Param = searchParams.get(config.urlParams.input2Param);
    const input2UnitParam = searchParams.get(config.urlParams.input2UnitParam);

    if (input1Param) {
      const num = parseFloat(input1Param);
      if (!isNaN(num) && num > 0) {
        config.input1.onChange(input1Param);
      }
    }
    
    if (input1UnitParam && config.input1.units.some(u => u.value === input1UnitParam)) {
      config.input1.onUnitChange(input1UnitParam);
    }
    
    if (input2Param) {
      const num = parseFloat(input2Param);
      if (!isNaN(num) && num > 0) {
        config.input2.onChange(input2Param);
      }
    }
    
    if (input2UnitParam && config.input2.units.some(u => u.value === input2UnitParam)) {
      config.input2.onUnitChange(input2UnitParam);
    }
    
    setUrlParamsLoaded(true);
  }, [searchParams, config, urlParamsLoaded]);

  // Update URL parameters
  const updateURLParams = useCallback((newInput1Value: string, newInput1Unit: string, newInput2Value: string, newInput2Unit: string) => {
    if (!config.urlParams?.enabled) return;

    const params = new URLSearchParams();
    
    if (newInput1Value) params.set(config.urlParams.input1Param, newInput1Value);
    if (newInput1Unit && newInput1Unit !== config.input1.unit) params.set(config.urlParams.input1UnitParam, newInput1Unit);
    if (newInput2Value) params.set(config.urlParams.input2Param, newInput2Value);
    if (newInput2Unit && newInput2Unit !== config.input2.unit) params.set(config.urlParams.input2UnitParam, newInput2Unit);

    const newURL = params.toString() ? `?${params.toString()}` : window.location.pathname;
    router.replace(newURL, { scroll: false });
  }, [config.urlParams, router]);

  // Debounced URL update for inputs
  const debouncedUpdateURL = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (newInput1Value: string, newInput1Unit: string, newInput2Value: string, newInput2Unit: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          updateURLParams(newInput1Value, newInput1Unit, newInput2Value, newInput2Unit);
        }, 150);
      };
    })(),
    [updateURLParams]
  );

  const calculate = () => {
    if (!config.input1.value || !config.input2.value) return;

    const input1Num = parseFloat(config.input1.value);
    const input2Num = parseFloat(config.input2.value);

    if (isNaN(input1Num) || isNaN(input2Num) || input1Num <= 0 || input2Num <= 0) {
      return;
    }

    const result = config.calculate(input1Num, config.input1.unit, input2Num, config.input2.unit);
    setResult(result);
  };

  const reset = () => {
    setResult(null);
    config.input1.onChange('');
    config.input2.onChange('');
    
    if (config.urlParams?.enabled) {
      router.replace(window.location.pathname, { scroll: false });
    }
  };

  const shareURL = () => {
    if (!config.urlParams?.enabled) return;

    const params = new URLSearchParams();
    
    if (config.input1.value) params.set(config.urlParams.input1Param, config.input1.value);
    if (config.input1.unit && config.input1.unit !== config.input1.units[0]?.value) params.set(config.urlParams.input1UnitParam, config.input1.unit);
    if (config.input2.value) params.set(config.urlParams.input2Param, config.input2.value);
    if (config.input2.unit && config.input2.unit !== config.input2.units[0]?.value) params.set(config.urlParams.input2UnitParam, config.input2.unit);

    const shareUrl = params.toString() ? `${window.location.origin}${window.location.pathname}?${params.toString()}` : window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: config.title,
        text: config.description,
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('URL copied to clipboard!');
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-8 ${className}`}>
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-12">
          {config.icon && (
            <div 
              className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${config.iconBgColor || 'bg-gradient-to-r from-blue-600 to-indigo-600'}`}
            >
              {config.icon}
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {config.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {config.description}
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input 1 */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                {config.input1.label}
              </label>
              <div className="flex rounded-2xl overflow-hidden shadow-lg border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-300">
                <input
                  type="number"
                  value={config.input1.value}
                  onChange={(e) => {
                    config.input1.onChange(e.target.value);
                    if (config.urlParams?.enabled) {
                      debouncedUpdateURL(e.target.value, config.input1.unit, config.input2.value, config.input2.unit);
                    }
                  }}
                  placeholder={config.input1.placeholder}
                  className="flex-1 px-6 py-4 text-lg focus:outline-none bg-white"
                />
                <select
                  value={config.input1.unit}
                  onChange={(e) => {
                    config.input1.onUnitChange(e.target.value);
                    if (config.urlParams?.enabled) {
                      updateURLParams(config.input1.value, e.target.value, config.input2.value, config.input2.unit);
                    }
                  }}
                  className="px-6 py-4 text-lg focus:outline-none bg-gray-50 border-l border-gray-200 font-medium"
                >
                  {config.input1.units.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Input 2 */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                {config.input2.label}
              </label>
              <div className="flex rounded-2xl overflow-hidden shadow-lg border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-300">
                <input
                  type="number"
                  value={config.input2.value}
                  onChange={(e) => {
                    config.input2.onChange(e.target.value);
                    if (config.urlParams?.enabled) {
                      debouncedUpdateURL(config.input1.value, config.input1.unit, e.target.value, config.input2.unit);
                    }
                  }}
                  placeholder={config.input2.placeholder}
                  className="flex-1 px-6 py-4 text-lg focus:outline-none bg-white"
                />
                <select
                  value={config.input2.unit}
                  onChange={(e) => {
                    config.input2.onUnitChange(e.target.value);
                    if (config.urlParams?.enabled) {
                      updateURLParams(config.input1.value, config.input1.unit, config.input2.value, e.target.value);
                    }
                  }}
                  className="px-6 py-4 text-lg focus:outline-none bg-gray-50 border-l border-gray-200 font-medium"
                >
                  {config.input2.units.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={calculate}
              className={`group text-white px-8 py-4 rounded-2xl text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                config.calculateButton.bgColor || 'bg-gradient-to-r from-blue-600 to-indigo-600'
              } ${
                config.calculateButton.hoverColor || 'hover:from-blue-700 hover:to-indigo-700'
              } ${
                config.calculateButton.focusColor || 'focus:ring-blue-300'
              }`}
            >
              <span className="flex items-center justify-center">
                {config.calculateButton.icon && (
                  <span className="w-5 h-5 mr-2">
                    {config.calculateButton.icon}
                  </span>
                )}
                {config.calculateButton.text}
              </span>
            </button>
            
            <button
              onClick={reset}
              className={`group px-8 py-4 rounded-2xl text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                config.resetButton.bgColor || 'bg-gray-100 text-gray-700'
              } ${
                config.resetButton.hoverColor || 'hover:bg-gray-200'
              } ${
                config.resetButton.focusColor || 'focus:ring-gray-300'
              }`}
            >
              <span className="flex items-center justify-center">
                {config.resetButton.icon && (
                  <span className="w-5 h-5 mr-2">
                    {config.resetButton.icon}
                  </span>
                )}
                {config.resetButton.text}
              </span>
            </button>

            {config.shareButton && (config.input1.value || config.input2.value) && config.urlParams?.enabled && (
              <button
                onClick={shareURL}
                className={`group text-white px-8 py-4 rounded-2xl text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                  config.shareButton.bgColor || 'bg-gradient-to-r from-green-600 to-emerald-600'
                } ${
                  config.shareButton.hoverColor || 'hover:from-green-700 hover:to-emerald-700'
                } ${
                  config.shareButton.focusColor || 'focus:ring-green-300'
                }`}
              >
                <span className="flex items-center justify-center">
                  {config.shareButton.icon && (
                    <span className="w-5 h-5 mr-2">
                      {config.shareButton.icon}
                    </span>
                  )}
                  {config.shareButton.text}
                </span>
              </button>
            )}
          </div>

          {/* Result */}
          {result && (
            <div className={`rounded-3xl p-8 shadow-lg animate-in slide-in-from-bottom-4 duration-500 ${
              config.result.bgColor || 'bg-gradient-to-r from-green-50 to-emerald-50'
            } ${
              config.result.borderColor || 'border-2 border-green-200'
            }`}>
              <div className="text-center">
                {config.result.icon && (
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
                    config.result.iconBgColor || 'bg-gradient-to-r from-green-500 to-emerald-500'
                  }`}>
                    {config.result.icon}
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-4 ${
                  config.result.textColor || 'text-green-900'
                }`}>
                  {result.title}
                </h3>
                <div className={`text-4xl md:text-5xl font-bold mb-2 ${
                  config.result.textColor || 'text-green-800'
                }`}>
                  {result.formatted}
                </div>
                <p className={`text-lg ${
                  config.result.textColor || 'text-green-700'
                }`}>
                  {result.subtitle}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
