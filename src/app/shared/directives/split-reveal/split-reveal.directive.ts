import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  afterNextRender,
  DestroyRef,
  inject,
} from '@angular/core';

/**
 * Reveals a heading one character at a time.
 *
 * Every section previously entered with the same fade-up, which reads as a
 * template rather than as an authored moment. Splitting the heading gives the
 * page one gesture it repeats deliberately, with the stagger doing the work
 * instead of the opacity.
 *
 * Accessibility is the whole difficulty with this technique: a heading cut
 * into forty spans is announced by some screen readers as forty letters. So
 * the original string is set as the host's `aria-label` and the generated
 * markup is hidden from the accessibility tree entirely — the heading keeps
 * exactly one accessible name, which is also what `aria-labelledby` on the
 * surrounding section resolves to.
 *
 * Words are kept whole so wrapping still breaks at spaces rather than
 * mid-word, which is what naive per-character splitting gets wrong.
 */
@Directive({
  selector: '[appSplitReveal]',
  standalone: true,
})
export class SplitRevealDirective {
  /** Per-character stagger in ms. */
  @Input() appSplitReveal: number | string = 18;

  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.split());
  }

  private split(): void {
    const host: HTMLElement = this.element.nativeElement;
    const text = (host.textContent ?? '').replace(/\s+/g, ' ').trim();
    if (!text) {
      return;
    }

    this.renderer.setAttribute(host, 'aria-label', text);
    host.classList.add('split');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stagger = Number(this.appSplitReveal) || 0;

    const frag = document.createDocumentFragment();
    let index = 0;

    for (const word of text.split(' ')) {
      const wordEl = document.createElement('span');
      wordEl.className = 'split__word';

      for (const character of Array.from(word)) {
        const charEl = document.createElement('span');
        charEl.className = 'split__char';
        // The inner element is what moves; the outer one clips it, so each
        // letter rises out of its own line rather than fading in place.
        const inner = document.createElement('span');
        inner.className = 'split__inner';
        inner.textContent = character;
        inner.style.transitionDelay = `${index * stagger}ms`;
        charEl.appendChild(inner);
        wordEl.appendChild(charEl);
        index++;
      }

      frag.appendChild(wordEl);
      frag.appendChild(document.createTextNode(' '));
    }

    host.textContent = '';
    host.appendChild(frag);
    // One aria-hidden on the host's children, not on every span.
    for (const child of Array.from(host.children)) {
      this.renderer.setAttribute(child, 'aria-hidden', 'true');
    }

    if (reduced || typeof IntersectionObserver === 'undefined') {
      host.classList.add('is-revealed');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            host.classList.add('is-revealed');
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(host);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
