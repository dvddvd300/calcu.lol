// Test component to verify percentage calculations
'use client';

export default function PercentageCalculatorTest() {
  const testCases = [
    { value: 100, percentage: 20, expected: 20 },
    { value: 250, percentage: 15, expected: 37.5 },
    { value: 80, percentage: 25, expected: 20 },
    { value: 1000, percentage: 10, expected: 100 },
    { value: 200, percentage: 50, expected: 100 },
    { value: 120, percentage: 75, expected: 90 }
  ];

  const calculatePercentage = (value: number, percentage: number) => {
    return (value * percentage) / 100;
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Percentage Calculator Tests</h3>
      <div className="space-y-2">
        {testCases.map((test, index) => {
          const result = calculatePercentage(test.value, test.percentage);
          const isCorrect = Math.abs(result - test.expected) < 0.01;
          
          return (
            <div key={index} className={`p-2 rounded ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
              <span className="font-mono">
                {test.percentage}% of {test.value} = {result} 
                {isCorrect ? ' ✅' : ` ❌ (expected ${test.expected})`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
