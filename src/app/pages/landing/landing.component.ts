import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { MainJumbotronComponent } from '../../components/landing/main-jumbotron/main-jumbotron.component';
import { AboutSectionComponent } from '../../components/landing/about-section/about-section.component';
import { ProjectsSectionComponent } from '../../components/landing/projects-section/projects-section.component';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
    standalone: true,
    imports: [HeaderComponent, MainJumbotronComponent, AboutSectionComponent, ProjectsSectionComponent, FooterComponent]
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
