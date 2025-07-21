import { Directive, ElementRef, EventEmitter, Output, afterNextRender, DestroyRef, inject, NgZone } from '@angular/core';

@Directive({
  selector: '[appInView]',
  standalone: true
})
export class InViewDirective {
  @Output() appear = new EventEmitter<void>();

  private readonly element = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly ngZone = inject(NgZone);
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
          this.ngZone.run(() => {
            this.appear.emit();
            this.hasEmitted = true;
          });
          observer.disconnect(); // Stop observing after first emission
        }
      },
      {
        root: null,
        rootMargin: '50px', // Trigger 50px before element comes into view
        threshold: 0.1 // Trigger when 10% of element is visible
      }
    );

    observer.observe(this.element.nativeElement);

    // Check if element is already visible and trigger immediately if so
    setTimeout(() => {
      const rect = this.element.nativeElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isVisible = rect.top < windowHeight && rect.bottom > 0;

      // If element is already visible and we haven't emitted yet, emit now
      if (isVisible && !this.hasEmitted) {
        this.ngZone.run(() => {
          this.appear.emit();
          this.hasEmitted = true;
        });
        observer.disconnect();
      }
    }, 100);

    // Cleanup observer on destroy
    this.destroyRef.onDestroy(() => observer.disconnect());
  }


}
