# PAC Sites Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update all 4 PAC websites to remove donation buttons, add a downloadable Citizens' Report section, upgrade chatbots to Opus with Supabase logging, and add floating chat widgets.

**Architecture:** Each site is a single `index.html` + `api/chat.js` Vercel serverless function. Sites 1-3 already have chatbot sections and API routes using Sonnet. SBOCC (main) has no chatbot yet. All API routes will be upgraded to use Opus, add Supabase evidence logging, and use a server-side system prompt (not client-side). Each site gets a new report download section and a floating chat widget that shares state with the inline chat.

**Tech Stack:** Static HTML/CSS/JS, Vercel serverless functions (Node.js), Anthropic Messages API (claude-opus-4-6), Supabase REST API

**Current state discovered during research:**
- `site1-pac`: Has chatbot (inline only, Sonnet, client-side system prompt), has donate card + modal, has `/api/chat.js`
- `site2-voter-guide`: Has chatbot section + `/api/chat.js` (Sonnet, client-side prompt), no donate elements
- `site3-justice`: Has chatbot section + `/api/chat.js` (Sonnet, client-side prompt), no donate elements
- `sbocc-website`: No chatbot, has full donate section + nav link, has `/api/chat.js` route in vercel.json but no actual chatbot UI

---

### Task 1: Copy PDF to All Sites

**Files:**
- Copy: `culver-citizens-report.pdf` to all 4 site roots

- [ ] **Step 1: Copy the PDF to each site**

```bash
cp /Users/jd/Downloads/culver-citizens-report.pdf /Users/jd/workspace/sbocc-website/
cp /Users/jd/Downloads/culver-citizens-report.pdf /Users/jd/workspace/site1-pac/
cp /Users/jd/Downloads/culver-citizens-report.pdf /Users/jd/workspace/site2-voter-guide/
cp /Users/jd/Downloads/culver-citizens-report.pdf /Users/jd/workspace/site3-justice/
```

- [ ] **Step 2: Verify files exist**

```bash
ls -la /Users/jd/workspace/sbocc-website/culver-citizens-report.pdf
ls -la /Users/jd/workspace/site1-pac/culver-citizens-report.pdf
ls -la /Users/jd/workspace/site2-voter-guide/culver-citizens-report.pdf
ls -la /Users/jd/workspace/site3-justice/culver-citizens-report.pdf
```

Expected: All four files exist, ~46KB each.

- [ ] **Step 3: Commit to each repo**

```bash
cd /Users/jd/workspace/sbocc-website && git add culver-citizens-report.pdf && git commit -m "Add Citizens' Report PDF for download"
cd /Users/jd/workspace/site1-pac && git add culver-citizens-report.pdf && git commit -m "Add Citizens' Report PDF for download"
cd /Users/jd/workspace/site2-voter-guide && git add culver-citizens-report.pdf && git commit -m "Add Citizens' Report PDF for download"
cd /Users/jd/workspace/site3-justice && git add culver-citizens-report.pdf && git commit -m "Add Citizens' Report PDF for download"
```

---

### Task 2: SBOCC Website — Remove Donate Section

**Files:**
- Modify: `/Users/jd/workspace/sbocc-website/index.html`

- [ ] **Step 1: Remove the donate nav link**

In the nav, change:
```html
    <a href="#join">Join Us</a>
    <a href="#donate" class="nav-donate">Donate</a>
```
to:
```html
    <a href="#join">Join Us</a>
```

- [ ] **Step 2: Change hero CTA from donate to mission**

Change:
```html
      <a href="#donate" class="btn-primary">Support the Cause →</a>
```
to:
```html
      <a href="#report" class="btn-primary">Read the Report →</a>
```

- [ ] **Step 3: Remove the entire donate section (lines 669-703)**

Remove the full block:
```html
<!-- DONATE -->
<section class="donate" id="donate">
  ...entire section...
</section>
```

- [ ] **Step 4: Remove donate CSS (lines 342-394)**

Remove all CSS from `/* ── DONATE ── */` through the `.donate-disclaimer` rule block.

- [ ] **Step 5: Remove donate-related CSS in responsive section**

In the `@media (max-width: 768px)` block, remove:
```css
    .donate-tiers { grid-template-columns: repeat(3, 1fr); }
```

- [ ] **Step 6: Remove donate-related JS**

Remove the `selectTier` function and the `donateBtn` logic from the `<script>` block:
```javascript
// Donate tier selection
function selectTier(el, amt) {
  document.querySelectorAll('.donate-tier').forEach(t => t.classList.remove('selected'));
  el.classList.add('selected');
  const btn = document.getElementById('donateBtn');
  btn.textContent = amt > 0
    ? `Contribute $${amt} Securely via WinRed →`
    : 'Contribute Securely via WinRed →';
}
```

- [ ] **Step 7: Remove nav-donate CSS**

Remove:
```css
  .nav-donate {
    background: var(--gold); color: var(--navy) !important;
    padding: 9px 22px; font-weight: 500;
    transition: background 0.2s !important;
  }
  .nav-donate:hover { background: var(--gold-light) !important; }
```

- [ ] **Step 8: Verify the page loads without errors**

Open in browser and confirm no broken references to `#donate`, no JS errors in console.

- [ ] **Step 9: Commit**

```bash
cd /Users/jd/workspace/sbocc-website && git add index.html && git commit -m "Remove donation section pending WinRed approval"
```

---

### Task 3: Site1-PAC — Remove Donate Elements

**Files:**
- Modify: `/Users/jd/workspace/site1-pac/index.html`

- [ ] **Step 1: Remove the donate card from the action section**

In the `<!-- ACTION -->` section (lines 580-630), the `.action-grid` has two columns: volunteer form on left, `.donate-card` on right. Remove the entire donate-card div (lines 612-627):
```html
      <div>
        <div class="donate-card">
          ...entire donate card...
        </div>
      </div>
```

Then change the action-grid to single column by removing the grid wrapper — the volunteer form should take the full width.

- [ ] **Step 2: Remove the donate modal (lines 714-721)**

Remove:
```html
<div class="modal-overlay" id="donateModal">
  ...entire modal...
</div>
```

- [ ] **Step 3: Remove donate-related CSS**

Remove all `.donate-card`, `.donate-amounts`, `.donate-amt`, `.donate-btn`, `.donate-disclaimer`, `.modal-overlay`, `.modal`, `.modal-close` CSS rules.

- [ ] **Step 4: Remove donate-related JS**

Remove from the `<script>` block:
```javascript
let selectedAmount=50;
function selectAmt(el,amt){document.querySelectorAll('.donate-amt').forEach(e=>e.classList.remove('selected'));el.classList.add('selected');selectedAmount=amt;}
function handleDonate(){document.getElementById('donateModal').classList.add('open');}
function closeModal(id){document.getElementById(id).classList.remove('open');}
```

