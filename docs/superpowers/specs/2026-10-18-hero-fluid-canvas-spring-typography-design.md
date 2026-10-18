# Design Spec: Hero Organic Fluid Canvas & Elastic Spring Typography

- **Date:** 2026-10-18
- **Author:** Isah Ohieku & Antigravity
- **Status:** Approved
- **Inspiration:** Aristide Benoist (Awwwards Developer of the Year & Site of the Year)

---

## 1. Context & Motivation

The previous 3D spinning globe in the hero section is being retired in favor of an **Aristide Benoist-inspired organic fluid canvas with kinetic elastic spring typography**. 

This replaces the literal telecom globe with an abstract, high-end creative technologist aesthetic:
1. **Hypnotic Liquid Mercury / Fluid Wave Simulation (`FluidCanvasComponent`)**: A full-bleed GPU-accelerated fluid canvas that reacts organically to cursor velocity, creating silky liquid wakes and ripples with viscous damping.
2. **Kinetic Elastic Spring Typography (`SpringLettersDirective`)**: Proximity-aware headline typography where letters subtly displace and bounce back with elastic physics as the cursor glides across the headline.
3. **Telemetry HUD & Audio Haptics Integration**: Preserves the monospace `HeroHudComponent` and procedural `AudioService` micro-haptics (with subtle harmonic liquid blips on fluid interaction).

---

## 2. Goals & Non-Goals

### Goals
- **Retire Globe Completely**: Remove Three.js globe sphere, flight arcs, and lat/long graticules from the hero composition.
- **Organic Liquid Interactivity**: Moving the pointer creates fluid velocity wakes and illuminated brand amber ripples that propagate through the fluid field.
- **Elastic Proximity Typography**: Letters in the main headline gently disperse with spring physics when the cursor nears them, returning smoothly to their original baseline.
- **A11y & Reduced Motion**: Entire headline maintains single, continuous `aria-label` for screen readers. If `prefers-reduced-motion: reduce` is active, spring physics and fluid advection are replaced with static fluid gradients.
- **Seamless Theme Sync**: Responds dynamically to `data-theme` (dark void with amber currents vs. light cream with translucent slate trails).

### Non-Goals
- Adding heavy external physics engines (Cannon/Rapier/Matter.js).
- Forcing unmuted sound autoplay.

---

## 3. Architecture & Components

```
Hero Section (LandingComponent)
│
├── HeroHudComponent (src/app/shared/ui/hero-hud/)
│   └── Monospace telemetry + sound toggle pill
│
├── Headline with [appSpringLetters]
│   └── Proximity-based spring displacement on characters + aria-label preservation
│
├── HeroBackdropComponent
│   └── NEW: FluidCanvasComponent (src/app/shared/ui/fluid-canvas/fluid-canvas.component.ts)
│       └── GPU-accelerated liquid mesh & cursor wake shader / canvas simulation
│
└── AudioService (src/app/shared/services/audio.service.ts)
    └── Procedural micro-haptics & subtle harmonic liquid blips on pointer velocity
```

---

## 4. Component Specifications

### 4.1. `FluidCanvasComponent` (`src/app/shared/ui/fluid-canvas/fluid-canvas.component.ts`)
- **Selector**: `app-fluid-canvas`
- **Host**: Absolute inset-0, pointer-events: none (canvas catches pointer events directly or tracks parent pointer).
- **Simulation Mechanics**:
  - Uses HTML5 Canvas / WebGL shader simulation for fluid velocity diffusion and curl noise.
  - Maintains a velocity grid and dye field (with brand yellow `#ffd84d` / dark slate currents).
  - Listens to `pointermove` over the hero viewport, injecting velocity `(dx, dy)` and dye proportional to cursor speed.
  - Ambient breathing: When the cursor is still, gentle low-frequency Perlin drift keeps the liquid living and undulating.
- **Lifecycle & Resource Conservation**:
  - `IntersectionObserver` halts the animation loop when scrolled past the hero.
  - `visibilitychange` pauses during background tabs.
  - Cleans up WebGL/Canvas contexts on destroy.

### 4.2. `SpringLettersDirective` (`src/app/shared/directives/spring-letters/spring-letters.directive.ts`)
- **Selector**: `[appSpringLetters]`
- **Inputs**:
  - `springRadius: number` (distance threshold in px, default 90px).
  - `springStiffness: number` (elastic return speed, default 0.14).
  - `springDamping: number` (oscillation decay, default 0.82).
- **Implementation**:
  - Splits text into inline-block word and character spans while keeping original string as `aria-label`.
  - On `pointermove`, calculates distance vector `(dx, dy)` from cursor to each letter center.
  - If within `springRadius`, pushes the character away with displacement scaled to distance.
  - Smooth animation loop outside Angular zone updates transforms via `translate3d(x, y, 0)`.
  - Bypassed entirely when `prefers-reduced-motion` matches.

### 4.3. `HeroBackdropComponent` Update
- Updates template from `<ng-container #globeHost />` to dynamically or directly host `<app-fluid-canvas />`.

---

## 5. Verification Plan

1. **Visual & Performance**:
   - Verify smooth 60fps+ fluid cursor ripple on desktop.
   - Verify touch swipe ripple on mobile devices.
   - Test spring displacement on headline characters with cursor proximity.
2. **Accessibility**:
   - Verify screen readers announce full headline as a single sentence without letter-by-letter stutter.
3. **Build & Tests**:
   - Run unit tests for `SpringLettersDirective`.
   - Run `npx ng build` to confirm clean compilation and zero regressions.
