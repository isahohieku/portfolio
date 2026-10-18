import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollSceneDirective } from './scroll-scene.directive';
import { SmoothScrollService } from '../../services/smooth-scroll';

@Component({
  standalone: true,
  imports: [ScrollSceneDirective],
  template: `<header appScrollScene="continuous" class="scene-track"></header>`,
})
class TestHostComponent {}

describe('ScrollSceneDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, ScrollSceneDirective],
      providers: [SmoothScrollService],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    hostEl = fixture.nativeElement.querySelector('header');
  });

  it('creates test component with continuous mode', () => {
    expect(hostEl).toBeTruthy();
    expect(hostEl.getAttribute('appscrollscene')).toBe('continuous');
  });
});
