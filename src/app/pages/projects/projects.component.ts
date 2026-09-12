import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ScrollTopModule } from 'primeng/scrolltop';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';
import { ProjectService, ProjectData } from '../../services/project.service';
import { ProjectLogoComponent } from '../../shared/project-logo/project-logo.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollTopModule, RouterLink, NgStyle, ProjectLogoComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  private projectService = inject(ProjectService);

  projects: ProjectData[] = [];

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
  }
}
