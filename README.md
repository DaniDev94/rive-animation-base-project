# Rive Animation Base Project

A multi-page interactive showcase demonstrating advanced [Rive](https://rive.app) animation capabilities including state machines, dynamic text rendering, custom font loading, and internationalization.

## Live Demo

Deployed on GitHub Pages via the `gh-pages` branch. Pushes to `master` trigger automatic deployment.

---

## Features

- **Basic Concepts** — Interactive bouncing ball animations demonstrating easing curves and animation principles
- **State Machines** — Emoji and ball animations driven by Rive state machine inputs
- **Animated Texts** — Three font loading strategies (embedded, hosted, referenced) with real-time i18n support
- Bilingual UI: English and Spanish with automatic browser language detection
- Custom font loading integrated into Rive animations at runtime
- Animated loading transitions between pages

---

## Tech Stack

| Layer | Technology |
|---|---|
| Build tool | [Vite](https://vitejs.dev) 4.x |
| Animation runtime | [@rive-app/canvas](https://www.npmjs.com/package/@rive-app/canvas) (CDN, v2.10.3) |
| Internationalization | [i18next](https://www.i18next.com) 23.x + browser language detector + HTTP backend |
| Styling | Vanilla CSS with custom properties |
| JavaScript | Vanilla ES Modules |
| Deployment | GitHub Actions → GitHub Pages |

---

## Project Structure

```
rive-animation-base-project/
├── public/
│   ├── animations/          # 17 .riv Rive animation files
│   ├── fonts/               # 8 custom font files (.ttf, .otf)
│   ├── icons/               # Page favicons
│   ├── images/              # Background images
│   └── locales/
│       ├── en/translation.json
│       └── es/translation.json
├── src/
│   ├── index.html           # Home / navigation menu
│   ├── index.js
│   ├── styles/
│   │   ├── main.css
│   │   ├── colors.css
│   │   ├── fonts.css
│   │   └── normalize.css
│   ├── scripts/
│   │   ├── i18n.js          # i18next setup
│   │   ├── states.constants.js  # Animation & state machine name constants
│   │   └── fonts.js         # Font loading + language change handler
│   └── pages/
│       ├── basic_concepts/  # Bouncing balls demo
│       ├── state_machines/  # State machine interactive lab
│       └── texts_animated/  # Animated text & font methods
├── vite.config.js
├── package.json
└── .github/workflows/deploy.yml
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install & Run

```bash
npm install
npm run dev
```

Dev server starts at **http://localhost:4000**.

### Build

```bash
npm run build
# Output: dist/
```

### Preview Production Build

```bash
npm run preview
```

---

## Pages

### Home (`/`)

Landing page with a night sky background animation and navigation to the three demo sections. A loading animation plays for ~1.8 s on entry.

### Basic Concepts (`/pages/basic_concepts/`)

Demonstrates core animation principles using three bouncing ball animations:

- **Squash-Stretch** — organic feel via shape deformation
- **Ease In / Ease Out** — acceleration curves
- **Linear** — constant speed
- **Final** — polished combined example

Also includes a 5-star achievement state machine and hover animations on navigation buttons.

**Rive files used:** `ball_0.riv`, `ball_1.riv`, `ball_2.riv`, `stars.riv`, `nut.riv`, `arrow-back.riv`, `loading.riv`

### State Machines (`/pages/state_machines/`)

Interactive lab for Rive state machine inputs:

- **Emoji** — color preference state machine driven by boolean/trigger inputs
- **Ball level** — numeric input (0–3) controlled by increment/decrement buttons
- Button states: Normal → Hover → Pressed → Disabled

**Rive files used:** `emoji.riv`, `ball-state-machine.riv`, `btn-ball.riv`, `arrow-back.riv`, `loading.riv`

### Animated Texts (`/pages/texts_animated/`)

Compares three Rive text/font loading strategies side by side:

| Method | Description |
|---|---|
| **Embedded** | Fonts are bundled inside the `.riv` file (heavier file, zero external deps) |
| **Hosted** | Fonts served from the Rive CDN (light file, requires network) |
| **Referenced** | Fonts loaded from local files at runtime via `loadFontAsset()` — supports live i18n swapping |

A language selector (EN / ES) updates the referenced animation text in real time using `setTextRunValue()`.

**Rive files used:** `text-animated-embedded.riv`, `text-animated-hosted.riv`, `text-animated-referenced.riv`, `face-0.riv`, `face-1.riv`, `face-2.riv`

---

## Rive Integration Patterns

### Initializing a Rive instance

```js
const riveObj = new rive.Rive({
    src: "path/to/file.riv",
    canvas: document.getElementById("canvas"),
    autoplay: true,
    layout: new rive.Layout({ fit: "cover" }),
    onLoad: () => { /* setup state machine inputs */ },
    onStateChange: (event) => { /* react to state changes */ }
});
```

### Reading & writing state machine inputs

```js
const inputs = riveObj.stateMachineInputs("StateMachineName");
const trigger = inputs.find(i => i.name === "TRIGGER_NAME");
const numericInput = inputs.find(i => i.name === "Level");
const boolInput = inputs.find(i => i.name === "IsActive");

trigger.fire();
numericInput.value = 2;
boolInput.value = true;
```

### Dynamic text (referenced fonts)

```js
// Read current text
const current = riveObj.getTextRunValue("textRunNamespace");

// Update text
riveObj.setTextRunValue("textRunNamespace", "New text");
```

### Loading a custom font at runtime

```js
import fontFile from "/fonts/Roboto-Bold.ttf";

async function loadFontAsset(asset) {
    const res = await fetch(fontFile);
    const bytes = await res.arrayBuffer();
    asset.setFont(await rive.decodeFont(new Uint8Array(bytes)));
}
```

---

## Internationalization

Translation files live under `public/locales/{lang}/translation.json`. The HTTP backend loads them at runtime — no bundling required.

```
public/locales/
├── en/translation.json
└── es/translation.json
```

Language is detected automatically from the browser. To add a new language:

1. Create `public/locales/{lang}/translation.json` with the same keys.
2. Add a `<option>` to the language selector in `texts_animated/index.html`.

### i18next setup (`src/scripts/i18n.js`)

```js
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18next
    .use(HttpBackend)
    .use(LanguageDetector)
    .init({ fallbackLng: "en", backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" } });
```

---

## State & Animation Name Constants

All Rive state machine names, input names, and animation names are centralized in `src/scripts/states.constants.js` to avoid scattered magic strings:

```js
// Example exports
export const BALL_ANIMATIONS = ["Squash-Stretch", "Final", "Ease In Ease Out", "Linear"];
export const STATE_MACHINE_BASIC = "BasicosStateMachine";
export const INPUT_LEVEL = "Nivel"; // or "Level" depending on the .riv file
```

---

## Custom Fonts

Eight custom fonts are available as static assets under `public/fonts/`:

| Font | File | Style |
|---|---|---|
| Roboto Bold | `Roboto-Bold.ttf` | Sans-serif, readable |
| Ancient Game | `ancient-game.ttf` | Retro / pixel game |
| Bromph Town | `bromph_town.otf` | Decorative |
| Old West | `old-west.otf` | Western |
| Wild West | `wild-west.otf` | Western variant |
| Star Jedi | `starjedi.ttf` | Sci-fi |
| Woodtrap | `woodtrap.ttf` | Wood / nature |
| Deadpack | `deadpack.ttf` | Bold decorative |

---

## Deployment

Deployment is automated via **GitHub Actions** (`.github/workflows/deploy.yml`):

1. Push to `master`
2. Workflow installs dependencies and runs `npm run build`
3. `dist/` is published to the `gh-pages` branch using `peaceiris/actions-gh-pages`

The Vite base path is set to `/rive-animation-base-project/` to match the GitHub Pages subdirectory URL.

---

## Scripts Reference

| Command | Description |
|---|---|
| `npm run dev` | Start dev server on port 4000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
