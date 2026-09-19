import { Component, OnInit, HostListener, ChangeDetectionStrategy, inject } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { GalleriaModule } from 'primeng/galleria';
import { ProjectService, ProjectData } from '../../services/project.service';
import { ProjectLogoComponent } from '../../shared/project-logo/project-logo.component';
import { SectionComponent } from '../../shared/ui/section/section.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';

@Component({
  selector: 'app-project-details',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    NgStyle,
    RouterModule,
    GalleriaModule,
    ProjectLogoComponent,
    SectionComponent,
    ButtonComponent
  ],
  templateUrl: './project-details.component.html'
})
export class ProjectDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  private titleService = inject(Title);

  project: ProjectData | undefined;
  prevProject: ProjectData | undefined;
  nextProject: ProjectData | undefined;

  /** True once a lookup has run and found nothing, so the template can say so
   *  instead of rendering an empty page or bouncing the visitor with no explanation. */
  notFound = false;

  activeIndex = 0;

  /**
   * Drives the fullscreen gallery. p-galleria has no show() method - it is controlled
   * purely by its `visible` input - so the previous `galleria?.show()` call could never
   * open it, and `[visible]="false"` pinned it shut. The gallery is the only place the
   * work is actually visible, so it never opened for anyone.
   */
  galleryOpen = false;

  openGallery(index: number): void {
    this.activeIndex = index;
    this.galleryOpen = true;
  }

  /** p-galleria ships a close button but does not bind Escape, so a fullscreen
   *  overlay was not keyboard-dismissible. */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.galleryOpen) {
      this.galleryOpen = false;
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Accepts a slug or a numeric id, so /works/hobeei-freecycle-application
      // and /works/9613 both resolve.
      this.project = this.projectService.getProject(params.get('id'));

      if (!this.project) {
        this.notFound = true;
        this.prevProject = this.nextProject = undefined;
        this.titleService.setTitle('Project not found | Isah Ohieku');
        return;
      }

      this.notFound = false;
      this.titleService.setTitle(`${this.project.title} | Isah Ohieku`);

      const total = this.projectService.getProjects().length;
      const pos = this.project.position;
      this.prevProject = this.projectService.getProjectByPosition(pos > 1 ? pos - 1 : total);
      this.nextProject = this.projectService.getProjectByPosition(pos < total ? pos + 1 : 1);

      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    });
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
