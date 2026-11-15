# Frontend verification

## Reproduce automated checks

Use Node 24 and the committed npm lockfile:

```sh
npm ci
npm audit --omit=dev --audit-level=moderate
npm audit --audit-level=high
npm run lint
npm run typecheck
npm test
npm run build
```

The suite covers navigation dialog semantics, focus containment/restoration, section focus, service-card interactions, carousel keys, workflow motion preferences, and the test-only enquiry form. Form tests exercise validation/error linkage, pending-repeat suppression, retained drafts, simulated failure/recovery, context transfer, field-definition parity and no submission/storage activity.

`Quality checks` is the GitHub Actions job for the same commands. Inspect the result on the exact commit under review. A test/build result does not establish browser accessibility or hosted form behavior. Six existing Fast Refresh lint warnings may be reported; audit findings must be read separately from the configured failure thresholds.

## Browser checks

Record the tested SHA, browser, viewport and expected/actual result when running these checks. This file provides reproduction instructions, not a browser acceptance record.

- Check navigation at 320px, 390px, 768px, 1024px and 1440px. Verify no clipped controls or unwanted horizontal overflow.
- Open the menu by keyboard. Tab/Shift+Tab should remain inside it; Escape should close it and return focus. Selecting a section should focus its heading below the sticky header. Resizing to desktop should dismiss the menu without a remaining backdrop.
- Expand/minimise/maximise service cards. Escape should return focus to Maximise; the discussion link should focus its destination.
- Check carousel ArrowLeft/ArrowRight/Home/End behavior, inactive-panel exclusion and workflow pause/resume.
- At 200% zoom, check text reflow, navigation, dialogs, field labels, errors and visible keyboard focus.
- With reduced motion enabled before load and at runtime, verify actual animation stops and controls remain usable.
- Measure rendered text, control and focus contrast, including hover/selected states and alpha/gradient backgrounds. Check the evergreen focus outline inside light buyer cards and champagne text over the brightest dark highlight.
- With a real screen reader, check landmarks/headings, skip navigation, menu state, modal title/close, tab/panel labels, error-summary focus and form status announcements.
- Run a browser accessibility scan, manually inspect its findings and measure actual touch targets. Automated scans alone do not establish conformance.

Source-token calculations apply to opaque solid colours only: evergreen/paper approximately 10.04:1; champagne against the current brightest gradient stop approximately 4.68:1. They do not establish rendered contrast for composited surfaces. The authored light-card focus scope and gradient lightness correction require browser observation.

## Test-only enquiry

Use synthetic values and an email ending in `@example.test`. Submit with empty fields, follow error links, complete required values, exercise the simulated failure toggle, retry deliberately and inspect the honest test confirmation. Verify no enquiry request or persistent browser-storage write occurs.

The form has no live transport or detection attributes. `netlify/enquiry-form.html` is a definition template outside the Vite publish directory; it is not copied to `dist`. A local test confirmation is not hosted receipt, notification, record persistence or booking evidence. No hosted or comprehensive accessibility pass is asserted here.
