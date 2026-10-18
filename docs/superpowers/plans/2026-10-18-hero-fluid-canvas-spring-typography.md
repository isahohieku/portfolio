# Hero Organic Fluid Canvas & Elastic Spring Typography Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 3D globe in the hero section with an Aristide Benoist-inspired organic fluid canvas reacting to cursor velocity and an elastic spring typography directive displacing headline letters on cursor proximity.

**Architecture:** A standalone `SpringLettersDirective` splits text into accessible inline word/character spans and applies spring physics transforms on cursor proximity while preserving the full string as `aria-label`. A standalone `FluidCanvasComponent` runs a high-performance 2D/WebGL fluid mesh simulation with liquid cursor wakes and Perlin noise ambient drift. `HeroBackdropComponent` is updated to retire `GlobeComponent` in favor of `FluidCanvasComponent`.

**Tech Stack:** Angular 20 Standalone Components, TypeScript 5.6, HTML5 Canvas 2D / WebGL, Tailwind CSS 3.4, Jasmine/Karma unit tests.

## Global Constraints

- **Design Tokens**: All fluid colors and ambient highlights must resolve to `--io-*` CSS tokens in `src/styles/tokens.css` (e.g. `--io-color-text-brand: #ffd84d`, `--io-color-border-brand-subtle`).
- **Accessibility (`a11y`)**: The headline must preserve a single, uninterrupted `aria-label` attribute on the host element, with visual character spans marked `aria-hidden="true"`.
- **Reduced Motion**: If `prefers-reduced-motion: reduce` matches, spring physics and fluid advection are replaced with static fluid styling.
- **Battery & Performance**: Canvas frame loops must halt immediately when the hero is out of view (`IntersectionObserver`) or when the tab is hidden (`visibilitychange`).

---

### Task 1: Kinetic Elastic Spring Typography Directive (`SpringLettersDirective`)

**Files:**
- Create: `src/app/shared/directives/spring-letters/spring-letters.directive.ts`
- Test: `src/app/shared/directives/spring-letters/spring-letters.directive.spec.ts`

**Interfaces:**
- Produces:
  ```typescript
  @Directive({
    selector: '[appSpringLetters]',
    standalone: true
  })
  export class SpringLettersDirective {
    @Input() springRadius = 90;
    @Input() springStiffness = 0.14;
    @Input() springDamping = 0.82;
  }
  ```

- [ ] **Step 1: Write the failing unit test**

```typescript
// src/app/shared/directives/spring-letters/spring-letters.directive.spec.ts
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpringLettersDirective } from './spring-letters.directive';

@Component({
  standalone: true,
  imports: [SpringLettersDirective],
  template: `<h1 appSpringLetters>Software Engineer</h1>`,
})
class TestHostComponent {}

describe('SpringLettersDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, SpringLettersDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    hostEl = fixture.nativeElement.querySelector('h1');
  });

  it('sets accessible aria-label matching original text content', () => {
    expect(hostEl.getAttribute('aria-label')).toBe('Software Engineer');
  });

  it('adds the spring-letters css class to host', () => {
    expect(hostEl.classList.contains('spring-letters')).toBe(true);
  });

  it('creates span wrapper marked aria-hidden="true"', () => {
    const wrapper = hostEl.querySelector('span[aria-hidden="true"]');
    expect(wrapper).not.toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx ng test --watch=false --browsers=ChromeHeadless`
Expected: FAIL with "Cannot find module './spring-letters.directive'"

- [ ] **Step 3: Write minimal implementation**

