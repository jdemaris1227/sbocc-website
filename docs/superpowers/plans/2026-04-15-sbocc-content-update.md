# SBOCC Content Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add crime stats, MPRP/property rights, store owner case, and Murtha/dream team content to the SBOCC PAC website, plus update chatbot knowledge across all 4 sites.

**Architecture:** All changes are to a single `index.html` (new CSS + HTML sections) and `api/chat.js` (expanded knowledge base). The site is a static single-page HTML file with inline CSS/JS deployed on Vercel. New sections are inserted between existing sections following the established design patterns.

**Tech Stack:** Static HTML/CSS/JS, Vercel serverless (Node.js), Anthropic Messages API

**Current section structure (line references):**
- NAV: line 542
- HERO: line 554
- STAT BAND: line 570
- MISSION: line 578
- WHY IT MATTERS: line 620
- REPORT: line 646
- CANDIDATE: line 660
- CHATBOT: line 696
- JOIN: line 728
- FOOTER: line 833
- FLOATING WIDGET: line 854

**Target section order:**
NAV → HERO → STAT BAND → MISSION → **CRIME STATS BAND** → WHY IT MATTERS → **MPRP** → REPORT → **STORE OWNER CASE** → **CANDIDATE/DREAM TEAM** → CHATBOT → JOIN → FOOTER → FLOATING WIDGET

---

### Task 1: Add Crime Stats Band

**Files:**
- Modify: `/Users/jd/workspace/sbocc-website/index.html`

- [ ] **Step 1: Add crime stats band CSS**

Insert after the existing `.band-item span` CSS rule (around line 166) and before `/* ── SECTIONS ── */`:

```css
  /* ── CRIME BAND ── */
  .crime-band {
    background: var(--navy);
    border-top: 1px solid var(--gold-border);
    border-bottom: 1px solid var(--gold-border);
    padding: 40px;
    text-align: center;
  }
  .crime-band-stats {
    display: flex; justify-content: center; gap: 60px;
    flex-wrap: wrap; margin-bottom: 16px;
  }
  .crime-stat {
    text-align: center;
  }
  .crime-stat strong {
    display: block; font-family: 'Playfair Display', serif;
    font-size: 48px; font-weight: 800;
    color: var(--gold); line-height: 1;
    margin-bottom: 8px;
  }
  .crime-stat span {
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--white-dim);
    display: block; max-width: 200px;
  }
  .crime-band-sub {
    font-family: 'Source Serif 4', serif;
    font-size: 16px; font-style: italic;
    color: var(--white-muted); margin-top: 16px;
  }
  .crime-band-source {
    font-family: 'DM Mono', monospace;
    font-size: 9px; color: rgba(247,244,239,0.25);
    margin-top: 12px; letter-spacing: 0.04em;
  }
```

- [ ] **Step 2: Add crime stats band HTML**

Insert after the closing `</section>` of the MISSION section (line 618) and before `<!-- WHY IT MATTERS -->`:

```html
<!-- CRIME STATS -->
<div class="crime-band" id="crime-stats">
  <div class="crime-band-stats">
    <div class="crime-stat">
      <strong>173%</strong>
      <span>Crime surge in Carroll County under Culver's watch</span>
    </div>
    <div class="crime-stat">
      <strong>$991</strong>
      <span>Cost of crime per Carroll County household per year</span>
    </div>
    <div class="crime-stat">
      <strong>Every 2 hrs</strong>
      <span>A crime occurs in Carroll County</span>
    </div>
  </div>
  <p class="crime-band-sub">2022 was Culver's year as Acting State's Attorney. It was the worst year Carroll County had seen.</p>
  <p class="crime-band-source">Sources: FBI NIBRS Data 2021-2022 · CrimeGrade.org 2025</p>
</div>
```

- [ ] **Step 3: Add responsive rule for crime band**

In the `@media (max-width: 768px)` block, add:

```css
    .crime-band-stats { gap: 32px; }
    .crime-stat strong { font-size: 36px; }
```

- [ ] **Step 4: Commit**

```bash
cd /Users/jd/workspace/sbocc-website && git add index.html && git commit -m "Add crime statistics band with FBI/CrimeGrade data"
```

---

### Task 2: Add MPRP / Property Rights Section

