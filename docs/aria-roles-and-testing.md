# ARIA roles, HTML defaults, and Testing Library

A practical guide for this project: what roles are, where defaults come from, when to set `role` yourself, what to do when there is no default role, and how `getByRole` uses all of that.

---

## 1. What is a “role”?

A **role** tells assistive tech (and Testing Library) **what kind of UI control** a node is: button, heading, textbox, link, dialog, and so on.

Users who can’t see the screen hear things like “Star Wars Search, heading, level 1” or “Search, button.” The role is that “heading” / “button” part.

In HTML you usually get roles **for free** from the tag:

| Markup                    | Default role (simplified)         |
| ------------------------- | --------------------------------- |
| `<button>`                | `button`                          |
| `<a href="...">`          | `link`                            |
| `<h1>`…`<h6>`             | `heading` (with a level)          |
| `<input>` (text)          | `textbox`                         |
| `<input type="checkbox">` | `checkbox`                        |
| `<nav>`                   | `navigation`                      |
| `<header>` (page banner)  | often `banner`                    |
| `<main>`                  | `main`                            |
| `<ul>` / `<ol>`           | `list`                            |
| `<li>`                    | `listitem`                        |
| `<img alt="...">`         | `img`                             |
| `<div>`, `<span>`         | **no** meaningful role by default |

So: **role ≈ the accessible “type” of the element.**

---

## 2. How do I know the default role?

### Official source (canonical)

