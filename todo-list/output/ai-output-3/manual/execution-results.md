# Manual Test Report

## Summary

- **Scope:** Execute approved manual test plan TC-01 through TC-08 against TodoMVC React.
- **Environment:** Integrated browser on Windows; Chromium-based browser. The browser request reported a 2560 × 1440 screen size. No separate application test account or environment was provided.
- **Date:** 2026-10-31
- **Total:** 8
- **Pass:** 8
- **Fail:** 0
- **Blocked:** 0
- **Skipped:** 0

## Results

| ID | Title | Status | Notes |
|---|---|---|---|
| TC-01 | Add a todo | Pass | Actual: “Manual QA - add” appeared as an active todo; the input cleared and the count showed 1 item left. Evidence: [TC-01.png](./TC-01.png). URL: `https://todomvc.com/examples/react/dist/#/`. Console/network: no per-case error surfaced through the browser UI; the session-level analytics failure is listed below. |
| TC-02 | Submit an empty todo | Pass | Actual: submitting the empty input did not add a row; the existing todo and count remained unchanged at 1 item left. Evidence: [TC-02.png](./TC-02.png). URL: `https://todomvc.com/examples/react/dist/#/`. Console/network: no per-case error surfaced through the browser UI; the session-level analytics failure is listed below. |
| TC-03 | Edit a todo | Pass | Actual: double-click edit saved “Manual QA - edited”; its checkbox remained unchecked and the count stayed at 1 item left. Evidence: [TC-03.png](./TC-03.png). URL: `https://todomvc.com/examples/react/dist/#/`. Console/network: no per-case error surfaced through the browser UI; the session-level analytics failure is listed below. |
| TC-04 | Complete and reactivate a todo | Pass | Actual: checking the todo changed the count to 0; unchecking it restored the count to 1. Evidence: [TC-04-completed.png](./TC-04-completed.png), [TC-04-reactivated.png](./TC-04-reactivated.png). URL: `https://todomvc.com/examples/react/dist/#/`. Console/network: no per-case error surfaced through the browser UI; the session-level analytics failure is listed below. |
| TC-05 | Filter active todos | Pass | Actual: Active displayed only “Manual QA - active”; Active was selected and the count was 1 item left. Evidence: [TC-05.png](./TC-05.png). URL: `https://todomvc.com/examples/react/dist/#/active`. Console/network: no per-case error surfaced through the browser UI; the session-level analytics failure is listed below. |
| TC-06 | Filter completed todos | Pass | Actual: Completed displayed only “Manual QA - edited”; Completed was selected. Evidence: [TC-06.png](./TC-06.png). URL: `https://todomvc.com/examples/react/dist/#/completed`. Console/network: no per-case error surfaced through the browser UI; the session-level analytics failure is listed below. |
| TC-07 | Show all todos | Pass | Actual: All displayed both “Manual QA - edited” (completed) and “Manual QA - active” (active); All was selected and the count was 1 item left. Evidence: [TC-07.png](./TC-07.png). URL: `https://todomvc.com/examples/react/dist/#/`. Console/network: no per-case error surfaced through the browser UI; the session-level analytics failure is listed below. |
| TC-08 | Toggle all todos | Pass | Actual: with two active todos, Toggle All checked both and showed 0 items left; toggling again unchecked both and showed 2 items left. Evidence: [TC-08-completed.png](./TC-08-completed.png), [TC-08-active.png](./TC-08-active.png). URL: `https://todomvc.com/examples/react/dist/#/`. Console/network: no per-case error surfaced through the browser UI; the session-level analytics failure is listed below. |

## Defect list

No defects were identified in the executed cases.

## Observations and risks

- A Google Analytics collection request to `www.google-analytics.com` failed with `net::ERR_ABORTED` during the browser session. It was an external analytics request; the TodoMVC interface remained usable and no todo operation error was observed.
- During exploration, todos created before a page reload were no longer visible after reload. Persistence was not part of the approved test plan and was not retested as a case.
- Delete and Clear completed were not exercised because they were excluded from the plan as destructive actions.
- Todos created during execution remain in the page for inspection; no delete or clear action was performed.

## Recommendations

- Clarify whether todo items are expected to persist after a page reload and add an approved case if persistence is in scope.
- If destructive actions are in scope, authorize and plan isolated test data for Delete todo and Clear completed.
- Review the external analytics request separately if analytics delivery is expected in the test environment.
