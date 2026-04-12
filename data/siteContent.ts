import { staffProfiles, StaffProfile } from "./staffProfiles";

export type NavItem = {
  label: string;
  href: string;
};

export type ContactItem = {
  label: string;
  value: string;
  href: string;
  icon?: string;
};

export type SocialLink = {
  icon: string;
  href: string;
};

export type ActionLink = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export type HeroHighlight = {
  title: string;
  detail: string;
  icon: string;
};

export type HeroTrustPoint = {
  icon: string;
  text: string;
};

export type HeroRotation = {
  headingLineOne: string;
  headingLineTwo: string;
  subtext: string;
};

export type ServiceCard = {
  title: string;
  kicker: string;
  description: string;
  icon: string;
  linkLabel: string;
  linkHref: string;
};

export type CounterMetric = {
  value: number;
  suffix: string;
  label: string;
};

export type WorkStep = {
  step: string;
  title: string;
  description: string;
};

export type FaqItem = {
  number: string;
  question: string;
  answer: string;
};

export type PortfolioItem = {
  category: string;
  title: string;
  href: string;
  imagePath: string;
  alt: string;
};

export type ReputationPlatformItem = {
  name: string;
  note: string;
};

export type TestimonialItem = {
  clientType: string;
  location: string;
  quote: string;
};

export type VideoGalleryItem = {
  title: string;
  summary: string;
  file: string;
  poster?: string;
};

export type FooterLinkGroup = {
  title: string;
  links: NavItem[];
};

export type BoilerPhaseCopy = {
  label: string;
  temp: string;
};

export type TeamMember = StaffProfile;

export type SiteContent = {
  header: {
    navItems: NavItem[];
    sidebarDescription: string;
    offcanvasDescription: string;
    contactTitle: string;
    contactItems: ContactItem[];
  };
  home: {
    hero: {
      kicker: string;
      brandName: string;
      highlights: HeroHighlight[];
      trustPoints: HeroTrustPoint[];
      rotations: HeroRotation[];
      primaryAction: ActionLink;
      secondaryAction: ActionLink;
    };
    boilerAnimation: {
      title: string;
      description: string;
      hudLabel: string;
      phasePrefix: string;
      targetPrefix: string;
      boilerStatusTitle: string;
      emergencyTitle: string;
      emergencySubtitle: string;
      timelineLabels: string[];
      statusChips: string[];
      repairTasks: { label: string; icon: string }[];
      phases: BoilerPhaseCopy[];
    };
    services: {
      kicker: string;
      title: string;
      description: string;
      cards: ServiceCard[];
    };
    contractsOverview: {
      kicker: string;
      title: string;
      descriptionPrimary: string;
      descriptionSecondary: string;
      points: string[];
      buttons: ActionLink[];
      brandNote: string;
      tags: string[];
      includedTitle: string;
      includedBenefits: string[];
      detailsLinkLabel: string;
      detailsLinkHref: string;
    };
    solutions: {
      title: string;
      description: string;
      categoriesCount: number;
      categoriesLabel: string;
      metrics: CounterMetric[];
      videoImagePath: string;
      videoImageAlt: string;
      youtubeEmbedId: string;
    };
    workProcess: {
      title: string;
      steps: WorkStep[];
    };
    faq: {
      imagePath: string;
      imageAlt: string;
      title: string;
      description: string;
      items: FaqItem[];
    };
    team: {
      title: string;
      description: string;
      primaryAction: ActionLink;
      profilesTitle: string;
      profilesDescription: string;
      contactMemberPrefix: string;
      members: TeamMember[];
    };
    portfolio: {
      title: string;
      items: PortfolioItem[];
      action: ActionLink;
    };
    testimonial: {
      platforms: ReputationPlatformItem[];
      brandLine: string;
      title: string;
      items: TestimonialItem[];
    };
    contact: {
      title: string;
      infoItems: ContactItem[];
      operatingLocations: string;
      contactHours: {
        regularDays: string;
        regularHours: string;
        emergency: string;
      };
      form: {
        fullNamePlaceholder: string;
        emailPlaceholder: string;
        subjectPlaceholder: string;
        messagePlaceholder: string;
        submitLabel: string;
      };
    };
    blog: {
      title: string;
      description: string;
      videos: VideoGalleryItem[];
      watchLabel: string;
      bookingLabel: string;
    };
    subscribe: {
      heading: string;
      emailPlaceholder: string;
      buttonLabel: string;
    };
  };
  footer: {
    aboutText: string;
    socialLinks: SocialLink[];
    linkGroups: FooterLinkGroup[];
    contactTitle: string;
    contactItems: ContactItem[];
    operatingLocations: string;
    contactHours: {
      regularDays: string;
      regularHours: string;
      emergency: string;
    };
    legalLinks: NavItem[];
    copyrightName: string;
    rightsText: string;
  };
};

