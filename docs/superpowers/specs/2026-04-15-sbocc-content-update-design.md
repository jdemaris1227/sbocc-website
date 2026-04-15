# SBOCC Website Content Update — Design Spec

**Date:** 2026-04-15
**Status:** Draft
**Scope:** sbocc-website only (chatbot knowledge update applies to all 4 sites)

## Overview

Expand the SBOCC PAC website with new campaign content from flyer materials: crime statistics, MPRP/property rights, the store owner case, and the Psoras/Murtha "dream team" — plus update the chatbot knowledge base across all sites.

## Section Order (Final)

1. Hero (existing)
2. Stat Band (existing)
3. Mission (existing)
4. Crime Stats Band (new)
5. Why It Matters (existing)
6. MPRP / Property Rights (new)
7. Report Download (existing)
8. Store Owner Case (new)
9. Candidate / Dream Team (updated — add Murtha)
10. Chatbot (existing)
11. Join (existing)
12. Footer (existing)

## Change 1: Crime Stats Band

**Position:** After Mission section, before Why It Matters

**Design:** Same visual style as the existing gold stat band after the hero, but with a dark navy background and gold text to differentiate it. Three columns:

| Stat | Label | Source |
|------|-------|--------|
| 173% | Crime surge under Culver's watch | FBI NIBRS Data, 2021-2022 |
| $991 | Cost of crime per Carroll County household/year | CrimeGrade.org 2025 |
| Every 2 hrs | A crime occurs in Carroll County | CrimeGrade.org 2025 |

**Subtext below the band:** "2022 was Culver's year as Acting State's Attorney. It was the worst year Carroll County had seen."

**CSS:** Dark navy background (`--navy`), gold numbers (`--gold`), white-dim labels. Same `.band` flex layout but with inverted colors.

## Change 2: MPRP / Property Rights Section

**Position:** After Why It Matters, before Report Download

**Design:** Full-width section with `--navy-mid` background. Two-column layout:

**Left column — The Threat:**
- Section label: "Your Property Is Under Attack"
- Headline: "A New Jersey Corporation Wants to Bulldoze Through Carroll County"
- Body text explaining MPRP:
  - PSEG (New Jersey corporation) wants to cut a 150-foot-wide, 70-mile path through Baltimore, Carroll, and Frederick Counties
  - 400+ properties threatened — farms, family homes, preserved forests, businesses
  - PSEG has filed court motions to force surveyors onto private land without permission
  - If you refuse, they invoke eminent domain and take your land by force of law
  - Carroll County Commissioners officially oppose MPRP

**Right column — The Contrast (two stacked cards):**

**Psoras card (gold-bordered):**
- "George Psoras Says NO"
- Opposes MPRP — no eminent domain for corporate gain
- No surveyors on your property without consent
- 38 years fighting for people, not corporations

**Culver card (muted/dim-bordered):**
- "Allan Culver — Silent"
- No public position opposing MPRP
- Silent while PSEG files court motions against Carroll County landowners
- Doesn't believe you have the right to defend your property

**Source line:** "Sources: Carroll County Board of Commissioners Resolution opposing MPRP; WMAR2 News (April 2025); Baltimore Sun"

## Change 3: Store Owner Case Section

**Position:** After Report Download, before Candidate section

**Design:** Full-width section with `--navy` background. Centered narrative layout.

**Section label:** "The Case That Tells You Everything"
**Headline:** "A Carroll County Store Owner Was Broken Into. He Defended Himself. Culver Prosecuted Him."

**Narrative body (2-3 paragraphs):**
Two criminals broke into a Carroll County small business. When the owner defended himself, Allan Culver's office charged him with assault — and ignored the criminals. The community demanded the charges be dropped. Culver ignored them and pressed forward.

George Psoras took the case. He defended that store owner in court. A Carroll County Circuit Court judge disagreed with Culver's office completely.

**Verdict callout box (gold background, large text):**
"NOT GUILTY" — Judge Stansfield, Carroll County Circuit Court
Subtext: "Culver's office wasted your tax dollars prosecuting the victim."

**Two-column contrast below the verdict:**

| George Psoras | Allan Culver |
|--------------|-------------|
| Defended the store owner | Prosecuted the store owner |
| Believed in the right to self-defense | Charged the victim with assault |
| Won the case — NOT GUILTY | Lost the case — wasted tax dollars |
| Fights for business owners | Fights against business owners |

**Source line:** "Source: Carroll County Circuit Court, Judge Stansfield"

