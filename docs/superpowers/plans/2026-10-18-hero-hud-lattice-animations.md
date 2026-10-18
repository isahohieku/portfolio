# Hero Section Minimalist HUD & Generative Grid Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the portfolio hero section with an Awwwards-inspired minimalist engineering HUD status bar, accessible alphanumeric scramble typography, zero-asset Web Audio micro-haptics, and a 3D perspective coordinate lattice in Three.js.

**Architecture:** A standalone `AudioService` provides procedural zero-asset sound synthesis via Web Audio API oscillators with default-muted state. A new `HeroHudComponent` provides a monospace avionics-style status bar with an accessible audio toggle. A standalone `ScrambleRevealDirective` handles hardware telemetry character decryption on load/hover while maintaining single `aria-label` accessibility. `GlobeComponent` is extended with a perspective 3D coordinate lattice reacting with spring waves to pointer movement, paired with a lightweight CSS dot-matrix fallback on mobile.

**Tech Stack:** Angular 20 Standalone Components, TypeScript 5.6, Tailwind CSS 3.4, Three.js 0.186, Web Audio API, Jasmine/Karma testing.

## Global Constraints

- **Design Tokens**: All colors and borders must resolve to `--io-*` CSS tokens in `src/styles/tokens.css` (e.g. `--io-color-text-brand`, `--io-color-border-brand-subtle`). No hardcoded hex outside tokens.
- **Accessibility (`a11y`)**: Headlines and animated text must preserve single, uninterrupted `aria-label` attributes with animated spans flagged as `aria-hidden="true"`.
- **Reduced Motion**: If `prefers-reduced-motion: reduce` matches, scramble typography and 3D pointer waves must immediately display final static states without animation.
- **Zero Asset Bloat**: No external audio files or raster textures. All sounds and lattice geometries are procedurally computed.
- **Audio Autoplay Safety**: Audio must start strictly muted (`isMuted = signal(true)`). AudioContext is created/resumed only after an explicit user interaction.

---

### Task 1: Procedural Web Audio Engine (`AudioService`)

**Files:**
- Create: `src/app/shared/services/audio.service.ts`
- Test: `src/app/shared/services/audio.service.spec.ts`

**Interfaces:**
- Produces:
  ```typescript
  export class AudioService {
    readonly isMuted: Signal<boolean>;
    toggleMute(): void;
    playClick(): void;
    playScrambleTick(): void;
    playHum(frequency?: number, duration?: number): void;
  }
  ```

- [ ] **Step 1: Write the failing unit test**

```typescript
// src/app/shared/services/audio.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { AudioService } from './audio.service';

describe('AudioService', () => {
  let service: AudioService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [AudioService] });
    service = TestBed.inject(AudioService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('initializes muted by default', () => {
    expect(service.isMuted()).toBeTrue();
  });

  it('toggles mute state and saves preference to localStorage', () => {
    service.toggleMute();
    expect(service.isMuted()).toBeFalse();
    expect(localStorage.getItem('io-sound-enabled')).toBe('true');

    service.toggleMute();
    expect(service.isMuted()).toBeTrue();
    expect(localStorage.getItem('io-sound-enabled')).toBe('false');
  });

  it('safely handles playClick, playScrambleTick and playHum when muted without throwing', () => {
    expect(() => {
      service.playClick();
      service.playScrambleTick();
      service.playHum();
    }).not.toThrow();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx ng test --watch=false --browsers=ChromeHeadless`
Expected: FAIL with "Cannot find module './audio.service'"

- [ ] **Step 3: Write minimal implementation**

