import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * The atmospheric layer behind the hero.
 *
 * Every layer is decorative and `aria-hidden`; the hero reads identically
 * with all of it removed, which is the point — this is the baseline that
 * stays on low-capability devices and under reduced motion, and the fallback
 * the WebGL globe degrades to.
 *
 * Layers drift on two inputs: `--p` (scroll progress, from ScrollSceneDirective)
 * and `--mx`/`--my` (pointer, from PointerParallaxDirective). Both resolve to
 * 0 when their directive declines to run, so the composition is still correct
 * when nothing is animating.
 */
@Component({
  selector: 'app-hero-backdrop',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="hero-backdrop" aria-hidden="true">
      <div class="hero-backdrop__orb hero-backdrop__orb--brand"></div>
      <div class="hero-backdrop__orb hero-backdrop__orb--cool"></div>
      <div class="hero-backdrop__orb hero-backdrop__orb--deep"></div>
      <div class="hero-backdrop__grid"></div>
      <div class="hero-backdrop__scrim"></div>
    </div>
  `,
  styles: [
    `
      :host {
        position: absolute;
        inset: 0;
        display: block;
        pointer-events: none;
        overflow: hidden;
      }
    `,
  ],
})
export class HeroBackdropComponent {}
