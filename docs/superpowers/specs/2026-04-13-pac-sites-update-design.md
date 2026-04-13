# PAC Sites Update — Design Spec

**Date:** 2026-04-13
**Status:** Draft
**Scope:** All 4 PAC campaign websites

## Overview

Update all four PAC campaign websites to: remove donation functionality (pending WinRed approval), add a downloadable Citizens' Report PDF section, and deploy an AI-powered chatbot with conversation analytics via the existing systemifai-knowledge dreaming pipeline.

## Sites

| Site | Repo | Domain(s) | Current State |
|------|------|-----------|---------------|
| SBOCC PAC (main) | sbocc-website | keepcarrollstrong.com, ccsbpac.com, sboccpac.com, smallbusinessesofcarrollcounty.com | Has donate section + nav link + WinRed refs |
| Carroll County Deserves Better | site1-pac | (existing deployment) | Has donate card + modal |
| Independent Voter Guide | site2-voter-guide | (existing deployment) | No donate elements |
| Carroll County Justice | site3-justice | (existing deployment) | No donate elements |

## Change 1: Remove Donation Buttons

**Affected sites:** sbocc-website, site1-pac

### sbocc-website
- Remove the `#donate` nav link from the navigation bar
- Remove the entire `<section class="donate" id="donate">` section
- Remove donate-related CSS (`.donate`, `.donate-tiers`, `.donate-tier`, `.donate-btn`, `.donate-disclaimer`)
- Remove donate-related JavaScript (`selectTier`, `donateBtn` logic)
- Update the hero CTA to point to `#mission` or `#report` (new section) instead of `#donate`
- Remove any other internal links pointing to `#donate`

### site1-pac
- Remove the donate card from the two-column layout in the join/action section
- Remove the donate modal (`#donateModal`)
- Remove donate-related CSS (`.donate-card`, `.donate-amounts`, `.donate-amt`, `.donate-btn`, `.donate-disclaimer`)
- Remove donate-related JavaScript (`selectAmt`, `handleDonate`, modal logic)
- Remove "Financial contribution" from the interest dropdown if present
- Rebalance the layout where the donate card was removed so it still looks good

### Design note
Remove cleanly — don't leave placeholder "coming soon" text. When WinRed is approved, donation sections can be re-added.

## Change 2: Download the Report Section

**Affected sites:** All 4

### Content
- **PDF file:** `culver-citizens-report.pdf` (46KB, 22 pages)
- **Report title:** "Carroll County Citizens' Report: The Documented Case Against Allan Culver Jr."
- **Published:** March 2026 by Carroll County Small Businesses PAC

### Section design
- New section placed after the "why" / main content section, before the join/CTA section
- Section heading: varies per site tone (see below)
- Brief 2-3 sentence description of what the report contains
- Prominent download button styled consistently with each site's design language
- Small disclaimer: "Paid for by Carroll County Small Businesses PAC. Not authorized by any candidate or candidate's committee."

### Per-site heading/tone
- **sbocc-website:** "Read the Full Report" — PAC voice, direct
- **site1-pac:** "The Documented Record" — advocacy tone
- **site2-voter-guide:** "Source Document: Citizens' Report" — neutral, informational
- **site3-justice:** "The Evidence" — accountability-focused

### Implementation
- Copy `culver-citizens-report.pdf` into each site's root directory
- Download button links to `/culver-citizens-report.pdf` with `download` attribute
- Add nav link to `#report` section in each site's navigation

## Change 3: AI Chatbot

**Affected sites:** All 4

### Architecture

```
Browser (chat widget)
    ↓ POST /api/chat
Vercel Serverless Function (/api/chat/index.js)
    ↓ Anthropic API (Claude Opus)
    ↓ Write to Supabase (evidence_events)
    ↓ Response streamed back to browser
```

### Frontend: Two entry points, one chat session

**Inline section:**
- New section on each page, placed after the report download section
- Heading varies per site (see tone section below)
- Shows a chat interface embedded in the page flow
- 3-4 suggested starter questions relevant to the site's focus
- Input field + send button

**Floating widget:**
- Small circular button in bottom-right corner
- Click expands to a chat panel overlay
- Same chat session as the inline section — messages persist between both views
- Close/minimize button
- Subtle branding: "Powered by Carroll County Small Businesses PAC"

**Shared behavior:**
- Messages stored in browser sessionStorage so conversation persists during visit
- Typing indicator while waiting for response
- Streaming response display (tokens appear as they arrive)
- Mobile responsive — full-width on small screens
- Accessible: keyboard navigation, aria labels, screen reader support

### Backend: Vercel Serverless Function

**Endpoint:** `POST /api/chat`

**Request body:**
```json
{
  "messages": [
    { "role": "user", "content": "What happened with the Buenger scandal?" }
  ],
  "site": "sbocc-website",
  "session_id": "uuid-v4"
}
```

**Response:** Server-sent events (SSE) stream of Claude response tokens.

**Implementation:**
- Single shared `/api/chat/index.js` serverless function deployed to each site
- Uses `@anthropic-ai/sdk` to call Claude Opus (`claude-opus-4-6`)
- System prompt constructed per-site (see tone section)
- System prompt includes the full Citizens' Report text as grounding context
- Conversation history passed in messages array (last 20 messages max)
- Rate limiting: 20 messages per session per hour (stored in Vercel KV or in-memory map)

### System Prompt Structure

