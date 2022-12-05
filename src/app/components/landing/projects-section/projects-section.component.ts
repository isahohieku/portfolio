import { Component } from '@angular/core';

interface Project {
  logo: string;
  title: string;
  bgColor: string;
  link: string;
  description: string;
}

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss']
})
export class ProjectsSectionComponent {

  projects: Project[] = [
    {
      // tslint:disable-next-line:max-line-length
      logo: 'https://play-lh.googleusercontent.com/HYtLnaZxaGUfnxU-RcxSTPoMe7Jdgk-zpZ55MxY7X_1WJ_0kVbpGG08H207wxAeqYENc=w600-h300-pc0xffffff-pd',
      bgColor: '#35b8ff',
      title: 'Talk360',
      link: 'https://talk360.com/',
      description: 'Talk360 has both a calling app and a payment platform.'
    },
    {
      logo: '/assets/img/applypay.svg',
      bgColor: '#538fb7',
      title: 'Applypay',
      link: 'https://applypay.ng/',
      description: 'Aply Technologies provides tech solutions to the education section among which is the Applypay.'
    },
    {
      logo: 'https://www.hobeei.com/assets/images/logo_new.svg',
      bgColor: '#191919',
      title: 'Hobeei',
      link: 'https://www.hobeei.com/',
      description: 'Hobeei is a Greentech solution created to enable people recycle their unwanted and preowned items.'
    },
    {
      // tslint:disable-next-line:max-line-length
      logo: 'https://media-exp1.licdn.com/dms/image/C4E0BAQH_rV2fbWslrw/company-logo_200_200/0/1626169628807?e=1678320000&v=beta&t=AXBEbidIgzjAiOqGXAVduNwmnOKDlxJ1B7vgP3Dc-wU',
      bgColor: '#49b7ac',
      title: 'Desrio',
      link: 'https://www.desrio.com/',
      description: 'Desrio helps teams collaborate, ideate and reduce distractions during work hours.'
    },
    {
      logo: 'https://play-lh.googleusercontent.com/yfvrYgAfmyMoRvqyx8MjIFCgMt5gDKYPNLwsypR2MoeWN5dxuioO3tH6z3TSkWb0yeA=w240-h480-rw',
      bgColor: '#8948fc',
      title: 'SwipeNG',
      link: 'https://swipe.ng/',
      description: 'Swipe is a fintech solution aimed at providing financial flexibility and convenience for customers.'
    },
    {
      logo: 'https://lwfiles.mycourse.app/sapphire-public/5a3f9ad9ddfde192ed4759aba963a562.png',
      bgColor: '#13abab',
      title: 'Sapphital',
      link: 'https://sapphital.com/',
      description: 'An Edtech'
    }
  ];
}
