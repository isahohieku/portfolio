import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectService, ProjectData } from '../../services/project.service';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterModule, GalleriaModule],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  @ViewChild('galleria') galleria: any;
  project: ProjectData | undefined;
  prevProject: ProjectData | undefined;
  nextProject: ProjectData | undefined;
  
  activeIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const id = +idParam;
        this.project = this.projectService.getProjectById(id);
        
        if (this.project) {
          // find prev/next based on position
          const total = this.projectService.getProjects().length;
          const pos = this.project.position;
          
          this.prevProject = this.projectService.getProjectByPosition(pos > 1 ? pos - 1 : total);
          this.nextProject = this.projectService.getProjectByPosition(pos < total ? pos + 1 : 1);
          
          // Scroll to top when loading new project
          window.scrollTo({ top: 0, behavior: 'instant' });
        } else {
          // not found, maybe redirect to works
          this.router.navigate(['/works']);
        }
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/works']);
  }

  getGalleryImages(project: ProjectData) {
    if (!project || !project.images) return [];
    return project.images.map(img => ({
      previewImageSrc: img.imageUrl,
      thumbnailImageSrc: img.imageUrl,
      alt: img.imageName,
      title: `${project.title} - Image ${img.position}`
    }));
  }
}