**[HTML Accessibility API Mappings (HTML-AAM)](https://www.w3.org/TR/html-aria/#docconformance)**  
and the related **[ARIA in HTML](https://www.w3.org/TR/html-aria/)** spec.

These tables say: for each HTML element (and important attributes), what the **implicit ARIA role** is, and whether you may override it.

Also useful:

- [WAI-ARIA roles list](https://www.w3.org/TR/wai-aria-1.2/#role_definitions) — what each role _means_
- [MDN: ARIA roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles)
- [MDN: ARIA in HTML](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Html)

### Quick check in the browser (practical)

1. Open the app → DevTools → **Accessibility** / **Accessibility Tree** (Chrome/Edge) or similar in Firefox.
2. Select a node → see its computed **role** and **name**.

### Quick check in tests (practical)

```ts
import { logRoles } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { Header } from './Header';

const { container } = render(<Header />);
logRoles(container);
```

That prints roles Testing Library can query — great when `getByRole` fails and you don’t know what’s exposed.

---

## 3. Role vs accessible name

`getByRole` usually needs both:

```ts
screen.getByRole('heading', { name: /star wars search/i });
//              ^^^^^^^^         ^^^^^^^^^^^^^^^^^^^^^^^^
//              role             accessible name
```

**Role** = what it is (`heading`, `button`, …).  
**Name** = how it’s labeled for AT (“Star Wars Search”, “Try again”, …).

Names often come from:

- Text content (`<button>Search</button>`, `<h1>…</h1>`)
- `<label>` associated with an input
- `aria-label` / `aria-labelledby`
- `alt` on images
- `placeholder` (weaker; prefer a real label)

No usable name → `getByRole('button', { name: /…/ })` won’t find it even if the role is correct.

---

## 4. Prefer semantic HTML over assigning roles

**Best practice:** use the right element so the **default** role is correct.

| Goal               | Prefer                   | Avoid                                         |
| ------------------ | ------------------------ | --------------------------------------------- |
| Clickable action   | `<button>`               | `<div role="button" onClick={…}>`             |
| Navigate somewhere | `<a href="…">`           | `<div role="link">`                           |
| Page title         | `<h1>`                   | `<div role="heading" aria-level="1">`         |
| Text field         | `<input>` / `<textarea>` | `<div role="textbox" contentEditable>`        |
| List               | `<ul>` / `<ol>` + `<li>` | `<div role="list">` + `<div role="listitem">` |

Why: real buttons get keyboard support, form participation, and expected AT behavior. Fake roles with `<div>` need extra work (`tabIndex`, `onKeyDown`, …) and are easy to get wrong.

**Rule of thumb:** if a native element exists for the job, use it. Don’t slap `role` on a `div` as the first choice.

---

## 5. When _should_ you assign a role?

Assign `role` (and usually name/state attributes) when:

1. **No HTML element matches** the pattern (e.g. custom combobox, tree, tabs built from divs).
2. **You compose a composite widget** that ARIA describes (`tablist` / `tab` / `tabpanel`, `dialog`, `menu`, …) and you’re following an [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/) pattern.
3. **Landmark clarification** when structure is ambiguous (rare if you use `<main>`, `<nav>`, `<header>` correctly).
4. **Fixing a known gap** (e.g. a clickable icon-only control) — still often better as `<button aria-label="Close">` than `<span role="button">`.

Examples that are legitimate:

```html
<div role="dialog" aria-labelledby="dialog-title" aria-modal="true">
  <h2 id="dialog-title">App needs an update</h2>
  …
</div>

<ul role="tablist">
  <li role="presentation">
    <button role="tab" aria-selected="true">Results</button>
  </li>
</ul>
```

(Even then, prefer a `<dialog>` element when you can.)

---

## 6. When should you _not_ assign a role?

- **Don’t** override a correct native role (`<button role="link">` — confusing).
- **Don’t** put `role="button"` on something that isn’t keyboard-operable.
- **Don’t** use roles to “help tests” while leaving the UI inaccessible for real users.
- **Don’t** add redundant roles (`<button role="button">` — useless noise).
- **Avoid** `role="text"` / presentational hacks to silence Testing Library — fix the markup instead.

Forbidden / constrained overrides are listed in [ARIA in HTML](https://www.w3.org/TR/html-aria/) (some elements must not change role).

---

## 7. What if an element has no default role?

Many nodes are **generic** / presentational in the accessibility tree: especially bare `<div>` and `<span>` used for layout.

Consequences:

- `getByRole('something')` **won’t** find them unless you give a role (or use a different query).
- For static copy inside a `<p>` or `<div>`, use **`getByText`** (or wrap in a heading/label if it _should_ be one).
- For layout wrappers, **don’t** invent roles. Query the interactive child (`button`, `textbox`) or the heading instead.

Example from a typical card:

```html
<div class="card">
  <!-- no useful role -->
  <h2>Failed to load data</h2>
  <!-- role: heading -->
  <button>Try again</button>
  <!-- role: button -->
</div>
```

Tests:

```ts
screen.getByRole('heading', { name: /failed to load data/i });
screen.getByRole('button', { name: /try again/i });
// not: getByRole('div') — divs aren’t queried that way
```

---

## 8. Common roles you’ll use with `getByRole`

| Role                 | Typical HTML                                  | Example query                                         |
| -------------------- | --------------------------------------------- | ----------------------------------------------------- |
| `button`             | `<button>`, sometimes `<input type="button">` | `getByRole('button', { name: /search/i })`            |
| `textbox`            | `<input>` (text), `<textarea>`                | `getByRole('textbox', { name: /…/i })`                |
| `heading`            | `<h1>`–`<h6>`                                 | `getByRole('heading', { name: /star wars search/i })` |
| `link`               | `<a href>`                                    | `getByRole('link', { name: /api/i })`                 |
| `img`                | `<img>` with alt                              | `getByRole('img', { name: /…/i })`                    |
| `list` / `listitem`  | `<ul>`/`<ol>`/`<li>`                          | `getByRole('list')`                                   |
| `checkbox` / `radio` | matching `<input>`                            | `getByRole('checkbox', { name: /…/i })`               |
| `banner`             | top-level `<header>`                          | `getByRole('banner')`                                 |
| `main`               | `<main>`                                      | `getByRole('main')`                                   |
| `navigation`         | `<nav>`                                       | `getByRole('navigation')`                             |
| `alert` / `status`   | live regions                                  | depends on markup                                     |
| `dialog`             | modal UI                                      | `getByRole('dialog', { name: /…/i })`                 |

Options you’ll use often:

```ts
getByRole('heading', { level: 1, name: /…/i });
getByRole('button', { name: /try again/i, hidden: true }); // include aria-hidden (rare)
getByRole('textbox', { name: /search/i });
```

Full query docs: [ByRole – Testing Library](https://testing-library.com/docs/queries/byrole).

---

## 9. How this maps to your Header

```tsx
<header>
  {' '}
  {/* often banner at page level */}
  <h1>Star Wars Search</h1> {/* heading, name from text */}
  <p>Search characters…</p> {/* no special role — use getByText if needed */}
</header>
```

Preferred test:

```ts
expect(
  screen.getByRole('heading', { level: 1, name: /star wars search/i })
).toBeInTheDocument();
```

Why not only `getByText`?  
`getByRole('heading', …)` also requires it to be a **heading**, which matches how screen-reader users discover the title.

The description `<p>` has no widget role → `getByText(/galaxy far, far/i)` is appropriate.

---

## 10. Decision flowchart

```text
What am I looking for?
│
├─ Interactive control (click/type)?
│  └─ Prefer getByRole('button' | 'textbox' | 'link' | …)
│     If not found → check accessible name (label/text/aria-label)
│     Still wrong → fix HTML (use <button>/<input>), don’t invent roles for tests
│
├─ Title / section title?
│  └─ getByRole('heading', { name, level? })
│
├─ Decorative / layout wrapper?
│  └─ Don’t query it; query what’s inside
│
└─ Plain paragraph / status copy with no role?
   └─ getByText / getByLabelText
```

---

## 11. Where to read “everything”

| Resource                                                                                            | What you’ll learn                                         |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| [ARIA in HTML](https://www.w3.org/TR/html-aria/)                                                    | Allowed roles per HTML element; defaults                  |
| [HTML-AAM](https://w3c.github.io/html-aam/)                                                         | How HTML maps to accessibility APIs                       |
| [WAI-ARIA 1.2 roles](https://www.w3.org/TR/wai-aria-1.2/#role_definitions)                          | Definitions of every role                                 |
| [ARIA Authoring Practices (APG)](https://www.w3.org/WAI/ARIA/apg/)                                  | Patterns for tabs, dialogs, comboboxes (keyboard + roles) |
| [Testing Library – ByRole](https://testing-library.com/docs/queries/byrole)                         | How queries use roles + names                             |
| [Testing Library – Query priority](https://testing-library.com/docs/queries/about/#priority)        | Why `*ByRole` comes first                                 |
| [MDN ARIA roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles)   | Friendlier explanations + examples                        |
| [ClarityDev: RTL best practices](https://claritydev.net/blog/improving-react-testing-library-tests) | Prefer `*ByRole` in tests                                 |

You will **not** memorize every role. Workflow: semantic HTML → check a11y tree / `logRoles` → query by role + name → only then consider `aria-*` or custom roles for complex widgets.

---

## 12. Short glossary

| Term                        | Meaning                                                                   |
| --------------------------- | ------------------------------------------------------------------------- |
| **Implicit / default role** | Role the browser assigns from the HTML tag                                |
| **Explicit role**           | `role="…"` you set in markup                                              |
| **Accessible name**         | The string AT uses as the control’s label                                 |
| **Accessibility tree**      | Parallel tree of roles/names/states (not the full DOM)                    |
| **Landmark**                | Roles like `main`, `navigation`, `banner` for page regions                |
| **Presentational / none**   | Hide semantics from the a11y tree (`role="presentation"`) — use carefully |

---

## 13. Practice exercises (this app)

1. Run `logRoles` on `<Header />`, `<SearchSection />`, `<FailedLoadVisual />`.
2. Rewrite Header test with `getByRole('heading', { level: 1, name: … })`.
3. For Search: query the textbox and the submit button by role + name (add a proper `<label>` if the name is missing).
4. For Failed load: heading + `getByRole('button', { name: /try again/i })`.
5. Find one `<div>` in the app that has **no** role — confirm `getByRole` can’t target it; use a child query or `getByText` instead.

---

_Roles are an accessibility contract. Tests that use `getByRole` lock in that contract. Prefer good HTML defaults; assign roles only when building real widgets—and then follow APG._
