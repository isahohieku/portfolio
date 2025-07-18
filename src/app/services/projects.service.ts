import { Injectable, signal } from '@angular/core';
import { Project } from '../shared/project-card/project-card.component';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private readonly projects = signal<Project[]>([
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce platform built with Angular and Node.js',
      logo: '/assets/projects/ecommerce-logo.png',
      bgColor: '#3B82F6',
      link: 'https://example.com',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'TypeScript']
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates',
      logo: '/assets/projects/task-logo.png',
      bgColor: '#10B981',
      link: 'https://example.com',
      technologies: ['Angular', 'Firebase', 'RxJS', 'Material Design']
    }
  ]);

  getProjects() {
    return this.projects.asReadonly()();
  }

  getProjectById(id: string) {
    return this.projects().find(project => project.id === id);
  }
}
