'use client';

import { useState } from 'react';

interface NumberLineProps {
  min?: number;
  max?: number;
  highlightNumbers?: number[];
  interactive?: boolean;
}

export default function NumberLineVisualization({ 
  min = -10, 
  max = 10, 
  highlightNumbers = [],
  interactive = true 
}: NumberLineProps) {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>(highlightNumbers);
  
  const range = max - min;
  const numbers = Array.from({ length: range + 1 }, (_, i) => min + i);
  
  const handleNumberClick = (num: number) => {
    if (!interactive) return;
    
    setSelectedNumbers(prev => 
      prev.includes(num) 
        ? prev.filter(n => n !== num)
        : [...prev, num]
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Interactive Number Line</h3>
      
      <div className="relative">
        {/* Main line */}
        <div className="w-full h-2 bg-gray-300 rounded-full relative">
          {/* Zero marker */}
          <div 
            className="absolute top-0 w-1 h-2 bg-red-500"
            style={{ left: `${((0 - min) / range) * 100}%` }}
          ></div>
        </div>
        
        {/* Number markers */}
        <div className="relative mt-2">
          {numbers.map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className={`absolute transform -translate-x-1/2 ${
                selectedNumbers.includes(num)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } ${
                num === 0 ? 'bg-red-100 border-2 border-red-500' : ''
              } w-8 h-8 rounded-full text-sm font-medium transition-colors cursor-pointer`}
              style={{ left: `${((num - min) / range) * 100}%` }}
              title={`Click to ${selectedNumbers.includes(num) ? 'deselect' : 'select'} ${num}`}
            >
              {num}
            </button>
          ))}
        </div>
        
        {/* Labels */}
        <div className="flex justify-between mt-10 text-xs text-gray-500">
          <span>Negative Numbers</span>
          <span>Zero</span>
          <span>Positive Numbers</span>
        </div>
      </div>
      
      {/* Instructions */}
      {interactive && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Instructions:</strong> Click on numbers to select them. 
            Notice how negative numbers are to the left of zero and positive numbers are to the right.
          </p>
          {selectedNumbers.length > 0 && (
            <p className="text-sm text-blue-700 mt-2">
              Selected numbers: {selectedNumbers.sort((a, b) => a - b).join(', ')}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
