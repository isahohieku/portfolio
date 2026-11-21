import {
  Component,
  ChangeDetectionStrategy,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
  afterNextRender,
  DestroyRef,
  inject,
  NgZone,
} from '@angular/core';
import type { GlobeComponent } from '../globe/globe.component';
import { StoryService } from '../../services/story';

/** Replacements allowed after lost contexts, per visit to the page. */
const MAX_RECOVERIES = 3;

/**
 * The persistent layer behind the landing page.
 *
 * One globe for the whole page instead of one per section. It stays fixed
 * while the sections scroll over it, and each chapter moves it to a new
 * composition: off to the right while the reach statement plays, pulled back
 * behind the work, risen into a horizon under the contact card. A single
 * object carried through every chapter is what makes the page read as one
 * story and not as a stack of sections.
 *
 * The compositions are CSS keyed on data-beat, so a chapter change costs one
 * attribute write and the transitions run on the compositor.
 *
 * It sits at z-index -1, above the canvas background and beneath every
 * in-flow surface. Bands with an opaque surface hide it, and the footer
 * covers it without needing to know it exists.
 *
 * The globe has to stay up for the whole visit, not just at load. Two things
 * used to take it down for good: a lost WebGL context, which leaves a canvas
 * that never draws again, and a load decision made once against whatever
 * the window was at that moment. The stage now replaces a globe whose
 * context is lost, and loads one when the window first becomes wide enough.
 */
@Component({
  selector: 'app-story-stage',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="story-stage" [attr.data-beat]="story.beat()" aria-hidden="true">
      <ng-container #globeHost />
    </div>
  `,
})
export class StoryStageComponent {
  @ViewChild('globeHost', { read: ViewContainerRef }) private globeHost?: ViewContainerRef;

  protected readonly story = inject(StoryService);
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  private globe?: ComponentRef<GlobeComponent>;
  private loading = false;
  private recoveries = 0;
  private recoveryTimer?: ReturnType<typeof setTimeout>;
  private destroyed = false;

  constructor() {
    // The service outlives the page. Coming back to / from a case study
    // must not open on the last chapter the visitor left.
    this.story.reset();
    afterNextRender(() => this.start());

    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
      clearTimeout(this.recoveryTimer);
    });
  }

  private start(): void {
    void this.load();

    // A window that opened narrow (or with devtools docked beside it) used to
    // lose the globe for the whole visit, because the check only ran once.
    const wide = window.matchMedia(`(min-width: ${MIN_WIDTH}px)`);
    const onWidth = (event: MediaQueryListEvent) => {
      if (event.matches) {
        void this.load();
      }
    };
    wide.addEventListener('change', onWidth);
    this.destroyRef.onDestroy(() => wide.removeEventListener('change', onWidth));
  }

  private async load(): Promise<void> {
    if (this.globe || this.loading || !this.globeHost || !canRenderGlobe()) {
      return;
    }
    this.loading = true;

    // Yield past first paint. Nothing in the first viewport waits on this,
    // and the stage is invisible until the reach chapter anyway.
    await new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 600)));

    try {
      const { GlobeComponent } = await import('../globe/globe.component');
      if (!this.destroyed) {
        this.zone.run(() => this.mount(GlobeComponent));
      }
    } catch {
      // A failed chunk fetch leaves the page without its stage. Every section
      // already reads complete without it, so there is nothing to recover.
    } finally {
      this.loading = false;
    }
  }

  private mount(type: typeof GlobeComponent): void {
    const ref = this.globeHost?.createComponent(type);
    if (!ref) {
      return;
    }
    ref.setInput('interactive', false);
    ref.instance.contextLost.subscribe(() => this.recover(type));
    this.globe = ref;
  }

  /**
   * A fresh canvas gets a fresh context, which is more dependable than
   * waiting on webglcontextrestored: browsers only restore when they choose
   * to, and a context dropped for being one too many is not coming back.
   * Capped, so a GPU that keeps failing does not get a rebuild loop.
   */
  private recover(type: typeof GlobeComponent): void {
    this.globe?.destroy();
    this.globe = undefined;

    if (this.destroyed || ++this.recoveries > MAX_RECOVERIES) {
      return;
    }

    clearTimeout(this.recoveryTimer);
    this.recoveryTimer = setTimeout(() => {
      if (!this.destroyed && !this.globe) {
        this.mount(type);
      }
    }, 1000);
  }
}

/** Below this the globe is not worth its chunk; see canRenderGlobe. */
const MIN_WIDTH = 768;

/**
 * Deliberately conservative, and the same intent the hero globe had.
 * PRODUCT.md makes mobile the primary case, and the site's own case study is
 * about cutting a 120s main-thread block on mid-range Android. Shipping a
 * heavy WebGL scene to that same device would argue against the engineer
 * the page describes.
 *
 * The connection check used to demand an effectiveType of 4g. That figure is
 * Chrome's estimate from recent round trips, not a property of the network,
 * and it flips to 3g between page views on the same Wi-Fi. That was enough to
 * drop the globe from a visit at random. Only an explicit Save-Data request
 * or a genuinely 2g-class estimate turns it away now.
 */
function canRenderGlobe(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false;
  }

  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
  };

  if (nav.connection?.saveData) {
    return false;
  }

  if (nav.connection?.effectiveType && /2g/.test(nav.connection.effectiveType)) {
    return false;
  }

  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) {
    return false;
  }

  if (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4) {
    return false;
  }

  // The viewport has to be large enough for the globe to be worth its chunk.
  if (window.innerWidth < MIN_WIDTH) {
    return false;
  }

  return supportsWebGL();
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    // A probe context counts against the browser's live-context cap until it
    // is collected, so it is released here rather than left to the GC.
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    return !!gl;
  } catch {
    return false;
  }
}