**Files:**
- Modify: `/Users/jd/workspace/sbocc-website/index.html`

- [ ] **Step 1: Add MPRP section CSS**

Insert after the report CSS rules (after `.report-meta`) and before `/* ── CANDIDATE ── */` (or wherever the candidate CSS starts):

```css
  /* ── MPRP ── */
  .mprp { background: var(--navy-mid); }
  .mprp-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 64px; align-items: start;
  }
  .mprp-text p {
    font-size: 16px; font-weight: 300;
    line-height: 1.8; color: var(--white-dim);
    margin-bottom: 16px;
  }
  .mprp-text p strong { color: var(--white); font-weight: 600; }
  .mprp-facts {
    list-style: none; margin: 24px 0;
  }
  .mprp-facts li {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 10px 0; border-bottom: 1px solid rgba(247,244,239,0.06);
    font-size: 15px; color: var(--white-dim); font-weight: 300;
  }
  .mprp-facts li:last-child { border: none; }
  .mprp-facts li::before {
    content: '⚠'; flex-shrink: 0; margin-top: 2px;
  }
  .mprp-cards { display: flex; flex-direction: column; gap: 16px; }
  .mprp-card {
    padding: 24px;
    border-left: 3px solid var(--gold-border);
    background: rgba(255,255,255,0.03);
  }
  .mprp-card.hero-card {
    border-left-color: var(--gold);
    background: var(--gold-dim);
  }
  .mprp-card.silent-card {
    border-left-color: rgba(247,244,239,0.15);
    opacity: 0.7;
  }
  .mprp-card h4 {
    font-family: 'Playfair Display', serif;
    font-size: 18px; font-weight: 700;
    color: var(--white); margin-bottom: 8px;
  }
  .mprp-card.hero-card h4 { color: var(--gold); }
  .mprp-card ul {
    list-style: none;
  }
  .mprp-card ul li {
    font-size: 14px; color: var(--white-dim);
    line-height: 1.65; padding: 4px 0; font-weight: 300;
    display: flex; align-items: flex-start; gap: 8px;
  }
  .mprp-card ul li::before {
    content: '→'; color: var(--gold); flex-shrink: 0;
    font-family: 'DM Mono', monospace;
  }
  .mprp-card.silent-card ul li::before { color: var(--white-muted); content: '✕'; }
  .mprp-source {
    font-family: 'DM Mono', monospace;
    font-size: 9px; color: rgba(247,244,239,0.25);
    margin-top: 24px; letter-spacing: 0.04em;
  }
```

- [ ] **Step 2: Add MPRP section HTML**

Insert after `</section>` of WHY IT MATTERS and before `<!-- REPORT -->`:

```html
<!-- MPRP / PROPERTY RIGHTS -->
<section class="mprp" id="mprp">
  <div class="section-inner">
    <div class="mprp-grid">
      <div class="mprp-text fade-up">
        <div class="section-label">Your Property Is Under Attack</div>
        <h2 class="section-title">A New Jersey Corporation Wants to Bulldoze Through Carroll County</h2>
        <p>The <strong>Maryland Piedmont Reliability Project (MPRP)</strong> is a proposal by PSEG — a New Jersey corporation — to cut a 150-foot-wide, 70-mile transmission line path through Baltimore, Carroll, and Frederick Counties.</p>
        <p>This isn't hypothetical. PSEG has already filed court motions to force surveyors onto private land — <strong>without property owners' permission.</strong> If you refuse, they can invoke eminent domain and take your land by force of law.</p>
        <ul class="mprp-facts">
          <li><strong>400+ properties</strong> threatened — farms, family homes, preserved forests, and businesses</li>
          <li>PSEG has filed court motions to <strong>force entry</strong> onto Carroll County private land</li>
          <li>If you refuse, they invoke <strong>eminent domain</strong> — your land is taken by law</li>
          <li>Carroll County Commissioners <strong>officially oppose</strong> MPRP — your State's Attorney should too</li>
        </ul>
        <p class="mprp-source">Sources: Carroll County Board of Commissioners Resolution opposing MPRP · WMAR2 News (April 2025) · Baltimore Sun</p>
      </div>
      <div class="mprp-cards fade-up">
        <div class="section-label">Where They Stand</div>
        <div class="mprp-card hero-card">
          <h4>George Psoras Says NO</h4>
          <ul>
            <li>Opposes MPRP — no eminent domain for corporate gain on Carroll County land</li>
            <li>No surveyors on your private property without your consent</li>
            <li>Defended a Carroll County business owner charged after a break-in — and won</li>
            <li>38 years fighting for people, not corporations</li>
          </ul>
        </div>
        <div class="mprp-card silent-card">
          <h4>Allan Culver — Silent</h4>
          <ul>
            <li>No public position opposing MPRP or protecting landowners from eminent domain</li>
            <li>Silent while a NJ corporation files motions to force entry onto Carroll County land</li>
            <li>Charged a store owner with assault after criminals broke into his store — ignored the criminals</li>
            <li>Doesn't believe you have the right to defend your property</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Add responsive rule for MPRP**

In the `@media (max-width: 768px)` block, add:

```css
    .mprp-grid { grid-template-columns: 1fr; gap: 40px; }
