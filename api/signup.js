const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SITE_ID = process.env.SITE_ID || 'sbocc-website';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;
    const siteId = data.source || SITE_ID;

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      return res.status(200).json({ ok: true, note: 'No Supabase configured' });
    }

    const timestamp = new Date().toISOString();

    await fetch(`${SUPABASE_URL}/rest/v1/evidence_events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        organization_id: 'psoras-campaign',
        source_type: 'website_signup',
        source_id: `${siteId}-signup`,
        evidence_type: 'observation',
        raw_content: `[${siteId}] Signup: ${data.firstName} ${data.lastName} — ${data.email} — ${data.city || 'no city'} — interests: ${data.helpType || data.interests || 'general'}`,
        raw_payload: {
          ...data,
          site: siteId,
          submitted_at: timestamp
        },
        metadata: {
          form_version: '1.0',
          site: siteId
        },
        processing_state: 'ready_for_dreaming'
      })
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Signup API error:', error.message);
    return res.status(200).json({ ok: true, note: 'Logged locally' });
  }
}
