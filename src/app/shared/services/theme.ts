import { Injectable, signal, computed, inject, DOCUMENT } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'io-theme';

/**
 * Writes `data-theme` on <html>, which is the single switch the token layer
 * in src/styles/tokens.css keys off. Dark is the default; an explicit choice
 * is remembered, and until one is made the OS preference wins.
 *
 * index.html applies the same resolution inline before first paint, so this
 * service adopts whatever is already on the element rather than causing a
 * second, visible flip.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  private readonly current = signal<Theme>(this.initial());

  readonly theme = this.current.asReadonly();
  readonly isDark = computed(() => this.current() === 'dark');

  set(theme: Theme): void {
    this.current.set(theme);
    this.document.documentElement.setAttribute('data-theme', theme);
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Private browsing or blocked storage — the theme still applies for
      // this visit, it just will not be remembered.
    }
  }

  toggle(): void {
    this.set(this.current() === 'dark' ? 'light' : 'dark');
  }

  private initial(): Theme {
    const applied = this.document.documentElement.getAttribute('data-theme');
    if (applied === 'light' || applied === 'dark') {
      return applied;
    }
    return 'dark';
  }
}
