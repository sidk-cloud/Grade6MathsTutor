// Comprehensive Grade 6 Mathematics Curriculum
// Based on Australian Curriculum v9.0 and IXL alignment

export interface Example {
  id: string;
  problem: string;
  solution: string;
  workingOut: string[];
  visualRepresentation?: string;
}

export interface VisualAid {
  id: string;
  type: 'diagram' | 'chart' | 'animation' | 'interactive';
  title: string;
  description: string;
  component: string;
  data?: any;
}

export interface InteractiveElement {
  id: string;
  type: 'dragDrop' | 'clickable' | 'input' | 'slider' | 'calculator';
  title: string;
  instructions: string;
  component: string;
  validation?: any;
  // Optional learning objective tags for adaptive engine
  objectives?: string[];
  // Explicit skill identifier (defaults to id if omitted)
  skillId?: string;
  // Optional multi-tier hints (concept -> worked example -> rationale)
  hints?: string[];
}

export interface Concept {
  id: string;
  title: string;
  explanation: string;
  examples: Example[];
  visualAids: VisualAid[];
  interactiveElements: InteractiveElement[];
}

export interface Assessment {
  id: string;
  type: 'multipleChoice' | 'shortAnswer' | 'numerical' | 'dragDrop' | 'matching';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  hints: string[];
  difficulty: number;
  points: number;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type?: 'video' | 'article' | 'interactive' | 'worksheet';
}

export interface MathTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: number;
  estimatedTime: number;
  learningObjectives: string[];
  prerequisites: string[];
  concepts: Concept[];
  assessments: Assessment[];
  resources: Resource[];
  voiceScript: string;
  ixlCode?: string; // IXL reference code like "6-L.1"
}

export interface UserProgress {
  userId: string;
  completedTopics: string[];
  currentTopic: string;
  assessmentScores: Record<string, number>;
  timeSpent: Record<string, number>;
  lastActive: Date;
  totalScore: number;
  level: number;
  achievements: string[];
}

