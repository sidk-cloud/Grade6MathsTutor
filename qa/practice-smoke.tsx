// Lightweight QA smoke harness (manual run via ts-node / next page import)
import React from 'react';
import InteractivePractice from '../components/InteractivePractice';
import { InteractiveElement } from '../lib/curriculum';

const sampleElements: InteractiveElement[] = [
  { id: 'qa-factor', type: 'input', title: 'QA Factor', instructions: 'Find all factors', component: 'FactorDiscovery' },
  { id: 'qa-prime-hunt', type: 'clickable', title: 'QA Prime Hunt', instructions: 'Select primes', component: 'PrimeNumberHunt' },
  { id: 'qa-classifier', type: 'dragDrop', title: 'QA Prime Composite', instructions: 'Classify numbers', component: 'PrimeCompositeClassifier' }
];

export default function PracticeSmoke() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Practice Smoke Test</h1>
      <InteractivePractice elements={sampleElements} onComplete={()=>{}} />
    </div>
  );
}
