import { Component, OnInit } from '@angular/core';
import { flyIn } from 'src/app/shared/animations/fly-in';
import { InViewDirective } from '../../../shared/directives/in-view/in-view.directive';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-about-section',
    templateUrl: './about-section.component.html',
    styleUrls: ['./about-section.component.scss'],
    animations: [
        flyIn
    ],
    standalone: true,
    imports: [InViewDirective, RouterLink]
})
export class AboutSectionComponent implements OnInit {
  isInView = false;

  constructor() { }

  ngOnInit() {
  }

  inView() {
    this.isInView = true;
  }

}
