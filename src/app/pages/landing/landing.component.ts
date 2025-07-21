import { Component } from '@angular/core';
import { Jumbotron } from '../../shared/jumbotron/jumbotron';
import { AboutSectionComponent } from '../../components/landing/about-section/about-section.component';
import { ProjectsSectionComponent } from '../../components/landing/projects-section/projects-section.component';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    standalone: true,
    imports: [Jumbotron, AboutSectionComponent, ProjectsSectionComponent]
})
export class LandingComponent {}
