import { Injectable, NgZone, inject } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SmoothScrollService } from './smooth-scroll';

/**
 * Scroll position across route changes.
 *
 * Angular's built-in `withInMemoryScrolling` drives ViewportScroller, which
 * calls `window.scrollTo` behind Lenis's back — Lenis keeps its own notion of
 * where the page is, so the two disagree and the next wheel tick snaps back.
 * This does the same job through Lenis when it is running and falls back to
 * the native scroller when it is not (touch, reduced motion).
 *
 * Forward navigation lands at the top. Back and forward through history
 * restore where the visitor left that page, which is what the buttons promise.
 */
@Injectable({ providedIn: 'root' })
export class RouteScrollService {
  private readonly router = inject(Router);
  private readonly zone = inject(NgZone);
  private readonly smoothScroll = inject(SmoothScrollService);

  /** Scroll offset per URL, remembered so popstate can put it back. */
  private readonly positions = new Map<string, number>();
  private restoring = false;

  start(): void {
    if (typeof window === 'undefined') {
      return;
    }

    // We place the page ourselves; the browser must not also try.
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    this.router.events
      .pipe(filter((e): e is NavigationStart => e instanceof NavigationStart))
      .subscribe(() => {
        this.positions.set(this.router.url, window.scrollY);
        this.restoring = this.router.getCurrentNavigation()?.trigger === 'popstate';
      });

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((event) => {
        const tree = this.router.parseUrl(event.urlAfterRedirects);
        const fragment = tree.fragment;

        if (fragment) {
          // Let the incoming view render before we go looking for the anchor.
          this.afterRender(() => this.toFragment(fragment));
          return;
        }

        const remembered = this.restoring ? this.positions.get(event.urlAfterRedirects) : undefined;
        this.afterRender(() => this.toOffset(remembered ?? 0));
      });
  }

  private toFragment(fragment: string): void {
    const target = document.getElementById(fragment);
    if (!target) {
      this.toOffset(0);
      return;
    }
    this.smoothScroll.scrollTo(target, true);
    if (!this.smoothScroll.isRunning) {
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }

  private toOffset(top: number): void {
    this.smoothScroll.scrollTo(top, true);
    if (!this.smoothScroll.isRunning) {
      window.scrollTo({ top, left: 0, behavior: 'auto' });
    }
  }

  /**
   * A view transition holds the old frame on screen while the new view is
   * built; jumping the scroller inside that frame is invisible to the
   * visitor, so two frames out is both late enough for the new content to
   * exist and early enough to stay hidden.
   */
  private afterRender(fn: () => void): void {
    this.zone.runOutsideAngular(() => {
      requestAnimationFrame(() => requestAnimationFrame(fn));
    });
  }
}
