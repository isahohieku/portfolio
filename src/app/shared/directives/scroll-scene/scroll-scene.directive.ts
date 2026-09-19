import {
  Directive,
  ElementRef,
  afterNextRender,
  DestroyRef,
  inject,
  NgZone,
} from '@angular/core';

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
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly zone = inject(NgZone);

  private frame = 0;
  private active = false;

  constructor() {
    afterNextRender(() => this.start());
  }

  private start(): void {
    const node: HTMLElement = this.element.nativeElement;

    // Reduced motion: leave progress at rest and never listen. The scene
    // still lays out correctly — every transform resolves to its zero state.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.style.setProperty('--p', '0');
      return;
    }

    // Run outside Angular: this fires on every scroll frame and touches
    // nothing the framework needs to know about.
    this.zone.runOutsideAngular(() => {
      const onScroll = () => {
        if (this.frame) {
          return;
        }
        this.frame = requestAnimationFrame(() => {
          this.frame = 0;
          this.update(node);
        });
      };

      // Only listen while the track is anywhere near the viewport.
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            this.active = entry.isIntersecting;
            if (this.active) {
              this.update(node);
              window.addEventListener('scroll', onScroll, { passive: true });
              window.addEventListener('resize', onScroll, { passive: true });
            } else {
              window.removeEventListener('scroll', onScroll);
              window.removeEventListener('resize', onScroll);
            }
          }
        },
        { rootMargin: '20% 0px' }
      );

      observer.observe(node);
      this.update(node);

      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        if (this.frame) {
          cancelAnimationFrame(this.frame);
        }
      });
    });
  }

  private update(node: HTMLElement): void {
    const rect = node.getBoundingClientRect();
    // Distance the track can travel while its sticky child stays pinned.
    const travel = rect.height - window.innerHeight;
    const progress = travel <= 0 ? 0 : clamp(-rect.top / travel, 0, 1);
    node.style.setProperty('--p', progress.toFixed(4));
  }
}

function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}