- [ ] **Step 5: Remove "Financial contribution" from the help dropdown**

In the volunteer form's `<select id="helpType">`, remove:
```html
              <option>Financial contribution</option>
```

- [ ] **Step 6: Remove nav CTA if it links to donate**

Check if `.nav-cta` links to donate; if so, change it to link to `#act` or `#chat` instead.

- [ ] **Step 7: Verify and commit**

```bash
cd /Users/jd/workspace/site1-pac && git add index.html && git commit -m "Remove donation elements pending WinRed approval"
```

---

### Task 4: SBOCC Website — Add Report Download Section

**Files:**
- Modify: `/Users/jd/workspace/sbocc-website/index.html`

- [ ] **Step 1: Add report section CSS**

Add after the `.why-card p` CSS rules (before `/* ── CANDIDATE ── */`):

```css
  /* ── REPORT ── */
  .report {
    background:
      radial-gradient(ellipse 70% 80% at 50% 50%, rgba(200,151,58,0.06) 0%, transparent 70%),
      var(--navy);
    text-align: center;
  }
  .report .section-label { justify-content: center; }
  .report .section-label::before { display: none; }
  .report .section-title { margin: 0 auto 16px; }
  .report .section-lead { margin: 0 auto 36px; text-align: left; max-width: 620px; }
  .report-download {
    display: inline-block;
    background: var(--gold); color: var(--navy);
    padding: 18px 56px; font-family: 'DM Mono', monospace;
    font-size: 13px; letter-spacing: 0.16em;
    text-transform: uppercase; font-weight: 500;
    text-decoration: none; border: none; cursor: pointer;
    transition: all 0.2s;
  }
  .report-download:hover { background: var(--gold-light); transform: translateY(-2px); }
  .report-meta {
    font-family: 'DM Mono', monospace;
    font-size: 10px; color: var(--white-muted);
    line-height: 1.8; max-width: 560px; margin: 20px auto 0;
  }
```

- [ ] **Step 2: Add report section HTML**

Insert after the `<!-- WHY IT MATTERS -->` section closing `</section>` and before `<!-- CANDIDATE -->`:

```html
<!-- REPORT -->
<section class="report" id="report">
  <div class="section-inner">
    <div class="section-label">The Documented Record</div>
    <h2 class="section-title">Read the Full Report</h2>
    <p class="section-lead">The Carroll County Citizens' Report documents Allan Culver Jr.'s record using sworn court testimony, published judicial orders, official legislative testimony, and reporting by the Baltimore Banner, Baltimore Sun, and Capital Gazette. Every claim is sourced. Read it and decide for yourself.</p>
    <a href="/culver-citizens-report.pdf" download class="report-download">Download the Citizens' Report (PDF) →</a>
    <p class="report-meta">
      22 pages · Published March 2026 · Version 1.0<br>
      Paid for by Carroll County Small Businesses PAC. Not authorized by any candidate or candidate's committee.
    </p>
  </div>
</section>
```

- [ ] **Step 3: Add report nav link**

In the nav links, add a Report link:
```html
    <a href="#mission">Our Mission</a>
    <a href="#report">The Report</a>
    <a href="#candidate">George Psoras</a>
    <a href="#join">Join Us</a>
```

- [ ] **Step 4: Verify and commit**

```bash
cd /Users/jd/workspace/sbocc-website && git add index.html && git commit -m "Add Citizens' Report download section"
```

---

### Task 5: Site1-PAC — Add Report Download Section

**Files:**
- Modify: `/Users/jd/workspace/site1-pac/index.html`

- [ ] **Step 1: Identify insertion point**

Read the HTML structure to find where to insert the report section — it should go after the main content sections and before the chatbot section. The site1-pac sections are: hero, band, timeline/facts sections, chatbot, action, RRN, footer. Insert before chatbot.

- [ ] **Step 2: Add report section CSS**

Style the report section using site1-pac's existing design language (light background with dark text — this site uses `--white` background sections):

```css
  .report-section { background: var(--navy); padding: 80px 40px; text-align: center; }
  .report-section .section-label { color: var(--gold); justify-content: center; }
  .report-section h2 { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 44px); font-weight: 700; color: var(--white); margin-bottom: 16px; }
  .report-section p { font-size: 17px; color: rgba(247,244,239,0.7); max-width: 620px; margin: 0 auto 32px; font-weight: 300; line-height: 1.7; }
  .report-download { display: inline-block; background: var(--gold); color: var(--navy); padding: 16px 44px; border-radius: 3px; font-family: 'Source Serif 4', serif; font-size: 16px; font-weight: 600; text-decoration: none; transition: all 0.2s; }
  .report-download:hover { background: var(--gold-light); transform: translateY(-1px); }
  .report-meta { font-family: 'DM Mono', monospace; font-size: 10px; color: rgba(247,244,239,0.35); line-height: 1.8; margin-top: 20px; }
```

- [ ] **Step 3: Add report section HTML**

Insert before `<!-- CHATBOT -->`:
```html
<!-- REPORT -->
<section class="report-section" id="report">
  <div class="section-inner">
    <div class="section-label">The Documented Record</div>
    <h2>Read the Full Citizens' Report</h2>
    <p>We compiled the documented case against Allan Culver Jr. from sworn court testimony, judicial orders, legislative records, and published journalism. Every claim is sourced. 22 pages of facts Carroll County voters deserve to see.</p>
    <a href="/culver-citizens-report.pdf" download class="report-download">Download the Report (PDF) →</a>
    <p class="report-meta">22 pages · March 2026 · Carroll County Small Businesses PAC<br>Not authorized by any candidate or candidate's committee.</p>
  </div>
</section>
```

- [ ] **Step 4: Add report nav link**

Add `<a href="#report">The Report</a>` to the nav links.

- [ ] **Step 5: Commit**

```bash
cd /Users/jd/workspace/site1-pac && git add index.html && git commit -m "Add Citizens' Report download section"
```

---

### Task 6: Site2-Voter-Guide — Add Report Download Section

**Files:**
- Modify: `/Users/jd/workspace/site2-voter-guide/index.html`

- [ ] **Step 1: Identify insertion point and read surrounding HTML**

Read the voter guide structure. This site uses a newspaper design with `--ink`, `--paper` colors. The report section should use neutral language appropriate for a voter guide.

- [ ] **Step 2: Add report section CSS**

