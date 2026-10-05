# AGENTS.md

## Project context

This repository is a Vite + React + TypeScript application with Supabase-backed data access and Tailwind-based styling. The codebase expects small, focused changes, separated services, reusable components, and typed hook logic.

## Source of truth

Use the following files as the authoritative implementation guidance:

- .github/instructions/general.instructions.md
- .github/instructions/typescript-react.instructions.md
- .github/instructions/design.instructions.md
- .github/instructions/css-tailwind.instructions.md
- .github/copilot-instruction.md

This file defines workflow and coordination expectations only. It does not replace the instruction files.

## Rule priority

When conflicts or ambiguities arise, apply rules in this order:

1. Security and product safety requirements
2. Repository instruction files
3. Existing project patterns in the codebase
4. This AGENTS.md file
5. General best practices

If a proposed change would weaken strict TypeScript, bypass authentication, expose secrets, or break the established architecture, do not proceed.

## Workflow expectations

- Keep changes small, targeted, and reviewable.
- Follow existing patterns before introducing new ones.
- Avoid broad refactors or large rewrites unless explicitly required.
- Prefer focused components, services, and hooks over speculative abstractions.
- Keep business logic separate from presentation logic.
- Validate the affected behavior with the smallest relevant check before considering work complete.

## Security boundaries

- Never commit, expose, or log secrets, tokens, API keys, connection strings, or passwords.
- Do not weaken TypeScript strictness or suppress compiler errors without a documented reason.
- Do not bypass authentication, authorization, or data access boundaries.
- Treat user and API input as untrusted; validate and narrow at the boundary.
- Never expose internal implementation details or sensitive runtime data to end users.

## Protected files and outputs

Agents must not modify or regenerate the following without explicit instruction:

- dist and build output directories
- lockfiles
- generated code artifacts
- coverage reports
- local environment files containing secrets
- dependency manifests unless the task explicitly requires a dependency change

When generated artifacts are required, keep output minimal and scoped to the task.

## Common commands

Use the repository’s package manager and existing scripts. Typical commands include:

- npm install
- npm run dev
- npm run build
- npm run lint
- npm run format
- npm run typecheck
- npm run test

If the project uses a different package manager, prefer the equivalent commands for that setup.

## Reporting changes

When reporting work, keep updates short and concrete:

- summarize what changed
- note the files or areas touched
- mention validation performed
- call out any risk, open decision, or follow-up needed

Do not claim completion without checking the relevant command output or validation evidence.

## Final expectation

Agents working in this project should be conservative, production-minded, and consistent with the repository standards. Favor correctness, safety, accessibility, and maintainability over novelty or scope expansion.