```

- [ ] **Step 4: Commit**

```bash
cd /Users/jd/workspace/sbocc-website && git add index.html && git commit -m "Add MPRP property rights section"
```

---

### Task 3: Add Store Owner Case Section

**Files:**
- Modify: `/Users/jd/workspace/sbocc-website/index.html`

- [ ] **Step 1: Add store owner section CSS**

Insert after the MPRP CSS and before candidate CSS:

```css
  /* ── STORE OWNER CASE ── */
  .store-case { background: var(--navy); }
  .store-case-narrative {
    max-width: 760px; margin: 0 auto 40px;
  }
  .store-case-narrative p {
    font-size: 18px; font-weight: 300;
    line-height: 1.85; color: var(--white-dim);
    margin-bottom: 20px;
  }
  .store-case-narrative p strong { color: var(--white); font-weight: 600; }
  .verdict-box {
    background: var(--gold);
    padding: 32px 40px;
    text-align: center;
    max-width: 760px; margin: 0 auto 40px;
  }
  .verdict-box .verdict-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 0.2em;
    text-transform: uppercase; color: rgba(11,26,46,0.6);
    margin-bottom: 8px;
  }
  .verdict-box .verdict-text {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 4vw, 48px);
    font-weight: 800; color: var(--navy);
    line-height: 1.1;
  }
  .verdict-box .verdict-sub {
    font-size: 14px; color: rgba(11,26,46,0.7);
    margin-top: 8px; font-weight: 400;
  }
  .store-contrast {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 24px; max-width: 760px; margin: 0 auto;
  }
  .store-col {
    padding: 24px;
    border-top: 3px solid var(--gold-border);
    background: rgba(255,255,255,0.03);
  }
  .store-col.psoras-col { border-top-color: var(--gold); }
  .store-col.culver-col { border-top-color: var(--red); opacity: 0.8; }
  .store-col h4 {
    font-family: 'Playfair Display', serif;
    font-size: 18px; font-weight: 700;
    color: var(--white); margin-bottom: 12px;
  }
  .store-col ul {
    list-style: none;
  }
  .store-col ul li {
    font-size: 14px; color: var(--white-dim);
    line-height: 1.65; padding: 6px 0;
    display: flex; align-items: flex-start; gap: 8px;
    font-weight: 300;
  }
  .store-col.psoras-col ul li::before {
    content: '✓'; color: var(--gold); flex-shrink: 0;
    font-family: 'DM Mono', monospace; font-weight: 700;
  }
  .store-col.culver-col ul li::before {
    content: '✕'; color: var(--red); flex-shrink: 0;
    font-family: 'DM Mono', monospace;
  }
  .store-source {
    font-family: 'DM Mono', monospace;
    font-size: 9px; color: rgba(247,244,239,0.25);
    text-align: center; margin-top: 24px; letter-spacing: 0.04em;
  }
