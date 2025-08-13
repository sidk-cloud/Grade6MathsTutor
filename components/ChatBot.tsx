'use client';

import { useState } from 'react';
import { X, Send, MessageCircle, Bot } from 'lucide-react';
import { MathTopic } from '../lib/curriculum';

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  currentTopic: MathTopic | null;
}

interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

export default function ChatBot({ isOpen, onClose, currentTopic }: ChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hi! I'm your math tutor assistant. Ask me anything about Grade 6 mathematics!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Simple response logic - in a real app, this would connect to an AI API
  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('fraction')) {
      return "Fractions represent parts of a whole! Think of a pizza - if you cut it into 4 equal pieces and eat 1 piece, you've eaten 1/4 of the pizza. The bottom number (denominator) tells us how many equal parts the whole is divided into, and the top number (numerator) tells us how many parts we have.";
    }
    
    if (message.includes('integer') || message.includes('negative')) {
      return "Integers include positive numbers, negative numbers, and zero! Negative numbers are really useful - they can represent temperatures below zero, money you owe, or floors below ground level. On a number line, negative numbers go to the left of zero.";
    }
    
    if (message.includes('prime')) {
      return "A prime number is a special number that can only be divided evenly by 1 and itself. For example, 7 is prime because you can only divide it evenly by 1 and 7. But 8 is not prime because you can divide it by 1, 2, 4, and 8.";
    }
    
    if (message.includes('pattern') || message.includes('sequence')) {
      return "Number patterns are like puzzles! Look for what's changing between each number. Are we adding the same amount each time? Multiplying? Once you find the rule, you can predict what comes next!";
    }
    
    if (message.includes('metric') || message.includes('convert')) {
      return "The metric system is based on 10s, which makes it easy to convert! Remember: 1 metre = 100 centimetres, 1 litre = 1000 millilitres, 1 kilogram = 1000 grams. To convert to a smaller unit, multiply. To convert to a larger unit, divide.";
    }
    
    if (message.includes('area') || message.includes('rectangle')) {
      return "The area of a rectangle is length × width. Think of it as counting how many unit squares fit inside the rectangle. If a rectangle is 5 units long and 3 units wide, its area is 5 × 3 = 15 square units.";
    }
    
    if (message.includes('help') || message.includes('stuck')) {
      return "Don't worry - everyone gets stuck sometimes! Try breaking the problem into smaller steps. Read the question carefully, identify what you know and what you need to find, then choose the right operation. Would you like me to help with a specific problem?";
    }
    
    // Default responses
    const defaultResponses = [
      "That's a great question! Let me help you understand that concept better.",
      "I can see you're thinking about this topic. Let's work through it together!",
      "Mathematics is all about practice and understanding. What specific part would you like me to explain?",
      "Good question! Can you tell me more about what you're finding challenging?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate API delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-2xl border flex flex-col z-50">
      {/* Header */}
      <div className="bg-accent-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <span className="font-semibold">Math Tutor Assistant</span>
        </div>
        <button onClick={onClose} className="hover:bg-accent-700 p-1 rounded">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                message.isBot
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-accent-600 text-white'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about math..."
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="bg-accent-600 text-white p-2 rounded-lg hover:bg-accent-700 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
