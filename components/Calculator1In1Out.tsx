'use client';

import {useState, useEffect, useCallback, ReactNode} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';

// Type definitions for the reusable 1-in-1-out calculator component
export interface InputConfig {
  label: string;
  placeholder: string;
  value: string;
  unit: string;
  units: Array<{value: string; label: string}>;
  onChange: (value: string) => void;
  onUnitChange: (unit: string) => void;
}

export interface OutputConfig {
  label: string;
  placeholder: string;
  unit: string;
  units: Array<{value: string; label: string}>;
  onUnitChange: (unit: string) => void;
}

export interface ResultConfig {
  value: number;
  unit: string;
  formatted: string | ReactNode;
  title: string;
  subtitle: string;
}

export interface Calculator1In1OutConfig {
  // Header configuration
  title: string;
  description: string;
  icon?: ReactNode;
  iconBgColor?: string;
  
  // Input configuration
  input: InputConfig;
  
  // Output configuration
  output: OutputConfig;
  
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
  calculate: (inputValue: number, inputUnit: string, outputUnit: string) => ResultConfig | null;
  
  // URL parameters (optional)
  urlParams?: {
    enabled: boolean;
    inputParam: string;
    inputUnitParam: string;
    outputParam: string;
    outputUnitParam: string;
  };
}

export default function Calculator1In1Out({config}: {config: Calculator1In1OutConfig}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [inputValue, setInputValue] = useState(config.input.value);
  const [inputUnit, setInputUnit] = useState(config.input.unit);
  const [outputUnit, setOutputUnit] = useState(config.output.unit);
  const [result, setResult] = useState<ResultConfig | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Load URL parameters on mount
  useEffect(() => {
    if (config.urlParams?.enabled) {
      const urlInputValue = searchParams.get(config.urlParams.inputParam);
      const urlInputUnit = searchParams.get(config.urlParams.inputUnitParam);
      const urlOutputUnit = searchParams.get(config.urlParams.outputUnitParam);
      
      if (urlInputValue) setInputValue(urlInputValue);
      if (urlInputUnit) setInputUnit(urlInputUnit);
      if (urlOutputUnit) setOutputUnit(urlOutputUnit);
    }
  }, [searchParams, config.urlParams]);

  // Update URL when values change
  const updateURL = useCallback((newInputValue: string, newInputUnit: string, newOutputUnit: string) => {
    if (config.urlParams?.enabled) {
      const params = new URLSearchParams(searchParams.toString());
      
      if (newInputValue) {
        params.set(config.urlParams.inputParam, newInputValue);
      } else {
        params.delete(config.urlParams.inputParam);
      }
      
      if (newInputUnit) {
        params.set(config.urlParams.inputUnitParam, newInputUnit);
      } else {
        params.delete(config.urlParams.inputUnitParam);
      }
      
      if (newOutputUnit) {
        params.set(config.urlParams.outputUnitParam, newOutputUnit);
      } else {
        params.delete(config.urlParams.outputUnitParam);
      }
      
      const newURL = `${window.location.pathname}?${params.toString()}`;
      router.replace(newURL, { scroll: false });
    }
  }, [searchParams, config.urlParams, router]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    updateURL(value, inputUnit, outputUnit);
  };

  const handleInputUnitChange = (unit: string) => {
    setInputUnit(unit);
    updateURL(inputValue, unit, outputUnit);
  };

  const handleOutputUnitChange = (unit: string) => {
    setOutputUnit(unit);
    updateURL(inputValue, inputUnit, unit);
  };

  const handleCalculate = async () => {
    if (!inputValue || isNaN(Number(inputValue))) {
      setResult(null);
      return;
    }

    setIsCalculating(true);
    
    try {
      const calculationResult = config.calculate(Number(inputValue), inputUnit, outputUnit);
      setResult(calculationResult);
    } catch (error) {
      console.error('Calculation error:', error);
      setResult(null);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setInputValue('');
    setResult(null);
    updateURL('', inputUnit, outputUnit);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: config.title,
        text: config.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${config.iconBgColor || 'bg-gradient-to-r from-blue-600 to-indigo-600'} mb-6`}>
          {config.icon}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {config.title}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {config.description}
        </p>
      </div>

      {/* Calculator */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                {config.input.label}
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={config.input.placeholder}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                <select
                  value={inputUnit}
                  onChange={(e) => handleInputUnitChange(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white"
                >
                  {config.input.units.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                {config.output.label}
              </label>
              <div className="flex gap-3">
                <div className="flex-1 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-lg text-gray-500">
                  {result ? result.formatted : config.output.placeholder}
                </div>
                <select
                  value={outputUnit}
                  onChange={(e) => handleOutputUnitChange(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white"
                >
                  {config.output.units.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={handleCalculate}
            disabled={!inputValue || isCalculating}
            className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg text-white transition-all duration-300 ${
              !inputValue || isCalculating
                ? 'bg-gray-400 cursor-not-allowed'
                : `${config.calculateButton.bgColor || 'bg-gradient-to-r from-blue-600 to-indigo-600'} ${config.calculateButton.hoverColor || 'hover:from-blue-700 hover:to-indigo-700'} ${config.calculateButton.focusColor || 'focus:ring-blue-300'} focus:ring-4`
            }`}
          >
            {isCalculating ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                {config.calculateButton.icon}
                {config.calculateButton.text}
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className={`flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${config.resetButton.bgColor || 'bg-gray-100 text-gray-700'} ${config.resetButton.hoverColor || 'hover:bg-gray-200'} ${config.resetButton.focusColor || 'focus:ring-gray-300'} focus:ring-4`}
          >
            {config.resetButton.icon}
            {config.resetButton.text}
          </button>

          {config.shareButton && (
            <button
              onClick={handleShare}
              className={`flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg text-white transition-all duration-300 ${config.shareButton.bgColor || 'bg-gradient-to-r from-green-600 to-emerald-600'} ${config.shareButton.hoverColor || 'hover:from-green-700 hover:to-emerald-700'} ${config.shareButton.focusColor || 'focus:ring-green-300'} focus:ring-4`}
            >
              {config.shareButton.icon}
              {config.shareButton.text}
            </button>
          )}
        </div>
      </div>

      {/* Result Display */}
      {result && (
        <div className={`${config.result.bgColor || 'bg-gradient-to-r from-green-50 to-emerald-50'} ${config.result.borderColor || 'border-2 border-green-200'} rounded-2xl p-8 text-center`}>
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${config.result.iconBgColor || 'bg-gradient-to-r from-green-500 to-emerald-500'} mb-6`}>
            {config.result.icon}
          </div>
          <h3 className={`text-2xl font-bold mb-2 ${config.result.textColor || 'text-green-900'}`}>
            {result.title}
          </h3>
          <p className={`text-lg mb-6 ${config.result.textColor || 'text-green-700'}`}>
            {result.subtitle}
          </p>
          <div className={`text-4xl md:text-5xl font-bold ${config.result.textColor || 'text-green-900'}`}>
            {result.formatted}
          </div>
        </div>
      )}
    </div>
  );
}
