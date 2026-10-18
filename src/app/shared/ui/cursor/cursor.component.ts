import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  afterNextRender,
  DestroyRef,
  inject,
  NgZone,
} from '@angular/core';

/**
 * A trailing cursor ring that names what is under it.
 *
 * Elements opt in with `data-cursor="Drag"`; the ring grows and prints that
 * word. It is not decoration — the globe accepts a drag and nothing on screen
 * says so, and the same is true of the copy control. This is the cheapest
 * honest way to make those affordances legible on a page that cannot rely on
 * hover for anything load-bearing.
 *
 * The native cursor is deliberately NOT hidden. Replacing it entirely is the
 * usual signature of this technique, but the system cursor honours the
 * visitor's own size and contrast settings and a drawn substitute does not.
 * The ring reads as craft either way; the arrow underneath costs nothing.
 *
 * Pointer-fine only. On touch the component never renders at all.
 */
@Component({
  selector: 'app-cursor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div #ring class="cursor" aria-hidden="true">
      <span class="cursor__ring"></span>
      <span class="cursor__pill"><span #label class="cursor__label"></span></span>
    </div>
  `,
  styles: [
    `
      :host {
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        pointer-events: none;
        z-index: 1000;
      }

      @media (pointer: coarse) {
        :host {
          display: none;
        }
      }

      .cursor {
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
        user-select: none;
        opacity: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        will-change: transform;
        transition: opacity var(--io-duration-fast) var(--io-ease);
      }

      .cursor.is-visible {
        opacity: 1;
      }

      .cursor__ring {
        position: absolute;
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--io-radius-full);
        border: 1px solid var(--io-color-text-neutral-variant);
        opacity: 0.45;
        transition:
          transform var(--io-duration-base) var(--io-ease-out),
          opacity var(--io-duration-base) var(--io-ease-out),
          border-color var(--io-duration-base) var(--io-ease-out);
        transform: scale(1);
      }

      .cursor.is-labelled .cursor__ring {
        opacity: 0;
        transform: scale(1.6);
      }

      .cursor__pill {
        position: absolute;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.3125rem 0.6875rem;
        border-radius: var(--io-radius-full);
        background: var(--io-color-background-brand-bold);
        color: var(--io-color-text-brand-on-bold);
        box-shadow: var(--io-shadow-raised);
        opacity: 0;
        transform: scale(0.6);
        pointer-events: none;
        white-space: nowrap;
        transition:
          transform var(--io-duration-base) var(--io-ease-out),
          opacity var(--io-duration-base) var(--io-ease-out);
      }

      .cursor.is-labelled .cursor__pill {
        opacity: 1;
        transform: scale(1);
      }

      .cursor__label {
        font-family: inherit;
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1;
        letter-spacing: 0.02em;
      }
    `,
  ],
})
export class CursorComponent {
  @ViewChild('ring') private ring?: ElementRef<HTMLElement>;
  @ViewChild('label') private label?: ElementRef<HTMLElement>;

  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  private x = 0;
  private y = 0;
  private targetX = 0;
  private targetY = 0;
  private frame = 0;
  private current: string | null = null;
  private initialized = false;

  constructor() {
    afterNextRender(() => this.bind());
  }

  private bind(): void {
    const ring = this.ring?.nativeElement;
    const label = this.label?.nativeElement;
    if (!ring || !label) {
      return;
    }

    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) {
      return;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // With motion reduced the ring still labels affordances, it just tracks
    // the pointer exactly instead of easing toward it.
    const ease = reduced ? 1 : 0.18;

    this.zone.runOutsideAngular(() => {
      const onMove = (event: PointerEvent) => {
        if (!this.initialized) {
          this.x = this.targetX = event.clientX;
          this.y = this.targetY = event.clientY;
          this.initialized = true;
        } else {
          this.targetX = event.clientX;
          this.targetY = event.clientY;
        }
        ring.classList.add('is-visible');

        const host = (event.target as HTMLElement | null)?.closest?.('[data-cursor]');
        const next = host?.getAttribute('data-cursor') ?? null;
        if (next !== this.current) {
          this.current = next;
          label.textContent = next ?? '';
          ring.classList.toggle('is-labelled', !!next);
        }
      };

      const onLeave = () => {
        ring.classList.remove('is-visible');
        this.initialized = false;
      };

      const tick = () => {
        this.x += (this.targetX - this.x) * ease;
        this.y += (this.targetY - this.y) * ease;
        ring.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) translate(-50%, -50%)`;
        this.frame = requestAnimationFrame(tick);
      };

      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerleave', onLeave);
      window.addEventListener('blur', onLeave);
      this.frame = requestAnimationFrame(tick);

      this.destroyRef.onDestroy(() => {
        window.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerleave', onLeave);
        window.removeEventListener('blur', onLeave);
        cancelAnimationFrame(this.frame);
      });
    });
  }
}
