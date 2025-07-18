import { Component } from '@angular/core';
import { MainJumbotronComponent } from '../../components/landing/main-jumbotron/main-jumbotron.component';
import { AboutSectionComponent } from '../../components/landing/about-section/about-section.component';
import { ProjectsSectionComponent } from '../../components/landing/projects-section/projects-section.component';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    standalone: true,
    imports: [MainJumbotronComponent, AboutSectionComponent, ProjectsSectionComponent]
})
export class LandingComponent {}
