# Calculator2In1Out - Reusable Calculator Component

A highly customizable React component for creating 2-input, 1-output calculators with full URL parameter support and extensive theming options.

## Features

- ✅ **Fully Customizable**: Colors, icons, text, and styling
- ✅ **URL Parameters**: Automatic URL updates and sharing
- ✅ **TypeScript Support**: Full type safety
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Accessibility**: Proper ARIA labels and keyboard navigation
- ✅ **Debounced Updates**: Performance optimized for URL updates

## Basic Usage

```tsx
import Calculator2In1Out, { CalculatorConfig } from './Calculator2In1Out';

const config: CalculatorConfig = {
  title: 'My Calculator',
  description: 'Calculate something amazing',
  // ... configuration
};

return <Calculator2In1Out config={config} />;
```

## Configuration Options

### Header Configuration
```tsx
{
  title: string;                    // Main title
  description: string;              // Subtitle/description
  icon?: ReactNode;                 // Custom icon component
  iconBgColor?: string;            // Icon background color classes
}
```

### Input Configuration
```tsx
{
  input1: {
    label: string;                  // Input label
    placeholder: string;            // Input placeholder
    value: string;                   // Current value
    unit: string;                   // Current unit
    units: Array<{                  // Available units
      value: string;
      label: string;
    }>;
    onChange: (value: string) => void;        // Value change handler
    onUnitChange: (unit: string) => void;   // Unit change handler
  };
  input2: {
    // Same structure as input1
  };
}
```

### Button Configuration
```tsx
{
  calculateButton: {
    text: string;                   // Button text
    icon?: ReactNode;              // Custom icon
    bgColor?: string;              // Background color classes
    hoverColor?: string;           // Hover state classes
    focusColor?: string;           // Focus ring classes
  };
  resetButton: {
    // Same structure as calculateButton
  };
  shareButton?: {                   // Optional share button
    // Same structure as calculateButton
  };
}
```

### Result Configuration
```tsx
{
  result: {
    title: string;                  // Result title
    subtitle: string;               // Result subtitle
    icon?: ReactNode;              // Custom icon
    bgColor?: string;              // Background color classes
    borderColor?: string;          // Border color classes
    textColor?: string;            // Text color classes
    iconBgColor?: string;          // Icon background classes
  };
}
```

### Calculation Function
```tsx
{
  calculate: (input1Value: number, input1Unit: string, input2Value: number, input2Unit: string) => {
    // Your calculation logic here
    return {
      value: number;               // Numeric result
      unit: string;                // Result unit
      formatted: string;           // Formatted display string
      title: string;               // Result title
      subtitle: string;            // Result subtitle
    } | null;
  };
}
```

### URL Parameters (Optional)
```tsx
{
  urlParams?: {
    enabled: boolean;              // Enable URL parameters
    input1Param: string;          // URL param name for input1
    input1UnitParam: string;      // URL param name for input1 unit
    input2Param: string;          // URL param name for input2
    input2UnitParam: string;      // URL param name for input2 unit
  };
}
```

## Example Implementations

### Speed Calculator
```tsx
const config: CalculatorConfig = {
  title: 'Download Speed Calculator',
  description: 'Calculate download time for files',
  icon: <LightningIcon />,
  iconBgColor: 'bg-gradient-to-r from-blue-600 to-indigo-600',
  
  input1: {
    label: 'File Size',
    placeholder: 'Enter file size',
    value: fileSize,
    unit: fileSizeUnit,
    units: [
      {value: 'bytes', label: 'Bytes'},
      {value: 'kb', label: 'KB'},
      {value: 'mb', label: 'MB'},
      {value: 'gb', label: 'GB'}
    ],
    onChange: setFileSize,
    onUnitChange: setFileSizeUnit
  },
  
  input2: {
    label: 'Download Speed',
    placeholder: 'Enter speed',
    value: speed,
    unit: speedUnit,
    units: [
      {value: 'bps', label: 'bps'},
      {value: 'kbps', label: 'Kbps'},
      {value: 'mbps', label: 'Mbps'}
    ],
    onChange: setSpeed,
    onUnitChange: setSpeedUnit
  },
  
  calculateButton: {
    text: 'Calculate',
    icon: <CalculatorIcon />,
    bgColor: 'bg-gradient-to-r from-blue-600 to-indigo-600',
    hoverColor: 'hover:from-blue-700 hover:to-indigo-700'
  },
  
  result: {
    title: 'Download Time',
    subtitle: 'Estimated time to download',
    bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50',
    textColor: 'text-green-900'
  },
  
  calculate: (fileSize, fileSizeUnit, speed, speedUnit) => {
    // Calculation logic
    const timeInSeconds = convertToBytes(fileSize, fileSizeUnit) / convertToBps(speed, speedUnit);
    return {
      value: timeInSeconds,
      unit: 'seconds',
      formatted: formatTime(timeInSeconds),
      title: 'Download Time',
      subtitle: 'Estimated time to download'
    };
  },
  
  urlParams: {
    enabled: true,
    input1Param: 'fileSize',
    input1UnitParam: 'fileSizeUnit',
    input2Param: 'speed',
    input2UnitParam: 'speedUnit'
  }
};
```

