import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectData } from '../../services/project.service';

/**
 * A published package rendered as the record it is.
 *
 * Shared by the landing teaser and the /works open-source section, so the two
 * cannot drift apart. Every value is read from the project's own plateFacts,
 * which exist only where the facts are sourced, so a package with nothing on
 * file renders its name and stops rather than inviting a number to fill the
 * row.
 */
@Component({
  selector: 'app-package-record',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  host: { class: 'block' },
  template: `
    <a
      [routerLink]="['/works', project.slug]"
      class="group flex h-full flex-col gap-5 overflow-hidden rounded-x-large border border-subtle bg-surface-minimal p-6 shadow-raised transition-colors duration-base ease-io hover:border-brand-moderate sm:p-8 lg:flex-row lg:items-center lg:gap-10">
      <div class="flex min-w-0 flex-1 flex-col gap-3">
        <code class="truncate font-mono io-body-sm text-heading">
          {{ project.plateFacts?.[0] ?? project.title }}
        </code>

        @if (project.description) {
          <p class="io-body-sm max-w-prose text-muted">{{ project.description }}</p>
        }
      </div>

      <!--
        A list, not a definition list: these facts are self-describing values
        ("5,479 downloads", "MIT"), not term/definition pairs. The first fact
        leads at heading size and the rest ride alongside it, the same
        figure-then-source hierarchy the evidence band uses.
      -->
      @if (facts.length) {
        <ul class="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-subtle pt-5 pl-0 lg:w-64 lg:shrink-0 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          @for (fact of facts; track fact; let first = $first) {
            <li [class]="first ? 'io-heading-sm text-brand-text' : 'io-body-sm text-muted'">
              {{ fact }}
            </li>
          }
        </ul>
      }

      <span
        class="inline-flex shrink-0 items-center gap-2 io-label text-brand-text transition-transform duration-base ease-io group-hover:translate-x-1">
        {{ project.caseStudy ? 'Read the case study' : 'View project' }}
        <i class="pi pi-arrow-right text-xs" aria-hidden="true"></i>
      </span>
    </a>
  `,
})
export class PackageRecordComponent {
  @Input({ required: true }) project!: ProjectData;

  /** Everything after the package name, which leads the record on its own. */
  get facts(): string[] {
    return this.project.plateFacts?.slice(1) ?? [];
  }
}
