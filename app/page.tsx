'use client';

import { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Play, 
  Trophy, 
  MessageCircle, 
  Volume2, 
  Settings, 
  BarChart3,
  Clock,
  Star,
  ChevronRight,
  Target,
  Award,
  Users
} from 'lucide-react';
import { GRADE_6_CURRICULUM, CATEGORY_COLORS, CATEGORY_DESCRIPTIONS, MathTopic, UserProgress } from '../lib/comprehensive-curriculum';
import TopicCard from '../components/TopicCard';
import ProgressTracker from '../components/ProgressTracker';
import VoiceAssistant from '../components/VoiceAssistant';
import ChatBot from '../components/ChatBot';
import Dashboard from '../components/Dashboard';
import LessonViewer from '../components/LessonViewer';
import { MasteryProvider, useMastery } from '../context/MasteryContext';
import AdaptiveProgressDashboard from '../components/AdaptiveProgressDashboard';

export default function Home() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'topics' | 'topic' | 'assessment'>('dashboard');
  const [selectedTopic, setSelectedTopic] = useState<MathTopic | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    userId: 'demo-user',
    completedTopics: [],
    currentTopic: '',
    assessmentScores: {},
    timeSpent: {},
    lastActive: new Date(),
    totalScore: 0,
    level: 1,
    achievements: []
  });
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('mathTutorProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (progress: UserProgress) => {
    setUserProgress(progress);
    localStorage.setItem('mathTutorProgress', JSON.stringify(progress));
  };

  // Calculate completion percentage
  const completionPercentage = GRADE_6_CURRICULUM ? (userProgress.completedTopics.length / GRADE_6_CURRICULUM.length) * 100 : 0;

  const handleTopicSelect = (topic: MathTopic) => {
    setSelectedTopic(topic);
    setCurrentView('topic');
    
    // Update current topic in progress
    const updatedProgress = {
      ...userProgress,
      currentTopic: topic.id,
      lastActive: new Date()
    };
    saveProgress(updatedProgress);
  };

  const markTopicComplete = (topicId: string, score: number = 100) => {
    const updatedProgress = {
      ...userProgress,
      completedTopics: [...userProgress.completedTopics.filter(id => id !== topicId), topicId],
      assessmentScores: { ...userProgress.assessmentScores, [topicId]: score },
      totalScore: userProgress.totalScore + score,
      level: Math.floor((userProgress.completedTopics.length + 1) / 3) + 1
    };
    
    // Check for achievements
    if (updatedProgress.completedTopics.length === 1) {
      updatedProgress.achievements.push('first-topic');
    }
    if (updatedProgress.completedTopics.length === GRADE_6_CURRICULUM.length) {
      updatedProgress.achievements.push('course-complete');
    }
    
    saveProgress(updatedProgress);
  };

  const handleSkillSelect = (skillId: string) => {
    setSelectedSkillId(selectedSkillId === skillId ? null : skillId);
    
    // Find topics that match this skill ID
    const matchingTopics = GRADE_6_CURRICULUM.filter(topic => 
      topic.concepts?.some(concept => 
        concept.interactiveElements?.some(element => 
          (element as any).skillId === skillId
        )
      )
    );

    // If we find matching topics, offer to navigate to the first one
    if (matchingTopics.length > 0) {
      const shouldNavigate = window.confirm(
        `Found ${matchingTopics.length} topic(s) for skill "${skillId}". Navigate to "${matchingTopics[0].title}"?`
      );
      if (shouldNavigate) {
        handleTopicSelect(matchingTopics[0]);
      }
    }
  };

  const getRecommendedTopics = () => {
    return GRADE_6_CURRICULUM.filter(topic => {
      // Show topics that haven't been completed and have prerequisites met
      if (userProgress.completedTopics.includes(topic.id)) return false;
      
      return topic.prerequisites.every(prereq => 
        userProgress.completedTopics.includes(prereq)
      );
    }).slice(0, 3); // Show top 3 recommendations
  };

  const renderDashboard = () => (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <Dashboard 
          userProgress={userProgress}
          curriculum={GRADE_6_CURRICULUM}
          onTopicSelect={handleTopicSelect}
          onViewChange={(view) => setCurrentView(view as 'dashboard' | 'topics' | 'topic' | 'assessment')}
          getRecommendedTopics={getRecommendedTopics}
        />
      </div>
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <AdaptiveProgressDashboard onSelectSkill={handleSkillSelect} />
        </div>
        
        {selectedSkillId && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Selected Skill: {selectedSkillId}</h3>
            <p className="text-blue-700 text-sm mb-3">
              This skill tracks your performance on {selectedSkillId.replace(/_/g, ' ').toLowerCase()} activities.
            </p>
            <button
              onClick={() => setSelectedSkillId(null)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ✕ Close
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderTopicGrid = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Grade 6 Mathematics Journey
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Master Australian Grade 6 maths concepts through interactive lessons and assessments
        </p>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-700">Overall Progress</span>
            <span className="text-2xl font-bold text-primary-600">{Math.round(completionPercentage)}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>{userProgress.completedTopics.length} topics completed</span>
            <span>{GRADE_6_CURRICULUM.length - userProgress.completedTopics.length} remaining</span>
          </div>
        </div>
      </div>

      {/* Category Sections */}
      {GRADE_6_CURRICULUM && Array.isArray(GRADE_6_CURRICULUM) ? 
        Object.entries(
          GRADE_6_CURRICULUM.reduce((acc, topic) => {
            if (!acc[topic.category]) acc[topic.category] = [];
            acc[topic.category].push(topic);
            return acc;
          }, {} as Record<string, MathTopic[]>)
        ).map(([category, topics]) => (
        <div key={category} className="space-y-4">
          <div className="flex items-center space-x-3 mb-6">
            <div className={`w-4 h-4 rounded-full ${CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS]}`}></div>
            <h2 className="text-2xl font-bold text-gray-800">{category}</h2>
          </div>
          <p className="text-gray-600 mb-6">{CATEGORY_DESCRIPTIONS[category as keyof typeof CATEGORY_DESCRIPTIONS]}</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                isCompleted={userProgress.completedTopics.includes(topic.id)}
                isLocked={!topic.prerequisites.every(prereq => 
                  userProgress.completedTopics.includes(prereq)
                )}
                score={userProgress.assessmentScores[topic.id]}
                onSelect={handleTopicSelect}
              />
            ))}
          </div>
        </div>
      )) : (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading curriculum...</p>
        </div>
      )}
    </div>
  );

  return (
  <MasteryProvider>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-600 p-2 rounded-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Grade 6 Maths Tutor</h1>
                <p className="text-sm text-gray-500">Interactive Learning Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Progress Indicator */}
              <div className="hidden sm:flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium">Level {userProgress.level}</span>
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-500 transition-all duration-300"
                    style={{ width: `${(completionPercentage % 33.33) * 3}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Voice Toggle */}
              <button
                onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                className={`p-2 rounded-lg transition-colors ${
                  isVoiceEnabled 
                    ? 'bg-secondary-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={isVoiceEnabled ? 'Turn off voice guidance' : 'Turn on voice guidance'}
              >
                <Volume2 className="h-5 w-5" />
              </button>
              
              {/* Chat Toggle */}
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  isChatOpen 
                    ? 'bg-accent-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title="Ask questions to AI tutor"
              >
                <MessageCircle className="h-5 w-5" />
              </button>
              
              {/* Settings */}
              <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-3">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'dashboard' 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
            
            <button
              onClick={() => setCurrentView('topics')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'topics' 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Target className="h-4 w-4" />
              <span>All Topics</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'topics' && renderTopicGrid()}
        {currentView === 'topic' && selectedTopic && (
          <LessonViewer
            topic={selectedTopic}
            voiceEnabled={isVoiceEnabled}
            onComplete={(score: number) => {
              const newProgress = {
                ...userProgress,
                completedTopics: [...userProgress.completedTopics, selectedTopic.id],
                assessmentScores: {
                  ...userProgress.assessmentScores,
                  [selectedTopic.id]: score
                },
                totalScore: userProgress.totalScore + score
              };
              setUserProgress(newProgress);
              localStorage.setItem('mathTutorProgress', JSON.stringify(newProgress));
              setCurrentView('dashboard');
            }}
            onBack={() => setCurrentView('topics')}
          />
        )}
      </main>

      {/* Voice Assistant */}
      {isVoiceEnabled && (
        <VoiceAssistant 
          currentTopic={selectedTopic}
          onSpeak={(text) => {
            if ('speechSynthesis' in window) {
              const utterance = new SpeechSynthesisUtterance(text);
              speechSynthesis.speak(utterance);
            }
          }}
        />
      )}

      {/* Chat Bot */}
      {isChatOpen && (
        <ChatBot 
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          currentTopic={selectedTopic}
        />
      )}
    </div>
  </MasteryProvider>
  );
}
