import { useState } from 'react';
import { getInnerVoiceResponse } from '../utils/openaiClient';

export default function ChatLLM() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const context = "Mood: determined, Goal: stay consistent, Arc: Focus Era";

  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages([...messages, userMsg]);
    setInput('');
    setLoading(true);

    const aiResponse = await getInnerVoiceResponse(input, context);
    const aiMsg = { role: 'assistant', content: aiResponse };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setLoading(false);
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="h-[400px] overflow-y-auto mb-4 bg-gray-100 p-4 rounded">
        {messages.map((msg, i) => (
          <div key={i} className={\`mb-2 \${msg.role === 'user' ? 'text-right' : 'text-left text-purple-700'}\`}>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-grow p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Talk to your inner voice..."
        />
        <button onClick={sendMessage} disabled={loading} className="bg-purple-600 text-white px-4 py-2 rounded">
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
}