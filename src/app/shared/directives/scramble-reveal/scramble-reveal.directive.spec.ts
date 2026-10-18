import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrambleRevealDirective } from './scramble-reveal.directive';
import { AudioService } from '../../services/audio.service';

@Component({
  standalone: true,
  imports: [ScrambleRevealDirective],
  template: `<h1 appScrambleReveal="400">Software Engineer</h1>`,
})
class TestHostComponent {}

describe('ScrambleRevealDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, ScrambleRevealDirective],
      providers: [AudioService],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    hostEl = fixture.nativeElement.querySelector('h1');
  });

  it('sets accessible aria-label matching original text content', () => {
    expect(hostEl.getAttribute('aria-label')).toBe('Software Engineer');
  });

  it('adds the scramble css class to host', () => {
    expect(hostEl.classList.contains('scramble-reveal')).toBe(true);
  });
});
