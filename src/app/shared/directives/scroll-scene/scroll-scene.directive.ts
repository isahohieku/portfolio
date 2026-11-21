import {
  Directive,
  ElementRef,
  Input,
  afterNextRender,
  DestroyRef,
  inject,
  NgZone,
} from '@angular/core';
import { SmoothScrollService } from '../../services/smooth-scroll';

/**
 * `pin` — the track is taller than the viewport and its child is sticky;
 * progress runs 0 -> 1 across the distance the child stays pinned.
 *
 * `traverse` — the section is roughly one viewport tall and scrolls normally;
 * progress runs 0 -> 1 as it crosses the viewport, entering at the bottom and
 * leaving at the top. Pin maths cannot serve this case: its travel is
 * `height - viewport`, which is zero or negative for a 100svh section, so
 * `continuous` — progress runs 0 -> 1 smoothly from top = 0 until the
 * section's bottom edge leaves the top of the viewport. Motion remains
 * continuous without stopping after pin travel.
 */
export type SceneMode = 'pin' | 'traverse' | 'continuous';

/**
 * Drives a pinned scroll scene.
 *
 * This is the technique spaceship.com's homepage is built on: a tall outer
 * track scrolls normally while an inner element is `position: sticky` at the
 * top of the viewport, and progress through the track animates the pinned
 * content. What reads as parallax is differential transform speeds inside a
 * pinned frame.
 *
 * The directive's only job is to write normalised progress (0 -> 1) to
 * `--p` on the track. Everything visual stays in CSS, so no frame of this
 * costs an Angular change-detection pass.
 *
 * Applied to the track, not the sticky child:
 *
 *   <section class="scene-track" appScrollScene>
 *     <div class="scene">
 *       <div style="transform: translateY(calc(var(--p) * -20vh))">…</div>
 *     </div>
 *   </section>
 */
@Directive({
  selector: '[appScrollScene]',
  standalone: true,
})
export class ScrollSceneDirective {
  /** Bare `appScrollScene` binds '', which means pin — the original behaviour. */
  @Input() appScrollScene: SceneMode | '' = 'pin';

  /**
   * Hands the same progress to script, for a consumer that draws outside the
   * DOM (the story stage's globe). Called outside Angular on every scroll
   * frame, so it must only store the number, not trigger a render.
   */
  @Input() sceneProgress: ((progress: number) => void) | null = null;

  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly zone = inject(NgZone);
  private readonly smoothScroll = inject(SmoothScrollService);

  /**
   * Geometry, measured when it can change rather than every frame.
   *
   * Reading getBoundingClientRect per frame was the second half of the
   * judder: each scene writes --p, which dirties style, so the next scene's
   * rect read forces a synchronous style and layout pass. Five scenes meant
   * five flushes inside one frame. Offset and height only move on resize and
   * reflow, so they are cached and the frame does pure arithmetic.
   */
  private top = 0;
  private height = 0;
  private viewport = 0;
  private active = false;

  constructor() {
    afterNextRender(() => this.start());
  }

  private start(): void {
    const node: HTMLElement = this.element.nativeElement;

    // Reduced motion: leave progress at rest and never listen. The scene
    // still lays out correctly — every transform resolves to its zero state.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Each mode's rest value differs. Pin rests at the start of its track;
      // traverse rests at its midpoint, because 0 there means "still below the
      // fold" and would leave every scene layer permanently displaced.
      node.style.setProperty('--p', this.appScrollScene === 'traverse' ? '0.5' : '0');
      return;
    }

    // Run outside Angular: this fires on every scroll frame and touches
    // nothing the framework needs to know about.
    this.zone.runOutsideAngular(() => {
      let unsubscribe: (() => void) | undefined;

      const measure = () => {
        const rect = node.getBoundingClientRect();
        this.top = rect.top + window.scrollY;
        this.height = rect.height;
        this.viewport = window.innerHeight;
        this.update(node, window.scrollY);
      };

      // The track's own height changes with a font swap, an image landing or
      // a breakpoint, and a stale cache would offset the whole scene.
      const resizeObserver = new ResizeObserver(measure);
      resizeObserver.observe(node);
      window.addEventListener('resize', measure, { passive: true });

      // Only subscribe while the track is anywhere near the viewport.
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            this.active = entry.isIntersecting;
            if (this.active && !unsubscribe) {
              measure();
              unsubscribe = this.smoothScroll.onScroll((scrollY) => this.update(node, scrollY));
            } else if (!this.active && unsubscribe) {
              unsubscribe();
              unsubscribe = undefined;
            }
          }
        },
        { rootMargin: '20% 0px' }
      );

      observer.observe(node);
      measure();

      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        resizeObserver.disconnect();
        window.removeEventListener('resize', measure);
        unsubscribe?.();
      });
    });
  }

  private update(node: HTMLElement, scrollY: number): void {
    // Where the track sits relative to the viewport, derived rather than
    // measured — identical to rect.top, without the layout flush.
    const top = this.top - scrollY;
    const viewport = this.viewport;
    let progress: number;

    if (this.appScrollScene === 'traverse') {
      // 0 when the section's top sits on the bottom edge of the viewport,
      // 1 once its bottom has passed the top edge.
      progress = clamp((viewport - top) / (viewport + this.height), 0, 1);
    } else if (this.appScrollScene === 'continuous') {
      // Progress runs 0 -> 1 continuously from scroll 0 until the section's bottom edge leaves the viewport.
      progress = this.height <= 0 ? 0 : clamp(-top / this.height, 0, 1);
    } else {
      // Distance the track can travel while its sticky child stays pinned.
      const travel = this.height - viewport;
      progress = travel <= 0 ? 0 : clamp(-top / travel, 0, 1);
    }

    node.style.setProperty('--p', progress.toFixed(4));
    this.sceneProgress?.(progress);
  }
}

function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}