```css
  .report-section { background: var(--ink); padding: 60px 40px; text-align: center; }
  .report-section .section-label { color: rgba(245,242,235,0.5); justify-content: center; }
  .report-section .section-label::after { display: none; }
  .report-section h2 { font-family: 'Libre Baskerville', serif; font-size: 28px; color: var(--paper); margin-bottom: 12px; }
  .report-section p { font-size: 15px; color: rgba(245,242,235,0.6); max-width: 600px; margin: 0 auto 28px; font-weight: 300; line-height: 1.7; }
  .report-download { display: inline-block; background: var(--accent); color: white; padding: 14px 36px; font-family: 'Source Sans 3', sans-serif; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 2px; transition: all 0.2s; }
  .report-download:hover { background: #3a6fa0; }
  .report-meta { font-family: 'Courier Prime', monospace; font-size: 10px; color: rgba(245,242,235,0.35); line-height: 1.8; margin-top: 16px; }
```

- [ ] **Step 3: Add report section HTML**

Insert before the chatbot section:
```html
<!-- REPORT -->
<hr class="section-rule">
<section class="report-section" id="report">
  <div class="page-inner">
    <div class="section-label">Source Document</div>
    <h2>Citizens' Report: The Documented Case</h2>
    <p>An independent report compiled from sworn court testimony, judicial orders, legislative records, and published journalism. Published by the Carroll County Small Businesses PAC. 22 pages, fully sourced.</p>
    <a href="/culver-citizens-report.pdf" download class="report-download">Download Source Document (PDF) →</a>
    <p class="report-meta">22 pages · March 2026 · Readers are encouraged to verify all claims against the original sources cited.<br>Paid for by Carroll County Small Businesses PAC. Not authorized by any candidate or candidate's committee.</p>
  </div>
</section>
```

- [ ] **Step 4: Add nav link**

Add `<a href="#report">Report</a>` to `.masthead-nav`.

- [ ] **Step 5: Commit**

```bash
cd /Users/jd/workspace/site2-voter-guide && git add index.html && git commit -m "Add Citizens' Report download section"
```

---

### Task 7: Site3-Justice — Add Report Download Section

**Files:**
- Modify: `/Users/jd/workspace/site3-justice/index.html`

- [ ] **Step 1: Identify insertion point and read surrounding HTML**

This site uses a dark investigative theme with `--black`, `--red`, `--cream` colors and Bebas Neue/Crimson Pro fonts.

- [ ] **Step 2: Add report section CSS**

```css
  .report-section { background: var(--dark); padding: 80px 40px; text-align: center; border-top: 1px solid rgba(192,57,43,0.2); }
  .report-section .exp-label { justify-content: center; }
  .report-section .exp-label::after { display: none; }
  .report-section h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(36px, 5vw, 56px); letter-spacing: 0.04em; color: var(--white); margin-bottom: 12px; }
  .report-section p { font-size: 18px; color: var(--sand); max-width: 620px; margin: 0 auto 32px; font-weight: 300; line-height: 1.6; }
  .report-download { display: inline-block; background: var(--red); color: white; padding: 14px 36px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none; transition: background 0.2s; border: none; cursor: pointer; }
  .report-download:hover { background: var(--red-dark); }
  .report-meta { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: var(--dust); line-height: 1.8; margin-top: 20px; }
```

- [ ] **Step 3: Add report section HTML**

Insert before the chatbot section:
```html
<!-- REPORT -->
<section class="report-section" id="report">
  <div class="section-inner">
    <div class="exp-label">The Evidence</div>
    <h2>The Full Documented Case</h2>
    <p>22 pages of court records, sworn testimony, legislative records, and published journalism. Every claim sourced. Every quote attributed. Read it yourself.</p>
    <a href="/culver-citizens-report.pdf" download class="report-download">Download the Evidence (PDF) →</a>
    <p class="report-meta">Carroll County Citizens' Report · March 2026 · Version 1.0<br>Paid for by Carroll County Small Businesses PAC. Not authorized by any candidate or candidate's committee.</p>
  </div>
</section>
```

- [ ] **Step 4: Add nav link**

Add `<a href="#report">Evidence</a>` to `.nav-links`.

- [ ] **Step 5: Commit**

```bash
cd /Users/jd/workspace/site3-justice && git add index.html && git commit -m "Add Citizens' Report download section"
```

---

### Task 8: Upgrade API Route — Shared Chat Backend

All 4 sites use identical `api/chat.js` files. We'll upgrade them all to:
- Use Claude Opus (`claude-opus-4-6`)
- Move system prompt to server-side (not sent from client)
- Accept a `site` parameter to select persona
- Log conversations to Supabase `evidence_events`
- Stream responses via SSE

**Files:**
- Create/Overwrite: `api/chat.js` in all 4 sites (identical file)

- [ ] **Step 1: Write the upgraded API route**

Write this file to `/Users/jd/workspace/sbocc-website/api/chat.js`:

```javascript
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
- Full Brady Rule compliance — mandatory evidence disclosure, no exceptions
- Relentless prosecution of violent offenders
- Tackle the opioid epidemic
- Treat victims with dignity
- Supports independent oversight and transparency reforms Culver opposed
- Endorsed by Carroll County Small Businesses PAC

SOURCES: Baltimore Banner (June 6, 2022, Justin Fenton), Baltimore Sun (June 15, 2022), Capital Gazette (Oct 23, 2023), Maryland General Assembly testimony archive (mgaleg.maryland.gov), Carroll County Circuit Court records.

VOTING: Maryland voter registration lookup: https://elections.maryland.gov/voter_registration/lookup.html
Carroll County Board of Elections: 410-386-2972`;

const SITE_PERSONAS = {
  'sbocc-website': {
    name: 'Carroll County Small Businesses PAC Assistant',
    tone: `You represent the Carroll County Small Businesses PAC. Your tone is direct, business-focused, and community-oriented. You speak as the voice of Carroll County small business owners who are standing together for accountability. Emphasize how the State's Attorney race affects businesses, jobs, and community safety. Keep responses to 2-4 paragraphs. Always encourage voting and civic engagement.`
  },
  'site1-pac': {
    name: 'Carroll County Campaign Assistant',
    tone: `You are a passionate but factual advocacy assistant. Your tone is direct and conviction-driven while remaining grounded in documented facts. You help people understand why Carroll County deserves better and why George Psoras is the right choice. Keep responses to 2-4 paragraphs. Always cite specific documented facts. Encourage voting and getting involved.`
  },
  'site2-voter-guide': {
    name: 'Voter Guide Assistant',
    tone: `You are a neutral, informational voter guide assistant. Your tone is measured and educational — you present documented facts and encourage voters to read the sources themselves. You do not tell people who to vote for; you help them understand the documented record so they can make an informed decision. When presenting Culver's record, always note the sources. When discussing Psoras, present his platform commitments. Keep responses to 2-4 paragraphs. Encourage voters to verify claims against original sources.`
  },
  'site3-justice': {
    name: 'Carroll County Justice Research Assistant',
    tone: `You are an investigative, accountability-focused research assistant. Your tone is serious and precise — focused on documented facts, legal standards, and prosecutorial accountability. You explain Brady Rule violations, the significance of judicial decisions, and the legal implications of the documented record. You speak with the gravity appropriate to matters of justice. Keep responses to 2-4 paragraphs. Always cite specific documented sources.`
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
    // Non-blocking — don't fail the chat response if logging fails
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

    // Get the latest user message for logging
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
        messages: messages.slice(-20) // Last 20 messages max
      })
    });

    const data = await response.json();
    const assistantText = data.content?.[0]?.text || '';

    // Log to Supabase (non-blocking)
    logToSupabase(sessionId, siteId, latestUserMsg, assistantText);

    return res.status(200).json(data);
  } catch (error) {
    console.error('Chat API error:', error.message);
    return res.status(500).json({ error: 'Failed to connect to AI service' });
  }
}
```

- [ ] **Step 2: Copy to all 4 sites**

```bash
cp /Users/jd/workspace/sbocc-website/api/chat.js /Users/jd/workspace/site1-pac/api/chat.js
cp /Users/jd/workspace/sbocc-website/api/chat.js /Users/jd/workspace/site2-voter-guide/api/chat.js
cp /Users/jd/workspace/sbocc-website/api/chat.js /Users/jd/workspace/site3-justice/api/chat.js
```

- [ ] **Step 3: Update vercel.json for sbocc-website**

The current `vercel.json` in sbocc-website is a simple static config. Update it to include the API route:

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ],
  "functions": {
    "api/chat.js": { "memory": 256, "maxDuration": 30 }
  }
}
```

