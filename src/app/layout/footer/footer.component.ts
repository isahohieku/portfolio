import { Component } from '@angular/core';
import { faGithub, faLinkedinIn, faDribbble, faBehance, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    standalone: true,
    imports: [FontAwesomeModule]
})
export class FooterComponent {
  faGithub = faGithub;
  faLinkedinIn = faLinkedinIn;
  faDribbble = faDribbble;
  faBehance = faBehance;
  faTwitter = faXTwitter;

  completeDate = new Date();
  year = this.completeDate.getFullYear();
}
