'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle, Star, RotateCcw } from 'lucide-react';
import { Assessment } from '../lib/comprehensive-curriculum';

interface AssessmentComponentProps {
  assessments: Assessment[];
  onComplete: (score: number) => void;
  topicTitle: string;
}

interface UserAnswer {
  assessmentId: string;
  answer: string | number;
  isCorrect: boolean;
}

export default function AssessmentComponent({ assessments, onComplete, topicTitle }: AssessmentComponentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentAssessment = assessments[currentIndex];
  const isLastQuestion = currentIndex === assessments.length - 1;
  const totalScore = userAnswers.reduce((sum, answer) => sum + (answer.isCorrect ? currentAssessment?.points || 10 : 0), 0);
  const maxScore = assessments.reduce((sum, assessment) => sum + assessment.points, 0);
  const scorePercentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  const handleAnswer = (selectedAnswer: string | number) => {
    if (!currentAssessment) return;
    
    const isCorrect = String(selectedAnswer).toLowerCase() === String(currentAssessment.correctAnswer).toLowerCase();
    
    const newAnswer: UserAnswer = {
      assessmentId: currentAssessment.id,
      answer: selectedAnswer,
      isCorrect
    };

    const updatedAnswers = [...userAnswers.filter(a => a.assessmentId !== currentAssessment.id), newAnswer];
    setUserAnswers(updatedAnswers);
    setShowExplanation(true);
    
    // Auto-advance after showing explanation
    setTimeout(() => {
      if (isLastQuestion) {
        setShowResults(true);
        onComplete(scorePercentage);
      } else {
        setCurrentIndex(currentIndex + 1);
        setInputValue('');
        setShowHint(false);
        setShowExplanation(false);
      }
    }, 2500);
  };

  const resetAssessment = () => {
    setCurrentIndex(0);
    setUserAnswers([]);
    setShowResults(false);
    setInputValue('');
    setShowHint(false);
    setShowExplanation(false);
  };

  const getCurrentAnswer = () => {
    return userAnswers.find(a => a.assessmentId === currentAssessment?.id);
  };

  if (!currentAssessment && !showResults) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-600">No assessments available for this topic.</p>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <Star className="h-8 w-8 text-primary-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Assessment Complete!</h3>
          <p className="text-gray-600">Here's how you did on {topicTitle}</p>
        </div>

        {/* Score Display */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-600">{scorePercentage}%</p>
            <p className="text-sm text-blue-800">Overall Score</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-3xl font-bold text-green-600">
              {userAnswers.filter(a => a.isCorrect).length}
            </p>
            <p className="text-sm text-green-800">Correct Answers</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-3xl font-bold text-purple-600">{totalScore}</p>
            <p className="text-sm text-purple-800">Points Earned</p>
          </div>
        </div>

        {/* Performance Feedback */}
        <div className="mb-6 p-4 rounded-lg text-center">
          {scorePercentage >= 90 ? (
            <div className="bg-green-50 border border-green-200">
              <p className="text-green-800 font-semibold">Excellent work! 🌟</p>
              <p className="text-green-700">You've mastered this topic!</p>
            </div>
          ) : scorePercentage >= 70 ? (
            <div className="bg-blue-50 border border-blue-200">
              <p className="text-blue-800 font-semibold">Good job! 👍</p>
              <p className="text-blue-700">You're getting the hang of it!</p>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200">
              <p className="text-yellow-800 font-semibold">Keep practicing! 📚</p>
              <p className="text-yellow-700">Review the material and try again.</p>
            </div>
          )}
        </div>

        {/* Question Review */}
        <div className="space-y-4 mb-6">
          <h4 className="font-semibold text-gray-800">Question Review:</h4>
          {assessments.map((assessment, index) => {
            const userAnswer = userAnswers.find(a => a.assessmentId === assessment.id);
            return (
              <div key={assessment.id} className={`p-4 rounded-lg border-l-4 ${
                userAnswer?.isCorrect ? 'border-l-green-500 bg-green-50' : 'border-l-red-500 bg-red-50'
              }`}>
                <div className="flex items-start space-x-3">
                  {userAnswer?.isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">Question {index + 1}</p>
                    <p className="text-sm text-gray-600 mb-2">{assessment.question}</p>
                    <div className="text-sm">
                      <p className="mb-1">
                        <span className="font-medium">Your answer:</span> {userAnswer?.answer}
                      </p>
                      <p className="mb-1">
                        <span className="font-medium">Correct answer:</span> {assessment.correctAnswer}
                      </p>
                      <p className="text-gray-600">{assessment.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={resetAssessment}
            className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <RotateCcw className="h-5 w-5" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  const currentAnswer = getCurrentAnswer();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Assessment</h3>
          <p className="text-sm text-gray-500">
            Question {currentIndex + 1} of {assessments.length}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Points: {currentAssessment.points}</p>
          <div className="flex space-x-1 mt-1">
            {[...Array(currentAssessment.difficulty)].map((_, i) => (
              <Star key={i} className="h-3 w-3 text-yellow-500 fill-current" />
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar mb-6">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentIndex + 1) / assessments.length) * 100}%` }}
        ></div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-800 mb-4">
          {currentAssessment.question}
        </h4>

        {/* Answer Options */}
        {currentAssessment.type === 'multipleChoice' && currentAssessment.options && (
          <div className="space-y-3">
            {currentAssessment.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={!!currentAnswer}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  currentAnswer?.answer === option
                    ? currentAnswer.isCorrect
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                } ${currentAnswer ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {currentAnswer?.answer === option && (
                    currentAnswer.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Short Answer Input */}
        {currentAssessment.type === 'shortAnswer' && (
          <div className="space-y-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={!!currentAnswer}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
              placeholder="Type your answer here..."
            />
            {!currentAnswer && (
              <button
                onClick={() => handleAnswer(inputValue)}
                disabled={!inputValue.trim()}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
              >
                Submit Answer
              </button>
            )}
          </div>
        )}
      </div>

      {/* Hint Button */}
      {!showExplanation && currentAssessment.hints && currentAssessment.hints.length > 0 && (
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-4"
        >
          <HelpCircle className="h-5 w-5" />
          <span>Need a hint?</span>
        </button>
      )}

      {/* Hint Display */}
      {showHint && currentAssessment.hints && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
          <p className="text-sm text-yellow-800">
            <strong>Hint:</strong> {currentAssessment.hints[0]}
          </p>
        </div>
      )}

      {/* Explanation */}
      {showExplanation && currentAnswer && (
        <div className={`p-4 rounded-lg mb-4 ${
          currentAnswer.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-start space-x-3">
            {currentAnswer.isCorrect ? (
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
            )}
            <div>
              <p className={`font-medium ${
                currentAnswer.isCorrect ? 'text-green-800' : 'text-red-800'
              }`}>
                {currentAnswer.isCorrect ? 'Correct!' : 'Not quite right.'}
              </p>
              <p className={`text-sm mt-1 ${
                currentAnswer.isCorrect ? 'text-green-700' : 'text-red-700'
              }`}>
                {currentAssessment.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
