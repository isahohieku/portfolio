import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FluidCanvasComponent } from '../fluid-canvas/fluid-canvas.component';

/**
 * The atmospheric layer behind the hero.
 *
 * Hosts the organic fluid canvas and hairline concentric arcs.
 * Every layer is decorative and `aria-hidden`; the hero reads identically
 * with all of it removed.
 */
@Component({
  selector: 'app-hero-backdrop',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FluidCanvasComponent],
  template: `
    <div class="hero-backdrop" aria-hidden="true">
      <div class="hero-backdrop__arc hero-backdrop__arc--inner"></div>
      <div class="hero-backdrop__arc hero-backdrop__arc--mid"></div>
      <div class="hero-backdrop__arc hero-backdrop__arc--outer"></div>
      <app-fluid-canvas />
      <div class="hero-backdrop__scrim"></div>
    </div>
  `,
  styles: [
    `
      :host {
        position: absolute;
        inset: 0;
        display: block;
        pointer-events: none;
        overflow: hidden;
      }
    `,
  ],
})
export class HeroBackdropComponent {}
