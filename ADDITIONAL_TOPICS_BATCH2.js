// Additional IXL Topics - Batch 2: More Fraction Operations and Decimal Operations
// This will be appended to the comprehensive curriculum

// AC9M6N05 - Add and subtract fractions with like denominators: word problems (6-J.3)
{
  id: 'add-subtract-like-denominators-word-problems',
  title: 'Add and Subtract Fractions with Like Denominators: Word Problems',
  description: 'Solve real-world problems involving addition and subtraction of fractions with same denominators',
  category: 'Number',
  difficulty: 3,
  estimatedTime: 30,
  ixlCode: '6-J.3',
  learningObjectives: [
    'Identify when to add or subtract fractions in word problems',
    'Solve word problems with like denominator fractions',
    'Interpret results in context',
    'Check reasonableness of answers'
  ],
  prerequisites: ['add-subtract-like-denominators'],
  concepts: [
    {
      id: 'like-denominator-word-problems',
      title: 'Word Problems with Like Denominators',
      explanation: 'Apply fraction operations to solve real-world problems',
      examples: [
        {
          id: 'pizza-sharing-problem',
          problem: 'Tom ate 2/8 of a pizza and Jerry ate 3/8. How much pizza did they eat altogether?',
          solution: '5/8 of the pizza',
          workingOut: [
            'Tom ate 2/8',
            'Jerry ate 3/8',
            'Total = 2/8 + 3/8',
            '= (2+3)/8 = 5/8 of the pizza'
          ]
        }
      ],
      visualAids: [
        {
          id: 'fraction-word-problem-solver',
          type: 'interactive',
          title: 'Fraction Word Problem Solver',
          description: 'Interactive solver for fraction word problems',
          component: 'FractionWordProblemSolver',
          data: { denominatorType: 'like' }
        }
      ],
      interactiveElements: [
        {
          id: 'word-problem-practice',
          type: 'input',
          title: 'Word Problem Practice',
          instructions: 'Read the problem and enter your answer as a fraction',
          component: 'FractionWordProblemPractice'
        }
      ]
    }
  ],
  assessments: [
    {
      id: 'like-denominator-word-problems-quiz',
      type: 'shortAnswer',
      question: 'Sarah walked 3/10 of a mile in the morning and 4/10 of a mile in the evening. How far did she walk in total?',
      correctAnswer: '7/10',
      explanation: '3/10 + 4/10 = 7/10 of a mile',
      hints: ['Add the two distances', 'Keep the same denominator'],
      difficulty: 3,
      points: 15
    }
  ],
  resources: [
    {
      id: 'fraction-word-problems-strategies',
      title: 'Fraction Word Problem Strategies',
      description: 'Effective approaches to fraction word problems',
      url: '/strategies/fraction-word-problems',
      type: 'article'
    }
  ],
  voiceScript: 'Word problems with fractions tell stories about parts being combined or separated! Look for key words like "altogether" for addition or "how much more" for subtraction!'
},

