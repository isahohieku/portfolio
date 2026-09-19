import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ExperienceItem } from '../../shared/experience-item/experience-item';
import { SectionComponent } from '../../shared/ui/section/section.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { ExperienceService } from '../../services/experience.service';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExperienceItem, ScrollTopModule, SectionComponent, ButtonComponent],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  private readonly experienceService = inject(ExperienceService);

  readonly experiences = this.experienceService.experiences;
  readonly skillCategories = this.experienceService.skillCategories;
  readonly yearsOfExperience = this.experienceService.yearsOfExperience;
}
