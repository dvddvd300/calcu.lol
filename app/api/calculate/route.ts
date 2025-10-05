import {NextRequest} from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const {tool, params, locale} = await req.json();
    
    // Extract locale from URL if not provided in body
    const urlLocale = req.nextUrl.pathname.split('/')[1];
    const currentLocale = locale || urlLocale;
    
    // Calculate result based on tool type
    let result;
    
    switch (tool) {
      case 'speed':
        result = calculateSpeed(params);
        break;
      case 'bmi':
        result = calculateBMI(params);
        break;
      case 'percentage':
        result = calculatePercentage(params);
        break;
      case 'tip':
        result = calculateTip(params);
        break;
      default:
        return Response.json({error: 'Invalid tool'}, {status: 400});
    }
    
    // Log to analytics (non-blocking)
    logEvent({
      tool,
      params,
      locale: currentLocale,
      timestamp: Date.now(),
      result
    }).catch(console.error);
    
    return Response.json({result});
  } catch (error) {
    console.error('Calculation error:', error);
    return Response.json({error: 'Calculation failed'}, {status: 500});
  }
}

function calculateSpeed(params: any) {
  const {fileSize, fileSizeUnit, speed, speedUnit} = params;
  
  const fileSizeBytes = convertToBytes(fileSize, fileSizeUnit);
  const speedBps = convertToBps(speed, speedUnit);
  
  const timeInSeconds = fileSizeBytes / speedBps;
  
  return {
    timeInSeconds,
    formatted: formatTime(timeInSeconds)
  };
}

function calculateBMI(params: any) {
  const {height, weight, heightUnit, weightUnit} = params;
  
  let heightInMeters = height;
  let weightInKg = weight;
  
  if (heightUnit === 'ft') {
    heightInMeters = height * 0.3048;
  } else if (heightUnit === 'in') {
    heightInMeters = height * 0.0254;
  }
  
  if (weightUnit === 'lbs') {
    weightInKg = weight * 0.453592;
  }
  
  const bmi = weightInKg / (heightInMeters * heightInMeters);
  
  return {
    bmi: Math.round(bmi * 10) / 10,
    category: getBMICategory(bmi)
  };
}

function calculatePercentage(params: any) {
  const {value, percentage} = params;
  
  return {
    result: (value * percentage) / 100,
    percentage: percentage,
    value: value
  };
}

function calculateTip(params: any) {
  const {billAmount, tipPercentage, people} = params;
  
  const tipAmount = (billAmount * tipPercentage) / 100;
  const totalBill = billAmount + tipAmount;
  const totalPerPerson = totalBill / people;
  
  return {
    tipAmount: Math.round(tipAmount * 100) / 100,
    totalBill: Math.round(totalBill * 100) / 100,
    totalPerPerson: Math.round(totalPerPerson * 100) / 100
  };
}

function convertToBytes(size: number, unit: string): number {
  const units: {[key: string]: number} = {
    'bytes': 1,
    'kb': 1024,
    'mb': 1024 * 1024,
    'gb': 1024 * 1024 * 1024,
    'tb': 1024 * 1024 * 1024 * 1024
  };
  return size * (units[unit] || 1);
}

function convertToBps(speed: number, unit: string): number {
  const units: {[key: string]: number} = {
    'bps': 1,
    'kbps': 1000,
    'mbps': 1000 * 1000,
    'gbps': 1000 * 1000 * 1000
  };
  return speed * (units[unit] || 1);
}

function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${Math.round(seconds * 100) / 100} seconds`;
  } else if (seconds < 3600) {
    const minutes = seconds / 60;
    return `${Math.round(minutes * 100) / 100} minutes`;
  } else if (seconds < 86400) {
    const hours = seconds / 3600;
    return `${Math.round(hours * 100) / 100} hours`;
  } else {
    const days = seconds / 86400;
    return `${Math.round(days * 100) / 100} days`;
  }
}

function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
}

async function logEvent(event: any) {
  // In a real application, you would send this to your analytics service
  // For now, we'll just log it to the console
  console.log('Analytics event:', event);
}
