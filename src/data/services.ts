import type { LucideIcon } from "lucide-react";
import {
  Bolt,
  Activity,
  CircuitBoard,
  Cog,
  Database,
  Flame,
  Gauge,
  Layers,
  LifeBuoy,
  PanelsTopLeft,
  PencilRuler,
  Sun,
  Wrench,
} from "lucide-react";
import capCivilImg from "@/assets/design_engineering_consultancy(1).png";
import capAutomationImg from "@/assets/panel_building_cabling.png";
import capElectricalImg from "@/assets/instrumentation_equipment.png";
import capEnergyImg from "@/assets/project_installation_erection(1).png";
import heatingBoilerImg from "@/assets/heating_boiler_combustion.png";
import heroSlideSolar from "@/assets/hero-slide-solar.jpg";
import serviceAutomationImg from "@/assets/plc_hmi_automation(1).png";
import serviceElectricalImg from "@/assets/service-electrical.jpg";
import serviceWeldingImg from "@/assets/maintenance_recovery.png";

export interface Service {
  title: string;
  desc: string;
  image: string;
  icon: LucideIcon;
}

export interface ServiceCategory {
  slug: string;
  title: string;
  desc: string;
  image: string;
  icon: LucideIcon;
  services: Service[];
  coreServices: Service[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "engineering-consultancy",
    title: "Engineering & Consultancy",
    desc: "Engineering design, drafting, technical consultancy and practical engineering solutions for industrial requirements.",
    image: capCivilImg,
    icon: PencilRuler,
    services: [
      {
        title: "Design & Engineering Consultancy",
        desc: "Engineering design, drafting, technical consultancy and practical engineering solutions for industrial requirements.",
        image: capCivilImg,
        icon: PencilRuler,
      },
    ],
    coreServices: [
      { title: "Feasibility Studies & Site Audits", desc: "Practical review of project requirements and site conditions.", image: capCivilImg, icon: Layers },
      { title: "System Design & Engineering Blueprints", desc: "Engineering design and drafting for industrial requirements.", image: capCivilImg, icon: PencilRuler },
      { title: "Energy Audits & Efficiency Management", desc: "Energy review and efficiency-focused engineering support.", image: capCivilImg, icon: Gauge },
      { title: "Value Engineering & Cost Optimization", desc: "Practical engineering decisions shaped around project value.", image: capCivilImg, icon: Wrench },
    ],
  },
  {
    slug: "solar-energy-solutions",
    title: "Solar & Energy Solutions",
    desc: "Practical solar implementation solutions for residential and industrial requirements.",
    image: heroSlideSolar,
    icon: Sun,
    services: [
      {
        title: "Solar Installation",
        desc: "Practical solar installation services for residential and industrial requirements.",
        image: heroSlideSolar,
        icon: Sun,
      },
      {
        title: "Solar System Design & Installation",
        desc: "Solar system design and installation support shaped around practical project requirements.",
        image: heroSlideSolar,
        icon: Sun,
      },
      {
        title: "Residential Solar Solutions",
        desc: "Practical solar solutions for residential requirements.",
        image: heroSlideSolar,
        icon: Sun,
      },
      {
        title: "Industrial Solar Solutions",
        desc: "Practical solar solutions for industrial requirements.",
        image: heroSlideSolar,
        icon: Sun,
      },
    ],
    coreServices: [
      { title: "Industrial Solar Solutions", desc: "Practical solar implementation support for industrial requirements.", image: heroSlideSolar, icon: Sun },
      { title: "Commercial & Office Solar Systems", desc: "Solar implementation support for commercial and office requirements.", image: heroSlideSolar, icon: Sun },
      { title: "Residential Solar Solutions", desc: "Practical solar solutions for residential requirements.", image: heroSlideSolar, icon: Sun },
      { title: "Hybrid & Off-Grid Infrastructure", desc: "Solar and energy solution support shaped around project requirements.", image: heroSlideSolar, icon: Sun },
    ],
  },
  {
    slug: "electrical-power-systems",
    title: "Electrical & Power Systems",
    desc: "Practical electrical, wiring, installation, power and control solutions.",
    image: serviceElectricalImg,
    icon: Bolt,
    services: [
      {
        title: "Electrical Wiring",
        desc: "Professional electrical wiring solutions for project and industrial requirements.",
        image: serviceElectricalImg,
        icon: Bolt,
      },
      {
        title: "Electrical Installation",
        desc: "Practical electrical installation services for industrial requirements.",
        image: serviceElectricalImg,
        icon: Bolt,
      },
      {
        title: "Power & Control Systems",
        desc: "Design, fabrication and installation of electrical power and industrial control systems.",
        image: serviceElectricalImg,
        icon: Bolt,
      },
      {
        title: "Panel Building & Cabling",
        desc: "Custom electrical and control-panel fabrication with professional cabling and site installation.",
        image: capAutomationImg,
        icon: CircuitBoard,
      },
    ],
    coreServices: [
      { title: "Power & Control Systems", desc: "Design, fabrication and installation of electrical power and industrial control systems.", image: serviceElectricalImg, icon: Bolt },
      { title: "Panel Building & Cabling", desc: "Custom electrical and control-panel fabrication with professional cabling and site installation.", image: capAutomationImg, icon: CircuitBoard },
      { title: "Medium & Low Voltage (MV/LV) Substations", desc: "Electrical power system support for project requirements.", image: serviceElectricalImg, icon: Bolt },
      { title: "Earthing & Lightning Protection Networks", desc: "Electrical protection and installation support for industrial requirements.", image: serviceElectricalImg, icon: Bolt },
    ],
  },
  {
    slug: "automation-instrumentation",
    title: "Automation & Instrumentation",
    desc: "Automation control, instrumentation and equipment solutions for industrial processes.",
    image: serviceAutomationImg,
    icon: Cog,
    services: [
      {
        title: "PLC & HMI Automation",
        desc: "PLC programming, HMI development and automation control solutions for industrial processes.",
        image: serviceAutomationImg,
        icon: PanelsTopLeft,
      },
      {
        title: "Instrumentation & Equipment",
        desc: "Integration and installation of industrial instrumentation, equipment and control components.",
        image: capElectricalImg,
        icon: Database,
      },
    ],
    coreServices: [
      { title: "PLC & HMI Automation", desc: "PLC programming, HMI development and automation control solutions for industrial processes.", image: serviceAutomationImg, icon: PanelsTopLeft },
      { title: "Instrumentation & Equipment", desc: "Integration and installation of industrial instrumentation, equipment and control components.", image: capElectricalImg, icon: Database },
      { title: "Industrial Automation & SCADA", desc: "Industrial automation control and monitoring solutions.", image: serviceAutomationImg, icon: Cog },
      { title: "Power & Control Systems", desc: "Electrical power and industrial control systems for project requirements.", image: serviceElectricalImg, icon: Bolt },
    ],
  },
  {
    slug: "industrial-installation-ducting",
    title: "Industrial Installation & Ducting",
    desc: "Professional installation, erection and related site execution for industrial requirements.",
    image: capEnergyImg,
    icon: Wrench,
    services: [
      {
        title: "Project Installation & Erection",
        desc: "Professional installation, erection and site execution of industrial engineering systems and equipment.",
        image: capEnergyImg,
        icon: Wrench,
      },
      {
        title: "Ducting & Related Installation Work",
        desc: "Ducting and related installation work for industrial project requirements.",
        image: capEnergyImg,
        icon: Layers,
      },
    ],
    coreServices: [
      { title: "Ducting & Related Installation Work", desc: "Ducting and related installation work for industrial project requirements.", image: capEnergyImg, icon: Layers },
      { title: "Spiral & Round Duct Configurations", desc: "Ducting configuration and related installation work.", image: capEnergyImg, icon: Layers },
      { title: "Rectangular Distribution Frameworks", desc: "Distribution framework installation for project requirements.", image: capEnergyImg, icon: Layers },
      { title: "Stainless Steel & Grease Exhaust Ducts", desc: "Ducting and related installation work for industrial requirements.", image: capEnergyImg, icon: Layers },
    ],
  },
  {
    slug: "maintenance-industrial-solutions",
    title: "Maintenance & Industrial Solutions",
    desc: "Maintenance, recovery, heating, boiler and combustion solutions based on industrial requirements.",
    image: serviceWeldingImg,
    icon: LifeBuoy,
    services: [
      {
        title: "Maintenance & Recovery",
        desc: "Preventive maintenance, breakdown response and recovery services focused on equipment reliability and uptime.",
        image: serviceWeldingImg,
        icon: LifeBuoy,
      },
      {
        title: "Heating, Boiler & Combustion Solutions",
        desc: "Engineering solutions for boilers, heating, combustion and related industrial thermal systems.",
        image: heatingBoilerImg,
        icon: Flame,
      },
    ],
    coreServices: [
      { title: "Heating, Boiler & Combustion Solutions", desc: "Engineering solutions for boilers, heating, combustion and related industrial thermal systems.", image: heatingBoilerImg, icon: Flame },
      { title: "Preventative Maintenance Contracts", desc: "Maintenance support focused on equipment reliability and uptime.", image: serviceWeldingImg, icon: LifeBuoy },
      { title: "Predictive Maintenance Monitoring", desc: "Maintenance monitoring support for industrial equipment and operations.", image: serviceWeldingImg, icon: Activity },
      { title: "Plant Turnaround & Shutdown Management", desc: "Practical maintenance and recovery support for industrial requirements.", image: serviceWeldingImg, icon: Wrench },
    ],
  },
];

export const getServiceCategory = (slug: string) =>
  serviceCategories.find((category) => category.slug === slug);
