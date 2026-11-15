# Dependency audit notes

## Package changes

The dependency update pins Vite 8.1.6 and removes the unused direct Zod dependency. Application source does not import Zod or its resolver. Vite's dev/preview server remains loopback-only; a static production build is not a running Vite development server.

The historical package audit after these changes reported zero runtime findings, zero high/critical findings in the complete graph, and seven moderate package entries sharing the minimatch/typescript-eslint tooling advisory chain. These are package entries, not seven independent exploit chains. Audit data changes over time; rerun it against the installed lockfile rather than treating this note as a current vulnerability-free claim.

Primary advisory references:

- https://github.com/advisories/GHSA-698v-4r3x-3vcv
- https://github.com/advisories/GHSA-r825-w8mm-5pxw
- https://github.com/advisories/GHSA-587h-7wmj-h5pm
- https://github.com/advisories/GHSA-9jrq-w75r-8gcw
- https://github.com/advisories/GHSA-rq7h-c2jc-7f22
- https://github.com/advisories/GHSA-mrhx-c7xc-m3w5
- https://github.com/advisories/GHSA-g3hv-75wg-m249

## Reproduction

```sh
npm ci
npm audit --omit=dev --audit-level=moderate
npm audit --audit-level=high
npm run lint
npm run typecheck
npm test
npm run build
```

The runtime gate fails on moderate or higher findings; the complete-graph gate fails on high or critical findings. A passing high-threshold gate can still report moderate findings. An unrestricted `npm audit` can therefore exit nonzero even when the configured gates pass.

No advisory suppression or continue-on-error is used. Avoid forced dependency-major overrides without checking compatibility. Recheck reachability when adding validation, file/glob processing or server features. These notes describe dependency behavior and reproduction; they do not establish absence of vulnerabilities or replace application security testing.
