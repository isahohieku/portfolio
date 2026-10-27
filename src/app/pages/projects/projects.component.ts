import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ProjectService } from '../../services/project.service';
import { ProjectCardComponent } from '../../shared/project-card/project-card.component';
import { SectionComponent } from '../../shared/ui/section/section.component';
import { PackageRecordComponent } from '../../shared/package-record/package-record.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollTopModule, ProjectCardComponent, PackageRecordComponent, SectionComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  private readonly projectService = inject(ProjectService);

  /**
   * Split rather than interleaved: shipped-for-a-client and published-for-
   * anyone are different claims, and a grid that mixes them invites the
   * reader to assume the weaker one applies to everything.
   */
  readonly clientWork = this.projectService.getByKind('client');
  readonly openSource = this.projectService.getByKind('open-source');
  readonly clientSpans = ProjectsComponent.spansFor(this.clientWork.length);

  /**
   * Column spans that fill a three-column grid exactly.
   *
   * The lead takes two columns beside one peer. What remains runs in rows of
   * three, and a remainder becomes one or two wide-plus-peer pairs, with the
   * wide tile alternating sides, instead of a last row holding a single card.
   * At two columns only the lead spans, which leaves an even count behind it.
   */
  private static spansFor(count: number): string[] {
    const spans = Array.from({ length: count }, () => '');
    if (count === 0) {
      return spans;
    }
    spans[0] = 'sm:col-span-2';
    if (count === 1) {
      spans[0] += ' lg:col-span-3';
      return spans;
    }

    const rest = count - 2;
    if (rest === 1) {
      // Too few to pair: the last card closes the grid at full width.
      spans[count - 1] = 'lg:col-span-3';
      return spans;
    }
    const pairs = [0, 2, 1][rest % 3];

    // The pairs close the grid. The final pair puts its wide tile first and
    // the one before it last, so consecutive pairs mirror each other.
    if (pairs >= 1) {
      spans[count - 2] = 'lg:col-span-2';
    }
    if (pairs === 2) {
      spans[count - 3] = 'lg:col-span-2';
    }
    return spans;
  }
}
