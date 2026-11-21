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

/**
 * Client engagements, open-source work and internal engineering-impact
 * writeups are three different claims. `impact` covers initiatives with no
 * shipped product of its own to screenshot — a design system, a shared
 * package, an architecture proposal — so it is never listed on /works
 * alongside delivered products; it only ever appears in the landing page's
 * "Engineering beyond the codebase" teaser and its own case-study pages.
 */
export type ProjectKind = 'client' | 'open-source' | 'impact';

export interface ProjectLink {
  label: string;
  href: string;
}

export interface PlateDiagram {
  /** fan-out: one source feeding several apps · shared: one package between
   *  two consumers · tenants: one core serving a ring of tenants. */
  shape: 'fan-out' | 'shared' | 'tenants';
  caption: string;
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
  /**
   * Kept in the data but not published anywhere on the site. For a page held
   * back for review rather than deleted, so it can be restored by removing
   * the flag.
   */
  archived?: boolean;
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
  /**
   * For client work: one lead screen, as proof the product exists, plus only
   * the screens a case-study section points at. Cut to that on 2026-11-13; a
   * gallery of unattached screens argued for UI output, not the ownership the
   * case studies claim. The cut files moved to the git-ignored .private/.
   */
  images: ProjectImage[];
  /** Extra destinations — a repository, a package page, a live demo. */
  links?: ProjectLink[];
  /**
   * Short, externally checkable facts rendered on the card's colour plate
   * where no logo asset exists. Only set where the facts are sourced — an
   * empty plate is the honest result otherwise, not an invitation to invent.
   */
  plateFacts?: string[];
  /**
   * Impact entries only: the shape of the decision, drawn on the card's plate
   * in place of a brand colour. There is no product to show, so the plate
   * shows the structure the decision produced, and the caption states it in
   * words. The numbers stay in the evidence band and the case study.
   */
  plateDiagram?: PlateDiagram;
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
      position: 3,
      kind: "client",
      role: "Lead Frontend Engineer, founding team at Hobeei",
      period: "Feb 2019 - Feb 2021",
      description: "A Greentech donation platform that enables people to recycle their unwanted and preowned items. Built with modern web technologies to promote sustainability and community sharing.",
      portfolio_url: "https://www.hobeei.com/",
      siteOffline: true,
      bgColor: "#1f4d3a",
      logo: "assets/projects/logos/hobeei.png",
      images: [
        { id: 7038, imageUrl: "assets/projects/hobeei-freecycle-application/01.jpg", imageName: "Home page, from the giveaway hero through how Hobeei works", position: 1 },
        // The item page (03) would illustrate the bidding section, but it shows
        // real users' names, photos and usernames, so it is not published.
      ],
      // Read from the three repositories on 2026-11-14. Authorship counts are
      // git's: hobeei-frontend 1,137 of 1,323 commits (Feb 2019 - Feb 2021),
      // admin 133 of 145, server.ts 21 of 21. The API (hobeei-api, Node,
      // TypeScript, MongoDB, RabbitMQ) is mostly other engineers' work — 24 of
      // 467 commits are Isah's — so it is described as the backend team's.
      caseStudy: {
        context:
          "Hobeei was a freecycle marketplace in Nigeria: people gave away items they no longer needed, and others bid for them with Buzzes, a virtual currency earned by uploading items, inviting friends or buying it outright. Hopps capped how many items one person could bid on at a time.",
        contribution:
          "I led the frontend from the first commit to the last, writing 1,137 of its 1,323 commits over two years, as part of the founding team. The backend team built the API; the customer app, the admin console and everything that ran in the browser were mine.",
        contributionPoints: [
          "Real-time bidding over Socket.IO, with each item page subscribed to its own channel so the highest bid and bidder update live as people out-buzz each other",
          "Direct-message chat between users, and a support inbox for the team on the admin side",
          "An admin console inside the same Angular app: users, inventory, categories, finance, credits, Hopps and packages, charities, and a metrics dashboard tracking sign-ups, users online, items uploaded and winners by day, week, month and year",
          "Buying Buzzes through Paystack, and Hopps with Buzzes; image uploads through Cloudinary, push notifications through OneSignal",
          "A progressive web app, with an app shell, service worker and offline state, then server-side rendering with Angular Universal",
          "Product tours and social sharing to Facebook, Twitter and WhatsApp"
        ],
        sections: [
          {
            heading: "Bidding that has to feel live",
            body: "An auction where the price only changes when you refresh is not an auction. Each item page joins its own Socket.IO channel, and every new bid pushes the full bid list down to everyone watching: the highest amount, who holds it, and how much more it takes to outbid them, all against a countdown."
          },
          {
            heading: "One codebase for the customers and the people running it",
            body: "The admin console lives in the same Angular app as the marketplace, as its own lazy-loaded module, so the customer bundle never carries it. Sharing one codebase meant one set of services and models for the team's tooling and the product it managed. Support conversations ran over the same socket layer as user chat, rather than through a separate helpdesk."
          },
          {
            heading: "Built for Nigerian mobile data",
            body: "Built for phones on patchy mobile connections, the app was split into lazy-loaded modules, so a visitor loaded only the part they were using. It then became a progressive web app, with an app shell that paints before the data arrives, a service worker caching the static assets, and an explicit no-network state instead of a blank screen. Server-side rendering came last, so listings arrived as HTML that crawlers and slow phones could read before any JavaScript ran."
          }
        ],
        outcomes: [
          "Performance and user experience improved by 30% through the PWA and SSR work",
          "User engagement up over 50% and revenue up 35% after real-time bidding, product tours, chat, social sharing and payment integrations shipped"
        ],
        stack: ["Angular", "Angular Universal", "Angular Service Worker", "RxJS", "Socket.IO", "Paystack", "Cloudinary", "OneSignal", "Chart.js", "LogRocket"]
      }
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
        { id: 7043, imageUrl: "assets/projects/apply-schools-and-applypay/02.png", smallUrl: "assets/projects/apply-schools-and-applypay/02-800.png", imageName: "School admin: the list of classes, filterable by session and status", position: 2 }
      ],
      caseStudy: {
        context:
          "ApplyPay and Apply Schools shared one engineering team: a payments product and a school-administration platform, built from the same codebase and tooling. ApplyPay's work was mostly integration and payment infrastructure rather than its own screens, which is why the admin screen below is Apply Schools — the product with a public interface to show.",
        contribution:
          "I worked across both products, past feature delivery into the tooling and infrastructure around them.",
        contributionPoints: [
          "Delivered over twice the initially planned feature set, expanding platform functionality and user value",
          "Built and automated support tooling — dashboards, diagnostics, alerting and health checks — that cut support time-to-resolution by 40%",
          "Mentored a team of three engineers on CI/CD practices and code quality standards",
          "Standardised coding practices across every project at the company",
          "Managed AWS infrastructure: deployments, horizontal scaling, security audits and enterprise readiness"
        ],
        sections: [
          {
            heading: "Running a school from the admin side",
            body: "Classes, filterable by session and status; a class's teacher, dates and roster; adding a student in three steps; a parent's view through to their children's invoices. Built for the people running a school day to day, not just the students using it.",
            image: 2
          },
          {
            heading: "The tooling behind both products",
            body: "Past the product features: automated dashboards, diagnostics and alerting that cut support time-to-resolution, coding standards applied across every project rather than just this one, and the AWS infrastructure — deployments, horizontal scaling, security audits — both products ran on."
          }
        ],
        outcomes: [
          "Shipped over twice the initially planned feature set",
          "Support time-to-resolution cut by 40% through automated dashboards, diagnostics and alerting"
        ],
        stack: ["React.js", "Next.js", "Redux.js", "TypeScript", "AWS S3", "Docker", "CircleCI"]
      }
    },
    {
      id: 9617,
      slug: "talk360-calling-app",
      title: "Talk360 Calling app",
      position: 1,
      kind: "client",
      role: "Frontend & Mobile Software Engineer at Talk360",
      period: "May 2022 - present",
      description: "Mobile app for low-cost international calls, with contact management, call history and credit top-up.",
      bgColor: "#162240",
      logo: "assets/projects/logos/talk360.svg",
      images: [
        { id: 7056, imageUrl: "assets/projects/talk360-calling-app/04.png", imageName: "Home: who to call, the credit balance, and buying credit or checking rates", position: 4 },
      ],
      caseStudy: {
        context:
          "Talk360's calling app splits into two parts: a native Android shell, and the Web Dialer — the dialler, in-call and call-summary screens that run inside both the calling app and partner apps over WebView.",
        contribution:
          "I own both halves end to end: I rebuilt the Web Dialer, which began as a proof of concept, as a production multi-tenant React monorepo, and maintain the native Android app it runs inside, including the Kotlin Multiplatform logic shared between them.",
        contributionPoints: [
          "Rebuilt the Web Dialer from a proof of concept into a production Turborepo monorepo, split into packages, with CI/CD that only builds what changed",
          "Built a tenant-based theming system and an SDK mode, shipped for a partner theme and now the groundwork for Embedded's multi-tenant direction",
          "Added the native bridge methods — purchase triggers, status/navigation bar colour, theme and lifecycle events, Android back handling — that let the web screens and the native app talk to each other",
          "Hardened calling reliability: phone-number validation, retrying call-summary fetches, a dedicated log entry per failed call, and a low-balance modal on the dialler",
          "Redesigned the dialler shell, in-call screen, recent calls and call summary, and added call rating",
          "Connected Lokalise to an automated translation-pull workflow and added end-to-end test coverage for the critical flows"
        ],
        sections: [
          {
            heading: "A monorepo, not a monolith",
            body: "The Web Dialer started life as a proof of concept. I rebuilt it as a Turborepo monorepo: logic pulled out into packages, large useEffect blocks and hooks refactored into small reusable ones, and CI/CD that only rebuilds what actually changed. Central analytics event tracking moved into the core package rather than living in whichever app happened to fire it first."
          },
          {
            heading: "Multi-tenant theming, the groundwork for Embedded",
            body: "A tenant-based theming system, shipped first for a partner's own theme, and an SDK mode with its own back navigation, gave the Web Dialer the multi-tenant foundation the Embedded platform direction later built on."
          },
          {
            heading: "Native Android: reliability and shared logic",
            body: "On the native side: clearer call-failure messaging, a visible service fee on the buy-credit screen, account and profile fixes (date localisation, email verification, resend limits), and a handoff from the onboarding web app's account-setup callback. Country search and analytics event routing now run through shared Kotlin Multiplatform logic rather than being written twice."
          }
        ],
        stack: ["React", "Turborepo", "JS Bridge", "Lokalise", "Cypress", "GitHub Actions", "Kotlin", "Kotlin Multiplatform", "Android", "Mixpanel"]
      }
    },
    {
      id: 9621,
      slug: "kollo",
      title: "Kollo",
      position: 5,
      kind: "client",
      role: "Fullstack Engineer: website, admin dashboard and admin API",
      description: "A savings platform that brings thrift contributions online: rotating and target group savings alongside personal plans. I built the website and waitlist, the admin dashboard, and the admin side of the API.",
      portfolio_url: "https://kollo.ng/",
      bgColor: "#5310b7",
      logo: "assets/projects/logos/kollo.svg",
      images: [
        { id: 7068, imageUrl: "assets/projects/kollo/01.jpg", smallUrl: "assets/projects/kollo/01-800.jpg", imageName: "Home page hero, with the app's wallet and rotation-group balance", position: 1 },
        { id: 7069, imageUrl: "assets/projects/kollo/02.jpg", smallUrl: "assets/projects/kollo/02-800.jpg", imageName: "Waitlist page: the reCAPTCHA-protected sign-up form", position: 2 },
      ],
      caseStudy: {
        context:
          "Rotating group savings, where everyone pays in each month and one member takes the pot in turn, is an old habit that has always run on trust and a notebook. Kollo moves it online, alongside target savings for groups working towards a shared goal and fixed, automated and flexible plans for individuals.",
        contribution:
          "I worked on Kollo as a fullstack engineer, across the frontend and the API. I built everything that faces the public or the operations team. The core savings engine was written by the backend lead.",
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
      position: 9,
      kind: "client",
      description: "Desrio helps teams collaborate, ideate and reduce distractions during work hours.",
      portfolio_url: "https://www.desrio.com/",
      siteOffline: true,
      bgColor: "#49b7ac",
      logo: "assets/projects/logos/desrio.png",
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
    },
    {
      id: 9704,
      slug: "news-app",
      title: "Central News",
      position: 13,
      kind: "open-source",
      role: "Sole author",
      description: "An Android news reader in Kotlin and Jetpack Compose: top headlines by category, search as you type, and saved stories that work offline, built on NewsAPI with MVVM and clean architecture.",
      portfolio_url: "https://github.com/isahohieku/news-app",
      bgColor: "#e20101",
      logo: null,
      images: [
        { id: 7075, imageUrl: "assets/projects/news-app/01.png", imageName: "Home feed: the lead story, then a timed list of the rest, under pinned category tabs", position: 1 },
        { id: 7076, imageUrl: "assets/projects/news-app/02.png", imageName: "Search results for “climate”, sortable by relevance or latest", position: 2 },
        { id: 7077, imageUrl: "assets/projects/news-app/03.png", imageName: "Saved stories, read from the local database so they work offline", position: 3 },
        { id: 7078, imageUrl: "assets/projects/news-app/04.png", imageName: "Home feed in the dark theme, following the system setting", position: 4 }
      ],
      plateFacts: ["news-app", "54 commits", "Kotlin", "Jetpack Compose"],
      links: [
        { label: "View on GitHub", href: "https://github.com/isahohieku/news-app" }
      ],
      caseStudy: {
        context:
          "A news app for a quick daily catch-up: it opens on the day’s top headlines, leads with the biggest story, and lets a reader browse by category, search, and keep stories for later. It runs on NewsAPI’s free plan, whose limits (a 100-result cap, about 100 requests a day, and headlines that only reliably come back for the US) shape much of how it behaves.",
        contribution:
          "Written end to end, across 54 commits: the Compose interface, the domain and data layers, and the unit tests.",
        sections: [
          {
            heading: "A feed that leads with the story that matters",
            body: "Home opens on a lead story and follows it with a timed list, paged as you scroll and refreshed by pulling down. Categories sit as tabs pinned under the top bar, each starting from its own top. The splash screen stays up until the first page has loaded, for at most two seconds, so the app never opens on an empty list. Many articles have no image, and the feed is designed to read well without one.",
            image: 1
          },
          {
            heading: "Search that keeps up with typing",
            body: "Results update as you type, debounced at 400 ms and starting at two characters, sortable by relevance or latest, with the last five searches remembered. Home and Search share one pager that handles load-more, retry, refresh and duplicates across pages, and treats NewsAPI’s HTTP 426 at the result cap as the end of the list rather than an error.",
            image: 2
          },
          {
            heading: "Saved stories that work offline",
            body: "Any article can be bookmarked from the feed or from search, with an Undo snackbar. Bookmarks live in a local Room database, so the Saved tab works without a connection. When a network call does fail, the app names why (no connection, a timeout, the rate limit, a server error) and offers a retry; a failed refresh keeps the current list and reports the problem in a snackbar instead.",
            image: 3
          },
          {
            heading: "Layers that point inwards",
            body: "MVVM over clean-architecture layers: the domain holds models, repository interfaces and use cases with no Android imports, and both the UI and the data layer depend on it. Each screen exposes one StateFlow of UI state to a stateless composable, so every screen previews without a ViewModel. Unit tests cover the three ViewModels, the repository’s country fallback, error mapping and the DTO mapper, using hand-written fakes rather than a mocking library.",
            image: 4
          }
        ],
        stack: ["Kotlin", "Jetpack Compose", "Material 3", "Hilt", "Retrofit", "Room", "Coroutines & Flow", "Coil"]
      }
    },
    {
      id: 9705,
      slug: "calendar-guardian",
      title: "Calendar Guardian",
      position: 14,
      kind: "open-source",
      role: "Sole author",
      period: "Jul 2026 - Oct 2026",
      description: "An AI agent that watches your calendar, flags clashes and overloaded days, and drafts the email to reschedule, pulling context from Jira and Slack over MCP. FastAPI and ARQ workers behind a real-time Next.js dashboard.",
      portfolio_url: "https://github.com/isahohieku/calendar-guardian",
      bgColor: "#4f46e5",
      logo: null,
      images: [],
      plateFacts: ["calendar-guardian", "94 commits", "FastAPI", "Next.js"],
      links: [
        { label: "View on GitHub", href: "https://github.com/isahohieku/calendar-guardian" }
      ],
      caseStudy: {
        context:
          "A calendar shows you the clash; it does nothing about it. Calendar Guardian is an agent that does: it syncs Google and Microsoft calendars, finds the meetings that overlap or leave no room to breathe, and drafts the email that moves the less important one.",
        contribution:
          "Both halves, the Python backend and the Next.js dashboard, across 94 commits from July to October 2026.",
        sections: [
          {
            heading: "Rules first, the model second",
            body: "Conflicts are found in two tiers. The first is deterministic: overlapping meetings, missing buffers, travel time, and runs of back-to-back meetings with no real break. The second scores softer problems, such as meeting load and lost focus time. Only once a conflict exists does the LLM get involved, drafting a reschedule or cancellation email that can be regenerated or set aside. A conflict that is closed or already past is not raised again on the next sync."
          },
          {
            heading: "Context from where the work actually lives",
            body: "Model Context Protocol servers connect over Streamable HTTP, with Jira and Confluence through Atlassian, Slack, or any custom server, signed in with OAuth 2.1 (PKCE, dynamic client registration, resource binding, token refresh). Before drafting, the model picks which tools to call: at most four, each with a timeout, and every call and its answer is shown on the conflict page. Tools a server does not mark read-only start switched off."
          },
          {
            heading: "An agent kept on a short lead",
            body: "Autopilot sends resolutions on its own only for low-severity conflicts; critical ones always wait for a person. ARQ workers do the detection in the background and broadcast over Redis pub/sub to an authenticated WebSocket, so the dashboard updates without a refresh. OAuth tokens are encrypted at rest with AES-256-GCM, sign-in identity comes from the provider rather than the caller, and MCP servers on private networks are refused."
          }
        ],
        stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "ARQ", "OpenAI", "MCP", "Next.js", "Tailwind CSS", "Docker"]
      }
    },
    {
      id: 9801,
      slug: "talk360-design-system",
      title: "Unified design system across four Talk360 apps",
      position: 15,
      kind: "impact",
      role: "Frontend & Mobile Software Engineer at Talk360",
      period: "May 2022 - present",
      description: "Separated shared frontend foundations out of one product into two independently distributed packages, then drove a screen-by-screen migration of the consuming apps onto them.",
      bgColor: "#2742c9",
      logo: null,
      images: [],
      // Talk360's packages are private, so they are described rather than
      // named here: no package, service or channel names, and no internal
      // rule specifics. Revised 2026-11-15 at Isah's request.
      plateFacts: ["23 components", "14+ screens migrated", "4 apps on shared tokens", "Enforced in CI"],
      plateDiagram: { shape: "fan-out", caption: "One design system, four apps" },
      caseStudy: {
        context:
          "Talk360's web products had grown to four applications, each maintaining its own UI primitives and styling conventions. The cost wasn't only visual drift between native screens and embedded WebViews; it was the same buttons, inputs and pickers being rebuilt independently inside every app.",
        contribution:
          "I initiated and drove the separation of a shared design system into two independently distributed packages, then led the migration of consuming applications onto them.",
        contributionPoints: [
          "Split the system into a design-token package (tokens, a Tailwind preset, shared icons and country flags) and a component library extracted from one of the products, so foundations and implementations could version separately.",
          "Drove a screen-by-screen migration across two products instead of requiring every application to cut over at once.",
          "Added a lint rule, enforced in CI, that blocks reintroducing the legacy components the shared system replaced.",
          "Set up release notifications for consuming teams, so they knew when a package changed."
        ],
        sections: [
          {
            heading: "Why two packages, not one",
            body: "A shared component directory inside one application, or duplicated components across repositories, were the two paths already in use. Separating design foundations from their implementation meant a consuming app could adopt either package without depending on another product's internal structure — which is how all four apps came to share the tokens, while the component migration moved at its own pace."
          },
          {
            heading: "Enforcing it in tooling, not documentation",
            body: "The lint rule is what made the migration stick: it blocks a pull request from reintroducing a legacy component, rather than relying on an engineer remembering a convention from a doc. It is active and blocking in CI today."
          }
        ],
        outcomes: [
          "23 shared components, consumed across 14+ migrated screens in two products",
          "Four applications on the shared design tokens",
          "The rule enforcing the new components is active and blocking in CI"
        ],
        stack: ["React", "TypeScript", "Tailwind CSS", "ESLint", "npm Packages"]
      }
    },
    {
      id: 9802,
      slug: "talk360-shared-commerce-foundation",
      title: "A single source of truth for Talk360's commerce functionality",
      position: 16,
      kind: "impact",
      role: "Frontend & Mobile Software Engineer at Talk360",
      period: "May 2022 - present",
      description: "Centralised Talk360's rate-calculation, currency and country-flag logic into one shared package, so the rebuilt website and the existing shop could ship against the same source of truth.",
      bgColor: "#0d7058",
      logo: null,
      images: [],
      plateFacts: ["One shared package", "2 apps consuming it", "Launched on schedule"],
      plateDiagram: { shape: "shared", caption: "One package, the website and the shop" },
      caseStudy: {
        context:
          "Talk360's website rebuild needed a new rate calculator on a fixed launch date, but the logic it needed — the rate finder, currency data, country flags — already existed, duplicated across different codebases with no single owner. That duplication had already let a wrong country flag reach users.",
        contribution:
          "I proposed and built a shared commerce package, rather than letting the website rebuild introduce another independent implementation, and defined the integration contract that let consuming apps use it without depending on its internals.",
        contributionPoints: [
          "Centralised the rate finder, the new rate calculator, currency data and country flags into one distributed package.",
          "Kept the existing rate finder and the new calculator side by side in the same package rather than forcing an immediate replacement, so the existing shop and the new website could ship on separate schedules.",
          "Documented the integration through an implementation plan and integration guide, with a defined contract for consuming apps to build against instead of the package's retrieval logic.",
          "Shipped fixes — accent-insensitive search and English-language country-name search — once, to every consumer, instead of per application."
        ],
        sections: [
          {
            heading: "A contract, not shared internals",
            body: "Rather than the website needing to understand how rate data was retrieved or processed, the package exposed a defined contract for consuming it. Changes to the internal implementation could then ship without coupling the website to them."
          }
        ],
        outcomes: [
          "One package now backs both the rebuilt website and the existing shop from a single source of truth",
          "The website launch shipped on schedule against it"
        ],
        stack: ["TypeScript", "React", "Next.js", "npm Packages"]
      }
    },
    {
      id: 9803,
      slug: "talk360-embedded-platform",
      title: "Reframing Embedded as a multi-tenant distribution platform",
      position: 17,
      kind: "impact",
      role: "Frontend & Mobile Software Engineer at Talk360",
      period: "May 2022 - present",
      description: "Proposed and architected the shift of Talk360's Embedded offering from a single web application into a multi-tenant platform. The proposal was approved and became the architecture of what was built.",
      bgColor: "#6a2fc7",
      logo: null,
      images: [],
      // Partner count, pipeline and the authentication mechanism are left out:
      // Embedded is current commercial strategy, not a finished project.
      plateFacts: ["Proposal approved", "Became the architecture", "Live in production"],
      plateDiagram: { shape: "tenants", caption: "One platform, every tenant" },
      caseStudy: {
        context:
          "As partner requirements for Talk360's Embedded offering diverged — branding, integration, user experience — supporting them inside one application risked burying partner-specific logic throughout the codebase as the number of integrations grew. The underlying problem was architectural: Embedded needed to be a platform, not a growing pile of partner-specific features.",
        contribution:
          "I proposed a multi-tenant architecture that separated shared distribution infrastructure from individual partner applications, and designed the flow that loads a partner's experience inside a native app. The proposal was approved and became the architecture of what was built.",
        contributionPoints: [
          "Designed independent, white-labelled partner deployments that share underlying integration infrastructure, instead of extending one monolithic app per partner.",
          "Specified the native SDK flow: verify the partner, establish their context, then load that partner's web experience into a WebView, isolated from every other partner.",
          "Addressed scalability, isolation, maintainability, security and extensibility as explicit architectural considerations rather than solving each per partner as it came up."
        ],
        sections: [
          {
            heading: "From feature requests to a platform direction",
            body: "Treating each new partner as an isolated feature request optimises for the next integration; a platform-oriented architecture weighs the long-term cost of supporting many of them. That distinction is what the proposal changed, and it's the architecture the platform runs on today."
          }
        ],
        outcomes: [
          "The proposal was approved and became the architecture of Talk360's Embedded platform, now live in production"
        ],
        stack: ["Next.js", "Native SDKs", "WebView", "Multi-tenancy"]
      }
    }
  ];

  constructor() {
    // Archived entries are dropped here, before any lookup, so they vanish
    // from every listing, the featured teaser, sibling links and the
    // /works/:id route (which then renders not-found) at once.
    this.projects = this.projects
      .filter((project) => !project.archived)
      .sort((a, b) => a.position - b.position);
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
   * project on the site a stranger can verify without taking his word for it.
   *
   * talk360-calling-app leads client work rather than talk360-payment-platform:
   * the hero now opens on calling, not payment, and the teaser agrees with it.
   *
   * Positional fill keeps the row full if a slug is ever renamed.
   */
  private readonly featuredSlugs = [
    'talk360-calling-app',
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
