# Manual UI Test Report

## Summary

- **Target:** https://todomvc.com/examples/react/dist/
- **Scope:** Functional UI behavior observed and listed in the approved manual plan. Delete and Clear completed controls were not activated.
- **Environment:** Integrated Chromium-based desktop browser; 2560 × 1440 viewport as reported by a page request. The prompt did not specify a separate test environment.
- **Date:** 2026-10-29
- **Total:** 9
- **Pass:** 8
- **Fail:** 1
- **Blocked:** 0
- **Skipped:** 0
- **Retry:** TC-08 was retried once and failed again.

## Results

| ID | Title | Status | Notes |
|---|---|---|---|
| TC-01 | Verify empty-list view | Pass | Heading and new-todo textbox visible; no rows or list footer controls. Evidence: [TC-01.png](./TC-01.png). URL: `https://todomvc.com/examples/react/dist/`. |
| TC-02 | Add a todo using Enter | Pass | `Buy oat milk` appeared, input cleared, count showed `1 item left!`. Evidence: [TC-02.png](./TC-02.png). URL: `https://todomvc.com/examples/react/dist/`. |
| TC-03 | Ignore empty todo submission | Pass | Enter on an empty input left the list empty. Evidence: [TC-03.png](./TC-03.png). URL: `https://todomvc.com/examples/react/dist/`. |
| TC-04 | Complete and reactivate an item | Pass | Checkbox completed and reactivated the todo; count changed to zero and back to one. Evidence: [TC-04.png](./TC-04.png). URL: `https://todomvc.com/examples/react/dist/`. |
| TC-05 | Filter todos by status | Pass | Active showed `Active sample`, Completed showed `Completed sample`, and All showed both. Hash routes changed to `#/active`, `#/completed`, and `#/`. Evidence: [TC-05.png](./TC-05.png) shows the All view. |
| TC-06 | Edit a todo | Pass | Double-click opened the edit textbox; Enter saved `Updated task`. Evidence: [TC-06.png](./TC-06.png). URL: `https://todomvc.com/examples/react/dist/#/`. |
| TC-07 | Toggle all todos | Pass | The control completed all three todos (zero remaining), then reactivated all three (`3 items left!`). Evidence: [TC-07.png](./TC-07.png). URL: `https://todomvc.com/examples/react/dist/#/`. |
| TC-08 | Verify todo state after refresh | Fail | `Refresh persistence sample` disappeared after reload; a second attempt with `Refresh persistence sample retry` reproduced the loss. Evidence: [before refresh](./TC-08-before-refresh.png), [after refresh](./TC-08-after-refresh.png), [retry before](./TC-08-retry-before-refresh.png), [retry after](./TC-08-retry-after-refresh.png). URL remained `https://todomvc.com/examples/react/dist/#/`. |
| TC-09 | Navigate primary controls with keyboard | Pass | Tab moved focus from the empty input to the footer link and then through sidebar links; Shift+Tab returned to the input. Enter on the empty input left the list unchanged. External links were not activated. Evidence: [TC-09.png](./TC-09.png). URL: `https://todomvc.com/examples/react/dist/#/`. |

## Defect list

| ID | Title | Severity | Steps to reproduce | Expected vs actual | Evidence |
|---|---|---|---|---|---|
| DEF-01 (TC-08) | Todos are lost after page refresh | Medium | 1. Add a todo<br>2. Reload the page<br>3. Inspect the list | **Expected:** The test todo remains visible after refresh, as confirmed by the user.<br>**Actual:** The todo list is empty after refresh. Reproduced on one retry. | [Before](./TC-08-before-refresh.png), [after](./TC-08-after-refresh.png), [retry before](./TC-08-retry-before-refresh.png), [retry after](./TC-08-retry-after-refresh.png). |

## Observations and risks

- Core list operations exercised in this plan worked as expected.
- Refreshing cleared todos while retaining the current hash route.
- A Google Analytics collection `POST` to `www.google-analytics.com/g/collect` intermittently failed with `net::ERR_ABORTED`. Todo interactions remained usable; this was an external analytics request.
- The integrated browser snapshots exposed the failed network events but did not provide a console-log view, so console errors could not be independently inspected.
- Delete and Clear completed controls were intentionally not used because the prompt prohibited destructive actions without authorization.

## Recommendations

- Persist todos across reloads (for example, in browser storage) or explicitly label the list as session-only if that is intended.
- Add a regression check for restoring todos after refresh.
- Investigate the external analytics request failure separately; it did not block the tested todo workflows.

