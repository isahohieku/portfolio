import {
  Directive,
  ElementRef,
  afterNextRender,
  DestroyRef,
  inject,
  NgZone,
} from '@angular/core';

/**
 * Writes the pointer's position within the host as `--mx` and `--my`,
 * each running -1 -> 1 from edge to edge, eased so the layers drift rather
 * than snap.
 *
 * Children opt in by reading the variables:
 *
 *   transform: translate(calc(var(--mx) * 14px), calc(var(--my) * 14px));
 *
 * Disabled on coarse pointers and under reduced motion. A touch device has
 * no hover state to react to, so the effect is not merely wasted there — a
 * layer nudged by a tap that then stays nudged looks broken.
 */
@Directive({
  selector: '[appPointerParallax]',
  standalone: true,
})
export class PointerParallaxDirective {
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly zone = inject(NgZone);

  private targetX = 0;
  private targetY = 0;
  private currentX = 0;
  private currentY = 0;
  private frame = 0;

  constructor() {
    afterNextRender(() => this.start());
  }

  private start(): void {
    const node: HTMLElement = this.element.nativeElement;

    const unsupported =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (unsupported) {
      node.style.setProperty('--mx', '0');
      node.style.setProperty('--my', '0');
      return;
    }

    this.zone.runOutsideAngular(() => {
      const onMove = (event: PointerEvent) => {
        const rect = node.getBoundingClientRect();
        this.targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.targetY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
        this.tick(node);
      };

      const onLeave = () => {
        this.targetX = 0;
        this.targetY = 0;
        this.tick(node);
      };

      window.addEventListener('pointermove', onMove, { passive: true });
      node.addEventListener('pointerleave', onLeave);

      this.destroyRef.onDestroy(() => {
        window.removeEventListener('pointermove', onMove);
        node.removeEventListener('pointerleave', onLeave);
        if (this.frame) {
          cancelAnimationFrame(this.frame);
        }
      });
    });
  }

  /** Eases toward the target and stops the loop once it has settled. */
  private tick(node: HTMLElement): void {
    if (this.frame) {
      return;
    }

    const step = () => {
      this.currentX += (this.targetX - this.currentX) * 0.08;
      this.currentY += (this.targetY - this.currentY) * 0.08;

      node.style.setProperty('--mx', this.currentX.toFixed(4));
      node.style.setProperty('--my', this.currentY.toFixed(4));

      const settled =
        Math.abs(this.targetX - this.currentX) < 0.001 &&
        Math.abs(this.targetY - this.currentY) < 0.001;

      this.frame = settled ? 0 : requestAnimationFrame(step);
    };

    this.frame = requestAnimationFrame(step);
  }
}
