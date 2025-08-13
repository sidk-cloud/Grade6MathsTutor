'use client';

import { useState } from 'react';

interface Fraction {
  numerator: number;
  denominator: number;
}

interface FractionVisualizationProps {
  fractions?: Fraction[];
  interactive?: boolean;
}

export default function FractionBarsVisualization({ 
  fractions = [{ numerator: 1, denominator: 2 }, { numerator: 2, denominator: 4 }],
  interactive = true 
}: FractionVisualizationProps) {
  const [customFractions, setCustomFractions] = useState<Fraction[]>(fractions);
  const [newNumerator, setNewNumerator] = useState<number>(1);
  const [newDenominator, setNewDenominator] = useState<number>(3);

  const addFraction = () => {
    if (newDenominator > 0 && newNumerator >= 0) {
      setCustomFractions([...customFractions, { numerator: newNumerator, denominator: newDenominator }]);
    }
  };

  const clearFractions = () => {
    setCustomFractions([]);
  };

  const FractionBar = ({ fraction, index }: { fraction: Fraction; index: number }) => {
    const { numerator, denominator } = fraction;
    const segments = Array.from({ length: denominator }, (_, i) => i);
    const filledSegments = Math.min(numerator, denominator);
    
    const colors = ['bg-blue-400', 'bg-green-400', 'bg-purple-400', 'bg-orange-400', 'bg-pink-400'];
    const colorClass = colors[index % colors.length];

    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-gray-700">
            {numerator}/{denominator} = {(numerator / denominator).toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            {numerator > denominator ? 'Improper fraction' : numerator === denominator ? 'Whole number' : 'Proper fraction'}
          </span>
        </div>
        
        <div className="flex border-2 border-gray-300 rounded-lg overflow-hidden h-12">
          {segments.map((segment) => (
            <div
              key={segment}
              className={`flex-1 border-r border-gray-300 last:border-r-0 ${
                segment < filledSegments ? colorClass : 'bg-gray-100'
              } transition-colors duration-300`}
              title={`Segment ${segment + 1} of ${denominator}`}
            >
              <div className="h-full flex items-center justify-center text-white font-bold text-xs">
                {segment < filledSegments ? '✓' : ''}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-xs text-gray-500 mt-1">
          {filledSegments} out of {denominator} parts filled
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Fraction Visualization</h3>
      
      {/* Fraction Bars */}
      <div className="space-y-4 mb-6">
        {customFractions.map((fraction, index) => (
          <FractionBar key={index} fraction={fraction} index={index} />
        ))}
      </div>

      {/* Controls */}
      {interactive && (
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-700 mb-3">Add Your Own Fraction</h4>
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex items-center space-x-1">
              <input
                type="number"
                min="0"
                value={newNumerator}
                onChange={(e) => setNewNumerator(parseInt(e.target.value) || 0)}
                className="w-16 p-2 border rounded text-center"
                placeholder="1"
              />
              <span className="text-2xl font-bold">/</span>
              <input
                type="number"
                min="1"
                max="12"
                value={newDenominator}
                onChange={(e) => setNewDenominator(parseInt(e.target.value) || 1)}
                className="w-16 p-2 border rounded text-center"
                placeholder="2"
              />
            </div>
            
            <button
              onClick={addFraction}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Add Fraction
            </button>
            
            <button
              onClick={clearFractions}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Clear All
            </button>
          </div>
          
          <div className="text-sm text-gray-600">
            <p><strong>Try these examples:</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>1/2 and 2/4 (equivalent fractions)</li>
              <li>3/4 and 6/8 (equivalent fractions)</li>
              <li>5/3 (improper fraction - greater than 1)</li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Educational Tips */}
      <div className="mt-4 p-3 bg-green-50 rounded-lg">
        <p className="text-sm text-green-800">
          <strong>Learn:</strong> The bottom number (denominator) shows how many equal parts the whole is divided into. 
          The top number (numerator) shows how many parts are filled. 
          Fractions with the same decimal value are equivalent!
        </p>
      </div>
    </div>
  );
}
