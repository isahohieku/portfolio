import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectLogoComponent } from '../project-logo/project-logo.component';
import { ProjectData } from '../../services/project.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgStyle, RouterLink, ProjectLogoComponent],
})
export class ProjectCardComponent {
  @Input() project!: ProjectData;

  /**
   * The card only promises a case study where one exists. A written writeup
   * counts, and so does a gallery — but three of the seven projects have
   * neither, and those say "View project" instead.
   */
  get hasCaseStudy(): boolean {
    return !!this.project.caseStudy || this.project.images.length > 0;
  }
}
