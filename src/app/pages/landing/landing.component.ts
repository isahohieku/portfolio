import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ProjectCardComponent } from '../../shared/project-card/project-card.component';
import { SectionComponent } from '../../shared/ui/section/section.component';
import { CardComponent } from '../../shared/ui/card/card.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { RevealDirective } from '../../shared/directives/reveal/reveal.directive';
import { ScrollSceneDirective } from '../../shared/directives/scroll-scene/scroll-scene.directive';
import { PointerParallaxDirective } from '../../shared/directives/pointer-parallax/pointer-parallax.directive';
import { HeroBackdropComponent } from '../../shared/ui/hero-backdrop/hero-backdrop.component';
import { SplitRevealDirective } from '../../shared/directives/split-reveal/split-reveal.directive';
import { LineRevealDirective } from '../../shared/directives/line-reveal/line-reveal.directive';
import { CountUpDirective } from '../../shared/directives/count-up/count-up.directive';
import { PackageRecordComponent } from '../../shared/package-record/package-record.component';
import { SpringLettersDirective } from '../../shared/directives/spring-letters/spring-letters.directive';
import { StoryBeatDirective } from '../../shared/directives/story-beat/story-beat.directive';
import { StoryStageComponent } from '../../shared/ui/story-stage/story-stage.component';
import { StoryService } from '../../shared/services/story';
import { ProjectService } from '../../services/project.service';
import { ExperienceService } from '../../services/experience.service';

interface Metric {
  /** The figure itself, kept short enough to read at display size. */
  value: string;
  label: string;
  company: string;
  /** Renders after the source. Used where a figure is not a measurement. */
  qualifier?: string;
}

/** One number in the design-system cluster tile — no company/qualifier of
 *  its own, since the three share one source line underneath them. */
interface StatBlock {
  value: string;
  label: string;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ProjectCardComponent,
    SectionComponent,
    CardComponent,
    ButtonComponent,
    RevealDirective,
    ScrollSceneDirective,
    PointerParallaxDirective,
    HeroBackdropComponent,
    SplitRevealDirective,
    LineRevealDirective,
    CountUpDirective,
    PackageRecordComponent,
    SpringLettersDirective,
    StoryBeatDirective,
    StoryStageComponent,
  ],
})
export class LandingComponent {
  private readonly projectService = inject(ProjectService);
  private readonly experienceService = inject(ExperienceService);
  private readonly story = inject(StoryService);

  readonly featured = this.projectService.getFeatured(3);

  /**
   * The teaser is composed by kind rather than by array position.
   *
   * A client engagement and a published package are different claims — /works
   * has always separated them into two sections, while this grid flattened
   * both into three interchangeable tiles. The client work keeps the brand
   * plate it is recognised by; the package is rendered as the record it
   * actually is, from the npm facts already on file.
   *
   * Both lists are derived, so changing featuredSlugs cannot leave the layout
   * asserting something the data no longer supports.
   */
  readonly featuredClient = this.featured.filter((project) => project.kind === 'client');
  readonly featuredPackages = this.featured.filter((project) => project.kind === 'open-source');

  /**
   * Decisions and mechanisms that changed how other teams build, not just
   * what shipped. Kept out of /works — a design-system split or an
   * architecture proposal is not a product a stranger can visit — and shown
   * here instead, in the priority order the work argues for: leverage
   * delivered, then platform strategy, then a proposal already carried into
   * production.
   */
  readonly engineeringImpact = this.projectService.getByKind('impact');
  readonly roles = this.experienceService.experiences;
  readonly years = this.experienceService.yearsOfExperience;

  /**
   * The reach sentence, split by word so each can be scrubbed on the scene's
   * progress. Kept as a word list in the template, not as one string run
   * through a directive, so the heading's text is the plain DOM text a
   * screen reader and a crawler see.
   */
  readonly reachWords =
    'From Abuja, Nigeria, building the products people use to call, top up and pay across borders.'.split(' ');

  /** Stored, not rendered: the stage's globe reads it on its own frame. */
  readonly onReachProgress = (progress: number) => {
    this.story.reach = progress;
  };

