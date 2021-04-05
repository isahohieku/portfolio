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
      logo: 'https://s3.amazonaws.com/ghost-blog-ff/2019/10/SQUARE-ICON-PNG-1.png',
      bgColor: '#432276',
      title: 'Fireflies',
      link: 'https://fireflies.ai/',
      description: 'Implemented fireflies app integrations with Asana, Trello, Monday.com and more'
    },
    {
      logo: 'https://www.hobeei.com/assets/images/logo_new.svg',
      bgColor: '#191919',
      title: 'Hobeei',
      link: 'https://www.hobeei.com/',
      description: 'A freecycling that intends to foster sharing, reusability and exchanging items in a fun way'
    },
    {
      logo: 'https://lwfiles.mycourse.app/sapphire-public/5a3f9ad9ddfde192ed4759aba963a562.png',
      bgColor: '#13abab',
      title: 'Sapphital',
      link: 'https://sapphital.com/',
      description: 'A learning management system with course creation/taking modules built by me.'
    },
    {
      logo: 'https://blackgoldinvest.com/static/media/favicon.9ba8a0c1.svg',
      bgColor: '#111111',
      title: 'Black gold',
      link: 'https://blackgoldinvest.com/',
      description: 'Investment platform'
    },
    {
      logo: 'https://swipe.ng/assets/img/newswipe-logo-dark.svg',
      bgColor: '#8948fc',
      title: 'SwipeNG',
      link: 'https://swipe.ng/',
      description: 'A Fintech'
    },
    {
      logo: '/assets/img/applypay.svg',
      bgColor: '#538fb7',
      title: 'Applypay',
      link: 'https://applypay.ng/',
      description: 'An Edtech'
    }
  ];
}
