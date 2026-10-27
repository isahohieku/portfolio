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

interface LetterItem {
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  cx: number;
  cy: number;
}

@Directive({
  selector: '[appSpringLetters]',
  standalone: true,
})
export class SpringLettersDirective {
  @Input() springRadius = 85;
  @Input() springStiffness = 0.15;
  @Input() springDamping = 0.8;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);
  private readonly zone = inject(NgZone);

  private letters: LetterItem[] = [];
  private mouseX = -9999;
  private mouseY = -9999;
  private animId = 0;
  private isHovered = false;

  constructor() {
    afterNextRender(() => this.setup());
  }

  private setup(): void {
    const host = this.el.nativeElement;
    const text = (host.textContent ?? '').replace(/\s+/g, ' ').trim();
    if (!text) return;

    this.renderer.setAttribute(host, 'aria-label', text);
    this.renderer.addClass(host, 'spring-letters');

    const wrapper = this.renderer.createElement('span');
    this.renderer.setAttribute(wrapper, 'aria-hidden', 'true');
    this.renderer.setStyle(wrapper, 'display', 'inline');

    const words = text.split(' ');
    this.letters = [];

    words.forEach((word: string, wIdx: number) => {
      const wordSpan = this.renderer.createElement('span');
      this.renderer.setStyle(wordSpan, 'display', 'inline-block');
      this.renderer.setStyle(wordSpan, 'white-space', 'nowrap');

      for (const char of word) {
        const charSpan = this.renderer.createElement('span');
        this.renderer.setStyle(charSpan, 'display', 'inline-block');
        this.renderer.setStyle(charSpan, 'will-change', 'transform');
        this.renderer.setProperty(charSpan, 'textContent', char);
        this.renderer.appendChild(wordSpan, charSpan);

        this.letters.push({
          el: charSpan,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          cx: 0,
          cy: 0,
        });
      }

      this.renderer.appendChild(wrapper, wordSpan);

      if (wIdx < words.length - 1) {
        const space = this.renderer.createElement('span');
        this.renderer.setProperty(space, 'textContent', ' ');
        this.renderer.appendChild(wrapper, space);
      }
    });

    this.renderer.setProperty(host, 'textContent', '');
    this.renderer.appendChild(host, wrapper);

    // A touch has no pointer to dodge, so a coarse pointer gets the letters
    // set and still, the same as reduced motion.
    const still =
      typeof window !== 'undefined' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !window.matchMedia('(pointer: fine)').matches);
    if (still) return;

    const onPointerMove = (e: MouseEvent) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      if (!this.isHovered) {
        this.isHovered = true;
        this.updateLetterCenters();
      }
    };

    const onPointerLeave = () => {
      this.mouseX = -9999;
      this.mouseY = -9999;
      this.isHovered = false;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);

    this.zone.runOutsideAngular(() => this.loop());

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      if (this.animId) cancelAnimationFrame(this.animId);
    });
  }

  private updateLetterCenters(): void {
    for (const l of this.letters) {
      const rect = l.el.getBoundingClientRect();
      l.cx = rect.left + rect.width / 2;
      l.cy = rect.top + rect.height / 2;
    }
  }

  private loop(): void {
    for (const l of this.letters) {
      if (this.isHovered) {
        const dx = l.cx + l.x - this.mouseX;
        const dy = l.cy + l.y - this.mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.springRadius && dist > 0) {
          const force = (1 - dist / this.springRadius) * 14;
          l.vx += (dx / dist) * force;
          l.vy += (dy / dist) * force;
        }
      }

      // Spring back to (0, 0)
      const ax = -this.springStiffness * l.x;
      const ay = -this.springStiffness * l.y;
      l.vx = (l.vx + ax) * this.springDamping;
      l.vy = (l.vy + ay) * this.springDamping;
      l.x += l.vx;
      l.y += l.vy;

      if (Math.abs(l.x) > 0.05 || Math.abs(l.y) > 0.05 || Math.abs(l.vx) > 0.05) {
        l.el.style.transform = `translate3d(${l.x.toFixed(2)}px, ${l.y.toFixed(2)}px, 0)`;
      } else if (l.x !== 0 || l.y !== 0) {
        l.x = 0;
        l.y = 0;
        l.vx = 0;
        l.vy = 0;
        l.el.style.transform = '';
      }
    }

    this.animId = requestAnimationFrame(() => this.loop());
  }
}
