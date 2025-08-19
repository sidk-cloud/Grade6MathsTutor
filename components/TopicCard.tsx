'use client';

import { Clock, Star, Lock, CheckCircle, PlayCircle } from 'lucide-react';
import { MathTopic, DIFFICULTY_LABELS, CATEGORY_COLORS } from '../lib/comprehensive-curriculum';

interface TopicCardProps {
  topic: MathTopic;
  isCompleted: boolean;
  isLocked: boolean;
  score?: number;
  onSelect: (topic: MathTopic) => void;
}

export default function TopicCard({ 
  topic, 
  isCompleted, 
  isLocked, 
  score, 
  onSelect 
}: TopicCardProps) {
  const difficultyColor = {
    1: 'text-green-600 bg-green-100',
    2: 'text-blue-600 bg-blue-100',
    3: 'text-yellow-600 bg-yellow-100',
    4: 'text-orange-600 bg-orange-100',
    5: 'text-red-600 bg-red-100'
  }[topic.difficulty];

  const handleClick = () => {
    if (!isLocked) {
      onSelect(topic);
    }
  };

  return (
    <div 
      className={`topic-card ${isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} ${
        isCompleted ? 'border-l-4 border-l-green-500' : ''
      }`}
      onClick={handleClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`w-3 h-3 rounded-full ${CATEGORY_COLORS[topic.category as keyof typeof CATEGORY_COLORS] || 'bg-gray-400'}`}></div>
            <span className="text-sm font-medium text-gray-500">{topic.category}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic.title}</h3>
        </div>
        
        <div className="ml-4">
          {isLocked ? (
            <Lock className="h-5 w-5 text-gray-400" />
          ) : isCompleted ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <PlayCircle className="h-5 w-5 text-blue-500" />
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{topic.description}</p>

      {/* Metadata */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{topic.estimatedTime}min</span>
          </div>
          
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColor}`}>
            {DIFFICULTY_LABELS[topic.difficulty as keyof typeof DIFFICULTY_LABELS] || `Level ${topic.difficulty}`}
          </div>
        </div>

        {isCompleted && score && (
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-yellow-600">{score}%</span>
          </div>
        )}
      </div>

      {/* Learning Outcomes */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">You'll learn to:</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          {topic.learningObjectives && topic.learningObjectives.slice(0, 3).map((objective, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-primary-500 mt-1">•</span>
              <span>{objective}</span>
            </li>
          ))}
          {topic.learningObjectives && topic.learningObjectives.length > 3 && (
            <li className="text-gray-400 italic">
              +{topic.learningObjectives.length - 3} more outcomes...
            </li>
          )}
        </ul>
      </div>

      {/* Prerequisites */}
      {topic.prerequisites && topic.prerequisites.length > 0 && (
        <div className="border-t pt-3">
          <div className="text-xs text-gray-500">
            <span className="font-medium">Prerequisites:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {topic.prerequisites.map((prereq, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                >
                  {prereq}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Action Hint */}
      {!isLocked && (
        <div className="border-t pt-3 mt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-primary-600 font-medium">
              {isCompleted ? 'Review Topic' : 'Start Learning'}
            </span>
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary-500"></div>
              <div className="w-2 h-2 rounded-full bg-primary-300"></div>
              <div className="w-2 h-2 rounded-full bg-primary-100"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
