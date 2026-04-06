import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ProjectService, ProjectData } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ScrollTopModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: ProjectData[] = [];

  constructor(
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.projects = this.projectService.getProjects();
  }

  viewProjectDetails(project: ProjectData) {
    this.router.navigate(['/works', project.id]);
  }

  getProjectThumbnail(project: ProjectData): string {
    return project.images.length > 0 ? project.images[0].imageUrl : '';
  }
}
