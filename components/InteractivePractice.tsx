'use client';

import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { CheckCircle, RefreshCw, Trophy, Star, Target } from 'lucide-react';
import { InteractiveElement } from '../lib/comprehensive-curriculum';
import { useMastery, computeDifficulty } from '../context/MasteryContext';

// Reusable hint wrapper for multi-tier hint system
const HintWrapper: React.FC<{hasHints:boolean; hints?:string[]; hintIndex:number; onNextHint:()=>void; children:React.ReactNode}> = ({hasHints,hints=[],hintIndex,onNextHint,children}) => {
  return (
    <div className="space-y-4">
      {children}
      {hasHints && (
        <div className="p-3 rounded-lg border bg-yellow-50 border-yellow-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-yellow-800 font-medium">Hint {hintIndex+1} of {hints.length}</span>
            <button
              onClick={onNextHint}
              disabled={hintIndex >= hints.length-1}
              className="text-xs px-2 py-1 rounded bg-yellow-600 text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >Next Hint</button>
          </div>
          <p className="mt-2 text-sm text-yellow-900">{hints[hintIndex]}</p>
        </div>
      )}
    </div>
  );
};

interface InteractivePracticeProps {
  elements: InteractiveElement[];
  onComplete: (elementId: string, correct: boolean) => void;
  topicId?: string; // used for per-topic scoring persistence
}

// Scoring Context
interface ScoreContextValue {
  globalScore: number;
  topicScores: Record<string, number>;
  addPoints: (points: number, topicId?: string) => void;
  resetTopic: (topicId: string) => void;
  resetAll: () => void;
}

const ScoreContext = createContext<ScoreContextValue | null>(null);

export const useScore = () => {
  const ctx = useContext(ScoreContext);
  if (!ctx) throw new Error('useScore must be used within <ScoreProvider>');
  return ctx;
};

export const ScoreProvider = ({ children }: { children: React.ReactNode }) => {
  const readLS = (key: string, fallback: any) => {
    if (typeof window === 'undefined') return fallback;
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
  };

  const [globalScore, setGlobalScore] = useState<number>(() => readLS('globalScore', 0));
  const [topicScores, setTopicScores] = useState<Record<string, number>>(() => readLS('topicScores', {}));

  // Debounced persistence
  const persist = useCallback(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('globalScore', JSON.stringify(globalScore));
    localStorage.setItem('topicScores', JSON.stringify(topicScores));
  }, [globalScore, topicScores]);

  useEffect(() => {
    const id = setTimeout(persist, 300); // debounce writes
    return () => clearTimeout(id);
  }, [persist]);

  const addPoints = (points: number, topicId?: string) => {
    setGlobalScore(g => g + points);
    if (topicId) {
      setTopicScores(ts => ({ ...ts, [topicId]: (ts[topicId] || 0) + points }));
    }
  };
  const resetTopic = (topicId: string) => setTopicScores(ts => ({ ...ts, [topicId]: 0 }));
  const resetAll = () => { setGlobalScore(0); setTopicScores({}); };

  return (
    <ScoreContext.Provider value={{ globalScore, topicScores, addPoints, resetTopic, resetAll }}>
      {children}
    </ScoreContext.Provider>
  );
};

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

// IntegerComparator Component with adaptive difficulty
const IntegerComparator = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const { getSkill } = useMastery();
  const skillId = (element as any).skillId || element.id || 'INT_COMPARE';
  const skill = getSkill(skillId);
  const diff = computeDifficulty(skill);
  const makePool = () => {
    const baseRange = diff.range; // e.g. 8,10,12,15
    const nums: number[] = [];
    for(let i=-baseRange;i<=baseRange;i++) nums.push(i);
    // Scaffolded variant: trim positives or negatives for simpler contrasts
    if(diff.variant==='scaffolded') return nums.filter(n=> Math.abs(n)<=8);
    if(diff.variant==='challenge') return nums.concat([baseRange+2, -(baseRange+2)]);
    return nums;
  };
  const generatePair = () => {
    const pool = makePool();
    let a = pool[Math.floor(Math.random()*pool.length)];
    let b = pool[Math.floor(Math.random()*pool.length)];
    // Ensure sometimes equality appears (10% chance) else avoid too trivial (difference >2 for challenge)
    if(Math.random()<0.1) b = a; else if(diff.variant==='challenge' && Math.abs(a-b)<=1) b = a + (Math.random()<0.5? 2:-2);
    return [a,b] as [number,number];
  };
  const [[num1,num2], setPair] = useState<[number,number]>(generatePair());
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Regenerate when difficulty band changes (skill level updates)
  useEffect(()=>{ setPair(generatePair()); setSelectedSymbol(''); setCompleted(false); setAttempts(0); }, [diff.variant, diff.range]);

  const symbols = ['<', '>', '='];
  const getCorrectSymbol = () => (num1 < num2 ? '<' : num1 > num2 ? '>' : '=');
  const checkAnswer = (symbol: string) => {
    setSelectedSymbol(symbol);
    setAttempts(a=>a+1);
    if(symbol===getCorrectSymbol()) { setCompleted(true); onComplete(true);} }
  const reset = () => { setPair(generatePair()); setSelectedSymbol(''); setCompleted(false); setAttempts(0); };

  return <div className="space-y-4">
    <div className="text-center">
      <h3 className="text-lg font-semibold text-gray-800">{element.title}</h3>
      <p className="text-gray-600 text-sm">Compare the integers using {'<'}, {'>'}, or =</p>
      <p className="mt-1 text-xs text-indigo-600">Mode: {diff.variant} (±{diff.range})</p>
    </div>
    <div className="bg-blue-50 p-6 rounded-lg">
      <div className="flex items-center justify-center space-x-6 text-3xl font-bold">
        <div className="bg-white px-6 py-4 rounded-lg border-2 border-blue-200">{num1}</div>
        <div className="flex space-x-2">{symbols.map(sym=> <button key={sym} onClick={()=>checkAnswer(sym)} disabled={completed} className={`w-16 h-16 rounded-lg border-2 text-2xl font-bold ${selectedSymbol===sym ? (completed && sym===getCorrectSymbol() ? 'bg-green-500 border-green-600 text-white':'bg-blue-500 border-blue-600 text-white') : 'bg-white border-gray-300 hover:border-blue-400'} ${completed? 'cursor-not-allowed':'cursor-pointer'}`}>{sym}</button>)}</div>
        <div className="bg-white px-6 py-4 rounded-lg border-2 border-blue-200">{num2}</div>
      </div>
    </div>
    <div className="flex justify-between items-center">
      <div className="text-sm text-gray-600">Attempts: {attempts}</div>
      <button onClick={reset} className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"><RefreshCw className="h-4 w-4" /><span>New Question</span></button>
    </div>
    {completed && <div className="text-center p-4 bg-green-50 rounded-lg"><CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" /><p className="text-green-700 font-semibold">Correct! {num1} {getCorrectSymbol()} {num2}</p></div>}
  </div>;
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

// Factor Finder Component (adaptive)
const FactorFinderComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const { getSkill } = useMastery();
  const skillId = (element as any).skillId || 'FACTOR_FIND';
  const diff = computeDifficulty(getSkill(skillId));
  const pickNumber = () => {
    if(diff.variant==='scaffolded') return 24; // rich factor set but manageable
    if(diff.variant==='standard') { const choices=[24, 30, 36, 42]; return choices[Math.floor(Math.random()*choices.length)]; }
    if(diff.variant==='challenge') { const choices=[48, 54, 60, 72, 84, 96]; return choices[Math.floor(Math.random()*choices.length)]; }
    return 24;
  };
  const [targetNumber,setTargetNumber]=useState<number>(pickNumber());
  const allFactors=(n:number)=>{ const fs:number[]=[]; for(let i=1;i<=n;i++){ if(n%i===0) fs.push(i);} return fs; };
  const [correctFactors,setCorrectFactors]=useState<number[]>(allFactors(targetNumber));
  const [factors, setFactors] = useState<number[]>([]);
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [completed, setCompleted] = useState(false);
  useEffect(()=>{ const tn=pickNumber(); setTargetNumber(tn); setCorrectFactors(allFactors(tn)); setFactors([]); setInput(''); setAttempts(0); setCompleted(false); }, [diff.variant, diff.range]);
  const addFactor = () => {
    const num = parseInt(input);
    if (num && !factors.includes(num) && targetNumber % num === 0) {
      const newFactors = [...factors, num].sort((a, b) => a - b);
      setFactors(newFactors);
      setAttempts(prev => prev + 1);
      if (newFactors.length === correctFactors.length) { setCompleted(true); onComplete(true); }
    }
    setInput('');
  };
  return <div className="space-y-4"> <h3 className="text-lg font-semibold">Find All Factors of {targetNumber}</h3><p className="text-xs text-indigo-600">Mode: {diff.variant}</p><div className="flex space-x-2"> <input type="number" value={input} onChange={e=>setInput(e.target.value)} placeholder="Enter a factor" className="flex-1 p-2 border rounded" disabled={completed} onKeyPress={e=> e.key==='Enter' && addFactor()} /> <button onClick={addFactor} disabled={completed || !input} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300">Add</button></div><div className="grid grid-cols-4 gap-2"> {correctFactors.map(f=> <div key={f} className={`p-2 text-center rounded ${factors.includes(f)? 'bg-green-100 text-green-800':'bg-gray-100 text-gray-400'}`}>{factors.includes(f)? f:'?'}</div>)} </div><div className="text-sm text-gray-600">Found: {factors.length} / {correctFactors.length} factors</div>{completed && <div className="p-4 bg-green-50 rounded-lg"><CheckCircle className="h-6 w-6 text-green-500 inline mr-2" /><span className="text-green-700">All factors found!</span></div>}<button onClick={()=>{ const tn=pickNumber(); setTargetNumber(tn); setCorrectFactors(allFactors(tn)); setFactors([]); setCompleted(false); }} className="w-full btn-secondary">New Number</button></div>;
};