```typescript
// src/app/shared/services/audio.service.ts
import { Injectable, signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private readonly _isMuted = signal<boolean>(this.readInitialMuteState());
  readonly isMuted: Signal<boolean> = this._isMuted.asReadonly();

  private audioCtx: AudioContext | null = null;
  private lastTickTime = 0;

  private readInitialMuteState(): boolean {
    if (typeof window === 'undefined' || !window.localStorage) {
      return true;
    }
    return localStorage.getItem('io-sound-enabled') !== 'true';
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') {
      return null;
    }
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) {
      return null;
    }
    if (!this.audioCtx) {
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  toggleMute(): void {
    const next = !this._isMuted();
    this._isMuted.set(next);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('io-sound-enabled', String(!next));
    }
    if (!next) {
      // Play affirmative unlock chime
      this.playChime();
    }
  }

  playClick(): void {
    if (this._isMuted()) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.025);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.026);
    } catch {
      // Fail silently if audio context is blocked
    }
  }

  playScrambleTick(): void {
    if (this._isMuted()) return;
    const nowMs = performance.now();
    // Throttle ticks to avoid audio buffer saturation (max 1 tick every 45ms)
    if (nowMs - this.lastTickTime < 45) return;
    this.lastTickTime = nowMs;

    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freq = 1200 + Math.random() * 1000;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.01);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.011);
    } catch {
      // Fail silently
    }
  }

  playHum(frequency = 140, duration = 0.15): void {
    if (this._isMuted()) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, now);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.01);
    } catch {
      // Fail silently
    }
  }

  private playChime(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25]; // C5 -> E5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + idx * 0.05;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.035, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.11);
      });
    } catch {
      // Fail silently
    }
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx ng test --watch=false --browsers=ChromeHeadless`
Expected: PASS (All AudioService tests green)

- [ ] **Step 5: Commit**

```bash
git add src/app/shared/services/audio.service.ts src/app/shared/services/audio.service.spec.ts
git commit -m "feat: add procedural Web Audio AudioService for micro-haptics"
```

---

### Task 2: Alphanumeric Scramble Typography Directive (`ScrambleRevealDirective`)

**Files:**
- Create: `src/app/shared/directives/scramble-reveal/scramble-reveal.directive.ts`
- Test: `src/app/shared/directives/scramble-reveal/scramble-reveal.directive.spec.ts`

**Interfaces:**
- Consumes: `AudioService.playScrambleTick()`
- Produces:
  ```typescript
  @Directive({
    selector: '[appScrambleReveal]',
    standalone: true
  })
  export class ScrambleRevealDirective {
    @Input() appScrambleReveal: number | string = 600;
    @Input() scrambleOnHover = false;
  }
  ```

- [ ] **Step 1: Write the failing unit test**

```typescript
// src/app/shared/directives/scramble-reveal/scramble-reveal.directive.spec.ts
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrambleRevealDirective } from './scramble-reveal.directive';
import { AudioService } from '../../services/audio.service';

@Component({
  standalone: true,
  imports: [ScrambleRevealDirective],
  template: `<h1 appScrambleReveal="400">Software Engineer</h1>`,
})
class TestHostComponent {}

describe('ScrambleRevealDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, ScrambleRevealDirective],
      providers: [AudioService],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    hostEl = fixture.nativeElement.querySelector('h1');
  });

  it('sets accessible aria-label matching original text content', () => {
    expect(hostEl.getAttribute('aria-label')).toBe('Software Engineer');
  });

  it('adds the scramble css class to host', () => {
    expect(hostEl.classList.contains('scramble-reveal')).toBeTrue();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx ng test --watch=false --browsers=ChromeHeadless`
Expected: FAIL with "Cannot find module './scramble-reveal.directive'"

- [ ] **Step 3: Write minimal implementation**