```typescript
// src/app/shared/directives/spring-letters/spring-letters.directive.ts
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

interface LetterItem {
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  cx: number;
  cy: number;
}

@Directive({
  selector: '[appSpringLetters]',
  standalone: true,
})
export class SpringLettersDirective {
  @Input() springRadius = 85;
  @Input() springStiffness = 0.15;
  @Input() springDamping = 0.8;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);
  private readonly zone = inject(NgZone);

  private letters: LetterItem[] = [];
  private mouseX = -9999;
  private mouseY = -9999;
  private animId = 0;
  private isHovered = false;

  constructor() {
    afterNextRender(() => this.setup());
  }

  private setup(): void {
    const host = this.el.nativeElement;
    const text = (host.textContent ?? '').replace(/\s+/g, ' ').trim();
    if (!text) return;

    this.renderer.setAttribute(host, 'aria-label', text);
    this.renderer.addClass(host, 'spring-letters');

    const wrapper = this.renderer.createElement('span');
    this.renderer.setAttribute(wrapper, 'aria-hidden', 'true');
    this.renderer.setStyle(wrapper, 'display', 'inline');

    const words = text.split(' ');
    this.letters = [];

    words.forEach((word, wIdx) => {
      const wordSpan = this.renderer.createElement('span');
      this.renderer.setStyle(wordSpan, 'display', 'inline-block');
      this.renderer.setStyle(wordSpan, 'white-space', 'nowrap');

      for (let i = 0; i < word.length; i++) {
        const charSpan = this.renderer.createElement('span');
        this.renderer.setStyle(charSpan, 'display', 'inline-block');
        this.renderer.setStyle(charSpan, 'will-change', 'transform');
        this.renderer.setProperty(charSpan, 'textContent', word[i]);
        this.renderer.appendChild(wordSpan, charSpan);

        this.letters.push({
          el: charSpan,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          cx: 0,
          cy: 0,
        });
      }

      this.renderer.appendChild(wrapper, wordSpan);

      if (wIdx < words.length - 1) {
        const space = this.renderer.createElement('span');
        this.renderer.setProperty(space, 'textContent', ' ');
        this.renderer.appendChild(wrapper, space);
      }
    });

    this.renderer.setProperty(host, 'textContent', '');
    this.renderer.appendChild(host, wrapper);

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const onPointerMove = (e: MouseEvent) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      if (!this.isHovered) {
        this.isHovered = true;
        this.updateLetterCenters();
      }
    };

    const onPointerLeave = () => {
      this.mouseX = -9999;
      this.mouseY = -9999;
      this.isHovered = false;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);

    this.zone.runOutsideAngular(() => this.loop());

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      if (this.animId) cancelAnimationFrame(this.animId);
    });
  }

  private updateLetterCenters(): void {
    for (const l of this.letters) {
      const rect = l.el.getBoundingClientRect();
      l.cx = rect.left + rect.width / 2;
      l.cy = rect.top + rect.height / 2;
    }
  }

  private loop(): void {
    let hasMotion = false;

    for (const l of this.letters) {
      if (this.isHovered) {
        const dx = l.cx + l.x - this.mouseX;
        const dy = l.cy + l.y - this.mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.springRadius && dist > 0) {
          const force = (1 - dist / this.springRadius) * 14;
          l.vx += (dx / dist) * force;
          l.vy += (dy / dist) * force;
        }
      }

      // Spring back to (0, 0)
      const ax = -this.springStiffness * l.x;
      const ay = -this.springStiffness * l.y;
      l.vx = (l.vx + ax) * this.springDamping;
      l.vy = (l.vy + ay) * this.springDamping;
      l.x += l.vx;
      l.y += l.vy;

      if (Math.abs(l.x) > 0.05 || Math.abs(l.y) > 0.05 || Math.abs(l.vx) > 0.05) {
        hasMotion = true;
        l.el.style.transform = `translate3d(${l.x.toFixed(2)}px, ${l.y.toFixed(2)}px, 0)`;
      } else if (l.x !== 0 || l.y !== 0) {
        l.x = 0;
        l.y = 0;
        l.vx = 0;
        l.vy = 0;
        l.el.style.transform = '';
      }
    }

    this.animId = requestAnimationFrame(() => this.loop());
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx ng test --watch=false --browsers=ChromeHeadless`
Expected: PASS (All SpringLettersDirective tests green)

- [ ] **Step 5: Commit**

```bash
git add src/app/shared/directives/spring-letters/spring-letters.directive.ts src/app/shared/directives/spring-letters/spring-letters.directive.spec.ts
git commit -m "feat: add SpringLettersDirective for proximity-based elastic headline typography"
```

---

### Task 2: Organic Fluid Canvas Component (`FluidCanvasComponent`)

**Files:**
- Create: `src/app/shared/ui/fluid-canvas/fluid-canvas.component.ts`
- Test: `src/app/shared/ui/fluid-canvas/fluid-canvas.component.spec.ts`

**Interfaces:**
- Produces: `<app-fluid-canvas />`

- [ ] **Step 1: Write the failing unit test**

```typescript
// src/app/shared/ui/fluid-canvas/fluid-canvas.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FluidCanvasComponent } from './fluid-canvas.component';

describe('FluidCanvasComponent', () => {
  let component: FluidCanvasComponent;
  let fixture: ComponentFixture<FluidCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FluidCanvasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FluidCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates canvas with aria-hidden="true"', () => {
    const canvas = fixture.nativeElement.querySelector('canvas');
    expect(canvas).not.toBeNull();
    expect(canvas.getAttribute('aria-hidden')).toBe('true');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx ng test --watch=false --browsers=ChromeHeadless`
Expected: FAIL with "Cannot find module './fluid-canvas.component'"

- [ ] **Step 3: Write minimal implementation**

```typescript
// src/app/shared/ui/fluid-canvas/fluid-canvas.component.ts
import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  afterNextRender,
  DestroyRef,
  inject,
  NgZone,
} from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

@Component({
  selector: 'app-fluid-canvas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #canvas aria-hidden="true"></canvas>`,
  styles: [
    `
      :host {
        position: absolute;
        inset: 0;
        display: block;
        pointer-events: none;
        overflow: hidden;
      }
      canvas {
        width: 100%;
        height: 100%;
        display: block;
      }
    `,
  ],
})
export class FluidCanvasComponent {
  @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly zone = inject(NgZone);

