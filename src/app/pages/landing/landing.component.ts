import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ProjectCardComponent } from '../../shared/project-card/project-card.component';
import { SectionComponent } from '../../shared/ui/section/section.component';
import { CardComponent } from '../../shared/ui/card/card.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { RevealDirective } from '../../shared/directives/reveal/reveal.directive';
import { ProjectService } from '../../services/project.service';
import { ExperienceService } from '../../services/experience.service';

interface Metric {
  /** The figure itself, kept short enough to read at display size. */
  value: string;
  label: string;
  company: string;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ProjectCardComponent,
    SectionComponent,
    CardComponent,
    ButtonComponent,
    RevealDirective,
  ],
})
export class LandingComponent {
  private readonly projectService = inject(ProjectService);
  private readonly experienceService = inject(ExperienceService);

  readonly featured = this.projectService.getFeatured(3);
  readonly totalCount = this.projectService.getProjects().length;
  readonly roles = this.experienceService.experiences;
  readonly years = this.experienceService.yearsOfExperience;

  readonly email = 'isahohieku@gmail.com';

  /**
   * Quoted from the accomplishments recorded against each role in
   * ExperienceService. These are the strongest assets on the site and used to
   * sit only on /about — the page a recruiter is least likely to open.
   *
   * No figure here is new, estimated or rounded, and the receipt figure says
   * "projected" because that is what it is: the release note projects the
   * reduction rather than reporting a measured one.
   */
  readonly metrics: Metric[] = [
    { value: '120s → <100ms', label: 'onboarding main-thread block', company: 'Talk360' },
    { value: '1,100+', label: 'new sign-ups after launch', company: 'Talk360' },
    { value: '65 → 5', label: 'manual receipt requests a month (projected)', company: 'Talk360' },
    { value: '+70%', label: 'frontend performance', company: 'ApplyPay' },
  ];
}
