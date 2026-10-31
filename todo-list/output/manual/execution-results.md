# Manual Test Report

## Summary

- **Scope:** Execute approved manual test plan TC-01 through TC-09 against TodoMVC React.
- **Environment:** Integrated Chromium-based browser on Windows; viewport observed as 2560 × 1440. No application test account was provided.
- **Date:** 2026-10-31
- **Total:** 9
- **Pass:** 9
- **Fail:** 0
- **Blocked:** 0

## Results

| ID | Title | Status | Notes |
|---|---|---|---|
| TC-01 | Add a todo | Pass | Actual: “Manual QA - add” appeared as active; input cleared and count showed 1 item left. Evidence: [TC-01.png](./TC-01.png). URL: `https://todomvc.com/examples/react/dist/#/`. |
| TC-02 | Submit an empty todo | Pass | Actual: empty Enter submission did not add a row; the existing todo and count remained unchanged at 1 item left. Evidence: [TC-02.png](./TC-02.png). URL: `https://todomvc.com/examples/react/dist/#/`. |
| TC-03 | Edit a todo | Pass | Actual: double-click opened `Edit todo`; saving “Manual QA - edited” updated the label without changing completion state or the count (1 item left). Evidence: [TC-03.png](./TC-03.png). URL: `https://todomvc.com/examples/react/dist/#/`. |
| TC-04 | Complete and reactivate a todo | Pass | Actual: checking changed count to 0; unchecking restored count to 1. Evidence: [TC-04-completed.png](./TC-04-completed.png), [TC-04-reactivated.png](./TC-04-reactivated.png). URL: `https://todomvc.com/examples/react/dist/#/`. |
| TC-05 | Filter active todos | Pass | Actual: Active showed only “Manual QA - filter active” and the count showed 1 item left. Evidence: [TC-05.png](./TC-05.png). URL: `https://todomvc.com/examples/react/dist/#/active`. |
| TC-06 | Filter completed todos | Pass | Actual: Completed showed only “Manual QA - edited”. Evidence: [TC-06.png](./TC-06.png). URL: `https://todomvc.com/examples/react/dist/#/completed`. |
| TC-07 | Show all todos | Pass | Actual: All showed both the completed “Manual QA - edited” and active “Manual QA - filter active”; count showed 1 item left. Evidence: [TC-07.png](./TC-07.png). URL: `https://todomvc.com/examples/react/dist/#/`. |
| TC-08 | Toggle all todos | Pass | Actual: Toggle All completed both active todos and count showed 0; toggling again reactivated both and count showed 2. Evidence: [TC-08-completed.png](./TC-08-completed.png), [TC-08-active.png](./TC-08-active.png). URL: `https://todomvc.com/examples/react/dist/#/`. |
| TC-09 | Delete one test todo | Pass | Actual: deleting “Manual QA - delete test” removed only that row; the two other todos remained and count showed 2 items left. Evidence: [TC-09.png](./TC-09.png). URL: `https://todomvc.com/examples/react/dist/#/`. |

No todo-operation console or network errors surfaced through the browser UI during the test cases. The session-level analytics request failure is listed under observations.

## Defect list

No defects were identified in the executed cases.

## Observations and risks

- During exploration, reloading the application removed sample todo rows while preserving the hash route. Persistence requirements remain unspecified, so this was not classified as a defect or included in the approved test cases.
- A Google Analytics request to `www.google-analytics.com` failed with `net::ERR_ABORTED` during the browser session. The TodoMVC interface and tested operations remained usable.
- The delete test removed only its uniquely named test item. The two other test todos remain in the browser; no bulk-clear action was performed.
- No retries were needed for failed test cases.

## Recommendations

- Clarify whether todo persistence across reloads is expected and add a dedicated case if it is in scope.
- Consider adding a Clear completed case only if bulk deletion is approved for the test data.

## Skills used

- `playwright-cli`: Read installed usage guidance; the standalone CLI was unavailable, so UI actions were performed with integrated browser tools.
- `playwright-best-practices`: Used for coverage selection (edge cases, accessibility/keyboard observations, and error handling).