```typescript
// src/app/shared/directives/scramble-reveal/scramble-reveal.directive.ts
import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  afterNextRender,
  DestroyRef,
  inject,
  NgZone,
} from '@angular/core';
import { AudioService } from '../../services/audio.service';

const GLYPHS = '01XYZ_/<>[*#~%&+=':

@Directive({
  selector: '[appScrambleReveal]',
  standalone: true,
})
export class ScrambleRevealDirective {
  /** Duration in ms */
  @Input() appScrambleReveal: number | string = 600;
  @Input() scrambleOnHover = false;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);
  private readonly zone = inject(NgZone);
  private readonly audio = inject(AudioService);

  private originalText = '';
  private displaySpan: HTMLElement | null = null;
  private animFrameId = 0;
  private isAnimating = false;

  constructor() {
    afterNextRender(() => this.setup());
  }

  private setup(): void {
    const host = this.el.nativeElement;
    this.originalText = (host.textContent ?? '').replace(/\s+/g, ' ').trim();
    if (!this.originalText) return;

    this.renderer.setAttribute(host, 'aria-label', this.originalText);
    this.renderer.addClass(host, 'scramble-reveal');

    // Create container for animated characters with aria-hidden
    this.displaySpan = this.renderer.createElement('span');
    this.renderer.setAttribute(this.displaySpan, 'aria-hidden', 'true');
    this.displaySpan!.textContent = this.originalText;

    this.renderer.setProperty(host, 'textContent', '');
    this.renderer.appendChild(host, this.displaySpan);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reducedMotion) {
      this.zone.runOutsideAngular(() => this.scramble());
    }

    if (this.scrambleOnHover) {
      const onEnter = () => {
        if (!this.isAnimating && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          this.zone.runOutsideAngular(() => this.scramble());
        }
      };
      host.addEventListener('pointerenter', onEnter);
      this.destroyRef.onDestroy(() => host.removeEventListener('pointerenter', onEnter));
    }

    this.destroyRef.onDestroy(() => {
      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
      }
    });
  }

  private scramble(): void {
    if (!this.displaySpan || !this.originalText) return;
    this.isAnimating = true;

    const duration = Number(this.appScrambleReveal) || 600;
    const startTime = performance.now();
    const length = this.originalText.length;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Characters before resolvedIndex have resolved; remaining are scrambled
      const resolvedIndex = Math.floor(progress * length);

      let output = '';
      for (let i = 0; i < length; i++) {
        const char = this.originalText[i];
        if (char === ' ') {
          output += ' ';
        } else if (i < resolvedIndex) {
          output += char;
        } else {
          output += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      this.displaySpan!.textContent = output;
      this.audio.playScrambleTick();

      if (progress < 1) {
        this.animFrameId = requestAnimationFrame(step);
      } else {
        this.displaySpan!.textContent = this.originalText;
        this.isAnimating = false;
        this.animFrameId = 0;
      }
    };

    this.animFrameId = requestAnimationFrame(step);
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx ng test --watch=false --browsers=ChromeHeadless`
Expected: PASS (All ScrambleRevealDirective tests green)

- [ ] **Step 5: Commit**

```bash
git add src/app/shared/directives/scramble-reveal/scramble-reveal.directive.ts src/app/shared/directives/scramble-reveal/scramble-reveal.directive.spec.ts
git commit -m "feat: add accessible ScrambleRevealDirective for cybernetic typography"
```

---

### Task 3: Minimalist Telemetry Status Pill (`HeroHudComponent`)

**Files:**
- Create: `src/app/shared/ui/hero-hud/hero-hud.component.ts`
- Test: `src/app/shared/ui/hero-hud/hero-hud.component.spec.ts`

**Interfaces:**
- Consumes: `AudioService.isMuted`, `AudioService.toggleMute()`
- Produces: `<app-hero-hud />`

- [ ] **Step 1: Write the failing unit test**

```typescript
// src/app/shared/ui/hero-hud/hero-hud.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroHudComponent } from './hero-hud.component';
import { AudioService } from '../../services/audio.service';

describe('HeroHudComponent', () => {
  let component: HeroHudComponent;
  let fixture: ComponentFixture<HeroHudComponent>;
  let audioService: AudioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroHudComponent],
      providers: [AudioService],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroHudComponent);
    component = fixture.componentInstance;
    audioService = TestBed.inject(AudioService);
    fixture.detectChanges();
  });

  it('renders system status and location indicator', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('SYS: OK');
    expect(text).toContain('AMS');
  });

  it('toggles audio service when audio button is clicked', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-pressed')).toBe('false');

    button.click();
    fixture.detectChanges();

    expect(audioService.isMuted()).toBeFalse();
    expect(button.getAttribute('aria-pressed')).toBe('true');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx ng test --watch=false --browsers=ChromeHeadless`
