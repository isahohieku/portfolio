import {
  Component,
  HostListener,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  inject,
  signal,
  afterNextRender,
  Injector,
  DOCUMENT,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../shared/services/theme';
import { IconComponent } from '../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, RouterLink, RouterLinkActive],
})
export class HeaderComponent {
  private readonly document = inject(DOCUMENT);
  private readonly theme = inject(ThemeService);
  private readonly injector = inject(Injector);

  @ViewChild('panel') private panel?: ElementRef<HTMLElement>;
  @ViewChild('menuButton') private menuButton?: ElementRef<HTMLButtonElement>;

  readonly menuOpen = signal(false);
  readonly isDark = this.theme.isDark;

  toggleTheme(): void {
    this.theme.toggle();
  }

  openMenu(): void {
    this.menuOpen.set(true);
    this.lockScroll(true);
    // Move focus into the panel so the dialog is where the keyboard is.
    // This has to wait for the render, not just a microtask: the panel lives
    // inside an @if, so it does not exist until change detection has run.
    afterNextRender(
      () => this.panel?.nativeElement.querySelector<HTMLElement>('a, button')?.focus(),
      { injector: this.injector }
    );
  }

  closeMenu(): void {
    if (!this.menuOpen()) {
      return;
    }
    this.menuOpen.set(false);
    this.lockScroll(false);
    this.menuButton?.nativeElement.focus();
  }

  /**
   * Keeps Tab inside the open panel. Without this the dialog claimed
   * `aria-modal` while letting focus walk straight out into the page behind it.
   */
  onPanelKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Tab' || !this.panel) {
      return;
    }

    const focusable = Array.from(
      this.panel.nativeElement.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
    if (focusable.length === 0) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = this.document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.document.defaultView && this.document.defaultView.innerWidth > 768) {
      this.closeMenu();
    }
  }

  /**
   * Set on <html>, not <body>. The old `body.menu-open` rule lived in this
   * component's emulated-encapsulation stylesheet, so it carried a scoping
   * attribute body never had and the scroll lock never actually applied.
   */
  private lockScroll(locked: boolean): void {
    this.document.documentElement.classList.toggle('io-scroll-locked', locked);
  }
}
