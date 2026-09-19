import { Injectable } from '@angular/core';

export interface ProjectImage {
  id: number;
  imageUrl: string;
  imageName: string;
  position: number;
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
  /** Sections describing the surfaces, each tied to what the screenshots show. */
  sections?: { heading: string; body: string }[];
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
  kind: ProjectKind;
  bgColor: string;
  /** null when no logo asset is available; consumers fall back to a text wordmark. */
  logo: string | null;
  images: ProjectImage[];
  /** Extra destinations — a repository, a package page, a live demo. */
  links?: ProjectLink[];
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
      description: "A Greentech donation platform that enables people to recycle their unwanted and preowned items. Built with modern web technologies to promote sustainability and community sharing.",
      portfolio_url: "https://www.hobeei.com/",
      bgColor: "#2f7d5d",
      logo: null,
      images: [
        { id: 7038, imageUrl: "assets/projects/hobeei-freecycle-application/01.png", imageName: "Hobeei Freecycle application — screen 1", position: 1 },
        { id: 7039, imageUrl: "assets/projects/hobeei-freecycle-application/02.png", imageName: "Hobeei Freecycle application — screen 2", position: 2 },
        { id: 7040, imageUrl: "assets/projects/hobeei-freecycle-application/03.png", imageName: "Hobeei Freecycle application — screen 3", position: 3 },
        { id: 7041, imageUrl: "assets/projects/hobeei-freecycle-application/04.png", imageName: "Hobeei Freecycle application — screen 4", position: 4 }
      ]
    },
    {
      id: 9614,
      slug: "apply-schools-and-applypay",
      title: "Apply Schools and Applypay",
      position: 2,
      kind: "client",
      description: "Educational technology platform providing comprehensive solutions for schools and payment processing. Features include student management, fee collection, and administrative tools.",
      portfolio_url: "https://applypay.ng/",
      bgColor: "#538fb7",
      logo: "/assets/img/applypay.svg",
      images: [
        { id: 7042, imageUrl: "assets/projects/apply-schools-and-applypay/01.png", imageName: "Apply Schools and Applypay — screen 1", position: 1 },
        { id: 7043, imageUrl: "assets/projects/apply-schools-and-applypay/02.png", imageName: "Apply Schools and Applypay — screen 2", position: 2 },
        { id: 7044, imageUrl: "assets/projects/apply-schools-and-applypay/03.png", imageName: "Apply Schools and Applypay — screen 3", position: 3 },
        { id: 7045, imageUrl: "assets/projects/apply-schools-and-applypay/04.png", imageName: "Apply Schools and Applypay — screen 4", position: 4 },
        { id: 7052, imageUrl: "assets/projects/apply-schools-and-applypay/05.png", imageName: "Apply Schools and Applypay — screen 5", position: 5 },
        { id: 7059, imageUrl: "assets/projects/apply-schools-and-applypay/06.png", imageName: "Apply Schools and Applypay — screen 6", position: 6 }
      ]
    },
    {
      id: 9616,
      slug: "talk360-payment-platform",
      title: "Talk360 Payment Platform",
      position: 3,
      kind: "client",
      description: "Comprehensive payment platform enabling international calling and mobile top-up services. Features secure payment processing, user management, and real-time transaction monitoring.",
      portfolio_url: "https://talk360.com/",
      bgColor: "#35b8ff",
      logo: "assets/projects/logos/talk360-payment-platform.png",
      images: [
        { id: 7048, imageUrl: "assets/projects/talk360-payment-platform/02.png", imageName: "Back-office session list, filtered by payment service provider, method, state and period", position: 1 },
        { id: 7049, imageUrl: "assets/projects/talk360-payment-platform/03.png", imageName: "Session detail showing the per-attempt timeline of provider references, statuses and contexts", position: 2 },
        { id: 7050, imageUrl: "assets/projects/talk360-payment-platform/04.png", imageName: "Mobile checkout: choosing a payment method for a top-up", position: 3 },
        { id: 7051, imageUrl: "assets/projects/talk360-payment-platform/05.png", imageName: "Mobile checkout: card entry, with the secured-checkout indicator", position: 4 },
        { id: 7047, imageUrl: "assets/projects/talk360-payment-platform/01.png", imageName: "Back-office sign-in, with a two-factor token", position: 5 }
      ],
      caseStudy: {
        context:
          "Talk360 sells international calling and mobile top-up to customers across Africa and Europe, which means taking money in a lot of countries that do not share a payment culture. The platform is two-sided: the checkout a customer completes on their phone, and the back-office the team uses to work out what happened when one of those payments does not land.",
        contribution:
          "I work on the payment platform as part of a wider frontend and mobile remit at Talk360, alongside onboarding, the Shop360 marketplace, the webshop and the embedded web dialler.",
        sections: [
          {
            heading: "Checkout, on a phone, in someone else\u2019s market",
            body: "The customer flow is deliberately short \u2014 amount, method, details, confirm \u2014 because it runs on mid-range Android handsets over unreliable mobile data. Which methods appear depends on where the customer is: card, PayPal and Alipay sit alongside iDEAL in the Netherlands and USSD in Nigeria, and a search affordance covers the long tail rather than pretending the list is complete. The secured-checkout marker stays visible on every step, since this is the point where an unfamiliar brand has to earn a card number."
          },
          {
            heading: "A back-office built for diagnosis, not reporting",
            body: "A failed payment is a support ticket, so the internal tool is organised around answering \u201cwhy did this one fail?\u201d rather than counting volume. Sessions are filterable by provider, method type, state and period across thousands of records, and each session opens into the merchant and user behind it plus a timeline of every attempt \u2014 provider reference, status, and the context it came from, whether a stored-payment call, a redirect, or an asynchronous webhook. Payments fail in the gaps between those three, which is exactly why the timeline shows them separately."
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
      description: "Mobile calling application providing affordable international calls with crystal clear voice quality. Features include contact management, call history, and credit top-up functionality.",
      portfolio_url: "https://talk360.com/",
      bgColor: "#2a9fd6",
      logo: "assets/projects/logos/talk360-payment-platform.png",
      images: [
        { id: 7053, imageUrl: "assets/projects/talk360-calling-app/01.png", imageName: "Talk360 Calling app — screen 1", position: 1 },
        { id: 7054, imageUrl: "assets/projects/talk360-calling-app/02.png", imageName: "Talk360 Calling app — screen 2", position: 2 },
        { id: 7055, imageUrl: "assets/projects/talk360-calling-app/03.png", imageName: "Talk360 Calling app — screen 3", position: 3 },
        { id: 7056, imageUrl: "assets/projects/talk360-calling-app/04.png", imageName: "Talk360 Calling app — screen 4", position: 4 },
        { id: 7057, imageUrl: "assets/projects/talk360-calling-app/05.png", imageName: "Talk360 Calling app — screen 5", position: 5 },
        { id: 7058, imageUrl: "assets/projects/talk360-calling-app/06.png", imageName: "Talk360 Calling app — screen 6", position: 6 }
      ]
    },
    {
      id: 9618,
      slug: "desrio",
      title: "Desrio",
      position: 5,
      kind: "client",
      description: "Desrio helps teams collaborate, ideate and reduce distractions during work hours.",
      portfolio_url: "https://www.desrio.com/",
      bgColor: "#49b7ac",
      logo: null,
      images: []
    },
    {
      id: 9619,
      slug: "swipeng",
      title: "SwipeNG",
      position: 6,
      kind: "client",
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
      position: 7,
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
      position: 8,
      kind: "open-source",
      description: "An Angular library for horizontal scrolling menus, published to npm and maintained across six major Angular versions since 2020.",
      portfolio_url: "https://github.com/isahohieku/ngx-horizontal-menu-scroll",
      bgColor: "#c2410c",
      logo: null,
      images: [],
      links: [
        { label: "View on GitHub", href: "https://github.com/isahohieku/ngx-horizontal-menu-scroll" },
        { label: "npm package", href: "https://www.npmjs.com/package/ngx-horizontal-scroll-menu" },
        { label: "Live demo", href: "https://stackblitz.com/edit/ngx-horizontal-scroll-menu-example" }
      ],
      caseStudy: {
        context:
          "Angular ships no horizontal scrolling menu, so every app that needs one \u2014 a category filter, a tab strip, an overflowing nav \u2014 rebuilds the same control, usually badly. This is that control, packaged once and given away.",
        contribution:
          "Author and sole maintainer since March 2020.",
        sections: [
          {
            heading: "Built to be dropped in",
            body: "It takes any array of objects as items, detects links or defers to a click handler, and exposes scroll distance and speed, optional arrow controls, custom arrow icons, and class hooks for background and text so it inherits the host application\u2019s styling instead of imposing its own. Touch and keyboard navigation are supported."
          },
          {
            heading: "The work is the maintenance",
            body: "Publishing a library is a weekend; keeping it installable is the actual commitment. Fourteen releases carried it from Angular 9 to Angular 19, including the move to standalone components \u2014 and it still exports an NgModule alongside the standalone component, because a library that forces a consumer to migrate on your schedule is a library they remove."
          }
        ],
        outcomes: [
          "5,479 npm downloads in the twelve months to September 2026, and 339 in the last month",
          "14 published releases, currently 2.2.0, MIT licensed",
          "8 stars and 2 forks"
        ],
        stack: ["Angular", "TypeScript", "npm"]
      }
    },
    {
      id: 9702,
      slug: "contacts-manager-api",
      title: "Contact Manager API",
      position: 9,
      kind: "open-source",
      description: "A production-shaped REST API in NestJS and PostgreSQL, with role-based access, Redis caching, S3 uploads and 94% test coverage.",
      portfolio_url: "https://github.com/isahohieku/contacts-manager",
      bgColor: "#475569",
      logo: null,
      images: [],
      links: [
        { label: "View on GitHub", href: "https://github.com/isahohieku/contacts-manager" }
      ],
      caseStudy: {
        context:
          "A contacts backend is a deceptively ordinary brief \u2014 CRUD over people \u2014 which is exactly why it is a good place to do the unglamorous parts properly: authorisation, caching, file handling, pagination, and the test coverage that lets any of it be changed later.",
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
          "281 commits, with continuous integration passing on main",
          "MIT licensed"
        ],
        stack: ["NestJS", "TypeScript", "PostgreSQL", "Redis", "AWS S3", "Docker"]
      }
    },
    {
      id: 9703,
      slug: "advance-chatbot",
      title: "Advanced Chatbot with Memory",
      position: 10,
      kind: "open-source",
      description: "A full-stack AI platform with persistent conversational memory \u2014 FastAPI, LangChain and a ChromaDB vector store behind a Next.js client.",
      portfolio_url: "https://github.com/isahohieku/advance-chatbot",
      bgColor: "#3730a3",
      logo: null,
      images: [],
      links: [
        { label: "View on GitHub", href: "https://github.com/isahohieku/advance-chatbot" }
      ],
      caseStudy: {
        context:
          "Chat over HTTP is stateless, and a model that forgets you between sessions feels less like an assistant than a search box. This is an attempt at the opposite: a stateful AI experience built on stateless protocols.",
        contribution:
          "Both halves \u2014 the Python service and the TypeScript client \u2014 across 127 commits.",
        sections: [
          {
            heading: "Two kinds of memory",
            body: "Structured history lives in PostgreSQL through SQLAlchemy, with Alembic migrations. Long-term recall lives in ChromaDB as vectors, so context survives across sessions rather than only within one. LangChain orchestrates retrieval and context injection over whichever provider is configured \u2014 OpenAI, Anthropic, or Ollama running locally \u2014 and responses stream to the client over server-sent events."
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

  /** The first `count` projects, for the landing page teaser. Drawn from the same list as /works. */
  getFeatured(count = 3): ProjectData[] {
    return this.projects.slice(0, count);
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
