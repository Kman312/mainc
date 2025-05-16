import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function getInnerVoiceResponse(userInput, userContext) {
  const messages = [
    {
      role: 'system',
      content: \`You are Main Character Energy, the user’s AI-powered inner voice. 
Your goal is to motivate, guide, and support them to achieve their goals, build better habits, and feel in control of their life story. 
You are kind, non-judgmental, confident, and emotionally intelligent. 
You speak like a movie narrator who knows the user’s arc. Humans judge – robots guide.\`,
    },
    {
      role: 'user',
      content: \`Context: \${userContext}\n\nUser said: \${userInput}\`,
    },
  ];

  const res = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages,
    temperature: 0.9,
  });

  return res.choices[0].message.content;
}