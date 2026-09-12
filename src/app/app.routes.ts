import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Isah Ohieku | Software Engineer',
    loadComponent: () => import('./pages/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'about',
    title: 'Experience | Isah Ohieku',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'works',
    title: 'Selected Work | Isah Ohieku',
    loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent)
  },
  {
    // Accepts a slug or a numeric id; the component sets its own title per project.
    path: 'works/:id',
    loadComponent: () => import('./pages/project-details/project-details.component').then(m => m.ProjectDetailsComponent)
  },
  {
    path: 'projects',
    redirectTo: 'works',
    pathMatch: 'full'
  },
  {
    // A real 404 instead of a redirect to a page titled "under-construction"
    // that rendered the About component.
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
