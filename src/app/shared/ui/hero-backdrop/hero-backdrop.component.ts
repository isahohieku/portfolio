import {
  Component,
  ChangeDetectionStrategy,
  ViewContainerRef,
  ViewChild,
  afterNextRender,
  inject,
  NgZone,
} from '@angular/core';

/**
 * The atmospheric layer behind the hero.
 *
 * Every layer is decorative and `aria-hidden`; the hero reads identically
 * with all of it removed, which is the point — this is the baseline that
 * stays on low-capability devices and under reduced motion, and what the
 * WebGL globe degrades to.
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
      <div class="hero-backdrop__globe"><ng-container #globeHost /></div>
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
export class HeroBackdropComponent {
  @ViewChild('globeHost', { read: ViewContainerRef }) private globeHost?: ViewContainerRef;

  private readonly zone = inject(NgZone);

  constructor() {
    afterNextRender(() => this.maybeLoadGlobe());
  }

  /**
   * Loads the WebGL globe only when the device can afford it, and only after
   * the hero is already on screen and interactive. three is ~150 kB gzipped —
   * more than the rest of the app's JavaScript — so it is a dynamic import,
   * which keeps it in its own chunk and out of the initial bundle entirely.
   */
  private async maybeLoadGlobe(): Promise<void> {
    if (!this.globeHost || !canRenderGlobe()) {
      return;
    }

    // Yield past first paint so the headline is never waiting on this.
    await new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 400)));

    try {
      const { GlobeComponent } = await import('../globe/globe.component');
      this.zone.run(() => this.globeHost?.createComponent(GlobeComponent));
    } catch {
      // A failed chunk fetch leaves the CSS backdrop in place, which is a
      // finished composition on its own. Nothing to report to the visitor.
    }
  }
}

/**
 * Deliberately conservative. PRODUCT.md makes mobile the primary case, and
 * the site's own case study is about cutting a 120s main-thread block on
 * mid-range Android — shipping a heavy WebGL scene to that same device would
 * argue against the engineer the page is describing.
 */
function canRenderGlobe(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false;
  }

  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
      deviceMemory?: number;
    }
  ).connection;

  if (connection?.saveData) {
    return false;
  }

  if (connection?.effectiveType && !/4g/.test(connection.effectiveType)) {
    return false;
  }

  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (memory !== undefined && memory < 4) {
    return false;
  }

  if (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4) {
    return false;
  }

  // The viewport has to be large enough for the globe to be worth 150 kB.
  if (window.innerWidth < 768) {
    return false;
  }

  return supportsWebGL();
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}
