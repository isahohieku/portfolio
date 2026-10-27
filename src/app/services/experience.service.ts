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
}

/**
 * Career history — the site's strongest evidence, and previously a literal
 * inside AboutComponent, which meant the landing page could not reach it.
 *
 * Every figure here is quoted from the résumé PDF served at the site root
 * (`public/Isah Ohieku - Resume.pdf`, read 2026-09-20); nothing is derived or
 * rounded up for display. Figures that earlier drafts carried but the current
 * résumé does not — ApplyPay's +70%, Hobeei's −25% defects, +30% code
 * efficiency, −40% bug count and the Forbes-GSE mention — were dropped rather
 * than softened, per PRODUCT.md's verification standard.
 *
 * The audited Talk360 record is deliberately NOT replaced by the résumé's
 * account of the same role: the résumé restates the percentage claims removed
 * on 2026-09-19 (payment errors −45%, processing +50%, 80+ API issues, −35%
 * project time, +20% CSAT), and a résumé restating a number is not the
 * independent source that standard asks for.
 */
@Injectable({ providedIn: 'root' })
export class ExperienceService {
  private readonly startedWorking = new Date('2018-01-01');

  /**
   * The résumé's professional summary, trimmed of its self-assessments
   * ("strong", "comfortable") and of the years figure, which is computed below
   * so it cannot go stale — the résumé itself still says "7+".
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
      accomplishments: [
        'Diagnosed and fixed a hydration bottleneck in onboarding, cutting a main-thread block of up to ~120s to under 100ms',
        'Shipped the redesigned country-selection and segmentation release that carried 1,100+ new sign-ups shortly after launch',
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
      company: 'Apply Technologies',
      companyLink: 'https://applypay.ng/',
      role: 'Senior Frontend Developer',
      location: 'Abuja, Nigeria',
      duration: 'Nov 2020 - Jul 2022',
      overview:
        'Frontend for ApplyPay and Apply Schools: a payments product and an education platform sharing one engineering team. The work ran past feature delivery into the tooling around it: client onboarding automation, CI/CD, and the AWS infrastructure the products ran on.',
      accomplishments: [
        'Delivered over twice the initially planned feature set, expanding platform functionality and user value',
        'Built and automated support tooling (dashboards, diagnostics, alerting and health checks), accelerating client onboarding and cutting time-to-resolution by 40%',
        'Mentored a team of three engineers to improve CI/CD practices and code quality standards across all projects',
        'Standardised coding practices across projects, measurably improving code quality and development efficiency',
        'Managed AWS cloud infrastructure: deployments, horizontal scaling, security audits and enterprise readiness'
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
        'A greentech donation platform for recycling unwanted and preowned items, built from inception as part of the founding team. Beyond the frontend I represented the company externally, at YC Startup School and the Earth Tech competition.',
      accomplishments: [
        'Architected the entire frontend from inception, a scalable and maintainable structure that improved performance by 30%',
        'Built real-time bidding, product tours, chat, social sharing and payment gateway integrations, boosting user engagement by over 50% and driving revenue growth by 35%',
        'Improved application performance and user experience by 30% through PWA and SSR implementation',
        'Helped carry the company to the finals of the Earth Tech competition',
        'Represented the company at YC Startup School, raising funds and building brand awareness and connections',
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
      accomplishments: [
        'Architected the frontend from inception: account creation, virtual card management, an admin portal for interest rates and users, and third-party payment gateway integrations, with robust error handling and user support features',
        'Scaled the user base from zero to 16,000+ in the first year, with platform growth reaching 43,000+ users subsequently',
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
        'Express',
        'Django',
        'Ruby on Rails',
        'Python',
        'Java',
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
        'User research feedback loops',
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
      duration: 'Jan 2019 - Present'
    },
    {
      id: 'abu-beng',
      institution: 'Ahmadu Bello University',
      qualification: 'B.Eng.',
      field: 'Electrical and Electronics Engineering',
      duration: 'Jan 2011 - Dec 2016'
    }
  ];

  readonly certifications: Certification[] = [
    {
      name: 'AI LLM Engineering Mastery - GenAI, RAG Complete Guide',
      issuer: 'Coursera',
      awarded: 'Feb 2026'
    },
    { name: 'Android App Development with Kotlin', issuer: 'Udemy', awarded: '2025' },
    { name: 'Web Design Accessibility', issuer: 'Udemy', awarded: '2025' },
    { name: 'GRC eLearning: PCI DSS', issuer: 'GRC eLearning', awarded: '2022' },
    { name: 'The Fundamentals of Digital Marketing', issuer: 'Google', awarded: '2020' },
    {
      name: 'Google Africa Scholarship - Mobile Web Specialist',
      issuer: 'Google',
      awarded: '2018'
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
