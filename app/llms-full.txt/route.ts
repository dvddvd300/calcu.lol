import { NextResponse } from 'next/server';

export async function GET() {
  const content = `# calcu.lol - Complete Documentation for LLMs

## Site Overview
calcu.lol is a comprehensive collection of free online calculators covering various categories including speed, time, percentages, conversions, and more. All calculators are free to use with no registration required and support multiple languages.

## Available Calculators

### Time & Date Calculators

#### Age Calculator
- **Purpose**: Calculate age in years, months, days, hours, minutes, and seconds
- **Input**: Birth date and current date (or target date)
- **Output**: Detailed age breakdown
- **URL**: https://calcu.lol/en/time/age-calculator
- **Languages**: English, Spanish, French, German
- **Features**: 
  - Precise age calculation
  - Multiple time unit display
  - Leap year handling
  - Future date support

#### Date Calculator
- **Purpose**: Calculate the difference between two dates
- **Input**: Two dates
- **Output**: Time difference in various units
- **URL**: https://calcu.lol/en/time/date-calculator
- **Languages**: English, Spanish, French, German
- **Features**:
  - Days, weeks, months, years calculation
  - Business days calculation
  - Holiday consideration

#### Time Calculator
- **Purpose**: Add or subtract time values
- **Input**: Time values and operations
- **Output**: Resulting time
- **URL**: https://calcu.lol/en/time/time-calculator
- **Languages**: English, Spanish, French, German
- **Features**:
  - Time arithmetic
  - Multiple time format support
  - Time zone considerations

### Conversion Calculators

#### Distance Converter
- **Purpose**: Convert between different distance units
- **Supported Units**: Kilometers, miles, meters, feet, inches, yards, centimeters, millimeters
- **URL**: https://calcu.lol/en/conversion/distance-converter
- **Languages**: English, Spanish, French, German
- **Features**:
  - Real-time conversion
  - Multiple unit support
  - Precision handling

#### Speed Converter
- **Purpose**: Convert between different speed units
- **Supported Units**: km/h, mph, m/s, ft/s, knots
- **URL**: https://calcu.lol/en/conversion/speed-converter
- **Languages**: English, Spanish, French, German
- **Features**:
  - Instant conversion
  - Multiple unit support
  - Scientific notation support

#### Temperature Converter
- **Purpose**: Convert between temperature scales
- **Supported Units**: Celsius, Fahrenheit, Kelvin
- **URL**: https://calcu.lol/en/conversion/temperature-converter
- **Languages**: English, Spanish, French, German
- **Features**:
  - Real-time conversion
  - Precise calculations
  - Scientific accuracy

#### Weight Converter
- **Purpose**: Convert between different weight units
- **Supported Units**: Kilograms, pounds, grams, ounces, tons, stones
- **URL**: https://calcu.lol/en/conversion/weight-converter
- **Languages**: English, Spanish, French, German
- **Features**:
  - Multiple unit support
  - Precision handling
  - Common weight conversions

### Math Calculators

#### Percentage Calculator
- **Purpose**: Calculate percentages, percentage change, and percentage of totals
- **URL**: https://calcu.lol/en/math/percentage-calculator
- **Features**:
  - Percentage of a number
  - Percentage change calculation
  - Percentage increase/decrease
  - Reverse percentage calculation
- **Languages**: English, Spanish, French, German
- **Use Cases**: Discounts, taxes, tips, growth rates

### Finance Calculators

#### Tip Calculator
- **Purpose**: Calculate tips and split bills
- **URL**: https://calcu.lol/en/finance/tip-calculator
- **Features**:
  - Tip percentage calculation
  - Bill splitting
  - Multiple tip rates
  - Tax inclusion
- **Languages**: English, Spanish, French, German
- **Use Cases**: Restaurant bills, service tips, group payments

### Technology Calculators

#### Speed Calculator
- **Purpose**: Calculate speed, distance, and time relationships
- **Formula**: Speed = Distance / Time
- **URL**: https://calcu.lol/en/ti/speed-calculator
- **Features**:
  - Three-variable calculation
  - Multiple unit support
  - Real-time updates
- **Languages**: English, Spanish, French, German
- **Use Cases**: Physics problems, travel planning, sports calculations

#### Storage Calculator
- **Purpose**: Convert between different storage units
- **Supported Units**: Bytes, KB, MB, GB, TB, PB, EB
- **URL**: https://calcu.lol/en/ti/storage-calculator
- **Features**:
  - Binary and decimal calculations
  - Multiple unit support
  - Precision handling
- **Languages**: English, Spanish, French, German
- **Use Cases**: File size calculations, storage planning, data analysis

## Site Features

### Multi-language Support
- **Supported Languages**: English (en), Spanish (es), French (fr), German (de)
- **URL Structure**: /{locale}/{calculator-path}
- **Default Language**: English
- **Language URLs**:
  - English: https://calcu.lol/en/
  - Spanish: https://calcu.lol/es/
  - French: https://calcu.lol/fr/
  - German: https://calcu.lol/de/

### User Experience
- Mobile-responsive design
- Fast and accurate calculations
- No registration required
- Free to use
- Share functionality for results
- Comprehensive examples for each calculator
- Touch-friendly interface

### Accessibility
- WCAG compliance
- Keyboard navigation
- Screen reader support
- High contrast support

## Use Cases

### Educational
- Student homework help
- Math problem solving
- Physics calculations
- Chemistry conversions

### Professional
- Engineering calculations
- Financial analysis
- Data conversion
- Project planning

### Personal
- Travel planning
- Home improvement
- Fitness tracking
- Budget management

## Target Audience
- Students (all levels)
- Professionals (various fields)
- General public
- Educators
- Researchers

## Content Strategy
- Clear explanations
- Step-by-step guides
- Example calculations
- Common use cases
- Best practices

## Future Enhancements
- Additional calculators
- Mobile app
- User accounts
- Calculation history
- Custom calculators

## Contact and Support
- Website: https://calcu.lol
- Feedback: Through website contact form
- Bug reports: GitHub issues
- Feature requests: Community feedback

## Legal
- Terms of Service: Available on website
- Privacy Policy: Available on website
- Cookie Policy: Available on website
- GDPR Compliance: Implemented

This documentation provides comprehensive information about calcu.lol for AI/LLM systems to understand the site's purpose, functionality, and user-facing features.`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
