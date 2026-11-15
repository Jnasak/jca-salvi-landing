# Responsive business landing page

React, TypeScript, Vite, Tailwind CSS and Radix UI frontend with buyer-situation navigation, expandable service cards, an illustrative workflow and a test-only enquiry form.

## Run locally

Use Node 24 and npm:

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. The application requires no credentials or environment variables. Initial installation and web-font loading use network access; system-font fallbacks are available.

## Validate

```sh
npm audit --omit=dev --audit-level=moderate
npm audit --audit-level=high
npm run lint
npm run typecheck
npm test
npm run build
```

Build output is `dist`. The app uses fragment navigation and does not require a catch-all route for its existing page. See [frontend checks](docs/frontend-qa.md) and [dependency notes](docs/dependency-security-triage.md) for technical reproduction and limitations.

## Enquiry test

The form is a simulation with no submission transport or persistent storage. Use synthetic details and an `@example.test` email address. Pending, failure/retry and confirmation are explicitly test states; no enquiry, lead or booking is created.

`netlify/enquiry-form.html` is a definition template outside `public` and `dist`. The rendered form does not carry live detection attributes. The template and URL encoder do not establish a working hosted submission endpoint.

## Structure

- `src/components/landing`: page sections and enquiry UI.
- `src/components/ui`: shared controls.
- `src/content`: buyer/service content and enquiry helpers.
- `src/test`: interaction and regression tests.
- `src/styles.css`: typography, colour, focus and motion styling.
- `public`: static assets.
- `netlify`: non-published form-definition template.

Buyer situations and workflow illustrations are examples, not verified client results. Image placeholders are labelled. Automated checks do not establish browser accessibility, live form handling or production readiness.

Keep credentials, environment files, build output and non-public records out of the repository.
