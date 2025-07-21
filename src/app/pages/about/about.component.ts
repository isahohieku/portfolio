import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceItem, ExperienceData } from '../../shared/experience-item/experience-item';
import { Jumbotron } from '../../shared/jumbotron/jumbotron';

export interface SkillCategory {
  name: string;
  skills: string[];
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ExperienceItem, Jumbotron],
  templateUrl: './about.component.html'
})
export class AboutComponent {

  yearsOfExperience = 6;

  experiences: ExperienceData[] = [
    {
      id: 'talk360',
      company: 'Talk360',
      companyLink: 'https://talk360.com/',
      role: 'Senior Frontend Developer',
      duration: 'May 2022 – Present',
      overview: 'Developed new features and resolved bugs to enhance the payment platform; collaborated closely with the QA team to test and validate updates; reduced payment errors by 45%. Facilitated integration and maintenance of third-party APIs to ensure seamless functionality of payment platform; identified and resolved 80+ API issues, resulting in 50% faster payment processing time. Guaranteed team met project deadlines, delivering high-quality code, and successfully completed payment platform overhaul; reduced project completion time by 35% through improved project management and delegation of tasks. Executed appealing webpages on the admin dashboard of the payment platform utilizing Figma; optimized UI to enhance user experience; increased customer satisfaction ratings by 20%. Create documentation for website design and development standards for knowledge transfer.',
      accomplishments: [
        'Reduced payment errors by 45% through logic improvements',
        'Improved mobile onboarding conversion by 37%',
        'Cut load times from 2.5s to <1s using optimization techniques',
        'Led admin dashboard redesign and release'
      ],
      technologies: [
        { name: 'Angular' },
        { name: 'TypeScript' },
        { name: 'RxJS' },
        { name: 'Tailwind CSS' },
        { name: 'Cypress' },
        { name: 'AWS S3' }
      ]
    },
    {
      id: 'aply',
      company: 'Aply Technologies',
      role: 'Senior Frontend Developer',
      duration: 'Nov 2020 – Jul 2022',
      overview: 'Focused on building and scaling onboarding/payment tools. Championed code quality, mentored junior developers, and enhanced CI/CD pipelines.',
      accomplishments: [
        'Optimized ApplyPay frontend performance by 70%',
        'Built automation tools to speed up partner onboarding',
        'Mentored 3 engineers and led frontend QA pipelines',
        'Contributed to scalable AWS and S3 storage workflows'
      ],
      technologies: [
        { name: 'Angular' },
        { name: 'NgRx' },
        { name: 'SCSS' },
        { name: 'AWS Lambda' },
        { name: 'Jest' },
        { name: 'GitHub Actions' }
      ]
    },
    {
      id: 'hobeei',
      company: 'Hobeei',
      role: 'Senior Frontend Developer',
      duration: 'Feb 2019 – Feb 2021',
      overview: 'Architected and delivered scalable frontend for a Greentech donation platform. Built social features and improved engagement for mobile-first users.',
      accomplishments: [
        'Built real-time bidding and social sharing features',
        'Improved performance by 30% via SSR and PWA',
        'Contributed to award-winning tech pitch at YC and Earth Tech'
      ],
      technologies: [
        { name: 'Angular' },
        { name: 'Angular Universal' },
        { name: 'Firebase' },
        { name: 'WebSockets' },
        { name: 'PWA' }
      ]
    },
    {
      id: 'swipeng',
      company: 'SwipeNG',
      role: 'Frontend Developer',
      duration: 'Jan 2018 – Jan 2019',
      overview: 'Built and maintained SwipeNG\'s fintech web platform from scratch, enabling thousands of users to manage digital cards and payments.',
      accomplishments: [
        'Launched MVP and grew to 43K+ users',
        'Built admin dashboard and analytics portal',
        'Led major UI/UX redesigns for performance and accessibility'
      ],
      technologies: [
        { name: 'AngularJS' },
        { name: 'Bootstrap' },
        { name: 'REST APIs' },
        { name: 'jQuery' },
        { name: 'Chart.js' }
      ]
    }
  ];

  skillCategories: SkillCategory[] = [
    {
      name: 'Frontend',
      skills: ['Angular', 'React', 'Vue.js', 'TypeScript', 'JavaScript']
    },
    {
      name: 'Styling',
      skills: ['CSS3', 'SCSS', 'Tailwind CSS', 'Bootstrap', 'Material UI']
    },
    {
      name: 'Tools & Cloud',
      skills: ['AWS', 'Docker', 'Git', 'Webpack', 'Jest']
    }
  ];

  constructor() {
    // Calculate years of experience dynamically
    const startDate = new Date('2018-01-01');
    const currentDate = new Date();
    this.yearsOfExperience = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365));
  }
}
