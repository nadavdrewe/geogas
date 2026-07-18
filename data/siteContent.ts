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
  href?: string;
  ctaLabel?: string;
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

export type ContactHours = {
  regularDays: string;
  regularHours: string;
  emergency: string;
};

export type PageHeroSpot = {
  eyebrow: string;
  name: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
  heading: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
  secondaryCtaHref: string;
  secondaryCtaLabel: string;
  accent: "red" | "teal" | "green";
};

export type StaticPageContent = {
  breadcrumbTitle: string;
  metaTitle: string;
  metaDescription: string;
  heroSpot: PageHeroSpot;
};

export type StatItem = {
  value: string;
  label: string;
};

export type PricingRateBand = {
  period: string;
  price: string;
};

export type PricingCategory = {
  title: string;
  rates: PricingRateBand[];
};

export type PricingItem = {
  label: string;
  value: string;
};

export type ContractPackageItem = {
  name: string;
  subtitle: string;
  monthlyFrom: string;
  includes: string[];
  extraCover?: string[];
};

export type QuestionAnswerItem = {
  question: string;
  answer: string;
};

export type TermsSection = {
  title: string;
  points: string[];
};

export type TermsClause = {
  clause: string;
  title: string;
  summary: string;
};

export type BrochurePreview = {
  src: string;
  title: string;
};

export type HelpAdviceTopic = {
  title: string;
  body: string;
};

export type ChatbotShortcut = {
  label: string;
  prompt: string;
};

export type SimplePageContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  description: string;
};

export type SiteContent = {
  global: {
    companyName: string;
    siteUrl: string;
    email: string;
    websiteLabel: string;
    primaryPhoneDisplay: string;
    primaryPhoneHref: string;
    emergencyPhoneDisplay: string;
    emergencyPhoneHref: string;
    whatsappPhone: string;
    whatsappMessage: string;
    serviceAreas: string[];
    operatingLocations: string;
    contactHours: ContactHours;
    brochurePdfPath: string;
    brochureViewerTitle: string;
    reviewPlatforms: ReputationPlatformItem[];
  };
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
      sectionTitle: string;
      sectionDescription: string;
      platforms: ReputationPlatformItem[];
      brandLine: string;
      title: string;
      items: TestimonialItem[];
    };
    contact: {
      eyebrow: string;
      title: string;
      intro: string;
      badges: string[];
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
    contactHours: ContactHours;
    legalLinks: NavItem[];
    copyrightName: string;
    rightsText: string;
  };
  pages: {
    about: StaticPageContent;
    contact: StaticPageContent;
    services: StaticPageContent;
    contracts: StaticPageContent;
    pricing: StaticPageContent;
    faq: StaticPageContent;
    helpAdvice: StaticPageContent;
  };
  aboutPage: {
    kicker: string;
    title: string;
    paragraphs: string[];
    founderName: string;
    founderQuote: string;
    stats: StatItem[];
    primaryAction: ActionLink;
    secondaryAction: ActionLink;
    imagePath: string;
    imageAlt: string;
    keyBenefitsTitle: string;
    keyBenefits: string[];
    coverageTitle: string;
    starterTitle: string;
    starterCoverage: string[];
    completeTitle: string;
    completeAddons: string[];
    reputationTitle: string;
    reputationDescription: string;
    reputationBadges: string[];
    reputationImagePath: string;
    reputationImageAlt: string;
  };
  pricingPage: {
    title: string;
    description: string;
    note: string;
    contractEyebrow: string;
    contractTitle: string;
    calloutRules: string[];
    hourlyCategories: PricingCategory[];
    serviceItems: PricingItem[];
    installationItems: PricingItem[];
    salesItems: PricingItem[];
    electricalItems: PricingItem[];
    ctaText: string;
  };
  contractsPage: {
    introHeading: string;
    introSubheading: string;
    founderNote: string;
    founderName: string;
    currentPricingNotice: string;
    contactCardTitle: string;
    priceTagLabel: string;
    priceTagValue: string;
    packageBenefitsTitle: string;
    packageBenefits: string[];
    packages: ContractPackageItem[];
    landlordTitle: string;
    landlordBody: string;
    landlordHighlights: string[];
    landlordNote: string;
    atAGlanceTitle: string;
    atAGlance: string[];
    annualServiceChecksTitle: string;
    annualServiceChecks: string[];
    annualServiceChecksNote: string;
    exclusionsTitle: string;
    sharedExclusions: string[];
    termsHighlightsTitle: string;
    termsHighlights: string[];
    termsCtaText: string;
    termsPrimaryAction: ActionLink;
    termsSecondaryAction: ActionLink;
    termsBreakdownTitle: string;
    termsSections: TermsSection[];
    termsClauseIndexTitle: string;
    termsClauseIndex: TermsClause[];
    faqTitle: string;
    faq: QuestionAnswerItem[];
    brochureTitle: string;
    brochureDescription: string;
    brochurePreviews: BrochurePreview[];
    brochureLinkHref: string;
    brochureLinkLabel: string;
    reputationTitle: string;
    reputationDescription: string;
    reputationBadges: string[];
  };
  helpAdvicePage: {
    eyebrow: string;
    title: string;
    description: string;
    items: HelpAdviceTopic[];
  };
  chatbot: {
    eyebrow: string;
    title: string;
    description: string;
    newChatLabel: string;
    showQuickToolsLabel: string;
    hideQuickToolsLabel: string;
    quickTopicsLabel: string;
    askTopicLabel: string;
    conversationTitle: string;
    conversationDescription: string;
    inputPlaceholder: string;
    askButtonLabel: string;
    askButtonLoadingLabel: string;
    stopButtonLabel: string;
    statusText: string;
    initialMessage: string;
    quickPrompts: string[];
    faqShortcuts: ChatbotShortcut[];
    leadCaptureHeading: string;
    leadCaptureDescription: string;
    leadSuccessMessage: string;
    leadEmergencyCtaLabel: string;
    leadContactCtaLabel: string;
    defaultService: string;
    fieldPlaceholders: {
      name: string;
      email: string;
      phone: string;
      postcode: string;
      service: string;
      note: string;
    };
    submitLeadLabel: string;
    submitLeadLoadingLabel: string;
  };
  guidesPage: SimplePageContent;
  searchPage: {
    metaTitle: string;
    metaDescription: string;
    breadcrumbTitle: string;
    title: string;
    description: string;
    inputPlaceholder: string;
    emptyStateTitle: string;
    emptySuggestions: string[];
    resultsDescription: string;
    noResultsTitle: string;
    noResultsDescription: string;
    noResultsSuggestions: string[];
  };
};

