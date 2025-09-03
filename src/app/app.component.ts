import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingService } from './shared/services/loading';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <!-- Global Loading Spinner -->
    @if (loadingService.isLoading()) {
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <p-progressSpinner
        strokeWidth="3"
        fill="transparent"
        animationDuration="1s">
      </p-progressSpinner>
    </div>
    }

    <app-header />
    <main>
      <router-outlet />
    </main>
    <app-footer />

    <p-toast position="top-right"></p-toast>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, ToastModule, ProgressSpinnerModule],
  providers: [MessageService]
})
export class AppComponent {
  loadingService = inject(LoadingService);
}