- [ ] **Step 4: Commit to all repos**

```bash
cd /Users/jd/workspace/sbocc-website && git add api/chat.js vercel.json && git commit -m "Upgrade chat API to Opus with Supabase logging"
cd /Users/jd/workspace/site1-pac && git add api/chat.js && git commit -m "Upgrade chat API to Opus with Supabase logging"
cd /Users/jd/workspace/site2-voter-guide && git add api/chat.js && git commit -m "Upgrade chat API to Opus with Supabase logging"
cd /Users/jd/workspace/site3-justice && git add api/chat.js && git commit -m "Upgrade chat API to Opus with Supabase logging"
```

---

### Task 9: SBOCC Website — Add Chatbot (Inline + Floating Widget)

SBOCC is the only site without any chatbot UI. We need to add both the inline section and floating widget.

**Files:**
- Modify: `/Users/jd/workspace/sbocc-website/index.html`

- [ ] **Step 1: Add chatbot CSS**

Add before `/* ── JOIN / SIGNUP ── */`:

```css
  /* ── CHATBOT ── */
  .chat-section { background: var(--navy-mid); }
  .chat-section .section-label { color: var(--gold); }
  .chat-intro {
    font-size: 17px; color: var(--white-dim); font-weight: 300;
    line-height: 1.75; max-width: 640px; margin-bottom: 36px;
  }
  .chat-container {
    max-width: 740px; background: var(--navy-light);
    border: 1px solid var(--gold-border); overflow: hidden;
  }
  .chat-header {
    display: flex; align-items: center; gap: 12px;
    padding: 16px 20px; background: rgba(200,151,58,0.08);
    border-bottom: 1px solid var(--gold-border);
  }
  .chat-avatar {
    width: 36px; height: 36px; background: var(--gold);
    color: var(--navy); display: flex; align-items: center;
    justify-content: center; font-family: 'DM Mono', monospace;
    font-size: 14px; font-weight: 700;
  }
  .chat-header-text h4 {
    font-family: 'Playfair Display', serif; font-size: 15px;
    color: var(--white); font-weight: 600;
  }
  .chat-header-text span {
    font-family: 'DM Mono', monospace; font-size: 10px;
    color: var(--white-muted); letter-spacing: 0.08em;
  }
  .online-dot {
    width: 8px; height: 8px; background: #4caf50;
    border-radius: 50%; margin-left: auto;
  }
  .chat-messages {
    height: 320px; overflow-y: auto; padding: 20px;
    display: flex; flex-direction: column; gap: 16px;
  }
  .msg { display: flex; gap: 10px; align-items: flex-start; }
  .msg-icon {
    width: 28px; height: 28px; display: flex; align-items: center;
    justify-content: center; font-size: 14px; flex-shrink: 0;
  }
  .msg.bot .msg-icon { background: var(--gold-dim); color: var(--gold); }
  .msg.user .msg-icon { background: rgba(247,244,239,0.08); color: var(--white-dim); }
  .msg-bubble {
    font-size: 14px; line-height: 1.65; color: var(--white-dim);
    max-width: 85%;
  }
  .msg.user { flex-direction: row-reverse; }
  .msg.user .msg-bubble { text-align: right; color: var(--white); }
  .chat-quick-replies {
    display: flex; gap: 8px; padding: 0 20px 12px; flex-wrap: wrap;
  }
  .quick-reply {
    padding: 8px 16px; background: rgba(200,151,58,0.1);
    border: 1px solid var(--gold-border); color: var(--gold);
    font-family: 'DM Mono', monospace; font-size: 11px;
    cursor: pointer; transition: all 0.2s; letter-spacing: 0.02em;
  }
  .quick-reply:hover { background: var(--gold); color: var(--navy); }
  .chat-input-bar {
    display: flex; border-top: 1px solid var(--gold-border);
  }
  .chat-input {
    flex: 1; padding: 14px 16px; background: transparent;
    border: none; color: var(--white); font-family: 'Source Serif 4', serif;
    font-size: 14px; outline: none;
  }
  .chat-input::placeholder { color: var(--white-muted); }
  .chat-send {
    padding: 14px 20px; background: var(--gold); color: var(--navy);
    border: none; cursor: pointer; font-size: 16px; transition: background 0.2s;
  }
  .chat-send:hover { background: var(--gold-light); }
  .typing-indicator { display: flex; gap: 4px; padding: 4px 0; }
  .typing-dot {
    width: 6px; height: 6px; background: var(--gold);
    border-radius: 50%; opacity: 0.4;
    animation: typingPulse 1.4s infinite;
  }
  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes typingPulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }

  /* ── FLOATING WIDGET ── */
  .chat-widget-btn {
    position: fixed; bottom: 28px; right: 28px; z-index: 999;
    width: 60px; height: 60px; border-radius: 50%;
    background: var(--gold); color: var(--navy);
    border: none; cursor: pointer; font-size: 24px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    transition: all 0.3s; display: flex;
    align-items: center; justify-content: center;
  }
  .chat-widget-btn:hover { transform: scale(1.08); background: var(--gold-light); }
  .chat-widget-btn.hidden { display: none; }
  .chat-widget-panel {
    position: fixed; bottom: 100px; right: 28px; z-index: 998;
    width: 380px; max-height: 520px;
    background: var(--navy-mid); border: 1px solid var(--gold-border);
    box-shadow: 0 8px 40px rgba(0,0,0,0.4);
    display: none; flex-direction: column; overflow: hidden;
  }
  .chat-widget-panel.open { display: flex; }
  .chat-widget-panel .chat-header { padding: 12px 16px; }
  .chat-widget-close {
    margin-left: auto; background: none; border: none;
    color: var(--white-muted); font-size: 18px; cursor: pointer;
    padding: 0 4px;
  }
  .chat-widget-close:hover { color: var(--white); }
  .chat-widget-panel .chat-messages { height: 300px; padding: 16px; }
  .chat-widget-panel .chat-quick-replies { padding: 0 16px 8px; }
  .chat-widget-panel .quick-reply { font-size: 10px; padding: 6px 12px; }

  @media (max-width: 768px) {
    .chat-widget-panel { width: calc(100vw - 24px); right: 12px; bottom: 90px; max-height: 70vh; }
    .chat-widget-btn { bottom: 16px; right: 16px; width: 52px; height: 52px; font-size: 20px; }
  }
```

