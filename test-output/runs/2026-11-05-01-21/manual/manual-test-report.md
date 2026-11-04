# Manual test report

## Objective and scope

Functionally validate the staging site's public login and account-creation flows in Chrome at 1280 x 720. Coverage includes empty-form responses, navigation between login and signup, account creation, and login with an existing test account. Authenticated product features beyond confirming the signed-in state were out of scope.

URL: https://vlog-ai-powered-assistant.vercel.app/  
Environment: Staging  
Execution date: 2026-11-05

## Summary

- Total cases: 5
- Passed: 5 (2 passed on retry after transient errors)
- Failed: 0
- Blocked: 0
- Console/network observations: Empty login returned HTTP 422 as expected. Signup requests intermittently failed their CORS preflight with `net::ERR_FAILED` and no `Access-Control-Allow-Origin` header; retrying the same submissions produced the expected empty-form response and successful account creation. The browser also logged verbose notices that password fields should have autocomplete attributes.

## Results

| ID | Title | Status | Notes |
|---|---|---|---|
| AUTH-01 | Validate empty login submission | Pass | Stayed on login and showed “Missing username or password”; login endpoint returned HTTP 422. |
| AUTH-02 | Navigate from login to account creation | Pass | Sign up link opened `/register` with the expected form fields. |
| AUTH-03 | Validate empty account-creation submission | Pass (retry) | First attempt returned a generic failure after a CORS preflight error; retry showed “Email and password are required” and HTTP 400. |
| AUTH-04 | Create an account with populated fields | Pass (retry) | First attempt returned a generic failure after a CORS preflight error; retry returned HTTP 201 and opened the authenticated home page. |
| AUTH-05 | Sign in with the account created during exploration | Pass | Login returned HTTP 200 and opened the authenticated home page. |

Detailed actual results, UI controls, URLs, network outcomes, and screenshots are in [execution-results.md](./execution-results.md).

## Defects

### BUG-01 — Intermittent CORS preflight failure on account registration

- **Severity:** Medium
- **Steps to reproduce:** 1. Open `/register`. 2. Submit the empty form, or enter valid-looking account data and select “Create Account”. 3. Observe the first registration request and retry the same action.
- **Expected:** Registration requests reach the backend consistently and return a clear validation or account-creation response.
- **Actual:** On the first attempt for both empty submission and populated account creation, the browser reported that the preflight response lacked `Access-Control-Allow-Origin`; the request failed with `net::ERR_FAILED` and the page showed “Register failed”. Retrying produced HTTP 400 with the expected empty-field message for the empty form, and HTTP 201 with an authenticated state for the populated form.
- **Evidence:** [AUTH-03-empty-signup.png](./AUTH-03-empty-signup.png), [AUTH-03-empty-signup-retry.png](./AUTH-03-empty-signup-retry.png), [AUTH-04-account-created.png](./AUTH-04-account-created.png), [AUTH-04-account-created-retry.png](./AUTH-04-account-created-retry.png). Browser console recorded the CORS error; network inspection recorded the failed requests followed by HTTP 400 and HTTP 201 responses.

## Observations, risks, and recommendations

- Account creation immediately opened an authenticated session; the tested flow did not require inbox or email verification.
- Signup succeeded after a retry, but the observed CORS failures make account creation appear unreliable. Investigate backend preflight/CORS handling and verify consistent behavior across repeated requests.
- Password fields generated browser console notices that autocomplete attributes are not set. Add appropriate values (for example, `current-password` for login and `new-password` for registration) to improve browser autofill behavior.
- A randomly generated staging account was created during exploration and a second account was created during formal execution, as authorized. Both accounts remain on staging; no account deletion was performed.

## Skills used

- `playwright-cli` — manual browser execution and evidence collection
- `playwright-best-practices` — test coverage guidance for authentication and form validation
