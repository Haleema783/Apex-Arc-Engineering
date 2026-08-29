import heroIndustrialImg from "@/assets/hero-industrial.jpg";
import serviceAutomationImg from "@/assets/service-automation.jpg";
import serviceElectricalImg from "@/assets/service-electrical.jpg";
import serviceWeldingImg from "@/assets/service-welding.jpg";
import capCivilImg from "@/assets/cap-civil.jpg";
import capAutomationImg from "@/assets/cap-automation.jpg";
import capEnergyImg from "@/assets/cap-energy.jpg";
import capElectricalImg from "@/assets/cap-electrical.jpg";

export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  relatedService: string;
  overview: string;
  highlights: string[];
  gallery: string[];
};

export const featuredProjects: Project[] = [
  {
    slug: "waste-incinerator-manufacturing",
    title: "Waste Incinerator Manufacturing",
    shortDescription: "High-efficiency incineration systems engineered for industrial waste management and process reliability.",
    description:
      "Apex Arc Engineering executed the manufacturing of a high-efficiency waste incinerator using precision engineering techniques for industrial waste-management applications.",
    image: heroIndustrialImg,
    relatedService: "Heating, Boiler & Combustion Solutions",
    overview:
      "The project demonstrates Apex Arc's capability in the engineering and fabrication of specialised industrial equipment, with emphasis on precision manufacturing, quality compliance and robust engineering.",
    highlights: [
      "Large project image and manufacturing overview",
      "Precision fabrication and quality-compliance details",
      "Technical visuals supporting industrial waste-management performance",
      "Related service: Heating, Boiler & Combustion Solutions",
    ],
    gallery: [heroIndustrialImg, capEnergyImg, serviceWeldingImg],
  },
  {
    slug: "boiler-chiller",
    title: "Boiler & Chiller",
    shortDescription: "Advanced thermal-transfer systems designed for efficient operation and precise industrial process control.",
    description:
      "Apex Arc Engineering engineered an advanced boiler and chiller system designed for thermal-transfer efficiency and precise process control.",
    image: capEnergyImg,
    relatedService: "Heating, Boiler & Combustion Solutions",
    overview:
      "The project demonstrates the company's capability in developing industrial thermal systems with an emphasis on reliable operation, energy optimisation, precision engineering and industrial productivity.",
    highlights: [
      "Project overview and thermal system analysis",
      "Boiler/chiller photographs and installation visuals",
      "Relevant technical details from the profile",
      "Related service: Heating, Boiler & Combustion Solutions",
    ],
    gallery: [capEnergyImg, heroIndustrialImg, capCivilImg],
  },
  {
    slug: "refractory-insulation",
    title: "Refractory & Insulation",
    shortDescription: "Thermal management systems built for industrial resilience, energy efficiency and process integrity.",
    description:
      "Apex Arc Engineering delivered engineered refractory and insulation solutions for demanding industrial environments, focusing on thermal management, process integrity and operational reliability.",
    image: capCivilImg,
    relatedService: "Heating, Boiler & Combustion Solutions",
    overview:
      "The project incorporates appropriate material selection and application to support thermal efficiency, energy performance and reliable industrial operation.",
    highlights: [
      "Project photographs and field application views",
      "Refractory and insulation material details",
      "Thermal performance and use-case information",
      "Related service: Heating, Boiler & Combustion Solutions",
    ],
    gallery: [capCivilImg, capEnergyImg, serviceElectricalImg],
  },
  {
    slug: "integrated-flue-gas-washer",
    title: "Integrated Flue Gas Washer",
    shortDescription: "Scrubbing technology engineered to capture emissions and support environmental compliance.",
    description:
      "Apex Arc Engineering developed an integrated flue gas washing system using advanced scrubbing technology for pollutant removal and environmental-quality compliance.",
    image: serviceElectricalImg,
    relatedService: "Design & Engineering Consultancy / Power & Control Systems",
    overview:
      "The project demonstrates Apex Arc's ability to combine precision engineering, industrial equipment fabrication and environmental-control technology into an integrated industrial solution.",
    highlights: [
      "Main project photograph and system overview",
      "Pollutant-removal and emission-abatement details",
      "Relevant technical visuals and compliance information",
      "Related service: Design & Engineering Consultancy / Power & Control Systems",
    ],
    gallery: [serviceElectricalImg, capElectricalImg, capAutomationImg],
  },
  {
    slug: "plc-control-panel",
    title: "PLC Control Panel",
    shortDescription: "Custom automation panels built for reliable PLC-based process control and industrial precision.",
    description:
      "Apex Arc Engineering engineered and fabricated custom PLC control panels for automated industrial process control.",
    image: serviceAutomationImg,
    relatedService: "PLC & HMI Automation / Panel Building & Cabling",
    overview:
      "The project incorporates automation logic and industrial-grade components to support operational precision, system reliability and controlled industrial processes.",
    highlights: [
      "PLC panel photographs and fabrication detail",
      "Automation and control information from the profile",
      "Relevant diagrams and panel layout visuals",
      "Related service: PLC & HMI Automation / Panel Building & Cabling",
    ],
    gallery: [serviceAutomationImg, capAutomationImg, serviceElectricalImg],
  },
  {
    slug: "industrial-generator",
    title: "Industrial Generator",
    shortDescription: "Reliable power generation solutions built to support continuity and critical industrial operations.",
    description:
      "Apex Arc Engineering delivered an industrial generator solution designed to address critical industrial power requirements.",
    image: capElectricalImg,
    relatedService: "Power & Control Systems",
    overview:
      "The project demonstrates the company's engineering capability in high-performance power solutions, with emphasis on reliability, efficiency and operational continuity.",
    highlights: [
      "Generator photographs and system overview",
      "Power-system information from the profile",
      "Relevant technical visuals and performance information",
      "Related service: Power & Control Systems",
    ],
    gallery: [capElectricalImg, serviceElectricalImg, capAutomationImg],
  },
  {
    slug: "hvac-industrial-cooling",
    title: "HVAC & Industrial Cooling",
    shortDescription: "High-capacity cooling, ventilation and climate-control systems for demanding industrial facilities.",
    description:
      "Apex Arc Engineering specialises in the design, installation and maintenance of high-capacity climate-control systems, chilling units and ventilation networks for industrial facilities.",
    image: capEnergyImg,
    relatedService: "Heating, Boiler & Combustion Solutions / Maintenance & Recovery",
    overview:
      "The profile describes these systems as providing precise thermal management and energy efficiency while supporting appropriate operating environments for heavy machinery and large-scale industrial facilities.",
    highlights: [
      "HVAC and cooling-system photographs",
      "Ventilation visuals and installation information",
      "Project details and maintenance support context",
      "Related service: Heating, Boiler & Combustion Solutions / Maintenance & Recovery",
    ],
    gallery: [capEnergyImg, heroIndustrialImg, serviceElectricalImg],
  },
  {
    slug: "maintenance-of-autoclave-shredding",
    title: "Maintenance of Autoclave Shredding",
    shortDescription: "Precision maintenance work focused on uptime, reliability and robust industrial equipment performance.",
    description:
      "Apex Arc Engineering carried out precision maintenance for critical industrial autoclave shredding systems, applying advanced diagnostics and robust engineering methodologies.",
    image: serviceWeldingImg,
    relatedService: "Maintenance & Recovery",
    overview:
      "The work focused on maintaining equipment reliability, operational integrity and uptime, with quality compliance forming an important part of the documented project approach.",
    highlights: [
      "Before/after or maintenance photographs",
      "Equipment and maintenance-scope details",
      "Technical information and reliability improvement focus",
      "Related service: Maintenance & Recovery",
    ],
    gallery: [serviceWeldingImg, capAutomationImg, capEnergyImg],
  },
];

export const projectLookup = Object.fromEntries(
  featuredProjects.map((project) => [project.slug, project]),
) as Record<string, Project>;
