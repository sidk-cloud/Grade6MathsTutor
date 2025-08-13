'use client';

import { useState } from 'react';

interface PrimeCheckerProps {
  maxNumber?: number;
  interactive?: boolean;
}

export default function PrimeChecker({ maxNumber = 50, interactive = true }: PrimeCheckerProps) {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [showFactors, setShowFactors] = useState(false);

  // Function to check if a number is prime
  const isPrime = (num: number): boolean => {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  };

  // Function to get all factors of a number
  const getFactors = (num: number): number[] => {
    const factors = [];
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        factors.push(i);
      }
    }
    return factors;
  };

  const numbers = Array.from({ length: maxNumber }, (_, i) => i + 1);
  const primes = numbers.filter(isPrime);

  const handleNumberClick = (num: number) => {
    if (!interactive) return;
    setSelectedNumber(num);
    setShowFactors(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Prime Number Explorer</h3>
      
      {/* Number Grid */}
      <div className="grid grid-cols-10 gap-2 mb-6">
        {numbers.map((num) => {
          const isNumPrime = isPrime(num);
          const isSelected = selectedNumber === num;
          
          return (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className={`w-10 h-10 text-sm font-medium rounded transition-all ${
                isSelected
                  ? 'bg-purple-600 text-white scale-110'
                  : isNumPrime
                  ? 'bg-green-200 text-green-800 hover:bg-green-300'
                  : 'bg-red-100 text-red-600 hover:bg-red-200'
              } ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
              title={`${num} is ${isNumPrime ? 'prime' : 'composite'}`}
            >
              {num}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-200 rounded"></div>
          <span>Prime Numbers ({primes.length})</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-100 rounded"></div>
          <span>Composite Numbers</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-600 rounded"></div>
          <span>Selected Number</span>
        </div>
      </div>

      {/* Selected Number Analysis */}
      {selectedNumber && showFactors && (
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-700 mb-3">
            Analysis of {selectedNumber}
          </h4>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Classification:</p>
                <p className={`text-lg font-bold ${
                  isPrime(selectedNumber) ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedNumber === 1 
                    ? 'Neither Prime nor Composite' 
                    : isPrime(selectedNumber) 
                    ? 'Prime Number' 
                    : 'Composite Number'
                  }
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600">Factors:</p>
                <p className="text-lg">
                  {getFactors(selectedNumber).join(', ')}
                </p>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t">
              <p className="text-sm text-gray-600">
                {selectedNumber === 1 
                  ? "The number 1 is special - it's neither prime nor composite because it only has one factor: itself."
                  : isPrime(selectedNumber)
                  ? `${selectedNumber} is prime because it can only be divided evenly by 1 and ${selectedNumber}.`
                  : `${selectedNumber} is composite because it has ${getFactors(selectedNumber).length} factors: ${getFactors(selectedNumber).join(', ')}.`
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Educational Content */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Remember:</strong> A prime number has exactly two factors: 1 and itself. 
          A composite number has more than two factors. The number 1 is neither prime nor composite.
        </p>
        <p className="text-sm text-blue-700 mt-2">
          <strong>Fun Fact:</strong> There are {primes.length} prime numbers between 1 and {maxNumber}!
        </p>
      </div>
    </div>
  );
}
