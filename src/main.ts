import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      // Cross-fades the outlet between pages. Scroll placement is handled by
      // RouteScrollService rather than withInMemoryScrolling, which would
      // fight Lenis for the scroll position.
      withViewTransitions({ skipInitialTransition: true })
    ),
    provideAnimations(),
    provideHttpClient()
  ]
});
