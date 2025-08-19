'use client';

import { useState } from 'react';
import { useMastery } from '../context/MasteryContext';
import { Play, Pause, SkipForward, BookOpen, Brain, Target, Award } from 'lucide-react';
import { MathTopic, Concept } from '../lib/comprehensive-curriculum';
import NumberLineVisualization from './visualizations/NumberLineVisualization';
import FractionBarsVisualization from './visualizations/FractionBarsVisualization';
import PrimeChecker from './visualizations/PrimeChecker';
import AssessmentComponent from './AssessmentComponent';
import InteractivePractice, { ScoreProvider } from './InteractivePractice';

// Horizontal Number Line Visualization Component
const HorizontalNumberLineVisualization = ({ concept }: { concept: Concept }) => {
  const [highlightedPoint, setHighlightedPoint] = useState<number | null>(null);
  
  const numberRange = [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10];
  
  return (
    <div className="bg-blue-50 p-6 rounded-lg">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Interactive Horizontal Number Line</h4>
      
      <div className="relative bg-white p-8 rounded-lg border-2 border-blue-200">
        {/* Number line */}
        <div className="relative h-4 bg-gray-300 rounded-full mb-6">
          <div className="absolute inset-y-0 left-1/2 w-1 bg-gray-600 rounded"></div>
          
          {/* Tick marks and numbers */}
          <div className="absolute -top-8 w-full flex justify-between">
            {numberRange.map((num) => (
              <div key={num} className="flex flex-col items-center">
                <button
                  onClick={() => setHighlightedPoint(num)}
                  className={`w-3 h-8 rounded-full border-2 transition-all cursor-pointer ${
                    highlightedPoint === num
                      ? 'bg-blue-500 border-blue-600 transform scale-125'
                      : 'bg-white border-gray-400 hover:border-blue-400'
                  }`}
                ></button>
                <span className={`text-sm mt-2 font-medium ${
                  highlightedPoint === num ? 'text-blue-600 font-bold' : 'text-gray-600'
                }`}>
                  {num}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          {highlightedPoint !== null ? (
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-blue-800 font-semibold">
                Selected: {highlightedPoint}
                {highlightedPoint > 0 && " (positive integer)"}
                {highlightedPoint < 0 && " (negative integer)"}
                {highlightedPoint === 0 && " (zero)"}
              </p>
            </div>
          ) : (
            <p className="text-gray-600">Click on any point to explore the number line</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Graphing Number Line Visualization Component
const GraphingNumberLineVisualization = ({ concept }: { concept: Concept }) => {
  const [points, setPoints] = useState<number[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<number>(0);
  
  const numberRange = [-8, -6, -4, -2, 0, 2, 4, 6, 8];
  
  const addPoint = (num: number) => {
    if (!points.includes(num)) {
      setPoints([...points, num].sort((a, b) => a - b));
    }
  };
  
  const removePoint = (num: number) => {
    setPoints(points.filter(p => p !== num));
  };
  
  const clearAll = () => {
    setPoints([]);
  };
  
  return (
    <div className="bg-green-50 p-6 rounded-lg">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Interactive Graphing Practice</h4>
      
      <div className="space-y-6">
        {/* Controls */}
        <div className="bg-white p-4 rounded-lg border-2 border-green-200">
          <div className="flex items-center space-x-4 mb-4">
            <label className="font-medium text-gray-700">Add number to graph:</label>
            <select
              value={selectedNumber}
              onChange={(e) => setSelectedNumber(parseInt(e.target.value))}
              className="border border-gray-300 rounded px-3 py-2"
            >
              {numberRange.map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            <button
              onClick={() => addPoint(selectedNumber)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Point
            </button>
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear All
            </button>
          </div>
          
          <div className="text-sm text-gray-600">
            Points graphed: {points.length > 0 ? points.join(', ') : 'None'}
          </div>
        </div>
        
        {/* Graph */}
        <div className="relative bg-white p-8 rounded-lg border-2 border-green-200">
          <div className="relative h-4 bg-gray-300 rounded-full">
            <div className="absolute inset-y-0 left-1/2 w-1 bg-gray-600 rounded"></div>
            
            {/* Tick marks and numbers */}
            <div className="absolute -top-8 w-full flex justify-between">
              {numberRange.map((num) => (
                <div key={num} className="flex flex-col items-center">
                  <div
                    className={`w-4 h-8 rounded-full border-2 transition-all ${
                      points.includes(num)
                        ? 'bg-green-500 border-green-600 animate-pulse'
                        : 'bg-white border-gray-400'
                    }`}
                  >
                    {points.includes(num) && (
                      <button
                        onClick={() => removePoint(num)}
                        className="w-full h-full text-white text-xs font-bold hover:bg-red-500 rounded-full"
                        title="Click to remove"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <span className="text-sm mt-2 text-gray-600 font-medium">{num}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Vertical Number Line Visualization Component
const VerticalNumberLineVisualization = ({ concept }: { concept: Concept }) => {
  const [highlightedPoint, setHighlightedPoint] = useState<number | null>(null);
  
  const numberRange = [10, 8, 6, 4, 2, 0, -2, -4, -6, -8, -10];
  
  return (
    <div className="bg-purple-50 p-6 rounded-lg">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Interactive Vertical Number Line</h4>
      
      <div className="flex justify-center">
        <div className="relative bg-white p-8 rounded-lg border-2 border-purple-200">
          {/* Vertical number line */}
          <div className="relative w-4 h-80 bg-gray-300 rounded-full mx-auto">
            <div className="absolute inset-x-0 top-1/2 h-1 bg-gray-600 rounded"></div>
            
            {/* Tick marks and numbers */}
            <div className="absolute -left-16 h-full flex flex-col justify-between">
              {numberRange.map((num, index) => (
                <div key={num} className="flex items-center space-x-4">
                  <span className={`text-sm font-medium ${
                    highlightedPoint === num ? 'text-purple-600 font-bold' : 'text-gray-600'
                  }`}>
                    {num}
                  </span>
                  <button
                    onClick={() => setHighlightedPoint(num)}
                    className={`w-8 h-3 rounded-full border-2 transition-all cursor-pointer ${
                      highlightedPoint === num
                        ? 'bg-purple-500 border-purple-600 transform scale-125'
                        : 'bg-white border-gray-400 hover:border-purple-400'
                    }`}
                  ></button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-6 w-48">
            {highlightedPoint !== null ? (
              <div className="bg-purple-100 p-4 rounded-lg">
                <p className="text-purple-800 font-semibold">
                  Selected: {highlightedPoint}
                  {highlightedPoint > 0 && " (positive)"}
                  {highlightedPoint < 0 && " (negative)"}
                  {highlightedPoint === 0 && " (zero)"}
                </p>
              </div>
            ) : (
              <p className="text-gray-600">Click on any point to explore</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Vertical Graphing Visualization Component
const VerticalGraphingVisualization = ({ concept }: { concept: Concept }) => {
  const [points, setPoints] = useState<number[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<number>(0);
  
  const numberRange = [8, 6, 4, 2, 0, -2, -4, -6, -8];
  
  const addPoint = (num: number) => {
    if (!points.includes(num)) {
      setPoints([...points, num]);
    }
  };
  
  const removePoint = (num: number) => {
    setPoints(points.filter(p => p !== num));
  };
  
  return (
    <div className="bg-indigo-50 p-6 rounded-lg">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Vertical Graphing Practice</h4>
      
      <div className="flex space-x-8 justify-center">
        {/* Controls */}
        <div className="bg-white p-4 rounded-lg border-2 border-indigo-200">
          <h5 className="font-medium text-gray-700 mb-3">Add Points</h5>
          <div className="space-y-2">
            {numberRange.map(num => (
              <button
                key={num}
                onClick={() => addPoint(num)}
                disabled={points.includes(num)}
                className={`w-full px-3 py-2 rounded text-sm font-medium ${
                  points.includes(num)
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-500 text-white hover:bg-indigo-600'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPoints([])}
            className="w-full mt-4 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            Clear All
          </button>
        </div>
        
        {/* Vertical Graph */}
        <div className="relative bg-white p-8 rounded-lg border-2 border-indigo-200">
          <div className="relative w-4 h-72 bg-gray-300 rounded-full mx-auto">
            <div className="absolute inset-x-0 top-1/2 h-1 bg-gray-600 rounded"></div>
            
            <div className="absolute -left-16 h-full flex flex-col justify-between">
              {numberRange.map((num) => (
                <div key={num} className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-600 w-6 text-right">{num}</span>
                  <div
                    className={`w-8 h-3 rounded-full border-2 transition-all ${
                      points.includes(num)
                        ? 'bg-indigo-500 border-indigo-600 animate-pulse'
                        : 'bg-white border-gray-400'
                    }`}
                  >
                    {points.includes(num) && (
                      <button
                        onClick={() => removePoint(num)}
                        className="w-full h-full text-white text-xs hover:bg-red-500 rounded-full"
                        title="Click to remove"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border-2 border-indigo-200">
          <h5 className="font-medium text-gray-700 mb-3">Points Graphed</h5>
          <div className="space-y-1">
            {points.length > 0 ? (
              points.sort((a, b) => b - a).map(point => (
                <div key={point} className="text-sm bg-indigo-100 px-2 py-1 rounded">
                  {point}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No points yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Default Interactive Visualization Component
const DefaultInteractiveVisualization = ({ concept }: { concept: Concept }) => {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-lg">
      <div className="text-center">
        <Brain className="h-12 w-12 text-purple-600 mx-auto mb-4" />
        <h4 className="text-lg font-semibold text-gray-800 mb-2">{concept.title}</h4>
        <p className="text-gray-600 mb-4">{concept.explanation}</p>
        
        <div className="bg-white p-6 rounded-lg border-2 border-purple-200">
          <div className="space-y-4">
            <div className="text-left">
              <h5 className="font-semibold text-gray-800 mb-2">Key Concepts:</h5>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Interactive learning element</li>
                <li>Visual representation of {concept.title.toLowerCase()}</li>
                <li>Hands-on practice opportunity</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800 text-sm">
                This interactive visualization helps you understand <strong>{concept.title.toLowerCase()}</strong> 
                through visual and hands-on learning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Integer Comparison Visualization Component
const IntegerComparisonVisualization = ({ concept }: { concept: Concept }) => {
  const [num1, setNum1] = useState(-3);
  const [num2, setNum2] = useState(5);
  
  const numbers = [-10, -7, -5, -3, -1, 0, 1, 3, 5, 7, 10];
  
  const getComparison = () => {
    if (num1 < num2) return '<';
    if (num1 > num2) return '>';
    return '=';
  };
  
  return (
    <div className="bg-yellow-50 p-6 rounded-lg">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Integer Comparison Visualizer</h4>
      
      <div className="bg-white p-6 rounded-lg border-2 border-yellow-200 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Number</label>
            <select
              value={num1}
              onChange={(e) => setNum1(parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {numbers.map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Second Number</label>
            <select
              value={num2}
              onChange={(e) => setNum2(parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {numbers.map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-6 text-4xl font-bold">
            <div className="bg-blue-100 px-8 py-4 rounded-lg border-2 border-blue-200">
              {num1}
            </div>
            <div className="bg-yellow-200 px-4 py-4 rounded-lg border-2 border-yellow-400">
              {getComparison()}
            </div>
            <div className="bg-blue-100 px-8 py-4 rounded-lg border-2 border-blue-200">
              {num2}
            </div>
          </div>
          
          <div className="mt-4 bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700">
              <strong>Explanation:</strong> {num1} {getComparison()} {num2} because {' '}
              {num1 < num2 && `${num1} is to the left of ${num2} on the number line`}
              {num1 > num2 && `${num1} is to the right of ${num2} on the number line`}
              {num1 === num2 && `both numbers are equal`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Integer Ordering Visualization Component
const IntegerOrderingVisualization = ({ concept }: { concept: Concept }) => {
  const [numbers, setNumbers] = useState([-4, 2, -1, 6, -3]);
  const [orderType, setOrderType] = useState<'ascending' | 'descending'>('ascending');
  
  const shuffleNumbers = () => {
    const availableNumbers = [-8, -6, -4, -2, -1, 0, 1, 3, 5, 7, 9];
    const selected = [];
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      selected.push(availableNumbers[randomIndex]);
      availableNumbers.splice(randomIndex, 1);
    }
    setNumbers(selected);
  };
  
  const sortedNumbers = [...numbers].sort((a, b) => 
    orderType === 'ascending' ? a - b : b - a
  );
  
  return (
    <div className="bg-red-50 p-6 rounded-lg">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Integer Ordering Visualizer</h4>
      
      <div className="bg-white p-6 rounded-lg border-2 border-red-200 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Order Type</label>
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value as 'ascending' | 'descending')}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="ascending">Ascending (smallest to largest)</option>
              <option value="descending">Descending (largest to smallest)</option>
            </select>
          </div>
          
          <button
            onClick={shuffleNumbers}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            New Numbers
          </button>
        </div>
        
        <div>
          <h5 className="font-medium text-gray-700 mb-3">Original Numbers:</h5>
          <div className="flex space-x-2">
            {numbers.map((num, index) => (
              <div key={index} className="bg-gray-100 px-4 py-2 rounded border text-center font-bold">
                {num}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h5 className="font-medium text-gray-700 mb-3">
            {orderType === 'ascending' ? 'Ascending' : 'Descending'} Order:
          </h5>
          <div className="flex space-x-2">
            {sortedNumbers.map((num, index) => (
              <div key={index} className="bg-red-100 px-4 py-2 rounded border-2 border-red-300 text-center font-bold">
                {num}
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800 text-sm">
            <strong>Remember:</strong> When ordering integers, negative numbers are smaller than positive numbers. 
            The further left a number is on the number line, the smaller it is.
          </p>
        </div>
      </div>
    </div>
  );
};

// Thermometer Visualization Component
const ThermometerVisualization = ({ concept }: { concept: Concept }) => {
  const [temperature, setTemperature] = useState(15);
  
  return (
    <div className="bg-red-50 p-6 rounded-lg">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Interactive Thermometer</h4>
      
      <div className="bg-white p-6 rounded-lg border-2 border-red-200">
        <div className="flex justify-center items-center space-x-8">
          {/* Thermometer */}
          <div className="relative">
            <div className="w-8 h-64 bg-white border-2 border-gray-400 rounded-full relative overflow-hidden">
              <div 
                className={`absolute bottom-0 w-full transition-all duration-500 ${
                  temperature >= 0 ? 'bg-red-400' : 'bg-blue-400'
                }`}
                style={{
                  height: `${Math.max(10, (temperature + 30) * 4)}px`
                }}
              ></div>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-400 rounded-full border-2 border-gray-400"></div>
          </div>
          
          {/* Controls */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">{temperature}°C</div>
              <p className="text-gray-600">
                {temperature > 0 ? 'Above zero (positive)' : 
                 temperature < 0 ? 'Below zero (negative)' : 
                 'At zero'}
              </p>
            </div>
            
            <div className="space-y-2">
              <input
                type="range"
                min="-30"
                max="50"
                value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>-30°C</span>
                <span>50°C</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800 text-sm">
            Temperature represents integers: positive numbers for above zero, 
            negative numbers for below zero, and zero at the freezing point.
          </p>
        </div>
      </div>
    </div>
  );
};

// Elevator Visualization Component
const ElevatorVisualization = ({ concept }: { concept: Concept }) => {
  const [currentFloor, setCurrentFloor] = useState(0);
  const floors = [5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5];
  
  const getFloorLabel = (floor: number) => {
    if (floor > 0) return `${floor}`;
    if (floor === 0) return 'G';
    return `B${Math.abs(floor)}`;
  };
  
  const getFloorDescription = (floor: number) => {
    if (floor > 0) return `Floor ${floor}`;
    if (floor === 0) return 'Ground Floor';
    return `Basement ${Math.abs(floor)}`;
  };
  
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Interactive Elevator</h4>
      
      <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
        <div className="flex justify-center items-center space-x-8">
          {/* Elevator shaft */}
          <div className="relative bg-gray-200 rounded-lg p-4" style={{ width: '120px', height: '400px' }}>
            <div className="absolute inset-2 bg-gray-100 rounded border-2 border-gray-300">
              {/* Elevator car */}
              <div 
                className="absolute w-full bg-blue-400 border-2 border-blue-500 rounded transition-all duration-1000 flex items-center justify-center text-white font-bold text-xl"
                style={{
                  height: '30px',
                  bottom: `${((currentFloor + 5) / 10) * 320 + 10}px`
                }}
              >
                🛗
              </div>
            </div>
            
            {/* Floor indicators */}
            <div className="absolute right-6 top-2 space-y-1">
              {floors.map((floor) => (
                <div 
                  key={floor}
                  className={`text-xs text-center w-6 h-6 flex items-center justify-center rounded ${
                    floor === currentFloor ? 'bg-blue-400 text-white font-bold' : 'text-gray-600'
                  }`}
                  style={{ marginBottom: '28px' }}
                >
                  {getFloorLabel(floor)}
                </div>
              ))}
            </div>
          </div>
          
          {/* Elevator buttons */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="grid grid-cols-1 gap-2 max-w-20">
              {floors.map((floor) => (
                <button
                  key={floor}
                  onClick={() => setCurrentFloor(floor)}
                  className={`w-16 h-12 rounded border-2 font-bold text-sm transition-all ${
                    currentFloor === floor
                      ? 'bg-blue-500 border-blue-600 text-white'
                      : 'bg-gray-200 border-gray-300 hover:bg-gray-300'
                  }`}
                >
                  {getFloorLabel(floor)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Information panel */}
          <div className="bg-blue-50 p-4 rounded-lg w-48">
            <h5 className="font-semibold text-gray-800 mb-2">Current Location:</h5>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-blue-600">{currentFloor}</div>
              <div className="text-gray-700">{getFloorDescription(currentFloor)}</div>
              <div className="text-sm text-gray-600">
                {currentFloor > 0 && "Positive integer (above ground)"}
                {currentFloor < 0 && "Negative integer (below ground)"}
                {currentFloor === 0 && "Zero (ground level)"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LessonViewerProps {
  topic: MathTopic;
  onComplete: (score: number) => void;
  onBack: () => void;
  voiceEnabled: boolean;
}

type LessonSection = 'overview' | 'concepts' | 'practice' | 'assessment';

// Lightweight Quick Check Quiz Component
const QuickCheckQuiz: React.FC<{concept: Concept}> = ({concept}) => {
  const { recordAttempt, getSkill } = useMastery();
  const objectives = concept.interactiveElements.flatMap(e=> (e as any).objectives || []);
  const distinct = Array.from(new Set(objectives));
  if(distinct.length===0) return null;
  // Generate a simple true/false or multiple-choice question from first objective heuristically
  const prompt = `Which statement best matches an objective of this concept?`;
  const correct = distinct[0];
  const distractors = distinct.slice(1,4);
  const options = [correct, ...distractors].sort(()=>Math.random()-0.5);
  const [selected,setSelected]=useState<string|undefined>();
  const [done,setDone]=useState(false);
  const select=(opt:string)=>{ if(done) return; setSelected(opt); setDone(true); if(opt===correct){ recordAttempt('QC_'+concept.id, true, 0, 0);} else { recordAttempt('QC_'+concept.id, false, 0, 0);} };
  return (
    <div className="mt-6 border rounded-lg p-4 bg-indigo-50">
      <h4 className="font-semibold text-indigo-800 mb-2">Quick Check</h4>
      <p className="text-sm text-indigo-700 mb-3">{prompt}</p>
      <div className="space-y-2">
        {options.map(opt=> (
          <button key={opt} onClick={()=>select(opt)} className={`w-full text-left px-3 py-2 rounded border text-sm transition ${selected? (opt===correct? 'bg-green-500 border-green-600 text-white': opt===selected? 'bg-red-500 border-red-600 text-white':'bg-white border-gray-300') : 'bg-white border-gray-300 hover:border-indigo-400'}`}>{opt}</button>
        ))}
      </div>
      {done && <div className="mt-3 text-sm font-medium {selected===correct? 'text-green-700':'text-red-700'}">{selected===correct? 'Correct!':'Review the objectives above.'}</div>}
    </div>
  );
};

export default function LessonViewer({ topic, onComplete, onBack, voiceEnabled }: LessonViewerProps) {
  const [currentSection, setCurrentSection] = useState<LessonSection>('overview');
  const [currentConceptIndex, setCurrentConceptIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [practiceProgress, setPracticeProgress] = useState<Record<string, boolean>>({});

  const speak = (text: string) => {
    if (voiceEnabled && 'speechSynthesis' in window) {
      speechSynthesis.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
      
      utterance.onend = () => setIsPlaying(false);
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const renderVisualization = (concept: Concept) => {
    // Number Line Visualizations
    if (concept.title.toLowerCase().includes('horizontal number lines') || concept.title.toLowerCase().includes('reading horizontal')) {
      return <HorizontalNumberLineVisualization concept={concept} />;
    }
    
    if (concept.title.toLowerCase().includes('graphing on horizontal number lines')) {
      return <GraphingNumberLineVisualization concept={concept} />;
    }
    
    if (concept.title.toLowerCase().includes('vertical number lines') || concept.title.toLowerCase().includes('reading vertical')) {
      return <VerticalNumberLineVisualization concept={concept} />;
    }
    
    if (concept.title.toLowerCase().includes('graphing on vertical number lines')) {
      return <VerticalGraphingVisualization concept={concept} />;
    }
    
    // Integer Visualizations
    if (concept.title.toLowerCase().includes('thermometer')) {
      return <ThermometerVisualization concept={concept} />;
    }
    
    if (concept.title.toLowerCase().includes('elevator')) {
      return <ElevatorVisualization concept={concept} />;
    }
    
    if (concept.title.toLowerCase().includes('comparison') || concept.title.toLowerCase().includes('comparing')) {
      return <IntegerComparisonVisualization concept={concept} />;
    }
    
    if (concept.title.toLowerCase().includes('ordering')) {
      return <IntegerOrderingVisualization concept={concept} />;
    }
    
    // Return appropriate visualization component based on concept
    if (concept.id.includes('integer') || concept.id.includes('number-line')) {
      return <NumberLineVisualization />;
    }
    if (concept.id.includes('fraction')) {
      return <FractionBarsVisualization />;
    }
    if (concept.id.includes('prime')) {
      return <PrimeChecker />;
    }
    
    // Default interactive visualization
    return <DefaultInteractiveVisualization concept={concept} />;
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Topic Header */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">{topic.title}</h1>
        <p className="text-primary-100 mb-4">{topic.description}</p>
        
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-1">
            <BookOpen className="h-4 w-4" />
            <span>{topic.estimatedTime} minutes</span>
          </div>
          <div className="flex items-center space-x-1">
            <Target className="h-4 w-4" />
            <span>{topic.category}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Award className="h-4 w-4" />
            <span>Level {topic.difficulty}</span>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">What You'll Learn</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {topic.learningObjectives && topic.learningObjectives.map((objective, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600 text-sm font-semibold">{index + 1}</span>
              </div>
              <span className="text-gray-700">{objective}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Voice Introduction */}
      {voiceEnabled && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Audio Introduction</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => speak(topic.voiceScript)}
                disabled={isPlaying}
                className="flex items-center space-x-2 bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 disabled:opacity-50"
              >
                <Play className="h-4 w-4" />
                <span>Play Introduction</span>
              </button>
              {isPlaying && (
                <button
                  onClick={stopSpeech}
                  className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  <Pause className="h-4 w-4" />
                  <span>Stop</span>
                </button>
              )}
            </div>
          </div>
          <p className="text-gray-600 italic">"{topic.voiceScript}"</p>
        </div>
      )}

      {/* Prerequisites */}
      {topic.prerequisites.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Prerequisites</h3>
          <p className="text-gray-600 mb-3">
            Make sure you understand these topics before continuing:
          </p>
          <div className="flex flex-wrap gap-2">
            {topic.prerequisites && topic.prerequisites.map((prereq, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {prereq}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Start Learning Button */}
      <div className="text-center">
        <button
          onClick={() => setCurrentSection('concepts')}
          className="btn-primary text-lg px-8 py-4"
        >
          Start Learning
        </button>
      </div>
    </div>
  );

  const renderConcepts = () => {
    const currentConcept = topic.concepts[currentConceptIndex];
    
    if (!currentConcept) return <div>No concepts available</div>;

    return (
      <div className="space-y-6">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Concept {currentConceptIndex + 1} of {topic.concepts.length}
          </h2>
          <div className="text-sm text-gray-500">
            {Math.round(((currentConceptIndex + 1) / topic.concepts.length) * 100)}% Complete
          </div>
        </div>

        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentConceptIndex + 1) / topic.concepts.length) * 100}%` }}
          />
        </div>

        {/* Concept Content */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900">{currentConcept.title}</h3>
            {voiceEnabled && (
              <button
                onClick={() => speak(currentConcept.explanation)}
                className="flex items-center space-x-2 text-secondary-600 hover:text-secondary-700"
              >
                <Play className="h-5 w-5" />
                <span>Listen</span>
              </button>
            )}
          </div>
          
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {currentConcept.explanation}
          </p>

          {/* Interactive Visualization */}
          <div className="mb-6">
            {renderVisualization(currentConcept)}
          </div>

          {/* Examples */}
          {currentConcept.examples && currentConcept.examples.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">Examples</h4>
              {currentConcept.examples.map((example, index) => (
                <div key={example.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium text-gray-800 mb-2">
                    Example {index + 1}: {example.problem}
                  </div>
                  <div className="text-green-700 font-semibold mb-2">
                    Solution: {example.solution}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Working:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {example.workingOut && example.workingOut.map((step, stepIndex) => (
                        <li key={stepIndex}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Inline quick knowledge check */}
          <QuickCheckQuiz concept={currentConcept} />
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentConceptIndex(Math.max(0, currentConceptIndex - 1))}
            disabled={currentConceptIndex === 0}
            className="btn-outline disabled:opacity-50"
          >
            Previous Concept
          </button>
          
          <button
            onClick={() => {
              if (currentConceptIndex < topic.concepts.length - 1) {
                setCurrentConceptIndex(currentConceptIndex + 1);
              } else {
                setCurrentSection('practice');
              }
            }}
            className="btn-primary"
          >
            {currentConceptIndex < topic.concepts.length - 1 ? 'Next Concept' : 'Practice Time'}
          </button>
        </div>
      </div>
    );
  };

  const renderPractice = () => {
    // Collect all interactive elements from all concepts
    const allInteractiveElements = topic.concepts.flatMap(concept => concept.interactiveElements);
    
    const handlePracticeComplete = (elementId: string, correct: boolean) => {
      if (correct) {
        setPracticeProgress(prev => ({ ...prev, [elementId]: true }));
      }
    };

    const completedCount = Object.values(practiceProgress).filter(Boolean).length;
    const totalElements = allInteractiveElements.length;
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Practice What You've Learned</h2>
          <p className="text-gray-600 mb-8">
            Great job learning about {topic.title}! Now let's practice with some interactive exercises.
          </p>
          
          {totalElements > 0 && (
            <div className="mb-6">
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full inline-block">
                Progress: {completedCount} of {totalElements} completed
              </div>
            </div>
          )}
        </div>

        {/* Interactive Practice Component */}
        {allInteractiveElements.length > 0 ? (
          <ScoreProvider>
            <InteractivePractice
              elements={allInteractiveElements}
              onComplete={handlePracticeComplete}
              topicId={topic.id}
            />
          </ScoreProvider>
        ) : (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              No interactive practice elements are available for this topic yet.
            </p>
            <p className="text-sm text-gray-500">
              You can still proceed to the assessment to test your understanding.
            </p>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={() => setCurrentSection('assessment')}
            className="btn-primary text-lg px-8 py-4"
          >
            Ready for Assessment
          </button>
        </div>
      </div>
    );
  };

  const renderAssessment = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Topic Assessment</h2>
        <p className="text-gray-600">
          Time to show what you've learned! Answer these questions about {topic.title}.
        </p>
      </div>

      <AssessmentComponent
        assessments={topic.assessments}
        onComplete={onComplete}
        topicTitle={topic.title}
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Navigation Header */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          ← Back to Topics
        </button>
        
        {/* Section Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {(['overview', 'concepts', 'practice', 'assessment'] as LessonSection[]).map((section) => (
            <button
              key={section}
              onClick={() => setCurrentSection(section)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentSection === section
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Section Content */}
      {currentSection === 'overview' && renderOverview()}
      {currentSection === 'concepts' && renderConcepts()}
      {currentSection === 'practice' && renderPractice()}
      {currentSection === 'assessment' && renderAssessment()}
    </div>
  );
}
