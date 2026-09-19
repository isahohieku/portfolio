import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ProjectService } from '../../services/project.service';
import { ProjectCardComponent } from '../../shared/project-card/project-card.component';
import { SectionComponent } from '../../shared/ui/section/section.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollTopModule, ProjectCardComponent, SectionComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  private readonly projectService = inject(ProjectService);

  readonly projects = this.projectService.getProjects();
}
