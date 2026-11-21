import { ElementRef, Directive, Input, afterNextRender, DestroyRef, inject, NgZone } from '@angular/core';

/**
 * Counts the numerals in a figure up to their final value when it scrolls in.
 *
 * It animates the numbers inside whatever string it is given rather than
 * taking a number as input, so a figure like `65 → 5` animates both of
 * its numbers and keep every character around them — the arrow, the unit,
 * the less-than sign and the thousands separator all survive, which matters
 * on a page whose argument is that the figures are quoted exactly.
 *
 * The element is width-locked to its final text before animating. Digits are
 * not equal width in this face, so an unlocked counter reflows the tile on
 * every frame and shoves its neighbours around.
 */
@Directive({
  selector: '[appCountUp]',
  standalone: true,
})
export class CountUpDirective {
  /** Duration in ms. */
  @Input() appCountUp: number | string = 1100;

  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly zone = inject(NgZone);

  private frame = 0;

  constructor() {
    afterNextRender(() => this.prepare());
  }

  private prepare(): void {
    const host: HTMLElement = this.element.nativeElement;
    const final = (host.textContent ?? '').trim();
    // Split into numeric and non-numeric runs, keeping both.
    const parts = final.split(/(\d[\d,]*)/);
    const hasNumbers = parts.some((part) => /^\d/.test(part));

    if (!hasNumbers || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            this.run(host, parts, final);
          }
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(host);
    this.destroyRef.onDestroy(() => {
      observer.disconnect();
      if (this.frame) {
        cancelAnimationFrame(this.frame);
      }
    });
  }

  private run(host: HTMLElement, parts: string[], final: string): void {
    // Lock the box before the digits start changing.
    host.style.minWidth = `${host.getBoundingClientRect().width}px`;
    host.style.display = 'inline-block';

    const targets = parts.map((part) =>
      /^\d/.test(part) ? Number(part.replace(/,/g, '')) : null
    );
    const grouped = parts.map((part) => part.includes(','));
    const duration = Number(this.appCountUp) || 1100;
    const start = performance.now();

    this.zone.runOutsideAngular(() => {
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        // Same exponential ease-out the rest of the page uses.
        const eased = 1 - Math.pow(2, -10 * t);

        host.textContent = parts
          .map((part, i) => {
            const target = targets[i];
            if (target === null) {
              return part;
            }
            const current = Math.round(target * (t >= 1 ? 1 : eased));
            return grouped[i] ? current.toLocaleString('en-US') : String(current);
          })
          .join('');

        if (t < 1) {
          this.frame = requestAnimationFrame(step);
        } else {
          // Never leave a rounded approximation on screen: restore the exact
          // string the service supplied.
          host.textContent = final;
          host.style.minWidth = '';
          this.frame = 0;
        }
      };

      this.frame = requestAnimationFrame(step);
    });
  }
}
