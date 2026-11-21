import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ProjectService, ProjectData, ProjectImage, ProjectKind } from '../../services/project.service';
import { ProjectLogoComponent } from '../../shared/project-logo/project-logo.component';
import { SectionComponent } from '../../shared/ui/section/section.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { TagComponent } from '../../shared/ui/tag/tag.component';
import { RevealDirective } from '../../shared/directives/reveal/reveal.directive';
import { SmoothScrollService } from '../../shared/services/smooth-scroll';
import { CanonicalService } from '../../shared/services/canonical';

interface StorySection {
  heading: string;
  body: string;
  image?: ProjectImage;
}

@Component({
  selector: 'app-project-details',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    NgTemplateOutlet,
    RouterModule,
    ProjectLogoComponent,
    SectionComponent,
    ButtonComponent,
    TagComponent,
    RevealDirective
  ],
  templateUrl: './project-details.component.html'
})
export class ProjectDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  private titleService = inject(Title);
  private smoothScroll = inject(SmoothScrollService);
  private canonical = inject(CanonicalService);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('viewer') private viewer?: ElementRef<HTMLDialogElement>;

  project: ProjectData | undefined;
  prevProject: ProjectData | undefined;
  nextProject: ProjectData | undefined;

  /** True once a lookup has run and found nothing, so the template can say so
   *  instead of rendering an empty page or bouncing the visitor with no explanation. */
  notFound = false;

  /**
   * The page is built from the screenshots rather than followed by them, so
   * each capture is placed once, where it proves something: each section takes
   * the screen it describes, the first unclaimed one leads the page, and the
   * rest are collected at the end. Computed per project rather than per
   * change-detection pass.
   */
  leadImage: ProjectImage | undefined;
  story: StorySection[] = [];
  moreImages: ProjectImage[] = [];

  /** The screens in the order the page shows them — lead, story, the rest —
   *  so "next" in the viewer is the next screen down the page, not the next
   *  one in the data. */
  viewerOrder: ProjectImage[] = [];

  /** Index into viewerOrder of the screen open in the viewer. */
  viewerIndex = 0;

  /** Screens whose image has arrived. Until then the frame shows a placeholder
   *  rather than a bare colour plate, which on slow mobile data looks empty. */
  loaded = new Set<number>();

  get viewerImage(): ProjectImage | undefined {
    return this.viewerOrder[this.viewerIndex];
  }

  get kindLabel(): string {
    if (this.project?.kind === 'open-source') return 'Open source';
    if (this.project?.kind === 'impact') return 'Engineering impact';
    return 'Client work';
  }

  /** Previous/next stay inside one kind: the listing keeps client work, open
   *  source and engineering-impact writeups apart, and stepping from one
   *  into another blurred that. */
  get siblingNoun(): string {
    if (this.project?.kind === 'open-source') return 'open-source project';
    if (this.project?.kind === 'impact') return 'impact case study';
    return 'client project';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Previous/next reuse this component instance, so only this emission
      // changes the page. AppComponent is OnPush and the click that marked it
      // dirty has already been checked by the time the navigation (and its
      // view transition) lands, so without this the old project stays on
      // screen under the new URL.
      this.cdr.markForCheck();

      // Accepts a slug or a numeric id, so /works/hobeei-freecycle-application
      // and /works/9613 both resolve.
      this.project = this.projectService.getProject(params.get('id'));

      if (!this.project) {
        this.notFound = true;
        this.prevProject = this.nextProject = undefined;
        this.leadImage = undefined;
        this.story = [];
        this.moreImages = [];
        this.viewerOrder = [];
        this.titleService.setTitle('Project not found | Isah Ohieku');
        this.canonical.noindex();
        return;
      }

      this.notFound = false;
      this.titleService.setTitle(`${this.project.title} | Isah Ohieku`);
      // /works/9613 and /works/<slug> are one page; the slug is its address.
      this.canonical.set(`/works/${this.project.slug}`);
      this.place(this.project);
      this.findSiblings(this.project.kind);
    });
  }

  openViewer(image: ProjectImage): void {
    const dialog = this.viewer?.nativeElement;
    if (!dialog || !this.project) {
      return;
    }
    this.viewerIndex = Math.max(0, this.viewerOrder.indexOf(image));
    // A native modal dialog rather than PrimeNG's overlay: the browser supplies
    // the focus trap, Escape, an inert page behind, an accessible name, and
    // focus returned to the screen that opened it. p-galleria did none of the
    // last three, and its thumbnail strip re-rendered on hover.
    dialog.showModal();
    this.smoothScroll.pause();
  }

  closeViewer(): void {
    this.viewer?.nativeElement.close();
  }

  onViewerClosed(): void {
    this.smoothScroll.resume();
  }

  step(delta: number): void {
    const count = this.viewerOrder.length;
    if (count < 2) {
      return;
    }
    this.viewerIndex = (this.viewerIndex + delta + count) % count;
  }

  onViewerKey(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.step(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.step(-1);
    }
  }

  /** A click outside the frame lands on the dialog element itself. */
  onViewerClick(event: MouseEvent): void {
    if (event.target === this.viewer?.nativeElement) {
      this.closeViewer();
    }
  }

  private touchStart: { x: number; y: number } | null = null;

  onTouchStart(event: TouchEvent): void {
    const touch = event.changedTouches[0];
    this.touchStart = touch ? { x: touch.clientX, y: touch.clientY } : null;
  }

  /** A swipe only counts when it is mostly sideways: a vertical drag that
   *  drifts 50px should not change the screen. */
  onTouchEnd(event: TouchEvent): void {
    const start = this.touchStart;
    const touch = event.changedTouches[0];
    this.touchStart = null;
    if (!start || !touch) {
      return;
    }
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      this.step(dx < 0 ? 1 : -1);
    }
  }

  /** Width descriptors for the frames; the viewer always takes the full size. */
  srcset(image: ProjectImage): string | null {
    return image.smallUrl ? `${image.smallUrl} 800w, ${image.imageUrl} 1600w` : null;
  }

  private place(project: ProjectData): void {
    const images = project.images ?? [];
    const byPosition = new Map(images.map(image => [image.position, image]));
    const used = new Set<ProjectImage>();

    this.story = (project.caseStudy?.sections ?? []).map(section => {
      const image = section.image !== undefined ? byPosition.get(section.image) : undefined;
      if (image) {
        used.add(image);
      }
      return { heading: section.heading, body: section.body, image };
    });

    this.leadImage = images.find(image => !used.has(image));
    if (this.leadImage) {
      used.add(this.leadImage);
    }
    this.moreImages = images.filter(image => !used.has(image));

    const storyImages = this.story.flatMap(section => (section.image ? [section.image] : []));
    this.viewerOrder = [
      ...(this.leadImage ? [this.leadImage] : []),
      ...storyImages,
      ...this.moreImages
    ];
  }

  private findSiblings(kind: ProjectKind): void {
    const siblings = this.projectService
      .getProjects()
      .filter(p => p.kind === kind)
      .sort((a, b) => a.position - b.position);
    const at = siblings.findIndex(p => p.id === this.project?.id);

    if (siblings.length < 2 || at < 0) {
      this.prevProject = this.nextProject = undefined;
      return;
    }
    this.prevProject = siblings[(at - 1 + siblings.length) % siblings.length];
    this.nextProject = siblings[(at + 1) % siblings.length];
  }
}
