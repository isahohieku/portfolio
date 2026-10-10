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
 * Writes the host's own traversal of the viewport to `--d`, running -1 -> 1:
 * -1 while it sits on the bottom edge, 0 when its centre meets the viewport's,
 * 1 once it has left past the top.
 *
 * [appScrollScene] already does something adjacent, but it is a section-level
 * device: it measures a track and drives a pinned child, and its progress is
 * shared by every layer inside. This is the element-level counterpart, so a
 * single card, plate or figure can drift at its own rate without a scene
 * wrapped around it. Signed progress is what lets a layer read as slower than
 * the page rather than merely offset from it: the displacement passes through
 * zero as the element is centred, which is the frame the composition was laid
 * out for.
 *
 * Children opt in by reading it:
 *
 *   transform: translate3d(0, calc(var(--d) * -6%), 0);
 *
 * Like the scene directive, it writes a custom property and nothing else —
 * every frame stays outside Angular, and the motion itself lives in CSS.
 */
@Directive({
  selector: '[appScrollDrift]',
  standalone: true,
})
export class ScrollDriftDirective {
  /**
   * `contain` narrows the range so -1 -> 1 is spent while the element is
   * actually on screen, rather than including the approach and the exit. Use it
   * for something short whose drift should be fully spent in view.
   */
  @Input() appScrollDrift: 'cross' | 'contain' | '' = 'cross';

  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly zone = inject(NgZone);
  private readonly smoothScroll = inject(SmoothScrollService);

  /** Cached geometry — see ScrollSceneDirective for why this is not per-frame. */
  private top = 0;
  private height = 0;
  private viewport = 0;

  constructor() {
    afterNextRender(() => this.start());
  }

  private start(): void {
    const node: HTMLElement = this.element.nativeElement;

    // At rest the element must sit exactly where it was laid out, so the rest
    // value is the midpoint of the range, not its start.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.style.setProperty('--d', '0');
      return;
    }

    this.zone.runOutsideAngular(() => {
      let unsubscribe: (() => void) | undefined;

      const measure = () => {
        const rect = node.getBoundingClientRect();
        this.top = rect.top + window.scrollY;
        this.height = rect.height;
        this.viewport = window.innerHeight;
        this.update(node, window.scrollY);
      };

      const resizeObserver = new ResizeObserver(measure);
      resizeObserver.observe(node);
      window.addEventListener('resize', measure, { passive: true });

      // Subscribed only while near the viewport: a listing page can hold
      // twenty of these, and twenty idle scroll subscriptions is twenty too
      // many.
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && !unsubscribe) {
              measure();
              unsubscribe = this.smoothScroll.onScroll((scrollY) => this.update(node, scrollY));
            } else if (!entry.isIntersecting && unsubscribe) {
              unsubscribe();
              unsubscribe = undefined;
            }
          }
        },
        { rootMargin: '15% 0px' }
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
    const top = this.top - scrollY;
    const viewport = this.viewport;

    // Travel for 'cross': the element enters at the bottom and leaves at the
    // top, so its top edge moves from `viewport` to `-height`.
    let travel = viewport + this.height;
    let travelled = viewport - top;

    if (this.appScrollDrift === 'contain') {
      // Spent between "bottom edge just inside" and "top edge just leaving".
      travel = viewport - this.height;
      travelled = viewport - this.height - top;
      // An element taller than the viewport has no contained range at all;
      // fall back to crossing rather than dividing by a negative.
      if (travel <= 0) {
        travel = viewport + this.height;
        travelled = viewport - top;
      }
    }

    const progress = clamp(travelled / travel, 0, 1);
    node.style.setProperty('--d', (progress * 2 - 1).toFixed(4));
  }
}

function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}
