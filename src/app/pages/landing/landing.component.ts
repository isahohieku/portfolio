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
import { MagneticDirective } from '../../shared/directives/magnetic/magnetic.directive';
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
    MagneticDirective,
  ],
})
export class LandingComponent {
  private readonly projectService = inject(ProjectService);
  private readonly experienceService = inject(ExperienceService);

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
  readonly totalCount = this.projectService.getProjects().length;
  readonly roles = this.experienceService.experiences;
  readonly years = this.experienceService.yearsOfExperience;

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
    { label: 'Based in', value: 'Amsterdam, Netherlands' },
    { label: 'Timezone', value: 'CET (UTC+1)' },
    { label: 'Open to', value: 'Engineering roles and contract work' },
  ];

  /**
   * Quoted from the accomplishments recorded against each role in
   * ExperienceService, and from the npm registry. These are the strongest assets on the site and used to
   * sit only on /about — the page a recruiter is least likely to open.
   *
   * No figure here is new, estimated or rounded, and the receipt figure says
   * "projected" because that is what it is: the release note projects the
   * reduction rather than reporting a measured one. The qualifier is its own
   * field now rather than a parenthetical inside the label, so it is not set
   * in the same weight and colour as the measured figures beside it.
   */
  readonly metrics: Metric[] = [
    { value: '120s → <100ms', label: 'onboarding main-thread block', company: 'Talk360' },
    { value: '1,100+', label: 'new sign-ups after launch', company: 'Talk360' },
    {
      value: '65 → 5',
      label: 'manual receipt requests a month',
      company: 'Talk360',
      qualifier: 'projected, not measured',
    },
    // The one figure here a stranger can check without taking his word for
    // it. It replaced ApplyPay's +70%, which came from the same unaudited
    // batch as the Talk360 numbers removed in 222f6a0.
    { value: '5,479', label: 'npm downloads in a year', company: 'ngx-horizontal-scroll-menu' },
  ];

  /**
   * The two that go above the fold: the most dramatic, and the only one a
   * stranger can verify without trusting him. The rest stay in the band.
   */
  readonly heroMetrics: Metric[] = [this.metrics[0], this.metrics[3]];

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