- [ ] **Step 2: Add inline chatbot section HTML**

Insert after `</section>` of the report section and before `<!-- JOIN -->`:

```html
<!-- CHATBOT -->
<section class="chat-section" id="chat">
  <div class="section-inner">
    <div class="section-label">Ask Questions</div>
    <h2 class="section-title">Have Questions? Ask Our AI Assistant.</h2>
    <p class="chat-intro">Our assistant can walk you through the documented record, explain Brady violations, tell you about George Psoras, and help you understand why this race matters to Carroll County businesses.</p>
    <div class="chat-container">
      <div class="chat-header">
        <div class="chat-avatar">S</div>
        <div class="chat-header-text">
          <h4>SBOCC PAC Assistant</h4>
          <span>Powered by AI · Here to help</span>
        </div>
        <div class="online-dot"></div>
      </div>
      <div class="chat-messages" id="chatMessages">
        <div class="msg bot"><div class="msg-icon">⚖</div><div class="msg-bubble">Hello. I'm here to answer your questions about the 2026 Carroll County State's Attorney race and why Carroll County's small business community is standing together. What would you like to know?</div></div>
      </div>
      <div class="chat-quick-replies" id="quickReplies">
        <button class="quick-reply" onclick="sendQuick('Why does the SA race matter to businesses?')">Why it matters to business</button>
        <button class="quick-reply" onclick="sendQuick('What happened with the Buenger scandal?')">The Buenger scandal</button>
        <button class="quick-reply" onclick="sendQuick('Tell me about George Psoras')">About Psoras</button>
        <button class="quick-reply" onclick="sendQuick('What is the Brady Rule?')">The Brady Rule</button>
      </div>
      <div class="chat-input-bar">
        <input type="text" class="chat-input" id="chatInput" placeholder="Ask about the race, the record, or how to get involved..." onkeydown="if(event.key==='Enter') sendMessage()">
        <button class="chat-send" onclick="sendMessage()">&#10148;</button>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Add floating widget HTML**

Insert before `</body>`:

```html
<!-- FLOATING CHAT WIDGET -->
<button class="chat-widget-btn" id="chatWidgetBtn" onclick="toggleWidget()" aria-label="Open chat">&#128172;</button>
<div class="chat-widget-panel" id="chatWidgetPanel">
  <div class="chat-header">
    <div class="chat-avatar">S</div>
    <div class="chat-header-text">
      <h4>SBOCC PAC Assistant</h4>
      <span>Powered by AI</span>
    </div>
    <button class="chat-widget-close" onclick="toggleWidget()">&#10005;</button>
  </div>
  <div class="chat-messages" id="widgetMessages">
    <div class="msg bot"><div class="msg-icon">⚖</div><div class="msg-bubble">Have a question about the race? Ask away.</div></div>
  </div>
  <div class="chat-quick-replies" id="widgetQuickReplies">
    <button class="quick-reply" onclick="sendQuick('What happened with the Buenger scandal?', true)">Buenger scandal</button>
    <button class="quick-reply" onclick="sendQuick('Tell me about George Psoras', true)">About Psoras</button>
  </div>
  <div class="chat-input-bar">
    <input type="text" class="chat-input" id="widgetInput" placeholder="Ask a question..." onkeydown="if(event.key==='Enter') sendMessage(true)">
    <button class="chat-send" onclick="sendMessage(true)">&#10148;</button>
  </div>
</div>
```

- [ ] **Step 4: Add chatbot JavaScript**

Add to the `<script>` block (replace or add after existing JS):

```javascript
// Chat
const SESSION_ID = crypto.randomUUID();
const conversationHistory = [];

function toggleWidget() {
  const panel = document.getElementById('chatWidgetPanel');
  const btn = document.getElementById('chatWidgetBtn');
  const isOpen = panel.classList.toggle('open');
  btn.textContent = isOpen ? '✕' : '💬';
}

async function callClaude(msg) {
  conversationHistory.push({ role: 'user', content: msg });
  const r = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: conversationHistory,
      site: 'sbocc-website',
      session_id: SESSION_ID
    })
  });
  const d = await r.json();
  const reply = d.content?.[0]?.text || "I'm sorry, I had trouble responding. Please try again.";
  conversationHistory.push({ role: 'assistant', content: reply });
  return reply;
}

function appendMessage(role, text, isWidget) {
  const containerId = isWidget ? 'widgetMessages' : 'chatMessages';
  const c = document.getElementById(containerId);
  const d = document.createElement('div');
  d.className = `msg ${role}`;
  const icon = role === 'bot' ? '⚖' : '👤';
  d.innerHTML = `<div class="msg-icon">${icon}</div><div class="msg-bubble">${text.replace(/\n/g, '<br>')}</div>`;
  c.appendChild(d);
  c.scrollTop = c.scrollHeight;
}

function syncMessage(role, text, sourceIsWidget) {
  appendMessage(role, text, sourceIsWidget);
  appendMessage(role, text, !sourceIsWidget);
}

function showTyping(isWidget) {
  const containerId = isWidget ? 'widgetMessages' : 'chatMessages';
  const c = document.getElementById(containerId);
  const d = document.createElement('div');
  d.className = 'msg bot';
  d.id = isWidget ? 'widgetTyping' : 'typingIndicator';
  d.innerHTML = '<div class="msg-icon">⚖</div><div class="msg-bubble"><div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div>';
  c.appendChild(d);
  c.scrollTop = c.scrollHeight;
}

function removeTyping(isWidget) {
  const id = isWidget ? 'widgetTyping' : 'typingIndicator';
  const e = document.getElementById(id);
  if (e) e.remove();
}

