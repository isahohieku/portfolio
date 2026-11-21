import { Injectable } from '@angular/core';
import { ExperienceData } from '../shared/experience-item/experience-item';

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  qualification: string;
  field: string;
  duration: string;
}

export interface Certification {
  name: string;
  issuer: string;
  awarded: string;
  /** The issuer's public verification page, where one exists. */
  credentialUrl?: string;
}

/**
 * Career history — the site's strongest evidence, and previously a literal
 * inside AboutComponent, which meant the landing page could not reach it.
 *
 * Nothing here is derived or rounded up for display. This record is the
 * source, and the PDF at `public/Isah Ohieku - Resume.pdf` is generated from
 * `resume/resume.html`, which restates it. Change a line here, then there.
 */
@Injectable({ providedIn: 'root' })
export class ExperienceService {
  private readonly startedWorking = new Date('2018-01-01');

  /**
   * The résumé's professional summary, trimmed of its self-assessments
   * ("strong", "comfortable") and of the years figure, which is computed below
   * so it cannot go stale. The PDF has to state a fixed "8+"; update it when
   * the computed figure moves past it.
   */
  readonly summary =
    'Software engineer building and improving web and mobile products across fintech, ' +
    'SaaS and other product-driven environments. I own architecture, migrations, ' +
    'performance work and user-facing features from development through production, ' +
    'debug across the stack and through third-party APIs, and improve engineering ' +
    'workflows with automation and AI-assisted development using tools such as Claude ' +
    'and Cursor. I work closely with product, design, QA and backend.';

