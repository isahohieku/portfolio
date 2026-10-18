# Design Spec: Hero Section Minimalist HUD & Generative Grid Animations

- **Date:** 2026-10-18
- **Author:** Isah Ohieku & Antigravity
- **Status:** Approved
- **Inspiration:** Awwwards Creative Technologist Portfolios (Basement Studio, Linear, Active Theory, Dennis Snellenberg)

---

## 1. Context & Motivation

The portfolio landing page currently introduces Isah Ohieku with a display headline, two quantified receipts (`120s → <100ms` and `5,479 npm downloads`), and a lazy-loaded WebGL particle globe with transatlantic arcs representing Talk360's connectivity.

To elevate this hero to an Awwwards-caliber experience without sacrificing the site's core engineering principles (fast load times, mobile-first performance, accessible text, and zero marketing fluff), this design introduces **Concept 3: Minimalist Engineering HUD & Generative Grid**.

The design combines:
1. **Interactive Monospace HUD Telemetry**: Precision aerospace/spacecraft status indicators (`[SYS: ONLINE]`, `[COORDS: 52.37° N, 4.90° E]`, `[AUDIO: MUTED / ACTIVE]`).
2. **Accessible Alphanumeric Scramble Typography (`[appScrambleReveal]`)**: Hardware telemetry-style character decryption on entry and interaction.
3. **Zero-Asset Web Audio Synthesizer (`AudioService`)**: Procedural micro-haptics (mechanical clicks, data scramble ticks, orbit hums) synthesized entirely in code with no audio files downloaded.
4. **Unified 3D Perspective Coordinate Lattice in Three.js**: A dynamic grid floor extending into 3D horizon space that reacts with subtle spring waves to pointer movement.

---

## 2. Goals & Non-Goals

### Goals
- **High Design Impact**: Establish an immediate, unforgettable impression of technical craftsmanship and aesthetic polish.
- **Zero Asset Bloat**: 0 bytes of external audio files or heavy textures. All sounds and graphics are generated procedurally via the Web Audio API and Three.js math.
- **Flawless Accessibility (`a11y`)**: Text scrambles and splits must preserve single, uninterrupted `aria-label` declarations. Screen readers must perceive zero stutter or character noise.
- **Graceful Degradation**: On mobile screens (< 768px), low-capability hardware, or under `prefers-reduced-motion: reduce`, the hero remains fully legible with clean CSS dot matrices and static text.
- **Theme Integrity**: Seamless integration with the existing Spaceship token system (`tokens.css`), responding instantly to `data-theme` (light/dark) toggles.

### Non-Goals
- Inventing unverified marketing claims or ungrounded statistics.
- Forcing unmuted sound autoplay (sound is strictly opt-in and muted by default).
- Adding heavy external physics engines or raster video backgrounds.

---

## 3. Architecture & Components

```
Hero Section (LandingComponent)
│
├── HeroHudComponent (src/app/shared/ui/hero-hud/)
│   ├── Monospace telemetry items ([SYS: ONLINE], [COORDS: 52.37° N, 4.90° E // AMSTERDAM])
│   └── Sound toggle pill ([AUDIO: MUTED 🔇] / [AUDIO: ON 🔊]) ──> AudioService
│
├── Headline & Metrics with [appScrambleReveal]
│   ├── Title: "{{ years }} years building payment, calling and edtech platforms."
│   └── Metric Readouts: Rapid character decrypt effect on initial paint / hover
│
├── HeroBackdropComponent
│   ├── Concentric Hairline Arcs (CSS, mobile baseline)
│   └── GlobeComponent (Lazy WebGL via Three.js)
│       ├── Fibonacci Sphere & Lat/Long Graticule
│       ├── Transatlantic Telecom Arcs
│       └── NEW: Perspective Coordinate Lattice with Pointer Spring Ripple
│
└── AudioService (src/app/shared/services/audio.service.ts)
    └── Web Audio API Oscillators (Click, Scramble Tick, Orbital Hum)
```

---

## 4. Component Specifications

### 4.1. `AudioService` (`src/app/shared/services/audio.service.ts`)
- **Scope**: `providedIn: 'root'`.
- **State**:
  - `isMuted = signal(true)` (initialized from `localStorage.getItem('io-sound-enabled') !== 'true'`).
  - Lazy `AudioContext` created only upon explicit user interaction (unmute click).
