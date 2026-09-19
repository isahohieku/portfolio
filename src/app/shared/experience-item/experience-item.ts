import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TagComponent } from '../ui/tag/tag.component';

export interface Technology {
  name: string;
  icon?: string;
}

export interface ExperienceData {
  id: string;
  company: string;
  companyColor?: string;
  companyLink?: string;
  role: string;
  duration: string;
  overview: string;
  accomplishments: string[];
  technologies: Technology[];
}

@Component({
  selector: 'app-experience-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TagComponent],
  templateUrl: './experience-item.html'
})
export class ExperienceItem {
  @Input() experience!: ExperienceData;
}
