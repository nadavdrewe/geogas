export type ContractPackage = {
  name: string;
  subtitle: string;
  monthlyFrom: string;
  includes: string[];
  extraCover?: string[];
};

export type ContractFAQ = {
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

export type ReputationPlatform = {
  name: string;
  note: string;
};

export const contractsIntro = {
  heading: "Home Service Contract Rescue",
  subheading: "Relax, we have a peace of mind home service contract for you.",
  founderNote:
    "Avoid the hassle and unexpected central heating breakdowns with us by your side. If you want complete peace of mind for your home, choose GEO GAS Services.",
  founderName: "Aaron Stewart, CEO & Founder",
};

export const currentPricingNotice =
  "All pricing shown on this site is kept up to date by the Geo Gas team. Use the Pricing page for current call-out rates, service pricing and works charges.";

export const packageBenefits: string[] = [
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
];

export const annualServiceChecks: string[] = [
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
];

export const sharedExclusions: string[] = [
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
];

export const contractPackages: ContractPackage[] = [
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
];

export const contractsContact = {
  phonePrimary: "0207 7232221",
  phoneSecondary: "07854 451941",
  email: "info@geogasservices.uk",
  website: "www.geogasservices.uk",
};

export const landlordPackageHighlights: string[] = [
  "Landlord packages are available for rental properties.",
  "Includes landlord gas safety inspection across gas appliances and pipework.",
  "Certificates are included as part of the landlord package service.",
  "Landlord checks are also supported through GEO pricing and service booking options.",
];

export const contractAtAGlance: string[] = [
  "Supplier in brochure terms: Geo Gas Services London Limited (Company No. 09115378).",
  "The brochure terms describe a service/repair contract, not an insurance policy.",
  "Services contracts include GEO Starter, GEO Complete and Landlords Complete Contract (as specified in Order Confirmation).",
  "Initial service contract term is 12 months, then continues until notice under the terms.",
  "Fair call-out value is £1,500 ex VAT per 12-month period unless otherwise agreed in writing.",
  "Emergency call-out priority applies for severe leaks and eligible vulnerable households without heating/hot water.",
];

export const termsHighlights: string[] = [
  "Contract includes: Services Brochure, Contract Details, Conditions, and Order Confirmation.",
  "Service contracts run for an initial 12-month period, then continue until notice is given under contract terms.",
  "Fair call-out value under service contract: £1500 (ex VAT), unless otherwise agreed.",
  "Emergency call-out prioritisation applies for severe leaks and no heating/hot water in vulnerable households.",
  "Detailed legal terms and customer obligations are set out in the full Terms & Conditions brochure pages.",
];

export const termsSections: TermsSection[] = [
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
];

export const termsClauseIndex: TermsClause[] = [
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
];

export const contractsFaq: ContractFAQ[] = [
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
];

export const reputationSources: string[] = [
  "Checkatrade",
  "Trustpilot",
  "Google Reviews",
];

export const reputationPlatforms: ReputationPlatform[] = [
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
];

export const brochurePreviews: BrochurePreview[] = [
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
];
