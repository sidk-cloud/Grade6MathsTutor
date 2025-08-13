# Grade 6 Mathematics Tutor

An interactive Grade 6 mathematics learning platform built with Next.js, featuring voice guidance, AI chatbot assistance, and comprehensive Australian curriculum content.

## Features

🎯 **Comprehensive Curriculum**
- Complete Grade 6 Australian mathematics content
- 6 main categories: Number, Algebra, Measurement, Space, Statistics, Probability
- Progressive difficulty levels with prerequisites

🎮 **Interactive Learning**
- Visual aids and interactive elements
- Drag-and-drop activities
- Mathematical visualizations
- Step-by-step problem solving

🔊 **Voice Guidance**
- Text-to-speech narration for all lessons
- Audio explanations of concepts
- Accessible learning experience

🤖 **AI Tutor Assistant**
- 24/7 chatbot support
- Contextual help and explanations
- Personalized learning guidance

📊 **Progress Tracking**
- Real-time progress monitoring
- Achievement system
- Performance analytics
- Save and resume functionality

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/sidk-cloud/Grade6MathsTutor.git
   cd Grade6MathsTutor
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
Grade6MathsTutor/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main application
├── components/
│   ├── ChatBot.tsx          # AI tutor chatbot
│   ├── Dashboard.tsx        # Student dashboard
│   ├── ProgressTracker.tsx  # Progress visualization
│   ├── TopicCard.tsx        # Topic display card
│   ├── VoiceAssistant.tsx   # Voice guidance
│   └── visualizations/      # Interactive math components
├── lib/
│   └── curriculum.ts        # Curriculum data and types
├── public/
│   └── images/              # Educational assets
├── next.config.js
├── tailwind.config.js
└── package.json
```

## Curriculum Content

The app covers all Grade 6 Australian mathematics topics:

### Number
- Understanding Integers
- Prime and Composite Numbers  
- Equivalent Fractions
- Decimal Operations
- Percentages and Financial Contexts

### Algebra
- Number Patterns and Sequences
- Algebraic Expressions
- Problem Solving

### Measurement  
- Metric Unit Conversions
- Area and Perimeter
- Time and Schedules
- Angle Relationships

### Space
- Coordinate Geometry
- 3D Shapes and Cross-sections
- Transformations

### Statistics
- Data Interpretation
- Graphs and Charts
- Mode, Median, Range

### Probability
- Chance and Likelihood
- Experimental Probability

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Modern icon library
- **Framer Motion** - Smooth animations
- **Chart.js** - Data visualizations

## Key Features Explained

### Interactive Visual Components
Each topic includes custom React components for mathematical concepts:
- Number line visualizations
- Fraction bar comparisons
- Geometric shape manipulations
- Data chart builders

### Voice Assistance
The app uses the Web Speech API to provide:
- Automatic lesson narration
- Concept explanations
- Pronunciation guides
- Accessibility support

### AI Chatbot
Intelligent tutoring assistant that:
- Answers mathematical questions
- Provides step-by-step guidance
- Offers encouragement and tips
- Adapts to student needs

### Progress System
Comprehensive tracking including:
- Topic completion status
- Assessment scores
- Time spent learning
- Achievement badges
- Learning streaks

## Educational Approach

The app follows proven pedagogical principles:

1. **Scaffolded Learning** - Concepts build upon each other
2. **Visual Learning** - Rich graphics and animations
3. **Active Learning** - Interactive problem-solving
4. **Immediate Feedback** - Real-time assessment
5. **Personalization** - Adaptive content delivery

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

Voice features require modern browser support for Web Speech API.

## Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or support:
- Create an issue on GitHub
- Email: support@grade6mathtutor.com
- Documentation: [docs.grade6mathtutor.com](https://docs.grade6mathtutor.com)

## Acknowledgments

- Australian Curriculum Assessment and Reporting Authority (ACARA)
- IXL Learning for curriculum alignment
- Educational content experts and reviewers
- Open source community contributors

---

Built with ❤️ for Grade 6 students and educators
