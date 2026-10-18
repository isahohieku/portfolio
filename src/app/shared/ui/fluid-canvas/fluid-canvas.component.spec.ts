import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FluidCanvasComponent } from './fluid-canvas.component';

describe('FluidCanvasComponent', () => {
  let component: FluidCanvasComponent;
  let fixture: ComponentFixture<FluidCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FluidCanvasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FluidCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates canvas with aria-hidden="true"', () => {
    const canvas = fixture.nativeElement.querySelector('canvas');
    expect(canvas).not.toBeNull();
    expect(canvas.getAttribute('aria-hidden')).toBe('true');
  });
});
