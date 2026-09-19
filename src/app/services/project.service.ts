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

export interface ProjectData {
  id: number;
  /** Stable, human-readable identifier. Accepted by the /works/:id route alongside the numeric id. */
  slug: string;
  title: string;
  position: number;
  description?: string;
  portfolio_url?: string;
  bgColor: string;
  /** null when no logo asset is available; consumers fall back to a text wordmark. */
  logo: string | null;
  images: ProjectImage[];
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
      description: "An Edtech",
      portfolio_url: "https://sapphital.com/",
      bgColor: "#13abab",
      logo: "assets/projects/logos/sapphital.png",
      images: []
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