export const defaultSiteContent: SiteContent = {
  header: {
    navItems: [
      { label: "Home", href: "/" },
      { label: "Boiler Repair", href: "/boiler-repair" },
      { label: "Gas Safety", href: "/gas-safety-certificate" },
      { label: "Guides", href: "/guides" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Contracts", href: "/contracts" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
    sidebarDescription:
      "Geo Gas Services London Ltd provides reliable gas, boiler, plumbing, and drainage call-outs across London and surrounding areas.",
    offcanvasDescription:
      "Geo Gas Services London Ltd delivers gas, boiler, plumbing and drainage support with rapid emergency response.",
    contactTitle: "Contact Info",
    contactItems: [
      {
        label: "London",
        value: "0207 7232221",
        href: "tel:+442077232221",
        icon: "fal fa-phone-alt icon-animation",
      },
      {
        label: "Sussex",
        value: "01444 715618",
        href: "tel:+441444715618",
        icon: "fal fa-phone-alt icon-animation",
      },
      {
        label: "24/7 Emergency",
        value: "07854 451941",
        href: "tel:+447854451941",
        icon: "fal fa-phone-alt icon-animation",
      },
      {
        label: "Email",
        value: "info@geogasservices.uk",
        href: "mailto:info@geogasservices.uk",
        icon: "fal fa-envelope",
      },
      {
        label: "Website",
        value: "www.geogasservices.uk",
        href: "https://www.geogasservices.uk",
        icon: "fal fa-globe",
      },
    ],
  },
  home: {
    hero: {
      kicker: "Trusted Local Repair Team",
      brandName: "Geo Gas Services",
      highlights: [
        {
          title: "Rapid call-outs",
          detail: "Fast diagnostics for boiler, gas and plumbing faults.",
          icon: "fa-solid fa-bolt",
        },
        {
          title: "Gas Safe certified team",
          detail: "Qualified engineers for installs, checks and servicing.",
          icon: "fa-solid fa-shield-check",
        },
        {
          title: "Live fixed pricing",
          detail: "Up-to-date rates published on-site.",
          icon: "fa-solid fa-tags",
        },
      ],
      trustPoints: [
        { icon: "fa-light fa-phone-volume", text: "24/7 Emergency Support" },
        { icon: "fa-light fa-location-dot", text: "London-Wide Coverage" },
      ],
      rotations: [
        {
          headingLineOne: "Peace-of-Mind",
          headingLineTwo: "Home Cover",
          subtext:
            "Whichever Geo Gas home contract you choose, we are here to look after you and your home.",
        },
        {
          headingLineOne: "24/7 Helpline",
          headingLineTwo: "24hr Call-Out",
          subtext:
            "Fast support when you need it, with around-the-clock helpline access and rapid attendance.",
        },
        {
          headingLineOne: "Gas Safe",
          headingLineTwo: "Registered Team",
          subtext:
            "Qualified engineers delivering safe, compliant boiler, gas and plumbing work across your home.",
        },
        {
          headingLineOne: "No Extra Charges",
          headingLineTwo: "Heating & Plumbing",
          subtext:
            "Clear cover and practical service with straightforward terms based on our brochure packages.",
        },
      ],
      primaryAction: {
        label: "Book a Call-Out",
        href: "/contact",
      },
      secondaryAction: {
        label: "View Current Pricing",
        href: "/pricing",
      },
    },
    boilerAnimation: {
      title: "Behind The Scenes: Repair Animation",
      description:
        "The live diagnostics sequence is now in its own section so the homepage hero can focus on the full staff carousel.",
      hudLabel: "Auto Repair Sequence",
      phasePrefix: "Phase",
      targetPrefix: "Target",
      boilerStatusTitle: "Boiler Fix In Progress",
      emergencyTitle: "24/7",
      emergencySubtitle: "Emergency support line",
      timelineLabels: ["Diagnose", "Repair", "Verified"],
      statusChips: ["Flow Stable", "Safe Pressure", "Repair Pass"],
      repairTasks: [
        { label: "Ignition check", icon: "fa-solid fa-bolt" },
        { label: "Pressure balance", icon: "fa-solid fa-gauge-high" },
        { label: "Combustion test", icon: "fa-solid fa-fire" },
      ],
      phases: [
        { label: "Sensor sweep", temp: "41°" },
        { label: "Valve calibration", temp: "56°" },
        { label: "Combustion tuning", temp: "68°" },
        { label: "System verified", temp: "72°" },
      ],
    },
    services: {
      kicker: "Geo Gas Services London LTD",
      title: "Core Geo Gas Services",
      description:
        "Brochure-backed cover and services for gas, boiler, heating, plumbing and landlord compliance, delivered by a responsive local team.",
      cards: [
        {
          title: "Gas & Boiler Repairs",
          kicker: "Emergency + Planned",
          description:
            "Fault finding, breakdown repairs and urgent boiler call-outs completed by experienced Geo Gas engineers.",
          icon: "fa-solid fa-fire-flame-curved",
          linkLabel: "Explore Service",
          linkHref: "/boiler-repair",
        },
        {
          title: "Annual Boiler Service",
          kicker: "Safety + Performance",
          description:
            "Visual boiler checks, flue gas analysis, pressure adjustments and written service confirmation as outlined in the brochure.",
          icon: "fa-solid fa-gauge-high",
          linkLabel: "Explore Service",
          linkHref: "/boiler-service",
        },
        {
          title: "24/7 Helpline Support",
          kicker: "Rapid Attendance",
          description:
            "Every contract package includes 24/7 helpline support with 24hr response targets for urgent issues.",
          icon: "fa-solid fa-phone-volume",
          linkLabel: "Explore Service",
          linkHref: "/emergency-boiler-repair",
        },
        {
          title: "Heating & Boiler Cover",
          kicker: "Contract Benefit",
          description:
            "Gas-fired boiler, controls, pumps, valves, radiators and pipework cover with clear per-claim limits.",
          icon: "fa-solid fa-fire",
          linkLabel: "Explore Service",
          linkHref: "/services",
        },
        {
          title: "Plumbing Cover",
          kicker: "Internal Pipework",
          description:
            "Hot and cold water pipe support inside your home between the stopcock and taps or appliances.",
          icon: "fa-solid fa-faucet-drip",
          linkLabel: "Explore Service",
          linkHref: "/services",
        },
        {
          title: "Internal Drains Cover",
          kicker: "Blocked + Leaking",
          description:
            "Support for blocked or leaking internal drains and waste pipes with defined claim limits in package terms.",
          icon: "fa-solid fa-water",
          linkLabel: "Explore Service",
          linkHref: "/services",
        },
        {
          title: "Gas & Water Supply Pipes",
          kicker: "Complete Package",
          description:
            "Coverage from internal stopcock to supply point for accessible pipework where service terms are met.",
          icon: "fa-solid fa-screwdriver-wrench",
          linkLabel: "Explore Service",
          linkHref: "/services",
        },
        {
          title: "Landlord Safety Inspection",
          kicker: "CP12 + Certificates",
          description:
            "Landlord-focused gas safety checks including appliance and pipework inspection with certification support.",
          icon: "fa-solid fa-shield-check",
          linkLabel: "Explore Service",
          linkHref: "/landlord-gas-safety-certificate",
        },
        {
          title: "No Extra Charges Promise",
          kicker: "Plan Value",
          description:
            "Brochure packages include no extra charges on heating and plumbing claims, with exclusions clearly stated.",
          icon: "fa-solid fa-tags",
          linkLabel: "Explore Service",
          linkHref: "/services",
        },
      ],
    },
    contractsOverview: {
      kicker: "Geo Gas HomeCare Contracts",
      title: "Cover Your Heating, Gas & Plumbing In One Simple Plan",
      descriptionPrimary:
        "Choose one monthly contract to reduce emergency costs, speed up attendance and keep your home systems protected all year.",
      descriptionSecondary:
        "Every package is designed for real homes, with practical cover, clear limits and direct support from our own engineers.",
      points: [
        "No confusing paperwork or hidden extras",
        "Priority response for urgent heating and gas issues",
        "Trusted local team with Gas Safe registered engineers",
      ],
      buttons: [
        {
          label: "Compare Contract Options",
          href: "/contracts",
          variant: "primary",
        },
        {
          label: "View Live Pricing",
          href: "/pricing",
          variant: "secondary",
        },
        {
          label: "Speak To The Team",
          href: "/contact",
          variant: "secondary",
        },
      ],
      brandNote: "Fast, reliable contract support across London.",
      tags: ["Gas Safe", "24/7 Helpline", "HomeCare Plans"],
      includedTitle: "Included In Every Contract",
      includedBenefits: [
        "Annual boiler service",
        "Heating & plumbing support",
        "24/7 helpline",
        "24-hour response time",
        "No extra charges on heating and plumbing claims",
        "No extra charges for drainage claims",
        "Gas Safe Registered",
        "Unlimited call outs (excluding drains)",
      ],
      detailsLinkLabel: "View Full Contract Details",
      detailsLinkHref: "/contracts",
    },
    solutions: {
      title: "Our Everyday Heroes At Work",
      description:
        "We provide reliable gas, boiler, plumbing and drain services with responsive call-outs, clear pricing and practical solutions for homes, landlords and managed properties.",
      categoriesCount: 8,
      categoriesLabel: "Service categories covered",
      metrics: [
        { value: 24, suffix: "/7", label: "Emergency support" },
        { value: 7, suffix: "+", label: "Days per week" },
        {
          value: 15,
          suffix: "min",
          label: "Billing intervals after first hour",
        },
        {
          value: 3,
          suffix: "+",
          label: "Core disciplines: gas, plumbing, drains",
        },
      ],
      videoImagePath: "/img/pages/video.jpg",
      videoImageAlt: "Geo Gas service video preview",
      youtubeEmbedId: "0WC-tD-njcA",
    },
    workProcess: {
      title: "How Our 24/7 Call-Out Service Works",
      steps: [
        {
          step: "01",
          title: "24/7 Helpline Intake",
          description:
            "Contact the team any time and we log your call-out with the key job details, home address and access information.",
        },
        {
          step: "02",
          title: "Gas Safe Engineer Attendance",
          description:
            "A Gas Safe registered engineer attends, diagnoses the fault and carries out required safety checks before and during work.",
        },
        {
          step: "03",
          title: "Repair, Verify & Confirm",
          description:
            "We complete the repair, re-test performance and provide written confirmation that service work has been carried out.",
        },
      ],
    },
    faq: {
      imagePath: "/cartoons/geo_hero.jpg",
      imageAlt: "Geo Gas superhero illustration",
      title: "Frequently Asked Questions",
      description:
        "Key contract and call-out information from the Geo Gas brochure, focused on service scope, response, checks and exclusions.",
      items: [
        {
          number: "01",
          question: "Do you provide 24/7 helpline support?",
          answer:
            "Yes. Brochure contracts include a 24/7 helpline with a stated 24hr response target, with faster attendance notes for vulnerable situations.",
        },
        {
          number: "02",
          question: "Are your engineers Gas Safe registered?",
          answer:
            "Yes. Gas Safe registration is listed as a core package benefit, and gas safety regulations are referenced in annual service checks.",
        },
        {
          number: "03",
          question: "What is included in the annual boiler service checks?",
          answer:
            "The brochure includes visual boiler checks, safe firing tests, flue gas analysis, pressure checks/adjustments, condensate trap cleaning and written service confirmation.",
        },
        {
          number: "04",
          question: "Is annual boiler service automatically part of repair claim cover?",
          answer:
            "The brochure states annual service checks as a package benefit, while also noting service itself does not form part of repair claim cover terms.",
        },
        {
          number: "05",
          question: "Do you handle landlord gas safety inspections and certificates?",
          answer:
            "Yes. We provide CP12 landlord inspections and service bundles, including additional appliance checks when needed.",
        },
        {
          number: "06",
          question: "What does heating and boiler cover include?",
          answer:
            "Brochure scope includes gas-fired boiler, flue and controls, thermostats, circulating pumps, motorised valves, time clock/programmer, radiators, pipework and fittings.",
        },
        {
          number: "07",
          question: "What additional items are included in the Complete package?",
          answer:
            "The brochure describes additional cover for internal plumbing, accessible water supply pipework, and internal drains/waste pipes under stated limits and terms.",
        },
        {
          number: "08",
          question: "Are there exclusions I should know about?",
          answer:
            "Yes. Examples listed include pre-existing or design faults, weather/freezing damage, sludge/scale-related issues, shared drains, inaccessible buried pipework and long unoccupancy periods.",
        },
        {
          number: "09",
          question: "Are all repairs always replaced regardless of condition?",
          answer:
            "Terms reference economic-repair decisions and part availability. If approved replacement parts are not available, treatment may differ under contract conditions.",
        },
        {
          number: "10",
          question: "Do you support guest houses or B&B properties under these plans?",
          answer:
            "The brochure exclusions state that guest houses and B&Bs are not covered under the listed home service contract terms.",
        },
      ],
    },
    team: {
      title: "Meet The Geo Gas Heroes",
      description:
        "The people behind our call-outs, servicing and support desk. Practical engineers and coordinators working together to keep homes safe and running.",
      primaryAction: {
        label: "Book A Visit",
        href: "/contact",
      },
      profilesTitle: "Short Profiles",
      profilesDescription:
        "A quick view of each team member's focus areas, day-to-day responsibilities and core service strengths.",
      contactMemberPrefix: "Contact",
      members: staffProfiles,
    },
    portfolio: {
      title: "Recent Geo Gas Work Highlights",
      items: [
        {
          category: "Emergency",
          title: "Boiler Breakdown Call-Out",
          href: "/services-details",
          imagePath: "/img/portfolio/portfolio-1.jpg",
          alt: "Boiler repair",
        },
        {
          category: "Compliance",
          title: "Landlord Gas Safety Certificate",
          href: "/services-details",
          imagePath: "/img/portfolio/portfolio-2.jpg",
          alt: "Gas safety",
        },
        {
          category: "Maintenance",
          title: "Drain & Pipe Maintenance",
          href: "/services-details",
          imagePath: "/img/portfolio/portfolio-3.jpg",
          alt: "Drain work",
        },
        {
          category: "Upgrade",
          title: "Smart Heating Controls Setup",
          href: "/services-details",
          imagePath: "/img/portfolio/portfolio-4.jpg",
          alt: "Heating controls",
        },
      ],
      action: {
        label: "View Services",
        href: "/services",
      },
    },
    testimonial: {
      platforms: [
        {
          name: "Checkatrade",
          note: "5-star reputation highlighted in brochure.",
        },
        {
          name: "Trustpilot",
          note: "Customer review platform referenced in brochure.",
        },
        {
          name: "Google Reviews",
          note: "Public customer ratings shown in brochure.",
        },
      ],
      brandLine: "Proud of our 5-star reputation",
      title: "Trusted by homeowners and landlords",
      items: [
        {
          clientType: "Private Landlord",
          location: "London",
          quote:
            "Geo Gas handled our landlord safety checks and boiler service quickly, with clear certificates and no hassle.",
        },
        {
          clientType: "Homeowner",
          location: "South London",
          quote:
            "Fast response, polite engineer, and a proper fix on the first visit. Excellent communication throughout.",
        },
        {
          clientType: "Property Manager",
          location: "Greater London",
          quote:
            "Their team is dependable for reactive plumbing, planned servicing and emergency attendance when we need it most.",
        },
      ],
    },
    contact: {
      title: "Book a call-out or request a quote",
      infoItems: [
        {
          label: "London",
          value: "0207 7232221",
          href: "tel:+442077232221",
        },
        {
          label: "Sussex",
          value: "01444 715618",
          href: "tel:+441444715618",
        },
        {
          label: "24/7 Emergency",
          value: "07854 451941",
          href: "tel:+447854451941",
        },
        {
          label: "Quick Email",
          value: "info@geogasservices.uk",
          href: "mailto:info@geogasservices.uk",
        },
      ],
      operatingLocations: "London, Sussex and Surrey",
      contactHours: {
        regularDays: "Monday - Saturday",
        regularHours: "8AM - 7PM",
        emergency: "Emergency 24/7",
      },
      form: {
        fullNamePlaceholder: "Full Name",
        emailPlaceholder: "Email Address",
        subjectPlaceholder: "Service Required",
        messagePlaceholder: "Tell us about the issue",
        submitLabel: "Send Request",
      },
    },
    blog: {
      title: "Boiler Installation Video Gallery",
      description:
        "Real Geo Gas installation footage from recent jobs. Watch the clips below and contact us to book similar work.",
      videos: [
        {
          title: "Boiler Installation - Site Walkthrough 01",
          summary: "On-site install workflow from arrival to commissioning checks.",
          file: "WhatsApp Video 2026-02-09 at 16.54.42.mp4",
          poster: "WhatsApp Image 2026-02-09 at 16.54.43.jpeg",
        },
        {
          title: "Boiler Installation - Pipework & Setup",
          summary: "Pipework alignment and system preparation during installation.",
          file: "WhatsApp Video 2026-02-09 at 16.54.44.mp4",
          poster: "WhatsApp Image 2026-02-09 at 16.54.47.jpeg",
        },
        {
          title: "Boiler Installation - Final Checks",
          summary: "Final testing, controls setup and handover overview.",
          file: "WhatsApp Video 2026-02-09 at 17.10.01.mp4",
          poster: "WhatsApp Image 2026-02-09 at 17.10.04.jpeg",
        },
        {
          title: "Boiler Installation - Commissioning Clip",
          summary: "Commissioning sequence and post-installation verification.",
          file: "WhatsApp Video 2026-02-09 at 17.10.05.mp4",
        },
        {
          title: "Boiler Installation - System Flush Snapshot",
          summary: "Practical footage from mid-install and system balancing stage.",
          file: "WhatsApp Video 2026-02-10 at 12.00.52.mp4",
          poster: "WhatsApp Image 2026-02-09 at 16.55.02.jpeg",
        },
        {
          title: "Boiler Installation - Completed Works",
          summary: "Completed install clip showing final boiler and service setup.",
          file: "WhatsApp Video 2026-02-11 at 10.09.23.mp4",
          poster: "WhatsApp Image 2026-02-09 at 16.55.03.jpeg",
        },
      ],
      watchLabel: "Watch Full Clip",
      bookingLabel: "Book Similar Work",
    },
    subscribe: {
      heading: "Get seasonal boiler and safety updates from Geo Gas",
      emailPlaceholder: "Enter your email",
      buttonLabel: "Join List",
    },
  },
  footer: {
    aboutText:
      "Our everyday heroes at work for boiler, gas, plumbing and drainage services across London.",
    socialLinks: [
      {
        icon: "fas fa-globe",
        href: "https://www.geogasservices.uk",
      },
      {
        icon: "fas fa-envelope",
        href: "mailto:info@geogasservices.uk",
      },
      {
        icon: "fas fa-phone-alt",
        href: "tel:+447854451941",
      },
    ],
    linkGroups: [
      {
        title: "Services",
        links: [
          { label: "Boiler Repair", href: "/boiler-repair" },
          { label: "Emergency Boiler Repair", href: "/emergency-boiler-repair" },
          { label: "Boiler Service", href: "/boiler-service" },
          { label: "Gas Safety Certificate", href: "/gas-safety-certificate" },
          { label: "Boiler Installation", href: "/boiler-installation" },
        ],
      },
      {
        title: "Quick links",
        links: [
          { label: "About Us", href: "/about" },
          { label: "Services", href: "/services" },
          { label: "Guides Hub", href: "/guides" },
          { label: "Contracts", href: "/contracts" },
          { label: "Full Pricing", href: "/pricing" },
          { label: "Contact Us", href: "/contact" },
        ],
      },
    ],
    contactTitle: "Contact Info",
    contactItems: [
      {
        label: "London",
        value: "0207 7232221",
        href: "tel:+442077232221",
        icon: "fal fa-phone-alt icon-animation",
      },
      {
        label: "Sussex",
        value: "01444 715618",
        href: "tel:+441444715618",
        icon: "fal fa-phone-alt icon-animation",
      },
      {
        label: "24/7 Emergency",
        value: "07854 451941",
        href: "tel:+447854451941",
        icon: "fal fa-bolt icon-animation",
      },
      {
        label: "Email",
        value: "info@geogasservices.uk",
        href: "mailto:info@geogasservices.uk",
        icon: "fal fa-envelope",
      },
    ],
    operatingLocations: "London, Sussex and Surrey",
    contactHours: {
      regularDays: "Monday - Saturday",
      regularHours: "8AM - 7PM",
      emergency: "Emergency 24/7",
    },
    legalLinks: [
      { label: "Privacy & Policy", href: "/faq" },
      { label: "Terms and Conditions", href: "/contracts" },
    ],
    copyrightName: "Geo Gas Services",
    rightsText: "All Rights Reserved",
  },
};
