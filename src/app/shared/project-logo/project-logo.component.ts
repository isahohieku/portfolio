import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

/**
 * Renders a project logo, falling back to a text wordmark.
 *
 * Two projects have no retrievable logo asset (Hobeei's domain is decommissioned;
 * Desrio's was a LinkedIn CDN URL whose signature expired in March 2023), and any
 * self-hosted file can still 404 after a rename. Either way the tile must stay
 * legible rather than rendering a broken-image glyph, so a missing or failed
 * image degrades to the project's name.
 */
@Component({
  selector: 'app-project-logo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (src && !failed) {
      <img
        [src]="src"
        [alt]="title + ' logo'"
        [attr.width]="width"
        [attr.height]="height"
        loading="lazy"
        decoding="async"
        [class]="imgClass"
        (error)="failed = true" />
    } @else if (showWordmark) {
      <span [class]="wordmarkClass">{{ title }}</span>
    }
  `
})
export class ProjectLogoComponent {
  @Input() src: string | null = null;
  @Input() title = '';
  /** Tailwind classes for the image form. */
  @Input() imgClass = '';
  /** Tailwind classes for the text form. Sized to read as a wordmark, not body copy. */
  @Input() wordmarkClass = '';
  /**
   * Set false where the surrounding tile already displays the project name, so a
   * missing logo leaves the slot empty instead of stating the title twice.
   */
  @Input() showWordmark = true;
  /** Intrinsic hints so the image reserves space before it loads. */
  @Input() width: number | null = null;
  @Input() height: number | null = null;

  failed = false;
}