// Continue with more decimal operations...
// AC9M6N04 - Add decimal numbers (6-G.6)
{
  id: 'add-decimal-numbers',
  title: 'Add Decimal Numbers',
  description: 'Add decimal numbers with proper alignment of decimal points',
  category: 'Number',
  difficulty: 2,
  estimatedTime: 25,
  ixlCode: '6-G.6',
  learningObjectives: [
    'Add decimals by aligning decimal points',
    'Add decimals with different numbers of decimal places',
    'Understand place value in decimal addition',
    'Check addition results for reasonableness'
  ],
  prerequisites: ['decimal-operations'],
  concepts: [
    {
      id: 'decimal-addition-method',
      title: 'Adding Decimal Numbers',
      explanation: 'Line up decimal points vertically and add column by column',
      examples: [
        {
          id: 'decimal-addition-example',
          problem: 'Calculate 12.45 + 7.8',
          solution: '20.25',
          workingOut: [
            'Align decimal points:',
            '  12.45',
            '+  7.80',
            '-------',
            '  20.25'
          ]
        }
      ],
      visualAids: [
        {
          id: 'decimal-addition-tool',
          type: 'interactive',
          title: 'Decimal Addition Tool',
          description: 'Interactive tool for practicing decimal addition',
          component: 'DecimalAdditionTool',
          data: { showAlignment: true, maxDecimals: 3 }
        }
      ],
      interactiveElements: [
        {
          id: 'decimal-addition-practice',
          type: 'input',
          title: 'Decimal Addition Practice',
          instructions: 'Add the decimal numbers',
          component: 'DecimalAdditionPractice'
        }
      ]
    }
  ],
  assessments: [
    {
      id: 'decimal-addition-quiz',
      type: 'numerical',
      question: 'What is 15.67 + 8.4?',
      correctAnswer: 24.07,
      explanation: 'Align decimal points: 15.67 + 8.40 = 24.07',
      hints: ['Line up the decimal points', 'Add zeros if needed to make same number of decimal places'],
      difficulty: 2,
      points: 10
    }
  ],
  resources: [
    {
      id: 'decimal-addition-guide',
      title: 'Decimal Addition Step-by-Step Guide',
      description: 'Complete guide to adding decimal numbers',
      url: '/guides/decimal-addition',
      type: 'article'
    }
  ],
  voiceScript: 'Adding decimals is like adding money! Line up those decimal points like you would line up the dollars and cents columns!'
},

// AC9M6N04 - Subtract decimal numbers (6-G.7)
{
  id: 'subtract-decimal-numbers',
  title: 'Subtract Decimal Numbers',
  description: 'Subtract decimal numbers with proper alignment and regrouping',
  category: 'Number',
  difficulty: 2,
  estimatedTime: 25,
  ixlCode: '6-G.7',
  learningObjectives: [
    'Subtract decimals by aligning decimal points',
    'Use regrouping/borrowing with decimals',
    'Subtract decimals with different decimal places',
    'Apply subtraction to real-world contexts'
  ],
  prerequisites: ['add-decimal-numbers'],
  concepts: [
    {
      id: 'decimal-subtraction-method',
      title: 'Subtracting Decimal Numbers',
      explanation: 'Align decimal points and subtract column by column, regrouping when necessary',
      examples: [
        {
          id: 'decimal-subtraction-example',
          problem: 'Calculate 25.6 - 13.47',
          solution: '12.13',
          workingOut: [
            'Align decimal points:',
            '  25.60',
            '- 13.47',
            '-------',
            '  12.13'
          ]
        }
      ],
      visualAids: [
        {
          id: 'decimal-subtraction-tool',
          type: 'interactive',
          title: 'Decimal Subtraction Tool',
          description: 'Interactive tool for practicing decimal subtraction',
          component: 'DecimalSubtractionTool',
          data: { showRegrouping: true }
        }
      ],
      interactiveElements: [
        {
          id: 'decimal-subtraction-practice',
          type: 'input',
          title: 'Decimal Subtraction Practice',
          instructions: 'Subtract the decimal numbers',
          component: 'DecimalSubtractionPractice'
        }
      ]
    }
  ],
  assessments: [
    {
      id: 'decimal-subtraction-quiz',
      type: 'numerical',
      question: 'What is 30.5 - 12.68?',
      correctAnswer: 17.82,
      explanation: 'Align decimal points: 30.50 - 12.68 = 17.82',
      hints: ['Line up the decimal points', 'You may need to regroup/borrow'],
      difficulty: 2,
      points: 10
    }
  ],
  resources: [
    {
      id: 'decimal-subtraction-guide',
      title: 'Decimal Subtraction Methods',
      description: 'Master decimal subtraction with regrouping',
      url: '/guides/decimal-subtraction',
      type: 'article'
    }
  ],
  voiceScript: 'Subtracting decimals is like making change with money! Line up the decimal points and borrow when you need to!'
}

// This represents a portion of the remaining topics - the full implementation would continue with all ~70 remaining topics...
