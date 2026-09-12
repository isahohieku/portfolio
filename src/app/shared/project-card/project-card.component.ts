import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectLogoComponent } from '../project-logo/project-logo.component';
import { ProjectData } from '../../services/project.service';

@Component({
    selector: 'app-project-card',
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgStyle, RouterLink, ProjectLogoComponent]
})
export class ProjectCardComponent {
  @Input() project!: ProjectData;
}
