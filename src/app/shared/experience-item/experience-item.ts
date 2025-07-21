import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';

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
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './experience-item.html'
})
export class ExperienceItem {
  @Input() experience!: ExperienceData;

  faCircleCheck = faCircleCheck;
  faArrowUpRight = faSquareArrowUpRight;
}
