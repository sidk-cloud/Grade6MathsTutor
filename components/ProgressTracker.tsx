'use client';

import { UserProgress } from '../lib/curriculum';

interface ProgressTrackerProps {
  userProgress: UserProgress;
  totalTopics: number;
}

export default function ProgressTracker({ userProgress, totalTopics }: ProgressTrackerProps) {
  const completionPercentage = (userProgress.completedTopics.length / totalTopics) * 100;
  
  return (
    <div className="relative w-20 h-20">
      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 32 32">
        <circle
          cx="16"
          cy="16"
          r="14"
          stroke="#e5e7eb"
          strokeWidth="2"
          fill="transparent"
        />
        <circle
          cx="16"
          cy="16"
          r="14"
          stroke="#3b82f6"
          strokeWidth="2"
          fill="transparent"
          strokeDasharray={`${completionPercentage * 0.88} 88`}
          className="transition-all duration-300"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold text-gray-700">
          {Math.round(completionPercentage)}%
        </span>
      </div>
    </div>
  );
}
