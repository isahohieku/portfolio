import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { flyIn } from 'src/app/shared/animations/fly-in';
import { InViewDirective } from '../../../shared/directives/in-view/in-view.directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  animations: [
    flyIn
  ],
  standalone: true,
  imports: [InViewDirective, RouterLink]
})
export class AboutSectionComponent {
  isInView = false;

  private cdr = inject(ChangeDetectorRef);

  inView() {
    this.isInView = true;
    this.cdr.detectChanges(); 
  }

}
