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
        this.targetX = event.clientX;
        this.targetY = event.clientY;
        ring.classList.add('is-visible');

        const host = (event.target as HTMLElement | null)?.closest?.('[data-cursor]');
        const next = host?.getAttribute('data-cursor') ?? null;
        if (next !== this.current) {
          this.current = next;
          label.textContent = next ?? '';
          ring.classList.toggle('is-labelled', !!next);
        }
      };

      const onLeave = () => ring.classList.remove('is-visible');

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
