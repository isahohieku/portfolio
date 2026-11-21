import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SmoothScrollService } from './shared/services/smooth-scroll';
import { RouteScrollService } from './shared/services/route-scroll';
import { CanonicalService } from './shared/services/canonical';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-header />
    <main id="main" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
  ],
})
export class AppComponent {
  private readonly smoothScroll = inject(SmoothScrollService);
  private readonly routeScroll = inject(RouteScrollService);
  private readonly canonical = inject(CanonicalService);

  constructor() {
    // Declines to start on touch and under reduced motion; see the service.
    this.smoothScroll.start();
    this.routeScroll.start();
    this.canonical.start();
  }
}
