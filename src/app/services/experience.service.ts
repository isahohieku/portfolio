import { Injectable } from '@angular/core';
import { ExperienceData } from '../shared/experience-item/experience-item';

export interface SkillCategory {
  name: string;
  skills: string[];
}

/**
 * Career history — the site's strongest evidence, and previously a literal
 * inside AboutComponent, which meant the landing page could not reach it.
 * Every figure here is quoted from the résumé; nothing is derived or rounded
 * up for display.
 */
@Injectable({ providedIn: 'root' })
export class ExperienceService {
  private readonly startedWorking = new Date('2018-01-01');

  readonly experiences: ExperienceData[] = [
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
        {
          name: "JavaScript",
          icon: "assets/skills/javascript.png"
        },
        {
          name: "React.js",
          icon: "assets/skills/react-js.svg"
        },
        {
          name: "Vue.js",
          icon: "assets/skills/vue-js.png"
        },
        {
          name: "Docker",
          icon: "assets/skills/docker.svg"
        },
        {
          name: "PostgreSQL",
          icon: "assets/skills/postgresql.png"
        },
        {
          name: "Ruby on Rails",
        },
        {
          name: "TypeScript",
          icon: "assets/skills/typescript.svg"
        },
        {
          name: "AWS S3",
          icon: "assets/skills/aws-s3.svg"
        },
        {
          name: "Android",
          icon: "assets/skills/android.png"
        },
        {
          name: "Next.js",
          icon: "assets/skills/next-js.svg"
        },
        {
          name: "Kotlin",
        },
        {
          name: "SCSS",
          icon: "assets/skills/scss.png"
        },
        {
          name: "Tailwind",
          icon: "assets/skills/tailwind.png"
        },
        {
          name: "Firebase",
          icon: "assets/skills/firebase.png"
        },
        {
          name: "Git",
          icon: "assets/skills/git.png"
        },
        {
          name: "Vuetify",
        },
        {
          name: "Sentry",
          icon: "assets/skills/sentry.png"
        },
        {
          name: "Cypress",
          icon: "assets/skills/cypress.png"
        },
        {
          name: "Automation testing",
          icon: ""
        },
        {
          name: "Jest",
          icon: "assets/skills/jest.png"
        },
        {
          name: "Jetpack Compose",
          icon: "assets/skills/jetpack-compose.png"
        }
      ]
    },
    {
      id: 'aply',
      company: 'Apply Technologies',
      companyLink: 'https://applypay.ng/',
      role: 'Senior Frontend Developer',
      duration: 'Nov 2020 – Jul 2022',
      overview: 'Implemented more than double the number of features initially planned to increase the functionality and value of the project. Created automation tools to expedite clients\' onboarding process to progress operational efficiency. Mentored a team of 3 talented engineers to drive improvement of Continuous Integration/Continuous Deployment (CI/CD) processes across all projects. Guided coding practices to provide higher code quality and efficient development cycles.',
      accomplishments: [
        'Optimized ApplyPay frontend performance by 70%',
        'Built automation tools to speed up partner onboarding',
        'Mentored 3 engineers and led frontend QA pipelines',
        'Contributed to scalable AWS and S3 storage workflows'
      ],
      technologies: [
        {
          name: "JavaScript",
          icon: "assets/skills/javascript.png"
        },
        {
          name: "React.js",
          icon: "assets/skills/react-js.svg"
        },
        {
          name: "Docker",
          icon: "assets/skills/docker.svg"
        },
        {
          name: "TypeScript",
          icon: "assets/skills/typescript.svg"
        },
        {
          name: "ES5/ES6",
          icon: "assets/skills/es5-es6.png"
        },
        {
          name: "AWS S3",
          icon: "assets/skills/aws-s3.svg"
        },
        {
          name: "Redux.js",
          icon: "assets/skills/redux-js.svg"
        },
        {
          name: "Next.js",
          icon: "assets/skills/next-js.svg"
        },
        {
          name: "SCSS",
          icon: "assets/skills/scss.png"
        },
        {
          name: "Tailwind",
          icon: "assets/skills/tailwind.png"
        },
        {
          name: "Angular",
          icon: "assets/skills/angular.png"
        },
        {
          name: "Unit Testing",
          icon: ""
        },
        {
          name: "CircleCI",
          icon: "assets/skills/circleci.png"
        },
        {
          name: "Puppeteer",
          icon: "assets/skills/puppeteer.jpg"
        }
      ]
    },
    {
      id: 'hobeei',
      company: 'Hobeei',
      companyLink: 'https://www.hobeei.com/',
      role: 'Senior Frontend Developer',
      duration: 'Feb 2019 – Feb 2021',
      overview: 'Pioneered development of real-time bidding, product tour, chat app, social sharing, and payment gateway features; boosted user engagement by over 50%, increasing annual revenue. Assisted company in reaching finals of Earth tech competition to showcase innovation and impact of Greentech application. Architected frontend application of Greentech application by creating a scalable structure for optimal performance. Represented the company in events and capacities, including YC Startup School to raise funds, promote brand awareness and forge valuable connections. Ensured seamless user experience across different browsers by conducting cross-browser compatibility testing.',
      accomplishments: [
        'Boosted application performance and user experience by 30%.',
        'Coached junior developers on software development best practices.',
        'Achieved 25% reduction in production defects and 30% increase in code efficiency.',
        'Enhanced code quality and reduced bug count by over 40%.',
        'Gained recognition from Forbes-GSE digital start-up accelerator.',
      ],
      technologies: [
        {
          name: "JavaScript",
          icon: "assets/skills/javascript.png"
        },
        {
          name: "TypeScript",
          icon: "assets/skills/typescript.svg"
        },
        {
          name: "NgRx",
          icon: "assets/skills/ngrx.png"
        },
        {
          name: "Socket.io",
          icon: "assets/skills/socket-io.png"
        },
        {
          name: "SCSS",
          icon: "assets/skills/scss.png"
        },
        {
          name: "Angular",
          icon: "assets/skills/angular.png"
        },
        {
          name: "Heroku",
          icon: "assets/skills/heroku.png"
        },
        {
          name: "AWS ECS",
          icon: "assets/skills/aws-ecs.png"
        }
      ]
    },
    {
      id: 'swipeng',
      company: 'SwipeNG',
      companyLink: 'https://swipe.ng/',
      role: 'Frontend Developer',
      duration: 'Jan 2018 – Jan 2019',
      overview: 'Planned and architected front-end application of financial solutions to create a robust foundation for optimal performance. Led talented front-end team in executing key features, including account creation, virtual card application, and admin portal for managing interest rates and users, and integrating third-party payment gateway services. Provided oversight for two redesign processes by focusing on improving usability, accessibility, and speed.',
      accomplishments: [
        'Launched MVP and grew to 43K+ users',
        'Built admin dashboard and analytics portal',
        'Led major UI/UX redesigns for performance and accessibility'
      ],
      technologies: [
        {
          name: "JavaScript",
          icon: "assets/skills/javascript.png"
        },
        {
          name: "Docker",
          icon: "assets/skills/docker.svg"
        },
        {
          name: "TypeScript",
          icon: "assets/skills/typescript.svg"
        },
        {
          name: "NgRx",
          icon: "assets/skills/ngrx.png"
        },
        {
          name: "SCSS",
          icon: "assets/skills/scss.png"
        },
        {
          name: "Angular Material",
          icon: "assets/skills/angular-material.svg"
        }
      ]
    }
  ];

  readonly skillCategories: SkillCategory[] = [
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

  /** Whole years since the first role, so the figure never goes stale. */
  get yearsOfExperience(): number {
    const elapsed = Date.now() - this.startedWorking.getTime();
    return Math.floor(elapsed / (1000 * 60 * 60 * 24 * 365.25));
  }

  /** The most recent roles, for the landing page's experience strip. */
  recent(count: number): ExperienceData[] {
    return this.experiences.slice(0, count);
  }
}