```

- [ ] **Step 2: Add store owner case HTML**

Insert after `</section>` of REPORT and before `<!-- CANDIDATE -->`:

```html
<!-- STORE OWNER CASE -->
<section class="store-case" id="store-owner">
  <div class="section-inner">
    <div class="section-label">The Case That Tells You Everything</div>
    <h2 class="section-title">A Store Owner Was Broken Into.<br>He Defended Himself. Culver Prosecuted Him.</h2>
    <div class="store-case-narrative fade-up">
      <p>Two criminals broke into a Carroll County small business. When the owner defended himself, <strong>Allan Culver's office charged him with assault</strong> — and ignored the criminals. The community demanded the charges be dropped. Culver ignored them and pressed forward.</p>
      <p>George Psoras took the case. He defended that store owner in court. A Carroll County Circuit Court judge disagreed with Culver's office completely.</p>
    </div>
    <div class="verdict-box fade-up">
      <div class="verdict-label">Official Verdict — Carroll County Circuit Court</div>
      <div class="verdict-text">NOT GUILTY</div>
      <div class="verdict-sub">Judge Stansfield, Carroll County Circuit Court — Culver's office wasted your tax dollars prosecuting the victim.</div>
    </div>
    <div class="store-contrast fade-up">
      <div class="store-col psoras-col">
        <h4>George Psoras</h4>
        <ul>
          <li>Defended the store owner</li>
          <li>Believed in the right to self-defense</li>
          <li>Won the case — NOT GUILTY</li>
          <li>Fights for business owners</li>
        </ul>
      </div>
      <div class="store-col culver-col">
        <h4>Allan Culver</h4>
        <ul>
          <li>Prosecuted the store owner</li>
          <li>Charged the victim with assault</li>
          <li>Lost the case — wasted tax dollars</li>
          <li>Fights against business owners</li>
        </ul>
      </div>
    </div>
    <p class="store-source">Source: Carroll County Circuit Court, Judge Stansfield</p>
  </div>
</section>
```

- [ ] **Step 3: Add responsive rule**

In `@media (max-width: 768px)`, add:

```css
    .store-contrast { grid-template-columns: 1fr; }
```

- [ ] **Step 4: Commit**

```bash
cd /Users/jd/workspace/sbocc-website && git add index.html && git commit -m "Add store owner case section with verdict and contrast"
```

---

### Task 4: Expand Candidate Section to Dream Team

**Files:**
- Modify: `/Users/jd/workspace/sbocc-website/index.html`

- [ ] **Step 1: Add dream team CSS**

Add after the existing `.platform-list li::before` CSS:

```css
  /* ── DREAM TEAM ── */
  .team-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px; margin-bottom: 48px;
  }
  .team-member {
    display: flex; flex-direction: column;
  }
  .team-photo {
    width: 100%; aspect-ratio: 3/4;
    background: var(--navy-light);
    border: 2px solid var(--gold-border);
    position: relative; overflow: hidden;
    margin-bottom: 20px;
  }
  .team-photo img {
    width: 100%; height: 100%;
    object-fit: cover; object-position: center top;
  }
  .team-photo-placeholder {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 64px; color: var(--gold-border);
  }
  .team-badge {
    background: var(--gold);
    padding: 12px 16px;
    position: absolute; bottom: 0; left: 0; right: 0;
  }
  .team-badge strong {
    display: block; font-family: 'Playfair Display', serif;
    font-size: 18px; font-weight: 700; color: var(--navy);
  }
  .team-badge span {
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.12em;
    text-transform: uppercase; color: rgba(11,26,46,0.7);
  }
  .team-creds {
    list-style: none;
  }
  .team-creds li {
    font-size: 14px; color: var(--white-dim);
    line-height: 1.65; padding: 6px 0;
    border-bottom: 1px solid rgba(247,244,239,0.06);
    display: flex; align-items: flex-start; gap: 10px;
    font-weight: 300;
  }
  .team-creds li:last-child { border: none; }
  .team-creds li::before {
    content: '→'; color: var(--gold); flex-shrink: 0;
    font-family: 'DM Mono', monospace;
  }
  .team-promises {
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--gold-border);
    padding: 36px 32px;
    margin-bottom: 32px;
  }
  .team-promises h3 {
    font-family: 'Playfair Display', serif;
    font-size: 22px; font-weight: 700;
    color: var(--white); margin-bottom: 20px;
  }
  .values-badges {
    display: flex; gap: 12px; flex-wrap: wrap;
    margin-top: 8px;
  }
  .values-badge {
    padding: 8px 16px;
    background: var(--gold-dim);
    border: 1px solid var(--gold-border);
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 0.08em;
    color: var(--gold); text-transform: uppercase;
  }
