import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { LandingComponent } from './pages/landing/landing.component';
import { UnderConstructionComponent } from './pages/under-construction/under-construction.component';
import { WorksComponent } from './pages/works/works.component';


const routes: Routes = [
  { component: LandingComponent, path: '' },
  { component: AboutComponent, path: 'about'},
  // { component: UnderConstructionComponent, path: 'about'},
  // { component: WorksComponent, path: 'works'},
  { component: UnderConstructionComponent, path: 'works'},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
