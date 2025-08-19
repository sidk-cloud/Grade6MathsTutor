"use client";
import React, { useEffect, useState } from 'react';
import { useMastery, generateWeeklyPlan, deriveBadges } from '../context/MasteryContext';
import { GRADE_6_CURRICULUM } from '../lib/comprehensive-curriculum';

// Function to get user-friendly names for skill IDs
const getSkillDisplayName = (skillId: string): string => {
  // Look through all topics and their interactive elements to find the matching skillId
  for (const topic of GRADE_6_CURRICULUM) {
    for (const concept of topic.concepts || []) {
      for (const element of concept.interactiveElements || []) {
        if (element.id === skillId) {
          return element.title || skillId;
        }
      }
    }
  }
  
  // If not found in interactive elements, provide a more readable fallback
  return skillId
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .trim();
};

interface AdaptiveProgressDashboardProps { onSelectSkill?: (skillId:string)=>void; }

export const AdaptiveProgressDashboard: React.FC<AdaptiveProgressDashboardProps> = ({onSelectSkill}) => {
  const { skills, getDueSkills } = useMastery();
  const [isClient, setIsClient] = useState(false);

  // Ensure this only renders on client side to prevent hydration mismatches
  useEffect(() => {
    setIsClient(true);
    console.log('AdaptiveProgressDashboard: Client initialized, skills count:', Object.keys(skills).length);
  }, []);

  // Debug skills data
  useEffect(() => {
    console.log('AdaptiveProgressDashboard: Skills updated:', Object.keys(skills).length, 'skills');
    if (Object.keys(skills).length > 0) {
      console.log('Sample skill:', Object.values(skills)[0]);
    }
  }, [skills]);

  if (!isClient) {
    return (
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">Skill Mastery Heat Map</h2>
          <p className="text-sm text-gray-500">Loading mastery data...</p>
          <div className="grid grid-cols-6 gap-2 h-10"></div>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Badges & Streaks</h2>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-xs text-gray-500">Loading badges...</span>
          </div>
          <p className="text-xs text-gray-600">Longest active streak: <span className="font-semibold text-gray-800">0</span></p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Due for Review (0)</h2>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-gray-500">Loading due items...</span>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Weekly Plan</h2>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li className="list-none text-gray-500">Loading plan...</li>
          </ol>
        </section>
      </div>
    );
  }

  const skillList = Object.values(skills).sort((a,b)=> a.skillId.localeCompare(b.skillId));
  const due = getDueSkills();
  const weekly = generateWeeklyPlan(skills);
  const badges = deriveBadges(skills);
  const longestStreak = skillList.reduce((m,s)=> Math.max(m,s.streak), 0);

  // Show helpful message if no data exists
  if (skillList.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Start Your Learning Journey!</h3>
          <p className="text-blue-700 mb-3">
            Your progress dashboard will show up here once you start practicing. Try some lessons or use the AI ChatBot to begin!
          </p>
          <p className="text-sm text-blue-600">
            <strong>For testing:</strong> Open browser console and run <code className="bg-blue-100 px-1 rounded">populateSampleData()</code> to see sample progress data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold mb-2">Skill Mastery Heat Map</h2>
        {skillList.length===0 && <p className="text-sm text-gray-500">No skill data yet. Start practicing to build mastery.</p>}
        <div className="grid grid-cols-6 gap-2">
          {skillList.map(s=>{
            const color = s.level>=5? 'bg-green-700': s.level>=4? 'bg-green-600': s.level>=3? 'bg-green-500': s.level>=2? 'bg-yellow-400': s.level>=1? 'bg-orange-400':'bg-red-400';
            const displayName = getSkillDisplayName(s.skillId);
            return (
              <button 
                key={s.skillId} 
                onClick={()=>onSelectSkill?.(s.skillId)} 
                title={`${displayName}\nLevel ${s.level}\nAccuracy ${s.accuracy.toFixed(0)}%\nStreak ${s.streak}`} 
                className={`h-10 rounded flex items-center justify-center text-[10px] font-medium text-white ${color} hover:opacity-80 transition-opacity`}
              >
                {s.skillId.replace(/[^A-Z0-9]/gi,'').slice(-4)}
              </button>
            );
          })}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Badges & Streaks</h2>
        <div className="flex flex-wrap gap-2 mb-2">
          {badges.map(b=> <span key={b} className="px-2 py-1 text-xs rounded bg-amber-100 text-amber-800 border border-amber-300">{b}</span>)}
          {badges.length===0 && <span className="text-xs text-gray-500">Earn badges by building mastery.</span>}
        </div>
        <p className="text-xs text-gray-600">Longest active streak: <span className="font-semibold text-gray-800">{longestStreak}</span></p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Due for Review ({due.length})</h2>
        <div className="flex flex-wrap gap-2">
          {due.map(s=> (
            <button 
              key={s.skillId} 
              onClick={() => onSelectSkill?.(s.skillId)}
              className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-700 border border-purple-300 hover:bg-purple-200 hover:border-purple-400 transition-colors cursor-pointer"
              title={`Click to practice ${getSkillDisplayName(s.skillId)} (Level ${s.level})`}
            >
              {getSkillDisplayName(s.skillId)} L{s.level}
            </button>
          ))}
          {due.length===0 && <span className="text-xs text-gray-500">Nothing due right now.</span>}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Weekly Plan</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          {weekly.map(id=> (
            <li key={id} className="hover:text-blue-600 cursor-pointer" onClick={() => onSelectSkill?.(id)}>
              {getSkillDisplayName(id)}
            </li>
          ))}
          {weekly.length===0 && <li className="list-none text-gray-500">Plan will appear after a few attempts.</li>}
        </ol>
      </section>
    </div>
  );
};
export default AdaptiveProgressDashboard;
