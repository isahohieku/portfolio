import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  afterNextRender,
  DestroyRef,
  inject,
  NgZone,
} from '@angular/core';

const GLYPHS = '01XYZ_/<>[*#~%&+=';

@Directive({
  selector: '[appScrambleReveal]',
  standalone: true,
})
export class ScrambleRevealDirective {
  /** Duration in ms */
  @Input() appScrambleReveal: number | string = 600;
  @Input() scrambleOnHover = false;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);
  private readonly zone = inject(NgZone);

  private originalText = '';
  private displaySpan: HTMLElement | null = null;
  private animFrameId = 0;
  private isAnimating = false;

  constructor() {
    afterNextRender(() => this.setup());
  }

  private setup(): void {
    const host = this.el.nativeElement;
    this.originalText = (host.textContent ?? '').replace(/\s+/g, ' ').trim();
    if (!this.originalText) return;

    this.renderer.setAttribute(host, 'aria-label', this.originalText);
    this.renderer.addClass(host, 'scramble-reveal');

    // Create container for animated characters with aria-hidden
    this.displaySpan = this.renderer.createElement('span');
    this.renderer.setAttribute(this.displaySpan, 'aria-hidden', 'true');
    this.displaySpan!.textContent = this.originalText;

    this.renderer.setProperty(host, 'textContent', '');
    this.renderer.appendChild(host, this.displaySpan);

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reducedMotion) {
      this.zone.runOutsideAngular(() => this.scramble());
    }

    if (this.scrambleOnHover) {
      const onEnter = () => {
        if (!this.isAnimating && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          this.zone.runOutsideAngular(() => this.scramble());
        }
      };
      host.addEventListener('pointerenter', onEnter);
      this.destroyRef.onDestroy(() => host.removeEventListener('pointerenter', onEnter));
    }

    this.destroyRef.onDestroy(() => {
      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
      }
    });
  }

  private scramble(): void {
    if (!this.displaySpan || !this.originalText) return;
    this.isAnimating = true;

    const duration = Number(this.appScrambleReveal) || 600;
    const startTime = performance.now();
    const length = this.originalText.length;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Characters before resolvedIndex have resolved; remaining are scrambled
      const resolvedIndex = Math.floor(progress * length);

      let output = '';
      for (let i = 0; i < length; i++) {
        const char = this.originalText[i];
        if (char === ' ') {
          output += ' ';
        } else if (i < resolvedIndex) {
          output += char;
        } else {
          output += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      this.displaySpan!.textContent = output;

      if (progress < 1) {
        this.animFrameId = requestAnimationFrame(step);
      } else {
        this.displaySpan!.textContent = this.originalText;
        this.isAnimating = false;
        this.animFrameId = 0;
      }
    };

    this.animFrameId = requestAnimationFrame(step);
  }
}
