import { Injectable, computed, signal } from '@angular/core';

/**
 * The landing page's chapters, in reading order. Each section declares the
 * one it carries with [appStoryBeat], and the stage behind the page moves to
 * that chapter's composition.
 */
export type StoryBeat = 'hero' | 'evidence' | 'reach' | 'work' | 'impact' | 'experience' | 'contact';

/**
 * Beats the globe is drawn in. The hero keeps its own backdrop and the
 * first viewport stays exactly as it was. The evidence and experience bands
 * sit on opaque surfaces that would hide the stage anyway, so there is no
 * point rendering a globe nobody can see.
 */
const LIT: ReadonlySet<StoryBeat> = new Set<StoryBeat>(['reach', 'work', 'contact']);

/**
 * Shared state between the sections that tell the story and the stage that
 * draws it.
 *
 * The beat is a signal because it changes a few times per visit and the
 * stage binds it in a template. Reach progress is a plain field: it is
 * written on every scroll frame and read on every render frame, and running
 * either of those through change detection would cost a pass per frame.
 */
@Injectable({ providedIn: 'root' })
export class StoryService {
  readonly beat = signal<StoryBeat>('hero');
  readonly lit = computed(() => LIT.has(this.beat()));

  /** 0 -> 1 across the pinned reach scene. The globe's arcs draw on it. */
  reach = 0;

  reset(): void {
    this.beat.set('hero');
    this.reach = 0;
  }
}
