import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpringLettersDirective } from './spring-letters.directive';

@Component({
  standalone: true,
  imports: [SpringLettersDirective],
  template: `<h1 appSpringLetters>Software Engineer</h1>`,
})
class TestHostComponent {}

describe('SpringLettersDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, SpringLettersDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    hostEl = fixture.nativeElement.querySelector('h1');
  });

  it('sets accessible aria-label matching original text content', () => {
    expect(hostEl.getAttribute('aria-label')).toBe('Software Engineer');
  });

  it('adds the spring-letters css class to host', () => {
    expect(hostEl.classList.contains('spring-letters')).toBe(true);
  });

  it('creates span wrapper marked aria-hidden="true"', () => {
    const wrapper = hostEl.querySelector('span[aria-hidden="true"]');
    expect(wrapper).not.toBeNull();
  });
});
