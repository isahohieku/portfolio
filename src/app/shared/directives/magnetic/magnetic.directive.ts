import {
  Directive,
  ElementRef,
  Input,
  afterNextRender,
  DestroyRef,
  inject,
  NgZone,
} from '@angular/core';

/**
 * Pulls a control slightly toward the pointer as it approaches.
 *
 * Attaches on the host but moves the host's first child, so the hit area stays
 * exactly where the browser laid it out. A magnetic control that moves its own
 * bounding box chases the cursor away from itself and can oscillate.
 *
 * Pointer-fine only: on a touch device there is no approach to react to, and
 * the listener would cost battery for nothing.
 */
@Directive({
  selector: '[appMagnetic]',
  standalone: true,
})
export class MagneticDirective {
  /** Maximum travel in px. */
  @Input() appMagnetic: number | string = 8;

  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly zone = inject(NgZone);

  constructor() {
    afterNextRender(() => this.bind());
  }

  private bind(): void {
    const host: HTMLElement = this.element.nativeElement;
    const target = (host.firstElementChild as HTMLElement) ?? host;

    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) {
      return;
    }

    const strength = Number(this.appMagnetic) || 8;
    const radius = 90;
    target.classList.add('magnetic__target');

    this.zone.runOutsideAngular(() => {
      const onMove = (event: PointerEvent) => {
        const rect = host.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const distance = Math.hypot(dx, dy);
        const reach = Math.max(rect.width, rect.height) / 2 + radius;

        if (distance > reach) {
          target.style.transform = '';
          return;
        }

        const falloff = 1 - distance / reach;
        target.style.transform =
          `translate3d(${(dx / reach) * strength * falloff * 2}px,` +
          `${(dy / reach) * strength * falloff * 2}px,0)`;
      };

      const reset = () => {
        target.style.transform = '';
      };

      window.addEventListener('pointermove', onMove, { passive: true });
      host.addEventListener('pointerleave', reset);
      // A control that is pulled aside while focused would drift away from its
      // own focus ring, so the keyboard path always resets it.
      host.addEventListener('focusin', reset);

      this.destroyRef.onDestroy(() => {
        window.removeEventListener('pointermove', onMove);
        host.removeEventListener('pointerleave', reset);
        host.removeEventListener('focusin', reset);
      });
    });
  }
}
