# Star Wars Search

A catalog search for [SWAPI](https://swapi.info) — characters, species, planets, starships, vehicles, and films — built as a **React 19 class-component** app (Vite, TypeScript, SCSS modules).

Search feels instant because it is. The app does not hit the API on every query. It loads the catalog once, caches it, and filters in memory.

---

## Run it

```bash
npm install
npm run dev
```

| Script          | What it does              |
| --------------- | ------------------------- |
| `npm run dev`   | Vite dev server           |
| `npm run build` | Typecheck + production build |
| `npm run lint`  | ESLint                    |

---

## How it works (90 seconds)

```
SWAPI (6 categories in parallel)
        │
        ▼
   AJV validation
        │
        ├── fetch failed  → Failed-to-load screen (retry)
        └── schema failed → Outdated-app screen (no retry)
        │
        ▼
   Normalize films: title → name
   Attach hand-written descriptions
   Flatten into one list
        │
        ▼
   localStorage (allDataCached)
        │
        ▼
   Search = name.toLowerCase().includes(term)
   Persist last query + last results
```

`App` owns data, search, cache, and load errors. `ResultsSection` does not fetch — it picks a **view** from props and renders that view.

---

## Architecture

| Layer | Role |
| ----- | ---- |
| `src/App.tsx` | Class component: bootstrap, cache, search, retry |
| `src/services/api.ts` | Parallel fetch, HTTP handling, refine pipeline |
| `src/services/validation.ts` | AJV singleton, one compiled validator per category |
| `src/types/*` | TypeScript types **and** JSON Schemas, side by side |
| `src/components/ResultsSection` | Discriminated-union view switch |
| `src/components/*Visual` | Empty / failed / outdated illustrations |
| `src/components/ErrorBoundary` | Class boundary around the tree (`main.tsx`) |
| `src/data/itemDescriptions.ts` | Copy for every catalog row |
| `public/images/searchItems/` | Portraits keyed by item `name` |

Styling is SCSS modules plus a small 7-1-ish layer (`styles/abstracts`, `base`, `shared`). Buttons share a `%CTA-button` placeholder. Layout cards share `%section-base`.

---

## Decisions that are not the default tutorial

These are the bits worth reading before you change the code.

### 1. Fetch once, search locally

Typical search UIs call `/search?q=` on submit (or debounce). SWAPI.info already returns **full collections** per category. Hitting the network per keystroke would be slower, more fragile, and worse offline.

So `ApiService.getAllData()` fetches all six endpoints with `Promise.all`, then search is a local filter on `item.name`. Empty submit restores the full catalog.

Trade-off: first load is heavier; every later search is free. That is the right trade-off for a static galaxy.

### 2. Two failure modes, two screens

A network problem and a contract change are not the same bug.

| `loadError` | Meaning | UI | Recovery |
| ----------- | ------- | -- | -------- |
| `'fetch'` | A category request threw or returned null | `FailedLoadVisual` | **Try again** |
| `'schema'` | Payload no longer matches AJV | `OutdatedAppVisual` | Contact the developer — retry cannot fix a new shape |

`GetAllDataResult` is a discriminated union (`ok: true` / `ok: false` + `reason`), not a thrown exception for these two cases. The UI can branch without `try/catch` in `render`.

### 3. `localStorage` vs `sessionStorage`

| Key | Store | Survives refresh | Survives new tab | Why |
| --- | ----- | ---------------- | ---------------- | --- |
| `allDataCached` | localStorage | yes | yes | Catalog should not be re-downloaded every visit |
| `searchTerm` / `lastResults` | localStorage | yes | yes | Last search should come back |
| `loadError` | **sessionStorage** | yes | **no** | A failed session should still show the fail screen on F5, but a fresh tab should try the network again |

If load error lived in localStorage, a one-off outage would permanently lock the UI on the fail screen until something cleared it. If it lived only in React state, refresh would flash the empty catalog and look like “nothing is wrong.”

Constructor logic: if cache exists, ignore a stored load error. If cache does not exist, restore `loadError` so the fail card is the first paint — no skeleton flash, no disabled-search flicker.

### 4. Views are a discriminated union, not a pile of booleans

`ResultsSection` does not do `if (loading && !error && results)`. It builds a `ViewData` object:

- `initial-loading` — first visit, nothing cached yet. Renders **nothing** in the results panel so the starfield stays the backdrop. A skeleton table with no data behind it looks like a broken layout.
- `loading` — retry / refresh while previous rows still exist. Skeleton rows keep the table shape.
- `has-results` / `no-results`
- `failed-load-data` / `outdated-app`

`pickView()` decides. `createViewContent()` renders. The `default` branch assigns `viewData` to `never` so TypeScript fails the build if a view is added and forgotten.

While `loadError === 'fetch'` and retry is in flight, the fail card **stays on screen** (icon spins). Switching to a skeleton would look like the error vanished.

### 5. Films speak a different dialect

SWAPI films use `title`. Everything else uses `name`. Search, images, and descriptions all key off `name`.

After validation, `changeTitleToNameProperty` rewrites films to `{ name, ... }`. One code path from there on. `FilmOriginal` vs `FilmRefined` keeps that transformation honest in the type system.

### 6. Images: Windows filenames, species without faces

Portraits live at `/images/searchItems/{name}.webp`.

- `/` is illegal in Windows filenames (`TIE/LN starfighter`, etc.) → replaced with `-` before lookup.
- Accented names (`Cordé`, `Dormé`) go through `encodeURIComponent`.
- Species are labels, not characters. There is no “Human.jpg” that feels right, so `speciesImageUrls` maps each species to a well-known member (Human → Han Solo, Wookie → Chewbacca, …).

Missing files fall through to `unknown.webp`.

Empty / fail / outdated illustrations use a **CSS mask** (two linear gradients, `mask-composite: intersect`) so hard image edges dissolve into the starfield. Softening in CSS is cheaper than exporting a new PNG every time the background changes.

### 7. Search input is uncontrolled on purpose

The field uses `defaultValue` from localStorage and reads `FormData` on submit. Typing does not re-render `App`. Duplicate submits of the same term are ignored. Empty submit clears the stored query and shows the full list.

### 8. Validation lives next to the types

JSON Schema objects sit in the same files as the TypeScript types (`CharacterSchema` beside `type Character`). AJV compiles them once on a **singleton** `ValidationService` — validators are not cheap to rebuild, and there is no reason to have two Ajv instances.

`additionalProperties: false` is intentional: extra fields from a future SWAPI bump fail validation and surface as “app needs an update,” not as silent junk in the table.

### 9. Retry toasts reuse one id

Repeated **Try again** failures call `toast.update` on a stable `toastId` instead of stacking identical toasts. First-load HTTP `!ok` still uses `react-toastify` with status copy; retry uses a shorter “Still couldn't load data.”

### 10. Error boundary has to be a class

React error boundaries are class-only (`getDerivedStateFromError`). Ours wraps `<App />` in `main.tsx`. **Simulate error** (top-left) throws on purpose. **Restore app** sets `hasError` back to `false`, which remounts a fresh `App` without a full page reload.

---

## Storage contract

```ts
LOCAL_STORAGE_KEYS = {
  searchTerm: 'searchTerm',
  lastResultsCached: 'lastResults',
  allDataCached: 'allDataCached',
}

SESSION_STORAGE_KEYS = {
  loadError: 'loadError', // 'fetch' | 'schema'
}
```

Clear `localStorage` in DevTools if you need a cold first-load again.

---

## Stack

React 19 class components · TypeScript · Vite 8 · SCSS modules · AJV · react-toastify · react-loading-skeleton · clsx · Husky + Prettier + ESLint.

The React Compiler Babel plugin is on in Vite. It mainly helps function components; the UI here is classes by assignment constraint.

---

## Known leftovers

Honest list so reviewers do not have to discover these the hard way:

- `src/data/initialResults.ts` is unused (early “show something before fetch” experiment; live data + cache replaced it).
- HTTP `!response.ok` on first load still fires a toast **and** the fail card.
- If a category payload is not an array, `validateAllCategories` **throws** instead of returning `{ ok: false, reason: 'schema' }` — that path hits the Error Boundary, not the outdated-app screen.
- `JSON.parse` in `getCachedData` is not wrapped; corrupt cache can throw.
- End-of-project TODOs in `App.tsx`: Tailwind migration, unused Rebel icon, consider `react-error-boundary`.
- Dev `StrictMode` double-mounts; you may see duplicate toasts once in development.

---

## License / data

Catalog data comes from [swapi.info](https://swapi.info). Item descriptions and illustrations are app-specific.
