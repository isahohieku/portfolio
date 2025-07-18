import { Directive, ElementRef, EventEmitter, Output, afterNextRender, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, merge } from 'rxjs';
import { throttleTime, startWith } from 'rxjs/operators';

@Directive({
  selector: '[appInView]',
  standalone: true
})
export class InViewDirective {
  @Output() appear = new EventEmitter<void>();

  private readonly element = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private hasEmitted = false;

  constructor() {
    afterNextRender(() => {
      this.setupIntersectionObserver();
    });
  }

  private setupIntersectionObserver(): void {
    // Use modern Intersection Observer API for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !this.hasEmitted) {
          this.appear.emit();
          this.hasEmitted = true;
          observer.disconnect(); // Stop observing after first emission
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of element is visible
      }
    );

    observer.observe(this.element.nativeElement);

    // Cleanup observer on destroy
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  // Fallback method using scroll events (if Intersection Observer not supported)
  private setupScrollListener(): void {
    const scroll$ = fromEvent(window, 'scroll');
    const resize$ = fromEvent(window, 'resize');

    merge(scroll$, resize$)
      .pipe(
        startWith(null),
        throttleTime(16), // ~60fps
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        if (!this.hasEmitted && this.isElementVisible()) {
          this.appear.emit();
          this.hasEmitted = true;
        }
      });
  }

  private isElementVisible(): boolean {
    const rect = this.element.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    return rect.top < windowHeight && rect.bottom > 0;
  }
}
