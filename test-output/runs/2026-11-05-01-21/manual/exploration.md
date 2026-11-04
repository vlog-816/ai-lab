# Manual exploration

## Scope and environment

- Environment: staging, as specified by the user
- URL: https://vlog-ai-powered-assistant.vercel.app/
- Browser: Chrome
- Viewport: 1280 x 720
- Scope: public login and account-creation flows
- Out of scope: authenticated product features beyond confirming the post-login state
- Date: 2026-11-05

## Observations

1. The root URL resolves to `/login`. The page presents Email Address and Password fields, a Sign in button, and a Sign up link.
2. Submitting the login form empty displays “Missing username or password”, stays on `/login`, and produces `POST /auth/login` with HTTP 422. No authenticated state is shown.
3. The Sign up link opens `/register`, with Full Name, Email, and Password fields, a Create Account button, and a Sign in link.
4. Submitting the registration form empty displays “Email and password are required”, stays on `/register`, and produces `POST /auth/register` with HTTP 400.
5. Submitting the registration form with populated fields created a staging account (`POST /auth/register` returned HTTP 201), redirected to `/`, and showed the account email and Logout control. The flow did not require email verification before showing the signed-in state. The user authorized creation of a random account; it remains on staging.
6. Logging out returned to `/login`. Signing in with the account just created returned HTTP 200 and showed the authenticated home page.
7. Browser console captured verbose DOM notices that password fields should have autocomplete attributes. The only console errors observed corresponded to the empty login and registration requests returning 422 and 400.

## Evidence

- [login-page.png](./login-page.png) — login screen at 1280 x 720
- [signup-page-corrected.png](./signup-page-corrected.png) — registration screen at 1280 x 720
- [authenticated-home.png](./authenticated-home.png) — authenticated home screen after account creation

## Skills used

- `playwright-cli` — manual browser navigation, form interaction, snapshots, screenshots, and console/network inspection
- `playwright-best-practices` — coverage guidance for form validation, authentication, and browser diagnostics
