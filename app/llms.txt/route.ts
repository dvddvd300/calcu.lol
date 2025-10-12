import { NextResponse } from 'next/server';

export async function GET() {
  const content = `# calcu.lol - Free Online Calculators

## Site Overview
calcu.lol is a comprehensive collection of free online calculators covering various categories including speed, time, percentages, conversions, and more. All calculators are free to use with no registration required.

## Available Calculators

### Time & Date Calculators
- **Age Calculator**: Calculate age in years, months, days, hours, minutes, and seconds
  - URL: https://calcu.lol/en/time/age-calculator
- **Date Calculator**: Calculate the difference between two dates
  - URL: https://calcu.lol/en/time/date-calculator
- **Time Calculator**: Add or subtract time values
  - URL: https://calcu.lol/en/time/time-calculator

### Conversion Calculators
- **Distance Converter**: Convert between different distance units (km, miles, meters, feet, etc.)
  - URL: https://calcu.lol/en/conversion/distance-converter
- **Speed Converter**: Convert between different speed units (km/h, mph, m/s, etc.)
  - URL: https://calcu.lol/en/conversion/speed-converter
- **Temperature Converter**: Convert between Celsius, Fahrenheit, and Kelvin
  - URL: https://calcu.lol/en/conversion/temperature-converter
- **Weight Converter**: Convert between different weight units (kg, lbs, grams, etc.)
  - URL: https://calcu.lol/en/conversion/weight-converter

### Math Calculators
- **Percentage Calculator**: Calculate percentages, percentage change, and percentage of totals
  - URL: https://calcu.lol/en/math/percentage-calculator

### Finance Calculators
- **Tip Calculator**: Calculate tips and split bills
  - URL: https://calcu.lol/en/finance/tip-calculator

### Technology Calculators
- **Speed Calculator**: Calculate speed, distance, and time relationships
  - URL: https://calcu.lol/en/ti/speed-calculator
- **Storage Calculator**: Convert between different storage units (bytes, KB, MB, GB, TB, etc.)
  - URL: https://calcu.lol/en/ti/storage-calculator

## Features
- Multi-language support (English, Spanish, French, German)
- Mobile-responsive design
- Fast and accurate calculations
- No registration required
- Free to use
- Share functionality for results
- Comprehensive examples for each calculator

## Target Audience
Students, professionals, and anyone who needs quick and accurate calculations for various purposes.

## Use Cases
- Educational purposes (homework help, math problems)
- Professional calculations (engineering, finance)
- Personal finance (tips, percentages)
- Unit conversions (distance, weight, temperature)
- Time and date calculations (age, date differences)
- Mathematical computations (percentages, speed)

## Multi-Language Support
All calculators are available in:
- English (en): https://calcu.lol/en/
- Spanish (es): https://calcu.lol/es/
- French (fr): https://calcu.lol/fr/
- German (de): https://calcu.lol/de/

## Contact
For questions or suggestions, visit the main site at https://calcu.lol`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