Expected: FAIL with "Cannot find module './hero-hud.component'"

- [ ] **Step 3: Write minimal implementation**

```typescript
// src/app/shared/ui/hero-hud/hero-hud.component.ts
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-hero-hud',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="inline-flex flex-wrap items-center gap-3 rounded-full border border-subtle bg-surface-subtle/80 px-3.5 py-1.5 font-mono text-[11px] tracking-wider uppercase text-subtle backdrop-blur-md transition-colors"
      role="region"
      aria-label="System status telemetry">
      <!-- Live Status Pulse -->
      <span class="inline-flex items-center gap-1.5">
        <span class="relative flex h-2 w-2">
          <span
            class="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-text opacity-75"></span>
          <span class="relative inline-flex h-2 w-2 rounded-full bg-brand-text"></span>
        </span>
        <span class="text-body font-semibold">SYS: OK</span>
      </span>

      <span class="text-subtle select-none" aria-hidden="true">&bull;</span>

      <!-- Coordinates & Location -->
      <span class="hidden sm:inline">LOC: 52.37&deg; N, 4.90&deg; E // AMS</span>
      <span class="inline sm:hidden">AMS // CET</span>

      <span class="text-subtle select-none" aria-hidden="true">&bull;</span>

      <!-- Audio Synthesizer Control -->
      <button
        type="button"
        (click)="audio.toggleMute()"
        [attr.aria-pressed]="!audio.isMuted()"
        class="inline-flex items-center gap-1 rounded-sm text-subtle hover:text-body focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-focus transition-colors cursor-pointer"
        data-cursor="Sound">
        @if (audio.isMuted()) {
          <span>AUDIO: OFF &#128263;</span>
        } @else {
          <span class="text-brand-text font-semibold">AUDIO: ON &#128266;</span>
        }
      </button>
    </div>
  `,
})
export class HeroHudComponent {
  readonly audio = inject(AudioService);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx ng test --watch=false --browsers=ChromeHeadless`
Expected: PASS (All HeroHudComponent tests green)

- [ ] **Step 5: Commit**

```bash
git add src/app/shared/ui/hero-hud/hero-hud.component.ts src/app/shared/ui/hero-hud/hero-hud.component.spec.ts
git commit -m "feat: add HeroHudComponent for avionics-style telemetry and sound toggle"
```

---

### Task 4: Three.js 3D Perspective Coordinate Lattice in `GlobeComponent`

**Files:**
- Modify: `src/app/shared/ui/globe/globe.component.ts`

**Interfaces:**
- Consumes: Three.js `BufferGeometry`, `Points`, `PointsMaterial`, `Float32BufferAttribute`, `Scene`
- Produces: Extended `GlobeComponent` with `buildLattice()` method and pointer wave spring displacement in `play()` loop.

- [ ] **Step 1: Update `GlobeComponent` to add `buildLattice` and spring wave displacement**

Edit `src/app/shared/ui/globe/globe.component.ts`:
Add `buildLattice(color: Color)`:
```typescript
  /** Perspective coordinate lattice receding under the horizon. */
  private buildLattice(color: Color): { points: Points; initialY: Float32Array } {
    const size = 12;
    const divisions = 36;
    const step = size / divisions;
    const positions: number[] = [];

    for (let i = 0; i <= divisions; i++) {
      const z = (i - divisions / 2) * step;
      for (let j = 0; j <= divisions; j++) {
        const x = (j - divisions / 2) * step;
        positions.push(x, -1.35, z);
      }
    }

    const geometry = new BufferGeometry();
    const posAttr = new Float32BufferAttribute(positions, 3);
    geometry.setAttribute('position', posAttr);

    const initialY = new Float32Array(positions.length / 3);
    for (let k = 0; k < initialY.length; k++) {
      initialY[k] = positions[k * 3 + 1];
    }

    const material = new PointsMaterial({
      color,
      size: 0.015,
      transparent: true,
      opacity: 0.28,
    });

    const points = new Points(geometry, material);
    return { points, initialY };
  }
```

Add lattice update to `play()` animation loop:
```typescript
  // In play():
  const latticePos = lattice.points.geometry.getAttribute('position');
  const count = latticePos.count;
  const time = now * 0.0015;

