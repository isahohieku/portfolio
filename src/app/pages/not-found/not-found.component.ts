import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

/**
 * A real 404.
 *
 * Replaces a wildcard route that redirected to /under-construction and then rendered
 * the About component: a mistyped or stale link served the resume from a URL reading
 * "under construction", with no acknowledgement that the address was wrong.
 */
@Component({
  selector: 'app-not-found',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent {
  constructor() {
    inject(Title).setTitle('Page not found | Isah Ohieku');
  }
}
