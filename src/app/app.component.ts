import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingService } from './shared/services/loading';
import { SmoothScrollService } from './shared/services/smooth-scroll';
import { RouteScrollService } from './shared/services/route-scroll';
import { CursorComponent } from './shared/ui/cursor/cursor.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <!-- Global Loading Spinner -->
    @if (loadingService.isLoading()) {
    <div
      class="fixed inset-0 z-[60] flex items-center justify-center bg-black/60"
      role="status"
      aria-live="polite">
      <p-progressSpinner
        strokeWidth="3"
        fill="transparent"
        animationDuration="1s">
      </p-progressSpinner>
      <span class="sr-only">Loading</span>
    </div>
    }

    <app-cursor />
    <app-header />
    <main id="main" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer />

    <p-toast position="top-right"></p-toast>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ToastModule,
    ProgressSpinnerModule,
    CursorComponent,
  ],
  providers: [MessageService]
})
export class AppComponent {
  loadingService = inject(LoadingService);

  private readonly smoothScroll = inject(SmoothScrollService);
  private readonly routeScroll = inject(RouteScrollService);

  constructor() {
    // Declines to start on touch and under reduced motion; see the service.
    this.smoothScroll.start();
    this.routeScroll.start();
  }
}