async function sendMessage(isWidget) {
  const inputId = isWidget ? 'widgetInput' : 'chatInput';
  const quickId = isWidget ? 'widgetQuickReplies' : 'quickReplies';
  const i = document.getElementById(inputId);
  const t = i.value.trim();
  if (!t) return;
  i.value = '';
  document.getElementById(quickId).style.display = 'none';
  // Hide quick replies on both sides
  document.getElementById('quickReplies').style.display = 'none';
  document.getElementById('widgetQuickReplies').style.display = 'none';
  syncMessage('user', t, isWidget);
  showTyping(false);
  showTyping(true);
  try {
    const r = await callClaude(t);
    removeTyping(false);
    removeTyping(true);
    syncMessage('bot', r, isWidget);
  } catch (e) {
    removeTyping(false);
    removeTyping(true);
    syncMessage('bot', 'I had trouble connecting. Please try again.', isWidget);
  }
}

function sendQuick(t, isWidget) {
  const inputId = isWidget ? 'widgetInput' : 'chatInput';
  document.getElementById(inputId).value = t;
  sendMessage(isWidget);
}
```

- [ ] **Step 5: Add chat nav link**

Update nav to include chat link:
```html
    <a href="#report">The Report</a>
    <a href="#chat">Ask AI</a>
    <a href="#candidate">George Psoras</a>
```

- [ ] **Step 6: Verify and commit**

```bash
cd /Users/jd/workspace/sbocc-website && git add index.html && git commit -m "Add AI chatbot with inline section and floating widget"
```

---

### Task 10: Site1-PAC — Upgrade Chatbot & Add Floating Widget

Site1-pac already has an inline chatbot. We need to:
- Remove the client-side system prompt (now server-side)
- Update `callClaude` to send `site` and `session_id`
- Add the floating widget HTML + CSS + JS
- Sync messages between inline and widget

**Files:**
- Modify: `/Users/jd/workspace/site1-pac/index.html`

- [ ] **Step 1: Remove the SYSTEM_PROMPT constant from the script**

Remove the entire `const SYSTEM_PROMPT = ...` block (lines 725-753 approximately — the large template literal).

- [ ] **Step 2: Update callClaude function**

Replace:
```javascript
async function callClaude(msg) {
  conversationHistory.push({role:'user',content:msg});
  const r = await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({system:SYSTEM_PROMPT,messages:conversationHistory})});
  const d = await r.json();
  const reply = d.content?.[0]?.text || "I'm sorry, I had trouble responding. Please try again.";
  conversationHistory.push({role:'assistant',content:reply});
  return reply;
}
```
with:
```javascript
const SESSION_ID = crypto.randomUUID();
async function callClaude(msg) {
  conversationHistory.push({role:'user',content:msg});
  const r = await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:conversationHistory,site:'site1-pac',session_id:SESSION_ID})});
  const d = await r.json();
  const reply = d.content?.[0]?.text || "I'm sorry, I had trouble responding. Please try again.";
  conversationHistory.push({role:'assistant',content:reply});
  return reply;
}
```

- [ ] **Step 3: Add floating widget CSS**

Add to the `<style>` block:

```css
  .chat-widget-btn { position:fixed; bottom:28px; right:28px; z-index:999; width:60px; height:60px; border-radius:50%; background:var(--gold); color:var(--navy); border:none; cursor:pointer; font-size:24px; box-shadow:0 4px 20px rgba(0,0,0,0.3); transition:all 0.3s; display:flex; align-items:center; justify-content:center; }
  .chat-widget-btn:hover { transform:scale(1.08); background:var(--gold-light); }
  .chat-widget-panel { position:fixed; bottom:100px; right:28px; z-index:998; width:380px; max-height:520px; background:var(--navy); border:1px solid rgba(200,151,58,0.25); box-shadow:0 8px 40px rgba(0,0,0,0.4); display:none; flex-direction:column; overflow:hidden; border-radius:6px; }
  .chat-widget-panel.open { display:flex; }
  .chat-widget-panel .chat-header { padding:12px 16px; }
  .chat-widget-close { margin-left:auto; background:none; border:none; color:rgba(247,244,239,0.5); font-size:18px; cursor:pointer; }
  .chat-widget-close:hover { color:var(--white); }
  .chat-widget-panel .chat-messages { height:300px; }
  .chat-widget-panel .chat-quick-replies { padding:0 16px 8px; }
  .chat-widget-panel .quick-reply { font-size:10px; padding:6px 12px; }
  @media(max-width:640px) { .chat-widget-panel { width:calc(100vw - 24px); right:12px; bottom:90px; max-height:70vh; } .chat-widget-btn { bottom:16px; right:16px; width:52px; height:52px; } }
```

- [ ] **Step 4: Add floating widget HTML**

Insert before `</body>`:
```html
<button class="chat-widget-btn" id="chatWidgetBtn" onclick="toggleWidget()" aria-label="Open chat">&#128172;</button>
<div class="chat-widget-panel" id="chatWidgetPanel">
  <div class="chat-header">
    <div class="chat-avatar">C</div>
    <div class="chat-header-text"><h4>Carroll County PAC Assistant</h4><span>Powered by AI</span></div>
    <button class="chat-widget-close" onclick="toggleWidget()">&#10005;</button>
  </div>
  <div class="chat-messages" id="widgetMessages">
    <div class="msg bot"><div class="msg-icon">⚖</div><div class="msg-bubble">Have a question about the race? Ask away.</div></div>
  </div>
  <div class="chat-quick-replies" id="widgetQuickReplies">
    <button class="quick-reply" onclick="sendQuick('What happened with the Buenger scandal?', true)">Buenger scandal</button>
    <button class="quick-reply" onclick="sendQuick('Tell me about George Psoras', true)">About Psoras</button>
  </div>
  <div class="chat-input-bar">
    <input type="text" class="chat-input" id="widgetInput" placeholder="Ask a question..." onkeydown="if(event.key==='Enter') sendMessage(true)">
    <button class="chat-send" onclick="sendMessage(true)">&#10148;</button>
  </div>
</div>
```

- [ ] **Step 5: Update JS functions for widget sync**

Update `appendMessage`, `showTyping`, `removeTyping`, `sendMessage`, and `sendQuick` to handle the `isWidget` parameter and sync messages between both chat UIs. Add `toggleWidget` function. This follows the same pattern as Task 9 Step 4 — adapt the existing functions to accept the `isWidget` boolean and sync both message containers.

Replace the existing message/typing/send functions with:
```javascript
function toggleWidget() {
  const panel = document.getElementById('chatWidgetPanel');
  const btn = document.getElementById('chatWidgetBtn');
  const isOpen = panel.classList.toggle('open');
  btn.textContent = isOpen ? '✕' : '💬';
}

