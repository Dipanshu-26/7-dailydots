# GitHub Copilot Instructions

## Project Overview

This repository contains a **Daily Journal with Mood Tracker** web application built with:

* Vite
* React
* TypeScript
* Supabase
* React Router
* Plain CSS
* Lucide React
* Vitest
* React Testing Library

The application allows authenticated users to create, view, edit, and delete personal journal entries and record their moods.

The application should be modern, clean, responsive, accessible, maintainable, and easy to extend.

---

# 1. General Development Principles

When generating or modifying code:

* Follow existing project patterns before introducing new patterns.
* Prefer simple, readable, maintainable solutions.
* Make focused changes and avoid unrelated modifications.
* Do not rewrite working code unnecessarily.
* Preserve existing functionality unless the requested change requires otherwise.
* Avoid unnecessary dependencies.
* Prefer reusable components and utilities over duplicated code.
* Keep components focused on a single responsibility.
* Avoid premature abstraction.
* Do not introduce complex architecture for simple requirements.
* Keep business logic separate from presentation logic where practical.
* Use TypeScript's type system instead of relying on `any`.
* Do not suppress TypeScript errors unless there is a documented reason.
* Do not leave unused imports, variables, functions, or components.
* Do not add commented-out dead code.
* Prefer explicit and descriptive code over clever implementations.

Before creating a new utility, hook, component, or service:

1. Check whether an existing implementation can be reused.
2. Follow the existing naming and folder conventions.
3. Avoid creating duplicate functionality.

---

# 2. Technology Requirements

Use the following technologies unless explicitly requested otherwise:

* **Frontend:** React + TypeScript
* **Build tool:** Vite
* **Backend/database:** Supabase
* **Routing:** React Router
* **Styling:** Plain CSS
* **Icons:** Lucide React
* **Testing:** Vitest + React Testing Library

Do not introduce alternative frameworks or libraries without a clear requirement.

Avoid adding libraries for functionality that can reasonably be implemented using existing project dependencies or native browser/React APIs.

---

# 3. Project Architecture

Use a **feature-based folder structure**.

Prefer a structure similar to:

```text
src/
├── app/
│   ├── App.tsx
│   ├── routes.tsx
│   └── App.css
│
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Button.css
│   │   ├── Modal.tsx
│   │   ├── Modal.css
│   │   ├── LoadingSpinner.tsx
│   │   ├── LoadingSpinner.css
│   │   └── EmptyState.tsx
│   │
│   └── layout/
│       ├── Header.tsx
│       ├── Header.css
│       ├── Sidebar.tsx
│       └── Sidebar.css
│
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types.ts
│   │   └── validation.ts
│   │
│   ├── journal/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types.ts
│   │   └── validation.ts
│   │
│   └── mood/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── types.ts
│       └── validation.ts
│
├── pages/
│   ├── Home/
│   ├── Login/
│   ├── Register/
│   ├── Journal/
│   └── NotFound/
│
├── lib/
│   ├── supabase.ts
│   └── errors.ts
│
├── hooks/
│   └── shared/
│
├── utils/
│
├── types/
│
├── styles/
│   ├── variables.css
│   ├── reset.css
│   └── globals.css
│
├── main.tsx
└── index.css
```

The exact structure may evolve with the application, but maintain the feature-based approach.

---

# 4. React Components

Create small, reusable components.

Each meaningful component should normally have its own file.

Example:

```text
JournalCard.tsx
JournalCard.css
```

Prefer:

```tsx
<JournalCard
  journal={journal}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

instead of putting all journal-card logic directly into a large page component.

Components should:

* Have a single clear responsibility.
* Receive data through props where appropriate.
* Avoid directly accessing Supabase.
* Avoid containing unrelated business logic.
* Avoid excessive prop drilling where a simpler approach exists.
* Be easy to test independently.

Avoid unnecessarily large components.

If a component becomes difficult to understand or test, consider extracting a focused child component or custom hook.

---

# 5. React State Management

Use React's built-in state management:

* `useState`
* `useReducer`
* `useContext`
* Custom hooks

Keep state as close as possible to where it is needed.

Do not introduce Redux, Zustand, or another global state library unless explicitly requested.

Prefer local state for:

* Form inputs
* Modal visibility
* Loading states
* Temporary UI state
* Selected journal entries

Use Context only when state genuinely needs to be shared across a significant part of the application, such as authentication state.

Avoid putting every piece of state into Context.

---

# 6. TypeScript

Use TypeScript throughout the React application.

Prefer explicit interfaces/types for:

* Journal entries
* Mood records
* User information
* Component props
* API/service responses
* Form data

Example:

```ts
export interface JournalEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood: MoodType;
  createdAt: string;
  updatedAt: string;
}
```

Avoid:

```ts
const data: any = ...
```

Prefer precise types.

Use `unknown` when the type is genuinely unknown and narrow it safely.

Avoid unnecessary type assertions such as:

```ts
const value = data as SomeType;
```

unless the assertion is justified.

---

# 7. Naming Conventions

Follow these conventions consistently.

### Components

Use `PascalCase`:

```text
JournalCard.tsx
MoodSelector.tsx
LoginForm.tsx
```

### Variables and functions

Use `camelCase`:

```ts
const journalEntry = ...
const selectedMood = ...

