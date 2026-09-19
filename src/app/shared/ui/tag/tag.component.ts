import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

/**
 * A static label — a technology, a date, a role. Not interactive, and
 * deliberately carries no `cursor-pointer` (the old tech chips did, which
 * promised a click that never existed).
 */
@Component({
  selector: 'app-tag',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="classes">
      @if (icon) {
        <img
          [src]="icon"
          alt=""
          aria-hidden="true"
          width="14"
          height="14"
          loading="lazy"
          decoding="async"
          class="h-3.5 w-3.5 object-contain" />
      }
      <ng-content></ng-content>
    </span>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
    `,
  ],
})
export class TagComponent {
  @Input() tone: 'neutral' | 'brand' = 'neutral';
  /** Path to a self-hosted icon in assets/skills. Decorative. */
  @Input() icon: string | null = null;

  get classes(): string {
    const tone =
      this.tone === 'brand'
        ? 'bg-brand-moderate text-brand-text border-brand-subtle'
        : 'bg-surface-subtle text-muted border-subtle';
    return `inline-flex items-center gap-2 rounded-full border px-3 py-1.5 io-body-sm ${tone}`;
  }
}
