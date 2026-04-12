export type StaffProfile = {
  id: string;
  name: string;
  role: string;
  imagePath: string;
  heroImagePath?: string;
  shortProfile: string;
  experience: string;
  serviceArea: string;
  availability: string;
  specialties: string[];
  certifications: string[];
};

// Update this file to manage all staff profile content in one place.
// Replace imagePath values with your final photos when ready.
export const staffProfiles: StaffProfile[] = [
  {
    id: "geo",
    name: "Geo",
    role: "Senior Gas Engineer",
    imagePath: "/cartoons/geo_normal.jpg",
    shortProfile:
      "Geo leads complex boiler fault diagnostics and rapid restore jobs, with a calm, methodical approach focused on safety, reliability and first-visit fixes.",
    experience: "12+ years field diagnostics",
    serviceArea: "South & Central London",
    availability: "On-call emergency response",
    specialties: [
      "Boiler breakdown diagnostics",
      "Combustion tuning",
      "Heating control faults",
    ],
    certifications: [
      "Gas Safe Registered",
      "Landlord gas safety inspections",
      "Domestic heating fault tracing",
    ],
  },
  {
    id: "aaron",
    name: "Aaron",
    role: "Team Leader",
    imagePath: "/cartoons/aaron_normal.jpg",
    shortProfile:
      "Aaron manages engineer dispatch, technical escalations and final quality sign-off, keeping response times tight and workmanship standards high across the board.",
    experience: "15+ years operations leadership",
    serviceArea: "London-wide coordination",
    availability: "Priority escalation lead",
    specialties: [
      "Complex call-out planning",
      "Quality assurance",
      "Multi-trade job coordination",
    ],
    certifications: [
      "Gas Safe Registered",
      "Landlord compliance workflows",
      "Emergency response planning",
    ],
  },
  {
    id: "james",
    name: "James",
    role: "Gas Engineer",
    imagePath: "/cartoons/james_normal.jpg",
    shortProfile:
      "James focuses on appliance servicing and gas safety work, combining strong technical troubleshooting with clear customer communication before and after every repair.",
    experience: "10+ years boiler & gas service",
    serviceArea: "North & West London",
    availability: "Daily scheduled attendance",
    specialties: [
      "Gas appliance servicing",
      "System performance checks",
      "CP12-related remedials",
    ],
    certifications: [
      "Gas Safe Registered",
      "Flue and ventilation checks",
      "Boiler service documentation",
    ],
  },
  {
    id: "matthew",
    name: "Matthew",
    role: "Gas Engineer",
    imagePath: "/cartoons/matthew_normal.jpg",
    shortProfile:
      "Matthew handles emergency attendance and routine heating work with a practical, no-nonsense style that helps households get safely back up and running quickly.",
    experience: "9+ years reactive maintenance",
    serviceArea: "East & Greater London",
    availability: "Rapid reactive call-outs",
    specialties: [
      "Emergency fault attendance",
      "Heating and pipework repairs",
      "Post-repair system testing",
    ],
    certifications: [
      "Gas Safe Registered",
      "Domestic boiler maintenance",
      "Customer handover reporting",
    ],
  },
  {
    id: "mia",
    name: "Mia",
    role: "Customer Care Lead",
    imagePath: "/cartoons/mia_normal.jpg",
    heroImagePath: "/cartoons/mia_hero.jpg",
    shortProfile:
      "Mia oversees booking quality and customer updates, making sure each engineer arrives with the right brief, access notes and job history already in hand.",
    experience: "7+ years service coordination",
    serviceArea: "Customer support desk",
    availability: "Live booking & updates",
    specialties: [
      "Appointment planning",
      "Client communication",
      "Engineer-job matching",
    ],
    certifications: [
      "Call-out triage workflows",
      "Landlord booking coordination",
      "Service follow-up handling",
    ],
  },
  {
    id: "sophia",
    name: "Sophia",
    role: "Service Coordinator",
    imagePath: "/cartoons/sophia_normal.jpg",
    heroImagePath: "/cartoons/sophia_hero.jpg",
    shortProfile:
      "Sophia supports day-to-day scheduling and post-visit follow-up, helping customers and landlords stay informed from first contact through final confirmation.",
    experience: "6+ years operations support",
    serviceArea: "Admin & follow-up coordination",
    availability: "Same-day schedule support",
    specialties: [
      "Landlord diary management",
      "Aftercare follow-up",
      "Service documentation tracking",
    ],
    certifications: [
      "Customer service coordination",
      "Job status reporting",
      "Contract support workflows",
    ],
  },
];
