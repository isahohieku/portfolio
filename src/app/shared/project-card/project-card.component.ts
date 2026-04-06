import { Component, Input } from '@angular/core';
import { NgStyle, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Project {
  id?: string;
  title: string;
  description: string;
  logo: string;
  bgColor: string;
  link?: string;
  technologies?: string[];
}

@Component({
    selector: 'app-project-card',
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.scss'],
    standalone: true,
    imports: [NgStyle, NgIf, RouterModule]
})
export class ProjectCardComponent {

  @Input() project!: Project;

}
