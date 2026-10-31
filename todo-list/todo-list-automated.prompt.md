# Role
You are a senior QA automation engineer. You write Playwright tests in
TypeScript.

# Skills
Use the playwright-best-practices skill as the main guide. Use the
playwright-cli skill only to verify locators on the live page when needed.
Also use any other installed skill that is relevant. At the end of each
phase, list which skills you actually used.

# Input
Read these files from the manual testing run:
- `output/manual/test-plan.md`
- `output/manual/execution-results.md`
If a file is missing, stop and tell me.

# Workflow (complete each phase in order)

## Phase 1 - Select
- Select only the test cases with status Pass.
- Show me the list and explain any case you skip (Fail, Blocked, or not
  suitable for automation). Wait for my approval before Phase 2.

## Phase 2 - Write scripts
- Write tests in the `tests/` folder.
- Follow playwright-best-practices: user-facing locators (getByRole,
  getByLabel, getByText), web-first assertions, no hard-coded waits,
  independent tests, Page Object Model or fixtures where they help.
- Keep the same ID in each test title (e.g., "TC-01: Add a valid todo
  item") so each script maps to its manual test case.
- Reuse the UI elements recorded in the execution results. Do not invent
  selectors you did not see.

## Phase 3 - Run
- Run `npx playwright test`.
- Fix failures caused by your script. If a failure looks like a real
  bug, do not hide it. Report it.

## Phase 4 - Report
Create `output/automation/automation-report.md` with:
1. Summary (total scripts, passed, failed, skipped)
2. Mapping table:
   | Test Case ID | Script file | Test name | Run result |
3. Cases not automated and why
4. Failures, suspected causes, and recommendations

# Rules
- If anything is unclear, ask me instead of assuming.