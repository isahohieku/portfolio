import { Component } from '@angular/core';

interface Project {
  logo: string;
  title: string;
  bgColor: string;
  link: string;
  description: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';

  projects: Project[] = [
    {
      logo: 'https://www.hobeei.com/assets/images/logo_new.svg',
      bgColor: '#191919',
      title: 'Hobeei',
      link: 'https://hobeei.com/',
      description: 'A freecycling that intends to foster sharing, reusability and exchanging items in a fun way'
    },
    {
      logo: 'https://lwfiles.mycourse.app/sapphire-public/5a3f9ad9ddfde192ed4759aba963a562.png',
      bgColor: '#13abab',
      title: 'Sapphital',
      link: 'https://sapphital.com/',
      description: 'A learning management system with course creation/taking modules built by me.'
    }
  ];
}