  private animId = 0;
  private isVisible = true;
  private particles: Particle[] = [];
  private lastX = 0;
  private lastY = 0;

  constructor() {
    afterNextRender(() => this.zone.runOutsideAngular(() => this.init()));
  }

  private init(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

      const dx = x - (this.lastX || x);
      const dy = y - (this.lastY || y);
      const speed = Math.sqrt(dx * dx + dy * dy);

      this.lastX = x;
      this.lastY = y;

      const count = Math.min(Math.floor(speed * 0.4) + 1, 6);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spread = Math.random() * 2 + 1;
        this.particles.push({
          x: x + (Math.random() - 0.5) * 16,
          y: y + (Math.random() - 0.5) * 16,
          vx: dx * 0.15 + Math.cos(angle) * spread,
          vy: dy * 0.15 + Math.sin(angle) * spread,
          size: Math.random() * 28 + 14,
          alpha: 0.35 + Math.random() * 0.25,
          life: 0,
          maxLife: 60 + Math.random() * 40,
        });
      }

      if (this.particles.length > 140) {
        this.particles.splice(0, this.particles.length - 140);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        this.isVisible = entries.some((e) => e.isIntersecting);
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    const loop = () => {
      if (!this.isVisible || document.hidden) {
        this.animId = requestAnimationFrame(loop);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Render organic liquid ripples
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.size *= 1.018;

        const progress = p.life / p.maxLife;
        const currentAlpha = p.alpha * (1 - progress);

        if (progress >= 1) {
          this.particles.splice(i, 1);
          continue;
        }

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `rgba(255, 216, 77, ${currentAlpha * 0.8})`);
        gradient.addColorStop(0.45, `rgba(255, 216, 77, ${currentAlpha * 0.25})`);
        gradient.addColorStop(1, 'rgba(255, 216, 77, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      this.animId = requestAnimationFrame(loop);
    };

    this.animId = requestAnimationFrame(loop);

    this.destroyRef.onDestroy(() => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      if (this.animId) cancelAnimationFrame(this.animId);
    });
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx ng test --watch=false --browsers=ChromeHeadless`
Expected: PASS (All FluidCanvasComponent tests green)

- [ ] **Step 5: Commit**

```bash
git add src/app/shared/ui/fluid-canvas/fluid-canvas.component.ts src/app/shared/ui/fluid-canvas/fluid-canvas.component.spec.ts
git commit -m "feat: add FluidCanvasComponent for organic liquid cursor ripples"
```

---

### Task 3: Hero Backdrop & Landing Integration (Retire Globe)

**Files:**
- Modify: `src/app/shared/ui/hero-backdrop/hero-backdrop.component.ts`
- Modify: `src/app/pages/landing/landing.component.html`
- Modify: `src/app/pages/landing/landing.component.ts`
- Modify: `src/styles.scss`

- [ ] **Step 1: Replace Globe in `HeroBackdropComponent` with `FluidCanvasComponent`**

In `src/app/shared/ui/hero-backdrop/hero-backdrop.component.ts`:
- Import `FluidCanvasComponent`
- Replace `<div class="hero-backdrop__globe"><ng-container #globeHost /></div>` with `<app-fluid-canvas />`.
- Remove dynamic Three.js globe import code and references.

- [ ] **Step 2: Apply `[appSpringLetters]` to main headline in `landing.component.html`**

In `src/app/pages/landing/landing.component.ts`:
- Import `SpringLettersDirective` from `../../shared/directives/spring-letters/spring-letters.directive`
- Add `SpringLettersDirective` to component `imports`.

In `src/app/pages/landing/landing.component.html`:
- Apply `appSpringLetters` to the `<h1>` headline:
  ```html
  <h1 class="io-display text-pretty text-heading" appSpringLetters>
    {{ years }} years building payment, calling and edtech platforms.
  </h1>
  ```

- [ ] **Step 3: Update `styles.scss` to clean up old globe styles**

Remove `.hero-backdrop__globe` styles and optimize `.hero-backdrop` for the full-bleed fluid canvas.

- [ ] **Step 4: Verify test suite and production build**

Run: `npx ng test --watch=false --browsers=ChromeHeadless`
Run: `npx ng build`
Expected: All tests pass, build completes cleanly with zero errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/shared/ui/hero-backdrop/hero-backdrop.component.ts src/app/pages/landing/landing.component.ts src/app/pages/landing/landing.component.html src/styles.scss
git commit -m "feat: retire globe and integrate FluidCanvasComponent and SpringLettersDirective into hero"
```
