import { NextRequest, NextResponse } from 'next/server';
import { InferenceClient } from '@huggingface/inference';
import Groq from 'groq-sdk';

// --- Prompt Helpers ---------------------------------------------------------

// Central system persona: ONLY math help; transform non-math queries into math contexts.
const SYSTEM_PROMPT = `You are a patient, encouraging Grade 6 mathematics tutor.

GOALS
1. Explain clearly using age-appropriate language.
2. Keep answers structured: (a) Quick Answer or Reframed Problem, (b) Step-by-Step, (c) Example, (d) Quick Check question.
3. Use concise sentences; avoid jargon unless explained.

STRICT RULES
- ONLY respond with mathematics-related explanations.
- If the student's question is not about math (e.g. "What's your name?", "Tell me a story", random chatter), immediately and cheerfully reframe it into a Grade 6 math problem inspired by their wording, then teach a related concept.
- Never discuss topics outside math (politics, health, personal data, coding, etc.). If asked, gently pivot: create a math scenario instead.
- Do not invent advanced content beyond Grade 6 scope.
- Keep tone supportive; avoid saying "I can't"—instead positively redirect into math.

STYLE
- Use friendly encouragement (e.g., "Great thinking!" sparingly).
- Prefer concrete numbers and visuals described in words ("Imagine a number line...").
- End with a short follow-up question that checks understanding.

OUTPUT FORMAT TEMPLATE
"Problem: ...\nSolution Steps: ...\nExample: ...\nYour Turn: (brief check)"

If the user already asked a clear math question, keep their wording; otherwise, create an age-appropriate math prompt first.
`;

// Utility to judge if a message is probably math focused (simple heuristic)
function isLikelyMath(message: string): boolean {
  const mathTerms = /\b(fraction|decimal|percent|percentage|integer|number|add|plus|sum|subtract|minus|difference|multiply|times|product|divide|quotient|area|perimeter|prime|factor|multiple|probability|graph|ratio|proportion)\b/i;
  const digits = /\d/;
  return mathTerms.test(message) || digits.test(message);
}

// Build the user payload content. Keeps only student context & question—persona lives in SYSTEM_PROMPT.
function buildUserContent(question: string, context?: string): string {
  const trimmed = question?.trim() || '';
  const mathLikely = isLikelyMath(trimmed);
  const meta = {
    context: context || null,
    original_question: trimmed,
    classified_as_math: mathLikely,
    instruction: mathLikely
      ? 'Answer the math question for a Grade 6 student.'
      : 'Question is NOT clearly math; first reframe into a Grade 6 math problem linked to the user intent, then teach the concept.'
  };
  return `USER PAYLOAD JSON\n${JSON.stringify(meta, null, 2)}`;
}

// Groq (Llama 2) API function
async function callGroqAPI(message: string, context?: string): Promise<string | null> {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      console.log('No Groq API key found');
      return null;
    }

    const groq = new Groq({ apiKey });

  // Build user content focusing ONLY on question/context; persona + rules live in SYSTEM_PROMPT
  const userContent = buildUserContent(message, context);

    console.log('Calling Groq API with Llama 2...');
    
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userContent }
      ],
      model: 'llama3-8b-8192',
      temperature: 0.5, // Slightly lower for consistency & correctness
      max_tokens: 550,
    });

    const aiResponse = chatCompletion.choices[0]?.message?.content;
    
    if (aiResponse && aiResponse.trim().length > 10) {
      console.log('Successfully got Groq/Llama 3 response');
      console.log('Response length:', aiResponse.trim().length, 'characters');
      console.log('Response preview:', aiResponse.trim().substring(0, 100) + '...');
      return aiResponse.trim();
    }
    
    return null;

  } catch (error) {
    console.error('Groq API error:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Chat API is working!" });
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== API ROUTE CALLED ===');
    const { message, context } = await request.json();
    console.log('Request received:', { message, context });

    // Check for API key first
    const groqApiKey = process.env.GROQ_API_KEY;
    const hfApiKey = process.env.HUGGING_FACE_API_KEY;
    
    console.log('API Keys status:', { 
      groq: !!groqApiKey, 
      huggingface: !!hfApiKey 
    });
    
    if (!groqApiKey && !hfApiKey) {
      console.log('No API keys found - using fallback responses only');
      const fallbackResponse = generateFallbackResponse(message, context);
      return NextResponse.json({ 
        response: fallbackResponse,
        source: 'fallback_no_api_keys'
      });
    }

    console.log('Attempting to use AI APIs...');

    // Try Groq (Llama 3) API first - fastest and most reliable
    if (groqApiKey) {
      try {
        console.log('Trying Groq API...');
        const groqResponse = await callGroqAPI(message, context);
        if (groqResponse) {
          console.log('Successfully got Groq/Llama 3 response');
          return NextResponse.json({ 
            response: groqResponse,
            source: 'groq_llama3'
          });
        }
      } catch (error) {
        console.error('Groq API error:', error);
      }
    }

    // Try Hugging Face API as backup
    if (hfApiKey) {
      try {
        console.log('Trying Hugging Face API...');
        const aiResponse = await callHuggingFaceAPI(message, context);
        if (aiResponse) {
          console.log('Successfully got Hugging Face response');
          return NextResponse.json({ 
            response: aiResponse,
            source: 'huggingface_api'
          });
        }
      } catch (error) {
        console.error('Hugging Face API error:', error);
      }
    }

    // Try alternative model
    try {
      console.log('Trying alternative model...');
      const altResponse = await tryAlternativeModel(message, context);
      if (altResponse) {
        console.log('Successfully got alternative model response');
        return NextResponse.json({
          response: altResponse,
          source: 'alternative_model'
        });
      }
    } catch (error) {
      console.error('Alternative model error:', error);
    }

    // Use fallback response
    console.log('Using fallback response due to API failures');
    const fallbackResponse = generateFallbackResponse(message, context);
    return NextResponse.json({ 
      response: fallbackResponse,
      source: 'fallback'
    });

  } catch (error) {
    console.error('Chat API error:', error);
    const fallbackResponse = generateFallbackResponse("help", "");
    return NextResponse.json({ response: fallbackResponse }, { status: 200 });
  }
}

