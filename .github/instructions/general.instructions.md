---
applyTo: "**/*"
---

# General Engineering Standards

## 1. Code Quality

- Prefer simple, clear, maintainable solutions over clever or overly abstract ones.
- Keep code readable by default and optimize only when there is a demonstrated need.
- Follow the repository’s established patterns before introducing new ones.
- Keep changes focused and avoid unrelated refactors or formatting churn.

## 2. Naming Conventions

- Use descriptive, domain-relevant names that communicate intent.
- Prefer clear names over abbreviations unless the abbreviation is already standard in the project.
- Use consistent casing rules across the codebase:
  - PascalCase for types, classes, and components
  - camelCase for variables, methods, and functions
  - UPPER_SNAKE_CASE for true constants
- Name boolean values with intent-driven prefixes such as is, has, can, or should.

## 3. File and Module Structure

- Organize code by responsibility or feature, not by arbitrary grouping.
- Keep related files together and separate concerns cleanly.
- Prefer small, focused modules over large, multi-purpose files.
- One module should generally have one clear responsibility.
- Avoid unnecessary nesting and duplicate abstractions.

## 4. Readability and Maintainability

- Write code that is easy for another engineer to understand without deep context.
- Keep functions and methods concise and avoid deep nesting when it reduces clarity.
- Favor explicit logic over hidden behavior or implicit conventions.
- Reuse existing helpers and patterns before creating new ones.
- Avoid dead code, unused variables, and stale comments.

## 5. Comments and Documentation

- Add comments only when they explain intent, constraints, non-obvious trade-offs, or unusual decisions.
- Do not comment on obvious code or restate what the code already says.
- Prefer self-explanatory code and keep documentation close to the implementation when useful.
- Update comments and docs when behavior changes.

## 6. Refactoring Discipline

- Refactor only when the change improves clarity, reduces duplication, or stabilizes the design.
- Preserve behavior while simplifying or restructuring code.
- Do not mix refactoring with unrelated feature work.
- Extract repeated logic into a shared utility or helper only when it meaningfully improves maintainability.

## 7. Imports and Dependencies

- Remove unused imports and keep imports organized and intentional.
- Prefer existing dependencies and internal utilities before adding new ones.
- Avoid broad or wildcard imports.
- Do not introduce a dependency for a problem that can be solved with the existing toolchain or standard language features.
- Keep module boundaries clean and avoid circular dependencies.

## 8. Formatting and Style

- Follow the repository’s formatting conventions consistently.
- Keep code visually consistent: indentation, spacing, and grouping should be predictable.
- Keep lines readable and avoid excessive horizontal length when practical.
- Do not reformat unrelated files just to satisfy stylistic preferences.

## 9. Error Handling

- Validate inputs early and fail predictably.
- Handle empty, loading, and failure states explicitly.
- Do not silently swallow errors or hide failure conditions.
- Surface actionable, user-friendly error messages without exposing sensitive details.
- Protect secrets, credentials, and internal implementation details from end-user output and logs.

## 10. Testing and Validation

- Add or update tests for meaningful behavior changes.
- Prefer tests that validate the external behavior of a feature rather than internal implementation details.
- Keep tests focused, deterministic, and easy to understand.
- Validate the affected behavior before considering a change complete.

## 11. Collaboration and Review

- Keep pull requests and changes reviewable and narrowly scoped.
- Communicate intent clearly through thoughtful naming, structure, and commit scope.
- Respect existing repository conventions and interfaces.
- Avoid unrelated renames, broad rewrites, or speculative improvements.
- Prefer the least surprising, most maintainable solution when trade-offs exist.
