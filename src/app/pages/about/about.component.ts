import { Component } from '@angular/core';
import { AboutJumbotronComponent } from '../../components/about/about-jumbotron/about-jumbotron.component';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    standalone: true,
    imports: [AboutJumbotronComponent]
})
export class AboutComponent {

}