function handleSubmit() {}
function fetchJournals() {}
```

### Constants

Use `UPPER_SNAKE_CASE` for true application constants:

```ts
const MAX_JOURNAL_LENGTH = 5000;
const DEFAULT_PAGE_SIZE = 20;
```

Do not use uppercase naming for ordinary variables.

### Hooks

Prefix custom hooks with `use`:

```text
useAuth.ts
useJournals.ts
useMoodTracker.ts
```

### Types

Use descriptive PascalCase names:

```ts
type MoodType = ...
interface JournalEntry = ...
```

Avoid meaningless names such as:

```text
Data
Info
Stuff
Thing
```

---

# 8. CSS Strategy

Use **plain CSS**.

Do not use Tailwind CSS, CSS-in-JS, styled-components, or another styling framework unless explicitly requested.

Use one CSS file for each component/page where appropriate:

```text
JournalCard.tsx
JournalCard.css
```

Keep global styles separate.

Global styles should contain:

* CSS reset
* CSS custom properties
* Base typography
* Global layout rules
* Common utility styles when genuinely needed

Avoid putting component-specific styles into global CSS.

---

# 9. CSS Custom Properties

Use CSS custom properties for the design system.

Define reusable values in `:root`.

Example:

```css
:root {
  --color-primary: #6366f1;
  --color-background: #f8fafc;
  --color-surface: #ffffff;
  --color-text: #1e293b;
  --color-text-muted: #64748b;
  --color-border: #e2e8f0;

  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;

  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 12px rgb(0 0 0 / 0.08);
}
```

Do not repeatedly hardcode the same design values throughout CSS.

When a design value is reused, consider making it a CSS variable.

---

# 10. Responsive Design

Use a **mobile-first** responsive approach.

Write the base CSS for smaller screens first and progressively enhance the layout for larger screens.

Example:

```css
.journal-grid {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .journal-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .journal-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

Use:

* CSS Grid
* Flexbox
* Relative units
* `clamp()`
* Responsive spacing

Avoid fixed widths that can cause horizontal scrolling.

The application must work properly on:

* Mobile phones
* Tablets
* Laptops
* Desktop screens

---

# 11. UI Design

The Daily Journal application should have a modern, calm, clean visual style inspired by modern productivity and journaling applications.

Prioritize:

* Clear visual hierarchy
* Generous whitespace
* Readable typography
* Consistent spacing
* Comfortable journal reading/writing experience
* Subtle borders and shadows
* Consistent border radius
* Clear interactive states

Avoid excessive visual complexity.

Do not use gradients, animations, shadows, or decorative elements excessively.

Animations should be subtle and purposeful.

Respect reduced-motion preferences where appropriate.

---

# 12. Icons

Use **Lucide React** for interface icons.

Example:

```tsx
import { Plus, Trash2, Edit } from "lucide-react";
```

Prefer icons over manually drawn SVGs or Unicode symbols.

Do not use emojis as replacements for functional UI icons unless the emoji is intentionally part of the product experience, such as a mood representation.

Always provide accessible labels for icon-only buttons.

Example:

```tsx
<button
  type="button"
  aria-label="Delete journal entry"
>
  <Trash2 size={18} />
</button>
```

---

# 13. Typography

Use a modern system font stack.

Example:

```css
body {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}
```

Keep typography consistent throughout the application.

Define clear styles for:

* Page headings
* Section headings
* Body text
* Labels
* Helper text
* Error messages
* Buttons

Avoid using too many font sizes or weights.

---

# 14. Routing

Use React Router.

Keep routing configuration centralized.

Example routes may include:

```text
/
 /login
 /register
 /journal
 /journal/new
 /journal/:id
 /settings
```

Protect authenticated routes.

Unauthenticated users should not be able to access private journal data.

Handle unknown routes with a dedicated Not Found page.

Avoid putting complex routing logic inside individual components.

---

# 15. Authentication

Use **Supabase Auth** with email/password authentication.

Authentication logic should not be duplicated across components.

Create reusable authentication functionality through services/hooks/context where appropriate.

Authentication should support:

* Sign up
* Sign in
* Sign out
* Session restoration
* Authenticated route protection
* Handling expired/invalid sessions

Never store passwords manually in the database.

Never implement custom password hashing in frontend code.

Never expose authentication secrets in client-side source code.

---

# 16. Supabase Architecture

Keep Supabase/database operations outside UI components.

Prefer:

```text
Component
    ↓
Custom Hook
    ↓
Service
    ↓
Supabase
```

Example:

```text
JournalPage
    ↓
useJournals()
    ↓
journalService.ts
    ↓
Supabase
```

Do not write large Supabase queries directly inside JSX components.

A service should contain database-related operations such as:

```ts
getJournals()
getJournalById()
createJournal()
updateJournal()
deleteJournal()
```

Keep service functions focused and reusable.

---

# 17. Supabase Security

Supabase Row Level Security (**RLS**) must be enabled for user-owned tables.

Users must only be able to access their own journal and mood records.

Policies should validate ownership using the authenticated Supabase user ID.

Do not rely solely on frontend checks for authorization.

Frontend checks improve UX but are not a security boundary.

Never use the Supabase service-role key in frontend code.

Never commit private keys or secrets to Git.

---

# 18. Environment Variables

Use Vite environment variables for client configuration.

Example:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Access them through:

```ts
import.meta.env.VITE_SUPABASE_URL
```

Never hardcode secrets.

Never expose:

* Supabase service-role keys
* Private API keys
* Server-only credentials
* Database passwords

in frontend source code.

The `.env` file containing local secrets should not be committed if it contains sensitive values.

Provide an `.env.example` containing placeholders where appropriate.

---

# 19. Forms

Use controlled React forms.

Form state should be explicit and typed.

Example:

```tsx
const [title, setTitle] = useState("");
const [content, setContent] = useState("");
```

Create reusable validation utilities where validation logic is shared.

Forms should provide:

* Clear labels
* Validation feedback
* Loading state
* Disabled submit state during submission
* Accessible error messages
* Successful submission feedback

Do not allow users to accidentally submit the same operation multiple times while a request is in progress.

---

# 20. Journal Validation

Validate journal input before sending data to Supabase.

Consider requirements such as:

* Required title/content where applicable
* Reasonable title length
* Reasonable content length
* Valid mood selection
* Sanitization/escaping where necessary

Validation should exist for user experience, while database constraints and RLS should provide appropriate backend protection.

Do not trust client-side validation as a security mechanism.

---

# 21. Mood Tracking

Mood values should use a controlled and typed representation.

Prefer a defined type or constant collection instead of arbitrary strings.

Example:

```ts
export type MoodType =
  | "happy"
  | "calm"
  | "neutral"
  | "sad"
  | "angry";
```

Mood-related UI should be:

* Easy to understand
* Keyboard accessible
* Visually distinguishable
* Consistent throughout the application

If emojis are used as mood representations, they should complement accessible text rather than replace it.

---

# 22. Date & Time

Store timestamps in UTC when appropriate.

Supabase/database timestamps should not depend on a user's local browser timezone.

Convert timestamps to the user's local timezone when displaying them in the UI.

Use consistent formatting throughout the application.

Avoid manually performing timezone calculations when the JavaScript `Intl.DateTimeFormat` API can handle the requirement.

Example:

```ts
const formattedDate = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
}).format(new Date(createdAt));
```

---

# 23. Loading States

Every asynchronous operation that may take noticeable time should have an appropriate loading state.

Use reusable components such as:

```text
LoadingSpinner
Skeleton
LoadingState
```

For example:

```tsx
if (isLoading) {
  return <LoadingState />;
}
```

During form submission:

* Disable the submit button.
* Prevent duplicate submissions.
* Provide appropriate visual feedback.

Avoid leaving users uncertain whether an action is being processed.

---

# 24. Error Handling

Use centralized error-handling utilities where practical.

Users should receive understandable messages.

Do not expose raw database errors or internal implementation details unnecessarily.

Bad:

```text
PostgrestError: 23505 duplicate key value violates unique constraint...
```

Prefer:

```text
We couldn't save your journal entry. Please try again.
```

Development logging may include technical details when appropriate.

Do not log:

* Passwords
* Authentication tokens
* Private keys
* Sensitive personal information

Handle expected errors gracefully.

---

# 25. Toast Notifications

Use a reusable toast/notification system for user feedback.

Use toasts for events such as:

* Journal saved successfully
* Journal updated successfully
* Journal deleted successfully
* Sign-in successful
* Sign-out successful
* Recoverable operation failures

Keep messages short and actionable.

Avoid showing excessive notifications for trivial UI events.

---

# 26. Accessibility

Follow WCAG-friendly accessibility practices.

Use semantic HTML:

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

Interactive controls should use appropriate HTML elements.

Prefer:

```html
<button>
```

over clickable `<div>` elements.

Every form control should have an accessible label.

Ensure:

* Keyboard navigation
* Visible focus states
* Sufficient contrast
* Meaningful button labels
* Accessible error messages
* Accessible modal behavior
* Appropriate ARIA attributes when necessary

Do not add ARIA attributes when native HTML semantics already provide the required accessibility.

Do not use color as the only method of communicating information.

---

# 27. Testing

Use:

* Vitest
* React Testing Library

Prioritize tests for important user-facing behavior.

Test:

* Authentication flows
* Journal creation
* Journal editing
* Journal deletion
* Mood selection
* Form validation
* Loading states
* Error states
* Protected routes
* Important reusable components

Prefer behavior-oriented tests.

Example:

```tsx
expect(
  screen.getByRole("button", { name: /save journal/i })
).toBeInTheDocument();
```

Avoid testing implementation details unnecessarily.

Do not write tests that depend heavily on component internals when user behavior can be tested instead.

---

# 28. Component CSS

Component styles should remain close to the component.

Example:

```text
JournalCard/
├── JournalCard.tsx
└── JournalCard.css
```

Use descriptive class names.

Prefer:

```css
.journal-card {}
.journal-card__title {}
.journal-card__content {}
```

Avoid generic names such as:

```css
.box {}
.container {}
.item {}
```

unless the class is intentionally global.

Avoid excessive CSS nesting.

Avoid `!important` unless there is a documented reason.

---

# 29. CSS Best Practices

Prefer:

* Flexbox
* CSS Grid
* `gap`
* CSS custom properties
* Relative units
* Responsive layouts

Avoid:

* Excessive absolute positioning
* Fixed pixel dimensions for major layouts
* Deeply nested selectors
* Duplicate styles
* Inline styles for normal component styling
* `!important` as a workaround

Keep styles predictable and easy to maintain.

---

# 30. Data Fetching

When fetching data:

1. Set loading state.
2. Execute the service operation.
3. Handle successful data.
4. Handle errors.
5. Clear loading state.
6. Provide user feedback where appropriate.

Avoid unnecessary duplicate requests.

Clean up subscriptions/listeners when required.

Do not fetch data directly inside render logic.

Use `useEffect` only when appropriate and avoid unnecessary effects.

---

# 31. CRUD Operations

Journal CRUD operations should follow a consistent pattern.

### Create

```text
Validate
→ Show loading state
→ Call service
→ Update UI
→ Show success feedback
```

### Read

```text
Show loading state
→ Fetch data
→ Display data
→ Handle empty state
→ Handle error
```

### Update

```text
Load existing data
→ Edit
→ Validate
→ Save
→ Update UI
→ Show success feedback
```

### Delete

```text
Request confirmation when appropriate
→ Show loading state
→ Delete through service
→ Update UI
→ Show success feedback
```

Do not duplicate CRUD logic across multiple pages.

---

# 32. Empty States

Provide meaningful empty states.

Examples:

```text
No journal entries yet.

Start writing your first journal entry today.
```

Empty states should guide the user toward the next useful action.

Do not simply render a blank screen.

---

# 33. Confirmation for Destructive Actions

Destructive operations such as deleting journal entries should require an appropriate confirmation mechanism when accidental deletion would cause data loss.

Avoid using browser `alert()` or `confirm()` as the primary UI pattern if the application has a reusable modal system.

Confirmation messages should clearly identify the action.

---

# 34. Performance

Avoid premature optimization.

Prioritize:

* Simple component structures
* Efficient rendering
* Avoiding unnecessary network requests
* Appropriate image optimization
* Lazy loading for genuinely large/rarely used features

Use React optimization techniques such as `memo`, `useMemo`, and `useCallback` only when there is a clear performance or referential-stability reason.

Do not use them everywhere by default.

---

# 35. Security

Always treat user input as untrusted.

Do not:

* Trust frontend authorization checks
* Expose private keys
* Store passwords manually
* Disable Supabase RLS
* Construct unsafe database queries
* Render untrusted HTML without proper sanitization

Keep authentication and authorization responsibilities clearly separated.

---

# 36. Git & Change Discipline

When modifying the project:

* Make the smallest reasonable change.
* Do not modify unrelated files.
* Do not reformat the entire project unnecessarily.
* Do not rename files without a reason.
* Do not change dependencies unless necessary.
* Preserve existing APIs when possible.
* Keep changes logically grouped.

Before considering a task complete, verify:

* TypeScript compiles.
* Tests pass where applicable.
* No obvious lint/type errors remain.
* The affected UI still works.
* Responsive behavior has not been broken.

---

# 37. GitHub Copilot Specific Behavior

When generating code, Copilot should:

1. Inspect existing code before creating new code.
2. Reuse existing components, hooks, services, utilities, and CSS variables.
3. Follow the project's established naming conventions.
4. Follow the feature-based folder structure.
5. Prefer TypeScript.
6. Keep database logic in services.
7. Keep UI components focused.
8. Use plain CSS.
9. Use CSS custom properties for shared design values.
10. Follow mobile-first responsive design.
11. Use Lucide React for icons.
12. Follow accessibility practices.
13. Add tests for important new behavior.
14. Handle loading and error states.
15. Avoid unnecessary dependencies.
16. Avoid breaking existing behavior.
17. Avoid speculative features.
18. Avoid over-engineering.
19. Keep code readable for developers who did not write it.
20. Explain non-obvious implementation decisions with concise comments when necessary.

---

# 38. When Adding a New Feature

Before implementing a new feature:

### Step 1 — Understand

Inspect:

* Existing pages
* Existing components
* Existing hooks
* Existing services
* Existing types
* Existing CSS variables
* Existing routing
* Existing Supabase patterns

### Step 2 — Plan

Determine:

* Which feature owns the functionality
* Which components are needed
* Which service methods are needed
* Which types are needed
* Which routes are needed
* Which database tables/queries are required
* Which tests should be added

### Step 3 — Implement

Keep responsibilities separated:

```text
UI
↓
Component
↓
Hook
↓
Service
↓
Supabase
```

### Step 4 — Validate

Check:

* Type safety
* Loading states
* Error states
* Empty states
* Accessibility
* Responsive behavior
* Security
* Tests

---

# 39. Comments

Write comments only when they add meaningful context.

Good:

```ts
// Supabase timestamps are stored in UTC and formatted locally for display.
```

Avoid:

```ts
// Set loading to true
setIsLoading(true);
```

Do not use comments to explain obvious code.

Prefer readable code over excessive comments.

---

# 40. Do Not

Copilot should not:

* Introduce Redux/Zustand without explicit approval.
* Introduce Tailwind without explicit approval.
* Introduce CSS Modules without explicit approval.
* Introduce another UI library without explicit approval.
* Put Supabase queries directly inside presentation components.
* Use `any` unnecessarily.
* Hardcode secrets.
* Expose service-role keys.
* Disable RLS for convenience.
* Use browser `alert()` for normal application notifications.
* Use emoji as the only label for important actions.
* Create unnecessarily large components.
* Create duplicate utilities.
* Over-engineer simple features.
* Modify unrelated code.
* Remove existing functionality without explicit instruction.
* Ignore loading/error states.
* Ignore mobile layouts.
* Ignore accessibility.
* Store user passwords manually.

---

# 41. Definition of Done

A feature should generally be considered complete only when:

* The implementation follows the existing architecture.
* TypeScript types are appropriate.
* Components are reusable where appropriate.
* Supabase access is handled through services.
* Authentication/authorization is respected.
* RLS requirements are preserved.
* Loading states are handled.
* Error states are handled.
* Success feedback is provided where appropriate.
* Forms are validated.
* The UI is responsive.
* Accessibility has been considered.
* CSS follows the project's design system.
* Important behavior has appropriate tests.
* No unnecessary dependencies were introduced.
* No unrelated files were changed.

---

# 42. Priority Order

When requirements conflict, prioritize decisions in this order:

1. Security
2. Correctness
3. User data integrity
4. Accessibility
5. Maintainability
6. Existing project conventions
7. Performance
8. Visual consistency
9. Developer convenience

Do not sacrifice security or correctness for implementation speed.

---

# Final Instruction to GitHub Copilot

Act as a careful senior React/TypeScript engineer working within an existing production-style codebase.

Before writing code, understand the surrounding implementation and reuse what already exists.

Prefer simple, typed, maintainable solutions.

Keep presentation, business logic, and Supabase data access appropriately separated.

Follow the project's feature-based architecture, plain CSS styling system, mobile-first responsive approach, accessibility requirements, Supabase security model, and testing strategy.

When uncertain, choose the option that introduces the least unnecessary complexity while remaining secure, maintainable, accessible, and consistent with the existing codebase.