- **Synthesizer Functions**:
  - `playClick()`: 25ms pitch-drop sine/triangle blip (800Hz → 200Hz, peak gain 0.04) for button magnetic hovers and menu clicks.
  - `playScrambleTick()`: 8ms high-frequency white-noise/bandpass click (gain 0.015, randomized 1400Hz–2600Hz) firing throttled during scramble glyph shifts.
  - `playHum(frequency = 140, duration = 0.15)`: Low-frequency resonant pulse for globe drag interaction.
  - `toggleMute()`: Toggles state, updates `localStorage`, and plays a brief affirmative two-tone chime when unmuted.

### 4.2. `HeroHudComponent` (`src/app/shared/ui/hero-hud/hero-hud.component.ts`)
- **Template**:
  - Compact horizontal flex strip with monospace typography (`font-mono text-xs tracking-wider uppercase text-subtle`).
  - Live indicator dot: `<span class="h-1.5 w-1.5 rounded-full bg-brand animate-pulse"></span>`.
  - System status readout: `SYS: OK // 120 FPS`.
  - Geographic anchor: `LOC: 52.37° N, 4.90° E // AMS`.
  - Sound Toggle Button: Accessible `<button type="button" (click)="audio.toggleMute()" [attr.aria-pressed]="!audio.isMuted()">`.
- **Responsive Behavior**:
  - On viewports < 640px, coordinates collapse to short form (`AMS // CET`) to maintain single-line elegance.

### 4.3. `ScrambleRevealDirective` (`src/app/shared/directives/scramble-reveal/scramble-reveal.directive.ts`)
- **Selector**: `[appScrambleReveal]`.
- **Inputs**:
  - `appScrambleReveal: boolean | number` (duration, default 600ms).
  - `scrambleOnHover: boolean` (default false for hero headline, true for badges/receipts).
- **Implementation**:
  - Caches original text content and sets `host.setAttribute('aria-label', originalText)`.
  - Replaces DOM display with an inner container marked `aria-hidden="true"`.
  - Runs outside Angular zone (`NgZone.runOutsideAngular`) using `requestAnimationFrame`.
  - Scramble Glyphs: `0 1 X Y Z _ / \ < > [ ] * # ~ % & + =`.
  - If `prefers-reduced-motion` matches, resolves immediately to static text.
  - Optionally emits throttled `audioService.playScrambleTick()`.

### 4.4. Three.js Perspective Coordinate Lattice in `GlobeComponent`
- **Geometry**:
  - Plane coordinate lattice placed on XZ plane (`rotation.x = -Math.PI / 2.5`), positioned slightly below and receding behind the planet sphere.
  - Composed of a `BufferGeometry` grid of 40 x 40 points or segments.
- **Wave / Pointer Physics**:
  - In `play()` step loop:
    `y = sin(sqrt((x - mouseX)^2 + (z - mouseZ)^2) * freq - time * speed) * amplitude`
  - Subtle spring damping returns the lattice to flat equilibrium when pointer is stationary.
- **Theme Palette Integration**:
  - Lattice material color responds to `MutationObserver` on `document.documentElement[data-theme]`, transitioning smoothly between dark and light palette values.

---

## 5. Accessibility, Performance & Safety

1. **A11y**:
   - Every modified text node maintains a pristine single `aria-label`.
   - Audio toggle follows WAI-ARIA button patterns with clear pressed state and keyboard triggering (`Enter` / `Space`).
   - All HUD icons carry descriptive accessible labels or are `aria-hidden`.
2. **Reduced Motion**:
   - When `window.matchMedia('(prefers-reduced-motion: reduce)')` is true:
     - Scramble text displays instantly without animation.
     - Lattice ripple is locked to stationary planar state.
3. **Lifecycle & Battery Conservation**:
   - `IntersectionObserver` halts Three.js rendering and audio triggers as soon as the hero scrolls out of view.
   - `AudioContext` is suspended when page is hidden (`visibilitychange`).

---

## 6. Verification Plan

1. **Visual & Interactive Validation**:
   - Verify HUD status bar layout across desktop (1440px), tablet (768px), and mobile (375px).
   - Test mouse interaction on 3D lattice, verifying spring wave smoothness and zero stutter.
   - Test scramble reveal on load and hover states.
2. **Audio Synthesizer Validation**:
   - Confirm sound is strictly muted on initial page load.
   - Test toggle unmute: verify subtle click sounds on magnetic button hovers and scramble ticks.
   - Test mute persistence in `localStorage`.
3. **Build & Code Quality**:
   - Run `ng build` / TypeScript compiler to guarantee clean compilation.
   - Verify no console errors or WebGL context leaks during route transitions.
