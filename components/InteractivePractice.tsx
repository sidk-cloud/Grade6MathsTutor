'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, RefreshCw, Trophy, Star, Target } from 'lucide-react';
import { InteractiveElement } from '../lib/curriculum';

interface InteractivePracticeProps {
  elements: InteractiveElement[];
  onComplete: (elementId: string, correct: boolean) => void;
}

// Individual Interactive Components
const IntegerSorter = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const numbers = [-5, 3, -2, 0, 8, -1, 4];
  const [items, setItems] = useState(numbers.sort(() => Math.random() - 0.5));
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const checkOrder = (arr: number[]) => {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) return false;
    }
    return true;
  };

  const handleDragStart = (item: number) => {
    setDraggedItem(item);
  };

  const handleDrop = (targetIndex: number) => {
    if (draggedItem === null) return;
    
    const newItems = [...items];
    const draggedIndex = newItems.indexOf(draggedItem);
    newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);
    
    setItems(newItems);
    setDraggedItem(null);
    setAttempts(prev => prev + 1);
    
    if (checkOrder(newItems)) {
      setCompleted(true);
      onComplete(true);
    }
  };

  const reset = () => {
    setItems(numbers.sort(() => Math.random() - 0.5));
    setCompleted(false);
    setAttempts(0);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{element.title}</h3>
        <p className="text-gray-600 text-sm">{element.instructions}</p>
        {attempts > 0 && !completed && (
          <p className="text-blue-600 text-sm">Attempts: {attempts}</p>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 justify-center min-h-[60px] bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
        {items.map((number, index) => (
          <div
            key={`${number}-${index}`}
            draggable
            onDragStart={() => handleDragStart(number)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
            className={`
              w-12 h-12 flex items-center justify-center rounded-lg font-bold text-white cursor-move
              ${number >= 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'}
              ${completed ? 'ring-2 ring-green-400' : ''}
              transition-all duration-200 transform hover:scale-105
            `}
          >
            {number}
          </div>
        ))}
      </div>
      
      {completed && (
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="font-semibold">Perfect! Well done!</span>
          </div>
          <p className="text-sm text-gray-600">You sorted the integers correctly in {attempts} attempts.</p>
        </div>
      )}
      
      <div className="text-center">
        <button onClick={reset} className="btn-secondary">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </button>
      </div>
    </div>
  );
};

const FractionBuilder = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');
  const [targetFraction, setTargetFraction] = useState({ num: 3, den: 4 });
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const checkFraction = () => {
    const num = parseInt(numerator);
    const den = parseInt(denominator);
    
    if (isNaN(num) || isNaN(den) || den === 0) return;
    
    setAttempts(prev => prev + 1);
    
    // Check if fractions are equivalent
    if (num * targetFraction.den === den * targetFraction.num) {
      setCompleted(true);
      onComplete(true);
    }
  };

  const reset = () => {
    const fractions = [
      { num: 1, den: 2 }, { num: 2, den: 3 }, { num: 3, den: 4 }, 
      { num: 1, den: 3 }, { num: 2, den: 5 }, { num: 3, den: 5 }
    ];
    setTargetFraction(fractions[Math.floor(Math.random() * fractions.length)]);
    setNumerator('');
    setDenominator('');
    setCompleted(false);
    setAttempts(0);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{element.title}</h3>
        <p className="text-gray-600 text-sm">{element.instructions}</p>
      </div>
      
      {/* Visual fraction representation */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="text-center mb-4">
          <p className="text-gray-700">Create a fraction equivalent to:</p>
          <div className="text-3xl font-bold text-blue-600 my-2">
            {targetFraction.num}/{targetFraction.den}
          </div>
        </div>
        
        {/* Visual representation */}
        <div className="flex justify-center mb-4">
          <div className="grid grid-cols-4 gap-1 w-32 h-32">
            {Array.from({ length: targetFraction.den }, (_, i) => (
              <div
                key={i}
                className={`border-2 border-blue-300 rounded ${
                  i < targetFraction.num ? 'bg-blue-500' : 'bg-white'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Input area */}
      <div className="flex items-center justify-center space-x-4">
        <input
          type="number"
          value={numerator}
          onChange={(e) => setNumerator(e.target.value)}
          placeholder="numerator"
          className="w-20 text-center border rounded-lg px-3 py-2"
          disabled={completed}
        />
        <span className="text-2xl font-bold text-gray-600">/</span>
        <input
          type="number"
          value={denominator}
          onChange={(e) => setDenominator(e.target.value)}
          placeholder="denominator"
          className="w-20 text-center border rounded-lg px-3 py-2"
          disabled={completed}
        />
        <button
          onClick={checkFraction}
          disabled={completed || !numerator || !denominator}
          className="btn-primary px-6"
        >
          Check
        </button>
      </div>
      
      {completed && (
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <Trophy className="h-5 w-5" />
            <span className="font-semibold">Excellent work!</span>
          </div>
          <p className="text-sm text-gray-600">
            {numerator}/{denominator} = {targetFraction.num}/{targetFraction.den}
          </p>
        </div>
      )}
      
      <div className="text-center">
        <button onClick={reset} className="btn-secondary">
          <RefreshCw className="h-4 w-4 mr-2" />
          New Problem
        </button>
      </div>
    </div>
  );
};

const NumberLineClick = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [target, setTarget] = useState(7);
  const [selected, setSelected] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);
  
  useEffect(() => {
    setTarget(Math.floor(Math.random() * 20) + 1);
  }, []);

  const handleClick = (number: number) => {
    if (completed) return;
    
    setSelected(number);
    if (number === target) {
      setCompleted(true);
      onComplete(true);
    }
  };

  const reset = () => {
    setTarget(Math.floor(Math.random() * 20) + 1);
    setSelected(null);
    setCompleted(false);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{element.title}</h3>
        <p className="text-gray-600 text-sm">Click on the number: <strong>{target}</strong></p>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-center items-center space-x-1 overflow-x-auto">
          {Array.from({ length: 21 }, (_, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`
                w-10 h-10 rounded-full font-semibold transition-all duration-200
                ${selected === i
                  ? completed 
                    ? 'bg-green-500 text-white ring-2 ring-green-400' 
                    : 'bg-red-500 text-white'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                }
              `}
            >
              {i}
            </button>
          ))}
        </div>
      </div>
      
      {completed && (
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <Target className="h-5 w-5" />
            <span className="font-semibold">Perfect aim!</span>
          </div>
        </div>
      )}
      
      <div className="text-center">
        <button onClick={reset} className="btn-secondary">
          <RefreshCw className="h-4 w-4 mr-2" />
          New Number
        </button>
      </div>
    </div>
  );
};

const MathInput = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [answer, setAnswer] = useState('');
  const [problem, setProblem] = useState({ question: '12 + 15', answer: 27 });
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const problems = [
    { question: '12 + 15', answer: 27 },
    { question: '25 - 8', answer: 17 },
    { question: '6 × 7', answer: 42 },
    { question: '48 ÷ 6', answer: 8 },
    { question: '15 + 23', answer: 38 },
    { question: '100 - 37', answer: 63 }
  ];

  useEffect(() => {
    setProblem(problems[Math.floor(Math.random() * problems.length)]);
  }, []);

  const checkAnswer = () => {
    const userAnswer = parseInt(answer);
    setAttempts(prev => prev + 1);
    
    if (userAnswer === problem.answer) {
      setCompleted(true);
      onComplete(true);
    }
  };

  const reset = () => {
    setProblem(problems[Math.floor(Math.random() * problems.length)]);
    setAnswer('');
    setCompleted(false);
    setAttempts(0);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{element.title}</h3>
        <p className="text-gray-600 text-sm">{element.instructions}</p>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg text-center">
        <div className="text-2xl font-bold text-blue-800 mb-4">
          {problem.question} = ?
        </div>
        
        <div className="flex items-center justify-center space-x-4">
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your answer"
            className="w-32 text-center text-lg border rounded-lg px-3 py-2"
            disabled={completed}
            onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
          />
          <button
            onClick={checkAnswer}
            disabled={completed || !answer}
            className="btn-primary"
          >
            Check
          </button>
        </div>
        
        {attempts > 0 && !completed && (
          <p className="text-red-600 text-sm mt-2">Try again! Attempts: {attempts}</p>
        )}
      </div>
      
      {completed && (
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <Star className="h-5 w-5" />
            <span className="font-semibold">Correct!</span>
          </div>
          <p className="text-sm text-gray-600">
            {problem.question} = {problem.answer}
          </p>
        </div>
      )}
      
      <div className="text-center">
        <button onClick={reset} className="btn-secondary">
          <RefreshCw className="h-4 w-4 mr-2" />
          New Problem
        </button>
      </div>
    </div>
  );
};

// NumberLineReader Component
const NumberLineReader = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [targetValue, setTargetValue] = useState(3);
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const numberLineValues = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

  const checkAnswer = (value: number) => {
    setSelectedValue(value);
    setAttempts(prev => prev + 1);
    
    if (value === targetValue) {
      setCompleted(true);
      onComplete(true);
    }
  };

  const reset = () => {
    setTargetValue(numberLineValues[Math.floor(Math.random() * numberLineValues.length)]);
    setSelectedValue(null);
    setCompleted(false);
    setAttempts(0);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{element.title}</h3>
        <p className="text-gray-600 text-sm">Click on the number line to identify: <strong>{targetValue}</strong></p>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="relative">
          {/* Number line */}
          <div className="flex justify-between items-center mb-4">
            <div className="w-full h-2 bg-gray-300 rounded relative">
              <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-600"></div>
            </div>
          </div>
          
          {/* Number markers */}
          <div className="flex justify-between">
            {numberLineValues.map((value) => (
              <div key={value} className="flex flex-col items-center">
                <button
                  onClick={() => checkAnswer(value)}
                  disabled={completed}
                  className={`w-8 h-8 rounded-full border-2 text-sm font-semibold ${
                    selectedValue === value
                      ? completed && value === targetValue
                        ? 'bg-green-500 border-green-600 text-white'
                        : 'bg-blue-500 border-blue-600 text-white'
                      : 'bg-white border-gray-300 hover:border-blue-400'
                  } ${completed ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {value}
                </button>
                <div className="text-xs text-gray-500 mt-1">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Attempts: {attempts}
        </div>
        <button
          onClick={reset}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          <RefreshCw className="h-4 w-4" />
          <span>New Question</span>
        </button>
      </div>
      
      {completed && (
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <p className="text-green-700 font-semibold">Correct! You identified {targetValue} on the number line.</p>
        </div>
      )}
    </div>
  );
};

// ThermometerVisualization Component
const ThermometerVisualization = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [temperature, setTemperature] = useState(0);
  const [targetTemp, setTargetTemp] = useState(15);
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const checkAnswer = () => {
    setAttempts(prev => prev + 1);
    if (temperature === targetTemp) {
      setCompleted(true);
      onComplete(true);
    }
  };

  const reset = () => {
    const temps = [-10, -5, 0, 5, 10, 15, 20, 25, 30];
    setTargetTemp(temps[Math.floor(Math.random() * temps.length)]);
    setTemperature(0);
    setCompleted(false);
    setAttempts(0);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{element.title}</h3>
        <p className="text-gray-600 text-sm">Set the thermometer to show: <strong>{targetTemp}°C</strong></p>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg flex justify-center">
        <div className="flex items-center space-x-6">
          {/* Thermometer */}
          <div className="relative">
            <div className="w-8 h-64 bg-white border-2 border-gray-400 rounded-full relative overflow-hidden">
              <div 
                className={`absolute bottom-0 w-full transition-all duration-300 ${
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
              <div className="text-2xl font-bold text-gray-800">{temperature}°C</div>
            </div>
            
            <div className="space-y-2">
              <input
                type="range"
                min="-30"
                max="50"
                value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value))}
                className="w-full"
                disabled={completed}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>-30°C</span>
                <span>50°C</span>
              </div>
            </div>
            
            <button
              onClick={checkAnswer}
              disabled={completed}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check Answer
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Attempts: {attempts}
        </div>
        <button
          onClick={reset}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          <RefreshCw className="h-4 w-4" />
          <span>New Question</span>
        </button>
      </div>
      
      {completed && (
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <p className="text-green-700 font-semibold">Correct! You set the thermometer to {targetTemp}°C.</p>
        </div>
      )}
    </div>
  );
};

// IntegerComparator Component
const IntegerComparator = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [num1, setNum1] = useState(-3);
  const [num2, setNum2] = useState(2);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const symbols = ['<', '>', '='];
  
  const getCorrectSymbol = () => {
    if (num1 < num2) return '<';
    if (num1 > num2) return '>';
    return '=';
  };

  const checkAnswer = (symbol: string) => {
    setSelectedSymbol(symbol);
    setAttempts(prev => prev + 1);
    
    if (symbol === getCorrectSymbol()) {
      setCompleted(true);
      onComplete(true);
    }
  };

  const reset = () => {
    const numbers = [-10, -5, -3, -1, 0, 1, 3, 5, 8, 10];
    setNum1(numbers[Math.floor(Math.random() * numbers.length)]);
    setNum2(numbers[Math.floor(Math.random() * numbers.length)]);
    setSelectedSymbol('');
    setCompleted(false);
    setAttempts(0);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{element.title}</h3>
        <p className="text-gray-600 text-sm">Compare the integers using {'<'}, {'>'}, or =</p>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="flex items-center justify-center space-x-6 text-3xl font-bold">
          <div className="bg-white px-6 py-4 rounded-lg border-2 border-blue-200">
            {num1}
          </div>
          
          <div className="flex space-x-2">
            {symbols.map((symbol) => (
              <button
                key={symbol}
                onClick={() => checkAnswer(symbol)}
                disabled={completed}
                className={`w-16 h-16 rounded-lg border-2 text-2xl font-bold ${
                  selectedSymbol === symbol
                    ? completed && symbol === getCorrectSymbol()
                      ? 'bg-green-500 border-green-600 text-white'
                      : 'bg-blue-500 border-blue-600 text-white'
                    : 'bg-white border-gray-300 hover:border-blue-400'
                } ${completed ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {symbol}
              </button>
            ))}
          </div>
          
          <div className="bg-white px-6 py-4 rounded-lg border-2 border-blue-200">
            {num2}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Attempts: {attempts}
        </div>
        <button
          onClick={reset}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          <RefreshCw className="h-4 w-4" />
          <span>New Question</span>
        </button>
      </div>
      
      {completed && (
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <p className="text-green-700 font-semibold">Correct! {num1} {getCorrectSymbol()} {num2}</p>
        </div>
      )}
    </div>
  );
};

// Generic Interactive Component (fallback for similar components)
const GenericInteractive = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (userInput.trim()) {
      setAttempts(prev => prev + 1);
      setCurrentScore(prev => prev + 1);
      setFeedback('Great work! You completed this practice activity.');
      setCompleted(true);
      onComplete(true);
    }
  };

  const reset = () => {
    setCompleted(false);
    setAttempts(0);
    setUserInput('');
    setFeedback('');
    setCurrentScore(0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !completed) {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{element.title}</h3>
        <p className="text-gray-600 text-sm">{element.instructions}</p>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
        <div className="text-center space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="mb-4">
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="font-semibold text-gray-800 mb-2">Practice Activity</h4>
              <p className="text-sm text-gray-600">{element.instructions}</p>
            </div>
            
            {!completed ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your response here..."
                  className="w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!userInput.trim()}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Answer
                </button>
              </div>
            ) : (
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <p className="text-green-700 font-semibold mb-2">Excellent Work!</p>
                <p className="text-sm text-gray-600">{feedback}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Score: {currentScore} • Attempts: {attempts}
        </div>
        <button
          onClick={reset}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
};

// IntegerIdentifier Component
const IntegerIdentifier = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [selectedType, setSelectedType] = useState<string>('');
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const numbers = [-8, -3, -1, 0, 1, 4, 7, 10];
  const types = ['Negative Integer', 'Zero', 'Positive Integer'];

  const getCorrectType = (num: number) => {
    if (num < 0) return 'Negative Integer';
    if (num === 0) return 'Zero';
    return 'Positive Integer';
  };

  const checkAnswer = (type: string) => {
    setSelectedType(type);
    setAttempts(prev => prev + 1);
    
    if (type === getCorrectType(currentNumber)) {
      setCompleted(true);
      onComplete(true);
    }
  };

  const reset = () => {
    setCurrentNumber(numbers[Math.floor(Math.random() * numbers.length)]);
    setSelectedType('');
    setCompleted(false);
    setAttempts(0);
  };

  // Initialize on first load
  useState(() => {
    setCurrentNumber(numbers[Math.floor(Math.random() * numbers.length)]);
  });

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{element.title}</h3>
        <p className="text-gray-600 text-sm">Identify the type of integer shown below</p>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="text-center space-y-6">
          {/* Large number display */}
          <div className="bg-white rounded-xl p-8 border-2 border-blue-200 shadow-sm">
            <div className="text-6xl font-bold text-gray-800 mb-4">{currentNumber}</div>
            <p className="text-gray-600">What type of integer is this?</p>
          </div>
          
          {/* Answer buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => checkAnswer(type)}
                disabled={completed}
                className={`p-4 rounded-lg border-2 font-semibold transition-all ${
                  selectedType === type
                    ? completed && type === getCorrectType(currentNumber)
                      ? 'bg-green-500 border-green-600 text-white'
                      : 'bg-red-500 border-red-600 text-white'
                    : 'bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                } ${completed ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Attempts: {attempts}
        </div>
        <button
          onClick={reset}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          <RefreshCw className="h-4 w-4" />
          <span>New Number</span>
        </button>
      </div>
      
      {completed && (
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <p className="text-green-700 font-semibold">
            Correct! {currentNumber} is a {getCorrectType(currentNumber)}.
          </p>
        </div>
      )}
    </div>
  );
};

// RealWorldIntegerMatcher Component
const RealWorldIntegerMatcher = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [currentScenario, setCurrentScenario] = useState<{scenario: string, integer: number}>({scenario: '', integer: 0});
  const [selectedInteger, setSelectedInteger] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const scenarios = [
    { scenario: "5 meters below sea level", integer: -5 },
    { scenario: "Temperature of 15°C above zero", integer: 15 },
    { scenario: "A debt of $20", integer: -20 },
    { scenario: "10 floors above ground level", integer: 10 },
    { scenario: "3°C below freezing", integer: -3 },
    { scenario: "Gaining 8 points in a game", integer: 8 },
    { scenario: "7 steps backward", integer: -7 },
    { scenario: "Ground level (sea level)", integer: 0 },
    { scenario: "Depositing $50 into bank account", integer: 50 },
    { scenario: "12 meters underground", integer: -12 }
  ];

  const integerOptions = [-20, -12, -7, -5, -3, 0, 8, 10, 15, 50];

  const checkAnswer = (integer: number) => {
    setSelectedInteger(integer);
    setAttempts(prev => prev + 1);
    
    if (integer === currentScenario.integer) {
      setCompleted(true);
      onComplete(true);
    }
  };

  const reset = () => {
    setCurrentScenario(scenarios[Math.floor(Math.random() * scenarios.length)]);
    setSelectedInteger(null);
    setCompleted(false);
    setAttempts(0);
  };

  // Initialize on first load
  useState(() => {
    setCurrentScenario(scenarios[Math.floor(Math.random() * scenarios.length)]);
  });

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{element.title}</h3>
        <p className="text-gray-600 text-sm">Match the real-world scenario with the correct integer</p>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="space-y-6">
          {/* Scenario display */}
          <div className="bg-white rounded-xl p-6 border-2 border-blue-200 text-center">
            <div className="text-xl font-semibold text-gray-800 mb-2">Real-World Scenario:</div>
            <div className="text-lg text-blue-600 font-medium bg-blue-50 p-4 rounded-lg">
              "{currentScenario.scenario}"
            </div>
            <p className="text-gray-600 mt-3">Which integer represents this situation?</p>
          </div>
          
          {/* Integer options */}
          <div className="grid grid-cols-5 gap-3">
            {integerOptions.map((integer) => (
              <button
                key={integer}
                onClick={() => checkAnswer(integer)}
                disabled={completed}
                className={`p-3 rounded-lg border-2 text-lg font-bold transition-all ${
                  selectedInteger === integer
                    ? completed && integer === currentScenario.integer
                      ? 'bg-green-500 border-green-600 text-white'
                      : 'bg-red-500 border-red-600 text-white'
                    : 'bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                } ${completed ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {integer}
              </button>
            ))}
          </div>
          
          {/* Explanation */}
          {completed && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-green-800 text-sm">
                <strong>Explanation:</strong> "{currentScenario.scenario}" represents the integer {currentScenario.integer} because:
                {currentScenario.integer > 0 && " it shows a positive quantity, gain, or direction."}
                {currentScenario.integer < 0 && " it shows a negative quantity, loss, or opposite direction."}
                {currentScenario.integer === 0 && " it represents a neutral point or zero reference."}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Attempts: {attempts}
        </div>
        <button
          onClick={reset}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          <RefreshCw className="h-4 w-4" />
          <span>New Scenario</span>
        </button>
      </div>
      
      {completed && (
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <p className="text-green-700 font-semibold">
            Correct! "{currentScenario.scenario}" = {currentScenario.integer}
          </p>
        </div>
      )}
    </div>
  );
};

// ElevatorVisualization Component
const ElevatorVisualization = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [currentFloor, setCurrentFloor] = useState(0);
  const [targetFloor, setTargetFloor] = useState(3);
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const floors = [5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5];

  const checkAnswer = (floor: number) => {
    setCurrentFloor(floor);
    setAttempts(prev => prev + 1);
    
    if (floor === targetFloor) {
      setCompleted(true);
      onComplete(true);
    }
  };

  const reset = () => {
    setTargetFloor(floors[Math.floor(Math.random() * floors.length)]);
    setCurrentFloor(0);
    setCompleted(false);
    setAttempts(0);
  };

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
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{element.title}</h3>
        <p className="text-gray-600 text-sm">Click the elevator button for: <strong>{getFloorDescription(targetFloor)}</strong></p>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="flex justify-center items-center space-x-8">
          {/* Elevator shaft */}
          <div className="relative bg-gray-200 rounded-lg p-4" style={{ width: '120px', height: '400px' }}>
            <div className="absolute inset-2 bg-gray-100 rounded border-2 border-gray-300">
              {/* Elevator car */}
              <div 
                className={`absolute w-full bg-blue-400 border-2 border-blue-500 rounded transition-all duration-500 flex items-center justify-center text-white font-bold`}
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
                    floor === targetFloor ? 'bg-yellow-400 text-black font-bold' : 'text-gray-600'
                  }`}
                  style={{
                    marginBottom: '28px'
                  }}
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
                  onClick={() => checkAnswer(floor)}
                  disabled={completed}
                  className={`w-16 h-12 rounded border-2 font-bold text-sm ${
                    currentFloor === floor
                      ? completed && floor === targetFloor
                        ? 'bg-green-500 border-green-600 text-white'
                        : 'bg-yellow-400 border-yellow-500 text-black'
                      : 'bg-gray-200 border-gray-300 hover:bg-gray-300'
                  } ${completed ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {getFloorLabel(floor)}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Integer: <strong>{targetFloor}</strong> = {getFloorDescription(targetFloor)}
          </p>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Attempts: {attempts}
        </div>
        <button
          onClick={reset}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          <RefreshCw className="h-4 w-4" />
          <span>New Floor</span>
        </button>
      </div>
      
      {completed && (
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <p className="text-green-700 font-semibold">
            Correct! Integer {targetFloor} represents {getFloorDescription(targetFloor)}.
          </p>
        </div>
      )}
    </div>
  );
};

// Factor Finder Component
const FactorFinderComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [targetNumber] = useState(24);
  const [factors, setFactors] = useState<number[]>([]);
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [completed, setCompleted] = useState(false);
  
  const correctFactors = [1, 2, 3, 4, 6, 8, 12, 24];
  
  const addFactor = () => {
    const num = parseInt(input);
    if (num && !factors.includes(num) && targetNumber % num === 0) {
      const newFactors = [...factors, num].sort((a, b) => a - b);
      setFactors(newFactors);
      setAttempts(prev => prev + 1);
      
      if (newFactors.length === correctFactors.length) {
        setCompleted(true);
        onComplete(true);
      }
    }
    setInput('');
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Find All Factors of {targetNumber}</h3>
      
      <div className="flex space-x-2">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a factor"
          className="flex-1 p-2 border rounded"
          disabled={completed}
          onKeyPress={(e) => e.key === 'Enter' && addFactor()}
        />
        <button
          onClick={addFactor}
          disabled={completed || !input}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          Add
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {correctFactors.map(factor => (
          <div
            key={factor}
            className={`p-2 text-center rounded ${
              factors.includes(factor) 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            {factors.includes(factor) ? factor : '?'}
          </div>
        ))}
      </div>
      
      <div className="text-sm text-gray-600">
        Found: {factors.length} / {correctFactors.length} factors
      </div>
      
      {completed && (
        <div className="p-4 bg-green-50 rounded-lg">
          <CheckCircle className="h-6 w-6 text-green-500 inline mr-2" />
          <span className="text-green-700">All factors found!</span>
        </div>
      )}
    </div>
  );
};

// Factor Tree Component
const FactorTreeComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [targetNumber] = useState(60);
  const [tree, setTree] = useState<{number: number, factors: [number, number] | null}[]>([{number: 60, factors: null}]);
  const [completed, setCompleted] = useState(false);
  
  const isPrime = (n: number) => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  };
  
  const factorizeNumber = (num: number, a: number, b: number) => {
    if (a * b === num && a > 1 && b > 1) {
      const newTree = tree.map(item => 
        item.number === num && item.factors === null 
          ? {...item, factors: [a, b] as [number, number]}
          : item
      );
      
      // Add new nodes for non-prime factors
      if (!isPrime(a)) newTree.push({number: a, factors: null});
      if (!isPrime(b)) newTree.push({number: b, factors: null});
      
      setTree(newTree);
      
      // Check if complete (all leaf nodes are prime)
      const incomplete = newTree.filter(item => item.factors === null && !isPrime(item.number));
      if (incomplete.length === 0) {
        setCompleted(true);
        onComplete(true);
      }
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Build a Factor Tree for {targetNumber}</h3>
      
      <div className="space-y-2">
        {tree.map((item, index) => (
          <div key={index} className="flex items-center space-x-4 p-2 border rounded">
            <span className="font-mono text-lg">{item.number}</span>
            {item.factors ? (
              <span className="text-green-600">= {item.factors[0]} × {item.factors[1]}</span>
            ) : isPrime(item.number) ? (
              <span className="text-blue-600">(prime)</span>
            ) : (
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="factor 1"
                  className="w-20 p-1 border rounded text-center"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const factor1 = parseInt(e.currentTarget.value);
                      const factor2 = item.number / factor1;
                      if (Number.isInteger(factor2)) {
                        factorizeNumber(item.number, factor1, factor2);
                      }
                    }
                  }}
                />
                <span>×</span>
                <input
                  type="number"
                  placeholder="factor 2"
                  className="w-20 p-1 border rounded text-center"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const factor2 = parseInt(e.currentTarget.value);
                      const factor1 = item.number / factor2;
                      if (Number.isInteger(factor1)) {
                        factorizeNumber(item.number, factor1, factor2);
                      }
                    }
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      
      {completed && (
        <div className="p-4 bg-green-50 rounded-lg">
          <CheckCircle className="h-6 w-6 text-green-500 inline mr-2" />
          <span className="text-green-700">Factor tree completed!</span>
        </div>
      )}
    </div>
  );
};

// Square Visualizer Component
const SquareVisualizerComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [selectedNumber, setSelectedNumber] = useState(5);
  const [completed, setCompleted] = useState(false);
  
  const squares = Array.from({length: 12}, (_, i) => i + 1);
  
  useEffect(() => {
    setCompleted(true);
    onComplete(true);
  }, [selectedNumber, onComplete]);
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Square Number Visualizer</h3>
      
      <div className="flex space-x-2 flex-wrap gap-2">
        {squares.map(num => (
          <button
            key={num}
            onClick={() => setSelectedNumber(num)}
            className={`px-3 py-2 rounded ${
              selectedNumber === num 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
      
      <div className="text-center">
        <p className="text-xl font-semibold mb-4">
          {selectedNumber}² = {selectedNumber} × {selectedNumber} = {selectedNumber * selectedNumber}
        </p>
        
        <div className="inline-block p-4 border-2 border-gray-300 rounded">
          <div 
            className="grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${selectedNumber}, 1fr)`,
              gridTemplateRows: `repeat(${selectedNumber}, 1fr)`
            }}
          >
            {Array.from({length: selectedNumber * selectedNumber}).map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-blue-300 border border-blue-400"
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center text-gray-600">
        This shows {selectedNumber}² as a {selectedNumber} × {selectedNumber} square
      </div>
    </div>
  );
};

// Fraction Converter Component
const FractionConverterComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [numerator, setNumerator] = useState(7);
  const [denominator, setDenominator] = useState(4);
  const [completed, setCompleted] = useState(false);
  
  const toMixed = () => {
    const whole = Math.floor(numerator / denominator);
    const remainder = numerator % denominator;
    return { whole, remainder };
  };
  
  const { whole, remainder } = toMixed();
  
  useEffect(() => {
    setCompleted(true);
    onComplete(true);
  }, [numerator, denominator, onComplete]);
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Fraction Converter</h3>
      
      <div className="flex items-center space-x-4">
        <div className="text-center">
          <label className="block text-sm text-gray-600 mb-2">Numerator</label>
          <input
            type="number"
            value={numerator}
            onChange={(e) => setNumerator(parseInt(e.target.value) || 1)}
            className="w-16 p-2 border rounded text-center"
            min="1"
          />
        </div>
        
        <div className="text-2xl font-bold">/</div>
        
        <div className="text-center">
          <label className="block text-sm text-gray-600 mb-2">Denominator</label>
          <input
            type="number"
            value={denominator}
            onChange={(e) => setDenominator(parseInt(e.target.value) || 1)}
            className="w-16 p-2 border rounded text-center"
            min="1"
          />
        </div>
      </div>
      
      <div className="text-center p-4 bg-blue-50 rounded-lg">
        <p className="text-lg">
          <span className="font-mono text-xl">{numerator}/{denominator}</span>
          {numerator > denominator && (
            <>
              <span className="mx-4">=</span>
              <span className="font-mono text-xl">
                {whole}{remainder > 0 && <><sup>{remainder}</sup>⁄<sub>{denominator}</sub></>}
              </span>
            </>
          )}
        </p>
        
        <div className="mt-4 text-sm text-gray-600">
          {numerator < denominator && "This is a proper fraction"}
          {numerator === denominator && "This equals 1"}
          {numerator > denominator && `This is an improper fraction = ${whole}${remainder > 0 ? ` and ${remainder}/${denominator}` : ''}`}
        </div>
      </div>
    </div>
  );
};

// Add remaining components as simplified generic components for now
const AreaModelEquivalenceComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  return <GenericInteractive element={element} onComplete={onComplete} />;
};

const DecimalCalculatorComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  return <GenericInteractive element={element} onComplete={onComplete} />;
};

const SequenceBuilderComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  return <GenericInteractive element={element} onComplete={onComplete} />;
};

const MetricConverterComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  return <GenericInteractive element={element} onComplete={onComplete} />;
};

const AreaCalculatorComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  return <GenericInteractive element={element} onComplete={onComplete} />;
};

const CoordinatePlotterComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  return <GenericInteractive element={element} onComplete={onComplete} />;
};

const BarGraphReaderComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  return <GenericInteractive element={element} onComplete={onComplete} />;
};

const ProbabilityWheelComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  return <GenericInteractive element={element} onComplete={onComplete} />;
};

// Main Interactive Practice Component
export default function InteractivePractice({ elements, onComplete }: InteractivePracticeProps) {
  const [completedElements, setCompletedElements] = useState<string[]>([]);
  const [currentElement, setCurrentElement] = useState(0);

  const handleElementComplete = (elementId: string, correct: boolean) => {
    if (correct && !completedElements.includes(elementId)) {
      setCompletedElements(prev => [...prev, elementId]);
      onComplete(elementId, correct);
    }
  };

  const renderInteractiveElement = (element: InteractiveElement) => {
    const props = {
      element,
      onComplete: (correct: boolean) => handleElementComplete(element.id, correct)
    };

    switch (element.component) {
      case 'IntegerSorter':
        return <IntegerSorter {...props} />;
      case 'FractionBuilder':
        return <FractionBuilder {...props} />;
      case 'NumberLineClick':
        return <NumberLineClick {...props} />;
      case 'MathInput':
        return <MathInput {...props} />;
      case 'NumberLineReader':
        return <NumberLineReader {...props} />;
      case 'ThermometerVisualization':
        return <ThermometerVisualization {...props} />;
      case 'IntegerComparator':
        return <IntegerComparator {...props} />;
      
      // Specific interactive components
      case 'IntegerIdentifier':
        return <IntegerIdentifier {...props} />;
      case 'RealWorldIntegerMatcher':
        return <RealWorldIntegerMatcher {...props} />;
      case 'ElevatorVisualization':
        return <ElevatorVisualization {...props} />;
      
      // Use generic component for remaining similar interactive elements
      case 'HorizontalNumberLine':
      case 'NumberLineComparator':
      case 'HorizontalGrapher':
      case 'HorizontalIntegerGrapher':
      case 'VerticalGrapher':
      case 'VerticalIntegerGrapher':
      case 'IntegerOrderingVisualizer':
      case 'NumberLineOrderer':
      case 'ComparisonSymbolHelper':
      case 'SymbolPractice':
      case 'ComparisonRulesVisualizer':
      case 'ComparisonRulesApplicator':
      case 'AscendingOrderVisualizer':
      case 'AscendingOrderPractice':
      case 'DescendingOrderVisualizer':
        return <GenericInteractive {...props} />;

      case 'FactorFinder':
        return <FactorFinderComponent {...props} />;

      case 'FactorTree':
        return <FactorTreeComponent {...props} />;

      case 'SquareVisualizer':
        return <SquareVisualizerComponent {...props} />;

      case 'FractionConverter':
        return <FractionConverterComponent {...props} />;

      case 'AreaModelEquivalence':
        return <AreaModelEquivalenceComponent {...props} />;

      case 'DecimalCalculator':
        return <DecimalCalculatorComponent {...props} />;

      case 'SequenceBuilder':
        return <SequenceBuilderComponent {...props} />;

      case 'MetricConverter':
        return <MetricConverterComponent {...props} />;

      case 'AreaCalculator':
        return <AreaCalculatorComponent {...props} />;

      case 'CoordinatePlotter':
        return <CoordinatePlotterComponent {...props} />;

      case 'BarGraphReader':
        return <BarGraphReaderComponent {...props} />;

      case 'ProbabilityWheel':
        return <ProbabilityWheelComponent {...props} />;

      // Add more comprehensive interactive components
      case 'FractionConverterTool':
      case 'FractionConverter':
        return <FractionConverterComponent {...props} />;
      
      case 'PercentageCalculator':
        return <PercentageCalculatorComponent {...props} />;

      case 'ExpressionEvaluator':
        return <ExpressionEvaluatorComponent {...props} />;

      case 'LengthConverter':
        return <LengthConverterComponent {...props} />;

      case 'MassConverter':
        return <MassConverterComponent {...props} />;

      case 'VolumeConverter':
        return <VolumeConverterComponent {...props} />;

      case 'IntegerCoordinatePlotter':
        return <IntegerCoordinatePlotterComponent {...props} />;

      case 'Shape3DBuilder':
        return <Shape3DBuilderComponent {...props} />;

      case 'DataDisplayInterpreter':
        return <DataDisplayInterpreterComponent {...props} />;

      case 'InvestigationPlanner':
        return <InvestigationPlannerComponent {...props} />;

      case 'ProbabilitySimulator':
        return <ProbabilitySimulatorComponent {...props} />;

      case 'PerimeterCalculator':
        return <PerimeterCalculatorComponent {...props} />;

      case 'DecimalPlaceChart':
        return <DecimalPlaceChartComponent {...props} />;

      case 'IntegerCalculator':
        return <IntegerCalculatorComponent {...props} />;
        
      default:
        return <GenericInteractive {...props} />;
    }
  };

  if (elements.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No interactive practice elements available for this topic.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      {elements.length > 1 && (
        <div className="flex items-center justify-center space-x-2 mb-6">
          {elements.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentElement ? 'bg-blue-600' : 
                completedElements.includes(elements[index].id) ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}

      {/* Current interactive element */}
      <div className="card">
        {renderInteractiveElement(elements[currentElement])}
      </div>

      {/* Navigation */}
      {elements.length > 1 && (
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentElement(Math.max(0, currentElement - 1))}
            disabled={currentElement === 0}
            className="btn-secondary"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500 self-center">
            {currentElement + 1} of {elements.length}
          </span>
          <button
            onClick={() => setCurrentElement(Math.min(elements.length - 1, currentElement + 1))}
            disabled={currentElement === elements.length - 1}
            className="btn-secondary"
          >
            Next
          </button>
        </div>
      )}

      {/* Completion summary */}
      {completedElements.length > 0 && (
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-green-800">
            <Trophy className="h-5 w-5" />
            <span className="font-semibold">
              Progress: {completedElements.length} of {elements.length} completed
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Additional comprehensive interactive components

// Percentage Calculator Component
const PercentageCalculatorComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [number, setNumber] = useState(100);
  const [percentage, setPercentage] = useState(25);
  const [userAnswer, setUserAnswer] = useState('');
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const correctAnswer = (number * percentage / 100);

  const checkAnswer = () => {
    const answer = parseFloat(userAnswer);
    setAttempts(prev => prev + 1);
    
    if (Math.abs(answer - correctAnswer) < 0.01) {
      setCompleted(true);
      onComplete(true);
    }
  };

  const generateNewProblem = () => {
    setNumber(Math.floor(Math.random() * 200) + 50);
    setPercentage([10, 15, 20, 25, 30, 40, 50, 60, 75, 80][Math.floor(Math.random() * 10)]);
    setUserAnswer('');
    setCompleted(false);
    setAttempts(0);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{element.title}</h3>
        <p className="text-gray-600 text-sm">{element.instructions}</p>
      </div>
      
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <div className="text-center space-y-4">
          <div className="text-2xl font-bold">
            What is {percentage}% of {number}?
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Your answer"
              className="w-32 text-center text-lg border rounded-lg px-3 py-2"
              disabled={completed}
            />
            
            {!completed && (
              <button
                onClick={checkAnswer}
                disabled={!userAnswer}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
              >
                Check
              </button>
            )}
          </div>
          
          {completed && (
            <div className="text-green-700 font-semibold">
              <CheckCircle className="h-8 w-8 mx-auto mb-2" />
              Correct! {percentage}% of {number} = {correctAnswer}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Attempts: {attempts}
        </div>
        <button
          onClick={generateNewProblem}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          <RefreshCw className="h-4 w-4" />
          <span>New Problem</span>
        </button>
      </div>
    </div>
  );
};

// Expression Evaluator Component
const ExpressionEvaluatorComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [expression, setExpression] = useState('12 + 3 × 4');
  const [userAnswer, setUserAnswer] = useState('');
  const [completed, setCompleted] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  const expressions = [
    { expr: '12 + 3 × 4', answer: 24, steps: ['First: 3 × 4 = 12', 'Then: 12 + 12 = 24'] },
    { expr: '(8 + 2) × 5', answer: 50, steps: ['First: (8 + 2) = 10', 'Then: 10 × 5 = 50'] },
    { expr: '20 ÷ 4 + 6', answer: 11, steps: ['First: 20 ÷ 4 = 5', 'Then: 5 + 6 = 11'] }
  ];

  const currentExpressionData = expressions.find(e => e.expr === expression) || expressions[0];

  const checkAnswer = () => {
    const answer = parseFloat(userAnswer);
    if (answer === currentExpressionData.answer) {
      setCompleted(true);
      setShowSteps(true);
      onComplete(true);
    }
  };

  const generateNewProblem = () => {
    const newExpr = expressions[Math.floor(Math.random() * expressions.length)];
    setExpression(newExpr.expr);
    setUserAnswer('');
    setCompleted(false);
    setShowSteps(false);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{element.title}</h3>
        <p className="text-gray-600 text-sm">Follow BODMAS order: Brackets, Orders, Division/Multiplication, Addition/Subtraction</p>
      </div>
      
      <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
        <div className="text-center space-y-4">
          <div className="text-3xl font-bold text-purple-800">
            {expression} = ?
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Answer"
              className="w-32 text-center text-lg border rounded-lg px-3 py-2"
              disabled={completed}
            />
            
            {!completed && (
              <button
                onClick={checkAnswer}
                disabled={!userAnswer}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                Evaluate
              </button>
            )}
          </div>
          
          {showSteps && (
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Step-by-step solution:</h4>
              {currentExpressionData.steps.map((step, index) => (
                <div key={index} className="text-sm text-gray-700">{step}</div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <button
        onClick={generateNewProblem}
        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
      >
        <RefreshCw className="h-4 w-4" />
        <span>New Expression</span>
      </button>
    </div>
  );
};

// Length Converter Component
const LengthConverterComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [value, setValue] = useState(500);
  const [fromUnit, setFromUnit] = useState('cm');
  const [toUnit, setToUnit] = useState('m');
  const [userAnswer, setUserAnswer] = useState('');
  const [completed, setCompleted] = useState(false);

  const conversions: { [key: string]: number } = {
    'mm': 1,
    'cm': 10,
    'm': 1000,
    'km': 1000000
  };

  const correctAnswer = (value * conversions[fromUnit]) / conversions[toUnit];

  const checkAnswer = () => {
    const answer = parseFloat(userAnswer);
    if (Math.abs(answer - correctAnswer) < 0.001) {
      setCompleted(true);
      onComplete(true);
    }
  };

  const generateNewProblem = () => {
    const units = ['mm', 'cm', 'm', 'km'];
    const values = [250, 350, 500, 1200, 1500, 2500];
    
    setValue(values[Math.floor(Math.random() * values.length)]);
    setFromUnit(units[Math.floor(Math.random() * units.length)]);
    let newToUnit = units[Math.floor(Math.random() * units.length)];
    while (newToUnit === fromUnit) {
      newToUnit = units[Math.floor(Math.random() * units.length)];
    }
    setToUnit(newToUnit);
    setUserAnswer('');
    setCompleted(false);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{element.title}</h3>
        <p className="text-gray-600 text-sm">Convert between metric length units</p>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <div className="text-center space-y-4">
          <div className="text-xl font-semibold">
            Convert {value}{fromUnit} to {toUnit}
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder={`Answer in ${toUnit}`}
              className="w-40 text-center border rounded-lg px-3 py-2"
              disabled={completed}
            />
            <span className="font-semibold">{toUnit}</span>
            
            {!completed && (
              <button
                onClick={checkAnswer}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Convert
              </button>
            )}
          </div>
          
          {completed && (
            <div className="text-green-700 font-semibold">
              <CheckCircle className="h-8 w-8 mx-auto mb-2" />
              Correct! {value}{fromUnit} = {correctAnswer}{toUnit}
            </div>
          )}
        </div>
      </div>
      
      <button
        onClick={generateNewProblem}
        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
      >
        <RefreshCw className="h-4 w-4" />
        <span>New Conversion</span>
      </button>
    </div>
  );
};

// Additional simple components for remaining interactives
const MassConverterComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  return <GenericInteractive element={element} onComplete={onComplete} />;
};

const VolumeConverterComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  return <GenericInteractive element={element} onComplete={onComplete} />;
};

const IntegerCoordinatePlotterComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  return <GenericInteractive element={element} onComplete={onComplete} />;
};

const Shape3DBuilderComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  return <GenericInteractive element={element} onComplete={onComplete} />;
};

const DataDisplayInterpreterComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  return <GenericInteractive element={element} onComplete={onComplete} />;
};

const InvestigationPlannerComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  return <GenericInteractive element={element} onComplete={onComplete} />;
};

const ProbabilitySimulatorComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  return <GenericInteractive element={element} onComplete={onComplete} />;
};

const PerimeterCalculatorComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  return <GenericInteractive element={element} onComplete={onComplete} />;
};

const DecimalPlaceChartComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  return <GenericInteractive element={element} onComplete={onComplete} />;
};

const IntegerCalculatorComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  return <GenericInteractive element={element} onComplete={onComplete} />;
};
