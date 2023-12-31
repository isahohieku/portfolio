import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainJumbotronComponent } from './components/landing/main-jumbotron/main-jumbotron.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ProjectCardComponent } from './shared/project-card/project-card.component';
import { AboutSectionComponent } from './components/landing/about-section/about-section.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectsSectionComponent } from './components/landing/projects-section/projects-section.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AboutComponent } from './pages/about/about.component';
import { WorksComponent } from './pages/works/works.component';
import { UnderConstructionComponent } from './pages/under-construction/under-construction.component';
import { InViewDirective } from './shared/directives/in-view/in-view.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainJumbotronComponent,
    FooterComponent,
    ProjectCardComponent,
    AboutSectionComponent,
    ProjectsSectionComponent,
    LandingComponent,
    AboutComponent,
    WorksComponent,
    UnderConstructionComponent,
    InViewDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
