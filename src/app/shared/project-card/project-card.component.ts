import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectLogoComponent } from '../project-logo/project-logo.component';
import { TagComponent } from '../ui/tag/tag.component';
import { ProjectData } from '../../services/project.service';
import { RevealDirective } from '../directives/reveal/reveal.directive';
import { ScrollDriftDirective } from '../directives/scroll-drift/scroll-drift.directive';
import { IconComponent } from '../ui/icon/icon.component';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IconComponent,
    NgStyle,
    RouterLink,
    ProjectLogoComponent,
    TagComponent,
    RevealDirective,
    ScrollDriftDirective,
  ],
})
export class ProjectCardComponent {
  @Input() project!: ProjectData;

  /**
   * The teaser's flagship card: a taller plate and a heading one step up.
   * Off by default, so the /works listing — where every entry is a peer and
   * none should outrank the others — is unaffected.
   */
  @Input() lead = false;

  /**
   * Hover states the card's edge rather than lifting the card.
   *
   * `hover:-translate-y-1` with a deepened shadow was the one piece of this
   * page's motion vocabulary that any card grid on the web would have used.
   * The hero already says what this site's edge language is — hairline arcs
   * struck in brand, not coloured haze — so the card answers a pointer the
   * same way: the rule around it warms to brand and the CTA arrow advances.
   */
  get rootClasses(): string {
    return [
      'project-wrapper group flex h-full flex-col overflow-hidden rounded-card',
      'border border-subtle bg-surface-minimal shadow-raised',
      'transition-colors duration-base ease-io hover:border-brand-moderate',
    ].join(' ');
  }

  /**
   * The plate is the card's media frame, so it is what wipes: its clip opens
   * upward while the mark inside settles out of an overscale and then drifts
   * against the page. The colour field arriving as a travelling edge is the
   * only way a flat plate can read as media rather than as a placeholder.
   */
  get plateClasses(): string {
    const height = this.lead ? 'h-56 sm:h-72' : 'h-44 sm:h-52';
    const field = this.isImpact ? ' border-b border-subtle bg-surface-subtle' : '';
    return `io-wipe relative flex ${height} items-center justify-center overflow-hidden px-4 sm:px-6${field}`;
  }

  /** Eight tenants on an ellipse around the core, for the tenants diagram. */
  readonly tenantAngles = [0, 45, 90, 135, 180, 225, 270, 315];

  tenantX(angle: number): number {
    return Math.round((120 + 96 * Math.cos((angle * Math.PI) / 180)) * 10) / 10;
  }

  tenantY(angle: number): number {
    return Math.round((48 + 36 * Math.sin((angle * Math.PI) / 180)) * 10) / 10;
  }

  /** From the core's edge to just short of the tenant node. */
  tenantSpoke(angle: number): string {
    const rad = (angle * Math.PI) / 180;
    const at = (rx: number, ry: number) =>
      `${Math.round((120 + rx * Math.cos(rad)) * 10) / 10} ${Math.round((48 + ry * Math.sin(rad)) * 10) / 10}`;
    return `M${at(17, 14)} L${at(88, 30)}`;
  }

  get titleClasses(): string {
    return this.lead ? 'io-heading-md text-heading' : 'io-heading-sm text-heading';
  }

  /**
   * The logo scales with the plate. Leaving it at the default size inside the
   * lead card's taller field left it floating in a few hundred pixels of flat
   * colour, which read as a loading failure rather than as a brand mark.
   */
  get logoClasses(): string {
    const size = this.lead ? 'h-16 sm:h-20' : 'h-12 sm:h-14';
    return `relative z-10 ${size} w-auto object-contain transition-transform duration-slow ease-io-out group-hover:scale-105`;
  }

  /** The lead card is wide enough to need a measure; the default one is not. */
  get descriptionClasses(): string {
    return this.lead ? 'io-body-sm max-w-prose text-muted' : 'io-body-sm text-muted';
  }

  get isImpact(): boolean {
    return this.project.kind === 'impact';
  }

  /** Sourced facts for the colour plate, where no logo asset exists. */
  get plateFacts(): string[] {
    return this.project.plateFacts ?? [];
  }

  /**
   * The first few technologies, for the listing.
   *
   * Read straight from the case study's recorded stack and never inferred from
   * the title or the description: a project without a recorded stack shows no
   * tags at all, the same way a project without a logo shows no logo. Capped at
   * three so a card with an eight-item stack does not outgrow its neighbours.
   */
  get techTags(): string[] {
    return (this.project.caseStudy?.stack ?? []).slice(0, 3);
  }

  /**
   * The card only promises a case study where one exists. A written writeup
   * counts, and so does a gallery; a project with neither says "View project"
   * instead. Every published project has a writeup today, so the fallback
   * only matters for an entry added without one.
   */
  get hasCaseStudy(): boolean {
    return !!this.project.caseStudy || this.project.images.length > 0;
  }
}
