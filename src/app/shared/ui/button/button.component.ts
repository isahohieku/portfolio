import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * The single call-to-action shape for the site.
 *
 * Replaces five divergent hand-written utility strings, one of which relied on
 * `w-68` — an undefined utility that compiled to nothing, so the primary CTAs
 * had no base width and shrank at >=640px.
 *
 * Renders an <a routerLink>, an <a href> or a <button> depending on which of
 * `routerLink` / `href` is supplied, so a CTA is never a div with a click
 * handler. Every size clears a 44px tap target.
 */
@Component({
  selector: 'app-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgTemplateOutlet],
  template: `
    @if (routerLink) {
      <a [routerLink]="routerLink" [fragment]="fragment" [class]="classes" [attr.aria-label]="ariaLabel">
        <ng-container *ngTemplateOutlet="content"></ng-container>
      </a>
    } @else if (href) {
      <a
        [href]="href"
        [attr.target]="external ? '_blank' : null"
        [attr.rel]="external ? 'noopener noreferrer' : null"
        [attr.download]="downloadAttr"
        [class]="classes"
        [attr.aria-label]="ariaLabel">
        <ng-container *ngTemplateOutlet="content"></ng-container>
      </a>
    } @else {
      <button
        [type]="type"
        [class]="classes"
        [disabled]="disabled"
        [attr.aria-label]="ariaLabel">
        <ng-container *ngTemplateOutlet="content"></ng-container>
      </button>
    }

    <ng-template #content>
      @if (icon) {
        <i [class]="icon" aria-hidden="true"></i>
      }
      <ng-content></ng-content>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
    `,
  ],
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() routerLink: string | unknown[] | null = null;
  /** With routerLink: the in-page anchor, as the header's Contact link uses. */
  @Input() fragment: string | undefined = undefined;
  @Input() href: string | null = null;
  /** Opens in a new tab with rel="noopener noreferrer". */
  @Input() external = false;
  /**
   * `true` downloads under the server's filename; a string sets the saved
   * filename. The footer's resume link named its file before it moved onto
   * this component, and a CTA should not lose that by being systematised.
   */
  @Input() download: boolean | string = false;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' = 'button';
  /** A PrimeIcons class, rendered before the label and hidden from the a11y tree. */
  @Input() icon: string | null = null;
  /** Required when the content is an icon alone. */
  @Input() ariaLabel: string | null = null;

  /** '' for a bare download attribute, the filename when one is given. */
  get downloadAttr(): string | null {
    if (!this.download) {
      return null;
    }
    return typeof this.download === 'string' ? this.download : '';
  }

  private static readonly base =
    'inline-flex items-center justify-center gap-2 rounded-full font-medium ' +
    'min-h-[44px] no-underline text-center ' +
    'transition-colors duration-base ease-io ' +
    'disabled:opacity-50 disabled:pointer-events-none';

  private static readonly variants: Record<ButtonVariant, string> = {
    // Saturated yellow fill, dark text — 13.4:1.
    primary: 'bg-brand text-on-brand hover:bg-brand-hovered active:bg-brand-pressed shadow-bevel',
    secondary:
      'bg-transparent text-body border border-moderate hover:bg-surface-minimal ' +
      'hover:border-bold active:bg-surface-subtle',
    ghost: 'bg-transparent text-muted hover:text-body hover:bg-surface-minimal',
  };

  private static readonly sizes: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-base sm:text-lg',
  };

  get classes(): string {
    return [
      ButtonComponent.base,
      ButtonComponent.variants[this.variant],
      ButtonComponent.sizes[this.size],
    ].join(' ');
  }
}
