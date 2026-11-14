# Minimum approved enquiry destination

Assessment: 14 November 2026 (Africa/Lagos). Owner: AAY1 (landing UI); AY/AY1 own BOS runtime, integration and release clearance. Product changes require JJSA; commercial category/notice/publication decisions remain with the applicable principals.

## Recommendation

Use a same-tab link from the existing `#discuss` section to the approved BOS public enquiry page. Keep BOS as the sole lead system. Do not add a second landing-page form/backend/database, an iframe, live mail delivery, accounts, payments or a third-party form service.

This is a conditional implementation recommendation, not a verified live destination. No approved public form URL or released executable public form was established by the inspected repository artifacts. Do not point customers at a private dashboard, an API endpoint, a synthetic prototype or an unverified URL.

## Checked sources

- [BOS Product V1.0](https://github.com/Jnasak/jca-salvi-bos/blob/b37c6035a15381f77a56c103038baa773cede892/docs/product/r1a-enq-01-product-contract-v1.0.md), read with the documented V1.0.1/V1.0.2 precedence in the consolidated contract.
- [BOS consolidated API V0.2](https://github.com/Jnasak/jca-salvi-bos/blob/8075b3e0e6132b5b56a090bc17911725e3e48996/docs/backend/r1a-enq-01-api-contract-v0.2.md).
- [Frontend first executable evidence](https://github.com/Jnasak/jca-salvi-bos/blob/7c54b3c20176caf120ba9a84f700bf8e8cd6631b/docs/frontend/r1a-first-executable-evidence.md): describes a tested submission-state module, with rendered form/config/transport integration still pending at that checkpoint.

Contract approval is not runtime, hosting, public-policy or release approval. Current business-policy clearance must be supplied by its owners; historical pending statements alone do not establish today's approval status.

## Smallest work package

| Location                     | Minimum implementation                                                                                                                                                                    | Owner                             |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| BOS public page              | Finish the approved public form and config/transport adapter, using the existing guarded submission-state module and shared scaffold                                                      | AAY1 in BOS, coordinated with AY1 |
| BOS server                   | Verify approved config, persistence/audit/idempotency and public receipt behavior against the frozen contract; supply the actual approved page URL                                        | AY1; AY clearance                 |
| Landing `DiscussProject.tsx` | Replace the explicitly unavailable action with an ordinary same-tab anchor once the URL and activation are approved; use an actionable label and clear destination context                | AAY1                              |
| Landing configuration        | One non-secret, owner-approved HTTPS page URL; absence/invalid config leaves the current unavailable state explicit. No visitor-supplied redirect, credentials or guessed production host | AAY1 / AY                         |
| Content                      | Remove obsolete prototype/unavailable copy only when live enablement is approved; retain clear fallback behavior when unavailable                                                         | AAY1 with brand/product owners    |

A linked BOS form avoids cross-origin submission/CORS and duplicated validation/privacy surfaces on the landing page. If the BOS public page is not ready, the landing-only work is small but the destination dependency remains blocked. There is no safe substitute of linking directly to `POST /api/enquiries`.

## Contract details the destination must preserve

- Fields: full name, email and phone required; organisation optional; exactly one active server-approved service category; description; explicit unchecked privacy acknowledgement. Do not silently make phone optional or equate the landing's eight service IDs with approved BOS category IDs.
- `GET /api/enquiry-config` supplies the approved category list, constraints, notice/version and signed attempt token. Failure or missing approved config keeps submission unavailable.
- `POST /api/enquiries` follows contract `r1a-enq-api-v0.1`, with the prescribed contract/notice/idempotency headers. These are contract routes, not verified deployed endpoints.
- Keep draft/token in memory; prevent duplicate starts; retain the same logical attempt for advised retries. Do not create a new attempt automatically after an uncertain response.
- Accessible labels, required indicators, linked field errors, focused error summary, status feedback and recovery controls belong to the BOS form.
- Show receipt confirmation only after the contract-valid persisted-success response. A click, redirect or local success animation is not a received enquiry.
- Do not add ICP/problem/service fields to the frozen POST schema. The smallest safe route can be generic. Automatic category prefilling requires an explicitly approved allowlisted category mapping and page-link contract; no contact details, challenge description or tokens in query strings. Context preservation is a separately bounded enhancement until that contract exists.

## Acceptance before enabling the link

1. AY/AY1 supplies and verifies the exact public page URL, ownership and commercially eligible hosting; it opens without staff login and has an approved privacy notice and active categories.
2. Exercise the complete flow with synthetic data in an authorised environment: valid input → confirmed persistence/receipt; required/invalid fields → accessible errors; config failure/notice change/timeout/rate limit → honest recoverable state; retry → no duplicate persisted lead.
3. Check same-tab handoff and browser Back on mobile/desktop, keyboard navigation, form focus/status announcements and failure fallback. These are new destination tests, not a repeat of accepted landing navigation checks.
4. Independent review, AY technical clearance and applicable JCA/Salvi release approval. Vercel Hobby is not an approved commercial deployment route under the current directive. No integration, preview or deployment is authorised by this document.

## Current disposition

Minimum landing change: identify one approved BOS page URL and replace one unavailable action with a link. Destination readiness: HOLD pending verified rendered BOS form/runtime, policy/category clearance, URL and eligible hosting/release decisions. No live destination was activated and no lead data was collected during this assessment.