  readonly experiences: ExperienceData[] = [
    {
      id: 'talk360',
      company: 'Talk360',
      companyLink: 'https://talk360.com/',
      role: 'Frontend & Mobile Software Engineer',
      location: 'Amsterdam, Netherlands (Remote)',
      duration: 'May 2022 - Present',
      overview:
        'A global calling and top-up platform. I work across onboarding, the Shop360 marketplace, the webshop, the embedded web dialler and the payment platform, on web and Android/WebView. Features are owned end to end: technical design, performance, internationalisation, analytics instrumentation, testing and release.',
      scopeLine:
        'Drove a shared design system, a commerce platform and the Embedded architecture across Talk360\'s web apps, alongside feature delivery and incident response.',
      accomplishments: [
        'Shipped the redesigned country-selection and segmentation release, which more than doubled daily sign-ups from about 500 to 1,100+; the flow now carries 2k+ a day',
        'Built self-service receipt automation in Marketplace v1.12.0 (PDF request, poll and preview over the native host bridge), projected to cut manual support receipt requests from ~65 to ~5 a month',
        'Owned the rate calculator end to end, migrating it from Vue to React with backward compatibility and building a Next.js validation app for the new marketing site',
        'Standardised and documented data-cy E2E tags as one source of truth for QA and Engineering, and added Jest/Cypress coverage for analytics events to stop silent tracking regressions',
        'Delivered full 8-locale support for user-facing flows, and led the onboarding app’s upgrade to React 19',
        'Led incident triage and resolution for customer-reported issues across the web app, APIs and integrations, and authored the runbooks, monitoring dashboards, alerting and support tooling behind it'
      ],
      technologies: [
        { name: 'TypeScript', icon: 'assets/skills/typescript.svg' },
        { name: 'JavaScript', icon: 'assets/skills/javascript.png' },
        { name: 'React.js', icon: 'assets/skills/react-js.svg' },
        { name: 'Next.js', icon: 'assets/skills/next-js.svg' },
        { name: 'Vue.js', icon: 'assets/skills/vue-js.png' },
        { name: 'Kotlin' },
        { name: 'Android', icon: 'assets/skills/android.png' },
        { name: 'Jetpack Compose', icon: 'assets/skills/jetpack-compose.png' },
        { name: 'Cypress', icon: 'assets/skills/cypress.png' },
        { name: 'Jest', icon: 'assets/skills/jest.png' },
        { name: 'Mixpanel' },
        { name: 'Firebase', icon: 'assets/skills/firebase.png' },
        { name: 'Sentry', icon: 'assets/skills/sentry.png' },
        { name: 'Storybook' },
        { name: 'Tailwind', icon: 'assets/skills/tailwind.png' },
        { name: 'SCSS', icon: 'assets/skills/scss.png' },
        { name: 'Git', icon: 'assets/skills/git.png' }
      ]
    },
    {
      id: 'aply',
      company: 'Aply Technologies',
      companyLink: 'https://applypay.ng/',
      role: 'Senior Frontend Developer',
      location: 'Abuja, Nigeria',
      duration: 'Nov 2020 - Jul 2022',
      overview:
        'Frontend for ApplyPay and Apply Schools: a payments product and an education platform sharing one engineering team. The work ran past feature delivery into the tooling around it: client onboarding automation, CI/CD, and the AWS infrastructure the products ran on.',
      scopeLine:
        'Mentored a team of three engineers and standardised CI/CD and coding practices across every project at the company.',
      accomplishments: [
        'Delivered over twice the initially planned feature set',
        'Built and automated support tooling (dashboards, diagnostics, alerting and health checks), accelerating client onboarding and cutting time-to-resolution by 40%',
        'Mentored a team of three engineers to improve CI/CD practices and code quality standards across all projects',
        'Standardised coding practices across projects',
        'Managed the AWS infrastructure both products ran on: deployments, horizontal scaling and security audits'
      ],
      technologies: [
        { name: 'JavaScript', icon: 'assets/skills/javascript.png' },
        { name: 'TypeScript', icon: 'assets/skills/typescript.svg' },
        { name: 'React.js', icon: 'assets/skills/react-js.svg' },
        { name: 'Next.js', icon: 'assets/skills/next-js.svg' },
        { name: 'Redux.js', icon: 'assets/skills/redux-js.svg' },
        { name: 'Angular', icon: 'assets/skills/angular.png' },
        { name: 'ES5/ES6', icon: 'assets/skills/es5-es6.png' },
        { name: 'SCSS', icon: 'assets/skills/scss.png' },
        { name: 'Tailwind', icon: 'assets/skills/tailwind.png' },
        { name: 'Docker', icon: 'assets/skills/docker.svg' },
        { name: 'AWS S3', icon: 'assets/skills/aws-s3.svg' },
        { name: 'CircleCI', icon: 'assets/skills/circleci.png' },
        { name: 'Puppeteer', icon: 'assets/skills/puppeteer.jpg' },
        { name: 'Unit Testing' }
      ]
    },
    {
      id: 'hobeei',
      company: 'Hobeei',
      companyLink: 'https://www.hobeei.com/',
      role: 'Lead Frontend Engineer (Founding Team)',
      location: 'Abuja, Nigeria',
      duration: 'Feb 2019 - Feb 2021',
      overview:
        'A greentech freecycle marketplace, where people gave away unwanted and preowned items and others bid for them with a virtual currency, built from inception as part of the founding team. Beyond the frontend I represented the company externally, at YC Startup School and the Earth Tech competition.',
      scopeLine:
        'Architected the product’s frontend from inception as part of the founding team, and led it from the first commit to the last.',
      accomplishments: [
        'Architected the entire frontend from inception, a scalable and maintainable structure',
        'Built real-time bidding, product tours, chat, social sharing and payment gateway integrations',
        'Over the same period, user engagement on the platform grew by over 50% and revenue by 35%',
        'Raised the Lighthouse performance score by 30% through PWA and SSR implementation',
        'Helped carry the company to the finals of the Earth Tech competition',
        'Represented the company at YC Startup School',
        'Held the experience consistent across browsers through cross-browser compatibility testing'
      ],
      technologies: [
        { name: 'JavaScript', icon: 'assets/skills/javascript.png' },
        { name: 'TypeScript', icon: 'assets/skills/typescript.svg' },
        { name: 'Angular', icon: 'assets/skills/angular.png' },
        { name: 'NgRx', icon: 'assets/skills/ngrx.png' },
        { name: 'Socket.io', icon: 'assets/skills/socket-io.png' },
        { name: 'SCSS', icon: 'assets/skills/scss.png' },
        { name: 'Heroku', icon: 'assets/skills/heroku.png' },
        { name: 'AWS ECS', icon: 'assets/skills/aws-ecs.png' }
      ]
    },
    {
      id: 'swipeng',
      company: 'SwipeNG',
      companyLink: 'https://swipe.ng/',
      role: 'Frontend Developer',
      location: 'Lagos, Nigeria',
      duration: 'Jan 2018 - Jan 2019',
      overview:
        'An early-stage fintech. I planned and architected the frontend from inception and led the frontend team through delivery, establishing the foundation the product scaled on.',
      scopeLine:
        'Architected the frontend from inception and led two product redesigns in the platform’s first year.',
      accomplishments: [
        'Architected the frontend from inception: account creation, virtual card management, an admin portal for interest rates and users, and third-party payment gateway integrations, with robust error handling and user support features',
        'The platform grew from zero to 16,000+ users in its first year, and later to 43,000+',
        'Led two product redesigns focused on usability, accessibility and performance'
      ],
      technologies: [
        { name: 'JavaScript', icon: 'assets/skills/javascript.png' },
        { name: 'TypeScript', icon: 'assets/skills/typescript.svg' },
        { name: 'Angular', icon: 'assets/skills/angular.png' },
        { name: 'Angular Material', icon: 'assets/skills/angular-material.svg' },
        { name: 'NgRx', icon: 'assets/skills/ngrx.png' },
        { name: 'SCSS', icon: 'assets/skills/scss.png' },
        { name: 'Docker', icon: 'assets/skills/docker.svg' }
      ]
    }
  ];

