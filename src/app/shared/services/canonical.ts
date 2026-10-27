import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * The canonical URL, per route.
 *
 * index.html declares one canonical for the whole app, so before this every
 * route (/about, /works, each case study) told a crawler that it was a copy
 * of the home page. Each navigation now points the canonical link and og:url
 * at the page's own path, without its query or fragment.
 *
 * Pages can refine that while they activate, which happens before
 * NavigationEnd: a project reached by its numeric id names its slug URL
 * instead, and a not-found state asks not to be indexed at all. Both are
 * cleared when the next navigation starts, so neither can leak onto another
 * page.
 */
@Injectable({ providedIn: 'root' })
export class CanonicalService {
  private static readonly origin = 'https://isahohieku.com';

  private readonly router = inject(Router);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  /** A path set by the activating page, preferred over the router's. */
  private override: string | null = null;

  start(): void {
    this.router.events
      .pipe(filter((e): e is NavigationStart => e instanceof NavigationStart))
      .subscribe(() => {
        this.override = null;
        this.meta.removeTag('name="robots"');
      });

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((event) => {
        const tree = this.router.parseUrl(event.urlAfterRedirects);
        tree.queryParams = {};
        tree.fragment = null;
        this.apply(this.override ?? this.router.serializeUrl(tree));
      });
  }

  /** Names the canonical path for the page now activating. */
  set(path: string): void {
    this.override = path;
    this.apply(path);
  }

  /** For not-found states, which the SPA shell serves with a 200. */
  noindex(): void {
    this.meta.updateTag({ name: 'robots', content: 'noindex' });
  }

  private apply(path: string): void {
    const url = CanonicalService.origin + (path === '/' ? '/' : path.replace(/\/$/, ''));

    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
    this.meta.updateTag({ property: 'og:url', content: url });
  }
}