### Travel Time Calculator
```tsx
const config: CalculatorConfig = {
  title: 'Travel Time Calculator',
  description: 'Calculate travel time for your journey',
  icon: <CarIcon />,
  iconBgColor: 'bg-gradient-to-r from-purple-600 to-pink-600',
  
  input1: {
    label: 'Distance',
    placeholder: 'Enter distance',
    value: distance,
    unit: distanceUnit,
    units: [
      {value: 'km', label: 'Kilometers'},
      {value: 'mi', label: 'Miles'},
      {value: 'm', label: 'Meters'}
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
      {value: 'kmh', label: 'km/h'},
      {value: 'mph', label: 'mph'},
      {value: 'ms', label: 'm/s'}
    ],
    onChange: setSpeed,
    onUnitChange: setSpeedUnit
  },
  
  calculateButton: {
    text: 'Calculate Time',
    icon: <ClockIcon />,
    bgColor: 'bg-gradient-to-r from-purple-600 to-pink-600',
    hoverColor: 'hover:from-purple-700 hover:to-pink-700'
  },
  
  result: {
    title: 'Travel Time',
    subtitle: 'Time to reach destination',
    bgColor: 'bg-gradient-to-r from-blue-50 to-indigo-50',
    textColor: 'text-blue-900'
  },
  
  calculate: (distance, distanceUnit, speed, speedUnit) => {
    // Convert to common units and calculate
    const timeHours = convertDistance(distance, distanceUnit) / convertSpeed(speed, speedUnit);
    return {
      value: timeHours,
      unit: 'hours',
      formatted: formatTime(timeHours),
      title: 'Travel Time',
      subtitle: 'Time to reach destination'
    };
  }
};
```

## Customization Examples

### Color Themes

#### Blue Theme
```tsx
iconBgColor: 'bg-gradient-to-r from-blue-600 to-indigo-600'
calculateButton: {
  bgColor: 'bg-gradient-to-r from-blue-600 to-indigo-600',
  hoverColor: 'hover:from-blue-700 hover:to-indigo-700'
}
result: {
  bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50',
  textColor: 'text-green-900'
}
```

#### Purple Theme
```tsx
iconBgColor: 'bg-gradient-to-r from-purple-600 to-pink-600'
calculateButton: {
  bgColor: 'bg-gradient-to-r from-purple-600 to-pink-600',
  hoverColor: 'hover:from-purple-700 hover:to-pink-700'
}
result: {
  bgColor: 'bg-gradient-to-r from-purple-50 to-pink-50',
  textColor: 'text-purple-900'
}
```

#### Orange Theme
```tsx
iconBgColor: 'bg-gradient-to-r from-orange-600 to-red-600'
calculateButton: {
  bgColor: 'bg-gradient-to-r from-orange-600 to-red-600',
  hoverColor: 'hover:from-orange-700 hover:to-red-700'
}
result: {
  bgColor: 'bg-gradient-to-r from-orange-50 to-red-50',
  textColor: 'text-orange-900'
}
```

## URL Parameter Support

When `urlParams.enabled` is true, the component automatically:

1. **Reads URL parameters** on component mount
2. **Updates URL** when form values change (debounced for inputs)
3. **Validates parameters** to ensure they're valid numbers and units
4. **Provides sharing functionality** with the share button

### URL Structure
```
/calculator?input1=100&input1Unit=mb&input2=10&input2Unit=mbps
```

## TypeScript Support

The component is fully typed with TypeScript interfaces:

- `CalculatorConfig` - Main configuration interface
- `InputConfig` - Input field configuration
- `ResultConfig` - Result display configuration

## Performance Features

- **Debounced URL updates** - Prevents excessive URL changes while typing
- **Optimized re-renders** - Uses React.memo and useCallback where appropriate
- **Lazy loading** - Component can be code-split if needed

## Accessibility

- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- Focus management
- Color contrast compliance

## Browser Support

- Modern browsers with ES6+ support
- React 18+
- Next.js 13+ (for URL parameter support)