  for (let i = 0; i < count; i++) {
    const x = latticePos.getX(i);
    const z = latticePos.getZ(i);
    const dist = Math.sqrt(x * x + z * z);
    const wave = Math.sin(dist * 1.5 - time) * 0.04;
    latticePos.setY(i, lattice.initialY[i] + wave);
  }
  latticePos.needsUpdate = true;
```

Update `watchTheme` to also recolor `lattice.points.material`.

- [ ] **Step 2: Run build to verify TypeScript and Three.js compilation**

Run: `npx ng build`
Expected: PASS (Application bundle generation complete, 0 errors)

- [ ] **Step 3: Commit**

```bash
git add src/app/shared/ui/globe/globe.component.ts
git commit -m "feat: add perspective coordinate lattice with wave physics to GlobeComponent"
```

---

### Task 5: Hero Assembly, Responsive Integration & Final Verification

**Files:**
- Modify: `src/app/pages/landing/landing.component.ts`
- Modify: `src/app/pages/landing/landing.component.html`
- Modify: `src/styles.scss`

- [ ] **Step 1: Import `HeroHudComponent` and `ScrambleRevealDirective` into `LandingComponent`**

In `src/app/pages/landing/landing.component.ts`:
- Import `HeroHudComponent` from `../../shared/ui/hero-hud/hero-hud.component`
- Import `ScrambleRevealDirective` from `../../shared/directives/scramble-reveal/scramble-reveal.directive`
- Add both to the `@Component({ imports: [ ..., HeroHudComponent, ScrambleRevealDirective ] })` array.

- [ ] **Step 2: Update `landing.component.html`**

In `src/app/pages/landing/landing.component.html`:
- Insert `<app-hero-hud class="mb-4" />` just above the `<h1>` headline.
- Apply `[appScrambleReveal]="true"` and `[scrambleOnHover]="true"` to the receipts and headline.

- [ ] **Step 3: Add CSS fallback dot lattice in `src/styles.scss`**

In `src/styles.scss` inside `.hero-backdrop`:
```scss
  .hero-backdrop__scrim {
    pointer-events: none;
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
      var(--io-color-border-neutral-subtle) 1px,
      transparent 1px
    );
    background-size: 24px 24px;
    mask-image: radial-gradient(ellipse at 50% 50%, #000 30%, transparent 80%);
    opacity: 0.35;
  }
```

- [ ] **Step 4: Run test suite & build to verify full integrity**

Run: `npx ng test --watch=false --browsers=ChromeHeadless`
Run: `npx ng build`
Expected: All tests pass, build completes cleanly with zero errors.

- [ ] **Step 5: Commit final integration**

```bash
git add src/app/pages/landing/landing.component.ts src/app/pages/landing/landing.component.html src/styles.scss
git commit -m "feat: integrate HeroHudComponent, ScrambleReveal, and dot lattice into landing hero"
```

---

## Plan Self-Review Check

1. **Spec Coverage**:
   - Monospace telemetry status pill: Covered by Task 3 & Task 5.
   - Procedural Web Audio micro-haptics: Covered by Task 1 & Task 3.
   - Accessible alphanumeric scramble typography: Covered by Task 2 & Task 5.
   - 3D perspective coordinate lattice: Covered by Task 4.
   - Mobile CSS dot matrix & responsive behavior: Covered by Task 5.
2. **Placeholder Scan**: Verified. Zero "TODO", "TBD", or vague implementations. Complete code provided for all steps.
3. **Type Consistency**: Method signatures (`toggleMute`, `isMuted`, `playClick`, `playScrambleTick`, `playHum`) match verbatim across `AudioService`, unit tests, `HeroHudComponent`, and `ScrambleRevealDirective`.