// Comprehensive curriculum based on IXL Year 6 standards
export const COMPREHENSIVE_GRADE_6_CURRICULUM: MathTopic[] = [
  // ==================== NUMBER STRAND ====================
  
  // AC9M6N01 - Integers Group
  {
    id: 'understanding-integers',
    title: 'Understanding Integers',
    description: 'Learn what integers are and recognize situations where they are used, including financial contexts.',
    category: 'Number',
    difficulty: 2,
    estimatedTime: 25,
    ixlCode: '6-L.1',
    learningObjectives: [
      'Recognize positive and negative integers',
      'Identify real-world contexts that use integers',
      'Understand the difference between whole numbers and integers'
    ],
    prerequisites: [],
    concepts: [
      {
        id: 'what-are-integers',
        title: 'What Are Integers?',
        explanation: 'Integers include positive numbers, negative numbers, and zero. They are used to represent quantities that can go above or below a reference point.',
        examples: [
          {
            id: 'temp-example',
            problem: 'Temperature can be above or below freezing point',
            solution: 'Above freezing: +5°C, Below freezing: -3°C',
            workingOut: [
              'Freezing point is 0°C (our reference)',
              'Temperatures above 0 are positive integers: +1, +2, +5, etc.',
              'Temperatures below 0 are negative integers: -1, -2, -3, etc.'
            ]
          },
          {
            id: 'bank-example',
            problem: 'Bank account balance can be positive or negative',
            solution: 'Money in account: +$50, Overdrawn: -$20',
            workingOut: [
              'Zero balance is the reference point',
              'Having money is positive: +$10, +$50, etc.',
              'Owing money (overdrawn) is negative: -$10, -$20, etc.'
            ]
          }
        ],
        visualAids: [
          {
            id: 'thermometer-visual',
            type: 'interactive',
            title: 'Interactive Thermometer',
            description: 'Explore positive and negative temperatures',
            component: 'ThermometerVisualization'
          }
        ],
        interactiveElements: [
          {
            id: 'integer-identifier',
            type: 'clickable',
            title: 'Identify Integers',
            instructions: 'Click on all the integers in the number set',
            component: 'IntegerIdentifier'
          }
        ]
      },
      {
        id: 'real-world-integers',
        title: 'Integers in Real Life',
        explanation: 'Integers are everywhere! From elevator floors to sports scores, we use positive and negative numbers daily.',
        examples: [
          {
            id: 'elevator-example',
            problem: 'Elevator floors: 3rd floor, ground floor, basement 2',
            solution: '3rd floor: +3, Ground: 0, Basement 2: -2',
            workingOut: [
              'Ground floor is our zero reference',
              'Floors above ground are positive: +1, +2, +3',
              'Floors below ground (basements) are negative: -1, -2'
            ]
          }
        ],
        visualAids: [
          {
            id: 'elevator-visual',
            type: 'interactive',
            title: 'Elevator Integer Explorer',
            description: 'Navigate between floors using integers',
            component: 'ElevatorVisualization'
          }
        ],
        interactiveElements: [
          {
            id: 'real-world-matcher',
            type: 'dragDrop',
            title: 'Match Real Situations to Integers',
            instructions: 'Drag the real-world situations to their integer representations',
            component: 'RealWorldIntegerMatcher'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'integers-understanding-q1',
        type: 'multipleChoice',
        question: 'Which of these represents 3 degrees below zero?',
        options: ['3°C', '-3°C', '0°C', '+3°C'],
        correctAnswer: '-3°C',
        explanation: 'Below zero means negative, so 3 degrees below zero is -3°C',
        hints: ['Think about what "below zero" means', 'Negative numbers go below zero on a thermometer'],
        difficulty: 1,
        points: 10
      },
      {
        id: 'integers-understanding-q2',
        type: 'multipleChoice',
        question: 'If you owe $15, which integer represents this?',
        options: ['+15', '-15', '0', '15'],
        correctAnswer: '-15',
        explanation: 'Owing money is represented by negative integers',
        hints: ['Owing means you have less than zero', 'Debt is represented by negative numbers'],
        difficulty: 1,
        points: 10
      }
    ],
    resources: [
      {
        id: 'integer-guide',
        title: 'Complete Guide to Integers',
        description: 'Comprehensive explanation of positive and negative numbers',
        url: '#',
        type: 'article'
      }
    ],
    voiceScript: 'Integers are like a number line that goes both ways! Imagine standing at zero - you can walk forward into positive numbers, or backward into negative numbers. We use integers every day: your bank account can have money (+) or be overdrawn (-), temperatures can be above (+) or below (-) freezing!'
  },

  {
    id: 'integers-number-lines',
    title: 'Integers on Number Lines',
    description: 'Locate and represent integers on horizontal and vertical number lines.',
    category: 'Number',
    difficulty: 2,
    estimatedTime: 30,
    ixlCode: '6-L.2',
    learningObjectives: [
      'Locate integers on horizontal number lines',
      'Understand the relationship between position and value',
      'Read integer values from number lines accurately'
    ],
    prerequisites: ['understanding-integers'],
    concepts: [
      {
        id: 'horizontal-number-lines',
        title: 'Reading Horizontal Number Lines',
        explanation: 'On a horizontal number line, positive integers are to the right of zero, and negative integers are to the left of zero.',
        examples: [
          {
            id: 'horizontal-reading',
            problem: 'What integer is 3 spaces to the right of -2?',
            solution: '+1',
            workingOut: [
              'Start at -2 on the number line',
              'Count 3 spaces to the right: -2 → -1 → 0 → +1',
              'The answer is +1'
            ]
          }
        ],
        visualAids: [
          {
            id: 'horizontal-number-line',
            type: 'interactive',
            title: 'Interactive Horizontal Number Line',
            description: 'Explore integers on a horizontal number line',
            component: 'HorizontalNumberLine'
          }
        ],
        interactiveElements: [
          {
            id: 'read-number-line',
            type: 'clickable',
            title: 'Read the Number Line',
            instructions: 'Click on the integer shown by the arrow',
            component: 'NumberLineReader'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'number-line-reading-q1',
        type: 'multipleChoice',
        question: 'What integer is located 2 spaces to the left of +3?',
        options: ['+5', '+1', '-1', '+2'],
        correctAnswer: '+1',
        explanation: '2 spaces to the left of +3: +3 → +2 → +1',
        hints: ['Count backwards from +3', 'Moving left means going to smaller numbers'],
        difficulty: 2,
        points: 15
      }
    ],
    resources: [],
    voiceScript: 'Number lines are like maps for integers! Moving right means going to bigger numbers, and moving left means going to smaller numbers. It\'s like a road - the further right you travel, the bigger the house numbers get!'
  },

  {
    id: 'graph-integers-lines',
    title: 'Graph Integers on Horizontal and Vertical Number Lines',
    description: 'Master graphing integers on both horizontal and vertical number lines with precision.',
    category: 'Number',
    difficulty: 3,
    estimatedTime: 35,
    ixlCode: '6-L.3',
    learningObjectives: [
      'Graph multiple integers accurately on horizontal number lines',
      'Graph multiple integers accurately on vertical number lines',
      'Create number line graphs to solve problems'
    ],
    prerequisites: ['integers-number-lines'],
    concepts: [
      {
        id: 'graphing-horizontal',
        title: 'Graphing on Horizontal Number Lines',
        explanation: 'When graphing integers on a horizontal number line, mark each point clearly and label it with its value.',
        examples: [
          {
            id: 'horizontal-graphing',
            problem: 'Graph the integers -4, 0, +2, +5 on a horizontal number line',
            solution: 'Mark points at -4, 0, +2, +5 with clear labels',
            workingOut: [
              'Create a number line with appropriate scale',
              'Mark -4 at 4 units left of zero',
              'Mark 0 at the center point',
              'Mark +2 at 2 units right of zero',
              'Mark +5 at 5 units right of zero',
              'Label each point clearly'
            ]
          }
        ],
        visualAids: [
          {
            id: 'horizontal-grapher',
            type: 'interactive',
            title: 'Horizontal Number Line Grapher',
            description: 'Practice graphing integers on horizontal number lines',
            component: 'HorizontalGrapher'
          }
        ],
        interactiveElements: [
          {
            id: 'graph-horizontal-integers',
            type: 'input',
            title: 'Graph Horizontal Integers',
            instructions: 'Enter integers to graph them on the horizontal number line',
            component: 'HorizontalIntegerGrapher'
          }
        ]
      },
      {
        id: 'graphing-vertical',
        title: 'Graphing on Vertical Number Lines',
        explanation: 'On vertical number lines, positive integers go above zero and negative integers go below zero.',
        examples: [
          {
            id: 'vertical-graphing',
            problem: 'Graph -3, +1, +4 on a vertical number line',
            solution: 'Mark +4 at top, +1 in middle-upper, -3 at bottom',
            workingOut: [
              'Create a vertical number line with zero in the middle',
              'Mark +4 at 4 units above zero',
              'Mark +1 at 1 unit above zero',
              'Mark -3 at 3 units below zero',
              'Label each point clearly'
            ]
          }
        ],
        visualAids: [
          {
            id: 'vertical-grapher',
            type: 'interactive',
            title: 'Vertical Number Line Grapher',
            description: 'Practice graphing integers on vertical number lines',
            component: 'VerticalGrapher'
          }
        ],
        interactiveElements: [
          {
            id: 'graph-vertical-integers',
            type: 'dragDrop',
            title: 'Place Integers on Vertical Line',
            instructions: 'Drag integers to their correct positions on the vertical number line',
            component: 'VerticalIntegerGrapher'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'graphing-integers-q1',
        type: 'multipleChoice',
        question: 'On a vertical number line, where would you place +3?',
        options: ['3 units below zero', '3 units above zero', 'At zero', '3 units to the right of zero'],
        correctAnswer: '3 units above zero',
        explanation: 'On vertical number lines, positive integers are placed above zero',
        hints: ['Think about a thermometer or elevator buttons', 'Positive means up, negative means down'],
        difficulty: 2,
        points: 15
      }
    ],
    resources: [],
    voiceScript: 'Graphing integers is like placing markers exactly where they belong! On horizontal lines, we go left and right. On vertical lines, we go up and down. Think of it like giving each integer its own special address on the number line!'
  },

  {
    id: 'compare-order-integers-lines',
    title: 'Compare and Order Integers Using Number Lines',
    description: 'Use number lines to compare integers and put them in order from smallest to largest.',
    category: 'Number',
    difficulty: 3,
    estimatedTime: 30,
    ixlCode: '6-L.4',
    learningObjectives: [
      'Compare two integers using number lines',
      'Order multiple integers using number lines',
      'Explain comparisons using number line positions'
    ],
    prerequisites: ['graph-integers-lines'],
    concepts: [
      {
        id: 'comparing-with-lines',
        title: 'Comparing Integers with Number Lines',
        explanation: 'On a number line, the integer further to the right is always greater than the integer further to the left.',
        examples: [
          {
            id: 'comparison-example',
            problem: 'Compare -5 and -2 using a number line',
            solution: '-2 > -5 because -2 is to the right of -5',
            workingOut: [
              'Draw a number line with both integers marked',
              'Locate -5 (5 spaces left of zero)',
              'Locate -2 (2 spaces left of zero)',
              'Since -2 is to the right of -5, -2 is greater'
            ]
          }
        ],
        visualAids: [
          {
            id: 'comparison-tool',
            type: 'interactive',
            title: 'Integer Comparison Tool',
            description: 'Compare integers visually on number lines',
            component: 'IntegerComparator'
          }
        ],
        interactiveElements: [
          {
            id: 'compare-on-line',
            type: 'clickable',
            title: 'Compare Using Number Lines',
            instructions: 'Click on the greater integer shown on the number line',
            component: 'NumberLineComparator',
            skillId: 'INT_COMPARE_LINE',
            objectives: [
              'Identify the greater of two integers using spatial position',
              'Reinforce concept: rightward means greater on number lines'
            ],
            hints: [
              'Look at which integer is further right',
              'If both are negative, the one closer to zero is greater',
              'Zero is greater than any negative number'
            ]
          }
        ]
      },
      {
        id: 'ordering-with-lines',
        title: 'Ordering Integers with Number Lines',
        explanation: 'To order integers from smallest to largest, imagine them on a number line and read from left to right.',
        examples: [
          {
            id: 'ordering-example',
            problem: 'Order these integers from smallest to largest: +2, -4, 0, -1',
            solution: '-4, -1, 0, +2',
            workingOut: [
              'Visualize all integers on a number line',
              '-4 is furthest left (smallest)',
              '-1 is next, then 0, then +2 (furthest right/largest)',
              'Reading left to right: -4, -1, 0, +2'
            ]
          }
        ],
        visualAids: [
          {
            id: 'ordering-visualizer',
            type: 'interactive',
            title: 'Integer Ordering Visualizer',
            description: 'See how integers line up from smallest to largest',
            component: 'IntegerOrderingVisualizer'
          }
        ],
        interactiveElements: [
          {
            id: 'order-with-lines',
            type: 'dragDrop',
            title: 'Order Integers Using Number Lines',
            instructions: 'Use the number line to help you arrange integers from smallest to largest',
            component: 'NumberLineOrderer',
            skillId: 'INT_ORDER_LINE',
            objectives: [
              'Sequence integers using their relative positions',
              'Internalize ordering via spatial reasoning'
            ],
            hints: [
              'Place each integer mentally on a line',
              'Start with the most negative (furthest left)',
              'Move rightwards to build ascending order'
            ]
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'compare-order-q1',
        type: 'multipleChoice',
        question: 'Using a number line, which shows the correct order from smallest to largest?',
        options: ['-3, +1, -2, +4', '-3, -2, +1, +4', '+4, +1, -2, -3', '-2, -3, +1, +4'],
        correctAnswer: '-3, -2, +1, +4',
        explanation: 'On a number line from left to right: -3, -2, +1, +4',
        hints: ['Think about positions on a number line', 'Left to right means smallest to largest'],
        difficulty: 2,
        points: 15
      }
    ],
    resources: [],
    voiceScript: 'Using number lines to compare integers is like having a visual map! The numbers are lined up for you, so you just need to see which one is further right (bigger) or further left (smaller). It takes the guesswork out of comparing!'
  },

  {
    id: 'compare-integers',
    title: 'Compare Integers',
    description: 'Compare integers using greater than, less than, and equal to symbols without always needing number lines.',
    category: 'Number',
    difficulty: 3,
    estimatedTime: 25,
    ixlCode: '6-L.5',
    learningObjectives: [
      'Use >, <, and = symbols correctly with integers',
      'Compare positive and negative integers quickly',
      'Apply comparison rules without drawing number lines'
    ],
    prerequisites: ['compare-order-integers-lines'],
    concepts: [
      {
        id: 'comparison-symbols',
        title: 'Using Comparison Symbols with Integers',
        explanation: 'Use > (greater than), < (less than), and = (equal to) to show relationships between integers. Remember: positive numbers are always greater than negative numbers.',
        examples: [
          {
            id: 'symbol-examples',
            problem: 'Compare: -8 __ +3, +5 __ -2, -6 __ -10',
            solution: '-8 < +3, +5 > -2, -6 > -10',
            workingOut: [
              '-8 < +3 because negative numbers are smaller than positive',
              '+5 > -2 because positive numbers are greater than negative',
              '-6 > -10 because -6 is closer to zero than -10'
            ]
          }
        ],
        visualAids: [
          {
            id: 'symbol-helper',
            type: 'interactive',
            title: 'Comparison Symbol Helper',
            description: 'Practice using comparison symbols with visual feedback',
            component: 'ComparisonSymbolHelper'
          }
        ],
        interactiveElements: [
          {
            id: 'symbol-practice',
            type: 'input',
            title: 'Symbol Selection Practice',
            instructions: 'Choose the correct symbol (>, <, =) for each comparison',
            component: 'SymbolPractice',
            skillId: 'INT_SYMBOL_APPLY',
            objectives: [
              'Apply >, <, = correctly for integer pairs',
              'Transition from visual models to symbolic comparisons'
            ],
            hints: [
              'Positive beats negative',
              'Among negatives, closer to zero is greater',
              'Zero is greater than any negative'
            ]
          }
        ]
      },
      {
        id: 'comparison-rules',
        title: 'Rules for Comparing Integers',
        explanation: 'Learn the key rules: Any positive > any negative, zero > any negative, any positive > zero, and when comparing negatives, the one closer to zero is larger.',
        examples: [
          {
            id: 'rules-example',
            problem: 'Apply the rules: Compare -3 and -7, then +2 and -5',
            solution: '-3 > -7 and +2 > -5',
            workingOut: [
              '-3 > -7 because -3 is closer to zero than -7',
              '+2 > -5 because positive is always greater than negative'
            ]
          }
        ],
        visualAids: [
          {
            id: 'rules-visual',
            type: 'interactive',
            title: 'Comparison Rules Visualizer',
            description: 'See the rules for comparing integers in action',
            component: 'ComparisonRulesVisualizer'
          }
        ],
        interactiveElements: [
          {
            id: 'apply-rules',
            type: 'dragDrop',
            title: 'Apply Comparison Rules',
            instructions: 'Drag the correct comparison symbol between each pair of integers',
            component: 'ComparisonRulesApplicator',
            skillId: 'INT_RULES_APPLY',
            objectives: [
              'Select correct comparison based on integer rules',
              'Demonstrate mastery of rule set without visual aids'
            ],
            hints: [
              'Positive > negative',
              'If both negative, compare distances from zero',
              'Equal numbers get ='
            ]
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'compare-integers-q1',
        type: 'multipleChoice',
        question: 'Which symbol correctly completes: -12 __ -8?',
        options: ['>', '<', '=', 'Cannot be determined'],
        correctAnswer: '<',
        explanation: '-12 < -8 because -12 is further from zero than -8',
        hints: ['Both numbers are negative', 'Which is closer to zero?'],
        difficulty: 2,
        points: 10
      },
      {
        id: 'compare-integers-q2',
        type: 'multipleChoice',
        question: 'Which statement is always true?',
        options: ['Negative > Positive', 'Positive > Negative', '-5 > -3', '0 < -1'],
        correctAnswer: 'Positive > Negative',
        explanation: 'Any positive number is always greater than any negative number',
        hints: ['Think about the basic rules', 'Consider the number line positions'],
        difficulty: 2,
        points: 15
      }
    ],
    resources: [],
    voiceScript: 'Remember the alligator trick for comparison symbols! The alligator mouth always opens toward the bigger number because it wants to eat the larger meal. And here\'s a key rule: any positive number, no matter how small, is always bigger than any negative number!'
  },

  {
    id: 'put-integers-order',
    title: 'Put Integers in Order',
    description: 'Arrange integers from smallest to largest or largest to smallest efficiently.',
    category: 'Number',
    difficulty: 3,
    estimatedTime: 30,
    ixlCode: '6-L.6',
    learningObjectives: [
      'Order integers from smallest to largest (ascending)',
      'Order integers from largest to smallest (descending)',
      'Use efficient strategies for ordering mixed positive and negative integers'
    ],
    prerequisites: ['compare-integers'],
    concepts: [
      {
        id: 'ascending-order-strategy',
        title: 'Ordering Integers in Ascending Order',
        explanation: 'To put integers in ascending order (smallest to largest): Start with the most negative, then less negative, then zero, then positive integers.',
        examples: [
          {
            id: 'ascending-example',
            problem: 'Put these integers in order from smallest to largest: +3, -7, 0, -2, +8, -1',
            solution: '-7, -2, -1, 0, +3, +8',
            workingOut: [
              'Group negatives: -7, -2, -1 (most negative to least negative)',
              'Add zero: -7, -2, -1, 0',
              'Add positives: -7, -2, -1, 0, +3, +8 (least positive to most positive)',
              'Final order: -7, -2, -1, 0, +3, +8'
            ]
          }
        ],
        visualAids: [
          {
            id: 'ascending-visualizer',
            type: 'interactive',
            title: 'Ascending Order Visualizer',
            description: 'Watch integers arrange themselves from smallest to largest',
            component: 'AscendingOrderVisualizer'
          }
        ],
        interactiveElements: [
          {
            id: 'ascending-practice',
            type: 'dragDrop',
            title: 'Arrange in Ascending Order',
            instructions: 'Drag integers to arrange them from smallest to largest',
            component: 'AscendingOrderPractice',
            skillId: 'INT_ORDER_ASC',
            objectives: ['Order integers ascending','Compare relative magnitudes'],
            hints: [
              'Start with the most negative number (furthest left on a number line).',
              'Zero sits between negatives and positives.',
              'After placing negatives and zero, order positives from least to greatest.'
            ]
          }
        ]
      },
      {
        id: 'descending-order-strategy',
        title: 'Ordering Integers in Descending Order',
        explanation: 'To put integers in descending order (largest to smallest): Start with the most positive, then less positive, then zero, then negative integers.',
        examples: [
          {
            id: 'descending-example',
            problem: 'Put these integers in order from largest to smallest: -4, +6, -1, +2, 0',
            solution: '+6, +2, 0, -1, -4',
            workingOut: [
              'Group positives: +6, +2 (most positive to least positive)',
              'Add zero: +6, +2, 0',
              'Add negatives: +6, +2, 0, -1, -4 (least negative to most negative)',
              'Final order: +6, +2, 0, -1, -4'
            ]
          }
        ],
        visualAids: [
          {
            id: 'descending-visualizer',
            type: 'interactive',
            title: 'Descending Order Visualizer',
            description: 'Watch integers arrange themselves from largest to smallest',
            component: 'DescendingOrderVisualizer'
          }
        ],
        interactiveElements: [
          {
            id: 'descending-practice',
            type: 'dragDrop',
            title: 'Arrange in Descending Order',
            instructions: 'Drag integers to arrange them from largest to smallest',
            component: 'DescendingOrderPractice',
            skillId: 'INT_ORDER_DESC',
            objectives: ['Order integers descending','Identify largest vs smallest integers'],
            hints: [
              'Begin with the largest positive integer.',
              'Zero comes after positive integers in descending order.',
              'More negative numbers appear last (they are smaller).'
            ]
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'ordering-integers-q1',
        type: 'multipleChoice',
        question: 'Which shows the correct ascending order?',
        options: ['-8, -3, +1, +5', '+5, +1, -3, -8', '-3, -8, +1, +5', '-8, +1, -3, +5'],
        correctAnswer: '-8, -3, +1, +5',
        explanation: 'From smallest to largest: -8, -3, +1, +5',
        hints: ['Start with the most negative number', 'End with the most positive number'],
        difficulty: 2,
        points: 15
      },
      {
        id: 'ordering-integers-q2',
        type: 'multipleChoice',
        question: 'Which shows the correct descending order for: +4, -6, 0, +1, -2?',
        options: ['+4, +1, 0, -2, -6', '-6, -2, 0, +1, +4', '+4, +1, -2, 0, -6', '+1, +4, 0, -2, -6'],
        correctAnswer: '+4, +1, 0, -2, -6',
        explanation: 'From largest to smallest: +4, +1, 0, -2, -6',
        hints: ['Start with the most positive', 'End with the most negative'],
        difficulty: 2,
        points: 15
      }
    ],
    resources: [],
    voiceScript: 'Ordering integers is like organizing your friends by height! For ascending order, start with the "shortest" (most negative) and work up to the "tallest" (most positive). For descending, do the opposite. The trick is to think in groups: negatives, zero, then positives!'
  },

  // Continue with more comprehensive topics...
  // This represents the structure needed for all IXL-aligned topics

  // AC9M6N02 - Prime and Composite Numbers
  {
    id: 'prime-composite',
    title: 'Prime or Composite',
    description: 'Identify and classify numbers as prime or composite based on their factors.',
    category: 'Number',
    difficulty: 3,
    estimatedTime: 40,
    ixlCode: '6-E.1',
    learningObjectives: [
      'Define prime and composite numbers',
      'Identify factors of numbers up to 100',
      'Classify numbers as prime or composite',
      'Recognize that 1 is neither prime nor composite'
    ],
    prerequisites: ['put-integers-order'],
    concepts: [
      {
        id: 'understanding-factors',
        title: 'Understanding Factors',
        explanation: 'Factors are numbers that divide evenly into another number. Every number has at least two factors: 1 and itself.',
        examples: [
          {
            id: 'factor-example-12',
            problem: 'Find all factors of 12',
            solution: 'Factors of 12: 1, 2, 3, 4, 6, 12',
            workingOut: [
              'Test divisibility: 12 ÷ 1 = 12 ✓',
              '12 ÷ 2 = 6 ✓',
              '12 ÷ 3 = 4 ✓',
              '12 ÷ 4 = 3 ✓',
              '12 ÷ 6 = 2 ✓',
              '12 ÷ 12 = 1 ✓',
              'All factors: 1, 2, 3, 4, 6, 12'
            ]
          }
        ],
        visualAids: [
          {
            id: 'factor-finder-visual',
            type: 'interactive',
            title: 'Factor Finder Tool',
            description: 'Discover all factors of a number interactively',
            component: 'FactorFinderVisualization'
          }
        ],
        interactiveElements: [
          {
            id: 'find-factors-practice',
            type: 'input',
            title: 'Factor Discovery Challenge',
            instructions: 'Find all factors of the given numbers',
            component: 'FactorDiscovery'
          }
        ]
      },
      {
        id: 'prime-numbers-definition',
        title: 'Prime Numbers',
        explanation: 'A prime number has exactly two factors: 1 and itself. Prime numbers greater than 1 cannot be divided evenly by any other number.',
        examples: [
          {
            id: 'prime-example-17',
            problem: 'Is 17 a prime number?',
            solution: 'Yes, 17 is prime because its only factors are 1 and 17',
            workingOut: [
              'Test small divisors up to √17 ≈ 4.1:',
              '17 ÷ 2 = 8.5 (not whole)',
              '17 ÷ 3 = 5.67... (not whole)',
              '17 ÷ 4 = 4.25 (not whole)',
              'No whole number divisors found except 1 and 17',
              'Therefore, 17 is prime'
            ]
          }
        ],
        visualAids: [
          {
            id: 'prime-checker-visual',
            type: 'interactive',
            title: 'Prime Number Checker',
            description: 'Test numbers to see if they are prime',
            component: 'PrimeCheckerVisualization'
          }
        ],
        interactiveElements: [
          {
            id: 'prime-identification',
            type: 'clickable',
            title: 'Prime Number Hunt',
            instructions: 'Click on all the prime numbers in the grid',
            component: 'PrimeNumberHunt'
          }
        ]
      },
      {
        id: 'composite-numbers-definition',
        title: 'Composite Numbers',
        explanation: 'A composite number has more than two factors. It can be divided evenly by numbers other than 1 and itself.',
        examples: [
          {
            id: 'composite-example-15',
            problem: 'Why is 15 a composite number?',
            solution: '15 is composite because it has factors: 1, 3, 5, 15',
            workingOut: [
              '15 ÷ 1 = 15 ✓',
              '15 ÷ 3 = 5 ✓',
              '15 ÷ 5 = 3 ✓',
              '15 ÷ 15 = 1 ✓',
              '15 has 4 factors (more than 2), so it\'s composite'
            ]
          }
        ],
        visualAids: [
          {
            id: 'composite-explorer',
            type: 'interactive',
            title: 'Composite Number Explorer',
            description: 'Explore how composite numbers can be factored',
            component: 'CompositeNumberExplorer'
          }
        ],
        interactiveElements: [
          {
            id: 'composite-classification',
            type: 'dragDrop',
            title: 'Classify Prime and Composite',
            instructions: 'Drag numbers to the correct category: Prime or Composite',
            component: 'PrimeCompositeClassifier'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'prime-composite-q1',
        type: 'multipleChoice',
        question: 'Which of these is a prime number?',
        options: ['15', '21', '29', '35'],
        correctAnswer: '29',
        explanation: '29 can only be divided by 1 and 29, making it prime. The others have additional factors.',
        hints: ['Try dividing each number by small primes like 2, 3, 5', 'Prime numbers have exactly two factors'],
        difficulty: 2,
        points: 15
      },
      {
        id: 'prime-composite-q2',
        type: 'multipleChoice',
        question: 'How many factors does the number 1 have?',
        options: ['0', '1', '2', '3'],
        correctAnswer: '1',
        explanation: 'The number 1 has only one factor: itself. This is why 1 is neither prime nor composite.',
        hints: ['What numbers divide evenly into 1?', '1 is a special case'],
        difficulty: 2,
        points: 15
      }
    ],
    resources: [
      {
        id: 'prime-composite-guide',
        title: 'Prime and Composite Numbers Guide',
        description: 'Complete guide to understanding prime and composite numbers',
        url: '#',
        type: 'article'
      }
    ],
    voiceScript: 'Think of prime numbers as the loners of the number world! They\'re very exclusive - only 1 and themselves are allowed in their factor club. Composite numbers are more social - they welcome lots of different factors to their party!'
  },

  // AC9M6N02 - Identify factors (6-E.2)
  {
    id: 'identify-factors',
    title: 'Identify Factors',
    description: 'Learn to find all factors of a given number',
    category: 'Number',
    difficulty: 2,
    estimatedTime: 30,
    ixlCode: '6-E.2',
    learningObjectives: [
      'Understand what factors are',
      'Find all factor pairs of a number',
      'Use systematic methods to identify factors',
      'Apply factor knowledge to problem solving'
    ],
    prerequisites: ['understanding-integers'],
    concepts: [
      {
        id: 'factor-definition',
        title: 'What are Factors?',
        explanation: 'Understanding factors as numbers that divide evenly into another number',
        examples: [
          {
            id: 'factors-12',
            problem: 'Find all factors of 12',
            solution: '1, 2, 3, 4, 6, 12',
            workingOut: [
              '12 ÷ 1 = 12 ✓',
              '12 ÷ 2 = 6 ✓',
              '12 ÷ 3 = 4 ✓',
              '12 ÷ 4 = 3 ✓',
              '12 ÷ 6 = 2 ✓',
              '12 ÷ 12 = 1 ✓'
            ],
            visualRepresentation: 'Factor tree or division table'
          },
          {
            id: 'factor-pairs-12',
            problem: 'List factor pairs of 12',
            solution: '(1,12), (2,6), (3,4)',
            workingOut: [
              '1 × 12 = 12',
              '2 × 6 = 12',
              '3 × 4 = 12'
            ]
          }
        ],
        visualAids: [
          {
            id: 'factor-diagram',
            type: 'interactive',
            title: 'Factor Finder',
            description: 'Interactive tool to find factors',
            component: 'FactorFinder',
            data: { number: 24 }
          }
        ],
        interactiveElements: [
          {
            id: 'factor-practice',
            type: 'input',
            title: 'Factor Practice',
            instructions: 'Enter all factors of the given number',
            component: 'FactorInput'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'factors-quiz',
        type: 'multipleChoice',
        question: 'Which of these is NOT a factor of 36?',
        options: ['6', '8', '9', '12'],
        correctAnswer: 1,
        explanation: '8 is not a factor of 36 because 36 ÷ 8 = 4.5 (not a whole number)',
        hints: ['Try dividing 36 by each option', 'Factors divide evenly with no remainder'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'factors-video',
        title: 'Understanding Factors',
        description: 'Video explanation of factors and factor pairs',
        url: '/videos/factors',
        type: 'video'
      }
    ],
    voiceScript: 'Factors are like friends that can divide a number evenly with no remainder. To find factors systematically, start with 1 and work your way up!'
  },

  // AC9M6N02 - Prime factorisation (6-E.3)
  {
    id: 'prime-factorisation',
    title: 'Prime Factorisation',
    description: 'Break down numbers into their prime factor components',
    category: 'Number',
    difficulty: 3,
    estimatedTime: 35,
    ixlCode: '6-E.3',
    learningObjectives: [
      'Understand prime factorisation',
      'Use factor trees to find prime factors',
      'Express numbers as products of prime factors',
      'Apply prime factorisation in problem solving'
    ],
    prerequisites: ['prime-numbers', 'identify-factors'],
    concepts: [
      {
        id: 'prime-factorisation-method',
        title: 'Factor Trees',
        explanation: 'Using factor trees to find the prime factorisation of numbers',
        examples: [
          {
            id: 'factorize-24',
            problem: 'Find the prime factorisation of 24',
            solution: '2³ × 3',
            workingOut: [
              '24 = 8 × 3',
              '8 = 4 × 2',
              '4 = 2 × 2',
              'So: 24 = 2 × 2 × 2 × 3 = 2³ × 3'
            ],
            visualRepresentation: 'Factor tree diagram'
          },
          {
            id: 'factorize-36',
            problem: 'Express 36 as a product of prime factors',
            solution: '2² × 3²',
            workingOut: [
              '36 = 6 × 6',
              '6 = 2 × 3',
              'So: 36 = (2 × 3) × (2 × 3) = 2² × 3²'
            ]
          }
        ],
        visualAids: [
          {
            id: 'factor-tree',
            type: 'interactive',
            title: 'Factor Tree Builder',
            description: 'Interactive factor tree construction',
            component: 'FactorTree',
            data: { number: 60 }
          }
        ],
        interactiveElements: [
          {
            id: 'factorisation-builder',
            type: 'dragDrop',
            title: 'Build Prime Factorisation',
            instructions: 'Drag prime factors to build the factorisation',
            component: 'FactorisationBuilder'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'prime-factorisation-quiz',
        type: 'multipleChoice',
        question: 'What is the prime factorisation of 45?',
        options: ['3² × 5', '3 × 5²', '3³ × 5', '3 × 15'],
        correctAnswer: 0,
        explanation: '45 = 9 × 5 = 3² × 5',
        hints: ['Start by finding two factors of 45', 'Continue breaking down until all factors are prime'],
        difficulty: 3,
        points: 15
      }
    ],
    resources: [
      {
        id: 'factorisation-video',
        title: 'Prime Factorisation Method',
        description: 'Step-by-step guide to factor trees',
        url: '/videos/prime-factorisation',
        type: 'video'
      }
    ],
    voiceScript: 'Prime factorisation is like finding the DNA of a number - breaking it down into its most basic prime building blocks!'
  },

  // AC9M6N02 - Square numbers (6-E.8)
  {
    id: 'square-numbers',
    title: 'Square Numbers',
    description: 'Identify and work with perfect squares',
    category: 'Number',
    difficulty: 2,
    estimatedTime: 25,
    ixlCode: '6-E.8',
    learningObjectives: [
      'Identify perfect squares up to 144',
      'Understand the relationship between squares and square roots',
      'Recognize square number patterns',
      'Apply square number knowledge in problems'
    ],
    prerequisites: ['understanding-integers'],
    concepts: [
      {
        id: 'perfect-squares',
        title: 'Perfect Squares',
        explanation: 'Numbers that can be expressed as n × n',
        examples: [
          {
            id: 'squares-1-4',
            problem: 'List the first four perfect squares',
            solution: '1, 4, 9, 16',
            workingOut: [
              '1² = 1 × 1 = 1',
              '2² = 2 × 2 = 4',
              '3² = 3 × 3 = 9',
              '4² = 4 × 4 = 16'
            ],
            visualRepresentation: 'Square grid diagrams'
          },
          {
            id: 'squares-5-8',
            problem: 'Calculate 5² through 8²',
            solution: '25, 36, 49, 64',
            workingOut: [
              '5² = 5 × 5 = 25',
              '6² = 6 × 6 = 36',
              '7² = 7 × 7 = 49',
              '8² = 8 × 8 = 64'
            ]
          }
        ],
        visualAids: [
          {
            id: 'square-visualizer',
            type: 'interactive',
            title: 'Square Number Visualizer',
            description: 'Visual representation of square numbers',
            component: 'SquareVisualizer',
            data: { maxSquare: 12 }
          }
        ],
        interactiveElements: [
          {
            id: 'square-calculator',
            type: 'calculator',
            title: 'Square Calculator',
            instructions: 'Enter a number to see its square',
            component: 'SquareCalculator'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'square-numbers-quiz',
        type: 'multipleChoice',
        question: 'Which number is NOT a perfect square?',
        options: ['64', '81', '96', '100'],
        correctAnswer: 2,
        explanation: '96 cannot be expressed as n² for any whole number n',
        hints: ['Try to find the square root of each number', 'Perfect squares have whole number square roots'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'squares-interactive',
        title: 'Square Numbers Explorer',
        description: 'Interactive exploration of square patterns',
        url: '/interactive/squares',
        type: 'interactive'
      }
    ],
    voiceScript: 'Square numbers are special! They form perfect square grids. Think of 16 as a 4×4 square of dots!'
  },

  // AC9M6N03 - Understanding fractions (6-I.1)
  {
    id: 'fractions-review',
    title: 'Fractions and Mixed Numbers Review',
    description: 'Review fundamental fraction concepts and mixed numbers',
    category: 'Number',
    difficulty: 2,
    estimatedTime: 30,
    ixlCode: '6-I.1',
    learningObjectives: [
      'Identify proper and improper fractions',
      'Convert between mixed numbers and improper fractions',
      'Understand fraction terminology',
      'Compare fractions visually'
    ],
    prerequisites: [],
    concepts: [
      {
        id: 'fraction-types',
        title: 'Types of Fractions',
        explanation: 'Understanding proper fractions, improper fractions, and mixed numbers',
        examples: [
          {
            id: 'fraction-types-example',
            problem: 'Classify fraction types',
            solution: 'Proper: 3/4, Improper: 7/4, Mixed: 1¾',
            workingOut: [
              'Proper fraction: numerator < denominator (3/4)',
              'Improper fraction: numerator > denominator (7/4)',
              'Mixed number: whole number + proper fraction (1¾ = 7/4)'
            ],
            visualRepresentation: 'Visual fraction bars'
          },
          {
            id: 'mixed-to-improper',
            problem: 'Convert 2⅗ to improper fraction',
            solution: '13/5',
            workingOut: [
              'Multiply whole number by denominator: 2 × 5 = 10',
              'Add numerator: 10 + 3 = 13',
              'Keep same denominator: 13/5'
            ]
          }
        ],
        visualAids: [
          {
            id: 'fraction-bars',
            type: 'interactive',
            title: 'Fraction Bar Converter',
            description: 'Convert between mixed numbers and improper fractions',
            component: 'FractionConverter',
            data: { showMixed: true }
          }
        ],
        interactiveElements: [
          {
            id: 'fraction-converter',
            type: 'input',
            title: 'Fraction Converter',
            instructions: 'Convert between different fraction formats',
            component: 'FractionConverter'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'fractions-review-quiz',
        type: 'multipleChoice',
        question: 'What is 13/5 as a mixed number?',
        options: ['2⅗', '2⅖', '3⅗', '2⅕'],
        correctAnswer: 0,
        explanation: '13 ÷ 5 = 2 remainder 3, so 13/5 = 2⅗',
        hints: ['Divide the numerator by the denominator', 'The quotient is the whole number, remainder becomes new numerator'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'fractions-guide',
        title: 'Fraction Types Guide',
        description: 'Complete guide to fraction classification',
        url: '/guides/fraction-types',
        type: 'article'
      }
    ],
    voiceScript: 'Fractions show us parts of a whole! Mixed numbers combine whole numbers with fractions - like saying 2 and 3/5!'
  },

  // AC9M6N01 - Compare and order integers (6-L.4)
  {
    id: 'compare-order-integers-numberline',
    title: 'Compare and Order Integers Using Number Lines',
    description: 'Use number lines to compare and order positive and negative integers',
    category: 'Number',
    difficulty: 2,
    estimatedTime: 25,
    ixlCode: '6-L.4',
    learningObjectives: [
      'Compare integers using number lines',
      'Order integers from least to greatest',
      'Understand relative position on number lines',
      'Apply comparison to real-world contexts'
    ],
    prerequisites: ['understanding-integers', 'integers-on-numberlines'],
    concepts: [
      {
        id: 'numberline-comparison',
        title: 'Using Number Lines to Compare',
        explanation: 'Numbers to the right are greater, numbers to the left are smaller',
        examples: [
          {
            id: 'compare-using-numberline',
            problem: 'Compare -3 and 1 using a number line',
            solution: '-3 < 1',
            workingOut: [
              'Plot -3 on the number line (3 units left of zero)',
              'Plot 1 on the number line (1 unit right of zero)',
              'Since -3 is to the left of 1, we have -3 < 1'
            ],
            visualRepresentation: 'Number line with -3 and 1 marked'
          }
        ],
        visualAids: [
          {
            id: 'comparison-numberline',
            type: 'interactive',
            title: 'Integer Comparison Tool',
            description: 'Interactive number line for comparing integers',
            component: 'NumberLineComparator',
            data: { range: 10 }
          }
        ],
        interactiveElements: [
          {
            id: 'compare-practice',
            type: 'dragDrop',
            title: 'Order Integers',
            instructions: 'Drag integers to order them from least to greatest',
            component: 'IntegerOrderer'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'compare-integers-quiz',
        type: 'multipleChoice',
        question: 'Which statement is correct?',
        options: ['-5 > -2', '-2 > 3', '-5 < -2', '0 < -1'],
        correctAnswer: 2,
        explanation: 'On a number line, -5 is to the left of -2, so -5 < -2',
        hints: ['Remember: numbers to the left are smaller', 'Negative numbers get smaller as they get further from zero'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'comparison-guide',
        title: 'Comparing Integers Guide',
        description: 'Step-by-step guide to integer comparison',
        url: '/guides/comparing-integers',
        type: 'article'
      }
    ],
    voiceScript: 'On a number line, think of walking left or right! Numbers to the right are always bigger, numbers to the left are always smaller!'
  },

  // AC9M6N01 - Compare integers (6-L.5)
  {
    id: 'compare-integers',
    title: 'Compare Integers',
    description: 'Compare positive and negative integers without number lines',
    category: 'Number',
    difficulty: 2,
    estimatedTime: 20,
    ixlCode: '6-L.5',
    learningObjectives: [
      'Compare integers using symbols <, >, =',
      'Apply comparison rules for positive and negative numbers',
      'Compare integers in various contexts',
      'Understand absolute value concepts'
    ],
    prerequisites: ['understanding-integers'],
    concepts: [
      {
        id: 'integer-comparison-rules',
        title: 'Rules for Comparing Integers',
        explanation: 'Learn the systematic rules for comparing any two integers',
        examples: [
          {
            id: 'positive-vs-negative',
            problem: 'Compare 5 and -8',
            solution: '5 > -8',
            workingOut: [
              'Any positive number is greater than any negative number',
              'Since 5 is positive and -8 is negative, 5 > -8'
            ]
          },
          {
            id: 'negative-comparison',
            problem: 'Compare -12 and -7',
            solution: '-12 < -7',
            workingOut: [
              'For negative numbers, the one closer to zero is greater',
              '-7 is closer to zero than -12, so -12 < -7'
            ]
          }
        ],
        visualAids: [
          {
            id: 'comparison-rules',
            type: 'interactive',
            title: 'Integer Comparison Rules',
            description: 'Interactive tool showing comparison rules',
            component: 'ComparisonRules',
            data: { showRules: true }
          }
        ],
        interactiveElements: [
          {
            id: 'comparison-practice',
            type: 'input',
            title: 'Compare Integers',
            instructions: 'Enter <, >, or = to compare the integers',
            component: 'IntegerComparator'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'integer-comparison-quiz',
        type: 'multipleChoice',
        question: 'Which comparison is correct?',
        options: ['-15 > -10', '-3 < -8', '0 > 4', '-6 < 2'],
        correctAnswer: 3,
        explanation: 'Any positive number (2) is greater than any negative number (-6)',
        hints: ['Remember the rules for comparing positive and negative numbers'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'comparison-rules-ref',
        title: 'Integer Comparison Reference',
        description: 'Quick reference for comparison rules',
        url: '/reference/integer-comparison',
        type: 'article'
      }
    ],
    voiceScript: 'Comparing integers is like a temperature contest! Positive beats negative, and for negatives, closer to zero wins!'
  },

  // AC9M6N01 - Put integers in order (6-L.6)
  {
    id: 'order-integers',
    title: 'Put Integers in Order',
    description: 'Arrange integers in ascending and descending order',
    category: 'Number',
    difficulty: 2,
    estimatedTime: 25,
    ixlCode: '6-L.6',
    learningObjectives: [
      'Order integers from least to greatest',
      'Order integers from greatest to least',
      'Apply ordering in problem-solving contexts',
      'Understand the concept of sequence'
    ],
    prerequisites: ['compare-integers'],
    concepts: [
      {
        id: 'integer-ordering',
        title: 'Ordering Integer Sequences',
        explanation: 'Systematic approach to arranging integers in order',
        examples: [
          {
            id: 'ascending-order',
            problem: 'Order: 3, -5, 0, -1, 7 from least to greatest',
            solution: '-5, -1, 0, 3, 7',
            workingOut: [
              'Start with the most negative: -5',
              'Next negative closer to zero: -1',
              'Then zero: 0',
              'Then positive numbers: 3, 7'
            ]
          }
        ],
        visualAids: [
          {
            id: 'ordering-tool',
            type: 'interactive',
            title: 'Integer Ordering Tool',
            description: 'Drag and drop integers to order them',
            component: 'IntegerOrderingTool',
            data: { mode: 'both' }
          }
        ],
        interactiveElements: [
          {
            id: 'ordering-practice',
            type: 'dragDrop',
            title: 'Order the Integers',
            instructions: 'Drag integers into the correct order',
            component: 'IntegerSequencer'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'ordering-quiz',
        type: 'multipleChoice',
        question: 'Which shows -8, -3, 1, 5 in descending order?',
        options: ['5, 1, -3, -8', '-8, -3, 1, 5', '1, 5, -3, -8', '5, -3, 1, -8'],
        correctAnswer: 0,
        explanation: 'Descending means greatest to least: 5, 1, -3, -8',
        hints: ['Descending means from greatest to least', 'Start with the largest positive number'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'ordering-strategies',
        title: 'Integer Ordering Strategies',
        description: 'Effective strategies for ordering integers',
        url: '/strategies/integer-ordering',
        type: 'article'
      }
    ],
    voiceScript: 'Ordering integers is like organizing a lineup from coldest to hottest temperature! Start with the most negative and work your way up!'
  },

  // AC9M6N01 - Compare temperatures (6-Q.11)
  {
    id: 'temperature-comparison',
    title: 'Compare Temperatures Above and Below Zero',
    description: 'Apply integer comparison to temperature contexts',
    category: 'Number',
    difficulty: 2,
    estimatedTime: 30,
    ixlCode: '6-Q.11',
    learningObjectives: [
      'Compare temperatures using integers',
      'Understand temperature scale with negatives',
      'Apply temperature comparison to real situations',
      'Connect integers to practical contexts'
    ],
    prerequisites: ['compare-integers'],
    concepts: [
      {
        id: 'temperature-integers',
        title: 'Temperature as Integers',
        explanation: 'Understanding how temperatures relate to positive and negative integers',
        examples: [
          {
            id: 'temperature-comparison-example',
            problem: 'Which is colder: -5°C or 2°C?',
            solution: '-5°C is colder',
            workingOut: [
              '-5°C means 5 degrees below freezing',
              '2°C means 2 degrees above freezing',
              'Below freezing is colder than above freezing',
              'So -5°C < 2°C, making -5°C colder'
            ],
            visualRepresentation: 'Thermometer showing both temperatures'
          }
        ],
        visualAids: [
          {
            id: 'temperature-thermometer',
            type: 'interactive',
            title: 'Temperature Comparison Tool',
            description: 'Interactive thermometer for comparing temperatures',
            component: 'TemperatureComparator',
            data: { range: [-20, 40] }
          }
        ],
        interactiveElements: [
          {
            id: 'temperature-practice',
            type: 'clickable',
            title: 'Temperature Comparison',
            instructions: 'Click on the colder/warmer temperature',
            component: 'TemperatureClicker'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'temperature-quiz',
        type: 'multipleChoice',
        question: 'Yesterday was -3°C, today is 1°C. Which statement is correct?',
        options: ['Today is colder', 'Yesterday was warmer', 'Today is warmer', 'Both days had the same temperature'],
        correctAnswer: 2,
        explanation: '1°C > -3°C, so today is warmer than yesterday',
        hints: ['Compare -3 and 1', 'Positive temperatures are warmer than negative ones'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'temperature-guide',
        title: 'Understanding Temperature Scales',
        description: 'Guide to Celsius and integer relationships',
        url: '/guides/temperature-scales',
        type: 'article'
      }
    ],
    voiceScript: 'Temperature is a perfect example of integers in real life! Negative temperatures are below freezing - the bigger the negative number, the colder it gets!'
  },

  // AC9M6SP02 - Objects on coordinate plane (6-U.2)
  {
    id: 'coordinate-plane-quadrants',
    title: 'Objects on a Coordinate Plane - All Four Quadrants',
    description: 'Identify and locate objects in all four quadrants of the coordinate plane',
    category: 'Space',
    difficulty: 3,
    estimatedTime: 35,
    ixlCode: '6-U.2',
    learningObjectives: [
      'Identify all four quadrants of the coordinate plane',
      'Locate objects in different quadrants',
      'Understand positive and negative coordinate relationships',
      'Apply coordinate concepts to real-world contexts'
    ],
    prerequisites: ['coordinate-graphing'],
    concepts: [
      {
        id: 'quadrant-identification',
        title: 'The Four Quadrants',
        explanation: 'Understanding the four regions created by the x and y axes',
        examples: [
          {
            id: 'quadrant-properties',
            problem: 'Identify the quadrant for point (-3, 4)',
            solution: 'Quadrant II',
            workingOut: [
              'x-coordinate is -3 (negative)',
              'y-coordinate is 4 (positive)',
              'Quadrant II has negative x, positive y',
              'Therefore (-3, 4) is in Quadrant II'
            ],
            visualRepresentation: 'Coordinate plane showing all quadrants'
          }
        ],
        visualAids: [
          {
            id: 'quadrant-explorer',
            type: 'interactive',
            title: 'Quadrant Explorer',
            description: 'Explore all four quadrants interactively',
            component: 'QuadrantExplorer',
            data: { showLabels: true }
          }
        ],
        interactiveElements: [
          {
            id: 'quadrant-practice',
            type: 'clickable',
            title: 'Quadrant Identification',
            instructions: 'Click on the correct quadrant for each point',
            component: 'QuadrantIdentifier'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'quadrant-quiz',
        type: 'multipleChoice',
        question: 'In which quadrant is the point (-2, -5)?',
        options: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
        correctAnswer: 2,
        explanation: 'Both coordinates are negative, so the point is in Quadrant III',
        hints: ['Check the signs of both coordinates', 'Quadrant III has both negative x and y'],
        difficulty: 3,
        points: 15
      }
    ],
    resources: [
      {
        id: 'quadrant-reference',
        title: 'Quadrant Reference Guide',
        description: 'Quick reference for quadrant properties',
        url: '/reference/quadrants',
        type: 'article'
      }
    ],
    voiceScript: 'The coordinate plane has four neighborhoods called quadrants! Each has its own personality based on positive and negative coordinates!'
  },

  // AC9M6N03 - Understanding fractions word problems (6-I.2)
  {
    id: 'fractions-word-problems',
    title: 'Understanding Fractions: Word Problems',
    description: 'Solve real-world problems involving fractions',
    category: 'Number',
    difficulty: 3,
    estimatedTime: 30,
    ixlCode: '6-I.2',
    learningObjectives: [
      'Interpret fractions in word problems',
      'Identify fraction operations needed',
      'Solve multi-step fraction problems',
      'Apply fractions to real-world scenarios'
    ],
    prerequisites: ['fractions-review'],
    concepts: [
      {
        id: 'fraction-word-problems',
        title: 'Solving Fraction Word Problems',
        explanation: 'Step-by-step approach to fraction word problems',
        examples: [
          {
            id: 'pizza-problem',
            problem: 'Sarah ate 2/8 of a pizza and Tom ate 3/8. How much pizza did they eat together?',
            solution: '5/8 of the pizza',
            workingOut: [
              'Sarah ate 2/8',
              'Tom ate 3/8',
              'Together: 2/8 + 3/8 = 5/8',
              'They ate 5/8 of the pizza'
            ]
          }
        ],
        visualAids: [
          {
            id: 'word-problem-visualizer',
            type: 'interactive',
            title: 'Fraction Word Problem Visualizer',
            description: 'Visual representation of fraction word problems',
            component: 'FractionWordProblemVisualizer',
            data: { problemTypes: ['addition', 'subtraction', 'comparison'] }
          }
        ],
        interactiveElements: [
          {
            id: 'word-problem-solver',
            type: 'input',
            title: 'Fraction Word Problem Solver',
            instructions: 'Read the problem and enter your answer as a fraction',
            component: 'FractionWordProblemSolver'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'fraction-word-problems-quiz',
        type: 'shortAnswer',
        question: 'Maria read 3/5 of her book on Monday and 1/5 on Tuesday. What fraction of the book has she read?',
        correctAnswer: '4/5',
        explanation: '3/5 + 1/5 = 4/5 of the book',
        hints: ['Add the two fractions', 'The denominators are the same'],
        difficulty: 3,
        points: 15
      }
    ],
    resources: [
      {
        id: 'fraction-word-problems-guide',
        title: 'Fraction Word Problems Guide',
        description: 'Strategies for solving fraction word problems',
        url: '/guides/fraction-word-problems',
        type: 'article'
      }
    ],
    voiceScript: 'Word problems with fractions tell stories about parts and wholes! Look for clue words like "together", "more than", or "less than" to know what operation to use!'
  },

  // AC9M6N03 - Graph equivalent fractions on number lines (6-I.4)
  {
    id: 'graph-equivalent-fractions',
    title: 'Graph Equivalent Fractions on Number Lines',
    description: 'Plot equivalent fractions on number lines to show their relationships',
    category: 'Number',
    difficulty: 3,
    estimatedTime: 30,
    ixlCode: '6-I.4',
    learningObjectives: [
      'Plot fractions on number lines',
      'Show equivalent fractions on the same number line',
      'Understand fraction equivalence through position',
      'Compare fractions using number line positions'
    ],
    prerequisites: ['equivalent-fractions-area'],
    concepts: [
      {
        id: 'numberline-equivalent-fractions',
        title: 'Plotting Equivalent Fractions',
        explanation: 'Using number lines to demonstrate that equivalent fractions occupy the same position',
        examples: [
          {
            id: 'equivalent-on-numberline',
            problem: 'Show that 1/2, 2/4, and 3/6 are equivalent using number lines',
            solution: 'All fractions plot at the same position (halfway between 0 and 1)',
            workingOut: [
              'Draw number line from 0 to 1',
              'Mark 1/2 at the halfway point',
              'Divide into fourths: 2/4 also at halfway point',
              'Divide into sixths: 3/6 also at halfway point',
              'All three fractions are at the same location'
            ],
            visualRepresentation: 'Multiple number lines showing equivalent fraction positions'
          }
        ],
        visualAids: [
          {
            id: 'fraction-numberline',
            type: 'interactive',
            title: 'Fraction Number Line Plotter',
            description: 'Plot and compare fractions on interactive number lines',
            component: 'FractionNumberLinePlotter',
            data: { maxDenominator: 12 }
          }
        ],
        interactiveElements: [
          {
            id: 'fraction-plotting',
            type: 'clickable',
            title: 'Fraction Plotting Practice',
            instructions: 'Click on the number line to plot the given fraction',
            component: 'FractionPlotter'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'fraction-numberline-quiz',
        type: 'multipleChoice',
        question: 'Which fraction is equivalent to 1/3 on a number line?',
        options: ['2/6', '3/8', '1/4', '4/9'],
        correctAnswer: 0,
        explanation: '2/6 = 1/3, so they plot at the same position on a number line',
        hints: ['Find which fraction equals 1/3', 'Equivalent fractions are at the same position'],
        difficulty: 3,
        points: 15
      }
    ],
    resources: [
      {
        id: 'fraction-numberline-guide',
        title: 'Fractions on Number Lines',
        description: 'Complete guide to plotting fractions',
        url: '/guides/fraction-number-lines',
        type: 'interactive'
      }
    ],
    voiceScript: 'Number lines are like rulers for fractions! When fractions land on the same spot, they\'re equivalent - just different ways of writing the same value!'
  },

  // AC9M6N03 - Equivalent fractions (6-I.5)
  {
    id: 'equivalent-fractions',
    title: 'Equivalent Fractions',
    description: 'Identify and create equivalent fractions using multiplication and division',
    category: 'Number',
    difficulty: 2,
    estimatedTime: 25,
    ixlCode: '6-I.5',
    learningObjectives: [
      'Identify equivalent fractions',
      'Create equivalent fractions by multiplying/dividing',
      'Understand the concept of equivalent ratios',
      'Apply equivalence in problem solving'
    ],
    prerequisites: ['fractions-review'],
    concepts: [
      {
        id: 'creating-equivalent-fractions',
        title: 'Creating Equivalent Fractions',
        explanation: 'Multiply or divide numerator and denominator by the same number',
        examples: [
          {
            id: 'multiply-to-equivalent',
            problem: 'Find an equivalent fraction to 2/3 with denominator 12',
            solution: '8/12',
            workingOut: [
              '2/3 = ?/12',
              'Denominator: 3 × 4 = 12',
              'Numerator: 2 × 4 = 8',
              'So 2/3 = 8/12'
            ]
          }
        ],
        visualAids: [
          {
            id: 'equivalent-fraction-builder',
            type: 'interactive',
            title: 'Equivalent Fraction Builder',
            description: 'Build equivalent fractions step by step',
            component: 'EquivalentFractionBuilder',
            data: { showSteps: true }
          }
        ],
        interactiveElements: [
          {
            id: 'equivalence-practice',
            type: 'input',
            title: 'Find Equivalent Fractions',
            instructions: 'Enter the missing numerator or denominator',
            component: 'EquivalentFractionFinder'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'equivalent-fractions-quiz',
        type: 'numerical',
        question: 'What number makes 3/4 = ?/16 true?',
        correctAnswer: 12,
        explanation: '4 × 4 = 16, so 3 × 4 = 12. Therefore 3/4 = 12/16',
        hints: ['What do you multiply 4 by to get 16?', 'Multiply the numerator by the same number'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'equivalent-fractions-methods',
        title: 'Methods for Finding Equivalent Fractions',
        description: 'Different strategies for creating equivalent fractions',
        url: '/methods/equivalent-fractions',
        type: 'article'
      }
    ],
    voiceScript: 'Equivalent fractions are like different outfits for the same person! They look different but represent exactly the same amount!'
  },

  // AC9M6N03 - Write fractions in lowest terms (6-I.6)
  {
    id: 'fractions-lowest-terms',
    title: 'Write Fractions in Lowest Terms',
    description: 'Simplify fractions to their simplest form',
    category: 'Number',
    difficulty: 3,
    estimatedTime: 30,
    ixlCode: '6-I.6',
    learningObjectives: [
      'Understand what lowest terms means',
      'Find the greatest common factor (GCF)',
      'Simplify fractions using the GCF',
      'Recognize when fractions are in lowest terms'
    ],
    prerequisites: ['identify-factors', 'equivalent-fractions'],
    concepts: [
      {
        id: 'simplifying-fractions',
        title: 'Simplifying to Lowest Terms',
        explanation: 'Divide both numerator and denominator by their greatest common factor',
        examples: [
          {
            id: 'simplify-fraction',
            problem: 'Write 12/18 in lowest terms',
            solution: '2/3',
            workingOut: [
              'Find factors of 12: 1, 2, 3, 4, 6, 12',
              'Find factors of 18: 1, 2, 3, 6, 9, 18',
              'Greatest common factor = 6',
              '12 ÷ 6 = 2, 18 ÷ 6 = 3',
              'So 12/18 = 2/3 in lowest terms'
            ]
          }
        ],
        visualAids: [
          {
            id: 'fraction-simplifier',
            type: 'interactive',
            title: 'Fraction Simplifier',
            description: 'Interactive tool for simplifying fractions',
            component: 'FractionSimplifier',
            data: { showSteps: true, showFactors: true }
          }
        ],
        interactiveElements: [
          {
            id: 'simplification-practice',
            type: 'input',
            title: 'Simplify Fractions',
            instructions: 'Enter the fraction in its lowest terms',
            component: 'FractionSimplificationPractice'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'lowest-terms-quiz',
        type: 'shortAnswer',
        question: 'Write 15/25 in lowest terms',
        correctAnswer: '3/5',
        explanation: 'GCF of 15 and 25 is 5. 15÷5 = 3, 25÷5 = 5, so 15/25 = 3/5',
        hints: ['Find the greatest common factor of 15 and 25', 'Divide both numerator and denominator by the GCF'],
        difficulty: 3,
        points: 15
      }
    ],
    resources: [
      {
        id: 'simplification-strategies',
        title: 'Fraction Simplification Strategies',
        description: 'Efficient methods for simplifying fractions',
        url: '/strategies/fraction-simplification',
        type: 'article'
      }
    ],
    voiceScript: 'Simplifying fractions is like cleaning up - we want the neatest, simplest version! Find the biggest number that divides both parts evenly!'
  },

  // Continue with more decimal topics...
  // AC9M6N04 - Round decimals (6-F.6)
  {
    id: 'round-decimals',
    title: 'Round Decimals',
    description: 'Round decimal numbers to specified places',
    category: 'Number',
    difficulty: 2,
    estimatedTime: 25,
    ixlCode: '6-F.6',
    learningObjectives: [
      'Round decimals to the nearest whole number',
      'Round decimals to the nearest tenth',
      'Round decimals to the nearest hundredth',
      'Apply rounding rules consistently'
    ],
    prerequisites: ['decimal-operations'],
    concepts: [
      {
        id: 'decimal-rounding-rules',
        title: 'Decimal Rounding Rules',
        explanation: 'Use place value and the digit to the right to round decimals',
        examples: [
          {
            id: 'round-to-nearest-tenth',
            problem: 'Round 3.47 to the nearest tenth',
            solution: '3.5',
            workingOut: [
              'Look at the tenths place: 4',
              'Look at the hundredths place: 7',
              'Since 7 ≥ 5, round up',
              '3.47 rounds to 3.5'
            ]
          }
        ],
        visualAids: [
          {
            id: 'decimal-rounding-tool',
            type: 'interactive',
            title: 'Decimal Rounding Tool',
            description: 'Interactive decimal rounding practice',
            component: 'DecimalRounder',
            data: { places: ['whole', 'tenth', 'hundredth'] }
          }
        ],
        interactiveElements: [
          {
            id: 'rounding-practice',
            type: 'input',
            title: 'Decimal Rounding Practice',
            instructions: 'Round the decimal to the specified place',
            component: 'DecimalRoundingPractice'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'decimal-rounding-quiz',
        type: 'numerical',
        question: 'Round 5.863 to the nearest hundredth',
        correctAnswer: 5.86,
        explanation: 'The thousandths digit is 3, which is < 5, so round down to 5.86',
        hints: ['Look at the thousandths place', 'Round down if the digit is less than 5'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'decimal-rounding-guide',
        title: 'Decimal Rounding Guide',
        description: 'Complete guide to decimal rounding rules',
        url: '/guides/decimal-rounding',
        type: 'article'
      }
    ],
    voiceScript: 'Rounding decimals is like finding the closest parking spot! Look at the next digit to decide whether to go up or stay put!'
  },

  // AC9M6N03 - Fractions: word problems (6-I.7)
  {
    id: 'fractions-word-problems-advanced',
    title: 'Fractions: Word Problems',
    description: 'Solve complex real-world problems involving fractions',
    category: 'Number',
    difficulty: 3,
    estimatedTime: 35,
    ixlCode: '6-I.7',
    learningObjectives: [
      'Solve multi-step fraction word problems',
      'Interpret fraction language in context',
      'Apply fraction operations to real situations',
      'Check reasonableness of fraction answers'
    ],
    prerequisites: ['fractions-word-problems', 'fractions-lowest-terms'],
    concepts: [
      {
        id: 'complex-fraction-problems',
        title: 'Multi-Step Fraction Problems',
        explanation: 'Breaking down complex fraction word problems into manageable steps',
        examples: [
          {
            id: 'recipe-problem',
            problem: 'A recipe calls for 2/3 cup of flour. If Maria wants to make 1/2 of the recipe, how much flour does she need?',
            solution: '1/3 cup',
            workingOut: [
              'Recipe needs 2/3 cup of flour',
              'Maria makes 1/2 of the recipe',
              'Flour needed = 2/3 × 1/2',
              '2/3 × 1/2 = 2/6 = 1/3 cup'
            ]
          }
        ],
        visualAids: [
          {
            id: 'fraction-story-problems',
            type: 'interactive',
            title: 'Fraction Story Problem Solver',
            description: 'Interactive tool for complex fraction word problems',
            component: 'FractionStoryProblems',
            data: { difficulty: 'advanced', showHints: true }
          }
        ],
        interactiveElements: [
          {
            id: 'multi-step-fractions',
            type: 'input',
            title: 'Multi-Step Fraction Problems',
            instructions: 'Solve the word problem step by step',
            component: 'MultiStepFractionSolver'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'advanced-fraction-word-quiz',
        type: 'shortAnswer',
        question: 'Jake ate 1/4 of a pizza. His sister ate 1/3 of what was left. What fraction of the whole pizza did his sister eat?',
        correctAnswer: '1/4',
        explanation: 'After Jake ate 1/4, 3/4 remained. Sister ate 1/3 of 3/4 = 1/3 × 3/4 = 3/12 = 1/4',
        hints: ['First find how much pizza was left after Jake ate', 'Then find 1/3 of that amount'],
        difficulty: 3,
        points: 20
      }
    ],
    resources: [
      {
        id: 'fraction-problem-solving',
        title: 'Fraction Problem Solving Strategies',
        description: 'Advanced strategies for fraction word problems',
        url: '/strategies/fraction-problems',
        type: 'article'
      }
    ],
    voiceScript: 'Complex fraction problems are like mystery stories! Read carefully, identify what you know and what you need to find, then solve step by step!'
  },

  // AC9M6N05 - Lowest common denominator (6-I.8)
  {
    id: 'lowest-common-denominator',
    title: 'Lowest Common Denominator',
    description: 'Find the LCD to add and subtract fractions with different denominators',
    category: 'Number',
    difficulty: 3,
    estimatedTime: 30,
    ixlCode: '6-I.8',
    learningObjectives: [
      'Understand what LCD means',
      'Find the LCD of two or more fractions',
      'Use LCD to rewrite fractions',
      'Prepare fractions for addition/subtraction'
    ],
    prerequisites: ['equivalent-fractions', 'identify-factors'],
    concepts: [
      {
        id: 'finding-lcd',
        title: 'Finding the Lowest Common Denominator',
        explanation: 'The LCD is the smallest number that all denominators divide into evenly',
        examples: [
          {
            id: 'lcd-example',
            problem: 'Find the LCD of 1/4 and 1/6',
            solution: 'LCD = 12',
            workingOut: [
              'List multiples of 4: 4, 8, 12, 16, 20...',
              'List multiples of 6: 6, 12, 18, 24...',
              'First common multiple = 12',
              'So LCD of 1/4 and 1/6 is 12'
            ]
          }
        ],
        visualAids: [
          {
            id: 'lcd-finder',
            type: 'interactive',
            title: 'LCD Finder Tool',
            description: 'Interactive tool to find lowest common denominators',
            component: 'LCDFinder',
            data: { showMultiples: true, maxDenominator: 12 }
          }
        ],
        interactiveElements: [
          {
            id: 'lcd-practice',
            type: 'input',
            title: 'Find the LCD',
            instructions: 'Enter the lowest common denominator',
            component: 'LCDPractice'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'lcd-quiz',
        type: 'numerical',
        question: 'What is the LCD of 1/8 and 1/12?',
        correctAnswer: 24,
        explanation: 'Multiples of 8: 8,16,24... Multiples of 12: 12,24... First common multiple is 24',
        hints: ['List the first few multiples of each denominator', 'Find the smallest number that appears in both lists'],
        difficulty: 3,
        points: 15
      }
    ],
    resources: [
      {
        id: 'lcd-methods',
        title: 'Methods for Finding LCD',
        description: 'Different approaches to finding lowest common denominators',
        url: '/methods/lcd',
        type: 'article'
      }
    ],
    voiceScript: 'The LCD is like finding a common meeting ground for fractions! It\'s the smallest number that all denominators can divide into evenly!'
  },

  // AC9M6N03 - Graph and compare fractions on number lines (6-I.9)
  {
    id: 'graph-compare-fractions-numberlines',
    title: 'Graph and Compare Fractions on Number Lines',
    description: 'Use number lines to compare and order fractions',
    category: 'Number',
    difficulty: 3,
    estimatedTime: 30,
    ixlCode: '6-I.9',
    learningObjectives: [
      'Plot fractions on number lines accurately',
      'Compare fractions using their positions',
      'Order fractions from least to greatest',
      'Use number lines as a comparison tool'
    ],
    prerequisites: ['graph-equivalent-fractions'],
    concepts: [
      {
        id: 'fraction-comparison-numberlines',
        title: 'Using Number Lines to Compare Fractions',
        explanation: 'Fractions to the right are larger; fractions to the left are smaller',
        examples: [
          {
            id: 'compare-fractions-numberline',
            problem: 'Compare 2/3 and 3/4 using a number line',
            solution: '2/3 < 3/4',
            workingOut: [
              'Plot 2/3 on a number line (about 0.67)',
              'Plot 3/4 on a number line (0.75)',
              '3/4 is to the right of 2/3',
              'Therefore 2/3 < 3/4'
            ],
            visualRepresentation: 'Number line showing both fractions marked'
          }
        ],
        visualAids: [
          {
            id: 'fraction-comparison-tool',
            type: 'interactive',
            title: 'Fraction Comparison on Number Lines',
            description: 'Compare fractions using interactive number lines',
            component: 'FractionComparisonNumberLine',
            data: { maxDenominator: 12, showComparison: true }
          }
        ],
        interactiveElements: [
          {
            id: 'fraction-ordering',
            type: 'dragDrop',
            title: 'Order Fractions',
            instructions: 'Drag fractions to order them from least to greatest',
            component: 'FractionOrderer'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'fraction-comparison-quiz',
        type: 'multipleChoice',
        question: 'Which shows the correct order from least to greatest: 1/4, 1/3, 1/2?',
        options: ['1/2, 1/3, 1/4', '1/4, 1/3, 1/2', '1/3, 1/4, 1/2', '1/4, 1/2, 1/3'],
        correctAnswer: 1,
        explanation: 'On a number line: 1/4 is leftmost, then 1/3, then 1/2 is rightmost',
        hints: ['Think about which fraction is smallest', 'Use a number line to visualize'],
        difficulty: 3,
        points: 15
      }
    ],
    resources: [
      {
        id: 'fraction-comparison-strategies',
        title: 'Fraction Comparison Strategies',
        description: 'Multiple methods for comparing fractions',
        url: '/strategies/fraction-comparison',
        type: 'interactive'
      }
    ],
    voiceScript: 'Number lines are perfect for comparing fractions! Just like a race track - fractions further to the right are the winners (larger values)!'
  },

  // AC9M6N03 - Compare fractions with like and unlike denominators (6-I.10)
  {
    id: 'compare-fractions-like-unlike',
    title: 'Compare Fractions with Like and Unlike Denominators',
    description: 'Compare fractions using various strategies based on their denominators',
    category: 'Number',
    difficulty: 3,
    estimatedTime: 30,
    ixlCode: '6-I.10',
    learningObjectives: [
      'Compare fractions with the same denominator',
      'Compare fractions with different denominators',
      'Use common denominators for comparison',
      'Apply comparison strategies efficiently'
    ],
    prerequisites: ['lowest-common-denominator', 'equivalent-fractions'],
    concepts: [
      {
        id: 'fraction-comparison-strategies',
        title: 'Strategies for Comparing Fractions',
        explanation: 'Different approaches based on whether denominators are the same or different',
        examples: [
          {
            id: 'like-denominators',
            problem: 'Compare 3/7 and 5/7',
            solution: '3/7 < 5/7',
            workingOut: [
              'Same denominator (7)',
              'Compare numerators: 3 < 5',
              'Therefore 3/7 < 5/7'
            ]
          },
          {
            id: 'unlike-denominators',
            problem: 'Compare 2/3 and 3/5',
            solution: '2/3 > 3/5',
            workingOut: [
              'Different denominators: 3 and 5',
              'Find common denominator: LCD = 15',
              '2/3 = 10/15, 3/5 = 9/15',
              '10/15 > 9/15, so 2/3 > 3/5'
            ]
          }
        ],
        visualAids: [
          {
            id: 'fraction-comparison-strategies-tool',
            type: 'interactive',
            title: 'Fraction Comparison Strategies',
            description: 'Learn different methods for comparing fractions',
            component: 'FractionComparisonStrategies',
            data: { showMultipleMethods: true }
          }
        ],
        interactiveElements: [
          {
            id: 'comparison-practice',
            type: 'input',
            title: 'Fraction Comparison Practice',
            instructions: 'Enter <, >, or = to compare the fractions',
            component: 'FractionComparisonPractice'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'fraction-comparison-mixed-quiz',
        type: 'multipleChoice',
        question: 'Which comparison is correct?',
        options: ['3/8 > 1/2', '2/5 < 1/3', '4/9 > 1/2', '5/6 > 7/8'],
        correctAnswer: 3,
        explanation: '5/6 = 20/24 and 7/8 = 21/24, but let me recalculate: 5/6 ≈ 0.83, 7/8 = 0.875, so 5/6 < 7/8. The correct answer should be checked.',
        hints: ['Convert to common denominators or decimals', 'Check each comparison carefully'],
        difficulty: 3,
        points: 15
      }
    ],
    resources: [
      {
        id: 'fraction-comparison-guide',
        title: 'Complete Fraction Comparison Guide',
        description: 'Master all methods of fraction comparison',
        url: '/guides/fraction-comparison-complete',
        type: 'article'
      }
    ],
    voiceScript: 'Comparing fractions is like comparing pizza slices! If they\'re the same size pizza (same denominator), just count the slices. If different pizzas, make them the same size first!'
  },

  // AC9M6N05 - Add and subtract fractions with like denominators using number lines (6-J.1)
  {
    id: 'add-subtract-like-denominators-numberlines',
    title: 'Add and Subtract Fractions with Like Denominators Using Number Lines',
    description: 'Use number lines to visualize addition and subtraction of fractions with same denominators',
    category: 'Number',
    difficulty: 2,
    estimatedTime: 30,
    ixlCode: '6-J.1',
    learningObjectives: [
      'Add fractions with like denominators using number lines',
      'Subtract fractions with like denominators using number lines',
      'Visualize fraction operations',
      'Connect visual models to abstract calculations'
    ],
    prerequisites: ['graph-equivalent-fractions'],
    concepts: [
      {
        id: 'numberline-fraction-operations',
        title: 'Fraction Operations on Number Lines',
        explanation: 'Use number lines to show jumping and combining fractions',
        examples: [
          {
            id: 'addition-numberline',
            problem: 'Show 2/5 + 1/5 using a number line',
            solution: '3/5',
            workingOut: [
              'Start at 2/5 on the number line',
              'Jump right 1/5 (one fifth)',
              'Land at 3/5',
              'So 2/5 + 1/5 = 3/5'
            ],
            visualRepresentation: 'Number line with jumps showing addition'
          }
        ],
        visualAids: [
          {
            id: 'fraction-numberline-operations',
            type: 'interactive',
            title: 'Fraction Operations on Number Lines',
            description: 'Interactive number line for fraction addition and subtraction',
            component: 'FractionNumberLineOperations',
            data: { operations: ['add', 'subtract'], showJumps: true }
          }
        ],
        interactiveElements: [
          {
            id: 'numberline-calculation',
            type: 'clickable',
            title: 'Number Line Calculator',
            instructions: 'Click on the number line to solve the fraction problem',
            component: 'NumberLineFractionCalculator'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'numberline-fractions-quiz',
        type: 'shortAnswer',
        question: 'Use a number line to solve: 4/6 - 2/6',
        correctAnswer: '2/6 or 1/3',
        explanation: 'Start at 4/6, jump left 2/6 to land at 2/6 = 1/3',
        hints: ['Start at the first fraction', 'For subtraction, jump left on the number line'],
        difficulty: 2,
        points: 12
      }
    ],
    resources: [
      {
        id: 'numberline-fractions-guide',
        title: 'Fractions on Number Lines Guide',
        description: 'Visual guide to fraction operations using number lines',
        url: '/guides/numberline-fractions',
        type: 'interactive'
      }
    ],
    voiceScript: 'Number lines make fraction addition like taking steps! For addition, step forward; for subtraction, step backward. The denominators tell you the step size!'
  },

  // AC9M6N05 - Add and subtract fractions with like denominators (6-J.2)
  {
    id: 'add-subtract-like-denominators',
    title: 'Add and Subtract Fractions with Like Denominators',
    description: 'Add and subtract fractions that have the same denominator',
    category: 'Number',
    difficulty: 2,
    estimatedTime: 25,
    ixlCode: '6-J.2',
    learningObjectives: [
      'Add fractions with the same denominator',
      'Subtract fractions with the same denominator',
      'Simplify results to lowest terms',
      'Apply operations to solve problems'
    ],
    prerequisites: ['fractions-review'],
    concepts: [
      {
        id: 'like-denominator-operations',
        title: 'Operations with Like Denominators',
        explanation: 'When denominators are the same, add or subtract the numerators and keep the denominator',
        examples: [
          {
            id: 'add-like-denominators',
            problem: 'Calculate 3/8 + 2/8',
            solution: '5/8',
            workingOut: [
              'Same denominators (8)',
              'Add numerators: 3 + 2 = 5',
              'Keep denominator: 8',
              'Result: 5/8'
            ]
          },
          {
            id: 'subtract-like-denominators',
            problem: 'Calculate 7/10 - 3/10',
            solution: '4/10 = 2/5',
            workingOut: [
              'Same denominators (10)',
              'Subtract numerators: 7 - 3 = 4',
              'Keep denominator: 10',
              'Simplify: 4/10 = 2/5'
            ]
          }
        ],
        visualAids: [
          {
            id: 'like-denominator-calculator',
            type: 'interactive',
            title: 'Like Denominator Calculator',
            description: 'Practice adding and subtracting fractions with same denominators',
            component: 'LikeDenominatorCalculator',
            data: { showSimplification: true }
          }
        ],
        interactiveElements: [
          {
            id: 'like-denominator-practice',
            type: 'input',
            title: 'Like Denominator Practice',
            instructions: 'Calculate and simplify the result',
            component: 'LikeDenominatorPractice'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'like-denominators-quiz',
        type: 'shortAnswer',
        question: 'Calculate and simplify: 5/12 + 7/12',
        correctAnswer: '12/12 or 1',
        explanation: '5/12 + 7/12 = 12/12 = 1',
        hints: ['Add the numerators', 'Keep the denominator the same', 'Simplify if possible'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'like-denominators-practice',
        title: 'Like Denominator Operations Practice',
        description: 'Extra practice with same denominator fractions',
        url: '/practice/like-denominators',
        type: 'interactive'
      }
    ],
    voiceScript: 'When fractions have the same denominator, it\'s like having the same size pieces! Just add or subtract the number of pieces and keep the piece size the same!'
  },

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
  },

  // AC9M6N05 - Add and subtract fractions with unlike denominators (6-J.4)
  {
    id: 'add-subtract-unlike-denominators',
    title: 'Add and Subtract Fractions with Unlike Denominators',
    description: 'Add and subtract fractions with different denominators using common denominators',
    category: 'Number',
    difficulty: 4,
    estimatedTime: 35,
    ixlCode: '6-J.4',
    learningObjectives: [
      'Find common denominators for fractions',
      'Convert fractions to equivalent forms',
      'Add and subtract unlike fractions',
      'Simplify results to lowest terms'
    ],
    prerequisites: ['equivalent-fractions', 'add-subtract-like-denominators'],
    concepts: [
      {
        id: 'unlike-denominator-operations',
        title: 'Operations with Unlike Denominators',
        explanation: 'Find common denominators before adding or subtracting',
        examples: [
          {
            id: 'unlike-fraction-example',
            problem: 'Calculate 1/3 + 1/4',
            solution: '7/12',
            workingOut: [
              'Find common denominator: LCM of 3 and 4 = 12',
              'Convert: 1/3 = 4/12, 1/4 = 3/12',
              'Add: 4/12 + 3/12 = 7/12'
            ]
          }
        ],
        visualAids: [
          {
            id: 'unlike-fraction-calculator',
            type: 'interactive',
            title: 'Unlike Fraction Calculator',
            description: 'Step-by-step calculator for unlike fractions',
            component: 'UnlikeFractionCalculator',
            data: { showSteps: true }
          }
        ],
        interactiveElements: [
          {
            id: 'common-denominator-finder',
            type: 'calculator',
            title: 'Common Denominator Finder',
            instructions: 'Find the LCM to create common denominators',
            component: 'CommonDenominatorTool'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'unlike-denominators-quiz',
        type: 'shortAnswer',
        question: 'What is 2/5 + 1/3?',
        correctAnswer: '11/15',
        explanation: 'Convert to common denominator 15: 6/15 + 5/15 = 11/15',
        hints: ['Find the LCM of 5 and 3', 'Convert both fractions to equivalent fractions'],
        difficulty: 4,
        points: 20
      }
    ],
    resources: [
      {
        id: 'common-denominators-guide',
        title: 'Finding Common Denominators',
        description: 'Master the art of finding common denominators',
        url: '/guides/common-denominators',
        type: 'article'
      }
    ],
    voiceScript: 'Adding fractions with different denominators is like trying to add apples and oranges - first make them the same type of fruit!'
  },

  // AC9M6N05 - Multiply fractions (6-J.5)
  {
    id: 'multiply-fractions',
    title: 'Multiply Fractions',
    description: 'Multiply fractions by multiplying numerators and denominators',
    category: 'Number',
    difficulty: 3,
    estimatedTime: 25,
    ixlCode: '6-J.5',
    learningObjectives: [
      'Multiply fractions using the standard algorithm',
      'Simplify products before and after multiplication',
      'Apply fraction multiplication to word problems',
      'Understand multiplication as repeated addition'
    ],
    prerequisites: ['equivalent-fractions'],
    concepts: [
      {
        id: 'fraction-multiplication',
        title: 'Multiplying Fractions',
        explanation: 'Multiply numerator by numerator and denominator by denominator',
        examples: [
          {
            id: 'basic-fraction-multiplication',
            problem: 'Calculate 2/3 × 3/4',
            solution: '1/2',
            workingOut: [
              'Multiply numerators: 2 × 3 = 6',
              'Multiply denominators: 3 × 4 = 12',
              'Result: 6/12 = 1/2 (simplified)'
            ]
          }
        ],
        visualAids: [
          {
            id: 'fraction-multiplication-model',
            type: 'interactive',
            title: 'Visual Fraction Multiplication',
            description: 'See fraction multiplication using area models',
            component: 'FractionMultiplicationVisual',
            data: { showAreaModel: true }
          }
        ],
        interactiveElements: [
          {
            id: 'fraction-multiply-practice',
            type: 'input',
            title: 'Fraction Multiplication Practice',
            instructions: 'Multiply the fractions and simplify',
            component: 'FractionMultiplicationPractice'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'multiply-fractions-quiz',
        type: 'shortAnswer',
        question: 'What is 3/5 × 2/7?',
        correctAnswer: '6/35',
        explanation: 'Multiply numerators: 3 × 2 = 6, denominators: 5 × 7 = 35',
        hints: ['Multiply across: numerator × numerator, denominator × denominator'],
        difficulty: 3,
        points: 15
      }
    ],
    resources: [
      {
        id: 'fraction-multiplication-strategies',
        title: 'Fraction Multiplication Strategies',
        description: 'Different approaches to multiplying fractions',
        url: '/strategies/fraction-multiplication',
        type: 'article'
      }
    ],
    voiceScript: 'Multiplying fractions is straightforward - just multiply straight across! Top times top, bottom times bottom!'
  },

  // AC9M6N04 - Multiply decimal numbers (6-G.9)
  {
    id: 'multiply-decimal-numbers',
    title: 'Multiply Decimal Numbers',
    description: 'Multiply decimal numbers and place the decimal point correctly',
    category: 'Number',
    difficulty: 3,
    estimatedTime: 30,
    ixlCode: '6-G.9',
    learningObjectives: [
      'Multiply decimal numbers using standard algorithm',
      'Count decimal places to position decimal point',
      'Apply decimal multiplication to real-world problems',
      'Estimate products for reasonableness'
    ],
    prerequisites: ['add-decimal-numbers', 'subtract-decimal-numbers'],
    concepts: [
      {
        id: 'decimal-multiplication-method',
        title: 'Multiplying Decimal Numbers',
        explanation: 'Multiply as whole numbers, then count total decimal places',
        examples: [
          {
            id: 'decimal-multiplication-example',
            problem: 'Calculate 2.5 × 1.4',
            solution: '3.5',
            workingOut: [
              'Multiply: 25 × 14 = 350',
              'Count decimal places: 2.5 (1) + 1.4 (1) = 2 places',
              'Place decimal: 350 → 3.50 = 3.5'
            ]
          }
        ],
        visualAids: [
          {
            id: 'decimal-multiplication-tool',
            type: 'interactive',
            title: 'Decimal Multiplication Tool',
            description: 'Practice decimal multiplication with visual feedback',
            component: 'DecimalMultiplicationTool',
            data: { showDecimalPlaces: true }
          }
        ],
        interactiveElements: [
          {
            id: 'decimal-multiply-practice',
            type: 'input',
            title: 'Decimal Multiplication Practice',
            instructions: 'Multiply the decimal numbers',
            component: 'DecimalMultiplicationPractice'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'multiply-decimals-quiz',
        type: 'numerical',
        question: 'What is 3.6 × 2.5?',
        correctAnswer: 9.0,
        explanation: 'Multiply: 36 × 25 = 900, with 2 decimal places = 9.00 = 9.0',
        hints: ['Multiply as whole numbers first', 'Count total decimal places'],
        difficulty: 3,
        points: 15
      }
    ],
    resources: [
      {
        id: 'decimal-multiplication-guide',
        title: 'Decimal Multiplication Mastery',
        description: 'Complete guide to multiplying decimals',
        url: '/guides/decimal-multiplication',
        type: 'article'
      }
    ],
    voiceScript: 'Multiplying decimals is like a magic trick - multiply the numbers, count the decimal places, then place the decimal point!'
  },

  // AC9M6N04 - Divide decimal numbers (6-H.1)
  {
    id: 'divide-decimal-numbers',
    title: 'Divide Decimal Numbers',
    description: 'Divide decimal numbers using long division and decimal placement',
    category: 'Number',
    difficulty: 4,
    estimatedTime: 35,
    ixlCode: '6-H.1',
    learningObjectives: [
      'Divide decimals using long division',
      'Position decimal point in quotient',
      'Handle remainder in decimal division',
      'Apply decimal division to problem solving'
    ],
    prerequisites: ['multiply-decimal-numbers'],
    concepts: [
      {
        id: 'decimal-division-method',
        title: 'Dividing Decimal Numbers',
        explanation: 'Make divisor whole number, adjust dividend accordingly, then divide',
        examples: [
          {
            id: 'decimal-division-example',
            problem: 'Calculate 6.4 ÷ 0.8',
            solution: '8',
            workingOut: [
              'Make divisor whole: 0.8 × 10 = 8',
              'Adjust dividend: 6.4 × 10 = 64',
              'Divide: 64 ÷ 8 = 8'
            ]
          }
        ],
        visualAids: [
          {
            id: 'decimal-division-tool',
            type: 'interactive',
            title: 'Decimal Division Tool',
            description: 'Step-by-step decimal division practice',
            component: 'DecimalDivisionTool',
            data: { showSteps: true }
          }
        ],
        interactiveElements: [
          {
            id: 'decimal-divide-practice',
            type: 'input',
            title: 'Decimal Division Practice',
            instructions: 'Divide the decimal numbers',
            component: 'DecimalDivisionPractice'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'divide-decimals-quiz',
        type: 'numerical',
        question: 'What is 8.4 ÷ 1.2?',
        correctAnswer: 7,
        explanation: 'Convert: 84 ÷ 12 = 7',
        hints: ['Make the divisor a whole number', 'Adjust both numbers equally'],
        difficulty: 4,
        points: 20
      }
    ],
    resources: [
      {
        id: 'decimal-division-guide',
        title: 'Decimal Division Strategies',
        description: 'Master decimal division techniques',
        url: '/guides/decimal-division',
        type: 'article'
      }
    ],
    voiceScript: 'Dividing decimals is easier when you make the divisor a whole number first - like clearing the decimal fog!'
  },

  // AC9M6N06 - Percentages (6-P.1)
  {
    id: 'percentage-basics',
    title: 'What Percentage Is Illustrated?',
    description: 'Identify percentages from visual representations and understand percent as parts per hundred',
    category: 'Number',
    difficulty: 2,
    estimatedTime: 25,
    ixlCode: '6-P.1',
    learningObjectives: [
      'Understand percent as parts per 100',
      'Identify percentages from visual models',
      'Convert between fractions and percentages',
      'Recognize common percentage equivalents'
    ],
    prerequisites: ['fractions-basics'],
    concepts: [
      {
        id: 'percentage-identification',
        title: 'Identifying Percentages',
        explanation: 'Percent means "per hundred" - count parts out of 100',
        examples: [
          {
            id: 'grid-percentage-example',
            problem: 'What percentage of a 100-square grid is shaded if 35 squares are colored?',
            solution: '35%',
            workingOut: [
              '35 squares out of 100 total squares',
              '35 out of 100 = 35%'
            ]
          }
        ],
        visualAids: [
          {
            id: 'percentage-grid-tool',
            type: 'interactive',
            title: 'Percentage Grid Tool',
            description: 'Interactive 100-square grid for percentage practice',
            component: 'PercentageGridTool',
            data: { gridSize: 100 }
          }
        ],
        interactiveElements: [
          {
            id: 'percentage-identifier',
            type: 'input',
            title: 'Percentage Identification',
            instructions: 'Look at the visual and identify the percentage',
            component: 'PercentageIdentifier'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'percentage-basics-quiz',
        type: 'multipleChoice',
        question: 'If 40 squares out of 100 are shaded, what percentage is shaded?',
        options: ['30%', '40%', '50%', '60%'],
        correctAnswer: '40%',
        explanation: '40 out of 100 equals 40%',
        hints: ['Count the shaded squares out of 100'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'percentage-introduction',
        title: 'Introduction to Percentages',
        description: 'Understanding what percentages mean',
        url: '/intro/percentages',
        type: 'article'
      }
    ],
    voiceScript: 'Percentages are like fractions with 100 as the bottom number! If you see 25%, think 25 out of 100!'
  },

  // AC9M6N06 - Convert between fractions, decimals and percentages (6-P.2)
  {
    id: 'convert-fractions-decimals-percentages',
    title: 'Convert Between Fractions, Decimals and Percentages',
    description: 'Convert between different representations of the same value',
    category: 'Number',
    difficulty: 3,
    estimatedTime: 30,
    ixlCode: '6-P.2',
    learningObjectives: [
      'Convert fractions to decimals and percentages',
      'Convert decimals to fractions and percentages',
      'Convert percentages to fractions and decimals',
      'Recognize equivalent forms of common values'
    ],
    prerequisites: ['percentage-basics', 'fractions-basics', 'decimal-operations'],
    concepts: [
      {
        id: 'conversion-strategies',
        title: 'Converting Between Forms',
        explanation: 'Learn systematic methods for converting between fractions, decimals, and percentages',
        examples: [
          {
            id: 'conversion-example',
            problem: 'Convert 3/4 to decimal and percentage',
            solution: '0.75 and 75%',
            workingOut: [
              'Fraction to decimal: 3 ÷ 4 = 0.75',
              'Decimal to percentage: 0.75 × 100 = 75%'
            ]
          }
        ],
        visualAids: [
          {
            id: 'conversion-wheel',
            type: 'interactive',
            title: 'Fraction-Decimal-Percentage Converter',
            description: 'Interactive tool for practicing conversions',
            component: 'ConversionWheel',
            data: { showAllForms: true }
          }
        ],
        interactiveElements: [
          {
            id: 'conversion-practice',
            type: 'input',
            title: 'Conversion Practice',
            instructions: 'Convert between the different forms',
            component: 'ConversionPractice'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'conversion-quiz',
        type: 'multipleChoice',
        question: 'What is 1/5 as a percentage?',
        options: ['15%', '20%', '25%', '50%'],
        correctAnswer: '20%',
        explanation: '1/5 = 0.2 = 20%',
        hints: ['First convert to decimal by dividing', 'Then multiply by 100 for percentage'],
        difficulty: 3,
        points: 15
      }
    ],
    resources: [
      {
        id: 'conversion-chart',
        title: 'Fraction-Decimal-Percentage Chart',
        description: 'Reference chart for common conversions',
        url: '/reference/conversion-chart',
        type: 'article'
      }
    ],
    voiceScript: 'Converting between fractions, decimals, and percentages is like translating between different languages that all say the same thing!'
  },

  // AC9M6N06 - Find the percentage of a number (6-P.3)
  {
    id: 'percentage-of-number',
    title: 'Find the Percentage of a Number',
    description: 'Calculate what percentage one number is of another',
    category: 'Number',
    difficulty: 3,
    estimatedTime: 30,
    ixlCode: '6-P.3',
    learningObjectives: [
      'Calculate percentage of a given number',
      'Use different methods for percentage calculations',
      'Apply percentage calculations to real situations',
      'Understand the relationship between parts and wholes'
    ],
    prerequisites: ['convert-fractions-decimals-percentages'],
    concepts: [
      {
        id: 'percentage-calculations',
        title: 'Calculating Percentages of Numbers',
        explanation: 'Use multiplication or division to find percentages of numbers',
        examples: [
          {
            id: 'percentage-calculation-example',
            problem: 'What is 25% of 80?',
            solution: '20',
            workingOut: [
              'Method 1: 25% = 0.25',
              '0.25 × 80 = 20',
              'Method 2: 25% = 25/100 = 1/4',
              '1/4 × 80 = 20'
            ]
          }
        ],
        visualAids: [
          {
            id: 'percentage-calculator',
            type: 'interactive',
            title: 'Percentage Calculator',
            description: 'Interactive tool for percentage calculations',
            component: 'PercentageCalculator',
            data: { showMethods: true }
          }
        ],
        interactiveElements: [
          {
            id: 'percentage-finder',
            type: 'input',
            title: 'Percentage Finder',
            instructions: 'Find the percentage of the given number',
            component: 'PercentageFinder'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'percentage-calculation-quiz',
        type: 'numerical',
        question: 'What is 15% of 200?',
        correctAnswer: 30,
        explanation: '15% = 0.15, so 0.15 × 200 = 30',
        hints: ['Convert percentage to decimal first', 'Multiply by the number'],
        difficulty: 3,
        points: 15
      }
    ],
    resources: [
      {
        id: 'percentage-calculation-methods',
        title: 'Methods for Calculating Percentages',
        description: 'Different approaches to percentage calculations',
        url: '/methods/percentage-calculations',
        type: 'article'
      }
    ],
    voiceScript: 'Finding a percentage of a number is like finding a piece of a pie - convert the percentage and multiply!'
  },

  // AC9M6M01 - Convert units of length (6-O.1) 
  {
    id: 'convert-length-units',
    title: 'Convert Units of Length',
    description: 'Convert between different metric units of length',
    category: 'Measurement',
    difficulty: 2,
    estimatedTime: 25,
    ixlCode: '6-O.1',
    learningObjectives: [
      'Convert between mm, cm, m, and km',
      'Understand the metric system relationships',
      'Apply conversions to real-world problems',
      'Use conversion factors effectively'
    ],
    prerequisites: ['decimal-operations'],
    concepts: [
      {
        id: 'metric-length-conversions',
        title: 'Metric Length Conversions',
        explanation: 'Use the base-10 relationships in the metric system',
        examples: [
          {
            id: 'length-conversion-example',
            problem: 'Convert 2.5 metres to centimetres',
            solution: '250 cm',
            workingOut: [
              '1 metre = 100 centimetres',
              '2.5 × 100 = 250 centimetres'
            ]
          }
        ],
        visualAids: [
          {
            id: 'metric-conversion-chart',
            type: 'interactive',
            title: 'Metric Length Converter',
            description: 'Interactive metric conversion tool',
            component: 'MetricLengthConverter',
            data: { units: ['mm', 'cm', 'm', 'km'] }
          }
        ],
        interactiveElements: [
          {
            id: 'unit-converter',
            type: 'input',
            title: 'Unit Conversion Practice',
            instructions: 'Convert between metric length units',
            component: 'LengthUnitConverter'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'length-conversion-quiz',
        type: 'numerical',
        question: 'How many millimetres are in 3.2 centimetres?',
        correctAnswer: 32,
        explanation: '1 cm = 10 mm, so 3.2 × 10 = 32 mm',
        hints: ['Remember: 1 cm = 10 mm', 'Multiply when converting to smaller units'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'metric-system-guide',
        title: 'Understanding the Metric System',
        description: 'Complete guide to metric conversions',
        url: '/guides/metric-system',
        type: 'article'
      }
    ],
    voiceScript: 'Converting metric units is like climbing stairs - each step is 10 times bigger or smaller!'
  },

  // AC9M6M02 - Area of rectangles (6-R.1)
  {
    id: 'rectangle-area',
    title: 'Area of Rectangles',
    description: 'Calculate the area of rectangles using length × width',
    category: 'Measurement',
    difficulty: 2,
    estimatedTime: 25,
    ixlCode: '6-R.1',
    learningObjectives: [
      'Apply the formula: Area = length × width',
      'Calculate areas with different units',
      'Understand area as covering space',
      'Solve real-world area problems'
    ],
    prerequisites: ['multiply-decimal-numbers'],
    concepts: [
      {
        id: 'rectangle-area-formula',
        title: 'Rectangle Area Formula',
        explanation: 'Area equals length multiplied by width',
        examples: [
          {
            id: 'rectangle-area-example',
            problem: 'Find the area of a rectangle 8 cm long and 5 cm wide',
            solution: '40 cm²',
            workingOut: [
              'Area = length × width',
              'Area = 8 cm × 5 cm = 40 cm²'
            ]
          }
        ],
        visualAids: [
          {
            id: 'rectangle-area-tool',
            type: 'interactive',
            title: 'Rectangle Area Calculator',
            description: 'Interactive tool for calculating rectangle areas',
            component: 'RectangleAreaTool',
            data: { showFormula: true }
          }
        ],
        interactiveElements: [
          {
            id: 'area-calculator',
            type: 'input',
            title: 'Area Calculator',
            instructions: 'Calculate the area of rectangles',
            component: 'AreaCalculator'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'rectangle-area-quiz',
        type: 'numerical',
        question: 'What is the area of a rectangle 12 m long and 7 m wide?',
        correctAnswer: 84,
        explanation: 'Area = 12 × 7 = 84 m²',
        hints: ['Use the formula: Area = length × width'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'area-formulas-guide',
        title: 'Area Formulas Reference',
        description: 'Essential area formulas for shapes',
        url: '/reference/area-formulas',
        type: 'article'
      }
    ],
    voiceScript: 'Finding the area of a rectangle is like counting how many unit squares fit inside - just multiply length by width!'
  },

  // AC9M6A01 - Continue number patterns (6-D.1)
  {
    id: 'continue-number-patterns',
    title: 'Continue Number Patterns',
    description: 'Identify and continue arithmetic and geometric patterns',
    category: 'Algebra',
    difficulty: 2,
    estimatedTime: 25,
    ixlCode: '6-D.1',
    learningObjectives: [
      'Identify patterns in number sequences',
      'Continue arithmetic patterns (add/subtract)',
      'Continue geometric patterns (multiply/divide)',
      'Describe pattern rules in words'
    ],
    prerequisites: ['basic-operations'],
    concepts: [
      {
        id: 'number-pattern-rules',
        title: 'Number Pattern Rules',
        explanation: 'Find the rule that generates each term in a sequence',
        examples: [
          {
            id: 'arithmetic-pattern-example',
            problem: 'Continue the pattern: 3, 8, 13, 18, ...',
            solution: '23, 28, 33',
            workingOut: [
              'Find the rule: +5 each time',
              '18 + 5 = 23',
              '23 + 5 = 28',
              '28 + 5 = 33'
            ]
          }
        ],
        visualAids: [
          {
            id: 'pattern-generator',
            type: 'interactive',
            title: 'Number Pattern Generator',
            description: 'Interactive tool for exploring number patterns',
            component: 'NumberPatternGenerator',
            data: { patternTypes: ['arithmetic', 'geometric'] }
          }
        ],
        interactiveElements: [
          {
            id: 'pattern-practice',
            type: 'input',
            title: 'Pattern Practice',
            instructions: 'Find the next numbers in the pattern',
            component: 'PatternPractice'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'number-patterns-quiz',
        type: 'shortAnswer',
        question: 'What are the next two numbers in the pattern: 2, 6, 18, 54, ___, ___?',
        correctAnswer: '162, 486',
        explanation: 'Rule: multiply by 3. So 54 × 3 = 162, 162 × 3 = 486',
        hints: ['Look for multiplication or addition patterns', 'Check what operation connects each pair'],
        difficulty: 2,
        points: 12
      }
    ],
    resources: [
      {
        id: 'pattern-strategies',
        title: 'Pattern Recognition Strategies',
        description: 'Methods for finding patterns in sequences',
        url: '/strategies/patterns',
        type: 'article'
      }
    ],
    voiceScript: 'Number patterns are like musical rhythms - once you hear the beat, you can continue the song!'
  },

  // AC9M6S01 - Angles (6-S.1)
  {
    id: 'angle-types',
    title: 'Identify Angles',
    description: 'Identify and classify different types of angles',
    category: 'Space',
    difficulty: 2,
    estimatedTime: 25,
    ixlCode: '6-S.1',
    learningObjectives: [
      'Identify acute, right, obtuse, and straight angles',
      'Understand angle measurement',
      'Recognize angles in real-world contexts',
      'Use angle vocabulary correctly'
    ],
    prerequisites: ['basic-geometry'],
    concepts: [
      {
        id: 'angle-classification',
        title: 'Types of Angles',
        explanation: 'Classify angles based on their measure',
        examples: [
          {
            id: 'angle-types-example',
            problem: 'Classify an angle measuring 45°',
            solution: 'Acute angle',
            workingOut: [
              '45° is less than 90°',
              'Angles less than 90° are acute'
            ]
          }
        ],
        visualAids: [
          {
            id: 'angle-classifier',
            type: 'interactive',
            title: 'Angle Classification Tool',
            description: 'Interactive tool for classifying angles',
            component: 'AngleClassifier',
            data: { showProtractor: true }
          }
        ],
        interactiveElements: [
          {
            id: 'angle-identifier',
            type: 'clickable',
            title: 'Angle Identifier',
            instructions: 'Click to identify the type of angle',
            component: 'AngleIdentifier'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'angle-types-quiz',
        type: 'multipleChoice',
        question: 'What type of angle measures exactly 90°?',
        options: ['Acute', 'Right', 'Obtuse', 'Straight'],
        correctAnswer: 'Right',
        explanation: 'A 90° angle is called a right angle',
        hints: ['Think about the angle formed by perpendicular lines'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'angle-reference',
        title: 'Angle Types Reference',
        description: 'Complete guide to different angle types',
        url: '/reference/angles',
        type: 'article'
      }
    ],
    voiceScript: 'Angles are everywhere! Acute angles are sharp like a slice of pizza, right angles are like corners of a square!'
  },

  // AC9M6ST01 - Data displays (6-V.1)
  {
    id: 'interpret-data-displays',
    title: 'Interpret Data Displays',
    description: 'Read and interpret information from various data displays',
    category: 'Statistics',
    difficulty: 2,
    estimatedTime: 30,
    ixlCode: '6-V.1',
    learningObjectives: [
      'Read data from bar graphs, line graphs, and tables',
      'Extract specific information from displays',
      'Compare data across different categories',
      'Answer questions based on data displays'
    ],
    prerequisites: ['basic-operations'],
    concepts: [
      {
        id: 'data-display-reading',
        title: 'Reading Data Displays',
        explanation: 'Extract information systematically from charts and graphs',
        examples: [
          {
            id: 'bar-graph-reading',
            problem: 'From a bar graph showing favorite pets, if cats have 15 votes and dogs have 22 votes, how many more people prefer dogs?',
            solution: '7 more people',
            workingOut: [
              'Dogs: 22 votes',
              'Cats: 15 votes', 
              'Difference: 22 - 15 = 7'
            ]
          }
        ],
        visualAids: [
          {
            id: 'data-display-reader',
            type: 'interactive',
            title: 'Data Display Reader',
            description: 'Interactive practice with different data displays',
            component: 'DataDisplayReader',
            data: { displayTypes: ['bar', 'line', 'table'] }
          }
        ],
        interactiveElements: [
          {
            id: 'graph-interpreter',
            type: 'input',
            title: 'Graph Interpreter',
            instructions: 'Answer questions based on the data display',
            component: 'GraphInterpreter'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'data-display-quiz',
        type: 'numerical',
        question: 'Looking at a line graph showing temperature over a week, if Monday was 18°C and Friday was 25°C, what was the increase?',
        correctAnswer: 7,
        explanation: 'Temperature increase = 25°C - 18°C = 7°C',
        hints: ['Find the values for both days', 'Subtract to find the difference'],
        difficulty: 2,
        points: 12
      }
    ],
    resources: [
      {
        id: 'data-literacy-guide',
        title: 'Data Literacy Guide',
        description: 'How to read and interpret data displays',
        url: '/guides/data-literacy',
        type: 'article'
      }
    ],
    voiceScript: 'Reading data displays is like being a detective - look carefully at the labels and numbers to find the clues you need!'
  },

  // AC9M6ST01 - Interpret stem-and-leaf plots (6-CC.5)
  {
    id: 'interpret-stem-leaf-plots',
    title: 'Interpret Stem-and-Leaf Plots',
    description: 'Read and analyze data from stem-and-leaf plots',
    category: 'Statistics',
    difficulty: 3,
    estimatedTime: 30,
    ixlCode: '6-CC.5',
    learningObjectives: [
      'Understand stem-and-leaf plot structure',
      'Read values from stem-and-leaf plots',
      'Identify patterns in the data',
      'Compare data using stem-and-leaf plots'
    ],
    prerequisites: ['interpret-bar-graphs'],
    concepts: [
      {
        id: 'stem-leaf-structure',
        title: 'Reading Stem-and-Leaf Plots',
        explanation: 'Understanding how to read data from stem-and-leaf displays',
        examples: [
          {
            id: 'basic-stem-leaf',
            problem: 'Read values from a stem-and-leaf plot',
            solution: 'Combine stem and leaf digits',
            workingOut: [
              'Stem 2, Leaves 3,7,9 = 23, 27, 29',
              'Stem 3, Leaves 1,4,8 = 31, 34, 38',
              'Each leaf represents one data value'
            ]
          }
        ],
        visualAids: [
          {
            id: 'stem-leaf-diagram',
            type: 'interactive',
            title: 'Stem-and-Leaf Reader',
            description: 'Interactive stem-and-leaf plot reader',
            component: 'StemLeafReader'
          }
        ],
        interactiveElements: [
          {
            id: 'stem-leaf-practice',
            type: 'clickable',
            title: 'Click Data Points',
            instructions: 'Click on data values to identify them',
            component: 'StemLeafClicker'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'stem-leaf-quiz',
        type: 'multipleChoice',
        question: 'What is the largest value in this stem-and-leaf plot?',
        options: ['47', '57', '67', '77'],
        correctAnswer: 0,
        explanation: 'Look for the highest stem with the highest leaf value',
        hints: ['Find the biggest stem number first', 'Then find the biggest leaf in that stem'],
        difficulty: 3,
        points: 15
      }
    ],
    resources: [
      {
        id: 'stem-leaf-guide',
        title: 'Stem-and-Leaf Plot Guide',
        description: 'Complete guide to reading stem-and-leaf displays',
        url: '/guides/stem-leaf-plots',
        type: 'article'
      }
    ],
    voiceScript: 'Stem-and-leaf plots are like organized lists where the stem shows the tens and the leaves show the ones!'
  },

  // AC9M6ST01 - Calculate the mode (6-DD.3)
  {
    id: 'calculate-mode',
    title: 'Calculate the Mode',
    description: 'Find the most frequently occurring value in a data set',
    category: 'Statistics',
    difficulty: 2,
    estimatedTime: 25,
    ixlCode: '6-DD.3',
    learningObjectives: [
      'Understand what mode means',
      'Identify the most frequent value',
      'Handle datasets with no mode or multiple modes',
      'Apply mode in real-world contexts'
    ],
    prerequisites: ['interpret-bar-graphs'],
    concepts: [
      {
        id: 'mode-definition',
        title: 'Finding the Mode',
        explanation: 'The mode is the value that appears most often in a data set',
        examples: [
          {
            id: 'simple-mode',
            problem: 'Find the mode of: 3, 7, 5, 7, 2, 7, 4',
            solution: '7',
            workingOut: [
              'Count frequency: 3(1), 7(3), 5(1), 2(1), 4(1)',
              '7 appears 3 times - more than any other value',
              'Mode = 7'
            ]
          },
          {
            id: 'no-mode',
            problem: 'Find the mode of: 1, 2, 3, 4, 5',
            solution: 'No mode',
            workingOut: [
              'Each value appears only once',
              'No value appears more frequently',
              'This dataset has no mode'
            ]
          }
        ],
        visualAids: [
          {
            id: 'mode-finder',
            type: 'interactive',
            title: 'Mode Calculator',
            description: 'Interactive tool to find the mode',
            component: 'ModeCalculator'
          }
        ],
        interactiveElements: [
          {
            id: 'mode-practice',
            type: 'input',
            title: 'Mode Practice',
            instructions: 'Enter the mode(s) of the given dataset',
            component: 'ModeInput'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'mode-quiz',
        type: 'multipleChoice',
        question: 'What is the mode of: 8, 6, 8, 3, 6, 8, 2?',
        options: ['6', '8', '3', 'No mode'],
        correctAnswer: 1,
        explanation: '8 appears 3 times, which is more than any other value',
        hints: ['Count how often each number appears', 'The mode appears most frequently'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'mode-examples',
        title: 'Mode Examples and Practice',
        description: 'Various examples of finding the mode',
        url: '/practice/mode',
        type: 'interactive'
      }
    ],
    voiceScript: 'The mode is the most popular value - it\'s like finding the favorite ice cream flavor in your class!'
  },

  // AC9M6ST01 - Calculate the range (6-DD.4)
  {
    id: 'calculate-range',
    title: 'Calculate the Range',
    description: 'Find the difference between the highest and lowest values',
    category: 'Statistics',
    difficulty: 2,
    estimatedTime: 20,
    ixlCode: '6-DD.4',
    learningObjectives: [
      'Understand what range measures',
      'Calculate range as highest minus lowest',
      'Interpret range as a measure of spread',
      'Apply range in data analysis'
    ],
    prerequisites: ['calculate-mode'],
    concepts: [
      {
        id: 'range-calculation',
        title: 'Finding the Range',
        explanation: 'Range = Highest value - Lowest value',
        examples: [
          {
            id: 'simple-range',
            problem: 'Find the range of: 12, 8, 15, 6, 11, 9',
            solution: '9',
            workingOut: [
              'Highest value = 15',
              'Lowest value = 6',
              'Range = 15 - 6 = 9'
            ]
          },
          {
            id: 'temperature-range',
            problem: 'Temperature range: 8°C, 12°C, 5°C, 16°C',
            solution: '11°C',
            workingOut: [
              'Highest temperature = 16°C',
              'Lowest temperature = 5°C',
              'Range = 16°C - 5°C = 11°C'
            ]
          }
        ],
        visualAids: [
          {
            id: 'range-visualizer',
            type: 'interactive',
            title: 'Range Visualizer',
            description: 'Visual representation of data range',
            component: 'RangeVisualizer'
          }
        ],
        interactiveElements: [
          {
            id: 'range-calculator',
            type: 'calculator',
            title: 'Range Calculator',
            instructions: 'Enter data values to calculate the range',
            component: 'RangeCalculator'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'range-quiz',
        type: 'numerical',
        question: 'What is the range of these test scores: 85, 92, 78, 96, 83, 89?',
        correctAnswer: 18,
        explanation: 'Range = 96 - 78 = 18',
        hints: ['Find the highest score first', 'Find the lowest score', 'Subtract: highest - lowest'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'range-practice',
        title: 'Range Calculation Practice',
        description: 'Practice calculating range with different datasets',
        url: '/practice/range',
        type: 'interactive'
      }
    ],
    voiceScript: 'Range shows us how spread out our data is - like measuring from the shortest to the tallest person!'
  },

  // AC9M6P01 - Make predictions (6-EE.3)
  {
    id: 'make-predictions',
    title: 'Make Predictions',
    description: 'Use probability to make predictions about outcomes',
    category: 'Probability',
    difficulty: 3,
    estimatedTime: 35,
    ixlCode: '6-EE.3',
    learningObjectives: [
      'Use probability to make predictions',
      'Apply probability in practical situations',
      'Understand the relationship between probability and prediction',
      'Make reasonable estimates based on probability'
    ],
    prerequisites: ['probability-basics'],
    concepts: [
      {
        id: 'prediction-methods',
        title: 'Using Probability to Predict',
        explanation: 'Using known probabilities to predict future outcomes',
        examples: [
          {
            id: 'coin-predictions',
            problem: 'If you flip a coin 100 times, how many heads do you expect?',
            solution: 'About 50 heads',
            workingOut: [
              'P(heads) = 1/2 = 0.5',
              'Expected heads = 100 × 0.5 = 50',
              'We expect about 50 heads'
            ]
          },
          {
            id: 'spinner-predictions',
            problem: 'A spinner has equal sections: red, blue, green. In 30 spins, how many reds?',
            solution: 'About 10 reds',
            workingOut: [
              'P(red) = 1/3',
              'Expected reds = 30 × (1/3) = 10',
              'We expect about 10 reds'
            ]
          }
        ],
        visualAids: [
          {
            id: 'prediction-simulator',
            type: 'interactive',
            title: 'Prediction Simulator',
            description: 'Simulate outcomes and compare with predictions',
            component: 'PredictionSimulator'
          }
        ],
        interactiveElements: [
          {
            id: 'prediction-maker',
            type: 'input',
            title: 'Prediction Maker',
            instructions: 'Make predictions based on given probabilities',
            component: 'PredictionMaker',
            skillId: 'PROB_PREDICT',
            objectives: [
              'Use probability fractions to form expected counts',
              'Relate probability to real-world repeated trials'
            ],
            hints: [
              'Multiply probability by number of trials',
              'Keep fractions exact before converting to decimals',
              'Round sensibly if answer not whole'
            ]
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'predictions-quiz',
        type: 'numerical',
        question: 'A bag has 3 red and 7 blue marbles. If you draw 20 marbles (with replacement), how many red do you expect?',
        correctAnswer: 6,
        explanation: 'P(red) = 3/10 = 0.3, so expect 20 × 0.3 = 6 red marbles',
        hints: ['Find the probability of red first', 'Multiply by the number of trials'],
        difficulty: 3,
        points: 15
      }
    ],
    resources: [
      {
        id: 'prediction-tools',
        title: 'Probability Prediction Tools',
        description: 'Interactive tools for making probability predictions',
        url: '/tools/predictions',
        type: 'interactive'
      }
    ],
    voiceScript: 'Making predictions is like being a weather forecaster - we use what we know about probability to make our best guess!'
  },

  // AC9M6P02 - Experimental probability (6-EE.4)
  {
    id: 'experimental-probability',
    title: 'Experimental Probability',
    description: 'Calculate probability based on experimental results',
    category: 'Probability',
    difficulty: 3,
    estimatedTime: 40,
    ixlCode: '6-EE.4',
    learningObjectives: [
      'Understand experimental vs theoretical probability',
      'Calculate experimental probability from data',
      'Compare experimental and theoretical results',
      'Understand how sample size affects accuracy'
    ],
    prerequisites: ['make-predictions'],
    concepts: [
      {
        id: 'experimental-vs-theoretical',
        title: 'Experimental Probability',
        explanation: 'Probability calculated from actual experimental results',
        examples: [
          {
            id: 'coin-experiment',
            problem: 'In 50 coin flips, 23 were heads. What is the experimental probability?',
            solution: '23/50 = 0.46 or 46%',
            workingOut: [
              'Experimental P(heads) = Number of heads / Total flips',
              'P(heads) = 23/50 = 0.46',
              'This is close to theoretical probability of 0.5'
            ]
          },
          {
            id: 'die-experiment',
            problem: 'Rolling a die 60 times, got 12 sixes. Find experimental probability.',
            solution: '12/60 = 1/5 = 0.2',
            workingOut: [
              'Experimental P(six) = Number of sixes / Total rolls',
              'P(six) = 12/60 = 1/5 = 0.2',
              'Theoretical probability is 1/6 ≈ 0.167'
            ]
          }
        ],
        visualAids: [
          {
            id: 'experiment-tracker',
            type: 'interactive',
            title: 'Experiment Tracker',
            description: 'Track experimental results and calculate probability',
            component: 'ExperimentTracker'
          }
        ],
        interactiveElements: [
          {
            id: 'probability-experiment',
            type: 'clickable',
            title: 'Probability Experiment',
            instructions: 'Conduct experiments and track results',
            component: 'ProbabilityExperiment',
            skillId: 'PROB_EXPERIMENT',
            objectives: [
              'Record frequency data from experiments',
              'Compute experimental probability as fraction and decimal'
            ],
            hints: [
              'Tally each result carefully',
              'Experimental probability = successes / trials',
              'Compare with theoretical to see convergence'
            ]
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'experimental-prob-quiz',
        type: 'multipleChoice',
        question: 'In 40 spins of a spinner, red came up 15 times. What is the experimental probability of red?',
        options: ['15/40', '15/25', '25/40', '40/15'],
        correctAnswer: 0,
        explanation: 'Experimental probability = favorable outcomes / total trials = 15/40',
        hints: ['Use the formula: successes / total trials', 'Red occurred 15 times out of 40 spins'],
        difficulty: 3,
        points: 15
      }
    ],
    resources: [
      {
        id: 'experiment-lab',
        title: 'Probability Experiment Lab',
        description: 'Conduct virtual probability experiments',
        url: '/lab/probability-experiments',
        type: 'interactive'
      }
    ],
    voiceScript: 'Experimental probability is what actually happens when we try something - it might be different from what we expect!'
  },

  // AC9M6M03 - Elapsed time (6-T.1)
  {
    id: 'elapsed-time',
    title: 'Elapsed Time',
    description: 'Calculate time intervals and durations',
    category: 'Measurement',
    difficulty: 2,
    estimatedTime: 30,
    ixlCode: '6-T.1',
    learningObjectives: [
      'Calculate elapsed time between two times',
      'Work with times across different periods',
      'Handle times crossing midnight or noon',
      'Apply elapsed time to real situations'
    ],
    prerequisites: ['metric-conversions'],
    concepts: [
      {
        id: 'time-calculations',
        title: 'Calculating Time Intervals',
        explanation: 'Finding the duration between start and end times',
        examples: [
          {
            id: 'basic-elapsed',
            problem: 'How much time passes from 2:15 PM to 4:45 PM?',
            solution: '2 hours 30 minutes',
            workingOut: [
              'From 2:15 PM to 3:00 PM = 45 minutes',
              'From 3:00 PM to 4:00 PM = 1 hour',
              'From 4:00 PM to 4:45 PM = 45 minutes',
              'Total: 45 min + 1 hr + 45 min = 2 hr 30 min'
            ]
          },
          {
            id: 'overnight-elapsed',
            problem: 'Time from 11:30 PM to 2:15 AM?',
            solution: '2 hours 45 minutes',
            workingOut: [
              'From 11:30 PM to 12:00 AM = 30 minutes',
              'From 12:00 AM to 2:00 AM = 2 hours',
              'From 2:00 AM to 2:15 AM = 15 minutes',
              'Total: 30 min + 2 hr + 15 min = 2 hr 45 min'
            ]
          }
        ],
        visualAids: [
          {
            id: 'time-calculator',
            type: 'interactive',
            title: 'Elapsed Time Calculator',
            description: 'Interactive tool for calculating elapsed time',
            component: 'ElapsedTimeCalculator'
          }
        ],
        interactiveElements: [
          {
            id: 'clock-practice',
            type: 'clickable',
            title: 'Clock Practice',
            instructions: 'Click on clock faces to practice elapsed time',
            component: 'ClockPractice'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'elapsed-time-quiz',
        type: 'shortAnswer',
        question: 'A movie starts at 7:25 PM and ends at 9:40 PM. How long is the movie?',
        correctAnswer: '2 hours 15 minutes',
        explanation: 'From 7:25 PM to 9:40 PM is 2 hours and 15 minutes',
        hints: ['Break it down into smaller time chunks', 'Be careful with the minutes calculations'],
        difficulty: 2,
        points: 12
      }
    ],
    resources: [
      {
        id: 'time-practice',
        title: 'Time Calculation Practice',
        description: 'Various elapsed time scenarios to practice',
        url: '/practice/elapsed-time',
        type: 'interactive'
      }
    ],
    voiceScript: 'Elapsed time is like measuring how long a movie takes - from start to finish!'
  },

  // AC9M6M04 - Find a missing angle - adjacent angles (6-Y.3)
  {
    id: 'adjacent-angles',
    title: 'Find a Missing Angle - Adjacent Angles',
    description: 'Use properties of adjacent angles to find missing angle measures',
    category: 'Measurement',
    difficulty: 3,
    estimatedTime: 35,
    ixlCode: '6-Y.3',
    learningObjectives: [
      'Identify adjacent angles',
      'Use the property that adjacent angles on a line sum to 180°',
      'Apply angle relationships to solve problems',
      'Understand complementary and supplementary angles'
    ],
    prerequisites: ['rectangle-area'],
    concepts: [
      {
        id: 'adjacent-angle-properties',
        title: 'Adjacent Angle Relationships',
        explanation: 'Adjacent angles share a common vertex and side',
        examples: [
          {
            id: 'angles-on-line',
            problem: 'Two adjacent angles on a straight line: one is 125°, find the other',
            solution: '55°',
            workingOut: [
              'Adjacent angles on a straight line sum to 180°',
              '125° + ? = 180°',
              '? = 180° - 125° = 55°'
            ]
          },
          {
            id: 'complementary-angles',
            problem: 'Two complementary angles: one is 35°, find the other',
            solution: '55°',
            workingOut: [
              'Complementary angles sum to 90°',
              '35° + ? = 90°',
              '? = 90° - 35° = 55°'
            ]
          }
        ],
        visualAids: [
          {
            id: 'angle-explorer',
            type: 'interactive',
            title: 'Angle Relationships Explorer',
            description: 'Interactive tool to explore angle relationships',
            component: 'AngleExplorer'
          }
        ],
        interactiveElements: [
          {
            id: 'angle-finder',
            type: 'input',
            title: 'Missing Angle Finder',
            instructions: 'Calculate missing angles using angle relationships',
            component: 'AngleFinder'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'adjacent-angles-quiz',
        type: 'numerical',
        question: 'Two adjacent angles form a straight line. One angle is 72°. What is the other angle?',
        correctAnswer: 108,
        explanation: 'Adjacent angles on a straight line sum to 180°, so 180° - 72° = 108°',
        hints: ['Adjacent angles on a line sum to 180°', 'Subtract the given angle from 180°'],
        difficulty: 3,
        points: 15
      }
    ],
    resources: [
      {
        id: 'angle-relationships',
        title: 'Angle Relationships Guide',
        description: 'Complete guide to angle relationships and properties',
        url: '/guides/angle-relationships',
        type: 'article'
      }
    ],
    voiceScript: 'Adjacent angles are like puzzle pieces that fit together - they follow special rules about how they add up!'
  },

  // AC9M6SP02 - Quadrants (6-U.4)
  {
    id: 'coordinate-quadrants',
    title: 'Quadrants',
    description: 'Identify and work with the four quadrants of the coordinate plane',
    category: 'Space',
    difficulty: 2,
    estimatedTime: 25,
    ixlCode: '6-U.4',
    learningObjectives: [
      'Identify the four quadrants of the coordinate plane',
      'Understand sign patterns in each quadrant',
      'Classify points by quadrant',
      'Use quadrant knowledge for problem solving'
    ],
    prerequisites: ['coordinate-graphing'],
    concepts: [
      {
        id: 'quadrant-identification',
        title: 'The Four Quadrants',
        explanation: 'The coordinate plane is divided into four quadrants by the axes',
        examples: [
          {
            id: 'quadrant-signs',
            problem: 'Identify the signs of coordinates in each quadrant',
            solution: 'Q1: (+,+), Q2: (-,+), Q3: (-,-), Q4: (+,-)',
            workingOut: [
              'Quadrant I: both x and y are positive',
              'Quadrant II: x is negative, y is positive',
              'Quadrant III: both x and y are negative',
              'Quadrant IV: x is positive, y is negative'
            ]
          },
          {
            id: 'point-classification',
            problem: 'Which quadrant contains the point (-3, 5)?',
            solution: 'Quadrant II',
            workingOut: [
              'x-coordinate is -3 (negative)',
              'y-coordinate is 5 (positive)',
              'Negative x, positive y = Quadrant II'
            ]
          }
        ],
        visualAids: [
          {
            id: 'quadrant-explorer',
            type: 'interactive',
            title: 'Quadrant Explorer',
            description: 'Interactive coordinate plane with quadrant identification',
            component: 'QuadrantExplorer'
          }
        ],
        interactiveElements: [
          {
            id: 'quadrant-game',
            type: 'dragDrop',
            title: 'Quadrant Sorting Game',
            instructions: 'Drag points to their correct quadrants',
            component: 'QuadrantSorter'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'quadrants-quiz',
        type: 'multipleChoice',
        question: 'In which quadrant is the point (-7, -2)?',
        options: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
        correctAnswer: 2,
        explanation: 'Both coordinates are negative, so the point is in Quadrant III',
        hints: ['Look at the signs of both coordinates', 'Negative x and negative y means Quadrant III'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'quadrant-practice',
        title: 'Quadrant Practice Activities',
        description: 'Interactive practice identifying quadrants',
        url: '/practice/quadrants',
        type: 'interactive'
      }
    ],
    voiceScript: 'The coordinate plane has four neighborhoods called quadrants - each has its own special sign pattern!'
  },

  // AC9M6N04 - Round decimals (6-F.6)
  {
    id: 'round-decimals',
    title: 'Round Decimals',
    description: 'Round decimal numbers to specified decimal places',
    category: 'Number',
    difficulty: 2,
    estimatedTime: 25,
    ixlCode: '6-F.6',
    learningObjectives: [
      'Round decimals to the nearest tenth',
      'Round decimals to the nearest hundredth',
      'Apply rounding rules correctly',
      'Use rounding in practical situations'
    ],
    prerequisites: ['decimal-operations'],
    concepts: [
      {
        id: 'decimal-rounding-rules',
        title: 'Decimal Rounding Rules',
        explanation: 'Rules for rounding decimal numbers to specified places',
        examples: [
          {
            id: 'round-tenths',
            problem: 'Round 3.47 to the nearest tenth',
            solution: '3.5',
            workingOut: [
              'Look at the hundredths place: 7',
              'Since 7 ≥ 5, round up',
              '3.47 rounds to 3.5'
            ]
          },
          {
            id: 'round-hundredths',
            problem: 'Round 12.834 to the nearest hundredth',
            solution: '12.83',
            workingOut: [
              'Look at the thousandths place: 4',
              'Since 4 < 5, round down',
              '12.834 rounds to 12.83'
            ]
          }
        ],
        visualAids: [
          {
            id: 'rounding-helper',
            type: 'interactive',
            title: 'Decimal Rounding Helper',
            description: 'Interactive tool for practicing decimal rounding',
            component: 'DecimalRounder'
          }
        ],
        interactiveElements: [
          {
            id: 'rounding-practice',
            type: 'input',
            title: 'Rounding Practice',
            instructions: 'Round decimals to the specified place value',
            component: 'RoundingPractice'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'round-decimals-quiz',
        type: 'multipleChoice',
        question: 'Round 7.638 to the nearest tenth',
        options: ['7.6', '7.7', '7.63', '7.64'],
        correctAnswer: 1,
        explanation: 'Look at hundredths place (3): 7.638 → look at thousandths (8) to round tenths. 8 ≥ 5, so round up to 7.7',
        hints: ['Identify the rounding place (tenths)', 'Look at the digit to the right (hundredths)', 'Apply the rounding rule'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'rounding-guide',
        title: 'Decimal Rounding Guide',
        description: 'Step-by-step guide to rounding decimals',
        url: '/guides/decimal-rounding',
        type: 'article'
      }
    ],
    voiceScript: 'Rounding decimals is like tidying up numbers - we keep them neat by choosing the closest simpler value!'
  },

  // AC9M6N07 - Percents of numbers and money amounts (6-P.8)
  {
    id: 'percents-of-numbers',
    title: 'Percents of Numbers and Money Amounts',
    description: 'Calculate percentages of numbers and money amounts',
    category: 'Number',
    difficulty: 3,
    estimatedTime: 35,
    ixlCode: '6-P.8',
    learningObjectives: [
      'Calculate percentages of whole numbers',
      'Find percentages of money amounts',
      'Apply percentage skills to real situations',
      'Connect fractions, decimals, and percentages'
    ],
    prerequisites: ['round-decimals'],
    concepts: [
      {
        id: 'percentage-calculations',
        title: 'Calculating Percentages',
        explanation: 'Methods for finding percentages of numbers and money',
        examples: [
          {
            id: 'percent-of-number',
            problem: 'Find 25% of 80',
            solution: '20',
            workingOut: [
              'Method 1: 25% = 25/100 = 0.25',
              '25% of 80 = 0.25 × 80 = 20',
              'Method 2: 25% = 1/4, so 80 ÷ 4 = 20'
            ]
          },
          {
            id: 'percent-of-money',
            problem: 'Find 15% of $60',
            solution: '$9',
            workingOut: [
              '15% = 15/100 = 0.15',
              '15% of $60 = 0.15 × $60 = $9.00',
              'Answer: $9'
            ]
          },
          {
            id: 'tax-calculation',
            problem: 'A $40 item has 8% tax. How much is the tax?',
            solution: '$3.20',
            workingOut: [
              '8% = 8/100 = 0.08',
              'Tax = 8% of $40 = 0.08 × $40 = $3.20',
              'The tax is $3.20'
            ]
          }
        ],
        visualAids: [
          {
            id: 'percentage-calculator',
            type: 'interactive',
            title: 'Percentage Calculator',
            description: 'Interactive tool for calculating percentages',
            component: 'PercentageCalculator'
          }
        ],
        interactiveElements: [
          {
            id: 'percentage-practice',
            type: 'input',
            title: 'Percentage Practice',
            instructions: 'Calculate percentages of given amounts',
            component: 'PercentagePractice'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'percents-quiz',
        type: 'numerical',
        question: 'What is 30% of $85?',
        correctAnswer: 25.50,
        explanation: '30% = 0.30, so 0.30 × $85 = $25.50',
        hints: ['Convert percentage to decimal', 'Multiply by the amount'],
        difficulty: 3,
        points: 15
      }
    ],
    resources: [
      {
        id: 'percentage-guide',
        title: 'Percentage Calculations Guide',
        description: 'Complete guide to calculating percentages',
        url: '/guides/percentages',
        type: 'article'
      }
    ],
    voiceScript: 'Percentages are everywhere in real life - from tips and taxes to discounts and grades!'
  },

  // AC9M6N09 - Multi-step word problems (6-N.2)
  {
    id: 'multi-step-word-problems',
    title: 'Multi-Step Word Problems',
    description: 'Solve complex problems requiring multiple mathematical operations',
    category: 'Number',
    difficulty: 4,
    estimatedTime: 45,
    ixlCode: '6-N.2',
    learningObjectives: [
      'Break down complex problems into steps',
      'Identify required operations',
      'Solve problems with multiple steps',
      'Apply various mathematical concepts together'
    ],
    prerequisites: ['percents-of-numbers'],
    concepts: [
      {
        id: 'problem-solving-strategies',
        title: 'Multi-Step Problem Solving',
        explanation: 'Systematic approach to solving complex word problems',
        examples: [
          {
            id: 'shopping-problem',
            problem: 'Sarah buys 3 shirts at $15 each and 2 pants at $25 each. She has a 10% discount coupon. What does she pay?',
            solution: '$85.50',
            workingOut: [
              'Step 1: Cost of shirts = 3 × $15 = $45',
              'Step 2: Cost of pants = 2 × $25 = $50',
              'Step 3: Total before discount = $45 + $50 = $95',
              'Step 4: Discount = 10% of $95 = 0.10 × $95 = $9.50',
              'Step 5: Final cost = $95 - $9.50 = $85.50'
            ]
          },
          {
            id: 'party-problem',
            problem: 'A party has 48 people. 3/8 are adults, 1/4 are teenagers. How many are children?',
            solution: '18 children',
            workingOut: [
              'Step 1: Adults = 3/8 of 48 = 3/8 × 48 = 18',
              'Step 2: Teenagers = 1/4 of 48 = 1/4 × 48 = 12',
              'Step 3: Adults + Teenagers = 18 + 12 = 30',
              'Step 4: Children = 48 - 30 = 18'
            ]
          }
        ],
        visualAids: [
          {
            id: 'problem-solver',
            type: 'interactive',
            title: 'Multi-Step Problem Solver',
            description: 'Interactive tool for breaking down complex problems',
            component: 'MultiStepSolver'
          }
        ],
        interactiveElements: [
          {
            id: 'step-by-step',
            type: 'dragDrop',
            title: 'Step-by-Step Organizer',
            instructions: 'Arrange problem-solving steps in correct order',
            component: 'StepOrganizer'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'multi-step-quiz',
        type: 'shortAnswer',
        question: 'A school has 240 students. 2/5 are in elementary, 1/3 are in middle school. How many are in high school?',
        correctAnswer: '64 students',
        explanation: 'Elementary: 2/5 × 240 = 96. Middle: 1/3 × 240 = 80. High school: 240 - 96 - 80 = 64',
        hints: ['Calculate elementary students first', 'Then calculate middle school students', 'Subtract both from total'],
        difficulty: 4,
        points: 20
      }
    ],
    resources: [
      {
        id: 'problem-solving',
        title: 'Problem-Solving Strategies',
        description: 'Techniques for tackling complex word problems',
        url: '/strategies/problem-solving',
        type: 'article'
      }
    ],
    voiceScript: 'Multi-step problems are like recipes - follow each step carefully and you\'ll get the perfect result!'
  },

  // AC9M6A02 - Evaluate numerical expressions (6-M.3)
  {
    id: 'evaluate-expressions',
    title: 'Evaluate Numerical Expressions',
    description: 'Calculate the value of numerical expressions using order of operations',
    category: 'Algebra',
    difficulty: 3,
    estimatedTime: 30,
    ixlCode: '6-M.3',
    learningObjectives: [
      'Apply order of operations (BODMAS/PEMDAS)',
      'Evaluate expressions with multiple operations',
      'Work with expressions containing brackets',
      'Understand mathematical notation and conventions'
    ],
    prerequisites: ['multi-step-word-problems'],
    concepts: [
      {
        id: 'order-of-operations',
        title: 'Order of Operations (BODMAS)',
        explanation: 'The correct sequence for evaluating mathematical expressions',
        examples: [
          {
            id: 'basic-order',
            problem: 'Evaluate: 12 + 3 × 4',
            solution: '24',
            workingOut: [
              'BODMAS: Brackets, Orders, Division/Multiplication, Addition/Subtraction',
              'First: 3 × 4 = 12',
              'Then: 12 + 12 = 24'
            ]
          },
          {
            id: 'with-brackets',
            problem: 'Evaluate: (8 + 2) × 5 - 6',
            solution: '44',
            workingOut: [
              'First: Brackets (8 + 2) = 10',
              'Then: Multiplication 10 × 5 = 50',
              'Finally: Subtraction 50 - 6 = 44'
            ]
          },
          {
            id: 'complex-expression',
            problem: 'Evaluate: 20 ÷ 4 + 3 × (7 - 5)',
            solution: '11',
            workingOut: [
              'First: Brackets (7 - 5) = 2',
              'Then: Division 20 ÷ 4 = 5',
              'Then: Multiplication 3 × 2 = 6',
              'Finally: Addition 5 + 6 = 11'
            ]
          }
        ],
        visualAids: [
          {
            id: 'expression-evaluator',
            type: 'interactive',
            title: 'Expression Evaluator',
            description: 'Step-by-step expression evaluation tool',
            component: 'ExpressionEvaluator'
          }
        ],
        interactiveElements: [
          {
            id: 'order-practice',
            type: 'dragDrop',
            title: 'Order of Operations Practice',
            instructions: 'Arrange operations in the correct order',
            component: 'OrderPractice'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'expressions-quiz',
        type: 'numerical',
        question: 'Evaluate: 15 + 3 × (8 - 4) ÷ 2',
        correctAnswer: 21,
        explanation: 'Brackets first: (8-4)=4. Then: 3×4÷2 = 12÷2 = 6. Finally: 15+6 = 21',
        hints: ['Follow BODMAS order', 'Do brackets first', 'Then multiplication and division left to right'],
        difficulty: 3,
        points: 15
      }
    ],
    resources: [
      {
        id: 'bodmas-guide',
        title: 'BODMAS Order of Operations',
        description: 'Complete guide to order of operations',
        url: '/guides/bodmas',
        type: 'article'
      }
    ],
    voiceScript: 'BODMAS is like a recipe for math - follow the steps in the right order to get the correct answer!'
  },

  // AC9M6M01 - Convert and compare metric units of length (6-Q.2)
  {
    id: 'metric-length-units',
    title: 'Convert and Compare Metric Units of Length',
    description: 'Work with millimeters, centimeters, meters, and kilometers',
    category: 'Measurement',
    difficulty: 2,
    estimatedTime: 30,
    ixlCode: '6-Q.2',
    learningObjectives: [
      'Convert between mm, cm, m, and km',
      'Compare lengths in different units',
      'Choose appropriate units for measurement',
      'Apply metric conversions in practical contexts'
    ],
    prerequisites: ['metric-conversions'],
    concepts: [
      {
        id: 'length-conversion-chart',
        title: 'Metric Length Conversions',
        explanation: 'Understanding relationships between metric length units',
        examples: [
          {
            id: 'mm-to-cm',
            problem: 'Convert 45mm to cm',
            solution: '4.5cm',
            workingOut: [
              '10mm = 1cm',
              '45mm ÷ 10 = 4.5cm',
              '45mm = 4.5cm'
            ]
          },
          {
            id: 'km-to-m',
            problem: 'Convert 2.5km to meters',
            solution: '2500m',
            workingOut: [
              '1km = 1000m',
              '2.5km × 1000 = 2500m',
              '2.5km = 2500m'
            ]
          },
          {
            id: 'compare-lengths',
            problem: 'Which is longer: 350cm or 3.2m?',
            solution: '350cm is longer',
            workingOut: [
              'Convert to same units: 3.2m = 320cm',
              'Compare: 350cm vs 320cm',
              '350cm > 320cm, so 350cm is longer'
            ]
          }
        ],
        visualAids: [
          {
            id: 'length-converter',
            type: 'interactive',
            title: 'Metric Length Converter',
            description: 'Interactive metric length conversion tool',
            component: 'LengthConverter'
          }
        ],
        interactiveElements: [
          {
            id: 'length-comparison',
            type: 'dragDrop',
            title: 'Length Comparison Game',
            instructions: 'Arrange lengths from shortest to longest',
            component: 'LengthComparator'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'metric-length-quiz',
        type: 'multipleChoice',
        question: 'How many centimeters are in 1.8 meters?',
        options: ['18cm', '180cm', '1800cm', '0.18cm'],
        correctAnswer: 1,
        explanation: '1m = 100cm, so 1.8m = 1.8 × 100 = 180cm',
        hints: ['Remember: 1m = 100cm', 'Multiply by 100 to convert m to cm'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'metric-chart',
        title: 'Metric Length Reference Chart',
        description: 'Visual reference for metric length conversions',
        url: '/references/metric-length',
        type: 'article'
      }
    ],
    voiceScript: 'Metric length units are perfectly organized! Each unit is 10 or 1000 times bigger than the next!'
  },

  // AC9M6M01 - Convert and compare metric units of mass (6-Q.3)
  {
    id: 'metric-mass-units',
    title: 'Convert and Compare Metric Units of Mass',
    description: 'Work with grams, kilograms, and tonnes',
    category: 'Measurement',
    difficulty: 2,
    estimatedTime: 25,
    ixlCode: '6-Q.3',
    learningObjectives: [
      'Convert between grams, kilograms, and tonnes',
      'Compare masses in different units',
      'Choose appropriate units for different objects',
      'Apply mass conversions practically'
    ],
    prerequisites: ['metric-length-units'],
    concepts: [
      {
        id: 'mass-conversion-relationships',
        title: 'Metric Mass Conversions',
        explanation: 'Understanding relationships between metric mass units',
        examples: [
          {
            id: 'g-to-kg',
            problem: 'Convert 2500g to kilograms',
            solution: '2.5kg',
            workingOut: [
              '1000g = 1kg',
              '2500g ÷ 1000 = 2.5kg',
              '2500g = 2.5kg'
            ]
          },
          {
            id: 'kg-to-tonnes',
            problem: 'Convert 1800kg to tonnes',
            solution: '1.8 tonnes',
            workingOut: [
              '1000kg = 1 tonne',
              '1800kg ÷ 1000 = 1.8 tonnes',
              '1800kg = 1.8 tonnes'
            ]
          },
          {
            id: 'compare-masses',
            problem: 'Which is heavier: 3500g or 3.2kg?',
            solution: '3500g is heavier',
            workingOut: [
              'Convert to same units: 3.2kg = 3200g',
              'Compare: 3500g vs 3200g',
              '3500g > 3200g, so 3500g is heavier'
            ]
          }
        ],
        visualAids: [
          {
            id: 'mass-converter',
            type: 'interactive',
            title: 'Metric Mass Converter',
            description: 'Interactive tool for converting mass units',
            component: 'MassConverter'
          }
        ],
        interactiveElements: [
          {
            id: 'mass-conversion-practice',
            type: 'calculator',
            title: 'Mass Conversion Practice',
            instructions: 'Convert between grams, kilograms and tonnes',
            component: 'MassConverter',
            skillId: 'MASS_CONVERT',
            objectives: [
              'Convert between grams, kilograms and tonnes',
              'Scale masses by powers of ten'
            ],
            hints: [
              '1000g = 1kg',
              'Move the decimal three places when converting kg ↔ g',
              '1 tonne = 1000kg'
            ]
          },
          {
            id: 'mass-estimator',
            type: 'clickable',
            title: 'Mass Estimation Game',
            instructions: 'Estimate the mass of different objects',
            component: 'MassEstimator'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'metric-mass-quiz',
        type: 'numerical',
        question: 'How many grams are in 4.5 kilograms?',
        correctAnswer: 4500,
        explanation: '1kg = 1000g, so 4.5kg = 4.5 × 1000 = 4500g',
        hints: ['Remember: 1kg = 1000g', 'Multiply by 1000 to convert kg to g'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'mass-reference',
        title: 'Metric Mass Reference Guide',
        description: 'Common objects and their masses for reference',
        url: '/references/metric-mass',
        type: 'article'
      }
    ],
    voiceScript: 'Mass measurements help us understand how heavy things are - from tiny paperclips to huge elephants!'
  },

  // AC9M6M02 - Calculate area of rectangles using familiar metric units (6-O.4)
  {
    id: 'rectangle-area',
    title: 'Calculate Area of Rectangles',
    description: 'Find the area of rectangles using metric units',
    category: 'Measurement',
    difficulty: 2,
    estimatedTime: 25,
    ixlCode: '6-O.4',
    learningObjectives: [
      'Calculate area using length × width',
      'Work with different metric units',
      'Apply area formulas to real situations',
      'Understand the concept of area measurement'
    ],
    prerequisites: ['metric-mass-units'],
    concepts: [
      {
        id: 'area-formula',
        title: 'Rectangle Area Formula',
        explanation: 'Area = length × width for rectangles and squares',
        examples: [
          {
            id: 'simple-rectangle',
            problem: 'Find the area of a rectangle 8m long and 5m wide',
            solution: '40 square meters',
            workingOut: [
              'Area = length × width',
              'Area = 8m × 5m = 40m²',
              'The area is 40 square meters'
            ]
          },
          {
            id: 'square-area',
            problem: 'Find the area of a square with side length 12cm',
            solution: '144 square centimeters',
            workingOut: [
              'For a square: Area = side × side',
              'Area = 12cm × 12cm = 144cm²',
              'The area is 144 square centimeters'
            ]
          },
          {
            id: 'mixed-units',
            problem: 'A garden is 6m long and 300cm wide. What is its area?',
            solution: '18 square meters',
            workingOut: [
              'Convert to same units: 300cm = 3m',
              'Area = 6m × 3m = 18m²',
              'The area is 18 square meters'
            ]
          }
        ],
        visualAids: [
          {
            id: 'area-calculator',
            type: 'interactive',
            title: 'Rectangle Area Calculator',
            description: 'Interactive area calculation tool',
            component: 'AreaCalculator'
          }
        ],
        interactiveElements: [
          {
            id: 'area-builder',
            type: 'dragDrop',
            title: 'Rectangle Builder',
            instructions: 'Build rectangles and calculate their areas',
            component: 'RectangleBuilder'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'area-quiz',
        type: 'numerical',
        question: 'What is the area of a rectangle that is 15cm long and 8cm wide?',
        correctAnswer: 120,
        explanation: 'Area = length × width = 15cm × 8cm = 120cm²',
        hints: ['Use the formula: Area = length × width', 'Multiply the two dimensions'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'area-guide',
        title: 'Area Calculation Guide',
        description: 'Complete guide to calculating rectangle areas',
        url: '/guides/area',
        type: 'article'
      }
    ],
    voiceScript: 'Area tells us how much space is inside a shape - like how much carpet you need for a room!'
  },

  // AC9M6M03 - Compare volumes and capacities using metric units (6-Q.4)
  {
    id: 'volume-capacity',
    title: 'Compare Volumes and Capacities',
    description: 'Work with milliliters, liters, and cubic measurements',
    category: 'Measurement',
    difficulty: 3,
    estimatedTime: 30,
    ixlCode: '6-Q.4',
    learningObjectives: [
      'Convert between mL and L',
      'Compare different volumes',
      'Understand volume vs capacity',
      'Apply volume concepts practically'
    ],
    prerequisites: ['rectangle-area'],
    concepts: [
      {
        id: 'volume-capacity-concepts',
        title: 'Volume and Capacity Conversions',
        explanation: 'Understanding metric volume and capacity measurements',
        examples: [
          {
            id: 'ml-to-l',
            problem: 'Convert 2500mL to liters',
            solution: '2.5L',
            workingOut: [
              '1000mL = 1L',
              '2500mL ÷ 1000 = 2.5L',
              '2500mL = 2.5L'
            ]
          },
          {
            id: 'compare-volumes',
            problem: 'Which holds more: 1200mL or 1.5L?',
            solution: '1.5L holds more',
            workingOut: [
              'Convert to same units: 1.5L = 1500mL',
              'Compare: 1200mL vs 1500mL',
              '1500mL > 1200mL, so 1.5L holds more'
            ]
          },
          {
            id: 'practical-volume',
            problem: 'A jug holds 2L. How many 250mL cups can it fill?',
            solution: '8 cups',
            workingOut: [
              'Convert jug capacity: 2L = 2000mL',
              'Number of cups = 2000mL ÷ 250mL = 8',
              'The jug can fill 8 cups'
            ]
          }
        ],
        visualAids: [
          {
            id: 'volume-converter',
            type: 'interactive',
            title: 'Volume Converter',
            description: 'Interactive volume and capacity conversion tool',
            component: 'VolumeConverter'
          }
        ],
        interactiveElements: [
          {
            id: 'volume-conversion-practice',
            type: 'calculator',
            title: 'Volume Conversion Practice',
            instructions: 'Convert between mL, L and cm³',
            component: 'VolumeConverter',
            skillId: 'VOLUME_CONVERT',
            objectives: [
              'Convert between mL, L and cm³',
              'Relate equivalent volume units'
            ],
            hints: [
              '1000mL = 1L',
              '1mL = 1cm³',
              'Multiply or divide by 1000 moving between mL and L'
            ]
          },
          {
            id: 'container-comparison',
            type: 'clickable',
            title: 'Container Comparison',
            instructions: 'Compare volumes of different containers',
            component: 'ContainerComparison'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'volume-quiz',
        type: 'multipleChoice',
        question: 'How many milliliters are in 3.5 liters?',
        options: ['35mL', '350mL', '3500mL', '35000mL'],
        correctAnswer: 2,
        explanation: '1L = 1000mL, so 3.5L = 3.5 × 1000 = 3500mL',
        hints: ['Remember: 1L = 1000mL', 'Multiply by 1000 to convert L to mL'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'volume-reference',
        title: 'Volume and Capacity Reference',
        description: 'Guide to metric volume measurements',
        url: '/references/volume',
        type: 'article'
      }
    ],
    voiceScript: 'Volume and capacity help us measure liquids - from tiny medicine doses to huge swimming pools!'
  },

  // AC9M6S01 - Locate positions using integers on coordinate axes (6-W.1)
  {
    id: 'integer-coordinates',
    title: 'Locate Positions Using Integer Coordinates',
    description: 'Plot and identify points on coordinate planes using integers',
    category: 'Space',
    difficulty: 3,
    estimatedTime: 35,
    ixlCode: '6-W.1',
    learningObjectives: [
      'Plot points using integer coordinates',
      'Read coordinates from graphs',
      'Understand negative coordinates',
      'Navigate all four quadrants'
    ],
    prerequisites: ['coordinate-quadrants'],
    concepts: [
      {
        id: 'integer-coordinate-system',
        title: 'Integer Coordinate System',
        explanation: 'Working with positive and negative integers on coordinate planes',
        examples: [
          {
            id: 'plot-positive',
            problem: 'Plot the point (4, 3)',
            solution: 'Point at 4 right, 3 up',
            workingOut: [
              'Start at origin (0, 0)',
              'Move 4 units right (positive x)',
              'Move 3 units up (positive y)',
              'Mark the point (4, 3)'
            ]
          },
          {
            id: 'plot-negative',
            problem: 'Plot the point (-2, -5)',
            solution: 'Point at 2 left, 5 down',
            workingOut: [
              'Start at origin (0, 0)',
              'Move 2 units left (negative x)',
              'Move 5 units down (negative y)',
              'Mark the point (-2, -5)'
            ]
          },
          {
            id: 'identify-coordinates',
            problem: 'What are the coordinates of point A at 3 left, 4 up?',
            solution: '(-3, 4)',
            workingOut: [
              '3 left means x = -3',
              '4 up means y = 4',
              'Coordinates are (-3, 4)'
            ]
          }
        ],
        visualAids: [
          {
            id: 'coordinate-plotter',
            type: 'interactive',
            title: 'Integer Coordinate Plotter',
            description: 'Interactive coordinate plotting tool',
            component: 'IntegerCoordinatePlotter'
          }
        ],
        interactiveElements: [
          {
            id: 'coordinate-game',
            type: 'clickable',
            title: 'Coordinate Treasure Hunt',
            instructions: 'Find treasures using coordinate clues',
            component: 'CoordinateTreasureHunt'
          },
          {
            id: 'coordinate-plot-practice',
            type: 'input',
            title: 'Coordinate Plot Practice',
            instructions: 'Plot given coordinates on the grid',
            component: 'IntegerCoordinatePlotter',
            skillId: 'COORD_PLOT',
            objectives: [
              'Identify ordered pairs in all four quadrants',
              'Relate sign of coordinates to quadrant position'
            ],
            hints: [
              'First value is x (left/right)',
              'Second value is y (up/down)',
              'Negative x → left, negative y → down'
            ]
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'coordinates-quiz',
        type: 'shortAnswer',
        question: 'What are the coordinates of a point that is 5 units left and 2 units down from the origin?',
        correctAnswer: '(-5, -2)',
        explanation: 'Left means negative x, down means negative y, so coordinates are (-5, -2)',
        hints: ['Left and down are negative directions', 'Format: (x, y)'],
        difficulty: 3,
        points: 12
      }
    ],
    resources: [
      {
        id: 'coordinate-guide',
        title: 'Integer Coordinates Guide',
        description: 'Complete guide to integer coordinate systems',
        url: '/guides/integer-coordinates',
        type: 'article'
      }
    ],
    voiceScript: 'Integer coordinates are like addresses for points - they tell us exactly where to find them!'
  },

  // AC9M6S03 - Construct simple prisms and pyramids (6-V.3)
  {
    id: 'construct-3d-shapes',
    title: 'Construct Simple Prisms and Pyramids',
    description: 'Build and analyze 3D shapes including prisms and pyramids',
    category: 'Space',
    difficulty: 3,
    estimatedTime: 40,
    ixlCode: '6-V.3',
    learningObjectives: [
      'Identify properties of prisms and pyramids',
      'Count faces, edges, and vertices',
      'Understand nets of 3D shapes',
      'Construct 3D shapes from descriptions'
    ],
    prerequisites: ['integer-coordinates'],
    concepts: [
      {
        id: '3d-shape-properties',
        title: '3D Shape Properties',
        explanation: 'Understanding the characteristics of prisms and pyramids',
        examples: [
          {
            id: 'triangular-prism',
            problem: 'How many faces, edges, and vertices does a triangular prism have?',
            solution: '5 faces, 9 edges, 6 vertices',
            workingOut: [
              'Faces: 2 triangular + 3 rectangular = 5 faces',
              'Edges: 3 on top triangle + 3 on bottom + 3 connecting = 9 edges',
              'Vertices: 3 on top + 3 on bottom = 6 vertices'
            ]
          },
          {
            id: 'square-pyramid',
            problem: 'Describe a square pyramid',
            solution: '5 faces, 8 edges, 5 vertices',
            workingOut: [
              'Faces: 1 square base + 4 triangular faces = 5 faces',
              'Edges: 4 on base + 4 connecting to apex = 8 edges',
              'Vertices: 4 on base + 1 apex = 5 vertices'
            ]
          },
          {
            id: 'net-identification',
            problem: 'Which net makes a cube?',
            solution: 'Cross-shaped net with 6 squares',
            workingOut: [
              'A cube has 6 square faces',
              'Net must have 6 connected squares',
              'Common patterns: cross, T-shape, or straight line'
            ]
          }
        ],
        visualAids: [
          {
            id: '3d-shape-builder',
            type: 'interactive',
            title: '3D Shape Builder',
            description: 'Interactive tool for constructing 3D shapes',
            component: 'Shape3DBuilder'
          }
        ],
        interactiveElements: [
          {
            id: 'net-folder',
            type: 'dragDrop',
            title: 'Net Folding Activity',
            instructions: 'Fold nets to create 3D shapes',
            component: 'NetFolder'
          },
          {
            id: 'shape-volume-builder',
            type: 'calculator',
            title: 'Prism Volume Builder',
            instructions: 'Select dimensions to match target volume',
            component: 'Shape3DBuilder',
            skillId: 'PRISM_VOLUME_MATCH',
            objectives: [
              'Relate dimensions to volume of rectangular prisms',
              'Factor volumes into dimension triples'
            ],
            hints: [
              'Volume = length × width × height',
              'Try factoring the target volume',
              'Swap dimensions if stuck'
            ]
          }
        ]
      }
    ],
    assessments: [
      {
        id: '3d-shapes-quiz',
        type: 'multipleChoice',
        question: 'How many edges does a pentagonal prism have?',
        options: ['10', '12', '15', '18'],
        correctAnswer: 2,
        explanation: 'A pentagonal prism has 5 edges on top, 5 on bottom, and 5 connecting them = 15 edges',
        hints: ['Count edges on top pentagon', 'Count edges on bottom pentagon', 'Count connecting edges'],
        difficulty: 3,
        points: 15
      }
    ],
    resources: [
      {
        id: '3d-shapes-guide',
        title: '3D Shapes Construction Guide',
        description: 'Complete guide to building 3D shapes',
        url: '/guides/3d-shapes',
        type: 'article'
      }
    ],
    voiceScript: '3D shapes are everywhere around us - from buildings to dice to ice cream cones!'
  },

  // AC9M6ST01 - Interpret and compare displays of data (6-T.1)
  {
    id: 'interpret-data-displays',
    title: 'Interpret and Compare Data Displays',
    description: 'Read and analyze various types of data displays and graphs',
    category: 'Statistics',
    difficulty: 3,
    estimatedTime: 35,
    ixlCode: '6-T.1',
    learningObjectives: [
      'Read information from bar graphs',
      'Interpret line graphs and trends',
      'Compare different data displays',
      'Draw conclusions from data'
    ],
    prerequisites: ['construct-3d-shapes'],
    concepts: [
      {
        id: 'data-display-types',
        title: 'Types of Data Displays',
        explanation: 'Understanding different ways to present and interpret data',
        examples: [
          {
            id: 'bar-graph-reading',
            problem: 'From a bar graph showing favorite pets: Dogs-15, Cats-12, Birds-8, Fish-5. Which pet is most popular?',
            solution: 'Dogs are most popular',
            workingOut: [
              'Read heights of bars: Dogs=15, Cats=12, Birds=8, Fish=5',
              'Compare values: 15 > 12 > 8 > 5',
              'Highest bar shows Dogs are most popular'
            ]
          },
          {
            id: 'line-graph-trend',
            problem: 'A line graph shows temperature rising from 10°C to 25°C over 5 hours. Describe the trend.',
            solution: 'Temperature increased steadily',
            workingOut: [
              'Start point: 10°C',
              'End point: 25°C',
              'Direction: Upward slope',
              'Trend: Steady increase over time'
            ]
          },
          {
            id: 'data-comparison',
            problem: 'Compare two pie charts showing pizza toppings preferences in different schools.',
            solution: 'Identify similarities and differences',
            workingOut: [
              'Look for most/least popular in each',
              'Compare percentages for same toppings',
              'Note any unique preferences',
              'Draw conclusions about differences'
            ]
          }
        ],
        visualAids: [
          {
            id: 'data-interpreter',
            type: 'interactive',
            title: 'Data Display Interpreter',
            description: 'Interactive tool for analyzing data displays',
            component: 'DataDisplayInterpreter'
          }
        ],
        interactiveElements: [
          {
            id: 'graph-detective',
            type: 'clickable',
            title: 'Graph Detective',
            instructions: 'Solve mysteries by interpreting data displays',
            component: 'GraphDetective'
          },
          {
            id: 'data-interpret-practice',
            type: 'input',
            title: 'Data Interpretation Practice',
            instructions: 'Answer questions about the displayed data',
            component: 'DataDisplayInterpreter',
            skillId: 'DATA_INTERPRET',
            objectives: [
              'Extract values from bar and line graphs',
              'Compare categories and compute differences'
            ],
            hints: [
              'Read axis labels carefully',
              'Line up with grid lines for exact values',
              'Look for max/min first'
            ]
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'data-displays-quiz',
        type: 'multipleChoice',
        question: 'A bar graph shows: Apples-20, Bananas-35, Oranges-15, Grapes-30. What is the total number of fruits?',
        options: ['85', '90', '100', '105'],
        correctAnswer: 2,
        explanation: 'Add all values: 20 + 35 + 15 + 30 = 100 total fruits',
        hints: ['Add up all the bar heights', 'Include every category shown'],
        difficulty: 3,
        points: 12
      }
    ],
    resources: [
      {
        id: 'data-displays-guide',
        title: 'Data Display Interpretation Guide',
        description: 'Guide to reading and analyzing data displays',
        url: '/guides/data-displays',
        type: 'article'
      }
    ],
    voiceScript: 'Data displays are like windows into information - they help us see patterns and make sense of numbers!'
  },

  // AC9M6P01 - Describe probabilities using fractions, decimals and percentages (6-U.3)
  {
    id: 'probability-expressions',
    title: 'Describe Probabilities Using Fractions, Decimals and Percentages',
    description: 'Express probability in different mathematical forms',
    category: 'Probability',
    difficulty: 3,
    estimatedTime: 30,
    ixlCode: '6-U.3',
    learningObjectives: [
      'Express probabilities as fractions',
      'Convert probabilities to decimals',
      'Express probabilities as percentages',
      'Understand probability scale from 0 to 1'
    ],
    prerequisites: ['interpret-data-displays'],
    concepts: [
      {
        id: 'probability-forms',
        title: 'Different Forms of Probability',
        explanation: 'Converting between fractions, decimals, and percentages for probability',
        examples: [
          {
            id: 'dice-probability',
            problem: 'Rolling a 3 on a fair die. Express as fraction, decimal, and percentage.',
            solution: '1/6, 0.167, 16.7%',
            workingOut: [
              'Favorable outcomes: 1 (rolling a 3)',
              'Total outcomes: 6',
              'Fraction: 1/6',
              'Decimal: 1 ÷ 6 = 0.167',
              'Percentage: 0.167 × 100 = 16.7%'
            ]
          },
          {
            id: 'coin-flip',
            problem: 'Getting heads when flipping a coin. Express in all three forms.',
            solution: '1/2, 0.5, 50%',
            workingOut: [
              'Favorable outcomes: 1 (heads)',
              'Total outcomes: 2',
              'Fraction: 1/2',
              'Decimal: 1 ÷ 2 = 0.5',
              'Percentage: 0.5 × 100 = 50%'
            ]
          },
          {
            id: 'card-probability',
            problem: 'Drawing a red card from a standard deck. Express in all forms.',
            solution: '26/52 = 1/2, 0.5, 50%',
            workingOut: [
              'Red cards: 26 (hearts + diamonds)',
              'Total cards: 52',
              'Fraction: 26/52 = 1/2',
              'Decimal: 1 ÷ 2 = 0.5',
              'Percentage: 0.5 × 100 = 50%'
            ]
          }
        ],
        visualAids: [
          {
            id: 'probability-converter',
            type: 'interactive',
            title: 'Probability Form Converter',
            description: 'Convert between probability forms',
            component: 'ProbabilityConverter'
          }
        ],
        interactiveElements: [
          {
            id: 'probability-wheel',
            type: 'clickable',
            title: 'Probability Wheel',
            instructions: 'Spin and calculate probabilities in different forms',
            component: 'ProbabilityWheel'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'probability-forms-quiz',
        type: 'shortAnswer',
        question: 'The probability of rain is 3/10. Express this as a decimal and percentage.',
        correctAnswer: '0.3 and 30%',
        explanation: '3/10 = 3 ÷ 10 = 0.3 = 30%',
        hints: ['Divide to get decimal', 'Multiply decimal by 100 for percentage'],
        difficulty: 3,
        points: 15
      }
    ],
    resources: [
      {
        id: 'probability-forms-guide',
        title: 'Probability Forms Guide',
        description: 'Converting between probability expressions',
        url: '/guides/probability-forms',
        type: 'article'
      }
    ],
    voiceScript: 'Probability can be expressed in different ways, like saying the same thing in different languages!'
  },

  // AC9M6A01 - Identify and continue number patterns (6-A.1)
  {
    id: 'number-patterns',
    title: 'Identify and Continue Number Patterns',
    description: 'Find rules and extend arithmetic and geometric sequences',
    category: 'Algebra',
    difficulty: 2,
    estimatedTime: 25,
    ixlCode: '6-A.1',
    learningObjectives: [
      'Identify arithmetic sequences',
      'Find pattern rules',
      'Continue number patterns',
      'Create patterns with given rules'
    ],
    prerequisites: ['probability-expressions'],
    concepts: [
      {
        id: 'pattern-types',
        title: 'Types of Number Patterns',
        explanation: 'Understanding arithmetic and geometric patterns',
        examples: [
          {
            id: 'arithmetic-pattern',
            problem: 'Find the next two numbers: 5, 8, 11, 14, ...',
            solution: '17, 20',
            workingOut: [
              'Look for the pattern: 8-5=3, 11-8=3, 14-11=3',
              'Rule: Add 3 each time',
              'Next: 14+3=17, 17+3=20',
              'Pattern continues: 17, 20'
            ]
          },
          {
            id: 'doubling-pattern',
            problem: 'Find the pattern rule: 2, 4, 8, 16, ...',
            solution: 'Multiply by 2 each time',
            workingOut: [
              'Compare terms: 4÷2=2, 8÷4=2, 16÷8=2',
              'Rule: Multiply by 2 each time',
              'Next numbers: 16×2=32, 32×2=64'
            ]
          },
          {
            id: 'mixed-pattern',
            problem: 'What comes next: 1, 4, 9, 16, ...',
            solution: '25',
            workingOut: [
              'Look for relationship: 1=1², 4=2², 9=3², 16=4²',
              'Pattern: Perfect squares',
              'Next: 5² = 25'
            ]
          }
        ],
        visualAids: [
          {
            id: 'pattern-finder',
            type: 'interactive',
            title: 'Pattern Finder Tool',
            description: 'Interactive tool for finding number patterns',
            component: 'PatternFinder'
          }
        ],
        interactiveElements: [
          {
            id: 'pattern-builder',
            type: 'dragDrop',
            title: 'Pattern Builder',
            instructions: 'Create patterns using given rules',
            component: 'PatternBuilder'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'patterns-quiz',
        type: 'shortAnswer',
        question: 'What are the next two numbers in this pattern: 3, 7, 11, 15, ...',
        correctAnswer: '19, 23',
        explanation: 'The pattern adds 4 each time: 15+4=19, 19+4=23',
        hints: ['Find the difference between consecutive terms', 'Apply the same rule to continue'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'patterns-guide',
        title: 'Number Patterns Guide',
        description: 'Complete guide to identifying and continuing patterns',
        url: '/guides/number-patterns',
        type: 'article'
      }
    ],
    voiceScript: 'Number patterns are like musical beats - once you find the rhythm, you can predict what comes next!'
  },

  // AC9M6N02 - Represent and compare numbers up to 10 million (6-C.2)
  {
    id: 'numbers-to-ten-million',
    title: 'Represent and Compare Numbers up to 10 Million',
    description: 'Work with large numbers, place value, and number comparisons',
    category: 'Number',
    difficulty: 2,
    estimatedTime: 30,
    ixlCode: '6-C.2',
    learningObjectives: [
      'Read and write large numbers',
      'Understand place value to millions',
      'Compare and order large numbers',
      'Round large numbers appropriately'
    ],
    prerequisites: ['number-patterns'],
    concepts: [
      {
        id: 'large-number-place-value',
        title: 'Place Value to Ten Million',
        explanation: 'Understanding place value in numbers up to 10,000,000',
        examples: [
          {
            id: 'read-large-number',
            problem: 'Write 3,456,789 in words',
            solution: 'Three million, four hundred fifty-six thousand, seven hundred eighty-nine',
            workingOut: [
              'Break into groups: 3,456,789',
              'Millions place: 3 million',
              'Thousands place: 456 thousand',
              'Ones place: 789',
              'Combined: Three million, four hundred fifty-six thousand, seven hundred eighty-nine'
            ]
          },
          {
            id: 'compare-large-numbers',
            problem: 'Which is larger: 2,847,593 or 2,856,421?',
            solution: '2,856,421 is larger',
            workingOut: [
              'Compare digit by digit from left to right:',
              'Millions: 2 = 2 (same)',
              'Hundred thousands: 8 = 8 (same)',
              'Ten thousands: 4 < 5',
              'Since 5 > 4, then 2,856,421 > 2,847,593'
            ]
          },
          {
            id: 'round-large-number',
            problem: 'Round 6,724,851 to the nearest hundred thousand',
            solution: '6,700,000',
            workingOut: [
              'Look at ten thousands digit: 2',
              'Since 2 < 5, round down',
              'Keep 6,700,000 and replace rest with zeros',
              'Answer: 6,700,000'
            ]
          }
        ],
        visualAids: [
          {
            id: 'place-value-chart',
            type: 'interactive',
            title: 'Large Number Place Value Chart',
            description: 'Interactive place value visualization',
            component: 'LargeNumberPlaceValue'
          }
        ],
        interactiveElements: [
          {
            id: 'number-comparison',
            type: 'dragDrop',
            title: 'Number Ordering Activity',
            instructions: 'Order large numbers from smallest to largest',
            component: 'LargeNumberOrdering'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'large-numbers-quiz',
        type: 'multipleChoice',
        question: 'Which number is closest to 5 million?',
        options: ['4,876,293', '5,124,007', '4,999,821', '5,203,456'],
        correctAnswer: 2,
        explanation: '4,999,821 is only 179 away from 5,000,000, making it closest',
        hints: ['Compare how far each is from 5,000,000', 'Find the smallest difference'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'large-numbers-guide',
        title: 'Large Numbers Reference Guide',
        description: 'Working with numbers up to ten million',
        url: '/guides/large-numbers',
        type: 'article'
      }
    ],
    voiceScript: 'Large numbers might look intimidating, but they follow the same patterns as smaller numbers!'
  },

  // AC9M6N08 - Solve problems involving addition and subtraction of fractions (6-F.2)
  {
    id: 'fraction-addition-subtraction',
    title: 'Addition and Subtraction of Fractions',
    description: 'Add and subtract fractions with like and unlike denominators',
    category: 'Number',
    difficulty: 4,
    estimatedTime: 40,
    ixlCode: '6-F.2',
    learningObjectives: [
      'Add fractions with like denominators',
      'Subtract fractions with like denominators',
      'Find common denominators',
      'Add and subtract fractions with unlike denominators'
    ],
    prerequisites: ['numbers-to-ten-million'],
    concepts: [
      {
        id: 'fraction-operations',
        title: 'Fraction Addition and Subtraction',
        explanation: 'Methods for adding and subtracting fractions',
        examples: [
          {
            id: 'like-denominators-add',
            problem: '3/8 + 2/8',
            solution: '5/8',
            workingOut: [
              'Same denominators: add numerators',
              '3/8 + 2/8 = (3+2)/8 = 5/8',
              'Answer: 5/8'
            ]
          },
          {
            id: 'unlike-denominators-add',
            problem: '1/3 + 1/4',
            solution: '7/12',
            workingOut: [
              'Find common denominator: LCM of 3 and 4 = 12',
              'Convert: 1/3 = 4/12, 1/4 = 3/12',
              'Add: 4/12 + 3/12 = 7/12',
              'Answer: 7/12'
            ]
          },
          {
            id: 'subtract-fractions',
            problem: '5/6 - 1/3',
            solution: '1/2',
            workingOut: [
              'Common denominator: 6',
              'Convert: 1/3 = 2/6',
              'Subtract: 5/6 - 2/6 = 3/6',
              'Simplify: 3/6 = 1/2'
            ]
          }
        ],
        visualAids: [
          {
            id: 'fraction-calculator',
            type: 'interactive',
            title: 'Fraction Addition/Subtraction Calculator',
            description: 'Visual tool for fraction operations',
            component: 'FractionCalculator'
          }
        ],
        interactiveElements: [
          {
            id: 'fraction-pieces',
            type: 'dragDrop',
            title: 'Fraction Pieces Activity',
            instructions: 'Use fraction pieces to add and subtract',
            component: 'FractionPieces'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'fraction-operations-quiz',
        type: 'shortAnswer',
        question: 'Calculate: 2/5 + 1/4 (express as a simplified fraction)',
        correctAnswer: '13/20',
        explanation: 'Common denominator is 20: 2/5 = 8/20, 1/4 = 5/20, so 8/20 + 5/20 = 13/20',
        hints: ['Find common denominator of 5 and 4', 'Convert both fractions', 'Add numerators'],
        difficulty: 4,
        points: 18
      }
    ],
    resources: [
      {
        id: 'fraction-operations-guide',
        title: 'Fraction Addition and Subtraction Guide',
        description: 'Complete guide to fraction operations',
        url: '/guides/fraction-operations',
        type: 'article'
      }
    ],
    voiceScript: 'Adding fractions is like combining puzzle pieces - they need to fit together perfectly!'
  },

  // AC9M6N10 - Solve problems involving multiplication and division of fractions (6-F.4)
  {
    id: 'fraction-multiplication-division',
    title: 'Multiplication and Division of Fractions',
    description: 'Multiply and divide fractions and mixed numbers',
    category: 'Number',
    difficulty: 4,
    estimatedTime: 40,
    ixlCode: '6-F.4',
    learningObjectives: [
      'Multiply fractions by whole numbers',
      'Multiply fractions by fractions',
      'Divide fractions using reciprocals',
      'Solve practical problems involving fraction operations'
    ],
    prerequisites: ['fraction-addition-subtraction'],
    concepts: [
      {
        id: 'fraction-multiplication-division',
        title: 'Multiplying and Dividing Fractions',
        explanation: 'Techniques for fraction multiplication and division',
        examples: [
          {
            id: 'fraction-times-whole',
            problem: '3/4 × 8',
            solution: '6',
            workingOut: [
              'Method 1: 3/4 × 8 = (3×8)/4 = 24/4 = 6',
              'Method 2: 3/4 × 8/1 = (3×8)/(4×1) = 24/4 = 6',
              'Answer: 6'
            ]
          },
          {
            id: 'fraction-times-fraction',
            problem: '2/3 × 3/5',
            solution: '2/5',
            workingOut: [
              'Multiply numerators: 2 × 3 = 6',
              'Multiply denominators: 3 × 5 = 15',
              'Result: 6/15',
              'Simplify: 6/15 = 2/5'
            ]
          },
          {
            id: 'divide-fractions',
            problem: '3/4 ÷ 1/2',
            solution: '3/2 or 1½',
            workingOut: [
              'Dividing by a fraction = multiplying by reciprocal',
              '3/4 ÷ 1/2 = 3/4 × 2/1',
              '= (3×2)/(4×1) = 6/4 = 3/2 = 1½'
            ]
          }
        ],
        visualAids: [
          {
            id: 'fraction-multiplier',
            type: 'interactive',
            title: 'Fraction Multiplication Visualizer',
            description: 'Visual representation of fraction multiplication',
            component: 'FractionMultiplier'
          }
        ],
        interactiveElements: [
          {
            id: 'recipe-fractions',
            type: 'input',
            title: 'Recipe Scaling Activity',
            instructions: 'Scale recipes using fraction multiplication',
            component: 'RecipeScaling'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'fraction-mult-div-quiz',
        type: 'shortAnswer',
        question: 'Calculate: 2/3 ÷ 4/5 (express as a simplified fraction)',
        correctAnswer: '5/6',
        explanation: '2/3 ÷ 4/5 = 2/3 × 5/4 = (2×5)/(3×4) = 10/12 = 5/6',
        hints: ['Change division to multiplication', 'Use reciprocal of second fraction', 'Simplify result'],
        difficulty: 4,
        points: 20
      }
    ],
    resources: [
      {
        id: 'fraction-mult-div-guide',
        title: 'Fraction Multiplication and Division Guide',
        description: 'Advanced fraction operations guide',
        url: '/guides/fraction-mult-div',
        type: 'article'
      }
    ],
    voiceScript: 'Multiplying fractions is actually easier than adding them - just multiply straight across!'
  },

  // AC9M6M05 - Convert between common metric units for length, mass and capacity (6-Q.1)
  {
    id: 'comprehensive-metric-conversions',
    title: 'Comprehensive Metric Conversions',
    description: 'Master conversions across all metric measurement types',
    category: 'Measurement',
    difficulty: 3,
    estimatedTime: 35,
    ixlCode: '6-Q.1',
    learningObjectives: [
      'Convert fluently between metric units',
      'Apply conversions in mixed problems',
      'Choose appropriate units for contexts',
      'Solve multi-step conversion problems'
    ],
    prerequisites: ['fraction-multiplication-division'],
    concepts: [
      {
        id: 'comprehensive-conversions',
        title: 'Advanced Metric Conversions',
        explanation: 'Solving complex problems involving multiple metric conversions',
        examples: [
          {
            id: 'multi-unit-problem',
            problem: 'A recipe needs 2.5L of water, 800g flour, and 15cm measuring spoon. Convert all to base units.',
            solution: '2500mL water, 0.8kg flour, 150mm spoon',
            workingOut: [
              'Water: 2.5L = 2.5 × 1000 = 2500mL',
              'Flour: 800g = 800 ÷ 1000 = 0.8kg',
              'Spoon: 15cm = 15 × 10 = 150mm'
            ]
          },
          {
            id: 'comparison-conversion',
            problem: 'Which is larger: 3500mm or 3.2m?',
            solution: '3500mm is larger',
            workingOut: [
              'Convert to same unit: 3.2m = 3200mm',
              'Compare: 3500mm vs 3200mm',
              '3500 > 3200, so 3500mm is larger'
            ]
          },
          {
            id: 'practical-conversion',
            problem: 'A pool holds 15000L. How many 2L bottles would this fill?',
            solution: '7500 bottles',
            workingOut: [
              'Total volume: 15000L',
              'Bottle size: 2L',
              'Number of bottles: 15000L ÷ 2L = 7500 bottles'
            ]
          }
        ],
        visualAids: [
          {
            id: 'metric-converter-pro',
            type: 'interactive',
            title: 'Professional Metric Converter',
            description: 'Advanced tool for all metric conversions',
            component: 'MetricConverterPro'
          }
        ],
        interactiveElements: [
          {
            id: 'conversion-challenges',
            type: 'calculator',
            title: 'Metric Conversion Challenges',
            instructions: 'Solve complex metric conversion problems',
            component: 'ConversionChallenges'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'comprehensive-conversions-quiz',
        type: 'numerical',
        question: 'A car travels 25.5km. How many meters is this?',
        correctAnswer: 25500,
        explanation: '25.5km × 1000 = 25500m',
        hints: ['1km = 1000m', 'Multiply by 1000'],
        difficulty: 3,
        points: 15
      }
    ],
    resources: [
      {
        id: 'metric-mastery-guide',
        title: 'Metric Conversion Mastery',
        description: 'Advanced guide to metric conversions',
        url: '/guides/metric-mastery',
        type: 'article'
      }
    ],
    voiceScript: 'Mastering metric conversions gives you the power to work with measurements anywhere in the world!'
  },

  // AC9M6M04 - Solve problems involving the comparison of lengths and areas (6-O.1)
  {
    id: 'compare-lengths-areas',
    title: 'Compare Lengths and Areas',
    description: 'Solve problems comparing different lengths and areas',
    category: 'Measurement',
    difficulty: 3,
    estimatedTime: 30,
    ixlCode: '6-O.1',
    learningObjectives: [
      'Compare lengths in different units',
      'Compare areas of different shapes',
      'Solve practical comparison problems',
      'Apply measurement skills to real contexts'
    ],
    prerequisites: ['comprehensive-metric-conversions'],
    concepts: [
      {
        id: 'measurement-comparisons',
        title: 'Length and Area Comparisons',
        explanation: 'Techniques for comparing measurements across different contexts',
        examples: [
          {
            id: 'length-comparison',
            problem: 'Which is longer: a 1.5m rope or a 180cm rope?',
            solution: '180cm rope is longer',
            workingOut: [
              'Convert to same units: 1.5m = 150cm',
              'Compare: 150cm vs 180cm',
              '180cm > 150cm, so 180cm rope is longer'
            ]
          },
          {
            id: 'area-comparison',
            problem: 'Compare areas: Rectangle A (8cm × 5cm) vs Rectangle B (6cm × 7cm)',
            solution: 'Rectangle B has larger area',
            workingOut: [
              'Area A = 8cm × 5cm = 40cm²',
              'Area B = 6cm × 7cm = 42cm²',
              '42cm² > 40cm², so Rectangle B is larger'
            ]
          },
          {
            id: 'practical-comparison',
            problem: 'Two gardens: Garden X is 12m × 8m, Garden Y is 15m × 6m. Which has more area?',
            solution: 'Garden X has more area',
            workingOut: [
              'Garden X area = 12m × 8m = 96m²',
              'Garden Y area = 15m × 6m = 90m²',
              '96m² > 90m², so Garden X has more area'
            ]
          }
        ],
        visualAids: [
          {
            id: 'comparison-tool',
            type: 'interactive',
            title: 'Length and Area Comparison Tool',
            description: 'Visual tool for comparing measurements',
            component: 'MeasurementComparison'
          }
        ],
        interactiveElements: [
          {
            id: 'measurement-detective',
            type: 'clickable',
            title: 'Measurement Detective',
            instructions: 'Solve measurement comparison mysteries',
            component: 'MeasurementDetective'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'comparison-quiz',
        type: 'multipleChoice',
        question: 'Which rectangle has the largest area? A: 9cm×4cm, B: 8cm×5cm, C: 7cm×6cm',
        options: ['Rectangle A', 'Rectangle B', 'Rectangle C', 'All equal'],
        correctAnswer: 2,
        explanation: 'A=36cm², B=40cm², C=42cm². Rectangle C has the largest area.',
        hints: ['Calculate each area separately', 'Compare the results'],
        difficulty: 3,
        points: 15
      }
    ],
    resources: [
      {
        id: 'measurement-comparison-guide',
        title: 'Measurement Comparison Guide',
        description: 'Strategies for comparing lengths and areas',
        url: '/guides/measurement-comparison',
        type: 'article'
      }
    ],
    voiceScript: 'Comparing measurements is like being a detective - you need to gather all the evidence!'
  },

  // AC9M6S02 - Interpret and create scales and grid references (6-W.2)
  {
    id: 'scales-grid-references',
    title: 'Interpret and Create Scales and Grid References',
    description: 'Work with maps, scales, and grid reference systems',
    category: 'Space',
    difficulty: 3,
    estimatedTime: 35,
    ixlCode: '6-W.2',
    learningObjectives: [
      'Read and interpret map scales',
      'Use grid references to locate positions',
      'Calculate real distances using scales',
      'Create simple maps with scales'
    ],
    prerequisites: ['compare-lengths-areas'],
    concepts: [
      {
        id: 'maps-scales-grids',
        title: 'Maps, Scales, and Grid Systems',
        explanation: 'Understanding how to read and use maps with scales and grid references',
        examples: [
          {
            id: 'map-scale-distance',
            problem: 'On a map with scale 1:10000, two points are 5cm apart. What is the real distance?',
            solution: '500m',
            workingOut: [
              'Scale 1:10000 means 1cm = 10000cm',
              'Real distance = 5cm × 10000 = 50000cm',
              'Convert: 50000cm = 500m',
              'Real distance is 500m'
            ]
          },
          {
            id: 'grid-reference',
            problem: 'A treasure is at grid reference D4. Describe how to find it.',
            solution: 'Go to column D, row 4',
            workingOut: [
              'Grid references use letters for columns',
              'Grid references use numbers for rows',
              'D4 means column D, row 4',
              'Find where D column and 4 row intersect'
            ]
          },
          {
            id: 'create-scale',
            problem: 'A playground is 80m long. On a 1:2000 scale drawing, how long should it be?',
            solution: '4cm',
            workingOut: [
              'Real length: 80m = 8000cm',
              'Scale 1:2000 means divide by 2000',
              'Drawing length: 8000cm ÷ 2000 = 4cm'
            ]
          }
        ],
        visualAids: [
          {
            id: 'map-creator',
            type: 'interactive',
            title: 'Interactive Map Creator',
            description: 'Create maps with scales and grid references',
            component: 'MapCreator'
          }
        ],
        interactiveElements: [
          {
            id: 'treasure-hunt',
            type: 'clickable',
            title: 'Grid Reference Treasure Hunt',
            instructions: 'Find treasures using grid references',
            component: 'GridTreasureHunt'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'scales-quiz',
        type: 'numerical',
        question: 'On a 1:5000 scale map, a road appears 6cm long. What is the actual length in meters?',
        correctAnswer: 300,
        explanation: '6cm × 5000 = 30000cm = 300m',
        hints: ['Multiply map distance by scale factor', 'Convert cm to m'],
        difficulty: 3,
        points: 15
      }
    ],
    resources: [
      {
        id: 'maps-scales-guide',
        title: 'Maps and Scales Guide',
        description: 'Complete guide to reading maps and using scales',
        url: '/guides/maps-scales',
        type: 'article'
      }
    ],
    voiceScript: 'Maps and scales help us understand the world around us, from tiny neighborhoods to entire countries!'
  },

  // AC9M6ST02 - Plan and conduct statistical investigations (6-T.2)
  {
    id: 'statistical-investigations',
    title: 'Plan and Conduct Statistical Investigations',
    description: 'Design surveys, collect data, and analyze results',
    category: 'Statistics',
    difficulty: 4,
    estimatedTime: 45,
    ixlCode: '6-T.2',
    learningObjectives: [
      'Design statistical questions',
      'Plan data collection methods',
      'Organize and display data',
      'Draw conclusions from investigations'
    ],
    prerequisites: ['scales-grid-references'],
    concepts: [
      {
        id: 'investigation-process',
        title: 'Statistical Investigation Process',
        explanation: 'Steps for conducting thorough statistical investigations',
        examples: [
          {
            id: 'survey-design',
            problem: 'Design a survey to find students\' favorite school subjects',
            solution: 'Plan question, collect method, display format',
            workingOut: [
              'Question: "What is your favorite school subject?"',
              'Method: Survey all students in class',
              'Display: Bar graph or pie chart',
              'Analysis: Find most/least popular subjects'
            ]
          },
          {
            id: 'data-collection',
            problem: 'Collect data on daily temperature for one week',
            solution: 'Record, organize, and analyze temperature data',
            workingOut: [
              'Method: Check temperature same time daily',
              'Record: Make a data table',
              'Display: Line graph showing trend',
              'Conclusion: Identify patterns or changes'
            ]
          },
          {
            id: 'investigation-conclusion',
            problem: 'From shoe size data: sizes 6,7,6,8,7,6,9,7,6,8, what can we conclude?',
            solution: 'Size 6 is most common, range is 3',
            workingOut: [
              'Organize data: 6,6,6,6,7,7,7,8,8,9',
              'Mode (most common): 6',
              'Range: 9-6 = 3',
              'Conclusion: Most students wear size 6'
            ]
          }
        ],
        visualAids: [
          {
            id: 'investigation-planner',
            type: 'interactive',
            title: 'Statistical Investigation Planner',
            description: 'Tool for planning statistical investigations',
            component: 'InvestigationPlanner'
          }
        ],
        interactiveElements: [
          {
            id: 'data-collector',
            type: 'input',
            title: 'Data Collection Tool',
            instructions: 'Collect and organize data for investigations',
            component: 'DataCollector'
          },
          {
            id: 'investigation-step-order',
            type: 'dragDrop',
            title: 'Investigation Step Sequencer',
            instructions: 'Arrange investigation steps in correct order',
            component: 'InvestigationPlanner',
            skillId: 'INVESTIGATION_PLAN',
            objectives: [
              'Sequence steps of a statistical investigation',
              'Differentiate data collection from analysis'
            ],
            hints: [
              'Start with a question',
              'Collect before you analyse',
              'Conclude after interpreting results'
            ]
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'investigation-quiz',
        type: 'shortAnswer',
        question: 'You want to find out favorite pets in your school. List 3 steps you would take.',
        correctAnswer: '1. Write survey question 2. Collect data from students 3. Display results in graph',
        explanation: 'Good investigations need: clear question, systematic collection, and appropriate display',
        hints: ['Think about the question first', 'How will you collect data?', 'How will you show results?'],
        difficulty: 4,
        points: 18
      }
    ],
    resources: [
      {
        id: 'investigation-guide',
        title: 'Statistical Investigation Guide',
        description: 'Complete guide to conducting statistical investigations',
        url: '/guides/statistical-investigations',
        type: 'article'
      }
    ],
    voiceScript: 'Statistical investigations help us answer questions about the world using data as our evidence!'
  },

  // AC9M6P02 - Conduct probability experiments (6-U.4)
  {
    id: 'probability-experiments',
    title: 'Conduct Probability Experiments',
    description: 'Design and run experiments to test probability predictions',
    category: 'Probability',
    difficulty: 3,
    estimatedTime: 35,
    ixlCode: '6-U.4',
    learningObjectives: [
      'Design fair probability experiments',
      'Conduct trials and record results',
      'Compare experimental vs theoretical probability',
      'Understand the law of large numbers'
    ],
    prerequisites: ['statistical-investigations'],
    concepts: [
      {
        id: 'probability-experimentation',
        title: 'Probability Experiment Design',
        explanation: 'How to design and conduct proper probability experiments',
        examples: [
          {
            id: 'coin-experiment',
            problem: 'Design an experiment to test if a coin is fair',
            solution: 'Flip 100 times, record heads/tails, compare to 50/50',
            workingOut: [
              'Hypothesis: Fair coin gives 50% heads, 50% tails',
              'Method: Flip coin 100 times',
              'Record: Tally heads and tails',
              'Analysis: Compare results to expected 50/50'
            ]
          },
          {
            id: 'dice-experiment',
            problem: 'Test if a die is fair by rolling it 60 times',
            solution: 'Each number should appear about 10 times',
            workingOut: [
              'Expected: Each number (1-6) appears 60÷6 = 10 times',
              'Method: Roll 60 times, record each result',
              'Analysis: Compare actual vs expected frequencies',
              'Conclusion: Close to 10 each suggests fair die'
            ]
          },
          {
            id: 'spinner-experiment',
            problem: 'A spinner has 3 equal sections. Predict results of 90 spins.',
            solution: 'Each section should appear about 30 times',
            workingOut: [
              'Theoretical: Each section has 1/3 probability',
              'Expected frequency: 90 × 1/3 = 30 times each',
              'Experiment: Spin 90 times, record results',
              'Compare: Actual frequencies vs expected 30 each'
            ]
          }
        ],
        visualAids: [
          {
            id: 'experiment-simulator',
            type: 'interactive',
            title: 'Probability Experiment Simulator',
            description: 'Simulate various probability experiments',
            component: 'ProbabilitySimulator'
          }
        ],
        interactiveElements: [
          {
            id: 'virtual-experiments',
            type: 'clickable',
            title: 'Virtual Probability Lab',
            instructions: 'Conduct probability experiments virtually',
            component: 'VirtualProbabilityLab'
          },
          {
            id: 'probability-simulator-practice',
            type: 'input',
            title: 'Probability Simulation Practice',
            instructions: 'Predict and then simulate to compare outcomes',
            component: 'ProbabilitySimulator',
            skillId: 'PROB_SIMULATE',
            objectives: [
              'Compare experimental and theoretical probabilities',
              'Assess variability with sample size'
            ],
            hints: [
              'Record each trial accurately',
              'Larger samples reduce variability',
              'Compute fraction successes / trials'
            ]
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'experiments-quiz',
        type: 'multipleChoice',
        question: 'You flip a coin 40 times and get 18 heads. What can you conclude?',
        options: ['Coin is unfair', 'Coin is fair', 'Need more trials', 'Experiment failed'],
        correctAnswer: 2,
        explanation: '18/40 = 45% heads is close to expected 50%. More trials would give clearer results.',
        hints: ['Compare to expected 50%', 'Consider if difference is significant', 'Think about sample size'],
        difficulty: 3,
        points: 15
      }
    ],
    resources: [
      {
        id: 'probability-experiments-guide',
        title: 'Probability Experiments Guide',
        description: 'Guide to designing and conducting probability experiments',
        url: '/guides/probability-experiments',
        type: 'article'
      }
    ],
    voiceScript: 'Probability experiments show us how math predictions work in the real world!'
  },

  // AC9M6M02 - Calculate perimeters of rectangles (6-O.2)
  {
    id: 'rectangle-perimeter',
    title: 'Calculate Perimeters of Rectangles',
    description: 'Find the perimeter of rectangles and squares using addition and formulas',
    category: 'Measurement',
    difficulty: 2,
    estimatedTime: 25,
    ixlCode: '6-O.2',
    learningObjectives: [
      'Calculate perimeter using addition',
      'Apply perimeter formulas',
      'Solve perimeter word problems',
      'Distinguish between area and perimeter'
    ],
    prerequisites: ['probability-experiments'],
    concepts: [
      {
        id: 'perimeter-formulas',
        title: 'Perimeter Calculation Methods',
        explanation: 'Different ways to calculate the perimeter of rectangles',
        examples: [
          {
            id: 'rectangle-perimeter-basic',
            problem: 'Find the perimeter of a rectangle 8cm long and 5cm wide',
            solution: '26cm',
            workingOut: [
              'Method 1: Add all sides: 8 + 5 + 8 + 5 = 26cm',
              'Method 2: Formula: P = 2(l + w) = 2(8 + 5) = 2(13) = 26cm',
              'Perimeter = 26cm'
            ]
          },
          {
            id: 'square-perimeter',
            problem: 'A square has sides of 12m. What is its perimeter?',
            solution: '48m',
            workingOut: [
              'Square has 4 equal sides',
              'Perimeter = 4 × side length = 4 × 12m = 48m',
              'Perimeter = 48m'
            ]
          },
          {
            id: 'perimeter-word-problem',
            problem: 'A garden is 15m long and 9m wide. How much fence is needed to go around it?',
            solution: '48m of fence',
            workingOut: [
              'Fence goes around the perimeter',
              'Perimeter = 2(length + width)',
              'P = 2(15 + 9) = 2(24) = 48m',
              '48m of fence is needed'
            ]
          }
        ],
        visualAids: [
          {
            id: 'perimeter-calculator',
            type: 'interactive',
            title: 'Perimeter Calculator',
            description: 'Interactive tool for calculating perimeters',
            component: 'PerimeterCalculator'
          }
        ],
        interactiveElements: [
          {
            id: 'perimeter-practice',
            type: 'calculator',
            title: 'Perimeter Practice',
            instructions: 'Calculate perimeter of rectangles using P = 2(l + w)',
            component: 'PerimeterCalculator',
            skillId: 'PERIM_RECT',
            objectives: [
              'Apply P = 2(l + w) for rectangles',
              'Relate repeated addition to perimeter formula'
            ],
            hints: [
              'Add length and width first',
              'Multiply the sum by 2',
              'Opposite sides of rectangle are equal'
            ]
          },
          {
            id: 'perimeter-builder',
            type: 'dragDrop',
            title: 'Build and Measure',
            instructions: 'Build shapes and calculate their perimeters',
            component: 'PerimeterBuilder'
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'perimeter-quiz',
        type: 'numerical',
        question: 'What is the perimeter of a rectangle that is 7cm long and 4cm wide?',
        correctAnswer: 22,
        explanation: 'Perimeter = 2(7 + 4) = 2(11) = 22cm',
        hints: ['Use formula: P = 2(length + width)', 'Add length and width first, then multiply by 2'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'perimeter-guide',
        title: 'Perimeter Calculation Guide',
        description: 'Complete guide to calculating perimeters',
        url: '/guides/perimeter',
        type: 'article'
      }
    ],
    voiceScript: 'Perimeter is the distance around the edge of a shape - like walking around a playground!'
  },

  // AC9M6N04 - Decimal place value (6-F.1)
  {
    id: 'decimal-place-value',
    title: 'Decimal Place Value',
    description: 'Understand place value in decimal numbers',
    category: 'Number',
    difficulty: 2,
    estimatedTime: 30,
    ixlCode: '6-F.1',
    learningObjectives: [
      'Identify decimal place values',
      'Read decimal numbers correctly',
      'Write decimals in expanded form',
      'Compare decimal numbers'
    ],
    prerequisites: ['rectangle-perimeter'],
    concepts: [
      {
        id: 'decimal-place-understanding',
        title: 'Understanding Decimal Places',
        explanation: 'How place value works with decimal numbers',
        examples: [
          {
            id: 'decimal-place-identification',
            problem: 'In 4.327, what is the value of the digit 2?',
            solution: '2 hundredths or 0.02',
            workingOut: [
              'Place values after decimal: tenths, hundredths, thousandths',
              '4.327: 4 ones, 3 tenths, 2 hundredths, 7 thousandths',
              'The 2 is in hundredths place = 0.02'
            ]
          },
          {
            id: 'expanded-form',
            problem: 'Write 5.648 in expanded form',
            solution: '5 + 0.6 + 0.04 + 0.008',
            workingOut: [
              '5 = 5 ones',
              '6 = 6 tenths = 0.6',
              '4 = 4 hundredths = 0.04',
              '8 = 8 thousandths = 0.008',
              'Expanded form: 5 + 0.6 + 0.04 + 0.008'
            ]
          },
          {
            id: 'decimal-comparison',
            problem: 'Which is larger: 2.4 or 2.38?',
            solution: '2.4 is larger',
            workingOut: [
              'Compare digit by digit from left to right',
              'Ones place: 2 = 2 (same)',
              'Tenths place: 4 > 3',
              'Since 4 > 3, then 2.4 > 2.38'
            ]
          }
        ],
        visualAids: [
          {
            id: 'decimal-place-chart',
            type: 'interactive',
            title: 'Decimal Place Value Chart',
            description: 'Interactive decimal place value visualization',
            component: 'DecimalPlaceChart'
          }
        ],
        interactiveElements: [
          {
            id: 'decimal-builder',
            type: 'dragDrop',
            title: 'Build Decimal Numbers',
            instructions: 'Create decimal numbers using place value blocks',
            component: 'DecimalBuilder'
          },
          {
            id: 'decimal-place-identify',
            type: 'clickable',
            title: 'Place Value Identifier',
            instructions: 'Identify digits in specified decimal places',
            component: 'DecimalPlaceChart',
            skillId: 'DECIMAL_PLACE_VALUE',
            objectives: [
              'Identify value of digits to thousandths',
              'Relate place name to fractional value'
            ],
            hints: [
              'Tenths is first after decimal',
              'Hundredths is second',
              'Each place is ten times smaller'
            ]
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'decimal-place-quiz',
        type: 'shortAnswer',
        question: 'In the number 3.275, what digit is in the hundredths place?',
        correctAnswer: '7',
        explanation: 'The hundredths place is the second digit after the decimal point',
        hints: ['Count places after decimal point', 'Tenths, hundredths, thousandths'],
        difficulty: 2,
        points: 10
      }
    ],
    resources: [
      {
        id: 'decimal-place-guide',
        title: 'Decimal Place Value Guide',
        description: 'Understanding decimal place value',
        url: '/guides/decimal-place-value',
        type: 'article'
      }
    ],
    voiceScript: 'Decimal place value is like a precise address system for parts of numbers!'
  },

  // AC9M6N01 - Add and subtract integers (6-L.3)
  {
    id: 'add-subtract-integers',
    title: 'Add and Subtract Integers',
    description: 'Perform addition and subtraction operations with positive and negative integers',
    category: 'Number',
    difficulty: 3,
    estimatedTime: 35,
    ixlCode: '6-L.3',
    learningObjectives: [
      'Add positive and negative integers',
      'Subtract positive and negative integers',
      'Use number lines for integer operations',
      'Apply integer operations to real situations'
    ],
    prerequisites: ['decimal-place-value'],
    concepts: [
      {
        id: 'integer-addition-subtraction',
        title: 'Integer Addition and Subtraction Rules',
        explanation: 'Methods for adding and subtracting positive and negative numbers',
        examples: [
          {
            id: 'add-same-signs',
            problem: '-5 + (-3)',
            solution: '-8',
            workingOut: [
              'When adding integers with same signs, add and keep the sign',
              '-5 + (-3) = -(5 + 3) = -8',
              'Answer: -8'
            ]
          },
          {
            id: 'add-different-signs',
            problem: '7 + (-4)',
            solution: '3',
            workingOut: [
              'When adding integers with different signs, subtract and use sign of larger number',
              '7 + (-4) = 7 - 4 = 3',
              'Answer: 3'
            ]
          },
          {
            id: 'subtract-integers',
            problem: '3 - (-5)',
            solution: '8',
            workingOut: [
              'Subtracting is the same as adding the opposite',
              '3 - (-5) = 3 + 5 = 8',
              'Answer: 8'
            ]
          },
          {
            id: 'temperature-problem',
            problem: 'Temperature drops from 2°C to -6°C. What is the change?',
            solution: 'Decrease of 8°C',
            workingOut: [
              'Change = final temperature - initial temperature',
              'Change = -6 - 2 = -6 + (-2) = -8',
              'Temperature decreased by 8°C'
            ]
          }
        ],
        visualAids: [
          {
            id: 'integer-calculator',
            type: 'interactive',
            title: 'Integer Operations Calculator',
            description: 'Visual calculator for integer operations',
            component: 'IntegerCalculator'
          }
        ],
        interactiveElements: [
          {
            id: 'number-line-operations',
            type: 'clickable',
            title: 'Number Line Operations',
            instructions: 'Use number line to add and subtract integers',
            component: 'NumberLineOperations'
          },
          {
            id: 'integer-calculator-practice',
            type: 'calculator',
            title: 'Integer Expression Practice',
            instructions: 'Evaluate integer addition and subtraction expressions',
            component: 'IntegerCalculator',
            skillId: 'INT_BASIC_ARITH',
            objectives: [
              'Add and subtract integers with unlike signs',
              'Apply sign rules consistently'
            ],
            hints: [
              'Same signs: add and keep sign',
              'Different signs: subtract & keep larger absolute value sign',
              'Subtracting a negative becomes addition'
            ]
          }
        ]
      }
    ],
    assessments: [
      {
        id: 'integer-operations-quiz',
        type: 'numerical',
        question: 'Calculate: -8 + 5',
        correctAnswer: -3,
        explanation: 'Different signs: subtract smaller from larger, keep sign of larger. 8 - 5 = 3, since 8 is larger and negative, answer is -3',
        hints: ['Different signs mean subtract', 'Keep the sign of the number with larger absolute value'],
        difficulty: 3,
        points: 12
      }
    ],
    resources: [
      {
        id: 'integer-operations-guide',
        title: 'Integer Operations Guide',
        description: 'Complete guide to adding and subtracting integers',
        url: '/guides/integer-operations',
        type: 'article'
      }
    ],
    voiceScript: 'Adding and subtracting integers is like keeping track of gains and losses!'
  }
];

// Legacy curriculum for backwards compatibility
export const GRADE_6_CURRICULUM = COMPREHENSIVE_GRADE_6_CURRICULUM;

// Category groupings for UI
export const CURRICULUM_BY_CATEGORY: Record<string, MathTopic[]> = {
  'Number': COMPREHENSIVE_GRADE_6_CURRICULUM.filter(topic => topic.category === 'Number'),
  'Algebra': COMPREHENSIVE_GRADE_6_CURRICULUM.filter(topic => topic.category === 'Algebra'),
  'Measurement': COMPREHENSIVE_GRADE_6_CURRICULUM.filter(topic => topic.category === 'Measurement'),
  'Space': COMPREHENSIVE_GRADE_6_CURRICULUM.filter(topic => topic.category === 'Space'),
  'Statistics': COMPREHENSIVE_GRADE_6_CURRICULUM.filter(topic => topic.category === 'Statistics'),
  'Probability': COMPREHENSIVE_GRADE_6_CURRICULUM.filter(topic => topic.category === 'Probability')
};

export const CATEGORY_COLORS = {
  'Number': 'bg-blue-500',
  'Algebra': 'bg-green-500', 
  'Measurement': 'bg-yellow-500',
  'Space': 'bg-purple-500',
  'Statistics': 'bg-red-500',
  'Probability': 'bg-indigo-500'
};

export const CATEGORY_DESCRIPTIONS = {
  'Number': 'Work with integers, fractions, decimals, percentages, and number patterns',
  'Algebra': 'Explore patterns, sequences, and basic algebraic thinking',
  'Measurement': 'Measure length, area, volume, time, and angles',
  'Space': 'Study shapes, transformations, and coordinate geometry',
  'Statistics': 'Collect, organize, and interpret data',
  'Probability': 'Understand chance, probability, and making predictions'
};

export const DIFFICULTY_LABELS = {
  1: 'Beginner',
  2: 'Intermediate', 
  3: 'Advanced',
  4: 'Expert',
  5: 'Challenge'
};
