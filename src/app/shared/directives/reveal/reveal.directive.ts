import {
  Directive,
  ElementRef,
  Input,
  afterNextRender,
  DestroyRef,
  inject,
  Renderer2,
} from '@angular/core';

/**
 * Reveals an element as it scrolls into view.
 *
 * Applies the class itself rather than emitting an event the caller has to
 * wire to an Angular animation trigger, which is why the previous version was
 * used in exactly one place despite being generally useful.
 *
 * Its `threshold` was 1 — fully visible — with a comment claiming 10%. A
 * section taller than the viewport can never satisfy that, so the reveal only
 * ever fired through the 100ms fallback timer. It is 0.1 here, as intended.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective {
  /** Delay in ms, for staggering siblings. */
  @Input() appReveal: number | string = 0;

  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly renderer = inject(Renderer2);

  constructor() {
    afterNextRender(() => this.observe());
  }

  private observe(): void {
    const node: HTMLElement = this.element.nativeElement;

    // Honour the OS setting here too, not only in CSS: with motion reduced
    // the element should simply be present, never animated into place.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      this.renderer.addClass(node, 'io-revealed');
      return;
    }

    const delay = Number(this.appReveal) || 0;
    this.renderer.addClass(node, 'io-reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }
          this.renderer.setStyle(node, 'transition-delay', `${delay}ms`);
          this.renderer.addClass(node, 'io-revealed');
          observer.disconnect();
        }
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const target = node.classList.contains('io-wipe') && node.parentElement ? node.parentElement : node;
    observer.observe(target);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
