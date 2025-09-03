import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ExperienceItem, ExperienceData } from '../../shared/experience-item/experience-item';
import { Jumbotron } from '../../shared/jumbotron/jumbotron';

export interface SkillCategory {
  name: string;
  skills: string[];
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ExperienceItem, Jumbotron, ScrollTopModule],
  templateUrl: './about.component.html',
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
        {
          name: "JavaScript",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/7buynaTYKioQpzQ5de1f66DN6Nsb92LMQ5axjLe3.png"
        },
        {
          name: "React.js",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/m7Skelg93WZnzNWvexzWnyhdAXGPjv3N9RnkMeGh.svg"
        },
        {
          name: "Vue.js",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/02XiydobgUDnO50gkcIqVgr0k2XxkhT3evoAnRUj.png"
        },
        {
          name: "Docker",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/jfzHl61nnnMKkhjTWnqKDVGWiMl85GDReuAqVenf.svg"
        },
        {
          name: "PostgreSQL",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/j9CDUe6e2gIPpjdgxt4HDD3ujBLFPPdb4HeHEabS.png"
        },
        {
          name: "Ruby on Rails",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/OKKKoreUG7ezNKnPX9ROhXZdMZGzrbIkHIdrOF5R.png"
        },
        {
          name: "TypeScript",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/bsmjCuthBfMBeJGmV7TssnbUM1COLK6PfCyT6e32.svg"
        },
        {
          name: "AWS S3",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/K6PRmXizbcrKlP3D3vaUoqJRIfQLwkKBQ7QJsLyU.svg"
        },
        {
          name: "Android",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/P2FFQ4gx7HYdUdmQDwQF0E8vXEt1wdENiVn9LtUY.png"
        },
        {
          name: "Next.js",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/dWex3GcUrAdVDxCF1u8tcLaIiRfA1asXoRZk7Lv1.svg"
        },
        {
          name: "Kotlin",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/oiwMsMxbIaNWhxHIhZatJLxQWMK2cCn1ploH0me8.png"
        },
        {
          name: "SCSS",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/cRID2kGzTFDWBkhWsTu12epDSSRAp2W0LAue87QR.png"
        },
        {
          name: "Tailwind",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/c4aFldLGLT4KiPy5BzDP0atvdbP4soWpNA5JCTqE.png"
        },
        {
          name: "Firebase",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/VfL2VvozsR0oA6s30warlWuk4xHGauTWuJP5dx56.png"
        },
        {
          name: "Git",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/AuVlluAchoR4KvfdIaMXd2EXo2hjMKVeDVqfOp27.png"
        },
        {
          name: "Vuetify",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/Ob13b6M15yfMLb5WrB6iKJ4bRKwcoFJCx42nhRjj.png"
        },
        {
          name: "Sentry",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/Rb3JcQajh4uRojrVqklRp1ElZGuGelPbH1ldhqpB.png"
        },
        {
          name: "Cypress",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/UHl8hX7QiuQcxRxyR3zqpazM00X6BftY6DLYW3eL.png"
        },
        {
          name: "Automation testing",
          icon: ""
        },
        {
          name: "Jest",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/e3Lk2Nln5Vd6zwFyJvwv3k53rHYiZtshmQqU0NTA.png"
        },
        {
          name: "Jetpack Compose",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/FhaDVxAD6CmVSACrcP7R2XX648GC0J8QaR7EW89j.png"
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
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/7buynaTYKioQpzQ5de1f66DN6Nsb92LMQ5axjLe3.png"
        },
        {
          name: "React.js",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/m7Skelg93WZnzNWvexzWnyhdAXGPjv3N9RnkMeGh.svg"
        },
        {
          name: "Docker",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/jfzHl61nnnMKkhjTWnqKDVGWiMl85GDReuAqVenf.svg"
        },
        {
          name: "TypeScript",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/bsmjCuthBfMBeJGmV7TssnbUM1COLK6PfCyT6e32.svg"
        },
        {
          name: "ES5/ES6",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/IvYql3sCI3eHMg7HdrXpZbNnbnxlTBL2i6NRvao6.png"
        },
        {
          name: "AWS S3",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/K6PRmXizbcrKlP3D3vaUoqJRIfQLwkKBQ7QJsLyU.svg"
        },
        {
          name: "Redux.js",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/aufp6mNoVBvLa9JppjZnyCMNMyVLHuDPWZQotZho.svg"
        },
        {
          name: "Next.js",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/dWex3GcUrAdVDxCF1u8tcLaIiRfA1asXoRZk7Lv1.svg"
        },
        {
          name: "SCSS",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/cRID2kGzTFDWBkhWsTu12epDSSRAp2W0LAue87QR.png"
        },
        {
          name: "Tailwind",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/c4aFldLGLT4KiPy5BzDP0atvdbP4soWpNA5JCTqE.png"
        },
        {
          name: "Angular",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/wMiixknuyZVVWPmFS909JsEsnLZYRNMawr3e1Rzq.png"
        },
        {
          name: "Unit Testing",
          icon: ""
        },
        {
          name: "CircleCI",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/4N60om116wlVP0cKJP4k7aRv21WLVyCNu33sSfVQ.png"
        },
        {
          name: "Puppeteer",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/41pvLZoinNxCbnYuT2zRn6xDniEj3MMpMybobi4t.jpg"
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
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/7buynaTYKioQpzQ5de1f66DN6Nsb92LMQ5axjLe3.png"
        },
        {
          name: "TypeScript",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/bsmjCuthBfMBeJGmV7TssnbUM1COLK6PfCyT6e32.svg"
        },
        {
          name: "NgRx",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/tB79DUKRQRJOaH1EVonftgsQDCwn20kDOcG7k2dt.png"
        },
        {
          name: "Socket.io",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/UTcWdhpv1mGXSf8NVouhFvMlB7dmOMnKqzKqn02t.png"
        },
        {
          name: "SCSS",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/cRID2kGzTFDWBkhWsTu12epDSSRAp2W0LAue87QR.png"
        },
        {
          name: "Angular",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/wMiixknuyZVVWPmFS909JsEsnLZYRNMawr3e1Rzq.png"
        },
        {
          name: "Heroku",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/ZyYyfvNB6LbnnEDLFUiQnra6QSNeY13NknCuQxbx.png"
        },
        {
          name: "AWS ECS",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/kKruFm5EakvEZ4Z8yNeD3XB80hqcMN7JA4amZ0Pj.png"
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
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/7buynaTYKioQpzQ5de1f66DN6Nsb92LMQ5axjLe3.png"
        },
        {
          name: "Docker",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/jfzHl61nnnMKkhjTWnqKDVGWiMl85GDReuAqVenf.svg"
        },
        {
          name: "TypeScript",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/bsmjCuthBfMBeJGmV7TssnbUM1COLK6PfCyT6e32.svg"
        },
        {
          name: "NgRx",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/tB79DUKRQRJOaH1EVonftgsQDCwn20kDOcG7k2dt.png"
        },
        {
          name: "SCSS",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/cRID2kGzTFDWBkhWsTu12epDSSRAp2W0LAue87QR.png"
        },
        {
          name: "Angular Material",
          icon: "https://res.cloudinary.com/proxify-io/image/upload/v1/app/images/skills/XLbz1Tgs3B1IVHVeYOeFuP0ca5veSS6XSrFsTpb7.svg"
        }
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
