import { Component } from '@angular/core';
import { faGithub, faLinkedinIn, faDribbble, faBehance, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
    imports: [FontAwesomeModule]
})
export class FooterComponent {
  faGithub = faGithub;
  faLinkedinIn = faLinkedinIn;
  faDribbble = faDribbble;
  faBehance = faBehance;
  faTwitter = faTwitter;

  completeDate = new Date();
  year = this.completeDate.getFullYear();
}
