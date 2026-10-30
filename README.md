# Manual UI Testing with an AI Agent

This repository contains agent skills and instructions for exploring a website
and performing manual UI tests with an AI agent. The agent interacts with the
site like a person; this workflow does not create or run automated test scripts.

## Included skills

- [playwright-cli](./.agents/skills/playwright-cli/SKILL.md) guides the agent
  through browser interaction, such as navigating, inspecting the page, using
  controls, and capturing screenshots.
- [playwright-best-practices](./.agents/skills/playwright-best-practices/SKILL.md)
  helps the agent choose test coverage, edge cases, and relevant quality checks.
  It is a planning guide; test cases remain manual.
- [prompt.txt](./prompt.txt) provides the repository's example role, target,
  safety rules, and four-phase workflow.

When this workspace is open in VS Code, ask the AI agent to perform a manual
website test. The agent should use the available skills and browser tools. No
Playwright test command is needed for this manual workflow.

## Run a manual test

1. Open this repository in VS Code and start a Copilot Chat agent session.
2. Provide the website URL, the features to test, environment or browser
   details if relevant, any test account information through an approved secure
   channel, and the desired output directory.
3. Ask the agent to follow `prompt.txt`. It should explore the UI, create a
   manual test plan, and stop for your approval before executing the plan.
4. Review the plan. Tell the agent to proceed when you approve it, or request
   changes first.
5. After execution, review the report and screenshots in the requested output
   directory.

### Example request

> Follow `prompt.txt` and use the available Playwright skills to manually test
> https://todomvc.com/examples/react/dist/. Test the core todo-list flows.
> Save all notes, the plan, report, and screenshots under
> `output/ai-output-next/`. Explore the site and show me the test plan first.
> Wait for my approval before executing any tests. Do not perform destructive
> actions unless I explicitly approve them.

Replace the URL and scope with your application. Do not include passwords or
other secrets in committed files; provide credentials only through a secure
method approved for your environment.

## Four-phase workflow

1. **Explore:** The agent visits the target and records observed pages,
   controls, workflows, risks, and open questions in `exploration.md`.
2. **Plan:** The agent uses the best-practices skill to choose useful coverage,
   but writes human-executable cases in `test-plan.md`, not code. It shows you
   the plan and waits for approval.
3. **Execute:** After approval, the agent performs every approved case through
   the browser UI, one at a time. It records actual results and evidence,
   marks cases Pass, Fail, Blocked, or Skipped, and retries a failed case once.
4. **Report:** The agent creates `test-report.md` with a summary, results,
   defects, observations, risks, and recommendations. Screenshots are saved
   alongside the report.

The agent must not claim a case passed unless it verified the expected result
on screen. It should report blockers and observed errors explicitly, ask about
unclear requirements, and avoid destructive or irreversible actions without
your permission.

## Existing example artifacts

- `output/ai-output-1/` contains an earlier TodoMVC exploration and test plan.
- `output/ai-output-2/` contains a later exploration, test plan, report, and
  screenshots. Its report records eight passing cases and one failed case for
  todo persistence after a page refresh.

These are previous run artifacts; review the target application yourself
before treating their observations as current.