// Factor Tree Component (adaptive)
const FactorTreeComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const { getSkill } = useMastery();
  const skillId = (element as any).skillId || 'FACTOR_TREE';
  const diff = computeDifficulty(getSkill(skillId));
  const pickNumber=()=>{ if(diff.variant==='scaffolded') return 60; if(diff.variant==='standard'){ const c=[48,60,72,90]; return c[Math.floor(Math.random()*c.length)]; } if(diff.variant==='challenge'){ const c=[84,96,108,120,144]; return c[Math.floor(Math.random()*c.length)]; } return 60; };
  const [targetNumber,setTargetNumber]=useState<number>(pickNumber());
  const [tree, setTree] = useState<{number: number, factors: [number, number] | null}[]>([{number: targetNumber, factors: null}]);
  const [completed, setCompleted] = useState(false);
  useEffect(()=>{ const n=pickNumber(); setTargetNumber(n); setTree([{number:n,factors:null}]); setCompleted(false); }, [diff.variant, diff.range]);
  const isPrime = (n: number) => { if (n < 2) return false; for (let i = 2; i <= Math.sqrt(n); i++) { if (n % i === 0) return false; } return true; };
  const factorizeNumber = (num: number, a: number, b: number) => { if (a * b === num && a>1 && b>1) { const newTree = tree.map(item => item.number===num && item.factors===null ? {...item, factors:[a,b] as [number,number]} : item); if(!isPrime(a)) newTree.push({number:a,factors:null}); if(!isPrime(b)) newTree.push({number:b,factors:null}); setTree(newTree); const incomplete = newTree.filter(item => item.factors===null && !isPrime(item.number)); if(incomplete.length===0){ setCompleted(true); onComplete(true);} } };
  return <div className="space-y-4"> <h3 className="text-lg font-semibold">Prime Factor Tree for {targetNumber}</h3><p className="text-xs text-indigo-600">Mode: {diff.variant}</p><p className="text-sm text-gray-600">Break the number into prime factors.</p><div className="space-y-2"> {tree.map(node=> <div key={node.number} className="p-3 bg-gray-50 rounded border"><div className="font-medium">{node.number}</div>{node.factors? <div className="text-green-600">= {node.factors[0]} × {node.factors[1]}</div> : isPrime(node.number)? <div className="text-blue-600 text-sm">(prime)</div> : <div className="flex space-x-2 mt-2">{['A','B'].map(l=> <input key={l} type="number" placeholder={`Factor ${l}`} className="w-20 p-1 border rounded text-center" disabled={completed} />)}<button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300" disabled={completed} onClick={(e)=>{ const inputs=(e.currentTarget.parentElement?.querySelectorAll('input')||[]) as any; const a=parseInt(inputs[0].value); const b=parseInt(inputs[1].value); inputs[0].value=''; inputs[1].value=''; factorizeNumber(node.number,a,b); }}>Factor</button></div>}</div>) } </div>{completed && <div className="p-4 bg-green-50 rounded-lg"><CheckCircle className="h-6 w-6 text-green-500 inline mr-2" /><span className="text-green-700">Prime factorisation complete!</span></div>}<button onClick={()=>{ const n=pickNumber(); setTargetNumber(n); setTree([{number:n,factors:null}]); setCompleted(false); }} className="w-full btn-secondary">New Number</button></div>;
};

// Square Visualizer Component
const SquareVisualizerComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [selectedNumber, setSelectedNumber] = useState(5);
  const squares = Array.from({length: 12}, (_, i) => i + 1);
  useEffect(()=>{ onComplete(true); }, [onComplete]);
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Square Number Visualizer</h3>
      <p className="text-sm text-gray-600">Pick a number to see its square visually.</p>
      <div className="flex flex-wrap gap-2">
        {squares.map(num => (
          <button key={num} onClick={()=>setSelectedNumber(num)} className={`px-3 py-2 rounded border ${selectedNumber===num ? 'bg-indigo-600 text-white border-indigo-700':'bg-white text-gray-700 border-gray-300 hover:bg-indigo-50'}`}>{num}</button>
        ))}
      </div>
      <div>
        <div className="inline-grid gap-1" style={{gridTemplateColumns:`repeat(${selectedNumber}, minmax(0,1fr))`}}>
          {Array.from({length: selectedNumber*selectedNumber}, (_,i)=>(
            <div key={i} className="w-4 h-4 bg-indigo-500 rounded-sm" />
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-700">{selectedNumber}² = {selectedNumber*selectedNumber}</p>
      </div>
    </div>
  );
};

// Add remaining components with unique interactions (replacing generic placeholders)
const AreaModelEquivalenceComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [target, setTarget] = useState({ num: 2, den: 3 });
  const [num, setNum] = useState('');
  const [den, setDen] = useState('');
  const [completed, setCompleted] = useState(false);

  const fractions = [
    { num: 1, den: 2 }, { num: 2, den: 3 }, { num: 3, den: 4 }, { num: 3, den: 5 }, { num: 4, den: 5 }
  ];

  const check = () => {
    const n = parseInt(num); const d = parseInt(den);
    if (!d || !n) return;
    if (n * target.den === d * target.num) {
      setCompleted(true); onComplete(true);
    }
  };

  const reset = () => {
    setTarget(fractions[Math.floor(Math.random() * fractions.length)]);
    setNum(''); setDen(''); setCompleted(false);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Fraction Equivalence Model</h3>
      <p className="text-sm text-gray-600 text-center">Enter a fraction equivalent to {target.num}/{target.den}</p>
      <div className="flex justify-center gap-2">
        <input disabled={completed} value={num} onChange={e=>setNum(e.target.value)} type="number" className="w-20 border rounded px-2 py-1 text-center" placeholder="num" />
        <span className="text-xl font-bold">/</span>
        <input disabled={completed} value={den} onChange={e=>setDen(e.target.value)} type="number" className="w-20 border rounded px-2 py-1 text-center" placeholder="den" />
        {!completed && <button onClick={check} className="btn-primary">Check</button>}
      </div>
      {completed && <div className="text-center text-green-600 font-semibold">Correct! {num}/{den} ≡ {target.num}/{target.den}</div>}
      <button onClick={reset} className="w-full btn-secondary">New Target</button>
    </div>
  );
};

const DecimalCalculatorComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const ops = ['+', '-'] as const;
  const [a, setA] = useState(1.2);
  const [b, setB] = useState(0.7);
  const [op, setOp] = useState<typeof ops[number]>('+');
  const [answer, setAnswer] = useState('');
  const [completed, setCompleted] = useState(false);

  const correct = parseFloat((op === '+' ? a + b : a - b).toFixed(2));

  const check = () => {
    if (Math.abs(parseFloat(answer) - correct) < 0.01) { setCompleted(true); onComplete(true);} }
  const reset = () => {
    const rand = () => parseFloat((Math.random()*4+0.5).toFixed(1));
    setA(rand()); setB(rand()); setOp(ops[Math.floor(Math.random()*ops.length)]); setAnswer(''); setCompleted(false);
  };
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-center">Decimal Calculator</h3>
      <p className="text-center text-lg font-bold">{a.toFixed(1)} {op} {b.toFixed(1)} = ?</p>
      <div className="flex justify-center gap-2">
        <input disabled={completed} value={answer} onChange={e=>setAnswer(e.target.value)} type="number" step="0.01" className="w-32 border rounded px-3 py-2 text-center" />
        {!completed && <button onClick={check} className="btn-primary">Check</button>}
      </div>
      {completed && <div className="text-center text-green-600">Correct! {correct}</div>}
      <button onClick={reset} className="w-full btn-secondary">New Problem</button>
    </div>
  );
};

const SequenceBuilderComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [start, setStart] = useState(3);
  const [diff, setDiff] = useState(4);
  const [guess, setGuess] = useState('');
  const [completed, setCompleted] = useState(false);
  const terms = [start, start+diff, start+2*diff, start+3*diff];
  const correct = start+4*diff;
  const check = () => { if (parseInt(guess) === correct){ setCompleted(true); onComplete(true);} };
  const reset = () => { setStart(Math.floor(Math.random()*6)+1); setDiff(Math.floor(Math.random()*5)+2); setGuess(''); setCompleted(false); };
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-center">Sequence Builder</h3>
      <p className="text-center text-sm text-gray-600">Find the next term of the arithmetic sequence.</p>
      <div className="text-center text-xl font-mono">{terms.join(', ')}, <span className="text-blue-600">?</span></div>
      <div className="flex justify-center gap-2">
        <input value={guess} disabled={completed} onChange={e=>setGuess(e.target.value)} type="number" className="w-32 border rounded px-2 py-1 text-center" />
        {!completed && <button onClick={check} className="btn-primary">Check</button>}
      </div>
      {completed && <div className="text-center text-green-600">Correct! Next term is {correct}</div>}
      <button onClick={reset} className="w-full btn-secondary">New Sequence</button>
    </div>
  );
};

const MetricConverterComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const units = ['mm','cm','m','km'] as const;
  const factors: Record<string, number> = { mm:1, cm:10, m:1000, km:1_000_000 };
  const [from, setFrom] = useState<'mm'|'cm'|'m'|'km'>('cm');
  const [to, setTo] = useState<'mm'|'cm'|'m'|'km'>('m');
  const [value, setValue] = useState(250);
  const [answer, setAnswer] = useState('');
  const [completed, setCompleted] = useState(false);
  const correct = (value * factors[from]) / factors[to];
  const check = () => { if (Math.abs(parseFloat(answer) - correct) < 0.001){ setCompleted(true); onComplete(true);} };
  const reset = () => {
    const v=[50,75,120,250,400,1250][Math.floor(Math.random()*6)];
    const f=units[Math.floor(Math.random()*units.length)];
    let t=units[Math.floor(Math.random()*units.length)];
    while(t===f) t=units[Math.floor(Math.random()*units.length)];
    setValue(v); setFrom(f); setTo(t); setAnswer(''); setCompleted(false);
  };
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-center">Metric Converter</h3>
      <p className="text-center">Convert {value}{from} to {to}</p>
      <div className="flex justify-center gap-2">
        <input value={answer} disabled={completed} onChange={e=>setAnswer(e.target.value)} type="number" className="w-36 border rounded px-2 py-1 text-center" placeholder={`in ${to}`} />
        {!completed && <button onClick={check} className="btn-primary">Check</button>}
      </div>
      {completed && <div className="text-center text-green-600">Correct! {value}{from} = {correct}{to}</div>}
      <button onClick={reset} className="w-full btn-secondary">New Conversion</button>
    </div>
  );
};

const AreaCalculatorComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [w,setW]=useState(5); const [h,setH]=useState(3); const [ans,setAns]=useState(''); const [completed,setCompleted]=useState(false);
  const correct = w*h; const reset=()=>{ setW(Math.floor(Math.random()*8)+3); setH(Math.floor(Math.random()*7)+2); setAns(''); setCompleted(false);} ;
  const check=()=>{ if(parseInt(ans)===correct){ setCompleted(true); onComplete(true);} };
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-center">Area of Rectangle</h3>
      <div className="flex justify-center">
        <div className="relative border-2 border-blue-300 bg-blue-50" style={{width: w*20, height: h*20}}>
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm">width {w}</span>
          <span className="absolute top-1/2 -left-14 -translate-y-1/2 text-sm">height {h}</span>
        </div>
      </div>
      <p className="text-center text-sm text-gray-600">Find the area.</p>
      <div className="flex justify-center gap-2">
        <input value={ans} disabled={completed} onChange={e=>setAns(e.target.value)} type="number" className="w-32 border rounded px-2 py-1 text-center" />
        {!completed && <button onClick={check} className="btn-primary">Check</button>}
      </div>
      {completed && <div className="text-center text-green-600">Correct! Area = {correct} square units</div>}
      <button onClick={reset} className="w-full btn-secondary">New Rectangle</button>
    </div>
  );
};

const CoordinatePlotterComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [point,setPoint]=useState<{x:number,y:number}>({x:2,y:-3});
  const [selected,setSelected]=useState<{x:number,y:number}|null>(null);
  const [completed,setCompleted]=useState(false);
  const grid=[-5,-4,-3,-2,-1,0,1,2,3,4,5];
  const check=(x:number,y:number)=>{ setSelected({x,y}); if(x===point.x && y===point.y){ setCompleted(true); onComplete(true);} };
  const reset=()=>{ const coords=[-4,-3,-2,-1,1,2,3,4]; setPoint({x: coords[Math.floor(Math.random()*coords.length)], y: coords[Math.floor(Math.random()*coords.length)]}); setSelected(null); setCompleted(false); };
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-center">Coordinate Plotter</h3>
      <p className="text-center text-sm text-gray-600">Plot the point ({point.x}, {point.y})</p>
      <div className="flex justify-center">
        <svg viewBox="0 0 220 220" className="border bg-white" style={{width:220,height:220}}>
          {/* axes */}
          <line x1={110} y1={0} x2={110} y2={220} stroke="#000" strokeWidth={1} />
          <line x1={0} y1={110} x2={220} y2={110} stroke="#000" strokeWidth={1} />
          {grid.map((g,i)=>{
            const pos=10+ i*20; return (
              <g key={g}>
                <line x1={pos} y1={106} x2={pos} y2={114} stroke="#000" />
                <line x1={106} y1={pos} x2={114} y2={pos} stroke="#000" />
              </g>
            );
          })}
          {grid.map((x,ix)=> grid.map((y,iy)=>{
            const cx=10+ix*20; const cy=10+ (grid.length-1-iy)*20; // invert y
            const active= selected && selected.x===x && selected.y===y;
            const correct= active && completed;
            return <circle key={`${x},${y}`} cx={cx} cy={cy} r={6} className={`cursor-pointer ${active? (correct? 'fill-green-500':'fill-red-500'): 'fill-blue-200 hover:fill-blue-400'}`} onClick={()=> !completed && check(x,y)} />;
          }))}
        </svg>
      </div>
      {completed && <div className="text-center text-green-600">Great! You plotted ({point.x}, {point.y}).</div>}
      <button onClick={reset} className="w-full btn-secondary">New Point</button>
    </div>
  );
};

const BarGraphReaderComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const categories=['A','B','C','D'];
  const [values,setValues]=useState([3,5,7,4]);
  const [targetIdx,setTargetIdx]=useState(1); // ask for B initially
  const [answer,setAnswer]=useState('');
  const [completed,setCompleted]=useState(false);
  const check=()=>{ if(parseInt(answer)===values[targetIdx]){ setCompleted(true); onComplete(true);} };
  const reset=()=>{ const newVals=values.map(()=> Math.floor(Math.random()*8)+2); setValues(newVals); setTargetIdx(Math.floor(Math.random()*4)); setAnswer(''); setCompleted(false); };
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-center">Bar Graph Reader</h3>
      <p className="text-center text-sm text-gray-600">What is the value of category {categories[targetIdx]}?</p>
      <div className="flex justify-center">
        <svg viewBox="0 0 200 150" className="bg-white border" style={{width:200,height:150}}>
          {values.map((v,i)=>{
            const barWidth=30; const gap=15; const x=20 + i*(barWidth+gap); const height=v*10; const y=130-height; return (
              <g key={i}>
                <rect x={x} y={y} width={barWidth} height={height} className="fill-blue-400" />
                <text x={x+barWidth/2} y={y-4} textAnchor="middle" className="fill-gray-700 text-xs">{v}</text>
                <text x={x+barWidth/2} y={140} textAnchor="middle" className="fill-gray-800 text-sm font-semibold">{categories[i]}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="flex justify-center gap-2">
        <input value={answer} disabled={completed} onChange={e=>setAnswer(e.target.value)} type="number" className="w-24 border rounded px-2 py-1 text-center" />
        {!completed && <button onClick={check} className="btn-primary">Check</button>}
      </div>
      {completed && <div className="text-center text-green-600">Correct! {categories[targetIdx]} = {values[targetIdx]}</div>}
      <button onClick={reset} className="w-full btn-secondary">New Graph</button>
    </div>
  );
};

const ProbabilityWheelComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const colorSets = [
    ['red','red','blue','green','green','green'],
    ['red','blue','blue','yellow','yellow','yellow'],
    ['purple','purple','purple','orange','orange','green']
  ];
  const [segments,setSegments]=useState<string[]>(colorSets[0]);
  const [targetColor,setTargetColor]=useState('green');
  const [num,setNum]=useState('');
  const [den,setDen]=useState('');
  const [completed,setCompleted]=useState(false);
  const reset=()=>{ const seg=colorSets[Math.floor(Math.random()*colorSets.length)]; setSegments(seg); setTargetColor(seg[Math.floor(Math.random()*seg.length)]); setNum(''); setDen(''); setCompleted(false); };
  const count= segments.filter(c=>c===targetColor).length;
  const total= segments.length;
  const check=()=>{ if(parseInt(num)===count && parseInt(den)===total){ setCompleted(true); onComplete(true);} };
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-center">Probability Wheel</h3>
      <p className="text-center text-sm text-gray-600">Give the probability of landing on <span className="font-semibold" style={{color:targetColor}}>{targetColor}</span></p>
      <div className="flex justify-center">
        <svg viewBox="0 0 120 120" style={{width:120,height:120}} className="border rounded-full bg-white">
          {segments.map((color,i)=>{ const angle= 2*Math.PI/segments.length; const start= i*angle; const end=(i+1)*angle; const x1=60+50*Math.cos(start); const y1=60+50*Math.sin(start); const x2=60+50*Math.cos(end); const y2=60+50*Math.sin(end); const largeArc= angle > Math.PI ? 1:0; const d=`M60,60 L${x1},${y1} A50,50 0 ${largeArc} 1 ${x2},${y2} Z`; return <path key={i} d={d} fill={color} stroke="#fff" strokeWidth={1}/>; })}
        </svg>
      </div>
      <div className="flex justify-center items-center gap-2">
        <input disabled={completed} value={num} onChange={e=>setNum(e.target.value)} type="number" className="w-16 border rounded px-2 py-1 text-center" placeholder="num" />
        <span className="text-xl font-bold">/</span>
        <input disabled={completed} value={den} onChange={e=>setDen(e.target.value)} type="number" className="w-16 border rounded px-2 py-1 text-center" placeholder="den" />
        {!completed && <button onClick={check} className="btn-primary">Check</button>}
      </div>
      {completed && <div className="text-center text-green-600">Correct! {count}/{total}</div>}
      <button onClick={reset} className="w-full btn-secondary">New Wheel</button>
    </div>
  );
};

// New specific components for previously generic fallbacks
const HorizontalGrapherComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean)=>void }) => {
  const nums=[-6,-4,-2,0,2,4,6];
  const [target,setTarget]=useState(2);
  const [selected,setSelected]=useState<number|null>(null);
  const [completed,setCompleted]=useState(false);
  useEffect(()=>{ setTarget(nums[Math.floor(Math.random()*nums.length)]); },[]);
  const click=(n:number)=>{ if(completed) return; setSelected(n); if(n===target){ setCompleted(true); onComplete(true);} };
  const reset=()=>{ setTarget(nums[Math.floor(Math.random()*nums.length)]); setSelected(null); setCompleted(false); };
  return <div className="space-y-4"> <h3 className="font-semibold text-center">Horizontal Grapher</h3><p className="text-center text-sm text-gray-600">Click the point at {target}</p><div className="flex justify-center"> <svg viewBox="0 0 400 80" className="bg-white border rounded w-full max-w-xl"> <line x1={30} y1={40} x2={370} y2={40} stroke="#2563eb" strokeWidth={3} /> {nums.map((n,i)=>{ const x=30+i*(340/(nums.length-1)); return <g key={n}> <line x1={x} y1={30} x2={x} y2={50} stroke="#2563eb" strokeWidth={2} /> <circle cx={x} cy={40} r={8} className={`cursor-pointer ${selected===n ? (completed? 'fill-green-500':'fill-red-500') : 'fill-white hover:fill-blue-200'}`} stroke="#2563eb" strokeWidth={2} onClick={()=>click(n)} /> <text x={x} y={70} textAnchor="middle" className="fill-gray-700 text-xs">{n}</text> </g>; })} </svg></div>{completed && <div className="text-center text-green-600">Great! {target} located.</div>} <button onClick={reset} className="w-full btn-secondary">New Target</button></div>;
};

const VerticalGrapherComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean)=>void }) => {
  const nums=[-6,-4,-2,0,2,4,6];
  const [target,setTarget]=useState(-2);
  const [selected,setSelected]=useState<number|null>(null);
  const [completed,setCompleted]=useState(false);
  useEffect(()=>{ setTarget(nums[Math.floor(Math.random()*nums.length)]); },[]);
  const click=(n:number)=>{ if(completed) return; setSelected(n); if(n===target){ setCompleted(true); onComplete(true);} };
  const reset=()=>{ setTarget(nums[Math.floor(Math.random()*nums.length)]); setSelected(null); setCompleted(false); };
  return <div className="space-y-4"> <h3 className="font-semibold text-center">Vertical Grapher</h3><p className="text-center text-sm text-gray-600">Click the point at {target}</p><div className="flex justify-center"> <svg viewBox="0 0 120 320" className="bg-white border rounded"> <line x1={60} y1={20} x2={60} y2={300} stroke="#dc2626" strokeWidth={3} /> {nums.map((n,i)=>{ const y=20 + i*(280/(nums.length-1)); return <g key={n}> <line x1={45} y1={y} x2={75} y2={y} stroke="#dc2626" strokeWidth={2} /> <circle cx={60} cy={y} r={8} className={`cursor-pointer ${selected===n ? (completed? 'fill-green-500':'fill-red-500') : 'fill-white hover:fill-red-200'}`} stroke="#dc2626" strokeWidth={2} onClick={()=>click(n)} /> <text x={95} y={y+4} className="fill-gray-700 text-xs">{n}</text> </g>; })} </svg></div>{completed && <div className="text-center text-green-600">Correct!</div>} <button onClick={reset} className="w-full btn-secondary">New Target</button></div>;
};

const HorizontalIntegerGrapherComponent = HorizontalGrapherComponent; // reuse logic
const VerticalIntegerGrapherComponent = VerticalGrapherComponent; // reuse logic

const NumberLineOrdererComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean)=>void }) => {
  const { getSkill } = useMastery();
  const skillId = (element as any).skillId || element.id || 'INT_ORDER_LINE';
  const diff = computeDifficulty(getSkill(skillId));
  const generateSet = () => {
    const range = diff.range;
    const pool: number[] = []; for(let i=-range;i<=range;i++) pool.push(i);
    // scaffolded: favor small magnitude
    const filtered = diff.variant==='scaffolded' ? pool.filter(n=> Math.abs(n)<=5) : pool;
    const size = 5;
    const chosen: number[] = [];
    while(chosen.length<size){ const n = filtered[Math.floor(Math.random()*filtered.length)]; if(!chosen.includes(n)) chosen.push(n); }
    return chosen.sort(()=>Math.random()-0.5);
  };
  const [nums,setNums]=useState<number[]>(generateSet());
  const [slots,setSlots]=useState<(number|null)[]>(Array(5).fill(null));
  const [drag,setDrag]=useState<number|null>(null);
  const [completed,setCompleted]=useState(false);
  const correct=[...nums].sort((a,b)=>a-b);
  useEffect(()=>{ // refresh on difficulty change
    setNums(generateSet()); setSlots(Array(5).fill(null)); setCompleted(false);
  }, [diff.variant, diff.range]);
  const handleDragStart=(n:number)=> setDrag(n);
  const handleDrop=(i:number)=>{ if(drag===null) return; const newSlots=[...slots]; newSlots[i]=drag; setSlots(newSlots); setDrag(null); };
  const check=()=>{ if(slots.every(s=>s!==null) && slots.map(s=>s as number).every((v,i)=> v===correct[i])){ setCompleted(true); onComplete(true);} };
  const reset=()=>{ setNums(generateSet()); setSlots(Array(5).fill(null)); setCompleted(false); };
  return <div className="space-y-4"> <h3 className="font-semibold text-center">Number Line Orderer</h3><p className="text-center text-sm text-gray-600">Drag numbers below into increasing order. <span className="text-indigo-600 text-xs">Mode: {diff.variant}</span></p><div className="flex flex-wrap gap-2 justify-center">{nums.map(n=> <div key={n} draggable onDragStart={()=>handleDragStart(n)} className="px-3 py-2 bg-white border-2 border-indigo-300 rounded cursor-move font-bold">{n}</div>)}</div><div className="flex gap-2 justify-center">{[0,1,2,3,4].map(i=> <div key={i} onDragOver={e=>e.preventDefault()} onDrop={()=>handleDrop(i)} className="w-16 h-16 border-2 border-dashed flex items-center justify-center rounded text-lg font-bold {slots[i] && 'bg-indigo-100'}">{slots[i]}</div>)}</div>{!completed && slots.every(s=>s!==null) && <button onClick={check} className="btn-primary">Check Order</button>}{completed && <div className="text-center text-green-600">Perfect!</div>}<button onClick={reset} className="w-full btn-secondary">New Numbers</button></div>;
};

const ComparisonRulesVisualizerComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean)=>void }) => {
  const rules=[
    {id:1,text:'A negative number is always less than a positive number', valid:true},
    {id:2,text:'A larger negative number (e.g. -9) is greater than a smaller negative (e.g. -2)', valid:false},
    {id:3,text:'On a number line, numbers to the right are greater', valid:true},
    {id:4,text:'Zero is greater than every positive number', valid:false}
  ];
  const [selected,setSelected]=useState<number|null>(null);
  const [completed,setCompleted]=useState(false);
  const check=(id:number)=>{ setSelected(id); const rule=rules.find(r=>r.id===id)!; if(rule.valid){ setCompleted(true); onComplete(true);} };
  return <div className="space-y-4"> <h3 className="font-semibold text-center">Comparison Rules Visualizer</h3><p className="text-center text-sm text-gray-600">Select a TRUE rule about integers.</p><ul className="space-y-2">{rules.map(r=> <li key={r.id}><button onClick={()=>!completed && check(r.id)} className={`w-full text-left p-3 rounded border-2 transition ${selected===r.id ? (r.valid? 'bg-green-500 border-green-600 text-white':'bg-red-500 border-red-600 text-white') : 'bg-white border-gray-300 hover:border-blue-400'}`}>{r.text}</button></li>)}</ul>{completed && <div className="text-center text-green-600">Great! That rule is correct.</div>}</div>;
};

const ComparisonRulesApplicatorComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean)=>void }) => {
  const { getSkill } = useMastery();
  const skillId = (element as any).skillId || element.id || 'INT_RULES_APPLY';
  const diff = computeDifficulty(getSkill(skillId));
  const makePairs = () => {
    const r = diff.range; const pool:number[]=[]; for(let i=-r;i<=r;i++) pool.push(i);
    const set: [number,number][] = [];
    const targetLen = diff.variant==='challenge'? 6 : diff.variant==='standard'? 5 : 4;
    while(set.length<targetLen){
      const a = pool[Math.floor(Math.random()*pool.length)];
      let b = pool[Math.floor(Math.random()*pool.length)];
      if(diff.variant!=='scaffolded' && Math.random()<0.15) b=a; // allow equality sometimes
      if(!(diff.variant==='scaffolded' && a<0 && b<0)) { // scaffolded prefer at least one non-negative
        set.push([a,b]);
      }
    }
    return set;
  };
  const [pairs,setPairs]=useState<[number,number][]>(makePairs());
  const [index,setIndex]=useState(0);
  const [completed,setCompleted]=useState(false);
  useEffect(()=>{ setPairs(makePairs()); setIndex(0); setCompleted(false); }, [diff.variant, diff.range]);
  const current=pairs[index];
  const correctSymbol= current[0]<current[1]? '<': current[0]>current[1]? '>':'=';
  const answer=(sym:string)=>{ if(sym===correctSymbol){ if(index===pairs.length-1){ setCompleted(true); onComplete(true);} else setIndex(i=>i+1); } };
  const reset=()=>{ setPairs(makePairs()); setIndex(0); setCompleted(false); };
  return <div className="space-y-4"> <h3 className="font-semibold text-center">Comparison Rules Applicator</h3><p className="text-center text-sm text-gray-600">Choose the correct symbol for each pair. <span className="text-indigo-600 text-xs">Mode: {diff.variant}</span></p><div className="flex justify-center items-center gap-4 text-2xl font-bold"><span>{current[0]}</span><div className="flex gap-2">{['<','>','='].map(sym=> <button key={sym} onClick={()=>!completed && answer(sym)} className="w-12 h-12 border-2 rounded hover:bg-blue-100 text-xl">{sym}</button>)}</div><span>{current[1]}</span></div><p className="text-center text-sm">Problem {index+1} of {pairs.length}</p>{completed && <div className="text-center text-green-600">All comparisons correct!</div>}<button onClick={reset} className="w-full btn-secondary">Reset</button></div>;
};

// Adaptive Symbol Practice (separate from IntegerComparator visual tool)
const SymbolPracticeComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct:boolean)=>void }) => {
  const { getSkill } = useMastery();
  const skillId = (element as any).skillId || element.id || 'INT_SYMBOL_APPLY';
  const diff = computeDifficulty(getSkill(skillId));
  const genProblem = () => {
    const r = diff.range; const a = Math.floor(Math.random()* (2*r+1)) - r; let b = Math.floor(Math.random()* (2*r+1)) - r;
    if(diff.variant!=='scaffolded' && Math.random()<0.15) b=a; // equality sometimes
    if(diff.variant==='scaffolded') { // bias to positives and zero
      if(a<0 && b<0) b = Math.abs(b); 
    }
    return [a,b] as [number,number];
  };
  const [[a,b], setPair] = useState<[number,number]>(genProblem());
  const [attempts,setAttempts]=useState(0);
  const [selected,setSelected]=useState<string>('');
  const [completed,setCompleted]=useState(false);
  useEffect(()=>{ setPair(genProblem()); setSelected(''); setCompleted(false); setAttempts(0); }, [diff.variant, diff.range]);
  const correct = a<b? '<': a>b? '>':'=';
  const choose=(sym:string)=>{ if(completed) return; setSelected(sym); setAttempts(x=>x+1); if(sym===correct){ setCompleted(true); onComplete(true);} };
  const reset=()=>{ setPair(genProblem()); setSelected(''); setCompleted(false); setAttempts(0); };
  return <div className="space-y-4"> <h3 className="font-semibold text-center">{element.title || 'Symbol Practice'}</h3><p className="text-center text-sm text-gray-600">Select the correct symbol. <span className="text-indigo-600 text-xs">Mode: {diff.variant}</span></p><div className="flex justify-center items-center gap-6 text-3xl font-bold"><span>{a}</span><div className="flex gap-2">{['<','>','='].map(sym=> <button key={sym} disabled={completed} onClick={()=>choose(sym)} className={`w-16 h-16 border-2 rounded text-2xl font-bold ${selected===sym? (sym===correct? 'bg-green-500 border-green-600 text-white':'bg-red-500 border-red-600 text-white'):'bg-white hover:border-indigo-400 border-gray-300'}`}>{sym}</button>)}</div><span>{b}</span></div><div className="flex justify-between text-xs text-gray-600"><span>Attempts: {attempts}</span><button onClick={reset} className="px-2 py-1 border rounded hover:bg-gray-50">New</button></div>{completed && <div className="text-center text-green-600">Correct! {a} {correct} {b}</div>}</div>;
};

