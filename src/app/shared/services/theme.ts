import { Injectable, signal, DOCUMENT, inject } from '@angular/core';

export type ThemeType = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private document = inject(DOCUMENT);

  // Signal for reactive theme state
  public currentTheme = signal<ThemeType>('light');

  private readonly THEME_KEY = 'portfolio-theme';
  private readonly LIGHT_THEME = 'lara-light-blue';
  private readonly DARK_THEME = 'lara-dark-blue';

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme() {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as ThemeType;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    this.setTheme(theme);
  }

  setTheme(theme: ThemeType) {
    this.currentTheme.set(theme);
    localStorage.setItem(this.THEME_KEY, theme);

    // Update PrimeNG theme
    this.updatePrimeNGTheme(theme);

    // Update Tailwind dark mode
    if (theme === 'dark') {
      this.document.documentElement.classList.add('dark');
    } else {
      this.document.documentElement.classList.remove('dark');
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  private updatePrimeNGTheme(theme: ThemeType) {
    const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    const themeName = theme === 'dark' ? this.DARK_THEME : this.LIGHT_THEME;

    if (themeLink) {
      themeLink.href = `node_modules/primeng/resources/themes/${themeName}/theme.css`;
    } else {
      // Create theme link if it doesn't exist
      const newThemeLink = this.document.createElement('link');
      newThemeLink.id = 'app-theme';
      newThemeLink.rel = 'stylesheet';
      newThemeLink.href = `node_modules/primeng/resources/themes/${themeName}/theme.css`;
      this.document.head.appendChild(newThemeLink);
    }
  }
}