export const defaultSiteContent: SiteContent = {
  global: {
    companyName: "Geo Gas Services",
    siteUrl: "https://www.geogasservices.uk",
    email: "info@geogasservices.uk",
    websiteLabel: "www.geogasservices.uk",
    primaryPhoneDisplay: "07854 451 941",
    primaryPhoneHref: "tel:+447854451941",
    emergencyPhoneDisplay: "07854 451 941",
    emergencyPhoneHref: "tel:+447854451941",
    whatsappPhone: "447854451941",
    whatsappMessage:
      "Hi Geo Gas, I would like help with a boiler / gas / plumbing issue.",
    serviceAreas: ["London and Sussex", "Brighton", "Hove", "Haywards Heath", "Camden", "Islington"],
    operatingLocations: "London and Sussex",
    contactHours: {
      regularDays: "24 Hours",
      regularHours: "",
      emergency: "",
    },
    brochurePdfPath: "/info/geo-gas-brochure-2026.pdf",
    brochureViewerTitle: "GEO Gas Brochure 2026",
    reviewPlatforms: [
      {
        name: "Checkatrade",
        note: "Verified customer feedback and trade profile.",
        href: "https://www.checkatrade.com/trades/geogasserviceslondon",
        ctaLabel: "Open Checkatrade",
      },
      {
        name: "Trustpilot",
        note: "Public customer reviews on Trustpilot.",
        href: "https://uk.trustpilot.com/review/www.geogasservices.uk",
        ctaLabel: "Open Trustpilot",
      },
      {
        name: "Google Reviews",
        note: "Google rating and customer comments.",
        href: "https://www.google.com/search?q=Geo+Gas+Services+London+Ltd+google+reviews",
        ctaLabel: "Open Google Reviews",
      },
      {
        name: "HaMuch",
        note: "Geo Gas Services trade listing and ratings.",
        href: "https://www.hamuch.com/69508/geo-gas-services-london-ltd",
        ctaLabel: "Open HaMuch",
      },
    ],
  },
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
      "Geo Gas Services provides reliable gas, boiler, plumbing, drainage, building works and carpentry support across London and Sussex, plus surrounding areas.",
    offcanvasDescription:
      "Geo Gas Services delivers gas, boiler, plumbing, drainage, building works and carpentry support with rapid emergency response.",
    contactTitle: "Contact Info",
    contactItems: [
      {
        label: "London Office",
        value: "0207 723 2221",
        href: "tel:+442077232221",
        icon: "fal fa-phone-alt icon-animation",
      },
      {
        label: "Sussex Office",
        value: "01444 212 395",
        href: "tel:+441444212395",
        icon: "fal fa-phone-alt icon-animation",
      },
      {
        label: "24/7 Emergency",
        value: "07854 451 941",
        href: "tel:+447854451941",
        icon: "fal fa-bolt icon-animation",
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
          title: "5-star reviews",
          detail: "Rated highly across Checkatrade, Trustpilot and Google.",
          icon: "fa-solid fa-star",
        },
      ],
      trustPoints: [
        { icon: "fa-light fa-phone-volume", text: "24/7 Emergency Support" },
        { icon: "fa-light fa-location-dot", text: "London and Sussex Coverage" },
        { icon: "fa-light fa-shield-check", text: "Your Complete Home Guardians" },
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
        {
          headingLineOne: "Pros By Day",
          headingLineTwo: "Heroes By Night",
          subtext:
            "Your complete home guardians for planned works and urgent emergencies.",
        },
        {
          headingLineOne: "Every Home Needs",
          headingLineTwo: "Superheroes",
          subtext:
            "From gas and heating to carpentry and building works, we keep homes safe and running.",
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
      kicker: "Geo Gas Services",
      title: "Core Geo Gas Services",
      description:
        "Brochure-backed cover and services for gas, boiler, heating, plumbing, building works, carpentry and landlord compliance, delivered by a responsive local team.",
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
        {
          title: "Building Works & Carpentry",
          kicker: "Repairs + Improvements",
          description:
            "General building works and practical carpentry support to complete home repair and upgrade jobs in one visit.",
          icon: "fa-solid fa-hammer",
          linkLabel: "Explore Service",
          linkHref: "/services",
        },
      ],
    },
    contractsOverview: {
      kicker: "Geo Gas Home Rescue Contracts",
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
      brandNote: "Fast, reliable contract support across London and Sussex.",
      tags: ["Gas Safe", "24/7 Helpline", "Home Rescue Plans"],
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
        "We provide reliable gas, boiler, plumbing, drainage, building works and carpentry services with responsive call-outs, clear pricing and practical solutions for homes, landlords and managed properties.",
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
        "The people behind our call-outs, servicing and support desk. Geo has 4 years experience, James has 5 years, Matthew has 10 years, and Aaron brings 25 years experience as CEO & Founder.",
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
      sectionTitle: "Read Our Live Online Reviews",
      sectionDescription:
        "Open the review sites directly and see current customer feedback.",
      platforms: [
        {
          name: "Checkatrade",
          note: "Verified customer feedback and trade profile.",
          href: "https://www.checkatrade.com/trades/geogasserviceslondon",
          ctaLabel: "Open Checkatrade",
        },
        {
          name: "Trustpilot",
          note: "Public customer reviews on Trustpilot.",
          href: "https://uk.trustpilot.com/review/www.geogasservices.uk",
          ctaLabel: "Open Trustpilot",
        },
        {
          name: "Google Reviews",
          note: "Google rating and customer comments.",
          href: "https://www.google.com/search?q=Geo+Gas+Services+London+Ltd+google+reviews",
          ctaLabel: "Open Google Reviews",
        },
        {
          name: "HaMuch",
          note: "Geo Gas Services trade listing and ratings.",
          href: "https://www.hamuch.com/69508/geo-gas-services-london-ltd",
          ctaLabel: "Open HaMuch",
        },
      ],
      brandLine: "Proud of our 5-star reputation",
      title: "Trusted by homeowners and landlords",
      items: [
        {
          clientType: "Private Landlord",
          location: "London and Sussex",
          quote:
            "Geo Gas handled our landlord safety checks and boiler service quickly, with clear certificates and no hassle.",
        },
        {
          clientType: "Homeowner",
          location: "London and Sussex",
          quote:
            "Fast response, polite engineer, and a proper fix on the first visit. Excellent communication throughout.",
        },
        {
          clientType: "Property Manager",
          location: "London and Sussex",
          quote:
            "Their team is dependable for reactive plumbing, planned servicing and emergency attendance when we need it most.",
        },
        {
          clientType: "Homeowner",
          location: "London and Sussex",
          quote:
            "Pros by day, heroes by night. Exactly the dependable home-guardian service we wanted.",
        },
        {
          clientType: "Family Home",
          location: "Sussex",
          quote:
            "Every home needs superheroes. Geo Gas handled gas work and carpentry fixes in one smooth visit.",
        },
      ],
    },
    contact: {
      eyebrow: "Geo Gas Services",
      title: "Book a call-out or request a quote",
      intro:
        "Send us details of your boiler, gas, plumbing or drainage issue and the team will come back with booking options, call-out guidance or a quote. We also support landlord inspections and contract enquiries.",
      badges: [
        "24/7 Emergency Support",
        "Gas Safe Registered",
        "Landlord Checks",
      ],
      infoItems: [
        {
          label: "London Office",
          value: "0207 723 2221",
          href: "tel:+442077232221",
        },
        {
          label: "Sussex Office",
          value: "01444 212 395",
          href: "tel:+441444212395",
        },
        {
          label: "24/7 Emergency",
          value: "07854 451 941",
          href: "tel:+447854451941",
        },
        {
          label: "Quick Email",
          value: "info@geogasservices.uk",
          href: "mailto:info@geogasservices.uk",
        },
      ],
      operatingLocations: "London and Sussex",
      contactHours: {
        regularDays: "24 Hours",
        regularHours: "",
        emergency: "",
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
      "Pros by day, heroes by night. Your complete home guardians for boiler, gas, plumbing, drainage, building works and carpentry across London and Sussex.",
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
        label: "London Office",
        value: "0207 723 2221",
        href: "tel:+442077232221",
        icon: "fal fa-phone-alt icon-animation",
      },
      {
        label: "Sussex Office",
        value: "01444 212 395",
        href: "tel:+441444212395",
        icon: "fal fa-phone-alt icon-animation",
      },
      {
        label: "24/7 Emergency",
        value: "07854 451 941",
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
    operatingLocations: "London and Sussex",
    contactHours: {
      regularDays: "24 Hours",
      regularHours: "",
      emergency: "",
    },
    legalLinks: [
      { label: "Privacy & Policy", href: "/faq" },
      { label: "Terms and Conditions", href: "/contracts" },
    ],
    copyrightName: "Geo Gas Services",
    rightsText: "All Rights Reserved",
  },
  pages: {
    about: {
      breadcrumbTitle: "About Us",
      metaTitle: "About Geo Gas Services",
      metaDescription:
        "Meet the Geo Gas team delivering gas, boiler, plumbing, drainage, building works and carpentry support across London and Sussex.",
      heroSpot: {
        eyebrow: "GEO Hero Team",
        name: "Aaron",
        role: "CEO & Founder",
        imageSrc: "/cartoons/aaron_hero.jpg",
        imageAlt: "Superhero-style illustration of Aaron from GEO Gas",
        heading: "Meet The Engineers Behind GEO Gas Service Cover",
        description:
          "Our engineer team shows up fast, works safely and keeps contract support practical. Explore the cover options and pricing now starting from £19 per month.",
        ctaHref: "/contracts",
        ctaLabel: "View Contract Cover",
        secondaryCtaHref: "/pricing",
        secondaryCtaLabel: "View Pricing",
        accent: "red",
      },
    },
    contact: {
      breadcrumbTitle: "Contact Us",
      metaTitle: "Contact Geo Gas Services",
      metaDescription:
        "Contact Geo Gas for call-outs and quotes in London and Sussex. Office: 0207 723 2221 (London office) and 01444 212 395 (Sussex office). 24-hour emergency call-out: 07854 451 941.",
      heroSpot: {
        eyebrow: "GEO Hero Team",
        name: "Sophia",
        role: "Service Coordinator",
        imageSrc: "/cartoons/sophia_hero.jpg",
        imageAlt: "Superhero-style illustration of Sophia from GEO Gas",
        heading: "Sophia Can Help You Book The Right Service",
        description:
          "Tell us what you need and Sophia will route your enquiry to the right team member for contracts, servicing, landlord checks, installations or emergency support.",
        ctaHref: "/pricing",
        ctaLabel: "Check Prices First",
        secondaryCtaHref: "/contracts",
        secondaryCtaLabel: "Compare Contracts",
        accent: "teal",
      },
    },
    services: {
      breadcrumbTitle: "Our Services",
      metaTitle: "Services | Geo Gas Services",
      metaDescription:
        "Explore Geo Gas services including gas, boiler, plumbing, drainage, building works and carpentry support in London and Sussex.",
      heroSpot: {
        eyebrow: "GEO Hero Team",
        name: "James",
        role: "Gas Engineer",
        imageSrc: "/cartoons/james_hero.jpg",
        imageAlt: "Superhero-style illustration of James from GEO Gas",
        heading: "James Is On The Service Response Team",
        description:
          "Gas, boiler, plumbing and drain call-outs are backed by experienced engineers and clear pricing. Check current service rates before you book.",
        ctaHref: "/pricing",
        ctaLabel: "View Current Pricing",
        secondaryCtaHref: "/contracts",
        secondaryCtaLabel: "Compare Cover",
        accent: "teal",
      },
    },
    contracts: {
      breadcrumbTitle: "Home Service Contracts",
      metaTitle: "Home Service Contracts | Geo Gas Services",
      metaDescription:
        "Review Geo Gas home service contract cover options, benefits and terms for London and Sussex properties.",
      heroSpot: {
        eyebrow: "GEO Hero Team",
        name: "Matt",
        role: "Senior Engineer",
        imageSrc: "/cartoons/matt_hero.jpg",
        imageAlt: "Superhero-style illustration of Matt from GEO Gas",
        heading: "Matt Covers Home Service Contract Support",
        description:
          "Review GEO Starter and GEO Complete cover details, exclusions and brochure terms. Contract plans now start from £19 per month.",
        ctaHref: "/contact",
        ctaLabel: "Ask About Cover",
        secondaryCtaHref: "/pricing",
        secondaryCtaLabel: "View Pricing",
        accent: "red",
      },
    },
    pricing: {
      breadcrumbTitle: "Pricing",
      metaTitle: "Pricing | Geo Gas Services",
      metaDescription:
        "View current Geo Gas call-out and service pricing for gas, boiler, plumbing, drainage, building works and carpentry support.",
      heroSpot: {
        eyebrow: "GEO Hero Team",
        name: "Maya",
        role: "Customer Care Lead",
        imageSrc: "/cartoons/mia_normal.jpg",
        imageAlt: "Illustration of Maya from GEO Gas",
        heading: "Maya Helps You Compare Rates And Cover",
        description:
          "Use this page for live call-out and service pricing, then compare contract plans now starting from £19 per month in the brochure and contracts section.",
        ctaHref: "/contracts",
        ctaLabel: "Compare £19 Plans",
        secondaryCtaHref: "/contact",
        secondaryCtaLabel: "Request A Quote",
        accent: "green",
      },
    },
    faq: {
      breadcrumbTitle: "FAQ",
      metaTitle: "FAQ | Geo Gas Services",
      metaDescription:
        "Read frequently asked questions about Geo Gas services, response times, cover options and call-out support in London and Sussex.",
      heroSpot: {
        eyebrow: "GEO Hero Team",
        name: "Matthew",
        role: "Senior Engineer",
        imageSrc: "/cartoons/matthew_hero.jpg",
        imageAlt: "Superhero-style illustration of Matthew from GEO Gas",
        heading: "Matthew Answers The Most Common Cover Questions",
        description:
          "Browse FAQs for contract cover, service response and call-out details, then contact the team if you want a tailored recommendation.",
        ctaHref: "/contact",
        ctaLabel: "Ask A Question",
        secondaryCtaHref: "/contracts",
        secondaryCtaLabel: "View Contract Cover",
        accent: "green",
      },
    },
    helpAdvice: {
      breadcrumbTitle: "Help & Advice",
      metaTitle: "Help & Advice | Geo Gas Services",
      metaDescription:
        "Practical help and advice for boiler, heating, gas and plumbing issues from Geo Gas Services.",
      heroSpot: {
        eyebrow: "GEO Hero Team",
        name: "Geo",
        role: "Gas Engineer",
        imageSrc: "/cartoons/geo_hero.jpg",
        imageAlt: "Superhero-style illustration of Geo from GEO Gas",
        heading: "Geo Shares The Most Common Boiler Checks",
        description:
          "Use these quick checks to rule out simple pressure, controls and radiator issues before you book a call-out.",
        ctaHref: "/contact",
        ctaLabel: "Book A Call-Out",
        secondaryCtaHref: "/pricing",
        secondaryCtaLabel: "View Pricing",
        accent: "red",
      },
    },
  },
  aboutPage: {
    kicker: "Home Service Contract Rescue",
    title: "About GEO Gas Services",
    paragraphs: [
      "Geo Gas Services provides peace-of-mind home service contracts designed to reduce heating and plumbing emergencies for households and landlords.",
      "As stated in the company brochure: avoid the hassle and unexpected central heating breakdowns with GEO Gas by your side.",
    ],
    founderName: "Aaron Stewart, CEO & Founder",
    founderQuote:
      "Whichever GEO GAS home contract you choose, you can rest assured that our service contract will look after you and your home.",
    stats: [
      { value: "£19", label: "Brochure plans from" },
      { value: "24/7", label: "Contract helpline support" },
      { value: "24hr", label: "Response target on call-outs" },
      { value: "£5m", label: "Public liability cover" },
    ],
    primaryAction: {
      label: "View Contract Options",
      href: "/contracts",
    },
    secondaryAction: {
      label: "Open Brochure",
      href: "/info/geo-gas-brochure-2026.pdf",
    },
    imagePath: "/cartoons/aaron_normal.jpg",
    imageAlt: "Geo Gas team member illustration",
    keyBenefitsTitle: "Why Customers Choose GEO Gas",
    keyBenefits: [
      "Annual boiler service checks",
      "Heating and plumbing support included",
      "24/7 helpline with rapid response prioritisation",
      "No extra charges for heating, plumbing and drainage claims",
      "Unlimited call-outs under contract cover (excluding drains)",
      "All parts and labour covered with new parts used",
    ],
    coverageTitle: "Coverage Snapshot",
    starterTitle: "GEO Starter",
    starterCoverage: [
      "Boiler, flue and controls",
      "Thermostats, pumps and motorised valves",
      "Radiators, valves, pipes and fittings",
      "Heating and boiler cover up to £1,500 per claim",
    ],
    completeTitle: "GEO Complete Adds",
    completeAddons: [
      "Internal plumbing between stopcock and taps/appliances",
      "Water supply pipework from internal stopcock to accessible point",
      "Internal drains and waste pipes for leaks/blockages",
    ],
    reputationTitle: "Proud Of A 5 Star Reputation",
    reputationDescription:
      "The brochure highlights GEO Gas customer feedback across Checkatrade, Trustpilot and Google Reviews, backed by Gas Safe registration and dedicated contract support lines.",
    reputationBadges: [
      "Checkatrade",
      "Trustpilot",
      "Google Reviews",
      "Gas Safe Registered",
    ],
    reputationImagePath: "/info/brochure-pages/page-7.jpg",
    reputationImageAlt:
      "GEO Gas brochure page showing 5 star reputation and contacts",
  },
  pricingPage: {
    title: "Geo Gas Current Pricing",
    description:
      "All parking charges, ULEZ and congestion charges are included. Minimum one hour, then billed in 15-minute intervals.",
    note:
      "These rates are kept up to date by the Geo Gas team and may change as operating costs, access requirements and parts pricing change.",
    contractEyebrow: "Brochure Contract Pricing",
    contractTitle: "Home Service Contracts From £19 / Month",
    calloutRules: [
      "Parking, ULEZ and congestion charges are included in listed call-out rates.",
      "Minimum one hour, then charged in 15-minute intervals.",
      "Gas, plumbing and drain hourly rates vary by time band.",
    ],
    hourlyCategories: [
      {
        title: "Gas & Boiler Works",
        rates: [
          { period: "7am - 6pm", price: "£100 + VAT / hour" },
          { period: "6pm - 12am", price: "£155 + VAT / hour" },
          { period: "12am - 7am", price: "£195 + VAT / hour" },
        ],
      },
      {
        title: "Plumbing",
        rates: [
          { period: "7am - 6pm", price: "£100 + VAT / hour" },
          { period: "6pm - 12am", price: "£145 + VAT / hour" },
          { period: "12am - 6am", price: "£185 + VAT / hour" },
        ],
      },
      {
        title: "Drains",
        rates: [
          { period: "7am - 6pm", price: "£135 + VAT / hour" },
          { period: "6pm - 12am", price: "£180 + VAT / hour" },
          { period: "12am - 7am", price: "£200 + VAT / hour" },
        ],
      },
    ],
    serviceItems: [
      { label: "Boiler servicing (7am - 6pm)", value: "£100" },
      { label: "Boiler servicing (6pm - 12am)", value: "£140" },
      {
        label: "Landlord gas inspection (1 boiler + 1 cooker/hob, 7am - 6pm)",
        value: "£80",
      },
      {
        label: "Landlord gas inspection (1 boiler + 1 cooker/hob, 6pm - 12am)",
        value: "£100",
      },
      { label: "Extra appliance", value: "£40 per appliance" },
      { label: "Landlord bundle (7am - 6pm)", value: "£175" },
      { label: "Landlord bundle (6pm - 12am)", value: "£235" },
    ],
    installationItems: [
      { label: "Combination boiler like-for-like swap", value: "From £2300 + VAT" },
      { label: "Boiler conversions", value: "From £2800+" },
      { label: "System & heat-only boiler installs", value: "From £2500" },
    ],
    salesItems: [
      { label: "Carbon monoxide detector", value: "£25 + VAT" },
      {
        label: "Smart controls upgrade (one zone)",
        value: "£340 (+£100 per extra zone)",
      },
      { label: "Thermostatic radiator valve", value: "£40 + VAT per valve" },
      { label: "Radiator upgrade labour", value: "From £80 + VAT per radiator" },
      { label: "New pump upgrade (Grundfos UPS3)", value: "From £320 fitted" },
      { label: "New pump with valves", value: "£350 fitted" },
      { label: "Power flush (up to 10 radiators)", value: "£500 + VAT" },
      { label: "Power flush (10 - 20 radiators)", value: "£700 + VAT" },
      { label: "Power flush (20 - 30 radiators)", value: "£850 + VAT" },
      { label: "Add inhibitor to system", value: "£45 + VAT" },
      { label: "Cylinder upgrades", value: "From £800 + VAT" },
      { label: "Magnetic system filter upgrade", value: "From £200+" },
      { label: "Scale reducer system upgrade", value: "From £80+" },
    ],
    electricalItems: [
      { label: "Domestic EICR certification", value: "From £180+" },
      { label: "Commercial EICR certification", value: "From £240+" },
    ],
    ctaText: "Pricing may vary by system condition and parts required.",
  },
  contractsPage: {
    introHeading: "Home Service Contract Rescue",
    introSubheading:
      "Relax, we have a peace of mind home service contract for you.",
    founderNote:
      "Avoid the hassle and unexpected central heating breakdowns with us by your side. If you want complete peace of mind for your home, choose GEO GAS Services.",
    founderName: "Aaron Stewart, CEO & Founder",
    currentPricingNotice:
      "All pricing shown on this site is kept up to date by the Geo Gas team. Use the Pricing page for current call-out rates, service pricing and works charges.",
    contactCardTitle: "Contract Helpline 24/7",
    priceTagLabel: "Contracts from",
    priceTagValue: "£19 / month",
    packageBenefitsTitle: "Package Benefits",
    packageBenefits: [
      "Annual boiler service",
      "Heating & plumbing support",
      "24/7 helpline",
      "24-hour response time (priority sooner for elderly customers or children under age 4)",
      "No extra charges on heating and plumbing claims",
      "No extra charges for drainage claims",
      "Gas Safe Registered",
      "Unlimited call outs (excluding drains)",
      "All parts and labour covered*",
      "New parts always used",
      "£5 million liability cover",
      "Landlord packages available (includes gas safety inspection and certificates)",
    ],
    packages: [
      {
        name: "GEO Starter",
        subtitle:
          "Covers your boiler and central heating system, with annual boiler service included.",
        monthlyFrom: "£19 / month",
        includes: [
          "Gas fired central heating boiler, flue and controls",
          "Thermostats, heating controls, circulating pumps and motorised valves",
          "Time clock or programmer",
          "Hot water feeds, expansion tanks, cylinders and immersions",
          "Radiators and valves",
          "Pipes and fittings",
          "Heating & boiler cover: £1500 max per claim",
        ],
      },
      {
        name: "GEO Complete",
        subtitle:
          "All Starter benefits plus extra peace-of-mind cover for plumbing, water supply and internal drains.",
        monthlyFrom: "From £19 / month",
        includes: [
          "Everything in GEO Starter",
          "Heating & boiler cover: £1500 max per claim",
        ],
        extraCover: [
          "Plumbing: internal hot/cold pipework between stopcock and taps/appliances (£60 extra charge for all taps and toilets)",
          "Water supply: from internal stopcock to accessible supply point (up to £1000 max claim)",
          "Internal drains: blocked or leaking internal drains and waste pipes (up to £1000 claim limit)",
        ],
      },
    ],
    landlordTitle: "Landlord Packages & Safety Certificates",
    landlordBody:
      "The brochure confirms landlord packages are available, including inspection on gas appliances and pipework with certificates.",
    landlordHighlights: [
      "Landlord packages are available for rental properties.",
      "Includes landlord gas safety inspection across gas appliances and pipework.",
      "Certificates are included as part of the landlord package service.",
      "Landlord checks are also supported through GEO pricing and service booking options.",
    ],
    landlordNote:
      "Use the Pricing and Contact pages to request current landlord check rates and booking availability.",
    atAGlanceTitle: "Contract At A Glance (Brochure Terms)",
    atAGlance: [
      "Supplier in brochure terms: Geo Gas Services London Limited (Company No. 09115378).",
      "The brochure terms describe a service/repair contract, not an insurance policy.",
      "Services contracts include GEO Starter, GEO Complete and Landlords Complete Contract (as specified in Order Confirmation).",
      "Initial service contract term is 12 months, then continues until notice under the terms.",
      "Fair call-out value is £1500 ex VAT per 12-month period unless otherwise agreed in writing.",
      "Emergency call-out priority applies for severe leaks and eligible vulnerable households without heating/hot water.",
    ],
    annualServiceChecksTitle: "Annual Boiler Service Checks",
    annualServiceChecks: [
      "Visual boiler check",
      "Boiler fired safely to identify faults",
      "Flue gas analysis efficiency test",
      "Boiler opened and inspected if required",
      "Flue and ventilation checked against Gas Safety regulations",
      "System pressure checked and adjusted",
      "Condensate trap cleaned",
      "Radiators checked and bled where needed",
      "Hot water cylinder visual check",
      "Written confirmation after service",
    ],
    annualServiceChecksNote:
      "The annual boiler service itself does not form part of the contract cover.",
    exclusionsTitle: "Things We Don't Cover",
    sharedExclusions: [
      "Pre-existing system design or installation faults",
      "Underfloor heating and controls",
      "Repairs limited to £300 in first 3 months of service contract",
      "If boiler is 7+ years old when policy starts, monthly premium increases by £2.00",
      "Damage caused by weather or freezing",
      "Boiler replacement where repair is beyond economic repair or parts unavailable for model",
      "Damage caused by sludge, scale or debris in heating system and related pipework",
      "Disconnection/reconnection interruptions from gas or water mains",
      "Water/gas pipework beneath or inside inaccessible buildings/outbuildings",
      "Shared drains",
      "Damage when property is unoccupied for more than 30 consecutive days",
      "Guest Houses / B&Bs are not covered",
    ],
    termsHighlightsTitle: "Terms & Conditions Highlights",
    termsHighlights: [
      "Contract includes: Services Brochure, Contract Details, Conditions, and Order Confirmation.",
      "Service contracts run for an initial 12-month period, then continue until notice is given under contract terms.",
      "Fair call-out value under service contract: £1500 (ex VAT), unless otherwise agreed.",
      "Emergency call-out prioritisation applies for severe leaks and no heating/hot water in vulnerable households.",
      "Detailed legal terms and customer obligations are set out in the full Terms & Conditions brochure pages.",
    ],
    termsCtaText:
      "Read the full legal wording in the brochure Terms & Conditions pages.",
    termsPrimaryAction: {
      label: "Ask About Contracts",
      href: "/contact",
    },
    termsSecondaryAction: {
      label: "Open Full Brochure",
      href: "/info/geo-gas-brochure-2026.pdf",
    },
    termsBreakdownTitle: "Contract Terms Breakdown",
    termsSections: [
      {
        title: "Contract Scope",
        points: [
          "Contract is made up of: Services Brochure, Contract Details, Conditions, and Order Confirmation.",
          "Contracts can cover Services Contract Work and separate Work Contract items.",
          "Service contracts include inspection, repair and maintenance of the listed system.",
        ],
      },
      {
        title: "Duration & Renewal",
        points: [
          "Initial term is 12 months.",
          "After initial term, contract continues until written notice under contract rules.",
          "Charges can be updated at anniversaries in line with Order Confirmation terms.",
        ],
      },
      {
        title: "Service Limits",
        points: [
          "Fair call-out value is £1500 ex VAT per 12-month period unless otherwise agreed.",
          "Supplier may decline works beyond economic repair scope.",
          "Excluded parts and excluded scenarios are listed in the Terms section.",
        ],
      },
      {
        title: "Charges & Payment",
        points: [
          "VAT is charged where applicable.",
          "Service contracts are paid by monthly installments.",
          "Invoices for non-contract/excluded work are payable as stated in the Terms.",
        ],
      },
      {
        title: "Emergency Priority",
        points: [
          "Emergency prioritisation applies for serious leaks and loss of heating/hot water.",
          "Priority response is highlighted for vulnerable households where applicable.",
          "Repairs and parts replacement are completed as soon as reasonably possible.",
        ],
      },
      {
        title: "Customer Responsibilities",
        points: [
          "Provide safe access, utilities and relevant information for engineers.",
          "Do not allow third-party system work during active service contract unless agreed.",
          "Maintain legal permissions for works at the property.",
        ],
      },
      {
        title: "Legal Framework",
        points: [
          "Terms include limitation of liability clauses.",
          "Written notices and communication rules apply under section 10.7 of the brochure terms.",
          "Governing law and jurisdiction are set out in the full Terms document.",
        ],
      },
    ],
    termsClauseIndexTitle: "Terms Clause Index",
    termsClauseIndex: [
      {
        clause: "1",
        title: "Contract Details",
        summary:
          "Defines how the contract is formed, what documents are included and how services/work are described.",
      },
      {
        clause: "2",
        title: "Conditions",
        summary:
          "Sets out precedence of documents and confirms how conflicts in wording are handled.",
      },
      {
        clause: "3",
        title: "Interpretation",
        summary:
          "Covers annual service scope, economic repair rules, emergency call-out meaning and fair call-out value.",
      },
      {
        clause: "4",
        title: "Commencement & Term",
        summary:
          "Explains contract start date, 12-month initial term and continuation rules after the first period.",
      },
      {
        clause: "5",
        title: "Supply Of Services",
        summary:
          "Describes supplier obligations, standards, compliance, timing and site attendance expectations.",
      },
      {
        clause: "6",
        title: "Customer Obligations",
        summary:
          "Details customer duties for access, permissions, safety, utilities and third-party works restrictions.",
      },
      {
        clause: "7",
        title: "Charges & Payment",
        summary:
          "Defines VAT treatment, payment timing, monthly installments and outcomes for late or non-payment.",
      },
      {
        clause: "8",
        title: "Limitation Of Liability",
        summary:
          "Specifies liability caps and exclusions for certain indirect or consequential losses.",
      },
      {
        clause: "9",
        title: "Termination",
        summary:
          "Explains termination rights, insolvency conditions and payment obligations on termination.",
      },
      {
        clause: "10",
        title: "General & Legal",
        summary:
          "Includes notices, entire agreement, third-party rights, governing law and jurisdiction clauses.",
      },
    ],
    faqTitle: "Contracts FAQ",
    faq: [
      {
        question: "Are contract prices on this page the latest live rates?",
        answer:
          "Yes. The contracts and pricing pages show current rates. You can also view the live price list directly in /info/price.txt.",
      },
      {
        question: "What is the fair call-out value in the brochure terms?",
        answer:
          "The brochure terms reference a fair call-out value of £1500 ex VAT per 12-month contract period unless otherwise agreed in writing.",
      },
      {
        question: "Do contracts include unlimited call-outs?",
        answer:
          "The brochure states unlimited call-outs for contract customers, excluding drains where specified in the package details.",
      },
      {
        question: "Is annual boiler servicing included?",
        answer:
          "Annual boiler service checks are listed as a package benefit. The brochure also states service itself does not form part of repair claim cover.",
      },
      {
        question: "Can I use this cover for guest houses or B&Bs?",
        answer:
          "No. The exclusions list in the brochure states guest houses and B&B properties are not covered.",
      },
      {
        question: "How do I get the full legal wording?",
        answer:
          "Use the full brochure link on this page to view all terms and conditions sections in full.",
      },
    ],
    brochureTitle: "Brochure Pages Preview",
    brochureDescription:
      "Preview company brochure pages here, then open the full PDF for complete wording.",
    brochurePreviews: [
      {
        src: "/info/brochure-pages/page-1.jpg",
        title: "Cover - Home Service Contract Rescue",
      },
      {
        src: "/info/brochure-pages/page-2.jpg",
        title: "Benefits & Founder Message",
      },
      {
        src: "/info/brochure-pages/page-3.jpg",
        title: "GEO Starter Cover",
      },
      {
        src: "/info/brochure-pages/page-4.jpg",
        title: "GEO Complete Cover",
      },
      {
        src: "/info/brochure-pages/page-5.jpg",
        title: "Terms & Conditions (Part 1)",
      },
      {
        src: "/info/brochure-pages/page-6.jpg",
        title: "Terms & Conditions (Part 2)",
      },
      {
        src: "/info/brochure-pages/page-7.jpg",
        title: "Reputation & Contact Summary",
      },
    ],
    brochureLinkHref: "/info/geo-gas-brochure-2026.pdf",
    brochureLinkLabel: "Open PDF In New Tab",
    reputationTitle: "Proud Of Our 5 Star Reputation",
    reputationDescription:
      "Open our live review profiles directly across leading platforms.",
    reputationBadges: [
      "Checkatrade",
      "Trustpilot",
      "HaMuch",
      "Google Reviews",
    ],
  },
  helpAdvicePage: {
    eyebrow: "FAQ",
    title: "Here Are Some Of The Most Common Problems Associated With Your Boiler",
    description:
      "Quick checks can help identify simple issues before you book a call-out. If you are unsure at any stage, stop and contact a qualified engineer.",
    items: [
      {
        title: "Pressure",
        body: "Has your boiler got enough pressure? When was the last time you checked your pressure gauge? Is at the required measurement? A lot of modern boilers are sealed systems and they need regular topping up. Your pressure gauge should indicate that the bar is between levels 1 and 2. You can add more pressure via your filling loop. Check boiler manufacturers instructions for advice on how to do so.",
      },
      {
        title: "Controls",
        body: "A lot of problems with boilers can be due to the controls. The controls can be confusing, so if you have got an instruction manual then please consult your guide on how to appropriately handle any configuration on your boiler. If you have misplaced, lost or simply cannot find your instruction manual, you can simply visit your boiler manufacturer website, just go online and you will be able to download a new updated copy of your manual. Always make sure your dial is switched on and the temperature of the room is appropriately set.",
      },
      {
        title: "Noise",
        body: "Is your boiler making unusual noises, noises which you would not usually associate with it working efficiently? Banging, loud pressurised noises or even hissing noises can be an indication of something that could be at fault. A lot of the time noises in the boiler are down to poor pump circulation or a blockage somewhere in the system. Also if there is no further pressure in the system, and your gauge is not level at the correct measurement then that also could be an indication. Check your pressure, check your vent and cover most parts of the system to check for a leak or pressure escaping. Always check manufacturers instructions before investigating, or if unsure please do not hesitate to ask for advice from a qualified technician.",
      },
      {
        title: "Power",
        body: "Is the power turned on to the boiler? Check your temperature gauge. If your radiators are not hot enough, then check boiler temperature settings and indicate whether or not the controls are set to the increased requirement you need for the temperature to rise. Turn up your thermostat on the radiator and re-check the system to see if this adjustment has altered the temperature.",
      },
      {
        title: "Cold Radiator",
        body: "Cold radiators or cold laches along your radiators are normally due to air in the system or a blockage building up inside the radiators. Vent your system and check the pressure. If cold patches are still there and there is no considerable change thereafter then the system would need to be cleaned.",
      },
    ],
  },
  chatbot: {
    eyebrow: "Geo Gas Customer Assistant",
    title: "Ask About Pricing, Contracts & Cover",
    description:
      "This assistant answers directly from our live price file and brochure terms.",
    newChatLabel: "New chat",
    showQuickToolsLabel: "Quick topics",
    hideQuickToolsLabel: "Hide quick topics",
    quickTopicsLabel: "Popular quick topics",
    askTopicLabel: "Ask Topic",
    conversationTitle: "Chat window",
    conversationDescription: "Type below to chat with the Geo Gas assistant.",
    inputPlaceholder:
      "Ask about call-out prices, servicing costs, or contract terms...",
    askButtonLabel: "Ask Bot",
    askButtonLoadingLabel: "Streaming...",
    stopButtonLabel: "Stop",
    statusText:
      "Geo Gas service guidance, pricing help and contact information. Conversation is saved in this browser.",
    initialMessage:
      "Hi, I am the Geo Gas assistant. Ask about pricing, contracts, operating locations, contact hours, or service support.",
    quickPrompts: [
      "What are your gas and boiler call-out rates?",
      "How much is a landlord gas inspection?",
      "What is included in your home rescue contracts?",
      "What is the starting price for a combi boiler swap?",
      "What areas do you cover and what are your opening hours?",
    ],
    faqShortcuts: [
      {
        label: "Emergency Help",
        prompt: "What should I do in a gas emergency and who do I call?",
      },
      {
        label: "Boiler Repair",
        prompt: "What are your boiler repair call-out rates and next steps?",
      },
      {
        label: "Landlord Safety",
        prompt:
          "How much is a landlord gas safety inspection and what is included?",
      },
      {
        label: "Home Rescue Cover",
        prompt: "What is included and excluded in Home Rescue contracts?",
      },
      {
        label: "Drainage",
        prompt: "What are your drainage call-out and repair prices?",
      },
      {
        label: "Boiler Install",
        prompt: "What is the starting price and process for a new boiler installation?",
      },
      {
        label: "Areas & Hours",
        prompt: "What areas do you cover and what are your contact hours?",
      },
    ],
    leadCaptureHeading: "Want this priced and booked faster?",
    leadCaptureDescription:
      "Send your details and we will call you back with a confirmed quote and availability. Coverage includes London and Sussex, with 24-hour support.",
    leadSuccessMessage:
      "Request sent. A Geo Gas team member will call you shortly to confirm details. We provide 24-hour support, Monday to Sunday.",
    leadEmergencyCtaLabel: "Call 24/7 Emergency",
    leadContactCtaLabel: "Open Contact Page",
    defaultService: "Boiler repair quote",
    fieldPlaceholders: {
      name: "Full name",
      email: "Email address",
      phone: "Phone number",
      postcode: "Postcode",
      service: "Service needed",
      note: "Extra details (optional)",
    },
    submitLeadLabel: "Send Request",
    submitLeadLoadingLabel: "Sending request...",
  },
  guidesPage: {
    metaTitle: "Boiler Repair Guides | Geo Gas Services",
    metaDescription:
      "Problem guides, parts guides and supporting service pages for boiler repair, gas safety and local call-outs across London and Sussex.",
    eyebrow: "Guides hub",
    title: "Boiler, heating and gas safety guides",
    description:
      "This hub groups the high-intent pages built to support boiler repair, gas safety and local service leads. Use it as the internal linking centre for problem pages, parts guides and supporting service pages.",
  },
  searchPage: {
    metaTitle: "Site Search | Geo Gas Services",
    metaDescription:
      "Search Geo Gas services, guides, pricing and contact information.",
    breadcrumbTitle: "Search",
    title: "Search The Geo Gas Site",
    description:
      "Find services, pricing information, contracts, FAQs, help & advice, and contact details.",
    inputPlaceholder: "Search service, topic or keyword...",
    emptyStateTitle: "Try searching for:",
    emptySuggestions: [
      "boiler repair",
      "landlord gas safety",
      "opening hours",
      "sussex coverage",
      "contract cover",
      "cold radiator",
    ],
    resultsDescription:
      "Internal results from Geo Gas pages and key content sections.",
    noResultsTitle: "No matching results found",
    noResultsDescription:
      "Try broader terms like boiler, contract, pricing, landlord, or contact.",
    noResultsSuggestions: [
      "boiler service",
      "contact hours",
      "sussex",
    ],
  },
};