function appendMessage(role, text, isWidget) {
  const c = document.getElementById(isWidget ? 'widgetMessages' : 'chatMessages');
  const d = document.createElement('div');
  d.className = `msg ${role}`;
  const icon = role === 'bot' ? '⚖' : '👤';
  d.innerHTML = `<div class="msg-icon">${icon}</div><div class="msg-bubble">${text.replace(/\n/g,'<br>')}</div>`;
  c.appendChild(d); c.scrollTop = c.scrollHeight;
}

function syncMessage(role, text, sourceIsWidget) {
  appendMessage(role, text, sourceIsWidget);
  appendMessage(role, text, !sourceIsWidget);
}

function showTyping(isWidget) {
  const c = document.getElementById(isWidget ? 'widgetMessages' : 'chatMessages');
  const d = document.createElement('div');
  d.className = 'msg bot'; d.id = isWidget ? 'widgetTyping' : 'typingIndicator';
  d.innerHTML = '<div class="msg-icon">⚖</div><div class="msg-bubble"><div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div>';
  c.appendChild(d); c.scrollTop = c.scrollHeight;
}

function removeTyping(isWidget) {
  const e = document.getElementById(isWidget ? 'widgetTyping' : 'typingIndicator');
  if (e) e.remove();
}

async function sendMessage(isWidget) {
  const i = document.getElementById(isWidget ? 'widgetInput' : 'chatInput');
  const t = i.value.trim(); if (!t) return;
  i.value = '';
  document.getElementById('quickReplies').style.display = 'none';
  document.getElementById('widgetQuickReplies').style.display = 'none';
  syncMessage('user', t, isWidget);
  showTyping(false); showTyping(true);
  try { const r = await callClaude(t); removeTyping(false); removeTyping(true); syncMessage('bot', r, isWidget); }
  catch (e) { removeTyping(false); removeTyping(true); syncMessage('bot', 'I had trouble connecting. Please try again.', isWidget); }
}

function sendQuick(t, isWidget) {
  document.getElementById(isWidget ? 'widgetInput' : 'chatInput').value = t;
  sendMessage(isWidget);
}
```

- [ ] **Step 6: Commit**

```bash
cd /Users/jd/workspace/site1-pac && git add index.html && git commit -m "Upgrade chatbot to Opus, add floating widget, sync messages"
```

---

### Task 11: Site2-Voter-Guide — Upgrade Chatbot & Add Floating Widget

**Files:**
- Modify: `/Users/jd/workspace/site2-voter-guide/index.html`

- [ ] **Step 1: Read the existing chatbot section and JS**

Read the chatbot section HTML and the `<script>` block to understand the current implementation (which elements exist, CSS class names used, system prompt location).

- [ ] **Step 2: Remove client-side system prompt, update callClaude**

Same pattern as Task 10 — remove `SYSTEM_PROMPT` constant, update `callClaude` to send `site: 'site2-voter-guide'` and `session_id: SESSION_ID`.

- [ ] **Step 3: Add floating widget CSS**

Style using site2's design language (`--ink`, `--paper`, `--accent` colors, `Courier Prime`/`Libre Baskerville` fonts):

```css
  .chat-widget-btn { position:fixed; bottom:28px; right:28px; z-index:999; width:56px; height:56px; border-radius:50%; background:var(--accent); color:white; border:none; cursor:pointer; font-size:22px; box-shadow:0 4px 16px rgba(0,0,0,0.2); transition:all 0.3s; display:flex; align-items:center; justify-content:center; }
  .chat-widget-btn:hover { transform:scale(1.08); background:#3a6fa0; }
  .chat-widget-panel { position:fixed; bottom:96px; right:28px; z-index:998; width:380px; max-height:520px; background:var(--ink); border:1px solid var(--rule); box-shadow:0 8px 32px rgba(0,0,0,0.3); display:none; flex-direction:column; overflow:hidden; border-radius:3px; }
  .chat-widget-panel.open { display:flex; }
  .chat-widget-panel .chat-header { padding:12px 16px; background:rgba(44,90,142,0.1); border-bottom:1px solid var(--rule); }
  .chat-widget-close { margin-left:auto; background:none; border:none; color:rgba(245,242,235,0.5); font-size:18px; cursor:pointer; }
  .chat-widget-panel .chat-messages { height:300px; }
  .chat-widget-panel .chat-starters { padding:0 16px 8px; }
  .chat-widget-panel .chat-starter { font-size:10px; padding:6px 12px; }
  @media(max-width:768px) { .chat-widget-panel { width:calc(100vw - 24px); right:12px; bottom:86px; max-height:70vh; } .chat-widget-btn { bottom:16px; right:16px; } }
```

- [ ] **Step 4: Add floating widget HTML**

Insert before `</body>`, using the voter guide's neutral tone:
```html
<button class="chat-widget-btn" id="chatWidgetBtn" onclick="toggleWidget()" aria-label="Open chat">&#128172;</button>
<div class="chat-widget-panel" id="chatWidgetPanel">
  <div class="chat-header">
    <div class="chat-avatar" style="width:32px;height:32px;background:var(--accent);color:white;display:flex;align-items:center;justify-content:center;font-family:'Courier Prime',monospace;font-size:13px;font-weight:700;border-radius:2px;">VG</div>
    <div class="chat-header-text"><h4 style="font-family:'Libre Baskerville',serif;font-size:14px;color:var(--paper);">Voter Guide Assistant</h4><span style="font-family:'Courier Prime',monospace;font-size:10px;color:rgba(245,242,235,0.5);">Powered by AI</span></div>
    <button class="chat-widget-close" onclick="toggleWidget()">&#10005;</button>
  </div>
  <div class="chat-messages" id="widgetMessages">
    <div class="msg bot"><div class="msg-icon">📋</div><div class="msg-bubble">Have a question about the candidates or the race? I can help you find the facts.</div></div>
  </div>
  <div class="chat-starters" id="widgetQuickReplies">
    <button class="chat-starter" onclick="sendQuick('Compare the two candidates', true)">Compare candidates</button>
    <button class="chat-starter" onclick="sendQuick('What is the Brady Rule?', true)">Brady Rule</button>
  </div>
  <div class="chat-input-bar">
    <input type="text" class="chat-input" id="widgetInput" placeholder="Ask about the candidates..." onkeydown="if(event.key==='Enter') sendMessage(true)">
    <button class="chat-send" onclick="sendMessage(true)">&#10148;</button>
  </div>
</div>
```

- [ ] **Step 5: Update JS for widget sync**

Same pattern as Task 10 Step 5 — update all message/typing/send functions to handle `isWidget` parameter and sync. Adapt element IDs/class names to match site2's existing chatbot markup.

- [ ] **Step 6: Commit**

```bash
cd /Users/jd/workspace/site2-voter-guide && git add index.html && git commit -m "Upgrade chatbot to Opus, add floating widget"
```

---

### Task 12: Site3-Justice — Upgrade Chatbot & Add Floating Widget

**Files:**
- Modify: `/Users/jd/workspace/site3-justice/index.html`

- [ ] **Step 1: Read the existing chatbot section and JS**

Read the chatbot section HTML and script to understand current implementation.

- [ ] **Step 2: Remove client-side system prompt, update callClaude**

Same pattern — remove `SYSTEM_PROMPT`, update `callClaude` to send `site: 'site3-justice'` and `session_id: SESSION_ID`.

- [ ] **Step 3: Add floating widget CSS**

Style using site3's dark investigative theme (`--black`, `--dark`, `--red`, `--cream`, `IBM Plex Mono`/`Bebas Neue` fonts):

```css
  .chat-widget-btn { position:fixed; bottom:28px; right:28px; z-index:999; width:60px; height:60px; border-radius:50%; background:var(--red); color:white; border:none; cursor:pointer; font-size:24px; box-shadow:0 4px 20px rgba(0,0,0,0.4); transition:all 0.3s; display:flex; align-items:center; justify-content:center; }
  .chat-widget-btn:hover { transform:scale(1.08); background:var(--red-dark); }
  .chat-widget-panel { position:fixed; bottom:100px; right:28px; z-index:998; width:380px; max-height:520px; background:var(--dark); border:1px solid rgba(192,57,43,0.3); box-shadow:0 8px 40px rgba(0,0,0,0.5); display:none; flex-direction:column; overflow:hidden; }
  .chat-widget-panel.open { display:flex; }
  .chat-widget-panel .chat-header { padding:12px 16px; background:rgba(192,57,43,0.08); border-bottom:1px solid rgba(192,57,43,0.2); }
  .chat-widget-close { margin-left:auto; background:none; border:none; color:var(--dust); font-size:18px; cursor:pointer; }
  .chat-widget-panel .chat-messages { height:300px; }
  .chat-widget-panel .chat-starters { padding:0 16px 8px; }
  .chat-widget-panel .chat-starter { font-size:10px; padding:6px 12px; }
  @media(max-width:640px) { .chat-widget-panel { width:calc(100vw - 24px); right:12px; bottom:90px; max-height:70vh; } .chat-widget-btn { bottom:16px; right:16px; width:52px; height:52px; } }
```

- [ ] **Step 4: Add floating widget HTML**

Insert before `</body>`:
```html
<button class="chat-widget-btn" id="chatWidgetBtn" onclick="toggleWidget()" aria-label="Open chat">&#128172;</button>
<div class="chat-widget-panel" id="chatWidgetPanel">
  <div class="chat-header">
    <div style="width:32px;height:32px;background:var(--red);color:white;display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Mono',monospace;font-size:12px;font-weight:500;">CJ</div>
    <div class="chat-header-text"><h4 style="font-family:'Bebas Neue',sans-serif;font-size:16px;color:var(--white);letter-spacing:0.04em;">Justice Research Assistant</h4><span style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--dust);">Powered by AI</span></div>
    <button class="chat-widget-close" onclick="toggleWidget()">&#10005;</button>
  </div>
  <div class="chat-messages" id="widgetMessages">
    <div class="msg bot"><div class="msg-icon">⚖</div><div class="msg-bubble">Have questions about the documented record? Ask me anything.</div></div>
  </div>
  <div class="chat-starters" id="widgetQuickReplies">
    <button class="chat-starter" onclick="sendQuick('What are Brady Rule violations?', true)">Brady violations</button>
    <button class="chat-starter" onclick="sendQuick('What is the Buenger timeline?', true)">Buenger timeline</button>
  </div>
  <div class="chat-input-bar">
    <input type="text" class="chat-input" id="widgetInput" placeholder="Ask about the record..." onkeydown="if(event.key==='Enter') sendMessage(true)">
    <button class="chat-send" onclick="sendMessage(true)">&#10148;</button>
  </div>