  /**
   * Grouped from the résumé's single flat "Skills & Proficiencies" paragraph,
   * which lists 60+ entries alphabetically — unreadable as a wall, and it
   * duplicated WebSocket/Socket.IO. Grouping is the only editorial act here;
   * nothing was added that the résumé does not name.
   */
  readonly skillCategories: SkillCategory[] = [
    {
      name: 'Frontend',
      skills: [
        'Angular',
        'React',
        'Vue.js',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'Micro-frontend',
        'GSAP'
      ]
    },
    {
      name: 'Styling & UI',
      skills: ['SCSS', 'Tailwind CSS', 'Angular Material', 'Material UI']
    },
    {
      name: 'Backend & data',
      skills: [
        'Node.js',
        'NestJS',
        'Django',
        'Python',
        'GraphQL',
        'RESTful APIs',
        'PostgreSQL',
        'MySQL',
        'MongoDB',
        'Redis',
        'WebSocket / Socket.IO'
      ]
    },
    {
      name: 'Mobile',
      skills: ['Kotlin', 'Jetpack Compose']
    },
    {
      name: 'AI',
      skills: [
        'AI-assisted development (Claude, Cursor, Copilot, Antigravity)',
        'OpenAI API',
        'LangChain',
        'MCP'
      ]
    },
    {
      name: 'Testing & quality',
      skills: ['Jest', 'Jasmine', 'Cypress', 'Lighthouse']
    },
    {
      name: 'Cloud & DevOps',
      skills: [
        'AWS',
        'AWS S3',
        'Docker',
        'CI/CD',
        'GitHub Actions',
        'CircleCI',
        'Heroku',
        'Webpack',
        'Cloudinary'
      ]
    },
    {
      name: 'Practice',
      skills: [
        'Product architecture and scalable system design',
        'API design and microservices',
        'Payment platform development and integration',
        'Web performance optimisation',
        'Accessibility (WCAG)',
        'Agile/Scrum',
        'JIRA'
      ]
    }
  ];

  readonly education: EducationEntry[] = [
    {
      id: 'abu-mba',
      institution: 'Ahmadu Bello University',
      qualification: 'MBA',
      field: 'Business Administration Management',
      duration: 'Jan 2019 - paused'
    },
    {
      id: 'abu-beng',
      institution: 'Ahmadu Bello University',
      qualification: 'B.Eng.',
      field: 'Electrical and Electronics Engineering',
      duration: 'Jan 2011 - Dec 2016'
    }
  ];

  /**
   * Only certifications that back something else on the site: the AI
   * projects, the mobile half of the Talk360 title, and the WCAG skill.
   * Digital marketing, a PCI DSS e-learning module and a 2018 scholarship
   * were cut on 2026-11-21 as noise on a senior profile.
   */
  readonly certifications: Certification[] = [
    {
      name: 'AI & LLM Engineering Mastery – GenAI, RAG Complete Guide',
      issuer: 'Packt, via Coursera',
      awarded: 'Feb 2026',
      credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/certificate/PABG99TPWPAB'
    },
    {
      name: 'Android App Development with Kotlin',
      issuer: 'Udemy',
      awarded: '2025',
      credentialUrl: 'https://www.udemy.com/certificate/UC-09343453-239c-4612-8d61-b903cfbf5c10/'
    },
    {
      name: 'Web Design Accessibility',
      issuer: 'Udemy',
      awarded: '2025',
      credentialUrl: 'https://www.udemy.com/certificate/UC-19d2469b-d461-4d5e-9fe2-f88cdd5fc4d0/'
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