```

- [ ] **Step 2: Replace the candidate section HTML**

Replace the entire `<!-- CANDIDATE -->` section (lines 660-694) with:

```html
<!-- CANDIDATE / DREAM TEAM -->
<section class="candidate" id="candidate">
  <div class="section-inner">
    <div class="section-label">Your Team</div>
    <h2 class="section-title">George Psoras & Joe Murtha — Carroll County's Dream Team</h2>
    <p class="section-lead" style="margin-bottom:48px;">Two of Maryland's most experienced trial attorneys — together for Carroll County. Republican Primary June 23 · Early Voting June 11.</p>
    <div class="team-grid">
      <div class="team-member fade-up">
        <div class="team-photo">
          <img src="george-portrait.png" alt="George Psoras Jr. — Candidate for State's Attorney">
          <div class="team-badge">
            <strong>George Psoras Jr.</strong>
            <span>Your State's Attorney</span>
          </div>
        </div>
        <ul class="team-creds">
          <li>38+ years as a Maryland trial attorney</li>
          <li>Thousands of cases across every Maryland court</li>
          <li>Magna Cum Laude — University of Baltimore School of Law</li>
          <li>2026 Martindale-Hubbell Client Champion Award</li>
          <li>Lifelong Carroll County resident — Hampstead, Maryland</li>
          <li>Defended a store owner Culver's office prosecuted — and won</li>
        </ul>
      </div>
      <div class="team-member fade-up">
        <div class="team-photo">
          <div class="team-photo-placeholder">JM</div>
          <div class="team-badge">
            <strong>Joe Murtha</strong>
            <span>Your Chief Deputy State's Attorney</span>
          </div>
        </div>
        <ul class="team-creds">
          <li>Started as ASA, Howard County — felonies and death penalty cases</li>
          <li>AV Preeminent — Martindale-Hubbell's highest peer rating</li>
          <li>Named Super Lawyer every year</li>
          <li>John Adams Award — US District Court, District of Maryland</li>
          <li>Fellow, American College of Trial Lawyers</li>
          <li>Won acquittals in Linda Tripp case and Freddie Gray Officer Porter case</li>
        </ul>
      </div>
    </div>
    <div class="team-promises fade-up">
      <h3>What George and Joe Will Do for Carroll County</h3>
      <ul class="platform-list">
        <li>Personally prosecute serious cases — in the courtroom every day, not a figurehead</li>
        <li>Hire prosecutors who reflect Carroll County values — tough, fair, community-minded</li>
        <li>Train prosecutors the right way — with courtroom experience from both sides</li>
        <li>Specialized prosecution units with Carroll County Sheriff and Maryland State Police</li>
        <li>Stand up for property owners, business owners, and crime victims — not prosecute them</li>
        <li>Full Brady Rule compliance — mandatory evidence disclosure, no exceptions</li>
        <li>Full transparency — the community will always know what's happening in their SA's office</li>
      </ul>
    </div>
    <div class="values-badges fade-up">
      <div class="values-badge">God & Country</div>
      <div class="values-badge">2nd Amendment</div>
      <div class="values-badge">Stands for the Anthem</div>
      <div class="values-badge">Carroll County Roots</div>
      <div class="values-badge">Never Backs Down</div>
    </div>
    <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:28px;" class="fade-up">
      <a href="https://electpsoras.com" class="btn-primary" target="_blank">Campaign Website →</a>
      <a href="https://carrollcountyjustice.org" class="btn-outline" target="_blank">See the Full Record</a>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Add responsive rules**

In `@media (max-width: 768px)`, add:

```css
    .team-grid { grid-template-columns: 1fr; gap: 40px; }
```

- [ ] **Step 4: Remove old candidate-specific CSS that's no longer used**

Remove the `.candidate-inner`, `.candidate-photo`, `.candidate-photo-frame`, `.candidate-photo-frame::after`, `.candidate-name-badge` CSS rules since they are replaced by `.team-*` rules. Keep `.candidate` (the section background) and `.candidate-text`, `.platform-list` rules since those are still used.

- [ ] **Step 5: Commit**

```bash
cd /Users/jd/workspace/sbocc-website && git add index.html && git commit -m "Expand candidate section to Psoras/Murtha dream team"
```

---

### Task 5: Update Nav Links

