// ===== AI DUPLICATE DETECTION =====
// Uses Anthropic Claude API to semantically check for duplicate complaints.
// The API key is injected automatically by the Claude.ai environment.

async function checkDuplicate(title, description, orgId) {
  const orgComplaints = state.complaints.filter(c => c.orgId === orgId && !c.deleted);
  if (orgComplaints.length === 0) return { isDuplicate: false };

  const existing = orgComplaints
    .map(c => `- "${c.title}": ${c.description.slice(0, 100)}`)
    .join('\n');

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 200,
        messages: [{
          role: 'user',
          content: `You are a complaint deduplication system. Respond ONLY with JSON.

New complaint:
Title: "${title}"
Description: "${description}"

Existing complaints:
${existing}

Is the new complaint substantially the same as any existing one? Consider semantics, not just wording.
Respond with: {"isDuplicate": true/false, "reason": "brief explanation", "matchTitle": "matching complaint title if any"}`
        }]
      })
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || '{}';
    return JSON.parse(text.replace(/```json|```/g, '').trim());
  } catch (e) {
    console.warn('AI duplicate check failed, skipping:', e);
    return { isDuplicate: false };
  }
}
