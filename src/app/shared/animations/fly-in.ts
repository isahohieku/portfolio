import { animate, state, style, transition, trigger } from '@angular/animations';

export const flyIn = trigger('flyIn', [
    state('out', style({ transform: 'translateY(100px)', opacity: 0 })),
    state('in', style({ transform: 'translateY(0)', opacity: 1 })),
    transition('out => in', [
      animate(500)
    ])
  ]);

