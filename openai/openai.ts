import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_CHATGPT_API_KEY
});

async function chatgpt(prompt: string) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo',
  });
  console.log(completion)
  return completion?.choices || null;
}

export default chatgpt;