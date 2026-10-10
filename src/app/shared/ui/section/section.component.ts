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
      @if (scene) {
        <!-- The hero's orbit, carried down the page. Decorative and inert; it
             answers the pointer, but not the scroll position — see the scene
             notes in styles.scss for why. -->
        <div class="section-atmosphere" aria-hidden="true">
          <div class="section-atmosphere__ring"></div>
        </div>
      }
      <div
        class="mx-auto w-full max-w-content px-5 sm:px-8"
        [class.scene-layer]="scene">
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
  /**
   * Makes the section a full-viewport scroll scene: at least 100svh tall,
   * content centred in it, with an atmosphere layer behind.
   *
   * Self-contained — it needs no companion directive on the host. It used to
   * require `appScrollScene="traverse"` to supply the progress its layers
   * drifted on; those layers no longer read the scroll position at all.
   */
  @Input() scene = false;

  private static readonly spacings = {
    tight: 'py-12 sm:py-16',
    default: 'py-16 sm:py-24',
    loose: 'py-20 sm:py-32',
  };

  get classes(): string {
    return [
      SectionComponent.spacings[this.spacing],
      // min-h rather than h: a section whose content is taller than the screen
      // (the work grid on a phone is roughly three) has to grow, not clip.
      this.scene ? 'relative flex min-h-[100svh] items-center overflow-hidden' : '',
      this.surface,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
