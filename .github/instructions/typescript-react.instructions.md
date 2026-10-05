---
applyTo: "**/*.ts,**/*.tsx"
---

# TypeScript Standards

- Assume `strict` TypeScript is enabled; do not weaken compiler settings to make code compile.
- Never use `any`, including implicit `any`. Use precise types, generics, or `unknown` with runtime narrowing.
- Prefer type inference for obvious local values, but explicitly type public APIs, component props, hook returns, service boundaries, and external data.
- Model immutable data with `readonly` properties, `ReadonlyArray`, and readonly tuples where mutation is not part of the contract.
- Treat inputs from APIs, storage, forms, and users as untrusted. Validate and narrow them at the boundary.
- Prefer discriminated unions for state machines, async states, results, and variants with different required fields.
- Avoid unnecessary type assertions and non-null assertions. When an assertion is unavoidable, keep it at the boundary and document the invariant through code structure.
- Use descriptive PascalCase names for types and interfaces. Prefer unions and type aliases for variants; use interfaces for extensible object contracts.
- Keep domain types separate from transport, persistence, and form types when their fields or invariants differ.
- Do not suppress compiler errors or leave unused imports, variables, or exports without a documented reason.

# React Standards

- Use functional components and typed props. Prefer `type` or `interface` definitions that make required and optional inputs explicit.
- Keep components small and focused on one responsibility. Move data access, validation, and reusable behavior into services, utilities, or custom hooks.
- Follow the Rules of Hooks: call hooks only at the top level of React functions or custom hooks, and keep hook dependencies accurate.
- Use `useEffect` only to synchronize with an external system. Do not use effects for derived values or event-driven logic.
- Keep state as local as practical. Use `useState` for simple state, `useReducer` for related transitions, and Context only for genuinely shared state such as authentication.
- Represent meaningful state transitions with discriminated unions rather than several loosely related booleans.
- Keep state immutable. Derive values during render and update arrays and objects with non-mutating operations.
- Keep Supabase and other service calls outside components. Expose them through focused services and hooks with typed success and failure results.
- Use stable keys from domain data for lists; never use array indexes when item identity can change.
- Use semantic HTML and accessible labels, focus states, keyboard behavior, and error associations. Prefer native elements over unnecessary ARIA.
- Use React optimization APIs only when profiling or a clear referential-stability requirement justifies them.

# State And Error Handling

- Model asynchronous flows explicitly, for example `idle`, `loading`, `success`, and `error`, rather than inferring status from nullable values.
- Keep loading, empty, success, and failure states visible and actionable. Prevent duplicate submissions while an operation is pending.
- Handle expected failures at the closest layer that can recover or present useful feedback; let unexpected failures reach the application error boundary.
- Convert low-level service and database errors into typed, user-safe errors before they reach UI code. Do not expose raw queries, tokens, credentials, or sensitive personal data.
- Log technical details only in appropriate development or protected observability channels, and never log secrets or unnecessary user data.
- Validate form and API data at boundaries, preserve the original cause for diagnostics, and provide concise user-facing recovery guidance.
- Keep server state, URL state, and ephemeral UI state distinct. Avoid global state for values that belong to one component or feature.

# Production Practices

- Preserve the repository's feature-based structure and existing dependencies; do not introduce a state library or abstraction without a demonstrated need.
- Keep business logic separate from presentation logic and keep service contracts testable without rendering components.
- Add behavior-focused Vitest and React Testing Library coverage for important user flows, especially validation, loading, error, and protected states.
- Ensure async work is cleaned up when required, avoid stale updates, and do not fetch during render.
- Maintain responsive, accessible behavior and respect reduced-motion preferences for any UI transitions.