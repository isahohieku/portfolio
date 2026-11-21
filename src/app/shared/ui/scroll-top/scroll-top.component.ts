import { Component, ChangeDetectionStrategy, HostListener, inject, signal } from '@angular/core';
import { SmoothScrollService } from '../../services/smooth-scroll';
import { IconComponent } from '../icon/icon.component';

/** Same threshold PrimeNG's ScrollTop used, which this replaces. */
const THRESHOLD = 400;

/**
 * Back-to-top button for the long pages. Goes through Lenis when it is
 * driving the page, since a native scrollTo underneath it is overwritten on
 * the next frame; otherwise the native scroller, instant under reduced motion.
 */
@Component({
  selector: 'app-scroll-top',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <button type="button" class="scroll-top" [class.is-visible]="visible()" [attr.tabindex]="visible() ? null : -1"
      [attr.aria-hidden]="visible() ? null : 'true'" aria-label="Back to top" (click)="toTop()">
      <app-icon name="arrow-up" />
    </button>
  `,
  styles: [
    `
      .scroll-top {
        position: fixed;
        right: 1.25rem;
        bottom: 1.25rem;
        z-index: 40;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3rem;
        height: 3rem;
        background: var(--io-color-background-neutral-minimal);
        border: var(--io-border-width) solid var(--io-color-border-neutral-subtle);
        border-radius: var(--io-radius-full);
        box-shadow: var(--io-shadow-raised);
        color: var(--io-color-text-neutral);
        opacity: 0;
        visibility: hidden;
        transition:
          background var(--io-duration-base) var(--io-ease),
          opacity var(--io-duration-base) var(--io-ease),
          visibility var(--io-duration-base) var(--io-ease);
      }

      .scroll-top.is-visible {
        opacity: 1;
        visibility: visible;
      }

      .scroll-top:hover {
        background: var(--io-color-background-neutral-subtle);
      }

      .scroll-top:focus-visible {
        outline: var(--io-border-width-focused) solid var(--io-color-border-focused);
        outline-offset: 2px;
      }
    `,
  ],
})
export class ScrollTopComponent {
  private readonly smoothScroll = inject(SmoothScrollService);

  protected readonly visible = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.visible.set(window.scrollY > THRESHOLD);
  }

  toTop(): void {
    if (this.smoothScroll.isRunning) {
      this.smoothScroll.scrollTo(0);
      return;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }
}
