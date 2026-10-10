import {
  Directive,
  ElementRef,
  Input,
  afterNextRender,
  DestroyRef,
  inject,
} from '@angular/core';

/**
 * Reveals a block of copy line by line, each line rising out of its own mask.
 *
 * This is the gesture netguru.com's homepage repeats: not a paragraph fading
 * up as one box, but its lines arriving in sequence from behind a clipping
 * edge, slowly, with the stagger carrying the rhythm. [appSplitReveal] already
 * does this per character for headings; a character stagger applied to 60 words
 * of body copy reads as a typewriter, which is why body copy needs the line as
 * its unit.
 *
 * Lines are found by measuring, not by guessing. The text is wrapped word by
 * word and words sharing an `offsetTop` are the same rendered line, so the
 * grouping follows whatever the browser actually did with the wrapping — at any
 * width, in any font, after any swap. Each word clips its own inner span, and
 * every word on a line carries that line's delay, so a line rises as one piece
 * while wrapping stays free to change.
 *
 * Accessibility does NOT follow split-reveal, deliberately. That directive has
 * to relabel its host, because forty single-character spans are announced as
 * forty letters — but its remedy only works on a heading, which takes an
 * accessible name. A paragraph does not: `aria-label` on a <p> is ignored by
 * most screen readers, so hiding the generated spans behind one would make the
 * copy unannounced rather than announced once. Splitting per word needs no
 * remedy at all: every word stays whole and separated by a real space, so the
 * text is read exactly as written, and it still copies to the clipboard as a
 * sentence.
 */
@Directive({
  selector: '[appLineReveal]',
  standalone: true,
})
export class LineRevealDirective {
  /** Per-line stagger in ms. */
  @Input() appLineReveal: number | string = 90;

  /** Delay before the first line, for staggering against a sibling heading. */
  @Input() lineRevealDelay: number | string = 0;

  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  /** The word wrappers, in source order, kept for re-grouping on resize. */
  private words: HTMLElement[] = [];
  private revealed = false;

  constructor() {
    afterNextRender(() => this.split());
  }

  private split(): void {
    const host: HTMLElement = this.element.nativeElement;
    const text = (host.textContent ?? '').replace(/\s+/g, ' ').trim();

    // Only plain text is safe to rebuild. A paragraph containing a link or an
    // <em> would lose it, so such a block is left exactly as authored.
    if (!text || host.children.length > 0) {
      return;
    }

    host.classList.add('lines');

    const reduced =
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const frag = document.createDocumentFragment();

    for (const word of text.split(' ')) {
      const wordEl = document.createElement('span');
      wordEl.className = 'lines__word';
      const inner = document.createElement('span');
      inner.className = 'lines__inner';
      inner.textContent = word;
      wordEl.appendChild(inner);
      frag.appendChild(wordEl);
      // A real space between wrappers, so the text still wraps at spaces and
      // still copies to the clipboard as a sentence.
      frag.appendChild(document.createTextNode(' '));
      this.words.push(wordEl);
    }

    host.textContent = '';
    host.appendChild(frag);

    if (reduced || typeof IntersectionObserver === 'undefined') {
      host.classList.add('is-revealed');
      return;
    }

    this.assignLineDelays();

    // Wrapping changes with width and with a font swap, and a stale grouping
    // would stagger words that no longer share a line. Re-grouping is only
    // meaningful before the reveal has played; after it, every line is at rest
    // and the delays no longer matter.
    const resizeObserver = new ResizeObserver(() => {
      if (!this.revealed) {
        this.assignLineDelays();
      }
    });
    resizeObserver.observe(host);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }
          this.revealed = true;
          host.classList.add('is-revealed');
          observer.disconnect();
          resizeObserver.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 }
    );

    observer.observe(host);

    this.destroyRef.onDestroy(() => {
      observer.disconnect();
      resizeObserver.disconnect();
    });
  }

  /**
   * Groups words into rendered lines by their vertical offset and writes one
   * delay per line. Reads are all done before any write, so the loop costs a
   * single layout pass rather than one per word.
   */
  private assignLineDelays(): void {
    const stagger = Number(this.appLineReveal) || 0;
    const base = Number(this.lineRevealDelay) || 0;

    const tops = this.words.map((word) => word.offsetTop);
    let line = -1;
    let previousTop = Number.NaN;

    for (let i = 0; i < this.words.length; i++) {
      // Sub-pixel drift within one line is normal; half a line's height is
      // never crossed inside a line and always crossed between two.
      if (Number.isNaN(previousTop) || Math.abs(tops[i] - previousTop) > 2) {
        line++;
        previousTop = tops[i];
      }
      this.words[i].style.transitionDelay = `${base + line * stagger}ms`;
    }
  }
}
