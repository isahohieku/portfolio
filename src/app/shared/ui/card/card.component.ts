import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

export type CardTone = 'raised' | 'minimal' | 'brand' | 'bare';

/**
 * The section-card shape the layout is built from: a large radius, a raised
 * surface, and the inset-hairline elevation recipe. Padding is opt-out via
 * `padded` for cards whose content bleeds to the edge (an image or a tinted
 * block).
 */
@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="classes">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class CardComponent {
  @Input() tone: CardTone = 'raised';
  @Input() padded = true;

  private static readonly tones: Record<CardTone, string> = {
    raised: 'bg-surface-minimal border border-subtle shadow-raised',
    minimal: 'bg-surface-minimal border border-subtle',
    brand: 'bg-brand-minimal border border-brand-subtle',
    bare: '',
  };

  get classes(): string {
    return [
      'rounded-x-large overflow-hidden',
      CardComponent.tones[this.tone],
      this.padded ? 'p-6 sm:p-8' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
