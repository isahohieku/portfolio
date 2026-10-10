import { Injectable, NgZone, inject, DestroyRef } from '@angular/core';
import Lenis from 'lenis';

/**
 * Scroll smoothing.
 *
 * The section scenes read their progress from scroll position, and native
 * wheel scrolling advances that in coarse jumps — the parallax planes step
 * rather than drift. Lenis interpolates the scroll position itself, which is
 * what makes differential motion look like depth instead of like two elements
 * being nudged.
 *
 * It scrolls the real window rather than transforming a wrapper, so
 * getBoundingClientRect stays truthful and ScrollSceneDirective,
 * RevealDirective and IntersectionObserver all keep working untouched.
 *
 * Deliberately not started on touch or under reduced motion. On a phone the
 * native scroller is better than anything re-implemented — it carries the
 * platform's own momentum and rubber-banding — and overriding scroll for
 * someone who asked for less motion is exactly backwards.
 */
@Injectable({ providedIn: 'root' })
export class SmoothScrollService {
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  private lenis?: Lenis;
  private frame = 0;

  /**
   * Everything that has to move in step with the scroll position.
   *
   * Scenes used to listen to `scroll` and schedule their own
   * requestAnimationFrame, which put their transforms one frame behind the
   * page they sit on. A pinned scene hides that — it is not moving — but a
   * section that scrolls with the document shows it as judder, because the
   * document is composited this frame and the layer inside it catches up on
   * the next. Lenis emits `scroll` from inside its own rAF, before paint, so
   * driving subscribers from here puts both on the same frame.
   */
  private readonly subscribers = new Set<(scrollY: number) => void>();
  private nativeFrame = 0;
  private nativeListening = false;

  start(): void {
    if (this.lenis || typeof window === 'undefined') {
      return;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduced || coarse) {
      // No Lenis, but subscribers still need a tick: the native scroller runs
      // this scene work one frame late, which is the best available there.
      this.listenNatively();
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.lenis = new Lenis({
        // Long enough to read as easing, short enough that a decisive flick
        // still lands where the visitor meant it to.
        duration: 1.05,
        // Exponential ease-out: fast departure, long settle.
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      this.lenis.on('scroll', () => this.emit(window.scrollY));

      const raf = (time: number) => {
        this.lenis?.raf(time);
        this.frame = requestAnimationFrame(raf);
      };
      this.frame = requestAnimationFrame(raf);
    });

    this.destroyRef.onDestroy(() => this.stop());
  }

  /**
   * Subscribe to scroll, ticked in the same frame the position changes.
   * Returns an unsubscribe. The callback is handed the current offset so it
   * never has to read `scrollY` itself — a read after a style write forces
   * the layout flush this is trying to avoid.
   */
  onScroll(fn: (scrollY: number) => void): () => void {
    this.subscribers.add(fn);
    if (!this.lenis) {
      this.listenNatively();
    }
    return () => this.subscribers.delete(fn);
  }

  private emit(scrollY: number): void {
    for (const fn of this.subscribers) {
      fn(scrollY);
    }
  }

  private listenNatively(): void {
    if (this.nativeListening || typeof window === 'undefined') {
      return;
    }
    this.nativeListening = true;

    this.zone.runOutsideAngular(() => {
      const onScroll = () => {
        if (this.nativeFrame) {
          return;
        }
        this.nativeFrame = requestAnimationFrame(() => {
          this.nativeFrame = 0;
          this.emit(window.scrollY);
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        if (this.nativeFrame) {
          cancelAnimationFrame(this.nativeFrame);
        }
      });
    });
  }

  /** False on touch and under reduced motion, where the native scroller wins. */
  get isRunning(): boolean {
    return !!this.lenis;
  }

  /** Used by in-page jumps so the skip link and anchors stay in step. */
  scrollTo(target: string | HTMLElement | number, immediate = false): void {
    this.lenis?.scrollTo(target, { immediate });
  }

  private stop(): void {
    if (this.frame) {
      cancelAnimationFrame(this.frame);
      this.frame = 0;
    }
    this.lenis?.destroy();
    this.lenis = undefined;
  }
}