  readonly email = 'isahohieku@gmail.com';
  readonly linkedIn = 'https://www.linkedin.com/in/isah-ohieku';

  /**
   * The facts a stranger needs before writing. PRODUCT.md forbids rates,
   * service definitions and invented availability; it does not forbid saying
   * where he is and what he is open to, and withholding that at the one
   * high-stakes moment on the page was costing more than it protected.
   *
   * There is deliberately no reply-time promise here: that would be the only
   * unsourced claim on a page built around not making any.
   */
  readonly contactFacts = [
    { label: 'Based in', value: 'Abuja, Nigeria' },
    // West Africa Time. Nigeria keeps no daylight saving, so this holds all
    // year (it matches CET in winter and sits an hour behind CEST in summer).
    { label: 'Timezone', value: 'WAT (UTC+1)' },
    { label: 'Open to', value: 'Engineering roles and contract work' },
  ];

  /**
   * The design system's three numbers, read together rather than as three
   * unrelated tiles: component count, migrated screens and token-consuming
   * apps are one claim — engineering leverage across the product line — not
   * three. They share one source line underneath rather than each repeating
   * "Talk360".
   *
   * 14+ migrated screens is narrower than the 4-app reach: two products have
   * migrated to the shared component library, while the other two consume
   * the design tokens without the component migration. The label says
   * "design tokens" rather than "migrated" for that reason — the two are
   * different claims. The packages are private, so none is named.
   */
  readonly designSystemStats: StatBlock[] = [
    { value: '23', label: 'Shared UI components' },
    { value: '14+', label: 'Screens migrated across two products' },
    { value: '4', label: 'Apps on shared design tokens' },
  ];

  /**
   * The hero's three figures: leverage, reach and one product result, each
   * restated from the band below rather than introduced here, so the hero
   * never carries a number the band does not source.
   */
  readonly heroReceipts: StatBlock[] = [
    { value: '23', label: 'Shared UI components, enforced in CI' },
    { value: '4', label: 'Apps on shared design tokens' },
    { value: '2k+', label: 'Sign-ups a day through a flow I redesigned' },
  ];

  /**
   * Quoted from the accomplishments recorded against each role in
   * ExperienceService. These are the strongest assets on the site and used to
   * sit only on /about — the page a recruiter is least likely to open.
   *
   * Hydration, the receipts automation and the npm download count moved out
   * of this band rather than being dropped: the first two are still quoted in
   * full on /about, and the npm figure already sits on the open-source
   * package's own record further down this page. The evidence band now holds
   * only what a visitor should see before anything else — leverage, scale,
   * and one concrete product result — not everything that is true.
   */
  readonly metrics: Metric[] = [
    {
      value: '8.9M+',
      label: 'Registered users',
      company: 'Talk360',
      qualifier: '4.9M+ paying',
    },
    // Confirmed by Isah 2026-11-15. "Through", not "driven by": the figure is
    // the flow's daily volume, not a lift attributed to the redesign.
    { value: '2k+', label: 'Daily sign-ups through the sign-up flow I redesigned', company: 'Talk360' },
  ];

  readonly copied = signal(false);
  private copyTimer: ReturnType<typeof setTimeout> | undefined;

  /**
   * mailto: is the page's only conversion route and it fails silently on a
   * desktop with no mail client bound, so the address is also copyable. The
   * execCommand path is the fallback for insecure origins, where
   * navigator.clipboard is undefined rather than merely rejecting.
   */
  async copyEmail(): Promise<void> {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(this.email);
      } else {
        const field = document.createElement('textarea');
        field.value = this.email;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.appendChild(field);
        field.select();
        document.execCommand('copy');
        document.body.removeChild(field);
      }
      this.copied.set(true);
      clearTimeout(this.copyTimer);
      this.copyTimer = setTimeout(() => this.copied.set(false), 2400);
    } catch {
      // The mailto: button beside this one is still the primary route, and the
      // address is rendered as its own label, so a failed copy leaves the
      // visitor no worse off than before. Nothing to report.
    }
  }
}