## Change 4: Expanded Candidate / Dream Team Section

**Position:** Same position (after Store Owner Case now), replacing existing candidate section

**Design:** Keep the existing Psoras content but update credentials. Add Murtha alongside in a two-column "Dream Team" layout.

**Section label:** "Your Team"
**Headline:** "George Psoras & Joe Murtha — Carroll County's Dream Team"

**Left column — George Psoras (existing photo + updated content):**
- Title: "Your State's Attorney"
- 38+ years as a Maryland trial attorney
- Thousands of cases across every Maryland court
- Magna Cum Laude — University of Baltimore
- 2026 Martindale-Hubbell Client Champion Award
- Lifelong Carroll County resident — Hampstead
- Platform bullets (keep existing: Brady compliance, violent offenders, opioid epidemic, victims, oversight, no political debts)

**Right column — Joe Murtha (new):**
- Title: "Your Chief Deputy State's Attorney"
- Photo placeholder (no photo yet — use styled initial box like Psoras had before his photo was added)
- Started as ASA, Howard County — prosecuted felonies and death penalty cases
- AV Preeminent — Martindale-Hubbell's highest peer rating
- Named Super Lawyer every year
- John Adams Award — US District Court, District of Maryland
- Fellow, American College of Trial Lawyers
- Won acquittals in Linda Tripp case and Freddie Gray Officer Porter case

**Promise section below both columns:**
"What George and Joe will do for Carroll County:"
- Personally prosecute serious cases — in the courtroom every day
- Hire prosecutors who reflect Carroll County values
- Train prosecutors the right way — with courtroom experience from both sides
- Specialized prosecution units with Sheriff's Office and Maryland State Police
- Stand up for property owners, business owners, and crime victims
- Full transparency — the community will always know what's happening

**Values badges row:** God & Country · 2nd Amendment · Stands for the Anthem · Carroll County Roots · Never Backs Down

## Change 5: Updated Chatbot Knowledge

**Files:** `api/chat.js` in all 4 sites

Add to the `REPORT_CONTEXT` constant:

**MPRP / Property Rights:**
- PSEG (New Jersey corp) Maryland Piedmont Reliability Project threatens 400+ properties
- 150-foot-wide, 70-mile path through Baltimore, Carroll, Frederick Counties
- PSEG filing court motions to force surveyors onto private land
- Carroll County Commissioners officially oppose MPRP
- Psoras opposes MPRP, no eminent domain for corporate gain
- Culver has no public position opposing MPRP

**Store Owner Case:**
- Two criminals broke into a Carroll County small business
- Owner defended himself, Culver's office charged him with assault
- Community demanded charges be dropped, Culver ignored them
- George Psoras defended the store owner, took case to trial
- Judge Stansfield found the store owner NOT GUILTY
- Melina Rauskolb (hired by Culver) was the prosecutor

**Crime Statistics:**
- 173% crime surge in Carroll County under Culver (FBI NIBRS 2021-2022)
- $991 cost of crime per household per year (CrimeGrade.org 2025)
- A crime occurs every 2 hours in Carroll County (CrimeGrade.org 2025)

**Joe Murtha:**
- Chief Deputy State's Attorney candidate alongside Psoras
- AV Preeminent rated, Super Lawyer every year
- John Adams Award recipient
- Fellow, American College of Trial Lawyers
- Won acquittals in Linda Tripp case and Freddie Gray Officer Porter case
- Prosecuted felonies and death penalty cases as Howard County ASA

**Rauskolb (light touch for chatbot):**
- Melina Rauskolb is an ASA hired by Culver
- She prosecuted the Carroll County store owner case and lost
- If asked about her specifically, note she was the prosecutor in the store owner case and that Culver hired her

## Nav Update

Update nav links to include new sections:
```
Our Mission | The Facts | Property Rights | The Report | The Case | Our Team | Ask AI | Join Us
```

Where:
- "The Facts" → #crime-stats or #why (whichever flows better)
- "Property Rights" → #mprp
- "The Case" → #store-owner
- "Our Team" → #candidate (renamed from just George Psoras)

## Files Changed

- `sbocc-website/index.html` — All HTML/CSS changes (new sections, updated candidate, nav)
- `sbocc-website/api/chat.js` — Updated REPORT_CONTEXT
- `site1-pac/api/chat.js` — Copy of updated chat.js
- `site2-voter-guide/api/chat.js` — Copy of updated chat.js
- `site3-justice/api/chat.js` — Copy of updated chat.js
