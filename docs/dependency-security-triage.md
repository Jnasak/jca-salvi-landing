# Landing-page dependency triage — 13 November 2026

Owner: AY1. Review authority: AY; independent reviewer: Jenn-Stack.
Repository: Jnasak/jca-salvi-landing (separate from BOS).
Baseline: CI PR #1, e724836a0a8eed21b26206458754708b7cfce9d2.
This change remains subject to independent PR review. No deployment is authorised.

## Findings and bounded fixes

The baseline npm audit reports 9 affected package entries: 2 high, 7 moderate,
0 critical. These are package counts, not nine independent exploit chains.

| Family | Exposure assessment | Treatment |
| --- | --- | --- |
| Vite 8.1.5 | Development server/editor middleware; Windows editor command execution and other server advisories. Not a claim that static dist assets contain a listening Vite server. Relevant to the actual Windows workstation nonetheless. | Pin Vite 8.1.6, the patch release for the 8.1 line. Keep dev/preview loopback-only. |
| Zod 3.25.76 | Runtime-declared dependency, high-severity constrained-collection memory exhaustion. No Zod or resolver import found under src; no reachable validator identified in this frontend. | Remove the unused direct Zod dependency rather than impose a v4 API migration. Current resolver optional-peer range supports absence. Any future validation addition requires a fresh dependency/security review. |
| minimatch 10.2.6 via typescript-eslint 8.72.2 | Moderate globparts amplification/DoS in lint tooling. Seven reported package entries share this advisory chain. No application source import or public request path identified. Untrusted PR source/path input can still consume CI resources. | Unresolved, documented for AY risk review. Do not downgrade typescript-eslint to npm audit's suggested older version or force a minimatch-major override without compatibility review. |

Primary advisories:
- https://github.com/advisories/GHSA-698v-4r3x-3vcv
- https://github.com/advisories/GHSA-r825-w8mm-5pxw
- https://github.com/advisories/GHSA-587h-7wmj-h5pm
- https://github.com/advisories/GHSA-9jrq-w75r-8gcw
- https://github.com/advisories/GHSA-rq7h-c2jc-7f22
- https://github.com/advisories/GHSA-mrhx-c7xc-m3w5
- https://github.com/advisories/GHSA-g3hv-75wg-m249

## Audit result after bounded changes

- Complete installed graph: 0 high/critical; 7 moderate entries remain in the
  minimatch/typescript-eslint development chain. An unrestricted npm audit still
  exits nonzero; do not represent this as vulnerability-free.
- Runtime graph (npm audit --omit=dev): 0 reported vulnerabilities.
- Latest typescript-eslint registry version at inspection: 8.72.2; a compatible
  maintainer release fixing this chain was not available through the registry.
- Scope is the npm advisory database at the activity date, not proof of absence
  of vulnerabilities or a browser/security penetration test.

## Proposed CI policy in the existing quality workflow

- Runtime graph blocks moderate, high and critical findings:
  `npm audit --omit=dev --audit-level=moderate`.
- Complete graph blocks high and critical findings:
  `npm audit --audit-level=high`.
- Both commands remain visible and fail on their own error; no continue-on-error,
  advisory suppression, registry bypass, paid scanner or deployment credential.
- Existing lint/typecheck/test/build checks and the 10-minute job timeout remain.
- Existing SHA-pinned actions, contents:read permission, credential-free checkout
  and cancellation of obsolete concurrent runs remain intact.

The moderate tooling finding is NOT silently accepted. AY must approve or reject
the residual development-risk disposition before merge. Suggested review deadline:
20 November 2026, or earlier on a patched maintainer release, severity increase,
new reachability or evidence of exploitation. AY1 owns re-triage. While open, do
not add user-controlled glob processing, expose the dev server, or attach secrets
to CI. New moderate runtime findings block without a new exception.

## Verification and ownership

Use Node 24 and the committed lockfile. Reproduce npm ci, the two audit gates,
npm run lint, npm run typecheck, npm test and npm run build. The local diagnostic
install uses --ignore-scripts; GitHub Actions must separately verify ordinary npm ci.
Six pre-existing Fast Refresh lint warnings are not security findings.

Only package.json, package-lock.json, this report and the existing workflow are
changed. Frontend source, approved UI, permissions, protected main and Vercel are
unchanged. AAY1 retains UI/responsiveness/accessibility ownership. Jenn-Stack's
independent review is required; successful checks do not constitute that review.

## Vercel decision dependency

The repository has not been connected to Vercel. Account/team identity, actual
subscription, billing authority, eligible commercial-use plan and explicit preview
publication permission remain pending JCA/AY confirmation. No project, integration,
domain, environment secret or deployment is created by this change. Current
commercial suitability must be assessed against the account actually selected,
not inferred from GitHub ownership or from a free Hobby allowance.