async function callHuggingFaceAPI(message: string, context?: string): Promise<string | null> {
  try {
    // Check for API key in environment variables
    const apiKey = process.env.HUGGING_FACE_API_KEY;
    
    if (!apiKey) {
      console.log('No Hugging Face API key found');
      return null;
    }

    console.log('Using Hugging Face Inference Client with API key');
    
    // Initialize the Hugging Face Inference client
    const hf = new InferenceClient(apiKey);

  const userContent = buildUserContent(message, context);
  const educationalPrompt = `${SYSTEM_PROMPT}\n---\n${userContent}`;

    // Try text generation with a suitable model
    try {
      console.log('Attempting text generation...');
      const result = await hf.textGeneration({
        model: 'deepseek-ai/DeepSeek-R1',
        inputs: educationalPrompt,
        parameters: {
          max_new_tokens: 120,
          temperature: 0.55,
          do_sample: true,
          return_full_text: false,
        },
      });

      if (result && result.generated_text) {
        const responseText = result.generated_text.trim();
        console.log('Successfully got HF response:', responseText.substring(0, 50) + '...');
        return responseText;
      }
    } catch (modelError) {
      console.log('DialoGPT model failed, trying alternative model...');
      
      // Try with a different model as fallback
      try {
        const result = await hf.textGeneration({
          model: 'openai/gpt-oss-120b',
          inputs: `${SYSTEM_PROMPT}\n---\nFallback user content:\n${userContent}`,
          parameters: {
            max_new_tokens: 80,
            temperature: 0.8,
            return_full_text: false,
          },
        });

        if (result && result.generated_text) {
          const responseText = result.generated_text.trim();
          console.log('Successfully got alternative model response');
          return responseText;
        }
      } catch (altError) {
        console.log('Alternative model also failed:', altError);
      }
    }

    return null;

  } catch (error) {
    console.error('Hugging Face API error:', error);
    return null;
  }
}

async function tryAlternativeModel(message: string, context?: string): Promise<string | null> {
  try {
    // Get API key for alternative model as well
    const apiKey = process.env.HUGGING_FACE_API_KEY;
    
    if (!apiKey) {
      console.log('No API key available for alternative model');
      return null;
    }
    
    console.log('Trying alternative model with HF Inference client...');
    
    // Initialize the Hugging Face Inference client
    const hf = new InferenceClient(apiKey);
    
    // Try a different model that might be more readily available
    const prompt = `Math tutor helping Grade 6 student: ${message}`;
    
    try {
      const result = await hf.textGeneration({
        model: 'distilgpt2',
        inputs: prompt,
        parameters: {
          max_new_tokens: 60,
          temperature: 0.8,
          return_full_text: false,
        },
      });

      if (result && result.generated_text) {
        const aiText = result.generated_text.trim();
        
        if (aiText.length > 15) {
          console.log('Alternative model successful');
          return aiText;
        }
      }
    } catch (modelError) {
      console.log('Alternative model failed:', modelError);
    }

    return null;

  } catch (error) {
    console.error('Error calling alternative model:', error);
    return null;
  }
}

