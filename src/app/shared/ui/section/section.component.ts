import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

/**
 * One vertical rhythm for the whole site, so section spacing stops being
 * per-template guesswork (the old templates ranged from mt-40 to mt-150, the
 * last of which put a 600px void above the footer on phones).
 *
 * Note the responsive direction: the base value is the PHONE value and `sm:`
 * grows it. The old templates used `sm:` as though it meant "small screens",
 * which inverted roughly thirty declarations.
 */
@Component({
  selector: 'app-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section [class]="classes" [attr.aria-labelledby]="labelledBy">
      <div class="mx-auto w-full max-w-content px-5 sm:px-8">
        <ng-content></ng-content>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class SectionComponent {
  /** `tight` for bands that sit against a neighbouring section. */
  @Input() spacing: 'tight' | 'default' | 'loose' = 'default';
  @Input() labelledBy: string | null = null;
  /** Extra classes for the outer <section> — backgrounds, washes. */
  @Input() surface = '';

  private static readonly spacings = {
    tight: 'py-12 sm:py-16',
    default: 'py-16 sm:py-24',
    loose: 'py-20 sm:py-32',
  };

  get classes(): string {
    return [SectionComponent.spacings[this.spacing], this.surface].filter(Boolean).join(' ');
  }
}
