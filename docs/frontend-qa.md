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

## Targeted accessibility follow-up — 14 November 2026

Scope: continue open accessibility verification only. JCA's accepted responsive/interaction results above are retained and were not reopened. Application source is unchanged from browser-tested commit `5db6ea9c9a1e4650119fcdc294f7e9fd92f68cec`; this follow-up starts from documentation head `951ea74c8b711f7a5cf74d42cbf36a400fa82ee8` and adds tests/evidence only.

### Executed source and interaction checks

Using the existing Vitest/Testing Library dependencies, added three focused regressions in `src/test/targeted-accessibility.test.tsx`:

- Reduced-motion preference at mount: workflow starts paused and does not automatically advance over 12 simulated seconds.
- Preference changed at runtime: an already-playing workflow pauses, does not advance, remains paused when the preference is removed, and removes its media-query listener on unmount.
- Workflow controls: pause/resume changes automatic selection; ArrowLeft/ArrowRight/Home/End select and focus the expected tab, retain the roving tab stop and label the panel correctly.

Executed results: all 18 tests across five files PASS; TypeScript PASS; repository-wide ESLint PASS with zero errors and six existing Fast Refresh warnings. These are jsdom state/semantics checks. They do not verify actual SVG animation, CSS media-query rendering, spoken announcements or real assistive-technology navigation. No new tooling or dependencies were added.

Source inspection also confirms reduced-motion CSS disables workflow keyframe animations and shortens global transitions, and inactive buyer panels have `aria-hidden` and `inert`. Actual browser/assistive-technology behaviour remains pending below.

### Source-token contrast calculations

Method: convert the authored OKLCH tokens in `src/styles.css` to linear sRGB via OKLab, calculate relative luminance using 0.2126/0.7152/0.0722 weights, then calculate `(lighter + 0.05) / (darker + 0.05)`. Rounded ratios below apply only to the listed opaque solid colours. These are numerical source checks, not browser-computed or pixel-sampled contrast results.

| Foreground / background    | Calculated ratio         |
| -------------------------- | ------------------------ |
| Evergreen / cream          | 9.75:1                   |
| Soft evergreen / cream     | 5.60:1                   |
| Soft evergreen / sage      | 4.55:1                   |
| Soft evergreen / soft sage | 5.08:1                   |
| Evergreen / paper          | 10.04:1                  |
| Soft evergreen / paper     | 5.77:1                   |
| Champagne / evergreen      | 5.32:1                   |
| Champagne / deep evergreen | 6.48:1                   |
| Persimmon / cream          | 2.80:1 — decorative only |

Contrast follow-up: the bright highlight stop in `--gradient-evergreen` against champagne calculates approximately 4.30:1 if treated as an opaque solid background. This is a source-level risk, not a confirmed rendered failure: actual text placement and compositing must be measured. Check champagne small text wherever it overlaps the highlight, alpha-muted copy, hover backgrounds, and focus indicators. Do not infer a complete contrast pass from the solid-token ratios. Persimmon usages inspected are decorative accents or an `aria-hidden` icon with a textual label.

### Only the remaining local-browser checks

JCA can keep testing the existing application SHA; no checkout change is required for the tests/evidence-only update.

1. **200% zoom:** use Chrome's menu to set Zoom to 200%. Inspect text reflow, the mobile drawer, a maximised service dialog and visible keyboard focus for clipping or unreachable controls. Restore 100% afterwards. This is a zoom check, not a repeat of the accepted viewport matrix.
2. **Reduced motion:** in DevTools Rendering, emulate `prefers-reduced-motion: reduce` and reload. Confirm workflow starts with Play and its illustration stays still; manual workflow tabs must remain usable. Remove emulation after recording the result.
3. **Contrast:** use DevTools' contrast inspection on champagne text over the brightest visible dark-section backgrounds, soft evergreen body text, muted copy and control/focus states. Record actual foreground/background values and ratios; resolve any applicable failures before closing this gate.
4. **Screen reader:** use an available screen reader (for example Windows Narrator); record its name/version and Chrome version. Verify skip link/main landmark, headings, navigation button name and expanded state, modal title/close announcement, buyer/workflow tab selection and panel labels, inactive-slide exclusion, and destination/focus restoration. Keyboard-only tests do not substitute for this check.

A browser accessibility scan and computed target measurements remain open as recorded below. No browser scan, screen-reader pass, zoom pass, rendered-motion pass or comprehensive conformance is claimed in this follow-up.

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

## Focus/contrast correction follow-up — 14 November 2026

PR #2 is merged at `04975f7036bb8db1ef468f523523eaf2b7e16985`. The following narrow changes are proposed on a new feature branch; accepted basic browser results remain attributed to their original tested SHA and are not reopened.

- **Source-identified focus issue corrected:** `.on-dark :focus-visible` previously applied champagne outlines inside the buyer carousel's paper cards. Champagne/paper calculates 1.89:1. The cards now declare a light surface and a scoped rule restores evergreen outlines there (evergreen/paper 10.04:1). Other dark-section focus indicators retain champagne. Verify the affected card CTA outline in the browser; jsdom does not render CSS.
- **Gradient risk mitigated:** reduce only the decorative gradient-highlight lightness from 0.42 to 0.40. Champagne against this brightest solid stop now calculates 4.68:1 instead of 4.30:1. Brand base tokens, typography and layout are unchanged. Actual rendered text, compositing and focus contrast still require browser confirmation.
- **Executed after corrections:** all 18 tests PASS; TypeScript PASS; repository-wide lint PASS (zero errors/six existing warnings); production build PASS; no dependencies or workflows changed.
- **Remaining blocked verification:** 200% browser zoom, actual reduced-motion rendering, browser-computed/sampled contrast, a screen-reader smoke test, browser accessibility scan and computed touch-target measurement. This environment's browser cannot access JCA's Windows localhost; no new local-browser result was supplied. Source inspection, calculations and tests do not close these gates.

Only the two affected visual states need an added regression observation: focus a buyer-card discussion CTA and inspect champagne text over the dark highlight. Use the existing four-step local-browser checklist above for the open checks; no new five-width acceptance matrix is requested.

Enquiry implementation assessment: see [enquiry-destination-readiness.md](enquiry-destination-readiness.md). The minimum recommendation is a link to an approved BOS public form, conditional on that destination's readiness; no live URL has been verified or enabled.

Current recommendation: retain PASS WITH CONTROLS for accepted basic responsive/interaction behaviour. Full targeted accessibility acceptance remains HOLD until the listed browser/assistive-technology evidence is returned. The two source corrections require independent review before merge. This is not a comprehensive WCAG conformance claim.
