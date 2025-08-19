"use client";
import React, {createContext,useContext,useState,useCallback,useEffect} from 'react';

/** Skill mastery state per skillId.
 * level: 0-5 (emergent -> mastered)
 * accuracy: rolling percent last 20 attempts
 * avgLatencyMs: rolling average response time
 * nextReview: timestamp for spaced review
 * attempts: total attempts
 * streak: consecutive correct answers
 */
export interface SkillMastery {
  skillId: string;
  level: number;
  accuracy: number;
  avgLatencyMs: number;
  nextReview: number;
  attempts: number;
  streak: number;
  lastUpdated: number;
}

interface AttemptRecord { skillId:string; correct:boolean; latencyMs:number; timestamp:number; hintCount?:number; }

interface MasteryContextValue {
  skills: Record<string,SkillMastery>;
  recordAttempt: (skillId:string, correct:boolean, latencyMs:number, hintCount?:number)=>void;
  getSkill: (skillId:string)=>SkillMastery | undefined;
  getDueSkills: ()=>SkillMastery[];
  resetSkill: (skillId:string)=>void;
}

const MasteryContext = createContext<MasteryContextValue|undefined>(undefined);

const STORAGE_KEY = 'masteryStateV1';

function load(): Record<string,SkillMastery> {
  if(typeof window==='undefined') return {};
  try { const raw=localStorage.getItem(STORAGE_KEY); if(!raw) return {}; return JSON.parse(raw);} catch { return {}; }
}
function save(data:Record<string,SkillMastery>) {
  if(typeof window==='undefined') return; localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Simple spaced interval steps (in minutes) for levels 0..5
const REVIEW_STEPS_MIN = [5, 30, 12*60, 2*24*60, 5*24*60, 14*24*60];

const updateMastery = (prev:SkillMastery|undefined, attempt:AttemptRecord):SkillMastery => {
  const base:SkillMastery = prev || {skillId: attempt.skillId, level:0, accuracy:0, avgLatencyMs: attempt.latencyMs, nextReview: Date.now()+REVIEW_STEPS_MIN[0]*60*1000, attempts:0, streak:0, lastUpdated: Date.now()};
  const attempts = base.attempts + 1;
  // If hints used beyond first, down-weight credit for correctness
  const effectiveCorrect = attempt.correct ? (attempt.hintCount && attempt.hintCount>1 ? 0.5 : 1) : 0;
  const corrects = (base.accuracy * base.attempts)/100 + effectiveCorrect;
  const accuracy = (corrects / attempts)*100;
  const streak = attempt.correct && (!attempt.hintCount || attempt.hintCount<=1) ? base.streak + 1 : 0;
  // latency EWMA
  const avgLatencyMs = base.avgLatencyMs*0.7 + attempt.latencyMs*0.3;
  let level = base.level;
  if(accuracy > 85 && streak >=3 && level <5) level +=1;
  if(accuracy < 60 && level>0) level -=1; // decay if accuracy drops
  const nextReview = Date.now() + REVIEW_STEPS_MIN[level]*60*1000;
  return { ...base, accuracy, attempts, streak, avgLatencyMs, level, nextReview, lastUpdated: Date.now() };
};

export const MasteryProvider: React.FC<{children:React.ReactNode}> = ({children}) => {
  const [skills,setSkills]=useState<Record<string,SkillMastery>>({});
  const [dirty,setDirty]=useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage on client side only
  useEffect(() => {
    const loadedSkills = load();
    console.log('MasteryProvider: Loaded skills:', Object.keys(loadedSkills).length, 'skills');
    setSkills(loadedSkills);
    setIsInitialized(true);
  }, []);

  const recordAttempt = useCallback((skillId:string, correct:boolean, latencyMs:number, hintCount?:number)=>{
    setSkills(s=>{ const updated = {...s, [skillId]: updateMastery(s[skillId], {skillId, correct, latencyMs, hintCount, timestamp: Date.now()})}; return updated; });
    setDirty(true);
  },[]);
  const getSkill = useCallback((skillId:string)=> skills[skillId], [skills]);
  const getDueSkills = useCallback(()=> Object.values(skills).filter(sk=> sk.nextReview <= Date.now()), [skills]);
  const resetSkill = useCallback((skillId:string)=> setSkills(s=> { const c={...s}; delete c[skillId]; return c; }),[]);

  useEffect(()=>{ if(!dirty) return; const id=setTimeout(()=>{ save(skills); setDirty(false); }, 400); return ()=> clearTimeout(id); },[skills,dirty]);

  // Don't render children until initialized to prevent hydration mismatches
  if (!isInitialized) {
    return <div>Loading mastery data...</div>;
  }

  return <MasteryContext.Provider value={{skills,recordAttempt,getSkill,getDueSkills,resetSkill}}>{children}</MasteryContext.Provider>;
};

export function useMastery(){ const ctx=useContext(MasteryContext); if(!ctx) throw new Error('useMastery must be inside MasteryProvider'); return ctx; }

// Function to populate sample data for testing (call this from browser console)
export function populateSampleData() {
  if (typeof window === 'undefined') return;
  
  const sampleSkills: Record<string, SkillMastery> = {
    'addition-basic': {
      skillId: 'addition-basic',
      level: 3,
      accuracy: 85,
      avgLatencyMs: 2500,
      nextReview: Date.now() - 60000, // Due for review
      attempts: 12,
      streak: 5,
      lastUpdated: Date.now() - 86400000
    },
    'subtraction-basic': {
      skillId: 'subtraction-basic', 
      level: 2,
      accuracy: 70,
      avgLatencyMs: 3200,
      nextReview: Date.now() + 1800000, // 30 minutes from now
      attempts: 8,
      streak: 2,
      lastUpdated: Date.now() - 43200000
    },
    'multiplication-tables': {
      skillId: 'multiplication-tables',
      level: 4,
      accuracy: 92,
      avgLatencyMs: 1800,
      nextReview: Date.now() - 3600000, // Due for review
      attempts: 25,
      streak: 12,
      lastUpdated: Date.now() - 7200000
    },
    'fractions-intro': {
      skillId: 'fractions-intro',
      level: 1,
      accuracy: 60,
      avgLatencyMs: 4500,
      nextReview: Date.now() + 300000, // 5 minutes from now
      attempts: 4,
      streak: 1,
      lastUpdated: Date.now() - 1800000
    }
  };
  
  localStorage.setItem('masteryStateV1', JSON.stringify(sampleSkills));
  console.log('Sample mastery data populated! Refresh the page to see changes.');
  return sampleSkills;
}

// Helper to compute dynamic difficulty parameters from skill state
export function computeDifficulty(skill:SkillMastery | undefined){
  if(!skill) return { variant: 'baseline', range: 10 };
  if(skill.level <2) return { variant: 'scaffolded', range: 8 };
  if(skill.level <4) return { variant: 'standard', range: 12 };
  return { variant: 'challenge', range: 15 };
}

// Weekly plan generator (simple): pick due skills then fill with low-attempt skills
export function generateWeeklyPlan(skills:Record<string,SkillMastery>): string[] {
  const all = Object.values(skills);
  const due = all.filter(s=> s.nextReview <= Date.now());
  const lowCoverage = all.filter(s=> s.attempts < 5);
  const merged = Array.from(new Set([...due.map(s=>s.skillId), ...lowCoverage.map(s=>s.skillId)]));
  return merged.slice(0, 25); // cap for the week
}

export function deriveBadges(skills:Record<string,SkillMastery>): string[] {
  const list: string[] = [];
  const arr = Object.values(skills);
  if(arr.some(s=> s.level>=1)) list.push('first-steps');
  if(arr.filter(s=> s.level>=2).length >= 5) list.push('foundation-five');
  if(arr.filter(s=> s.level>=3).length >= 10) list.push('intermediate-ten');
  if(arr.every(s=> s.level>=2) && arr.length>0) list.push('all-solid');
  if(arr.filter(s=> s.level>=5).length >= 3) list.push('triple-master');
  return list;
}
