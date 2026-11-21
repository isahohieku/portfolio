import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ExperienceItem } from '../../shared/experience-item/experience-item';
import { SectionComponent } from '../../shared/ui/section/section.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { TagComponent } from '../../shared/ui/tag/tag.component';
import { ExperienceService } from '../../services/experience.service';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { ScrollTopComponent } from '../../shared/ui/scroll-top/scroll-top.component';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, ExperienceItem, SectionComponent, ButtonComponent, TagComponent, ScrollTopComponent],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  private readonly experienceService = inject(ExperienceService);

  readonly experiences = this.experienceService.experiences;
  readonly skillCategories = this.experienceService.skillCategories;
  readonly education = this.experienceService.education;
  readonly certifications = this.experienceService.certifications;
  readonly summary = this.experienceService.summary;
  readonly yearsOfExperience = this.experienceService.yearsOfExperience;
}
