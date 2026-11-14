# Mobile navigation and UX verification

Assessment updated: 14 November 2026 (Africa/Lagos).

PR #2 reconciled with merged main `928b1688510d9329de0d3f1fd2b902a512919652`. The SiteHeader.tsx and Services.tsx conflicts were formatting overlaps; the frontend focus-management changes were retained. Main supplies the existing dependency/security fixes and quality workflow.

## Implemented

- Mobile and tablet navigation below 1024px, with all four section links and the project-discussion CTA.
- A labelled modal navigation drawer using the existing Radix Dialog dependency: expanded state, Escape dismissal, focus containment and trigger focus restoration.
- Selecting a section closes the drawer and moves focus to that section's heading. Crossing to desktop closes the drawer and restores focus to the visible logo link.
- Navigation and close controls use a minimum 44px target; menu links use a minimum 56px height. The narrow header prioritises logo and menu; its CTA is inside the menu below 640px.
- Hash destinations have responsive sticky-header scroll offsets.
- Maximised service cards leave focus at the discussion heading when their discussion link is selected. Escape still restores the maximise trigger. Extra title padding avoids the enlarged close control.
- Existing hero, original logo, six buyer situations, eight services and relocated workflow illustration are preserved.

## Executed local checks

| Check                                         | Result                                                                      |
| --------------------------------------------- | --------------------------------------------------------------------------- |
| `npm ci`                                      | PASS: fresh installation, 443 packages, Node 24.22.1                        |
| `npm audit --omit=dev --audit-level=moderate` | PASS: zero vulnerabilities                                                  |
| `npm audit --audit-level=high`                | PASS (exit 0): seven moderate development-tool findings, zero high/critical |
| `npm test`                                    | PASS: 15 tests across 4 files                                               |
| `npm run typecheck`                           | PASS                                                                        |
| `npm run build`                               | PASS                                                                        |
| Repository-wide `npm run lint`                | PASS: zero errors and six existing Fast Refresh warnings                    |
| `git diff --check`                            | PASS                                                                        |

The full audit gate passes at its approved high-severity threshold; it does not mean the development graph is vulnerability-free. The seven moderate findings remain under the existing controls in [dependency-security-triage.md](dependency-security-triage.md).

The five added regression tests cover modal semantics and Escape/return focus, section-selection focus, desktop breakpoint closure, Tab/Shift+Tab containment, and service-modal discussion focus. These are jsdom interaction checks, not browser layout or screen-reader certification.

These checks ran against the reconciled tree after an ordinary clean `npm ci`; the earlier shared dependency directory was removed first. No dependency, audit threshold, workflow or protection changes were introduced by this reconciliation. GitHub's mandatory `Quality checks` also passed on tested commit `5db6ea9c9a1e4650119fcdc294f7e9fd92f68cec`: [run 43572759472, job 132380487667](https://github.com/Jnasak/jca-salvi-landing/actions/runs/43572759472/job/132380487667). A subsequent documentation-only evidence update requires its own current-head CI result; the browser-tested application SHA remains unchanged.

## JCA-reported local browser acceptance

- Tested commit: `5db6ea9c9a1e4650119fcdc294f7e9fd92f68cec`.
- Test date reported: 14 November 2026 (Africa/Lagos); exact execution time not supplied.
- Tester: JCA, using the recovered Windows checkout on `test/pr2-browser-qa` at `http://127.0.0.1:5173/`.
- Evidence source: JCA's “All pass” confirmation after the guided browser checklist, subsequently accepted by AY as PASS WITH CONTROLS for basic responsive and interaction acceptance.
- Attribution: user-reported browser results, not independently observed by AAY1. No landing-page screenshots, console export or automated accessibility report were supplied with this confirmation. Browser version and exact viewport heights were not recorded.

| Reported check                              | Result                                                                                                                             |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 320px mobile navigation                     | PASS — JCA reported                                                                                                                |
| 390px mobile navigation                     | PASS — JCA reported                                                                                                                |
| 768px tablet navigation                     | PASS — JCA reported                                                                                                                |
| 1024px desktop navigation                   | PASS — JCA reported                                                                                                                |
| 1440px desktop navigation                   | PASS — JCA reported                                                                                                                |
| Keyboard navigation and menu focus          | PASS — JCA reported Tab, Shift+Tab, Escape, containment/restoration and desktop resize dismissal                                   |
| Service interactions and section navigation | PASS — JCA reported expand/maximise/minimise, discussion destination focus, sticky-header alignment and responsive overflow checks |
| Browser console inspection                  | PASS — JCA reported no failures in the guided inspection; no console export supplied                                               |

Basic responsive and interaction acceptance is now PASS WITH CONTROLS. No new frontend defect or correction was reported in this browser session. The earlier remote-browser localhost connection failure remains a limitation of AAY1's own browser environment; it does not invalidate JCA's successful local checks.

The controls above do not establish comprehensive accessibility conformance or measured touch-target sizes. The authored target sizes are documented under Implemented; computed dimensions still need verification.

## Remaining accessibility checks

These are PENDING, not covered by the eight reported checks. Record the exact tested application SHA, browser, assistive-technology version where applicable, results and defects.

| Check                                           | Acceptance observations                                                                                                                                                   | Owner                         |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| 200% browser zoom                               | Text, navigation, drawers and service dialogs remain readable and operable without clipping or lost controls; focus stays visible                                         | AAY1 with JCA local execution |
| Reduced motion                                  | Enable the operating-system/browser preference and reload; workflow starts paused, decorative motion stops, and navigation remains usable                                 | AAY1 with JCA local execution |
| Computed contrast                               | Measure normal text, large text, controls and focus indicators across light/dark sections and hover/focus states; verify applicable WCAG AA thresholds                    | AAY1                          |
| Screen-reader behaviour                         | Check landmarks, heading order, menu name/state, modal announcements, tab selection, inactive carousel content and focus restoration with a real screen reader            | AAY1 with JCA local execution |
| Browser accessibility scan                      | Review actual browser findings and manually validate them; automated results alone do not establish conformance                                                           | AAY1                          |
| Touch targets and remaining interactive widgets | Verify computed target sizes; explicitly exercise carousel Arrow/Home/End navigation and workflow pause/resume, which were not individually recorded in the latest return | AAY1 with JCA local execution |

## Remaining product dependencies

The discussion destination still explicitly reports that its live enquiry connection is unavailable. BOS integration and approved contact destinations are required to complete live conversion. This navigation change does not create an enquiry database or transmit lead data. Approved partner photographs and release approvals remain separate dependencies.

Recommendation: PASS WITH CONTROLS for basic responsive and interaction acceptance on the exact browser-tested SHA. Remaining accessibility checks and independent PR review are pending. Enquiry integration and eligible commercial hosting remain separate release dependencies. No merge, preview or production release clearance is implied.
