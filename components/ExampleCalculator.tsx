'use client';

import {useState} from 'react';
import Calculator2In1Out, {CalculatorConfig} from './Calculator2In1Out';

// Example of a different calculator using the reusable component
export default function ExampleCalculator() {
  const [distance, setDistance] = useState('');
  const [distanceUnit, setDistanceUnit] = useState('km');
  const [speed, setSpeed] = useState('');
  const [speedUnit, setSpeedUnit] = useState('kmh');

  const calculate = (distanceValue: number, distanceUnitValue: string, speedValue: number, speedUnitValue: string) => {
    // Convert to common units (km and km/h)
    let distanceKm = distanceValue;
    let speedKmh = speedValue;

    // Convert distance to km
    switch (distanceUnitValue) {
      case 'm':
        distanceKm = distanceValue / 1000;
        break;
      case 'mi':
        distanceKm = distanceValue * 1.60934;
        break;
      case 'ft':
        distanceKm = distanceValue * 0.0003048;
        break;
    }

    // Convert speed to km/h
    switch (speedUnitValue) {
      case 'ms':
        speedKmh = speedValue * 3.6;
        break;
      case 'mph':
        speedKmh = speedValue * 1.60934;
        break;
      case 'knots':
        speedKmh = speedValue * 1.852;
        break;
    }

    const timeHours = distanceKm / speedKmh;
    
    let formatted: string;
    if (timeHours < 1) {
      const minutes = timeHours * 60;
      formatted = `${Math.round(minutes * 100) / 100} minutes`;
    } else if (timeHours < 24) {
      formatted = `${Math.round(timeHours * 100) / 100} hours`;
    } else {
      const days = timeHours / 24;
      formatted = `${Math.round(days * 100) / 100} days`;
    }

    return {
      value: timeHours,
      unit: 'hours',
      formatted,
      title: 'Travel Time',
      subtitle: 'Estimated time to reach destination'
    };
  };

  const config: CalculatorConfig = {
    title: 'Travel Time Calculator',
    description: 'Calculate how long it will take to travel a certain distance at a given speed',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    iconBgColor: 'bg-gradient-to-r from-purple-600 to-pink-600',
    
    input1: {
      label: 'Distance',
      placeholder: 'Enter distance',
      value: distance,
      unit: distanceUnit,
      units: [
        {value: 'm', label: 'Meters'},
        {value: 'km', label: 'Kilometers'},
        {value: 'mi', label: 'Miles'},
        {value: 'ft', label: 'Feet'}
      ],
      onChange: setDistance,
      onUnitChange: setDistanceUnit
    },
    
    input2: {
      label: 'Speed',
      placeholder: 'Enter speed',
      value: speed,
      unit: speedUnit,
      units: [
        {value: 'ms', label: 'm/s'},
        {value: 'kmh', label: 'km/h'},
        {value: 'mph', label: 'mph'},
        {value: 'knots', label: 'knots'}
      ],
      onChange: setSpeed,
      onUnitChange: setSpeedUnit
    },
    
    calculateButton: {
      text: 'Calculate Time',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-r from-purple-600 to-pink-600',
      hoverColor: 'hover:from-purple-700 hover:to-pink-700',
      focusColor: 'focus:ring-purple-300'
    },
    
    resetButton: {
      text: 'Clear',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      bgColor: 'bg-gray-100 text-gray-700',
      hoverColor: 'hover:bg-gray-200',
      focusColor: 'focus:ring-gray-300'
    },
    
    shareButton: {
      text: 'Share Route',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-r from-orange-600 to-red-600',
      hoverColor: 'hover:from-orange-700 hover:to-red-700',
      focusColor: 'focus:ring-orange-300'
    },
    
    result: {
      title: 'Travel Time',
      subtitle: 'Estimated time to reach destination',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-r from-blue-50 to-indigo-50',
      borderColor: 'border-2 border-blue-200',
      textColor: 'text-blue-900',
      iconBgColor: 'bg-gradient-to-r from-blue-500 to-indigo-500'
    },
    
    calculate,
    
    urlParams: {
      enabled: true,
      input1Param: 'distance',
      input1UnitParam: 'distanceUnit',
      input2Param: 'speed',
      input2UnitParam: 'speedUnit'
    }
  };

  return <Calculator2In1Out config={config} />;
}