```
[Site-specific persona and tone instructions]

You are a knowledgeable assistant for [site description]. You help voters 
and community members understand the documented record regarding the 2026 
Carroll County State's Attorney race.

RULES:
- Only cite facts from the Citizens' Report or publicly available sources
- Always attribute claims to their documented source
- If asked about something not in your knowledge, say so honestly
- Be respectful and non-partisan in tone (adjusted per site)
- Do not make up quotes, statistics, or court records
- Do not discuss other races or candidates outside this race
- If asked about donation/contribution, explain that the PAC is awaiting 
  WinRed approval and contributions will be available soon

[Full text of culver-citizens-report.pdf embedded here]

[Site-specific additional context]
```

### Per-site chatbot tone

**sbocc-website (PAC voice):**
- Persona: "Carroll County Small Businesses PAC Assistant"
- Tone: Direct, business-focused, community-oriented
- Starter questions: "Why does the State's Attorney race matter to businesses?", "What happened in the Buenger scandal?", "Who is George Psoras?", "What is this PAC about?"

**site1-pac (Advocacy):**
- Persona: "Carroll County Campaign Assistant"
- Tone: Passionate but factual, advocacy-oriented
- Starter questions: "What is Allan Culver's record?", "Why did four judges ban Culver?", "What did Culver oppose in the legislature?", "How is George Psoras different?"

**site2-voter-guide (Neutral/Educational):**
- Persona: "Voter Guide Assistant"
- Tone: Neutral, informational, encourages voters to read sources
- Starter questions: "Compare the two candidates", "What is the Brady Rule?", "What happened in 2022?", "Where can I verify these claims?"

**site3-justice (Accountability):**
- Persona: "Carroll County Justice Research Assistant"
- Tone: Investigative, factual, focused on accountability and legal standards
- Starter questions: "What are Brady Rule violations?", "What is the Buenger timeline?", "Why was a conviction overturned?", "What transparency bills were opposed?"

### Supabase Integration: Conversation Logging

**Table:** `evidence_events` (existing table in systemifai-knowledge schema)

**Per conversation turn, write one evidence event:**
```json
{
  "organization_id": "psoras-campaign",
  "source_type": "chatbot_conversation",
  "evidence_type": "transcript",
  "raw_content": "[formatted conversation transcript]",
  "raw_payload": {
    "session_id": "uuid",
    "site": "sbocc-website",
    "messages": [...],
    "user_message": "...",
    "assistant_response": "...",
    "timestamp": "ISO-8601"
  },
  "metadata": {
    "chatbot_version": "1.0",
    "model": "claude-opus-4-6",
    "site_persona": "pac-voice"
  },
  "processing_state": "ready_for_dreaming"
}
```

**Write frequency:** One event per completed exchange (user message + assistant response). Not per-token.

**Connection:** Uses Supabase REST API with service role key stored in Vercel environment variables.

### Dreaming Integration

The existing psoras-campaign dreaming pipeline will pick up chatbot evidence events automatically because:
- They use `organization_id: "psoras-campaign"`
- They have `processing_state: "ready_for_dreaming"`
- The dream cycle processes all evidence types in the org

**Expected dream outputs:**
- `facts` wing: New voter concerns, frequently asked topics
- `gaps` wing: Questions the chatbot couldn't answer well, missing information
- `patterns` wing: Recurring themes, sentiment trends, geographic patterns if detectable

**No changes needed to the dreaming infrastructure.** The existing `dream.sh` and wing-based synthesis will process chatbot conversations alongside other evidence types.

## File Changes Summary

### sbocc-website
- `index.html` — Remove donate section/nav/CSS/JS, add report section, add chatbot section + widget
- `culver-citizens-report.pdf` — Copy from Downloads
- `api/chat/index.js` — New serverless function
- `package.json` — New, declares `@anthropic-ai/sdk` dependency
- `vercel.json` — Update to include API route

### site1-pac
- `index.html` — Remove donate card/modal/CSS/JS, add report section, add chatbot section + widget
- `culver-citizens-report.pdf` — Copy from Downloads
- `api/chat/index.js` — New serverless function (same as sbocc, different site config)
- `package.json` — New, declares `@anthropic-ai/sdk` dependency
- `vercel.json` — Update to include API route

### site2-voter-guide
- `index.html` — Add report section, add chatbot section + widget
- `culver-citizens-report.pdf` — Copy from Downloads
- `api/chat/index.js` — New serverless function
- `package.json` — New, declares `@anthropic-ai/sdk` dependency
- `vercel.json` — Update to include API route

### site3-justice
- `index.html` — Add report section, add chatbot section + widget
- `culver-citizens-report.pdf` — Copy from Downloads
- `api/chat/index.js` — New serverless function
- `package.json` — New, declares `@anthropic-ai/sdk` dependency
- `vercel.json` — Update to include API route

## Environment Variables (Vercel)

Each site needs these environment variables configured in Vercel:
- `ANTHROPIC_API_KEY` — Claude API key
- `SUPABASE_URL` — Supabase project URL (`https://aijimwtphfdkdxjkhrcx.supabase.co`)
- `SUPABASE_SERVICE_ROLE_KEY` — Service role key for writing evidence events
- `SITE_ID` — One of: `sbocc-website`, `site1-pac`, `site2-voter-guide`, `site3-justice`

## Out of Scope

- WinRed donation integration (pending approval — will be a separate spec)
- Custom domain SSL verification (in progress, handled by Vercel automatically)
- Mobile app or native chatbot
- User authentication or accounts
- Chat history across sessions (sessionStorage only, no persistent user tracking)
