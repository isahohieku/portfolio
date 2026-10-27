import { Injectable } from '@angular/core';

export interface ProjectImage {
  id: number;
  imageUrl: string;
  imageName: string;
  position: number;
  /** An 800px-wide copy, only where the original is wide enough for one to
   *  save anything. Portrait phone captures are already narrower than that. */
  smallUrl?: string;
}

/**
 * A narrative writeup for a project.
 *
 * Every field beyond `context` and `contribution` is optional and simply does
 * not render when absent. That is deliberate: most of these projects have no
 * recorded outcome, and an empty "Results" heading would either sit there
 * looking unfinished or invite something invented to fill it.
 */
export interface CaseStudy {
  /** What the product is and who it serves. */
  context: string;
  /** What Isah personally worked on. */
  contribution: string;
  /** The pieces of that contribution, where there are enough of them that a
   *  sentence would bury them. Rendered as a list after `contribution`. */
  contributionPoints?: string[];
  /**
   * Sections describing the surfaces. `image` is the `position` of the
   * screenshot that shows what the section claims, so the page can set the two
   * side by side; left out where no capture shows it.
   */
  sections?: { heading: string; body: string; image?: number }[];
  /** Verified outcomes only. Omitted where none is on record — never inferred. */
  outcomes?: string[];
  stack?: string[];
}

/** Client engagements and open-source work are different claims, and the
 *  listing groups them rather than interleaving them. */
export type ProjectKind = 'client' | 'open-source';

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectData {
  id: number;
  /** Stable, human-readable identifier. Accepted by the /works/:id route alongside the numeric id. */
  slug: string;
  title: string;
  position: number;
  description?: string;
  portfolio_url?: string;
  /**
   * The site no longer answers. Checked by hand, not at runtime: a "Visit the
   * live site" button that lands on a dead host reads as abandoned work, so
   * the page says the site is offline instead of linking to it.
   */
  siteOffline?: boolean;
  kind: ProjectKind;
  /**
   * When the work happened. For employer projects this is the tenure of the
   * role it was built in (from ExperienceService), since no project-specific
   * dates are on record. Absent means unknown.
   */
  period?: string;
  /** Open-source licence. An attribute of the project, not an outcome. */
  license?: string;
  /**
   * What Isah's part was, in a few words. Only where the record says so: an
   * employer title from the verified experience, or authorship the
   * repositories show. Absent means unknown, not "none".
   */
  role?: string;
  bgColor: string;
  /** null when no logo asset is available; consumers fall back to a text wordmark. */
  logo: string | null;
  images: ProjectImage[];
  /** Extra destinations — a repository, a package page, a live demo. */
  links?: ProjectLink[];
  /**
   * Short, externally checkable facts rendered on the card's colour plate
   * where no logo asset exists. Only set where the facts are sourced — an
   * empty plate is the honest result otherwise, not an invitation to invent.
   */
  plateFacts?: string[];
  /** Present only where a real writeup exists. */
  caseStudy?: CaseStudy;
}