// Main Interactive Practice Component
export default function InteractivePractice({ elements, onComplete, topicId }: InteractivePracticeProps) {
  const [completedElements, setCompletedElements] = useState<string[]>([]);
  const [currentElement, setCurrentElement] = useState(0);
  const { globalScore, topicScores, addPoints, resetTopic } = useScore();
  const topicScore = topicId ? (topicScores[topicId] || 0) : 0;
  const { recordAttempt } = useMastery();
  const [elementStart, setElementStart] = useState<number>(Date.now());
  const [hintUsage, setHintUsage] = useState<Record<string, number>>({});

  useEffect(()=>{ setElementStart(Date.now()); }, [currentElement]);

  const handleElementComplete = (elementId: string, correct: boolean) => {
    if (correct && !completedElements.includes(elementId)) {
      setCompletedElements(prev => [...prev, elementId]);
      addPoints(10, topicId);
      onComplete(elementId, correct);
      const latency = Date.now() - elementStart;
      const el = elements.find(e=> e.id===elementId);
      const skillId = (el && (el as any).skillId) || elementId;
      recordAttempt(skillId, true, latency, hintUsage[elementId]||0);
    }
  };

  const renderInteractiveElement = (element: InteractiveElement) => {
    const [hintIndex, setHintIndex] = useState(0); // ephemeral per render; acceptable since component remounts per element
    const hasHints = Array.isArray((element as any).hints) && (element as any).hints.length > 0;
    const revealNextHint = () => setHintIndex(i => {
      const next = Math.min(i + 1, ((element as any).hints?.length || 1) - 1);
      setHintUsage(h=> ({...h, [element.id]: next+1}));
      return next;
    });
    const props = { element, onComplete: (correct: boolean) => handleElementComplete(element.id, correct) };

    switch (element.component) {
      case 'IntegerSorter':
        return <HintWrapper hasHints={hasHints} hints={(element as any).hints} hintIndex={hintIndex} onNextHint={revealNextHint}><IntegerSorter {...props} /></HintWrapper>;
      case 'FractionBuilder':
        return <HintWrapper hasHints={hasHints} hints={(element as any).hints} hintIndex={hintIndex} onNextHint={revealNextHint}><FractionBuilder {...props} /></HintWrapper>;
      case 'NumberLineClick':
        return <HintWrapper hasHints={hasHints} hints={(element as any).hints} hintIndex={hintIndex} onNextHint={revealNextHint}><NumberLineClick {...props} /></HintWrapper>;
      case 'MathInput':
        return <HintWrapper hasHints={hasHints} hints={(element as any).hints} hintIndex={hintIndex} onNextHint={revealNextHint}><MathInput {...props} /></HintWrapper>;
      case 'NumberLineReader':
        return <HintWrapper hasHints={hasHints} hints={(element as any).hints} hintIndex={hintIndex} onNextHint={revealNextHint}><NumberLineReader {...props} /></HintWrapper>;
      case 'ThermometerVisualization':
        return <HintWrapper hasHints={hasHints} hints={(element as any).hints} hintIndex={hintIndex} onNextHint={revealNextHint}><ThermometerVisualization {...props} /></HintWrapper>;
      case 'IntegerComparator':
        return <HintWrapper hasHints={hasHints} hints={(element as any).hints} hintIndex={hintIndex} onNextHint={revealNextHint}><IntegerComparator {...props} /></HintWrapper>;
      
      // Specific interactive components
      case 'IntegerIdentifier':
        return <HintWrapper hasHints={hasHints} hints={(element as any).hints} hintIndex={hintIndex} onNextHint={revealNextHint}><IntegerIdentifier {...props} /></HintWrapper>;
      case 'RealWorldIntegerMatcher':
        return <HintWrapper hasHints={hasHints} hints={(element as any).hints} hintIndex={hintIndex} onNextHint={revealNextHint}><RealWorldIntegerMatcher {...props} /></HintWrapper>;
      case 'ElevatorVisualization':
        return <HintWrapper hasHints={hasHints} hints={(element as any).hints} hintIndex={hintIndex} onNextHint={revealNextHint}><ElevatorVisualization {...props} /></HintWrapper>;
      
      // Use specific components for better educational experience
      case 'HorizontalNumberLine':
        return <HorizontalNumberLineComponent {...props} />;
      case 'NumberLineComparator':
        return <NumberLineComparatorComponent {...props} />;
      case 'IntegerOrderingVisualizer':
        return <IntegerOrderingVisualizerComponent {...props} />;
      case 'FactorFinderVisualization':
        return <FactorFinderVisualizationComponent {...props} />;
      case 'PrimeCheckerVisualization':
        return <PrimeCheckerVisualizationComponent {...props} />;
      case 'CompositeNumberExplorer':
        return <CompositeNumberExplorerComponent {...props} />;
      case 'TemperatureComparator':
        return <TemperatureComparatorComponent {...props} />;
      case 'QuadrantExplorer':
        return <QuadrantExplorerComponent {...props} />;
        
      // Fallback for remaining generic components
      case 'HorizontalGrapher':
        return <HorizontalGrapherComponent {...props} />;
      case 'HorizontalIntegerGrapher':
        return <HorizontalIntegerGrapherComponent {...props} />;
      case 'VerticalGrapher':
        return <VerticalGrapherComponent {...props} />;
      case 'VerticalIntegerGrapher':
        return <VerticalIntegerGrapherComponent {...props} />;

      case 'NumberLineOrderer':
        return <NumberLineOrdererComponent {...props} />;
      case 'ComparisonRulesVisualizer':
        return <ComparisonRulesVisualizerComponent {...props} />;
      case 'ComparisonRulesApplicator':
        return <ComparisonRulesApplicatorComponent {...props} />;

      // Map ordering helpers to ordering visualizer
  case 'AscendingOrderVisualizer':
  case 'AscendingOrderPractice':
  case 'DescendingOrderVisualizer':
  case 'DescendingOrderPractice':
        return <IntegerOrderingVisualizerComponent {...props} />;

      // Map symbol/comparison helpers to concrete interactive components
      case 'SymbolPractice':
        return <SymbolPracticeComponent {...props} />;
      case 'ComparisonSymbolHelper':
        return <IntegerComparator {...props} />;

      case 'FactorFinder':
        return <FactorFinderComponent {...props} />;

      case 'FactorTree':
        return <FactorTreeComponent {...props} />;

      case 'SquareVisualizer':
        return <SquareVisualizerComponent {...props} />;


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
  // FractionConverter not implemented; fall through
      
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
      case 'FactorDiscovery':
        return <FactorDiscoveryComponent {...props} />;
      case 'PrimeNumberHunt':
        return <PrimeNumberHuntComponent {...props} />;
      case 'PrimeCompositeClassifier':
        return <PrimeCompositeClassifierComponent {...props} />;
        
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
            <span className="ml-4 text-sm text-green-700">Topic Score: {topicScore} • Global: {globalScore}</span>
            {topicId && (
              <button
                onClick={() => resetTopic(topicId)}
                className="ml-4 text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
              >Reset Topic Score</button>
            )}
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

// Additional comprehensive interactive components

// Horizontal Number Line Component
const HorizontalNumberLineComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [targetNumber, setTargetNumber] = useState(-3);
  const [completed, setCompleted] = useState(false);

  const numberRange = [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10];

  const checkAnswer = (number: number) => {
    setSelectedPoint(number);
    if (number === targetNumber) {
      setCompleted(true);
      onComplete(true);
    }
  };

  const generateNewProblem = () => {
    setTargetNumber(numberRange[Math.floor(Math.random() * numberRange.length)]);
    setSelectedPoint(null);
    setCompleted(false);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{element.title}</h3>
        <p className="text-gray-600 text-sm">Click on {targetNumber} on the number line</p>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="relative w-full h-20 bg-white rounded-lg border-2 border-blue-200 overflow-x-auto">
          <svg viewBox="0 0 800 60" className="w-full h-full">
            <line x1="50" y1="30" x2="750" y2="30" stroke="#3B82F6" strokeWidth="3" />
            {numberRange.map((num, index) => {
              const x = 50 + (index * 70);
              return (
                <g key={num}>
                  <line x1={x} y1="20" x2={x} y2="40" stroke="#3B82F6" strokeWidth="2" />
                  <text x={x} y="55" textAnchor="middle" className="fill-gray-700 text-sm font-medium">
                    {num}
                  </text>
                  <circle
                    cx={x}
                    cy="30"
                    r="8"
                    className={`cursor-pointer ${
                      selectedPoint === num
                        ? completed && num === targetNumber
                          ? 'fill-green-500'
                          : 'fill-red-500'
                        : 'fill-transparent hover:fill-blue-200'
                    }`}
                    stroke="#3B82F6"
                    strokeWidth="2"
                    onClick={() => !completed && checkAnswer(num)}
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>
      
      {completed && (
        <div className="text-center text-green-700 font-semibold">
          <CheckCircle className="h-8 w-8 mx-auto mb-2" />
          Correct! You found {targetNumber} on the number line.
        </div>
      )}
      
      <button
        onClick={generateNewProblem}
        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
      >
        <RefreshCw className="h-4 w-4" />
        <span>New Number</span>
      </button>
    </div>
  );
};

// Number Line Comparator Component
const NumberLineComparatorComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [numbers] = useState([-5, -2, 1, 4]);
  const [selectedPair, setSelectedPair] = useState<[number, number] | null>(null);
  const [symbol, setSymbol] = useState<string>('');
  const [completed, setCompleted] = useState(false);

  const getCorrectSymbol = (a: number, b: number) => {
    if (a < b) return '<';
    if (a > b) return '>';
    return '=';
  };

  const checkAnswer = (a: number, b: number, selectedSymbol: string) => {
    setSelectedPair([a, b]);
    setSymbol(selectedSymbol);
    
    if (selectedSymbol === getCorrectSymbol(a, b)) {
      setCompleted(true);
      onComplete(true);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{element.title}</h3>
        <p className="text-gray-600 text-sm">Use the number line to compare integers</p>
      </div>
      
      <div className="bg-purple-50 p-6 rounded-lg">
        <div className="mb-4">
          <svg viewBox="0 0 600 80" className="w-full h-20 bg-white rounded border">
            <line x1="50" y1="40" x2="550" y2="40" stroke="#8B5CF6" strokeWidth="2" />
            {[-6, -4, -2, 0, 2, 4, 6].map((num, index) => {
              const x = 50 + (index * 80);
              return (
                <g key={num}>
                  <line x1={x} y1="35" x2={x} y2="45" stroke="#8B5CF6" strokeWidth="2" />
                  <text x={x} y="60" textAnchor="middle" className="fill-gray-700 text-sm font-medium">
                    {num}
                  </text>
                  {numbers.includes(num) && (
                    <circle cx={x} cy="40" r="6" className="fill-purple-500" />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {[[-5, -2], [1, 4]].map(([a, b], pairIndex) => (
            <div key={pairIndex} className="bg-white p-4 rounded border">
              <div className="flex items-center justify-center space-x-4 text-xl">
                <span className="font-bold">{a}</span>
                <div className="flex space-x-1">
                  {['<', '>', '='].map((sym) => (
                    <button
                      key={sym}
                      onClick={() => checkAnswer(a, b, sym)}
                      disabled={completed}
                      className={`w-10 h-10 rounded border font-bold ${
                        selectedPair?.[0] === a && selectedPair?.[1] === b && symbol === sym
                          ? completed && sym === getCorrectSymbol(a, b)
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-gray-100 hover:bg-purple-100'
                      }`}
                    >
                      {sym}
                    </button>
                  ))}
                </div>
                <span className="font-bold">{b}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Integer Ordering Visualizer Component
const IntegerOrderingVisualizerComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [numbers, setNumbers] = useState([-8, -3, 0, 5, -1]);
  const [userOrder, setUserOrder] = useState<number[]>([]);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  // Determine mode dynamically from component name/title/instructions
  const isDescending = !!(element.component?.includes('Descending') || element.title?.toLowerCase().includes('descending') || element.instructions?.toLowerCase().includes('largest to smallest'));

  const correctOrder = [...numbers].sort((a, b) => isDescending ? b - a : a - b);

  const handleDragStart = (number: number) => setDraggedItem(number);

  const handleDrop = (index: number) => {
    if (draggedItem !== null) {
      const newOrder = [...userOrder];
      newOrder[index] = draggedItem;
      setUserOrder(newOrder);
      setDraggedItem(null);
    }
  };

  const checkOrder = () => {
    const isCorrect = userOrder.length === correctOrder.length && userOrder.every((n, i) => n === correctOrder[i]);
    if (isCorrect) { setCompleted(true); onComplete(true); }
  };

  const reset = () => {
    const newNumbers = [-10, -7, -3, -1, 2, 6, 8, 9].sort(() => Math.random() - 0.5).slice(0, 5);
    setNumbers(newNumbers);
    setUserOrder([]);
    setCompleted(false);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{element.title}</h3>
        <p className="text-gray-600 text-sm">Drag numbers to arrange from {isDescending ? 'largest to smallest' : 'smallest to largest'}</p>
      </div>

      <div className="bg-green-50 p-6 rounded-lg">
        <div className="mb-4">
          <h4 className="font-medium mb-2">Numbers to arrange:</h4>
          <div className="flex flex-wrap gap-2">
            {numbers.map(num => (
              <div
                key={num}
                draggable
                onDragStart={() => handleDragStart(num)}
                className="px-4 py-2 bg-white border-2 border-green-200 rounded-lg cursor-move hover:border-green-400 font-bold text-lg"
              >
                {num}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-medium mb-2">Your order ({isDescending ? 'largest → smallest' : 'smallest → largest'}):</h4>
          <div className="flex gap-2">
            {[0,1,2,3,4].map(index => (
              <div
                key={index}
                onDragOver={e => e.preventDefault()}
                onDrop={() => handleDrop(index)}
                className={`w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center font-bold text-lg ${userOrder[index] !== undefined ? 'bg-green-100 border-green-400' : 'border-gray-300'}`}
              >
                {userOrder[index]}
              </div>
            ))}
          </div>
        </div>

        {userOrder.length === correctOrder.length && (
          <button onClick={checkOrder} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Check Order</button>
        )}
      </div>

      {completed && (
        <div className="text-center text-green-700 font-semibold">
          <CheckCircle className="h-8 w-8 mx-auto mb-2" />
          Perfect! You arranged the integers correctly: {correctOrder.join(isDescending ? ' > ' : ' < ')}
        </div>
      )}

      <button onClick={reset} className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
        <RefreshCw className="h-4 w-4" />
        <span>New Numbers</span>
      </button>
    </div>
  );
};

// Factor Finder Visualization Component
const FactorFinderVisualizationComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [number, setNumber] = useState(12);
  const [userFactors, setUserFactors] = useState<number[]>([]);
  const [inputFactor, setInputFactor] = useState('');
  const [completed, setCompleted] = useState(false);

  const correctFactors = [];
  for (let i = 1; i <= number; i++) {
    if (number % i === 0) {
      correctFactors.push(i);
    }
  }

  const addFactor = () => {
    const factor = parseInt(inputFactor);
    if (factor && !userFactors.includes(factor)) {
      if (number % factor === 0) {
        const newFactors = [...userFactors, factor].sort((a, b) => a - b);
        setUserFactors(newFactors);
        if (newFactors.length === correctFactors.length) {
          setCompleted(true);
          onComplete(true);
        }
      }
    }
    setInputFactor('');
  };

  const generateNew = () => {
    const numbers = [8, 12, 15, 18, 20, 24, 30];
    setNumber(numbers[Math.floor(Math.random() * numbers.length)]);
    setUserFactors([]);
    setInputFactor('');
    setCompleted(false);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{element.title}</h3>
        <p className="text-gray-600 text-sm">Find all factors of {number}</p>
      </div>
      
      <div className="bg-orange-50 p-6 rounded-lg">
        <div className="grid grid-cols-6 gap-2 mb-4">
          {Array.from({length: number}, (_, i) => i + 1).map(i => (
            <div
              key={i}
              className={`w-8 h-8 border rounded flex items-center justify-center text-sm ${
                number % i === 0 ? 'bg-orange-200 border-orange-400' : 'bg-gray-100 border-gray-300'
              }`}
            >
              {i}
            </div>
          ))}
        </div>
        
        <div className="flex space-x-2 mb-4">
          <input
            type="number"
            value={inputFactor}
            onChange={(e) => setInputFactor(e.target.value)}
            placeholder="Enter a factor"
            className="flex-1 border rounded px-3 py-2"
            onKeyPress={(e) => e.key === 'Enter' && addFactor()}
          />
          <button
            onClick={addFactor}
            disabled={!inputFactor}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
          >
            Add
          </button>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Factors found: {userFactors.length}/{correctFactors.length}</h4>
          <div className="flex flex-wrap gap-2">
            {userFactors.map(factor => (
              <span key={factor} className="px-3 py-1 bg-green-100 border border-green-300 rounded">
                {factor}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {completed && (
        <div className="text-center text-green-700 font-semibold">
          <CheckCircle className="h-8 w-8 mx-auto mb-2" />
          Excellent! You found all factors: {correctFactors.join(', ')}
        </div>
      )}
      
      <button
        onClick={generateNew}
        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
      >
        <RefreshCw className="h-4 w-4" />
        <span>New Number</span>
      </button>
    </div>
  );
};

// Prime Checker Visualization Component  
const PrimeCheckerVisualizationComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [number, setNumber] = useState(7);
  const [userAnswer, setUserAnswer] = useState<'prime' | 'composite' | null>(null);
  const [completed, setCompleted] = useState(false);
  const [showFactors, setShowFactors] = useState(false);

  const isPrime = (n: number) => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  };

  const getFactors = (n: number) => {
    const factors = [];
    for (let i = 1; i <= n; i++) {
      if (n % i === 0) factors.push(i);
    }
    return factors;
  };

  const checkAnswer = (answer: 'prime' | 'composite') => {
    setUserAnswer(answer);
    setShowFactors(true);
    const correct = isPrime(number) ? answer === 'prime' : answer === 'composite';
    if (correct) {
      setCompleted(true);
      onComplete(true);
    }
  };

  const generateNew = () => {
    const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    setNumber(numbers[Math.floor(Math.random() * numbers.length)]);
    setUserAnswer(null);
    setCompleted(false);
    setShowFactors(false);
  };

  const factors = getFactors(number);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{element.title}</h3>
        <p className="text-gray-600 text-sm">Is {number} prime or composite?</p>
      </div>
      
      <div className="bg-indigo-50 p-6 rounded-lg">
        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-indigo-800 mb-4">{number}</div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => checkAnswer('prime')}
              disabled={completed}
              className={`px-6 py-3 rounded-lg font-semibold ${
                userAnswer === 'prime'
                  ? completed && isPrime(number)
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Prime
            </button>
            <button
              onClick={() => checkAnswer('composite')}
              disabled={completed}
              className={`px-6 py-3 rounded-lg font-semibold ${
                userAnswer === 'composite'
                  ? completed && !isPrime(number)
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Composite
            </button>
          </div>
        </div>
        
        {showFactors && (
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Factors of {number}:</h4>
            <div className="flex flex-wrap gap-2 mb-2">
              {factors.map(factor => (
                <span key={factor} className="px-2 py-1 bg-indigo-100 border border-indigo-300 rounded text-sm">
                  {factor}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              {isPrime(number) 
                ? `${number} is prime because it has exactly 2 factors: 1 and ${number}`
                : `${number} is composite because it has more than 2 factors`
              }
            </p>
          </div>
        )}
      </div>
      
      {completed && (
        <div className="text-center text-green-700 font-semibold">
          <CheckCircle className="h-8 w-8 mx-auto mb-2" />
          Correct! {number} is {isPrime(number) ? 'prime' : 'composite'}.
        </div>
      )}
      
      <button
        onClick={generateNew}
        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
      >
        <RefreshCw className="h-4 w-4" />
        <span>New Number</span>
      </button>
    </div>
  );
};

// Temperature Comparator Component
const TemperatureComparatorComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [temp1, setTemp1] = useState(-5);
  const [temp2, setTemp2] = useState(3);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');
  const [completed, setCompleted] = useState(false);

  const getCorrectSymbol = () => {
    if (temp1 < temp2) return '<';
    if (temp1 > temp2) return '>';
    return '=';
  };

  const checkAnswer = (symbol: string) => {
    setSelectedSymbol(symbol);
    if (symbol === getCorrectSymbol()) {
      setCompleted(true);
      onComplete(true);
    }
  };

  const generateNew = () => {
    const temperatures = [-15, -10, -5, 0, 5, 10, 15, 20, 25];
    setTemp1(temperatures[Math.floor(Math.random() * temperatures.length)]);
    setTemp2(temperatures[Math.floor(Math.random() * temperatures.length)]);
    setSelectedSymbol('');
    setCompleted(false);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{element.title}</h3>
        <p className="text-gray-600 text-sm">Compare the temperatures</p>
      </div>
      
      <div className="bg-cyan-50 p-6 rounded-lg">
        <div className="flex items-center justify-center space-x-6">
          <div className="text-center">
            <div className="bg-white p-4 rounded-lg border-2 border-cyan-200 mb-2">
              <div className="text-3xl font-bold">{temp1}°C</div>
            </div>
            <div className="text-sm text-gray-600">
              {temp1 < 0 ? 'Below freezing' : temp1 === 0 ? 'Freezing point' : 'Above freezing'}
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            {['<', '>', '='].map((symbol) => (
              <button
                key={symbol}
                onClick={() => checkAnswer(symbol)}
                disabled={completed}
                className={`w-16 h-16 rounded-lg border-2 text-2xl font-bold ${
                  selectedSymbol === symbol
                    ? completed && symbol === getCorrectSymbol()
                      ? 'bg-green-500 border-green-600 text-white'
                      : 'bg-red-500 border-red-600 text-white'
                    : 'bg-white border-cyan-300 hover:border-cyan-400'
                } ${completed ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {symbol}
              </button>
            ))}
          </div>
          
          <div className="text-center">
            <div className="bg-white p-4 rounded-lg border-2 border-cyan-200 mb-2">
              <div className="text-3xl font-bold">{temp2}°C</div>
            </div>
            <div className="text-sm text-gray-600">
              {temp2 < 0 ? 'Below freezing' : temp2 === 0 ? 'Freezing point' : 'Above freezing'}
            </div>
          </div>
        </div>
      </div>
      
      {completed && (
        <div className="text-center text-green-700 font-semibold">
          <CheckCircle className="h-8 w-8 mx-auto mb-2" />
          Correct! {temp1}°C {getCorrectSymbol()} {temp2}°C
        </div>
      )}
      
      <button
        onClick={generateNew}
        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
      >
        <RefreshCw className="h-4 w-4" />
        <span>New Temperatures</span>
      </button>
    </div>
  );
};

// Quadrant Explorer Component
const QuadrantExplorerComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [currentPoint, setCurrentPoint] = useState({ x: 3, y: 2 });
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  const getQuadrant = (x: number, y: number) => {
    if (x > 0 && y > 0) return 1;
    if (x < 0 && y > 0) return 2;
    if (x < 0 && y < 0) return 3;
    if (x > 0 && y < 0) return 4;
    return 0; // on axis
  };

  const checkAnswer = (quadrant: number) => {
    setUserAnswer(quadrant);
    if (quadrant === getQuadrant(currentPoint.x, currentPoint.y)) {
      setCompleted(true);
      onComplete(true);
    }
  };

  const generateNew = () => {
    const coordinates = [
      { x: 2, y: 3 }, { x: -3, y: 2 }, { x: -2, y: -3 }, { x: 3, y: -2 },
      { x: 1, y: 4 }, { x: -4, y: 1 }, { x: -1, y: -4 }, { x: 4, y: -1 }
    ];
    setCurrentPoint(coordinates[Math.floor(Math.random() * coordinates.length)]);
    setUserAnswer(null);
    setCompleted(false);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{element.title}</h3>
        <p className="text-gray-600 text-sm">Which quadrant contains the point ({currentPoint.x}, {currentPoint.y})?</p>
      </div>
      
      <div className="bg-teal-50 p-6 rounded-lg">
        <div className="relative bg-white border-2 border-teal-200 rounded-lg p-4 mb-4">
          <svg viewBox="-6 -6 12 12" className="w-full h-80">
            {/* Grid lines */}
            {[-4, -2, 2, 4].map(i => (
              <g key={i}>
                <line x1={i} y1="-5" x2={i} y2="5" stroke="#e5e7eb" strokeWidth="0.1" />
                <line x1="-5" y1={i} x2="5" y2={i} stroke="#e5e7eb" strokeWidth="0.1" />
              </g>
            ))}
            
            {/* Axes */}
            <line x1="-5" y1="0" x2="5" y2="0" stroke="#374151" strokeWidth="0.2" />
            <line x1="0" y1="-5" x2="0" y2="5" stroke="#374151" strokeWidth="0.2" />
            
            {/* Quadrant labels */}
            <text x="2" y="-2" textAnchor="middle" className="fill-teal-600 font-bold text-lg">I</text>
            <text x="-2" y="-2" textAnchor="middle" className="fill-teal-600 font-bold text-lg">II</text>
            <text x="-2" y="2" textAnchor="middle" className="fill-teal-600 font-bold text-lg">III</text>
            <text x="2" y="2" textAnchor="middle" className="fill-teal-600 font-bold text-lg">IV</text>
            
            {/* Current point */}
            <circle 
              cx={currentPoint.x} 
              cy={-currentPoint.y} 
              r="0.3" 
              className="fill-red-500" 
            />
            <text 
              x={currentPoint.x + 0.5} 
              y={-currentPoint.y - 0.5} 
              className="fill-red-600 font-bold text-sm"
            >
              ({currentPoint.x}, {currentPoint.y})
            </text>
          </svg>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map(quadrant => (
            <button
              key={quadrant}
              onClick={() => checkAnswer(quadrant)}
              disabled={completed}
              className={`py-3 rounded-lg font-semibold ${
                userAnswer === quadrant
                  ? completed && quadrant === getQuadrant(currentPoint.x, currentPoint.y)
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-teal-100 text-teal-800 hover:bg-teal-200'
              }`}
            >
              Quadrant {quadrant}
            </button>
          ))}
        </div>
      </div>
      
      {completed && (
        <div className="text-center text-green-700 font-semibold">
          <CheckCircle className="h-8 w-8 mx-auto mb-2" />
          Correct! Point ({currentPoint.x}, {currentPoint.y}) is in Quadrant {getQuadrant(currentPoint.x, currentPoint.y)}.
        </div>
      )}
      
      <button
        onClick={generateNew}
        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
      >
        <RefreshCw className="h-4 w-4" />
        <span>New Point</span>
      </button>
    </div>
  );
};

// Composite Number Explorer Component
const CompositeNumberExplorerComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const [numbers] = useState([4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  const isComposite = (n: number) => {
    if (n < 4) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return true;
    }
    return false;
  };

  const compositeNumbers = numbers.filter(isComposite);

  const toggleNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num));
    } else {
      const newSelected = [...selectedNumbers, num];
      setSelectedNumbers(newSelected);
      
      if (newSelected.length === compositeNumbers.length && 
          newSelected.every(n => isComposite(n))) {
        setCompleted(true);
        onComplete(true);
      }
    }
  };

  const getFactors = (n: number) => {
    const factors = [];
    for (let i = 1; i <= n; i++) {
      if (n % i === 0) factors.push(i);
    }
    return factors;
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{element.title}</h3>
        <p className="text-gray-600 text-sm">Select all composite numbers (numbers with more than 2 factors)</p>
      </div>
      
      <div className="bg-amber-50 p-6 rounded-lg">
        <div className="grid grid-cols-4 gap-3 mb-4">
          {numbers.map(num => (
            <button
              key={num}
              onClick={() => toggleNumber(num)}
              disabled={completed}
              className={`p-4 rounded-lg border-2 font-bold text-lg ${
                selectedNumbers.includes(num)
                  ? isComposite(num)
                    ? 'bg-green-200 border-green-400 text-green-800'
                    : 'bg-red-200 border-red-400 text-red-800'
                  : 'bg-white border-amber-300 hover:border-amber-400'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
        
        <div className="text-sm text-gray-600">
          <p>Selected: {selectedNumbers.length} / {compositeNumbers.length} composite numbers</p>
        </div>
        
        {selectedNumbers.length > 0 && (
          <div className="mt-4 p-3 bg-white rounded border">
            <h4 className="font-medium mb-2">Factors of selected numbers:</h4>
            {selectedNumbers.map(num => (
              <div key={num} className="text-sm mb-1">
                <strong>{num}:</strong> {getFactors(num).join(', ')} 
                <span className={isComposite(num) ? 'text-green-600 ml-2' : 'text-red-600 ml-2'}>
                  ({isComposite(num) ? 'Composite' : 'Not composite'})
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {completed && (
        <div className="text-center text-green-700 font-semibold">
          <CheckCircle className="h-8 w-8 mx-auto mb-2" />
          Perfect! You identified all composite numbers: {compositeNumbers.join(', ')}
        </div>
      )}
    </div>
  );
};

// Additional simple components for remaining interactives
// Mass Converter (adaptive difficulty via unit range & magnitude)
const MassConverterComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const { getSkill } = useMastery();
  const skillId = (element as any).skillId || 'MASS_CONVERT';
  const diff = computeDifficulty(getSkill(skillId));
  const units = ['mg','g','kg','t'] as const;
  const factors: Record<typeof units[number], number> = { mg:1, g:1000, kg:1_000_000, t:1_000_000_000 };
  const pickProblem = () => {
    const span = diff.variant==='challenge'? units : diff.variant==='standard'? units.slice(0,3): units.slice(1,3);
    const from = span[Math.floor(Math.random()*span.length)];
    let to = span[Math.floor(Math.random()*span.length)]; while(to===from) to = span[Math.floor(Math.random()*span.length)];
    const magnitude = diff.variant==='scaffolded'? [5,10,25,50,75,100][Math.floor(Math.random()*6)] : diff.variant==='standard'? Math.pow(10, Math.floor(Math.random()*3)) * (Math.floor(Math.random()*9)+1) : (Math.floor(Math.random()*900)+100);
    return { from, to, value: magnitude };
  };
  const [{from,to,value}, setProblem] = useState(pickProblem());
  const [answer,setAnswer]=useState('');
  const [completed,setCompleted]=useState(false);
  const correct = (value * factors[from]) / factors[to];
  const check=()=>{ const a=parseFloat(answer); if(!isNaN(a) && Math.abs(a-correct) < 1e-2){ setCompleted(true); onComplete(true);} };
  const newProb=()=>{ setProblem(pickProblem()); setAnswer(''); setCompleted(false); };
  return <div className="space-y-4">
    <h3 className="font-semibold">Mass Conversion</h3>
    <p className="text-sm text-gray-600">Convert {value.toLocaleString()} {from} to {to}. Mode: {diff.variant}</p>
    <div className="flex gap-2">
      <input className="flex-1 border rounded px-3 py-2" placeholder="Answer" value={answer} disabled={completed} onChange={e=>setAnswer(e.target.value)} onKeyDown={e=> e.key==='Enter' && check()} />
      <button onClick={check} disabled={completed || !answer} className="btn-primary px-4">Check</button>
    </div>
    {completed && <div className="p-3 bg-green-50 rounded text-green-700 text-sm">Correct! {value} {from} = {correct.toLocaleString(undefined,{maximumFractionDigits:4})} {to}</div>}
    <button onClick={newProb} className="w-full btn-secondary">New Conversion</button>
  </div>;
};

// Volume Converter (litres, ml, cm^3) – treat 1 mL = 1 cm^3
const VolumeConverterComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const { getSkill } = useMastery(); const skillId=(element as any).skillId||'VOLUME_CONVERT'; const diff=computeDifficulty(getSkill(skillId));
  const units=['mL','L','cm3'] as const; const factors: Record<typeof units[number], number>={ mL:1, cm3:1, L:1000 };
  const pick=()=>{ const value= diff.variant==='scaffolded'? [100,250,500,750,1000][Math.floor(Math.random()*5)] : (Math.floor(Math.random()*900)+100); const from=units[Math.floor(Math.random()*units.length)]; let to=units[Math.floor(Math.random()*units.length)]; while(to===from) to=units[Math.floor(Math.random()*units.length)]; return {value,from,to}; };
  const [{value,from,to}, setProb]=useState(pick()); const [ans,setAns]=useState(''); const [completed,setCompleted]=useState(false);
  const correct = (value * factors[from]) / factors[to];
  const label=(u:string)=> u==='cm3'? <>cm<sup>3</sup></>: u;
  const check=()=>{ const a=parseFloat(ans); if(!isNaN(a) && Math.abs(a-correct)<1e-2){ setCompleted(true); onComplete(true);} };
  return <div className="space-y-4"><h3 className="font-semibold">Volume Conversion</h3><p className="text-sm text-gray-600">Convert {value} {label(from)} to {label(to)}</p><div className="flex gap-2"><input value={ans} disabled={completed} onChange={e=>setAns(e.target.value)} className="flex-1 border rounded px-3 py-2" placeholder="Answer" onKeyDown={e=> e.key==='Enter' && check()} /><button onClick={check} disabled={completed||!ans} className="btn-primary px-4">Check</button></div>{completed && <div className="p-3 bg-green-50 rounded text-green-700 text-sm">Correct! {value} {label(from)} = {correct.toLocaleString(undefined,{maximumFractionDigits:4})} {label(to)}</div>}<button onClick={()=>{ setProb(pick()); setAns(''); setCompleted(false); }} className="w-full btn-secondary">New Conversion</button></div>;
};

// Integer Coordinate Plotter – click grid to plot required point
const IntegerCoordinatePlotterComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const { getSkill } = useMastery(); const skillId=(element as any).skillId||'COORD_PLOT'; const diff=computeDifficulty(getSkill(skillId));
  const range = diff.range>10? 5 : 5; // keep visual manageable; adaptive variant toggles quadrant complexity
  const pick=()=>{ const coords=[-range,-range+1,-range+2,-range+3,-range+4,-1,0,1,2,3,4,range].filter((_,i)=>i<11); const x = coords[Math.floor(Math.random()*coords.length)]; const y = coords[Math.floor(Math.random()*coords.length)]; return {x,y}; };
  const [target,setTarget]=useState(pick()); const [completed,setCompleted]=useState(false);
  const click=(x:number,y:number)=>{ if(completed) return; if(x===target.x && y===target.y){ setCompleted(true); onComplete(true);} };
  return <div className="space-y-4"><h3 className="font-semibold">Plot the Point</h3><p className="text-sm text-gray-600">Click ({target.x}, {target.y}) on the grid.</p><div className="inline-grid bg-white border rounded" style={{gridTemplateColumns:`repeat(${range*2+1},1.75rem)`}}>{Array.from({length:(range*2+1)*(range*2+1)},(_,i)=>{ const x=i%(range*2+1)-range; const y= range - Math.floor(i/(range*2+1)); const isAxis = x===0 || y===0; const isTarget= x===target.x && y===target.y; return <button key={i} onClick={()=>click(x,y)} className={`w-7 h-7 text-[10px] flex items-center justify-center border ${isTarget && completed? 'bg-green-500 text-white':'hover:bg-indigo-100'} ${isAxis? 'border-gray-400':'border-gray-200'}`}>{(isAxis && (x===0||y===0))? '': ''}</button>; })}</div>{completed && <div className="text-green-600 text-sm">Correct!</div>}<button onClick={()=>{ setTarget(pick()); setCompleted(false); }} className="w-full btn-secondary">New Point</button></div>;
};

// Shape 3D Builder – choose dimensions to match target volume
const Shape3DBuilderComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const dims=[2,3,4,5,6]; const pick=()=>{ const l=dims[Math.floor(Math.random()*dims.length)]; const w=dims[Math.floor(Math.random()*dims.length)]; const h=dims[Math.floor(Math.random()*dims.length)]; return {volume:l*w*h}; };
  const [target,setTarget]=useState(pick()); const [l,setL]=useState(2); const [w,setW]=useState(2); const [h,setH]=useState(2); const [completed,setCompleted]=useState(false);
  useEffect(()=>{ if(l*w*h===target.volume && !completed){ setCompleted(true); onComplete(true);} },[l,w,h,target,completed,onComplete]);
  return <div className="space-y-4"><h3 className="font-semibold">Build a Rectangular Prism</h3><p className="text-sm text-gray-600">Target volume: {target.volume} cubic units</p><div className="grid grid-cols-3 gap-3">{[['Length',l,setL],['Width',w,setW],['Height',h,setH]].map(([label,val,setter]: any)=>(<div key={label} className="space-y-1"><label className="text-xs text-gray-500">{label}</label><select disabled={completed} value={val} onChange={e=>setter(parseInt(e.target.value))} className="w-full border rounded px-2 py-1">{dims.map(d=> <option key={d}>{d}</option>)}</select></div>))}</div>{completed && <div className="text-green-600 text-sm">Great! {l}×{w}×{h} = {target.volume}</div>}<button onClick={()=>{ setTarget(pick()); setL(2); setW(2); setH(2); setCompleted(false); }} className="w-full btn-secondary">New Target</button></div>;
};

// Data Display Interpreter – read bar chart to answer a question
const DataDisplayInterpreterComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const pick=()=>{ const cats=['A','B','C','D']; const vals=cats.map(()=> Math.floor(Math.random()*6)+2); const qType=Math.random()<0.5? 'max':'diff'; return {cats,vals,qType}; };
  const [{cats,vals,qType}, setData]=useState(pick()); const [answer,setAnswer]=useState(''); const [completed,setCompleted]=useState(false);
  const correct = qType==='max'? cats[vals.indexOf(Math.max(...vals))] : (Math.max(...vals)-Math.min(...vals)).toString();
  const prompt = qType==='max'? 'Which category has the highest value?' : 'What is the difference between highest and lowest values?';
  const check=()=>{ if(answer.trim().toUpperCase()===correct.toString().toUpperCase()){ setCompleted(true); onComplete(true);} };
  return <div className="space-y-4"><h3 className="font-semibold">Interpret the Data</h3><p className="text-sm text-gray-600">{prompt}</p><div className="flex items-end gap-3 h-40 bg-white border rounded p-3">{vals.map((v,i)=>(<div key={i} className="flex flex-col items-center gap-1"><div style={{height:`${v*12}px`}} className="w-8 bg-indigo-400 rounded"></div><span className="text-xs">{cats[i]}</span><span className="text-[10px] text-gray-500">{v}</span></div>))}</div><div className="flex gap-2">{qType==='max'? (<input value={answer} disabled={completed} onChange={e=>setAnswer(e.target.value)} placeholder="Category" className="flex-1 border rounded px-3 py-2" />): (<input value={answer} disabled={completed} onChange={e=>setAnswer(e.target.value)} placeholder="Difference" className="flex-1 border rounded px-3 py-2" />)}<button onClick={check} disabled={completed||!answer} className="btn-primary px-4">Check</button></div>{completed && <div className="text-green-600 text-sm">Correct! Answer: {correct}</div>}<button onClick={()=>{ setData(pick()); setAnswer(''); setCompleted(false); }} className="w-full btn-secondary">New Chart</button></div>;
};

// Investigation Planner – order steps correctly (simple drag substitute using select sequence)
const InvestigationPlannerComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const steps=[ 'Form a question', 'Collect data', 'Organise data', 'Analyse results', 'Draw conclusion'];
  const [shuffled,setShuffled]=useState<string[]>([...steps].sort(()=>Math.random()-0.5));
  const [sequence,setSequence]=useState<string[]>([]); const [completed,setCompleted]=useState(false);
  const add=(s:string)=>{ if(completed) return; if(!sequence.includes(s)){ const ns=[...sequence,s]; setSequence(ns); if(ns.length===steps.length && ns.every((v,i)=> v===steps[i])){ setCompleted(true); onComplete(true);} } };
  return <div className="space-y-4"><h3 className="font-semibold">Plan an Investigation</h3><p className="text-sm text-gray-600">Select steps in correct order.</p><div className="flex flex-wrap gap-2">{shuffled.map(s=> <button key={s} disabled={sequence.includes(s)||completed} onClick={()=>add(s)} className={`px-3 py-1 rounded border ${sequence.includes(s)? 'bg-gray-200 text-gray-500':'bg-white hover:bg-indigo-50'}`}>{s}</button>)}</div><div className="p-2 bg-gray-50 rounded min-h-[3rem] text-sm flex flex-wrap gap-2">{sequence.map((s,i)=><span key={s} className="px-2 py-1 bg-indigo-100 rounded text-indigo-700 text-xs">{i+1}. {s}</span>)}</div>{completed && <div className="text-green-600 text-sm">Great! Steps correctly ordered.</div>}<button onClick={()=>{ setShuffled([...steps].sort(()=>Math.random()-0.5)); setSequence([]); setCompleted(false); }} className="w-full btn-secondary">Reset</button></div>;
};

// Probability Simulator – spinner outcomes vs prediction
const ProbabilitySimulatorComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const colors = ['red','blue','green','yellow'];
  const [segments,setSegments]=useState<string[]>(Array.from({length:8},()=> colors[Math.floor(Math.random()*colors.length)]));
  const [target,setTarget]=useState(colors[Math.floor(Math.random()*colors.length)]);
  const [trials,setTrials]=useState(10); const [spins,setSpins]=useState<string[]>([]);
  const [prediction,setPrediction]=useState(''); const [completed,setCompleted]=useState(false);
  const run=()=>{ if(completed) return; const results:string[]=[]; for(let i=0;i<trials;i++){ results.push(segments[Math.floor(Math.random()*segments.length)]);} setSpins(results); };
  useEffect(()=>{ if(spins.length===trials && trials>0){ const count=spins.filter(s=>s===target).length; const prob=count/trials; const pred=parseFloat(prediction); if(!isNaN(pred) && Math.abs(pred-prob) < 0.11){ setCompleted(true); onComplete(true);} } },[spins,trials,target,prediction,onComplete]);
  const reset=()=>{ setSegments(Array.from({length:8},()=> colors[Math.floor(Math.random()*colors.length)])); setTarget(colors[Math.floor(Math.random()*colors.length)]); setTrials(10); setSpins([]); setPrediction(''); setCompleted(false); };
  const targetCount=segments.filter(s=>s===target).length; const theoretical=(targetCount/segments.length).toFixed(2);
  return <div className="space-y-4"><h3 className="font-semibold">Probability Simulator</h3><p className="text-sm text-gray-600">Spinner theoretical P({target}) = {theoretical}. Predict experimental probability for {trials} spins (decimal 0-1).</p><div className="flex gap-2 items-end"><input type="number" min={1} max={200} value={trials} disabled={completed} onChange={e=>{ setTrials(parseInt(e.target.value)||10); setSpins([]); }} className="w-24 border rounded px-2 py-1" /><input value={prediction} disabled={completed} onChange={e=>setPrediction(e.target.value)} placeholder="Prediction" className="flex-1 border rounded px-2 py-1" /><button onClick={run} disabled={completed || !prediction} className="btn-primary">Spin</button></div><div className="flex flex-wrap gap-1">{spins.map((c,i)=><span key={i} className={`px-2 py-1 rounded text-xs bg-${c==='red'?'red':c==='blue'?'blue':c==='green'?'green':'yellow'}-200`}>{c[0]}</span>)}</div>{completed && <div className="text-green-600 text-sm">Nice! Prediction close to experimental probability.</div>}<button onClick={reset} className="w-full btn-secondary">New Spinner</button></div>;
};

// Perimeter Calculator – rectangle with adaptive dimensions
const PerimeterCalculatorComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const { getSkill }=useMastery(); const skillId=(element as any).skillId||'PERIM_RECT'; const diff=computeDifficulty(getSkill(skillId));
  const pick=()=>{ const max= diff.variant==='challenge'? 30: diff.variant==='standard'? 20: 12; const w=Math.floor(Math.random()*max)+1; const h=Math.floor(Math.random()*max)+1; return {w,h}; };
  const [{w,h}, setDims]=useState(pick()); const [ans,setAns]=useState(''); const [completed,setCompleted]=useState(false); const correct=2*(w+h);
  const check=()=>{ const a=parseInt(ans); if(a===correct){ setCompleted(true); onComplete(true);} };
  return <div className="space-y-4"><h3 className="font-semibold">Perimeter of Rectangle</h3><p className="text-sm text-gray-600">Find P when width = {w} and height = {h}</p><div className="flex gap-2"><input value={ans} disabled={completed} onChange={e=>setAns(e.target.value)} placeholder="Perimeter" className="flex-1 border rounded px-3 py-2" onKeyDown={e=> e.key==='Enter' && check()} /><button disabled={completed||!ans} onClick={check} className="btn-primary px-4">Check</button></div>{completed && <div className="text-green-600 text-sm">Correct! P = {correct}</div>}<button onClick={()=>{ setDims(pick()); setAns(''); setCompleted(false); }} className="w-full btn-secondary">New Rectangle</button></div>;
};

// Decimal Place Chart – identify digit
const DecimalPlaceChartComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const pick=()=>{ const num=(Math.random()*900+100).toFixed(3); const places=['hundreds','tens','ones','tenths','hundredths','thousandths']; const place=places[Math.floor(Math.random()*places.length)]; return {num,place}; };
  const [{num,place}, setProb]=useState(pick()); const [ans,setAns]=useState(''); const [completed,setCompleted]=useState(false);
  const digits=num.replace('.',''); const mapIndex: Record<string, number>={ hundreds:0, tens:1, ones:2, tenths:3, hundredths:4, thousandths:5 }; const correct=digits[mapIndex[place]];
  const check=()=>{ if(ans===correct){ setCompleted(true); onComplete(true);} };
  return <div className="space-y-3"><h3 className="font-semibold">Decimal Place Value</h3><p className="text-sm text-gray-600">Number: <span className="font-mono">{num}</span>. Which digit is in the <span className="font-semibold">{place}</span> place?</p><div className="flex gap-2"><input value={ans} disabled={completed} onChange={e=>setAns(e.target.value.slice(0,1))} className="w-24 border rounded px-3 py-2 text-center" /><button onClick={check} disabled={completed||!ans} className="btn-primary px-4">Check</button></div>{completed && <div className="text-green-600 text-sm">Correct! {correct} is in the {place} place.</div>}<button onClick={()=>{ setProb(pick()); setAns(''); setCompleted(false); }} className="w-full btn-secondary">New Number</button></div>;
};

// Integer Calculator – evaluate addition/subtraction with negatives & parentheses
const IntegerCalculatorComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean) => void }) => {
  const { getSkill }=useMastery(); const skillId=(element as any).skillId||'INT_BASIC_ARITH'; const diff=computeDifficulty(getSkill(skillId));
  const pick=()=>{ const terms = diff.variant==='challenge'? 5 : diff.variant==='standard'? 4 : 3; const nums:number[]=[]; for(let i=0;i<terms;i++){ const range= diff.range; nums.push(Math.floor(Math.random()* (2*range+1))-range); } const ops=['+','-']; let expr=''; for(let i=0;i<nums.length;i++){ expr += (nums[i]>=0? `+${nums[i]}`: `${nums[i]}`); if(i<nums.length-1) expr+= ops[Math.floor(Math.random()*ops.length)]; }
    if(expr.startsWith('+')) expr=expr.slice(1); return expr.replace(/\+\-/g,'-').replace(/--/g,'+'); };
  const [expr,setExpr]=useState(pick()); const [ans,setAns]=useState(''); const [completed,setCompleted]=useState(false);
  const evaluate=(e:string)=>{ try { /* safe eval subset */ const total = e.split(/(?=[+-])/).reduce((sum,part)=> sum + parseInt(part),0); return total; } catch { return NaN;} };
  const correct=evaluate(expr);
  const check=()=>{ const a=parseInt(ans); if(a===correct){ setCompleted(true); onComplete(true);} };
  return <div className="space-y-4"><h3 className="font-semibold">Integer Calculation</h3><p className="text-sm text-gray-600 font-mono">{expr}</p><div className="flex gap-2"><input value={ans} disabled={completed} onChange={e=>setAns(e.target.value)} className="flex-1 border rounded px-3 py-2" placeholder="Result" onKeyDown={e=> e.key==='Enter' && check()} /><button onClick={check} disabled={completed||!ans} className="btn-primary px-4">Check</button></div>{completed && <div className="text-green-600 text-sm">Correct! = {correct}</div>}<button onClick={()=>{ setExpr(pick()); setAns(''); setCompleted(false); }} className="w-full btn-secondary">New Expression</button></div>;
};

// New implementations for missing curriculum components
const FactorDiscoveryComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean)=> void }) => {
  const [number, setNumber] = useState(30);
  const [found, setFound] = useState<number[]>([]);
  const [input, setInput] = useState('');
  const [completed, setCompleted] = useState(false);
  const factors = Array.from({length:number}, (_,i)=> i+1).filter(i=> number % i ===0);
  const add = () => { const v = parseInt(input); if(v && number % v===0 && !found.includes(v)){ const nf=[...found,v].sort((a,b)=>a-b); setFound(nf); if(nf.length===factors.length){ setCompleted(true); onComplete(true);} } setInput(''); };
  const reset=()=>{ const candidates=[18,24,28,30,32,36,40]; const n=candidates[Math.floor(Math.random()*candidates.length)]; setNumber(n); setFound([]); setInput(''); setCompleted(false); };
  return <div className="space-y-4"> <h3 className="font-semibold text-center">Factor Discovery</h3><p className="text-center text-sm text-gray-600">Find all factors of {number}</p><div className="flex justify-center gap-2"><input value={input} disabled={completed} onChange={e=>setInput(e.target.value)} type="number" className="w-28 border rounded px-2 py-1 text-center" onKeyDown={e=> e.key==='Enter' && add()} /><button onClick={add} disabled={!input || completed} className="btn-primary">Add</button></div><div className="flex flex-wrap gap-2 justify-center"> {factors.map(f=> <span key={f} className={`px-3 py-1 rounded border ${found.includes(f)? 'bg-green-500 text-white border-green-600':'bg-gray-100 text-gray-400 border-gray-300'}`}>{found.includes(f)? f : '?'}</span>)} </div>{completed && <div className="text-center text-green-600">All factors found!</div>}<button onClick={reset} className="w-full btn-secondary">New Number</button></div>;
};

const PrimeNumberHuntComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean)=> void }) => {
  const [grid,setGrid]=useState<number[]>([]);
  const [selected,setSelected]=useState<number[]>([]);
  const [completed,setCompleted]=useState(false);
  useEffect(()=>{ const nums=Array.from({length:25},(_,i)=> i+1 + Math.floor(Math.random()*40)); setGrid(nums); },[]);
  const isPrime=(n:number)=>{ if(n<2) return false; for(let i=2;i<=Math.sqrt(n);i++){ if(n%i===0) return false;} return true; };
  const toggle=(n:number)=>{ if(completed) return; setSelected(prev=> prev.includes(n)? prev.filter(x=>x!==n): [...prev,n]); };
  useEffect(()=>{ if(grid.length>0){ const primes= grid.filter(isPrime); if(primes.length>0 && primes.every(p=> selected.includes(p)) && selected.every(s=> isPrime(s))){ setCompleted(true); onComplete(true);} } },[selected,grid,onComplete]);
  const reset=()=>{ const nums=Array.from({length:25},(_,i)=> i+1 + Math.floor(Math.random()*40)); setGrid(nums); setSelected([]); setCompleted(false); };
  return <div className="space-y-4"> <h3 className="font-semibold text-center">Prime Number Hunt</h3><p className="text-center text-sm text-gray-600">Select all prime numbers.</p><div className="grid grid-cols-5 gap-2">{grid.map(n=>{ const sel=selected.includes(n); const prime=isPrime(n); const show= completed && prime; return <button key={n} onClick={()=>toggle(n)} className={`p-3 rounded text-sm font-semibold border-2 ${sel? (prime? 'bg-green-500 border-green-600 text-white':'bg-red-500 border-red-600 text-white'): 'bg-white border-gray-300 hover:border-blue-400'} ${completed && !prime && 'opacity-50'}`}>{show? n: n}</button>; })}</div>{completed && <div className="text-center text-green-600">Great! All primes identified.</div>}<button onClick={reset} className="w-full btn-secondary">New Grid</button></div>;
};

const PrimeCompositeClassifierComponent = ({ element, onComplete }: { element: InteractiveElement; onComplete: (correct: boolean)=> void }) => {
  const [numbers,setNumbers]=useState<number[]>([12,17,19,21,25,29]);
  const [primeBin,setPrimeBin]=useState<number[]>([]); const [compBin,setCompBin]=useState<number[]>([]);
  const [completed,setCompleted]=useState(false);
  const isPrime=(n:number)=>{ if(n<2) return false; for(let i=2;i<=Math.sqrt(n);i++){ if(n%i===0) return false;} return true; };
  const move=(n:number,bin:'prime'|'comp')=>{ if(completed) return; if(bin==='prime'){ if(!primeBin.includes(n)) setPrimeBin([...primeBin,n]); setCompBin(compBin.filter(x=>x!==n)); } else { if(!compBin.includes(n)) setCompBin([...compBin,n]); setPrimeBin(primeBin.filter(x=>x!==n)); } };
  useEffect(()=>{ if(numbers.every(n=> (isPrime(n) ? primeBin.includes(n) : compBin.includes(n))) && primeBin.concat(compBin).length===numbers.length){ setCompleted(true); onComplete(true);} },[primeBin,compBin,numbers,onComplete]);
  const reset=()=>{ const pool=[11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]; const pick= pool.sort(()=>Math.random()-0.5).slice(0,8); setNumbers(pick); setPrimeBin([]); setCompBin([]); setCompleted(false); };
  return <div className="space-y-4"> <h3 className="font-semibold text-center">Prime vs Composite</h3><p className="text-center text-sm text-gray-600">Classify each number.</p><div className="flex flex-wrap gap-2 justify-center">{numbers.map(n=> <div key={n} className="px-3 py-2 bg-white border-2 border-gray-300 rounded font-semibold">{n}<div className="mt-2 flex gap-1"><button onClick={()=>move(n,'prime')} className="px-2 py-1 text-xs rounded bg-blue-100 hover:bg-blue-200">Prime</button><button onClick={()=>move(n,'comp')} className="px-2 py-1 text-xs rounded bg-yellow-100 hover:bg-yellow-200">Composite</button></div></div>)}</div><div className="grid grid-cols-2 gap-4"> <div className="p-4 border-2 rounded border-blue-300"><h4 className="font-semibold mb-2">Prime</h4><div className="flex flex-wrap gap-2">{primeBin.map(n=> <span key={n} className="px-2 py-1 bg-blue-500 text-white rounded text-sm">{n}</span>)}</div></div> <div className="p-4 border-2 rounded border-yellow-300"><h4 className="font-semibold mb-2">Composite</h4><div className="flex flex-wrap gap-2">{compBin.map(n=> <span key={n} className="px-2 py-1 bg-yellow-500 text-white rounded text-sm">{n}</span>)}</div></div> </div>{completed && <div className="text-center text-green-600">All numbers correctly classified!</div>}<button onClick={reset} className="w-full btn-secondary">New Set</button></div>;
};
