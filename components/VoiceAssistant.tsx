'use client';

import { useState, useEffect } from 'react';
import { MathTopic } from '../lib/curriculum';

interface VoiceAssistantProps {
  currentTopic: MathTopic | null;
  onSpeak: (text: string) => void;
}

export default function VoiceAssistant({ currentTopic, onSpeak }: VoiceAssistantProps) {
  const [isSupported, setIsSupported] = useState(false);
  
  useEffect(() => {
    setIsSupported('speechSynthesis' in window);
  }, []);

  useEffect(() => {
    if (currentTopic && isSupported) {
      // Auto-speak the topic introduction when a new topic is selected
      const welcomeText = `Welcome to ${currentTopic.title}. ${currentTopic.voiceScript}`;
      onSpeak(welcomeText);
    }
  }, [currentTopic, isSupported, onSpeak]);

  if (!isSupported) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-secondary-600 text-white p-3 rounded-lg shadow-lg max-w-xs">
      <div className="flex items-center space-x-2">
        <div className="animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
        <span className="text-sm">Voice guidance active</span>
      </div>
    </div>
  );
}
