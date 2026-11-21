import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { IconComponent } from '../../shared/ui/icon/icon.component';

interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, RouterLink, ButtonComponent],
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  /** Each carries a label, so the icon-only links are not five unnamed buttons. */
  readonly socials: SocialLink[] = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/isah-ohieku',
      icon: 'linkedin',
    },
    { label: 'GitHub', href: 'https://www.github.com/isahohieku', icon: 'github' },
    { label: 'Dribbble', href: 'https://www.dribbble.com/isahohieku', icon: 'palette' },
    { label: 'Behance', href: 'https://www.behance.net/isahohiekufa98', icon: 'image' },
    { label: 'X', href: 'https://x.com/isahohieku', icon: 'x' },
  ];
}
