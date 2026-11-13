# JCA × Salvi — Responsive Landing Page

**Business, Product & Operations Delivery Partners**

A responsive business and sales landing page that helps visitors recognise business challenges, explore relevant services and begin an appropriately scoped project conversation.

**Status:** In development. Source publication does not mean the website is deployed or that enquiry, booking or email integrations are active.

## Purpose

The website supports service awareness, business-problem discovery and qualified commercial conversations, with growing service-based SMEs and agencies as the priority audience.

The intended buyer journey is:

**Recognise a challenge → Explore a solution → Establish fit → Request a conversation → Qualification**

## Current frontend

- Hero with prominent business messaging and balanced partner-photo placeholders.
- Manual challenge-and-solution carousel covering six buyer groups.
- Three service-category flashcards with expand, minimise and maximise interactions.
- Eight service types with scope-aware descriptions.
- Partnership introduction and three flexible engagement routes.
- Illustrative workflow in **Our Approach**, with selectable stages, pause/play and reduced-motion support.
- Manrope headings, Instrument Sans body text and the Sage & Persimmon palette.
- Original complete logo, including its signature icon.
- Internal navigation and an enquiry section clearly identifying the pending connection.

## Audiences

1. Growing service-based SMEs and agencies.
2. Startup founders and growing businesses.
3. Product teams and digital businesses.
4. Programme and project leaders.
5. Customer experience and operations teams.
6. E-commerce and operationally complex businesses.

Buyer situations are illustrative; they are not claims about specific organisations.

## Service architecture

| Category | Service types |
| --- | --- |
| Business & Workflow Improvement | S01 — Business Systems & Workflow Improvement; S04 — Customer Experience & Operations Improvement; S06 — E-commerce Operations Improvement; S08 — AI & Automation Readiness Solutions |
| Product & Solution Development Support | S02 — Product Discovery & Improvement; S07 — Product Discovery & Technical Delivery Partnerships |
| Programme & Project Delivery | S03 — Programme & Project Delivery; S05 — Implementation Recovery & Operational Adoption |

AI and automation readiness does not automatically include implementation. Technical-delivery partnerships do not automatically include software development. Deliverables and responsibilities are agreed for each engagement.

## Engagement routes

- **Discover & Design:** understand the challenge and clarify a suitable approach.
- **Plan & Execute:** coordinate agreed scope, ownership and delivery activities.
- **Improve & Sustain:** support agreed adoption, refinement and improvement.

These are flexible routes, not compulsory sequential packages.

## Technology

React · TypeScript · Vite · Tailwind CSS · Radix UI · Vitest · Testing Library.

Development continues locally using Codex within Antigravity. The application runs without Lovable credits or a Lovable asset gateway.

## Run locally

Install Node.js **22.12 or later** and npm, then run:

```sh
git clone https://github.com/Jnasak/jca-salvi-landing.git
cd jca-salvi-landing
npm ci
npm run dev
```

Open the local URL printed by Vite. Do not open `index.html` directly.

No credentials or environment variables are required for the current frontend. Initial dependency installation needs internet access. Google Fonts use network requests, with system-font fallbacks.

## Validation commands

```sh
npm test
npm run typecheck
npm run build
```

The prepared source passed **10 automated tests**, TypeScript checking and the local build. Responsive visual review and real-browser interaction checks remain pending; automated checks do not establish accessibility compliance or production readiness.

Review at **360, 390, 768, 1024 and 1440 pixels**, including keyboard navigation, mobile swipe, dialog focus, reduced motion, contrast and horizontal overflow.

## Project structure

```text
public/                  Original logo assets and robots.txt
src/
  components/landing/    Landing-page sections and interactions
  components/ui/         Shared interface components
  content/landing.ts     Buyer, service and workflow content
  test/                  Automated checks
  App.tsx                Page composition
  main.tsx               Browser entry
  styles.css             Design tokens and styling
```

## Remaining development

- Refine the hero with a replaceable, approved joint photograph.
- Add distinct Discovery Call, Clarity Call and Contact request journeys.
- Preserve selected buyer/service context into the relevant request journey.
- Complete form validation, loading, failure/retry and truthful confirmation states.
- Refine mobile navigation, FAQs and balanced partner profiles.
- Add project evidence and social proof only when cleared for use.
- Complete responsive, accessibility and integration review.
- Connect the approved BOS enquiry pathway after technical clearance.

Call requests must not be represented as confirmed appointments. No live enquiries, bookings, client emails, database, authentication or payments are currently enabled.

## Brand and content

| Colour | HEX |
| --- | --- |
| Evergreen | `#23483A` |
| Persimmon | `#EC735B` |
| Soft Sage | `#D8E7D5` |
| Warm Cream | `#FFF9F2` |
| Champagne | `#D6B783` |

Preserve the original logo geometry and complete signature icon. Photograph placeholders must remain clearly labelled until genuine approved images are supplied. Do not invent client names, endorsements, credentials, projects, results or partner likenesses.

## Deployment preparation

Vercel is the intended deployment platform; no deployment is claimed by this repository.

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Root directory | Repository root |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |

Confirm an authorised plan suitable for commercial use before deployment. Public release and live enquiry collection require their applicable technical, brand and principal approvals.

## Repository hygiene

Keep credentials, `.env` files, `node_modules`, build output, internal directives and private handover archives out of this public repository. This marketing landing page is separate from the BOS application.
