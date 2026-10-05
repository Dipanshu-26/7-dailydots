---
applyTo: "**/*.css,**/*.ts,**/*.tsx"
---

# Tailwind Styling Standards

- Use Tailwind utility classes as the default styling mechanism for layout, spacing, color, typography, interaction states, and responsive behavior.
- Prefer Tailwind over custom CSS whenever the same design can be expressed clearly and consistently with utility classes.
- Keep styling readable and maintainable by organizing classes by intent: layout, spacing, typography, visual treatment, interaction states, and responsive overrides.

## Class Organization Order

- Layout and positioning first: `relative`, `flex`, `grid`, `items-center`, `justify-between`, `gap-*`, `w-*`, `h-*`
- Spacing and sizing next: `p-*`, `m-*`, `px-*`, `py-*`, `rounded-*`, `border-*`
- Typography and content next: `text-*`, `font-*`, `leading-*`, `tracking-*`
- Visual treatment after that: `bg-*`, `text-*`, `border-*`, `shadow-*`, `ring-*`
- State and interaction last: `hover:*`, `focus:*`, `focus-visible:*`, `disabled:*`, `aria-*`, `data-*`
- Responsive modifiers should be applied in breakpoint order: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Prefer design-system tokens and reusable patterns over arbitrary values unless a custom value is clearly justified and reused.

## Responsive Design

- Build mobile-first: define base styles for the smallest supported screen and add larger breakpoints progressively.
- Prefer semantic breakpoints (`sm`, `md`, `lg`) over custom media queries when possible.
- Keep spacing, layout, and typography changes intentional and consistent across breakpoints.
- Avoid desktop-only assumptions or brittle custom breakpoint logic.

## Accessibility and Focus

- Use semantic HTML and native interactive elements before custom wrappers.
- Ensure visible focus states with `focus-visible:*`, `ring-*`, `outline-*`, and sufficient contrast.
- Preserve keyboard accessibility for buttons, links, inputs, and form controls.
- Do not remove focus outlines without a deliberate accessible replacement.
- Respect reduced-motion preferences with `motion-safe:*` and `motion-reduce:*` where transitions or animations are used.
- Maintain accessible names, labels, and contrast as part of the styling decision.

## When Custom CSS Is Allowed

- Use custom CSS only for complex pseudo-elements, generated backgrounds, animations, global resets, or one-off styling that Tailwind cannot express cleanly.
- Keep custom CSS scoped and minimal; prefer component-level or feature-level rules over broad overrides.
- Avoid writing custom CSS when the same design can be expressed with Tailwind utilities and existing tokens.
- If a rule duplicates a Tailwind utility or theme token, prefer the utility instead.

## Quality Expectations

- Follow the project’s design system and Tailwind theme tokens for spacing, color, and type scale.
- Remove unused classes and avoid duplicated styling patterns between components.
- Keep class strings readable, maintainable, and easy to review.