/**
 * Single source of truth for project data.
 *
 * Replaces three divergent sources that disagreed about what the work was:
 * this service (4 projects), a hardcoded array in ProjectsSectionComponent
 * (6 different projects), and an unused ProjectsService holding scaffold data.
 * Every project now has a real id, so every project is linkable.
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: ProjectData[] = [
    {
      id: 9613,
      slug: "hobeei-freecycle-application",
      title: "Hobeei Freecycle application",
      position: 1,
      kind: "client",
      role: "Lead Frontend Engineer, founding team at Hobeei",
      period: "Feb 2019 - Feb 2021",
      description: "A Greentech donation platform that enables people to recycle their unwanted and preowned items. Built with modern web technologies to promote sustainability and community sharing.",
      portfolio_url: "https://www.hobeei.com/",
      siteOffline: true,
      bgColor: "#2f7d5d",
      logo: null,
      images: [
        { id: 7038, imageUrl: "assets/projects/hobeei-freecycle-application/01.jpg", imageName: "Home page, from the giveaway hero through how Hobeei works", position: 1 },
        { id: 7039, imageUrl: "assets/projects/hobeei-freecycle-application/02.jpg", smallUrl: "assets/projects/hobeei-freecycle-application/02-800.jpg", imageName: "Listings feed: featured items by category, each with a countdown and its bid count", position: 2 },
        { id: 7040, imageUrl: "assets/projects/hobeei-freecycle-application/03.png", smallUrl: "assets/projects/hobeei-freecycle-application/03-800.png", imageName: "Item page: bidding for a listing in Buzzes against a countdown", position: 3 },
        { id: 7041, imageUrl: "assets/projects/hobeei-freecycle-application/04.png", smallUrl: "assets/projects/hobeei-freecycle-application/04-800.png", imageName: "Recharge page: bundles of Hopps, priced in Buzzes", position: 4 }
      ]
    },
    {
      id: 9614,
      slug: "apply-schools-and-applypay",
      title: "Apply Schools and Applypay",
      position: 2,
      kind: "client",
      role: "Senior Frontend Developer at Apply Technologies",
      period: "Nov 2020 - Jul 2022",
      description: "Educational technology platform providing comprehensive solutions for schools and payment processing. Features include student management, fee collection, and administrative tools.",
      portfolio_url: "https://applypay.ng/",
      bgColor: "#538fb7",
      logo: "/assets/img/applypay.svg",
      images: [
        { id: 7042, imageUrl: "assets/projects/apply-schools-and-applypay/01.jpg", imageName: "Apply home page, introducing Apply Schools, Apply Markets and Apply Pay", position: 1 },
        { id: 7043, imageUrl: "assets/projects/apply-schools-and-applypay/02.png", smallUrl: "assets/projects/apply-schools-and-applypay/02-800.png", imageName: "School admin: the list of classes, filterable by session and status", position: 2 },
        { id: 7044, imageUrl: "assets/projects/apply-schools-and-applypay/03.png", smallUrl: "assets/projects/apply-schools-and-applypay/03-800.png", imageName: "Class detail: the teacher, the session dates and the class roster", position: 3 },
        { id: 7045, imageUrl: "assets/projects/apply-schools-and-applypay/04.png", smallUrl: "assets/projects/apply-schools-and-applypay/04-800.png", imageName: "Adding a student, step one of three: basic student data", position: 4 },
        { id: 7052, imageUrl: "assets/projects/apply-schools-and-applypay/05.png", smallUrl: "assets/projects/apply-schools-and-applypay/05-800.png", imageName: "Sign-in, by email or phone number", position: 5 },
        { id: 7059, imageUrl: "assets/projects/apply-schools-and-applypay/06.png", smallUrl: "assets/projects/apply-schools-and-applypay/06-800.png", imageName: "Parent view: a guardian's children, with the way through to their invoices", position: 6 }
      ]
    },
    {
      id: 9616,
      slug: "talk360-payment-platform",
      title: "Talk360 Payment Platform",
      position: 3,
      kind: "client",
      role: "Frontend & Mobile Software Engineer at Talk360",
      period: "May 2022 - present",
      description: "Comprehensive payment platform enabling international calling and mobile top-up services. Features secure payment processing, user management, and real-time transaction monitoring.",
      portfolio_url: "https://talk360.com/",
      bgColor: "#162240",
      logo: "assets/projects/logos/talk360.svg",
      images: [
        { id: 7048, imageUrl: "assets/projects/talk360-payment-platform/02.png", smallUrl: "assets/projects/talk360-payment-platform/02-800.png", imageName: "Back-office session list, filtered by payment service provider, method, state and period", position: 1 },
        { id: 7049, imageUrl: "assets/projects/talk360-payment-platform/03.png", smallUrl: "assets/projects/talk360-payment-platform/03-800.png", imageName: "Session detail showing the per-attempt timeline of provider references, statuses and contexts", position: 2 },
        { id: 7050, imageUrl: "assets/projects/talk360-payment-platform/04.png", imageName: "Mobile checkout: choosing a payment method for a top-up", position: 3 },
        { id: 7051, imageUrl: "assets/projects/talk360-payment-platform/05.png", imageName: "Mobile checkout: card entry, with the secured-checkout indicator", position: 4 },
        { id: 7047, imageUrl: "assets/projects/talk360-payment-platform/01.png", smallUrl: "assets/projects/talk360-payment-platform/01-800.png", imageName: "Back-office sign-in, with a two-factor token", position: 5 }
      ],
      caseStudy: {
        context:
          "Talk360 sells international calling and mobile top-up to customers across Africa and Europe, which means taking money in a lot of countries that do not share a payment culture. The platform is two-sided: the checkout a customer completes on their phone, and the back-office the team uses to work out what happened when one of those payments does not land.",
        contribution:
          "I work on the payment platform as part of a wider frontend and mobile remit at Talk360, alongside onboarding, the Shop360 marketplace, the webshop and the embedded web dialler.",
        sections: [
          {
            heading: "Checkout, on a phone, in someone else\u2019s market",
            body: "The customer flow is deliberately short (amount, method, details, confirm) because it runs on mid-range Android handsets over unreliable mobile data. Which methods appear depends on where the customer is: card, PayPal and Alipay sit alongside iDEAL in the Netherlands and USSD in Nigeria, and a search affordance covers the long tail rather than pretending the list is complete. The secured-checkout marker stays visible on every step, since this is the point where an unfamiliar brand has to earn a card number.",
            image: 3
          },
          {
            heading: "A back-office built for diagnosis, not reporting",
            body: "A failed payment is a support ticket, so the internal tool is organised around answering \u201cwhy did this one fail?\u201d rather than counting volume. Sessions are filterable by provider, method type, state and period across thousands of records, and each session opens into the merchant and user behind it plus a timeline of every attempt: provider reference, status, and the context it came from, whether a stored-payment call, a redirect, or an asynchronous webhook. Payments fail in the gaps between those three, which is exactly why the timeline shows them separately.",
            image: 2
          }
        ],
        stack: ["TypeScript", "React.js", "Vue.js", "Android / WebView", "Sentry", "Cypress"]
      }
    },
    {
      id: 9617,
      slug: "talk360-calling-app",
      title: "Talk360 Calling app",
      position: 4,
      kind: "client",
      role: "Frontend & Mobile Software Engineer at Talk360",
      period: "May 2022 - present",
      description: "Mobile calling application providing affordable international calls with crystal clear voice quality. Features include contact management, call history, and credit top-up functionality.",
      bgColor: "#162240",
      logo: "assets/projects/logos/talk360.svg",
      images: [
        { id: 7053, imageUrl: "assets/projects/talk360-calling-app/01.png", imageName: "Onboarding: the first welcome screen", position: 1 },
        { id: 7054, imageUrl: "assets/projects/talk360-calling-app/02.png", imageName: "Country picker for the phone number, with search", position: 2 },
        { id: 7055, imageUrl: "assets/projects/talk360-calling-app/03.png", imageName: "Phone verification: the six-digit SMS code, with a resend timer", position: 3 },
        { id: 7056, imageUrl: "assets/projects/talk360-calling-app/04.png", imageName: "Home: who to call, the credit balance, and buying credit or checking rates", position: 4 },
        { id: 7057, imageUrl: "assets/projects/talk360-calling-app/05.png", imageName: "Keypad, with the remaining credit and minutes", position: 5 },
        { id: 7058, imageUrl: "assets/projects/talk360-calling-app/06.png", imageName: "Account menu: language, credit, rates, referrals and vouchers", position: 6 }
      ]
    },
    {
      id: 9621,
      slug: "kollo",
      title: "Kollo",
      position: 5,
      kind: "client",
      role: "Website, admin dashboard and admin API",
      description: "A savings platform that brings thrift contributions online: rotating and target group savings alongside personal plans. I built the website and waitlist, the admin dashboard, and the admin side of the API.",
      portfolio_url: "https://kollo.ng/",
      bgColor: "#5310b7",
      logo: "assets/projects/logos/kollo.svg",
      images: [
        { id: 7068, imageUrl: "assets/projects/kollo/01.jpg", smallUrl: "assets/projects/kollo/01-800.jpg", imageName: "Home page hero, with the app's wallet and rotation-group balance", position: 1 },
        { id: 7069, imageUrl: "assets/projects/kollo/02.jpg", smallUrl: "assets/projects/kollo/02-800.jpg", imageName: "Waitlist page: the reCAPTCHA-protected sign-up form", position: 2 },
        { id: 7070, imageUrl: "assets/projects/kollo/03.jpg", smallUrl: "assets/projects/kollo/03-800.jpg", imageName: "The five savings products beside the app's group savings screen", position: 3 },
        { id: 7071, imageUrl: "assets/projects/kollo/04.jpg", smallUrl: "assets/projects/kollo/04-800.jpg", imageName: "Fee comparison against other banks", position: 4 },
        { id: 7072, imageUrl: "assets/projects/kollo/05.jpg", smallUrl: "assets/projects/kollo/05-800.jpg", imageName: "FAQ page, with structured concept and result panels", position: 5 },
        { id: 7073, imageUrl: "assets/projects/kollo/06.jpg", smallUrl: "assets/projects/kollo/06-800.jpg", imageName: "Support contact form", position: 6 },
        { id: 7074, imageUrl: "assets/projects/kollo/07.jpg", imageName: "Home page on a phone", position: 7 }
      ],
      caseStudy: {
        context:
          "Rotating group savings, where everyone pays in each month and one member takes the pot in turn, is an old habit that has always run on trust and a notebook. Kollo moves it online, alongside target savings for groups working towards a shared goal and fixed, automated and flexible plans for individuals.",
        contribution:
          "I built everything that faces the public or the operations team. The core savings engine was written by the backend lead.",
        contributionPoints: [
          "The public website and its waitlist",
          "The internal admin dashboard",
          "The admin half of the AdonisJS API: routes and middleware, customer flags and suspension, and the waitlist service with its reCAPTCHA check",
          "The transactional email templates"
        ],
        sections: [
          {
            heading: "A waitlist that only counts real people",
            body: "The pre-launch site is in Next.js: the landing page, FAQ, and the terms, privacy and cookie pages, including the cooperative-membership consent that joining requires. The waitlist and contact forms are protected by reCAPTCHA v3, and the API checks the score on the server before it records an entry, so the list counts people rather than bots.",
            image: 2
          },
          {
            heading: "An admin built before the first customer",
            body: "The dashboard gives the operations team a customer directory with suspension, flags recorded with a type and a severity, a customer activity view, a transactions view with summary statistics and sensitive values masked, waitlist management, and a knowledge base whose articles are written in a Markdown editor with a live preview. A suspended customer is refused at sign-in by the API itself, not just hidden in the interface."
          },
          {
            heading: "Emails that read as one product",
            body: "The messages customers receive (welcome and registration, requests to join a group and their approval, requests to swap places in a rotation and their approval, enquiry replies) share one templated header and footer, and each has a dark-mode variant so it stays legible in whichever mail client opens it."
          }
        ],
        stack: ["Next.js", "React", "TypeScript", "AdonisJS", "PostgreSQL", "Redis", "Tailwind CSS", "TanStack Table"]
      }
    },
    {
      id: 9622,
      slug: "nexus360",
      title: "Nexus360",
      position: 6,
      kind: "client",
      role: "Sole developer: site and API",
      description: "The website for an Abuja technology and procurement consultancy: five service pages, a contact flow, and the email API behind it. I built both the Next.js site and the API.",
      portfolio_url: "https://nexus360.ng/",
      bgColor: "#0a2540",
      logo: "assets/projects/logos/nexus360.png",
      images: [
        { id: 7060, imageUrl: "assets/projects/nexus360/01.jpg", smallUrl: "assets/projects/nexus360/01-800.jpg", imageName: "Home page hero, pairing the systems and sourcing sides of the business", position: 1 },
        { id: 7061, imageUrl: "assets/projects/nexus360/02.jpg", smallUrl: "assets/projects/nexus360/02-800.jpg", imageName: "Software development service page, opening on the problems it replaces", position: 2 },
        { id: 7062, imageUrl: "assets/projects/nexus360/03.jpg", smallUrl: "assets/projects/nexus360/03-800.jpg", imageName: "Contact page: the enquiry form beside what happens after it is sent", position: 3 },
        { id: 7063, imageUrl: "assets/projects/nexus360/04.jpg", imageName: "Home page on a phone", position: 4 },
        { id: 7064, imageUrl: "assets/projects/nexus360/05.jpg", imageName: "Procurement service page on a phone", position: 5 },
        { id: 7065, imageUrl: "assets/projects/nexus360/06.jpg", smallUrl: "assets/projects/nexus360/06-800.jpg", imageName: "Software development page: one weekly report, made by hand and through an integration", position: 6 },
        { id: 7066, imageUrl: "assets/projects/nexus360/07.jpg", smallUrl: "assets/projects/nexus360/07-800.jpg", imageName: "Careers page, inviting CVs in place of a list of open roles", position: 7 },
        { id: 7067, imageUrl: "assets/projects/nexus360/08.jpg", imageName: "Enquiry form on a phone, with optional fields marked", position: 8 }
      ],
      caseStudy: {
        context:
          "Nexus360 is a consultancy in Abuja that does two things most firms keep apart: software, IT strategy and process automation on one side, and procurement, supplier management, inspection and delivery on the other. The site has to explain both to businesses, government agencies and institutions, and turn a visit into an enquiry.",
        contribution:
          "I built the whole of it: the Next.js marketing site, its deployment pipeline, and the separate Next.js API that handles the contact form's email.",
        sections: [
          {
            heading: "One template, five services",
            body: "Each service page opens on the problems the service replaces rather than a list of capabilities, and all five share one ServicePage component, so a new service is content rather than a new layout. The site is a static export, built by GitHub Actions and deployed to cPanel hosting.",
            image: 2
          },
          {
            heading: "An enquiry that is never lost",
            body: "The contact form sets out what happens after it is sent (a reply, a short call, a written scope) beside the form itself. If the request fails or times out, nothing the visitor typed is cleared: the error offers to email the enquiry instead or copy it to the clipboard.",
            image: 3
          },
          {
            heading: "A small API, hardened",
            body: "Enquiries go to a dedicated API that sends two emails through Resend from React templates: a notification to the team and an acknowledgement to the sender. Input is validated and sanitised, requests are rate-limited per client and checked against an allowed-origin list, and the validation and sanitisation are covered by Vitest tests run in CI."
          }
        ],
        stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Radix UI", "Framer Motion", "Resend", "Vitest", "GitHub Actions"]
      }
    },
    {
      id: 9618,
      slug: "desrio",
      title: "Desrio",
      position: 7,
      kind: "client",
      description: "Desrio helps teams collaborate, ideate and reduce distractions during work hours.",
      portfolio_url: "https://www.desrio.com/",
      siteOffline: true,
      bgColor: "#49b7ac",
      logo: null,
      images: []
    },
    {
      id: 9619,
      slug: "swipeng",
      title: "SwipeNG",
      position: 8,
      kind: "client",
      role: "Frontend Developer at SwipeNG",
      period: "Jan 2018 - Jan 2019",
      description: "Swipe is a fintech solution aimed at providing financial flexibility and convenience for customers.",
      portfolio_url: "https://swipe.ng/",
      bgColor: "#8948fc",
      logo: "assets/projects/logos/swipeng.webp",
      images: []
    },
    {
      id: 9620,
      slug: "sapphital",
      title: "Sapphital",
      position: 9,
      kind: "client",
      description: "An Edtech",
      portfolio_url: "https://sapphital.com/",
      bgColor: "#13abab",
      logo: "assets/projects/logos/sapphital.png",
      images: []
    },
    {
      id: 9701,
      slug: "ngx-horizontal-scroll-menu",
      title: "ngx-horizontal-scroll-menu",
      position: 10,
      kind: "open-source",
      role: "Author and maintainer since March 2020",
      license: "MIT",
      description: "An Angular library for horizontal scrolling menus, published to npm and maintained across six major Angular versions since 2020.",
      portfolio_url: "https://github.com/isahohieku/ngx-horizontal-menu-scroll",
      bgColor: "#c2410c",
      logo: null,
      images: [],
      plateFacts: ["ngx-horizontal-scroll-menu", "5,479 downloads", "MIT", "v2.2.0"],
      links: [
        { label: "View on GitHub", href: "https://github.com/isahohieku/ngx-horizontal-menu-scroll" },
        { label: "npm package", href: "https://www.npmjs.com/package/ngx-horizontal-scroll-menu" },
        { label: "Live demo", href: "https://stackblitz.com/edit/ngx-horizontal-scroll-menu-example" }
      ],
      caseStudy: {
        context:
          "Angular ships no horizontal scrolling menu, so every app that needs one (a category filter, a tab strip, an overflowing nav) rebuilds the same control, usually badly. This is that control, packaged once and given away.",
        contribution:
          "Author and sole maintainer since March 2020.",
        sections: [
          {
            heading: "Built to be dropped in",
            body: "It takes any array of objects as items, detects links or defers to a click handler, and exposes scroll distance and speed, optional arrow controls, custom arrow icons, and class hooks for background and text so it inherits the host application\u2019s styling instead of imposing its own. Touch and keyboard navigation are supported."
          },
          {
            heading: "The work is the maintenance",
            body: "Publishing a library is a weekend; keeping it installable is the actual commitment. Fourteen releases carried it from Angular 9 to Angular 19, including the move to standalone components, and it still exports an NgModule alongside the standalone component, because a library that forces a consumer to migrate on your schedule is a library they remove."
          }
        ],
        outcomes: [
          "5,479 npm downloads in the twelve months to September 2026, and 339 in the last month",
          "14 published releases, currently 2.2.0",
          "8 stars and 2 forks"
        ],
        stack: ["Angular", "TypeScript", "npm"]
      }
    },
    {
      id: 9702,
      slug: "contacts-manager-api",
      title: "Contact Manager API",
      position: 11,
      kind: "open-source",
      role: "Sole author",
      license: "MIT",
      description: "A production-shaped REST API in NestJS and PostgreSQL, with role-based access, Redis caching, S3 uploads and 94% test coverage.",
      portfolio_url: "https://github.com/isahohieku/contacts-manager",
      bgColor: "#475569",
      logo: null,
      images: [],
      plateFacts: ["contacts-manager", "94.56% covered", "281 commits", "MIT"],
      links: [
        { label: "View on GitHub", href: "https://github.com/isahohieku/contacts-manager" }
      ],
      caseStudy: {
        context:
          "A contacts backend is a deceptively ordinary brief (CRUD over people), which is exactly why it is a good place to do the unglamorous parts properly: authorisation, caching, file handling, pagination, and the test coverage that lets any of it be changed later.",
        contribution:
          "Written end to end, and the most heavily developed repository I own at 281 commits.",
        sections: [
          {
            heading: "What it handles",
            body: "Contacts with multiple emails, phone numbers and addresses, tagging, full-text search, sorting, filtering and paginated reads, CSV export, and avatar uploads to either S3 or local storage with type and size validation. Access is JWT-based with admin and user roles, email verification and a password reset flow."
          },
          {
            heading: "Built for the second year, not the first week",
            body: "Redis caching, connection pooling, gzip compression and rate limiting at 100 requests a minute; Helmet for security headers and validation on every input. It runs under Docker Compose with migrations and seeds, and documents itself through Swagger, so the distance between cloning it and calling it is one command."
          }
        ],
        outcomes: [
          "94.56% test coverage across 2,299 lines in 139 files, reported by Codecov",
          "281 commits, with continuous integration passing on main"
        ],
        stack: ["NestJS", "TypeScript", "PostgreSQL", "Redis", "AWS S3", "Docker"]
      }
    },
    {
      id: 9703,
      slug: "advance-chatbot",
      title: "Advanced Chatbot with Memory",
      position: 12,
      kind: "open-source",
      role: "Author of the Python service and the TypeScript client",
      description: "A full-stack AI platform with persistent conversational memory: FastAPI, LangChain and a ChromaDB vector store behind a Next.js client.",
      portfolio_url: "https://github.com/isahohieku/advance-chatbot",
      bgColor: "#3730a3",
      logo: null,
      images: [],
      plateFacts: ["advance-chatbot", "127 commits", "FastAPI"],
      links: [
        { label: "View on GitHub", href: "https://github.com/isahohieku/advance-chatbot" }
      ],
      caseStudy: {
        context:
          "Chat over HTTP is stateless, and a model that forgets you between sessions feels less like an assistant than a search box. This is an attempt at the opposite: a stateful AI experience built on stateless protocols.",
        contribution:
          "Both halves, the Python service and the TypeScript client, across 127 commits.",
        sections: [
          {
            heading: "Two kinds of memory",
            body: "Structured history lives in PostgreSQL through SQLAlchemy, with Alembic migrations. Long-term recall lives in ChromaDB as vectors, so context survives across sessions rather than only within one. LangChain orchestrates retrieval and context injection over whichever provider is configured (OpenAI, Anthropic, or Ollama running locally), and responses stream to the client over server-sent events."
          },
          {
            heading: "Treated as something that would be attacked",
            body: "Session auth over HTTP-only cookies with optional JWT, Argon2id password hashing, TOTP two-factor, rate limiting on sensitive endpoints, lockout after five failed attempts, audit logging for security-relevant actions, and HSTS, CSP and X-Frame-Options set at the edge of the app."
          }
        ],
        stack: ["Python", "FastAPI", "LangChain", "ChromaDB", "PostgreSQL", "Next.js", "React", "Docker"]
      }
    }
  ];

  constructor() {
    this.projects.sort((a, b) => a.position - b.position);
  }

  getProjects(): ProjectData[] {
    return this.projects;
  }

  /**
   * The landing page teaser, named rather than positional.
   *
   * `slice(0, count)` returned whatever sorted first, which meant the teaser
   * opened on Hobeei — a company whose site is decommissioned, with no logo
   * asset, so the first artefact of "delivered work" a visitor saw was an
   * empty colour plate. It also omitted ngx-horizontal-scroll-menu, the only
   * project on the site a stranger can verify without taking his word for it,
   * and the source of the npm figure the evidence band leads with.
   *
   * Positional fill keeps the row full if a slug is ever renamed.
   */
  private readonly featuredSlugs = [
    'talk360-payment-platform',
    'apply-schools-and-applypay',
    'ngx-horizontal-scroll-menu',
  ];

  getFeatured(count = 3): ProjectData[] {
    const bySlug = new Map(this.projects.map((project) => [project.slug, project]));
    const picked = this.featuredSlugs
      .map((slug) => bySlug.get(slug))
      .filter((project): project is ProjectData => !!project);

    for (const project of this.projects) {
      if (picked.length >= count) break;
      if (!picked.includes(project)) picked.push(project);
    }

    return picked.slice(0, count);
  }

  /** Client engagements and open-source work make different claims, so the
   *  listing groups them rather than interleaving them. */
  getByKind(kind: ProjectKind): ProjectData[] {
    return this.projects.filter((project) => project.kind === kind);
  }

  /** Resolves either a numeric id or a slug, so both /works/9613 and /works/hobeei-freecycle-application work. */
  getProject(idOrSlug: string | number | null | undefined): ProjectData | undefined {
    if (idOrSlug === null || idOrSlug === undefined || idOrSlug === '') {
      return undefined;
    }
    const key = String(idOrSlug).trim().toLowerCase();
    return this.projects.find(p => p.slug === key || String(p.id) === key);
  }

  getProjectById(id: number): ProjectData | undefined {
    return this.projects.find(p => p.id === id);
  }

  getProjectByPosition(position: number): ProjectData | undefined {
    return this.projects.find(p => p.position === position);
  }

  /** True when the project has enough material for a case study rather than just an outbound link. */
  hasCaseStudy(project: ProjectData | undefined): boolean {
    return !!project && project.images.length > 0;
  }
}
