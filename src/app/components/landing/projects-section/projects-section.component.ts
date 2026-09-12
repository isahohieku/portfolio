import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectCardComponent } from '../../../shared/project-card/project-card.component';
import { ProjectService, ProjectData } from '../../../services/project.service';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProjectCardComponent, RouterLink]
})
export class ProjectsSectionComponent implements OnInit {
  private projectService = inject(ProjectService);

  /**
   * Drawn from ProjectService rather than a hardcoded array, so the teaser can no
   * longer disagree with /works about what the work is. "See more" now genuinely
   * leads to more.
   */
  projects: ProjectData[] = [];
  totalCount = 0;

  ngOnInit(): void {
    this.projects = this.projectService.getFeatured(3);
    this.totalCount = this.projectService.getProjects().length;
  }
}