**Files:**
- Modify: `/Users/jd/workspace/sbocc-website/index.html`

- [ ] **Step 1: Replace nav links**

Replace the current nav links (lines 545-551):

```html
  <div class="nav-links">
    <a href="#mission">Our Mission</a>
    <a href="#report">The Report</a>
    <a href="#chat">Ask AI</a>
    <a href="#candidate">George Psoras</a>
    <a href="#join">Join Us</a>
  </div>
```

with:

```html
  <div class="nav-links">
    <a href="#mission">Our Mission</a>
    <a href="#mprp">Property Rights</a>
    <a href="#store-owner">The Case</a>
    <a href="#candidate">Our Team</a>
    <a href="#chat">Ask AI</a>
    <a href="#join">Join Us</a>
  </div>
```

- [ ] **Step 2: Commit**

```bash
cd /Users/jd/workspace/sbocc-website && git add index.html && git commit -m "Update nav links for new content sections"
```

---

### Task 6: Update Chatbot Knowledge Base

**Files:**
- Modify: `/Users/jd/workspace/sbocc-website/api/chat.js`
- Copy to: `site1-pac/api/chat.js`, `site2-voter-guide/api/chat.js`, `site3-justice/api/chat.js`

- [ ] **Step 1: Expand REPORT_CONTEXT in api/chat.js**

In `/Users/jd/workspace/sbocc-website/api/chat.js`, find the end of the existing REPORT_CONTEXT (the line with `Carroll County Board of Elections: 410-386-2972\`;` around line 56). Insert the following new sections BEFORE the VOTING line and closing backtick:

```
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
- 2022 was Culver's year as Acting State's Attorney — the worst year Carroll County had seen.

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
```

- [ ] **Step 2: Also update the GEORGE PSORAS section that already exists**

Find the existing `GEORGE PSORAS — THE ALTERNATIVE:` section and update it to include the new credentials. Replace:

```
GEORGE PSORAS — THE ALTERNATIVE:
- Republican challenger for Carroll County State's Attorney 2026
- Full Brady Rule compliance — mandatory evidence disclosure, no exceptions
- Relentless prosecution of violent offenders
- Tackle the opioid epidemic
- Treat victims with dignity
- Supports independent oversight and transparency reforms Culver opposed
- Endorsed by Carroll County Small Businesses PAC
```

with:

```
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
```

- [ ] **Step 3: Copy updated chat.js to other 3 sites**

```bash
cp /Users/jd/workspace/sbocc-website/api/chat.js /Users/jd/workspace/site1-pac/api/chat.js
cp /Users/jd/workspace/sbocc-website/api/chat.js /Users/jd/workspace/site2-voter-guide/api/chat.js
cp /Users/jd/workspace/sbocc-website/api/chat.js /Users/jd/workspace/site3-justice/api/chat.js
```

- [ ] **Step 4: Commit all repos**

```bash
cd /Users/jd/workspace/sbocc-website && git add api/chat.js && git commit -m "Expand chatbot knowledge with MPRP, store owner case, crime stats, Murtha bio"
cd /Users/jd/workspace/site1-pac && git add api/chat.js && git commit -m "Update chatbot knowledge base"
cd /Users/jd/workspace/site2-voter-guide && git add api/chat.js && git commit -m "Update chatbot knowledge base"
cd /Users/jd/workspace/site3-justice && git add api/chat.js && git commit -m "Update chatbot knowledge base"
```

---

### Task 7: Push and Deploy

- [ ] **Step 1: Push all repos**

```bash
cd /Users/jd/workspace/sbocc-website && git push origin main
cd /Users/jd/workspace/site1-pac && git push origin master
cd /Users/jd/workspace/site2-voter-guide && git push origin master
cd /Users/jd/workspace/site3-justice && git push origin master
```

Vercel auto-deploys on push.

- [ ] **Step 2: Verify sbocc-website deployment**

Visit https://sbocc-website.vercel.app and confirm:
1. Crime stats band appears after Mission section
2. MPRP section appears after Why It Matters
3. Store owner case appears after Report
4. Dream team section shows both Psoras and Murtha
5. Nav links updated and all scroll to correct sections
6. Chatbot responds to MPRP, store owner, Murtha questions
7. No JS console errors
8. Mobile responsive — all new sections stack properly
