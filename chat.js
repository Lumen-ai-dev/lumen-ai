// This runs on the server, not in the browser — so your API key is never exposed to visitors.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY, // set this in Vercel's environment variables
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system:
          "You are Lumen, a warm, clear, general-purpose AI assistant available to the public. " +
          "You help with anything: writing, research, brainstorming, planning, coding, explaining concepts. " +
          "You have live web search — use it for anything current, recent, or fact-sensitive. " +
          "Be genuinely helpful and concise.",
        messages,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('Lumen backend error:', err);
    return res.status(500).json({ error: 'Something went wrong talking to the model.' });
  }
}
