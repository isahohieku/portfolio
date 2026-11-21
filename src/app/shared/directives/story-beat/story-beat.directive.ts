import { Directive, ElementRef, Input, afterNextRender, DestroyRef, inject } from '@angular/core';
import { StoryBeat, StoryService } from '../../services/story';

/**
 * Marks the element as one chapter of the landing story.
 *
 * The chapter that owns the page is the one crossing the middle of the
 * viewport. That holds for sections of any height, where a threshold on the
 * section itself would not: a work grid three screens tall never reaches
 * 50% visibility on a phone.
 */
@Directive({
  selector: '[appStoryBeat]',
  standalone: true,
})
export class StoryBeatDirective {
  @Input({ required: true }) appStoryBeat!: StoryBeat;

  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly story = inject(StoryService);

  constructor() {
    afterNextRender(() => this.observe());
  }

  private observe(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    // A 1% band through the middle of the viewport. A zero-height root is
    // edge-inclusive, which would let two neighbours both claim the page on
    // the frame their shared edge crosses it.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.story.beat.set(this.appStoryBeat);
        }
      },
      { rootMargin: '-49.5% 0px -49.5% 0px', threshold: 0 }
    );

    observer.observe(this.element.nativeElement);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
