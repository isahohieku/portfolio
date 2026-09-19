import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

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
  imports: [RouterLink],
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  /** Each carries a label, so the icon-only links are not five unnamed buttons. */
  readonly socials: SocialLink[] = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/isah-ohieku-b982a6164',
      icon: 'pi pi-linkedin',
    },
    { label: 'GitHub', href: 'https://www.github.com/isahohieku', icon: 'pi pi-github' },
    { label: 'Dribbble', href: 'https://www.dribbble.com/isahohieku', icon: 'pi pi-palette' },
    { label: 'Behance', href: 'https://www.behance.net/isahohiekufa98', icon: 'pi pi-image' },
    { label: 'X', href: 'https://x.com/isahohieku', icon: 'pi pi-twitter' },
  ];
}
