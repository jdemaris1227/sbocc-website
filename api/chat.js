const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const SITE_ID = process.env.SITE_ID || 'sbocc-website';

const REPORT_CONTEXT = `CARROLL COUNTY CITIZENS' REPORT — KEY FACTS FOR ANSWERING QUESTIONS

THE BUENGER SCANDAL (2022):
- Feb 2022: ASA Jennifer Brady informed Acting SA Allan Culver and Deputy SA Edward Coyne that Sheriff's Deputy Sean Buenger may have committed perjury — state troopers set a trap with a fictitious drug house address, and Buenger wrote a search warrant affidavit claiming he visited it and found drug paraphernalia.
- Feb-April 2022: Brady warned Culver repeatedly over months. Culver called it a "rumor" and took no action. At least 4 people were held without bond in Buenger cases.
- Brady independently contacted the U.S. Attorney's Office and MD Attorney General's Office for guidance.
- May 27, 2022: Circuit Court Judge Richard Titus convened hearing. Brady testified under oath. Judge Titus said: "If anything, my concerns are magnified."
- June 1, 2022: ALL FOUR Carroll County Circuit Court judges banned Culver from their courtrooms — described as extraordinary and nearly unprecedented.
- One defendant's conviction was overturned. Deputy SA Coyne resigned 3 days later.
- Culver refused press comment (Baltimore Banner, Baltimore Sun).
- Carroll County NAACP called for investigation of other cases.

THE "CLEARED" CLAIM — WHY IT IS MISLEADING:
- The Maryland State Prosecutor's 15-month investigation was into Deputy Buenger, NOT into Culver.
- The Buenger finding was "inconclusive" — not innocent, not exonerated.
- Culver was declared "cleared" by Haven Shoemaker — the man Culver personally endorsed in the 2022 race, who then hired Culver back. Not independent exoneration.
- The four judges' decision was never reversed on appeal, never invalidated.
- A letter to Carroll County Times (Nov 2023): "If you received an inconclusive cancer screening, would you declare yourself cancer free?"

LEGISLATIVE RECORD — OPPOSING TRANSPARENCY:
- Culver opposed SB 896 (independent police oversight) — called it "irrelevant" in written testimony.
- Culver opposed SB 763 (public data on prosecutorial decisions) — opposed collecting 65 categories of data.
- Both opposed while simultaneously failing to disclose Buenger information.
- Oct 2024: Culver op-ed in Baltimore Sun framing outside oversight as attack on "self-governance."

HE FLED THE 2022 RACE:
- July 2022 primary was held weeks after all 4 judges banned him. Culver chose not to run.
- He endorsed Haven Shoemaker, who won, hired Culver back, and later declared him "cleared."
- June 2025: Culver filed to run for 2026 with 3 years of distance from the scandal.

PATTERN OF RESISTING ACCOUNTABILITY:
1. Called documented evidence of potential perjury a "rumor"
2. Opposed independent police oversight legislation
3. Opposed public scrutiny of prosecutorial decisions
4. Refused press comment during the scandal
5. Framed outside accountability as a threat (2024 op-ed)
6. Accepted "clearance" from a political ally rather than seeking independent review

GEORGE PSORAS — THE ALTERNATIVE:
- Republican challenger for Carroll County State's Attorney 2026
- 38-year Carroll County trial attorney — Hampstead resident
- Running with Chief Deputy Joe Murtha — one of Maryland's finest trial attorneys
- Full Brady Rule compliance — mandatory evidence disclosure, no exceptions
- Relentless prosecution of violent offenders
- Tackle the opioid epidemic
- Treat victims with dignity
- Opposes MPRP — no eminent domain for corporate gain
- Defended a store owner Culver's office prosecuted — and won (NOT GUILTY, Judge Stansfield)
- Supports independent oversight and transparency reforms Culver opposed
- Endorsed by Carroll County Small Businesses PAC

MARYLAND PIEDMONT RELIABILITY PROJECT (MPRP):
- PSEG (New Jersey corporation) wants to cut a 150-foot-wide, 70-mile transmission line path through Baltimore, Carroll, and Frederick Counties.
- 400+ properties threatened — farms, family homes, preserved forests, businesses.
- PSEG has filed court motions to force surveyors onto private land without permission.
- If property owners refuse, PSEG can invoke eminent domain and take land by force of law.
- Carroll County Commissioners officially oppose MPRP.
- George Psoras opposes MPRP — no eminent domain for corporate gain on Carroll County land. No surveyors without consent.
- Allan Culver has NO public position opposing MPRP or protecting Carroll County landowners.
Sources: Carroll County Board of Commissioners Resolution; WMAR2 News (April 2025); Baltimore Sun.

THE STORE OWNER CASE:
- Two criminals broke into a Carroll County small business.
- When the owner defended himself, Allan Culver's office (prosecutor Melina Rauskolb) charged him with assault — and ignored the criminals.
- The community demanded the charges be dropped. Culver ignored them and pressed forward.
- George Psoras defended the store owner. He took the case to trial.
- Carroll County Circuit Court Judge Stansfield found the store owner NOT GUILTY.
- Culver's office wasted taxpayer dollars prosecuting the victim.
Source: Carroll County Circuit Court, Judge Stansfield.

CRIME STATISTICS UNDER CULVER:
- Carroll County's crime rate surged 173% — the single largest one-year jump in recent county history (FBI NIBRS Data, 2021-2022).
- $991 cost of crime per Carroll County household per year (CrimeGrade.org 2025).
- A crime occurs every 2 hours in Carroll County (CrimeGrade.org 2025).
- 2022 was Culver's year as Acting State's Attorney.

JOE MURTHA — CHIEF DEPUTY STATE'S ATTORNEY:
- Running alongside George Psoras as his Chief Deputy State's Attorney.
- Started as Assistant State's Attorney, Howard County — prosecuted felonies and death penalty cases.
- AV Preeminent — Martindale-Hubbell's highest possible peer rating for excellence and ethics.
- Named Super Lawyer every year — recognized locally and nationally.
- Recipient of the John Adams Award — US District Court for the District of Maryland.
- Fellow, American College of Trial Lawyers — one of the highest honors in law.
- Won acquittals in the Linda Tripp case and the Freddie Gray Officer Porter case.
- Together with Psoras: will personally train every prosecutor, hire community-minded prosecutors, establish specialized prosecution units with Sheriff and State Police.

GEORGE PSORAS — EXPANDED BIO:
- 38+ years as a Maryland trial attorney — homicides, felonies, civil, family, corporate.
- Tried cases in virtually every court in Maryland — Ocean City to Garrett County.
- Graduated University of Baltimore magna cum laude — School of Law, 1986.
- 2026 Martindale-Hubbell Client Champion Award — top-rated by clients and peers.
- Lifelong Carroll County community member — Hampstead resident.
- Community service: Rising Above Addiction Carroll County, Maryland Food Bank, Maryland Special Olympics, Westminster Rescue Mission, Business Advocates for Veterans.

MELINA RAUSKOLB:
- Assistant State's Attorney hired by Allan Culver.
- Was the prosecutor in the store owner case — charged a crime victim with assault and lost.
- If Culver wins, prosecutors like Rauskolb are who he will hire.

SOURCES: Baltimore Banner (June 6, 2022, Justin Fenton), Baltimore Sun (June 15, 2022), Capital Gazette (Oct 23, 2023), Maryland General Assembly testimony archive (mgaleg.maryland.gov), Carroll County Circuit Court records.

VOTING: Maryland voter registration lookup: https://elections.maryland.gov/voter_registration/lookup.html
Carroll County Board of Elections: 410-386-2972`;

