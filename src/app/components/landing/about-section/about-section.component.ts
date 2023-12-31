import { Component, OnInit } from '@angular/core';
import { flyIn } from 'src/app/shared/animations/fly-in';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.scss'],
  animations: [
    flyIn
  ]
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
