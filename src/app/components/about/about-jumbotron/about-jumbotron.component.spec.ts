import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutJumbotronComponent } from './about-jumbotron.component';

describe('AboutJumbotronComponent', () => {
  let component: AboutJumbotronComponent;
  let fixture: ComponentFixture<AboutJumbotronComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutJumbotronComponent]
    });
    fixture = TestBed.createComponent(AboutJumbotronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