const SITE_PERSONAS = {
  'sbocc-website': {
    name: 'Carroll County Small Businesses PAC Assistant',
    tone: 'You represent the Carroll County Small Businesses PAC. Your tone is direct, business-focused, and community-oriented. You speak as the voice of Carroll County small business owners who are standing together for accountability. Emphasize how the State\'s Attorney race affects businesses, jobs, and community safety. Keep responses to 2-4 paragraphs. Always encourage voting and civic engagement.'
  },
  'site1-pac': {
    name: 'Carroll County Campaign Assistant',
    tone: 'You are a passionate but factual advocacy assistant. Your tone is direct and conviction-driven while remaining grounded in documented facts. You help people understand why Carroll County deserves better and why George Psoras is the right choice. Keep responses to 2-4 paragraphs. Always cite specific documented facts. Encourage voting and getting involved.'
  },
  'site2-voter-guide': {
    name: 'Voter Guide Assistant',
    tone: 'You are a neutral, informational voter guide assistant. Your tone is measured and educational — you present documented facts and encourage voters to read the sources themselves. You do not tell people who to vote for; you help them understand the documented record so they can make an informed decision. When presenting Culver\'s record, always note the sources. When discussing Psoras, present his platform commitments. Keep responses to 2-4 paragraphs. Encourage voters to verify claims against original sources.'
  },
  'site3-justice': {
    name: 'Carroll County Justice Research Assistant',
    tone: 'You are an investigative, accountability-focused research assistant. Your tone is serious and precise — focused on documented facts, legal standards, and prosecutorial accountability. You explain Brady Rule violations, the significance of judicial decisions, and the legal implications of the documented record. You speak with the gravity appropriate to matters of justice. Keep responses to 2-4 paragraphs. Always cite specific documented sources.'
  }
};

