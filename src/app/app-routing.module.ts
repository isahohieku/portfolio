import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { LandingComponent } from './pages/landing/landing.component';
import { WorksComponent } from './pages/works/works.component';


const routes: Routes = [
  { component: LandingComponent, path: '' },
  { component: AboutComponent, path: 'about'},
  { component: WorksComponent, path: 'works'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
