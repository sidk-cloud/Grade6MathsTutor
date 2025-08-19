'use client';

import { Award, Target, TrendingUp, Calendar, Star } from 'lucide-react';
import { MathTopic, UserProgress } from '../lib/comprehensive-curriculum';

interface DashboardProps {
  userProgress: UserProgress;
  curriculum: MathTopic[];
  onTopicSelect: (topic: MathTopic) => void;
  onViewChange: (view: string) => void;
  getRecommendedTopics: () => MathTopic[];
}

export default function Dashboard({
  userProgress,
  curriculum,
  onTopicSelect,
  onViewChange,
  getRecommendedTopics
}: DashboardProps) {
  const completionPercentage = (userProgress.completedTopics.length / curriculum.length) * 100;
  const recommendedTopics = getRecommendedTopics();
  
  // Calculate statistics
  const totalTimeSpent = Object.values(userProgress.timeSpent).reduce((sum, time) => sum + time, 0);
  const averageScore = Object.values(userProgress.assessmentScores).length > 0
    ? Object.values(userProgress.assessmentScores).reduce((sum, score) => sum + score, 0) / Object.values(userProgress.assessmentScores).length
    : 0;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Your Math Journey! 🚀
        </h1>
        <p className="text-xl text-gray-600">
          Let's continue building your Grade 6 mathematics skills
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
            <Target className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Topics Completed</h3>
          <p className="text-3xl font-bold text-blue-600 mb-2">
            {userProgress.completedTopics.length}/{curriculum.length}
          </p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
            <Star className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Average Score</h3>
          <p className="text-3xl font-bold text-green-600 mb-2">
            {Math.round(averageScore)}%
          </p>
          <p className="text-sm text-gray-500">Based on completed assessments</p>
        </div>

        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
            <Award className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Level</h3>
          <p className="text-3xl font-bold text-purple-600 mb-2">
            {userProgress.level}
          </p>
          <p className="text-sm text-gray-500">Keep learning to level up!</p>
        </div>
      </div>

      {/* Recommended Topics */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Continue Learning</h2>
          <button 
            onClick={() => onViewChange('topics')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View all topics →
          </button>
        </div>

        {recommendedTopics.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedTopics.map((topic) => (
              <div 
                key={topic.id}
                className="card hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onTopicSelect(topic)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{topic.title}</h3>
                    <p className="text-sm text-gray-500">{topic.category}</p>
                  </div>
                  <div className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                    {topic.estimatedTime}min
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{topic.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary-600 font-medium">Start Learning</span>
                  <div className="flex space-x-1">
                    {[...Array(topic.difficulty)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <Award className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Congratulations! 🎉
            </h3>
            <p className="text-gray-600 mb-4">
              You've completed all available topics! You're a math superstar!
            </p>
            <button className="btn-primary">
              Review Previous Topics
            </button>
          </div>
        )}
      </div>

      {/* Achievements */}
      {userProgress.achievements.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Your Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {userProgress.achievements.map((achievement, index) => (
              <div key={index} className="card text-center py-4">
                <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-800">
                  {achievement === 'first-topic' && 'First Topic Complete!'}
                  {achievement === 'course-complete' && 'Course Master!'}
                  {achievement === 'perfect-score' && 'Perfect Score!'}
                  {achievement === 'streak-5' && '5-Day Streak!'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Study Time</span>
              <span className="font-medium">{Math.round(totalTimeSpent / 60)} hours</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Topics Mastered</span>
              <span className="font-medium">{userProgress.completedTopics.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Points</span>
              <span className="font-medium">{userProgress.totalScore}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm font-semibold">1</span>
              </div>
              <span className="text-gray-700">Choose your next topic</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm font-semibold">2</span>
              </div>
              <span className="text-gray-700">Watch the lesson</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-sm font-semibold">3</span>
              </div>
              <span className="text-gray-700">Complete the assessment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