</div>
```

- [ ] **Step 5: Update JS for widget sync**

Same pattern as Tasks 10-11 — adapt to site3's element IDs and class names.

- [ ] **Step 6: Commit**

```bash
cd /Users/jd/workspace/site3-justice && git add index.html && git commit -m "Upgrade chatbot to Opus, add floating widget"
```

---

### Task 13: Set Vercel Environment Variables

**Files:** None (Vercel dashboard/CLI configuration)

- [ ] **Step 1: Set environment variables for sbocc-website**

```bash
cd /Users/jd/workspace/sbocc-website
vercel env add ANTHROPIC_API_KEY production
vercel env add SUPABASE_URL production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add SITE_ID production
```

Values:
- `ANTHROPIC_API_KEY`: Your Anthropic API key
- `SUPABASE_URL`: `https://aijimwtphfdkdxjkhrcx.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY`: From Supabase dashboard > Settings > API > service_role key
- `SITE_ID`: `sbocc-website`

- [ ] **Step 2: Set environment variables for site1-pac**

Same variables, `SITE_ID` = `site1-pac`.

- [ ] **Step 3: Set environment variables for site2-voter-guide**

Same variables, `SITE_ID` = `site2-voter-guide`.

- [ ] **Step 4: Set environment variables for site3-justice**

Same variables, `SITE_ID` = `site3-justice`.

---

### Task 14: Deploy All Sites

- [ ] **Step 1: Push and deploy sbocc-website**

```bash
cd /Users/jd/workspace/sbocc-website && git push origin main
```

Vercel auto-deploys on push.

- [ ] **Step 2: Push and deploy site1-pac**

```bash
cd /Users/jd/workspace/site1-pac && git push origin main
```

- [ ] **Step 3: Push and deploy site2-voter-guide**

```bash
cd /Users/jd/workspace/site2-voter-guide && git push origin main
```

- [ ] **Step 4: Push and deploy site3-justice**

```bash
cd /Users/jd/workspace/site3-justice && git push origin main
```

- [ ] **Step 5: Verify all deployments**

Visit each site and confirm:
1. No donation buttons visible
2. Report download section present with working PDF link
3. Inline chatbot works (sends message, gets Opus response)
4. Floating widget works (opens, sends message, syncs with inline)
5. No JS console errors

---

### Task 15: Verify Supabase Logging

- [ ] **Step 1: Send a test message on each site**

Open each site and send a test chat message.

- [ ] **Step 2: Check Supabase for evidence events**

```bash
curl -s "${SUPABASE_URL}/rest/v1/evidence_events?organization_id=eq.psoras-campaign&source_type=eq.chatbot_conversation&order=created_at.desc&limit=4" \
  -H "apikey: ${SUPABASE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_KEY}" | jq '.[] | {site: .raw_payload.site, user_message: .raw_payload.user_message, created_at}'
```

Expected: 4 entries, one per site, with correct `site` values.

- [ ] **Step 3: Verify processing_state is ready_for_dreaming**

Confirm the evidence events have `processing_state: 'ready_for_dreaming'` so the nightly dream cycle will pick them up.
