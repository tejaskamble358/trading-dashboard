export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        system: "Return only valid JSON for Indian stock picks",
        messages: [
          {
            role: "user",
            content: "Give 3 high conviction Indian swing stocks with entry, target, stoploss"
          }
        ]
      })
    });

    const json = await response.json();

    const raw = (json.content || []).map(b => b.text || "").join("");
    const s = raw.indexOf("{");
    const e = raw.lastIndexOf("}");

    const parsed = JSON.parse(raw.slice(s, e + 1));

    res.status(200).json(parsed);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
