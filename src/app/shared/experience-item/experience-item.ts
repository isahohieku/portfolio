import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TagComponent } from '../ui/tag/tag.component';
import { IconComponent } from '../ui/icon/icon.component';

export interface Technology {
  name: string;
  icon?: string;
}

export interface ExperienceData {
  id: string;
  company: string;
  companyColor?: string;
  companyLink?: string;
  role: string;
  /** Where the role was based, as the résumé records it. Optional: an entry
   *  without a recorded location renders the dates alone. */
  location?: string;
  duration: string;
  overview: string;
  /**
   * One line distilling what was owned, not just the title — read from the
   * accomplishments below rather than written fresh, so it cannot say more
   * than they do. Shown in the landing page's compact role list, where
   * `overview` (written for /about's fuller context) would run too long.
   */
  scopeLine?: string;
  accomplishments: string[];
  technologies: Technology[];
}

@Component({
  selector: 'app-experience-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, TagComponent],
  templateUrl: './experience-item.html'
})
export class ExperienceItem {
  @Input() experience!: ExperienceData;
}
