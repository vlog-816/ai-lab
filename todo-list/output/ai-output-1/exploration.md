# Exploration Notes

## Target

- URL: https://todomvc.com/examples/react/dist/
- Page title: TodoMVC: React
- Application: React TodoMVC example
- Environment: Integrated browser; exact browser version and viewport were not independently confirmed.
- Accounts: No sign-in or account controls observed.
- Scope: Functional user-interface behavior. Non-functional testing is out of scope per the prompt.

## Pages and Navigation

- One main TodoMVC page was observed.
- The main list has hash-based filters: All (`#/`), Active (`#/active`), and Completed (`#/completed`).
- The surrounding page includes React/TodoMVC informational links and attribution; these were not explored as product flows.

## Features and Flows Observed

- A textbox labeled “New Todo Input” with placeholder “What needs to be done?” accepts a task; pressing Enter adds it to the list.
- Submitting an empty input did not add a task or change the list.
- Each task has a completion checkbox. Completing the only active task changed the remaining count from “1 item left!” to “0 items left!” and removed it from the Active view.
- The All, Active, and Completed filters show the corresponding task states. The Completed view displayed a completed task; the Active view omitted it.
- Double-clicking a task label opens an “Edit todo” textbox. Replacing the text and pressing Enter saved the new label.
- A “❯ Toggle All Input” checkbox is present. Toggling it changed the task between completed and active.
- A “Delete todo” control and a “Clear completed” button appeared in the relevant list states. Neither was activated during exploration because both remove data.
- The footer contains the instruction “Double-click to edit a todo.”

## Roles, Risks, and Unclear Points

- No user roles, authentication, server-backed data, or other application pages were observed.
- Persistence across reloads, mobile/responsive behavior, and error handling beyond empty submission were not explored.
- The browser reported a failed/aborted Google Analytics collection request during the initial interaction. The TodoMVC UI remained usable; the request was not investigated further.
- Delete and Clear completed are destructive actions. They are included as candidate tests only for uniquely identified test data and require explicit approval before execution.
- Exploration left one active test todo, “Explore task edited,” in the current browser session.