function generateFallbackResponse(message: string, context?: string): string {
  // Enforce math-only fallback policy with transformation if needed
  const isMath = isLikelyMath(message || '');
  if (!isMath) {
    // Simple transformation: turn arbitrary query into a math word problem scaffold
    const safe = (message || 'a random question').slice(0, 120);
    return `Problem: Let's turn your request about "${safe}" into a math idea. Suppose we collect 12 data points related to it and group them equally among 3 categories. How many go in each group?\nSolution Steps: 1) Identify total (12). 2) Identify groups (3). 3) Divide 12 ÷ 3 = 4.\nExample: If it were 18 items and 6 groups, 18 ÷ 6 = 3.\nYour Turn: If there were 20 items and 5 groups, how many in each?`;
  }
  const lowerMessage = message.toLowerCase();
  
  // Context-specific responses for current topic
  if (context) {
    if (context.includes('integer')) {
      if (lowerMessage.includes('positive') || lowerMessage.includes('negative')) {
        return "Great question! Positive numbers are greater than zero (like +3, +10), negative numbers are less than zero (like -5, -2), and zero is neither positive nor negative. Think of a thermometer - positive temperatures are above freezing, negative are below!";
      }
      if (lowerMessage.includes('compare') || lowerMessage.includes('number line')) {
        return "On a number line, numbers increase as you move right and decrease as you move left. So -3 is less than -1, and -1 is less than +2. The further right a number is, the bigger it gets!";
      }
      if (lowerMessage.includes('zero')) {
        return "Zero is the neutral point between positive and negative numbers. It's neither positive nor negative - it's like the starting point on a number line or the freezing point on a thermometer!";
      }
      return "Integers are whole numbers that can be positive, negative, or zero. They're really useful for describing things like temperatures, money gained or lost, or floors above and below ground level!";
    }
    
    if (context.includes('fraction')) {
      if (lowerMessage.includes('denominator')) {
        return "The denominator (bottom number) tells you how many equal parts the whole is divided into. Like if a pizza is cut into 8 slices, the denominator is 8. The numerator (top number) tells you how many parts you have!";
      }
      if (lowerMessage.includes('equivalent')) {
        return "Equivalent fractions are different fractions that represent the same amount! Like 1/2 = 2/4 = 4/8. You can multiply or divide both the top and bottom by the same number to get equivalent fractions.";
      }
      if (lowerMessage.includes('add')) {
        return "To add fractions, they need the same denominator (bottom number). If they're different, find a common denominator first. Then just add the numerators (top numbers) and keep the same denominator!";
      }
      return "Fractions represent parts of a whole! Think of them like pieces of a pizza or chocolate bar. The bottom number shows how many equal pieces total, and the top shows how many pieces you have.";
    }
    
    if (context.includes('decimal')) {
      if (lowerMessage.includes('convert')) {
        return "To convert fractions to decimals, divide the top number by the bottom number! For example, 1/4 = 1 ÷ 4 = 0.25. Some common ones to remember: 1/2 = 0.5, 1/4 = 0.25, 3/4 = 0.75.";
      }
      if (lowerMessage.includes('place')) {
        return "Each decimal place has a special name! The first place after the decimal point is 'tenths', then 'hundredths', then 'thousandths'. So in 0.456, the 4 is in the tenths place, 5 is in hundredths, and 6 is in thousandths.";
      }
      if (lowerMessage.includes('round')) {
        return "To round decimals, look at the digit to the right of where you want to round. If it's 5 or bigger, round up. If it's 4 or smaller, round down. For example, 3.67 rounded to tenths is 3.7!";
      }
      return "Decimals are another way to show parts of a whole, just like fractions! The decimal point separates whole numbers from the fractional parts.";
    }
    
    if (context.includes('prime')) {
      if (lowerMessage.includes('what makes') || lowerMessage.includes('definition')) {
        return "A prime number has exactly two factors: 1 and itself. So 7 is prime because it can only be divided evenly by 1 and 7. But 8 isn't prime because it can be divided by 1, 2, 4, and 8.";
      }
      if (lowerMessage.includes('factors')) {
        return "Prime factors are the prime numbers that multiply together to make another number. For example, 12 = 2 × 2 × 3, so the prime factors of 12 are 2 and 3!";
      }
      if (lowerMessage.includes('is 1')) {
        return "Good question! 1 is NOT a prime number. Prime numbers need exactly two factors (1 and themselves), but 1 only has one factor: itself. The first prime number is 2!";
      }
      return "Prime numbers are special numbers that can only be divided evenly by 1 and themselves. Examples include 2, 3, 5, 7, 11, 13. They're like the 'building blocks' of all other numbers!";
    }

    if (context.includes('area') || context.includes('rectangle')) {
      if (lowerMessage.includes('calculate') || lowerMessage.includes('formula')) {
        return "Area of a rectangle = length × width. If a rectangle is 5 units long and 3 units wide, the area is 5 × 3 = 15 square units. Think of it as counting how many unit squares fit inside!";
      }
      if (lowerMessage.includes('perimeter')) {
        return "Area is the space INSIDE a shape (measured in square units), while perimeter is the distance AROUND the edge of a shape (measured in regular units). They're completely different things!";
      }
      return "Area measures how much space is inside a shape. For rectangles, multiply length × width. Always remember to use square units like cm² or m²!";
    }

    if (context.includes('probability')) {
      if (lowerMessage.includes('what does') || lowerMessage.includes('mean')) {
        return "Probability is the chance that something will happen. It's usually written as a fraction, decimal, or percentage. If something always happens, the probability is 1 (or 100%). If it never happens, it's 0 (or 0%).";
      }
      if (lowerMessage.includes('calculate') || lowerMessage.includes('chance')) {
        return "Probability = Number of ways it can happen ÷ Total number of possible outcomes. Like flipping a coin: 1 way to get heads ÷ 2 total outcomes = 1/2 or 50% chance!";
      }
      if (lowerMessage.includes('certain') || lowerMessage.includes('possible')) {
        return "'Certain' means probability = 1 (it will definitely happen, like the sun setting). 'Possible' means probability is between 0 and 1 (it might happen, like rain tomorrow).";
      }
      return "Probability tells us how likely something is to happen. We can describe it with words like 'impossible', 'unlikely', 'possible', 'likely', or 'certain'!";
    }
  }

  // General topic responses based on keywords
  if (lowerMessage.includes('fraction')) {
    return "Fractions represent parts of a whole! Think of a pizza cut into equal pieces. If you eat 2 out of 8 slices, you've eaten 2/8 of the pizza. The bottom number (denominator) is the total pieces, the top number (numerator) is how many you have.";
  }
  
  if (lowerMessage.includes('integer') || lowerMessage.includes('negative')) {
    return "Integers include positive numbers, negative numbers, and zero! Negative numbers are useful for temperatures below freezing, depths below sea level, or money you owe. On a number line, they go to the left of zero.";
  }
  
  if (lowerMessage.includes('decimal')) {
    return "Decimals are like fractions but written differently! 0.5 is the same as 1/2, and 0.25 is the same as 1/4. The digits after the decimal point show parts of one whole.";
  }

  if (lowerMessage.includes('prime')) {
    return "A prime number can only be divided evenly by 1 and itself. Examples: 2, 3, 5, 7, 11. But 4 isn't prime because it can be divided by 1, 2, and 4. Prime numbers are like the building blocks of all other numbers!";
  }

  if (lowerMessage.includes('pattern') || lowerMessage.includes('sequence')) {
    return "Number patterns are like puzzles! Look for what's changing between each number. Are we adding the same amount each time? Multiplying? Once you find the rule, you can predict what comes next!";
  }

  if (lowerMessage.includes('area')) {
    return "Area measures the space inside a shape. For rectangles: Area = length × width. If a rectangle is 4cm long and 3cm wide, the area is 4 × 3 = 12 square centimeters (cm²).";
  }

  if (lowerMessage.includes('help') || lowerMessage.includes('stuck') || lowerMessage.includes('don\'t understand')) {
    return "Don't worry - everyone gets stuck sometimes! Math is like learning a new language. Try breaking the problem into smaller steps. What do you know? What do you need to find? I'm here to help you figure it out!";
  }

  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    return "You're very welcome! I'm so glad I could help. Keep asking questions - that's how we learn best! Math gets easier with practice, and you're doing great!";
  }

  // Encouraging default responses
  const defaults = [
    "That's a great question! Can you tell me more about what specific part is confusing you? I'd love to help break it down step by step.",
    "I love your curiosity about math! What would you like me to explain? I can give examples or walk through problems with you.",
    "Good thinking! Let's work through this together. What have you tried so far, or what part should we focus on first?",
    "Math is like solving puzzles - and you're asking great questions! What specific concept can I help explain?",
    "Excellent question! I'm here to help make math clearer and more fun. What would you like to explore together?"
  ];
  
  return defaults[Math.floor(Math.random() * defaults.length)];
}
