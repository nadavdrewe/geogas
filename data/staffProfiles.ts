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
    role: "Gas Engineer",
    imagePath: "/cartoons/geo_normal.jpg",
    shortProfile:
      "Geo leads complex boiler fault diagnostics and rapid restore jobs, with a calm, methodical approach focused on safety, reliability and first-visit fixes.",
    experience: "4 years gas engineering experience",
    serviceArea: "London and Sussex",
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
    role: "CEO & Founder",
    imagePath: "/cartoons/aaron_normal.jpg",
    shortProfile:
      "Aaron leads Geo Gas operations, service standards and escalations, combining hands-on engineering oversight with practical support for complex home service projects.",
    experience: "25 years engineering experience",
    serviceArea: "London and Sussex",
    availability: "Founder oversight",
    specialties: [
      "Technical leadership",
      "Quality assurance",
      "Complex project planning",
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
    experience: "5 years boiler and gas service experience",
    serviceArea: "London and Sussex",
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
    role: "Senior Engineer",
    imagePath: "/cartoons/matthew_normal.jpg",
    shortProfile:
      "Matthew handles emergency attendance and routine heating work with a practical, no-nonsense style that helps households get safely back up and running quickly.",
    experience: "10 years reactive maintenance experience",
    serviceArea: "London and Sussex",
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
    id: "maya",
    name: "Maya",
    role: "Customer Care Lead",
    imagePath: "/cartoons/mia_normal.jpg",
    heroImagePath: "/cartoons/mia_normal.jpg",
    shortProfile:
      "Maya oversees booking quality and customer updates, making sure each engineer arrives with the right brief, access notes and job history already in hand.",
    experience: "7+ years service coordination",
    serviceArea: "London and Sussex",
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
    heroImagePath: "/cartoons/sophia_normal.jpg",
    shortProfile:
      "Sophia supports day-to-day scheduling and post-visit follow-up, helping customers and landlords stay informed from first contact through final confirmation.",
    experience: "6+ years operations support",
    serviceArea: "London and Sussex",
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