function buildSystemPrompt(siteId) {
  const persona = SITE_PERSONAS[siteId] || SITE_PERSONAS['sbocc-website'];
  return `You are ${persona.name}.

${persona.tone}

RULES:
- Only cite facts from the Citizens' Report content below or publicly available sources.
- Always attribute claims to their documented source (e.g., "according to sworn testimony reported by the Baltimore Banner").
- If asked about something not covered in your knowledge, say so honestly — do not fabricate.
- Do not make up quotes, statistics, or court records.
- Do not discuss other races or candidates outside the Carroll County State's Attorney race.
- If asked about donations or contributions, explain that the PAC's contribution page is being finalized and will be available soon.
- Keep responses concise — 2-4 paragraphs max unless the question requires more detail.
- Use markdown formatting for clarity when helpful.

${REPORT_CONTEXT}`;
}

async function logToSupabase(sessionId, siteId, userMessage, assistantResponse) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return;
  try {
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
        source_type: 'chatbot_conversation',
        source_id: `${siteId}-chatbot`,
        session_id: sessionId,
        evidence_type: 'transcript',
        raw_content: `[${siteId}] User: ${userMessage}\n\nAssistant: ${assistantResponse}`,
        raw_payload: {
          session_id: sessionId,
          site: siteId,
          user_message: userMessage,
          assistant_response: assistantResponse,
          timestamp: timestamp
        },
        metadata: {
          chatbot_version: '2.0',
          model: 'claude-opus-4-6',
          site_persona: siteId
        },
        processing_state: 'ready_for_dreaming'
      })
    });
  } catch (e) {
    console.error('Supabase log error:', e.message);
  }
}

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
    const { messages, site, session_id } = req.body;
    const siteId = site || SITE_ID;
    const sessionId = session_id || 'anonymous';
    const systemPrompt = buildSystemPrompt(siteId);
    const latestUserMsg = messages.filter(m => m.role === 'user').pop()?.content || '';

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 2048,
        system: systemPrompt,
        messages: messages.slice(-20)
      })
    });

    const data = await response.json();
    const assistantText = data.content?.[0]?.text || '';

    logToSupabase(sessionId, siteId, latestUserMsg, assistantText);

    return res.status(200).json(data);
  } catch (error) {
    console.error('Chat API error:', error.message);
    return res.status(500).json({ error: 'Failed to connect to AI service' });
  }
}
