import Hero from '../components/sections/Hero';
import Featured from '../components/sections/Featured';
import Skills from '../components/sections/Skills';
import Portfolio from '../components/sections/Portfolio';
import HireMe from '../components/sections/HireMe';

export interface SectionConfig {
  id: string;
  label: string;
  component: React.ComponentType;
  enabled: boolean;
  order: number;
  showInNavigation?: boolean;
  analyticsName?: string;
}

export const sectionConfigs: SectionConfig[] = [
  {
    id: 'hero',
    label: 'Home',
    component: Hero,
    enabled: true,
    order: 1,
    showInNavigation: true,
    analyticsName: 'Hero Section'
  },
  {
    id: 'featured',
    label: 'Featured',
    component: Featured,
    enabled: true,
    order: 2,
    showInNavigation: true,
    analyticsName: 'Featured Project'
  },
  {
    id: 'skills',
    label: 'Skills',
    component: Skills,
    enabled: true,
    order: 3,
    showInNavigation: true,
    analyticsName: 'Skills Section'
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    component: Portfolio,
    enabled: true,
    order: 4,
    showInNavigation: true,
    analyticsName: 'Portfolio Section'
  },
  {
    id: 'hire',
    label: 'Hire Me',
    component: HireMe,
    enabled: true,
    order: 5,
    showInNavigation: true,
    analyticsName: 'Contact Section'
  }
];

// Helper functions
export const getEnabledSections = (): SectionConfig[] =>
  sectionConfigs
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order);

export const getNavigationSections = (): SectionConfig[] =>
  getEnabledSections().filter(section => section.showInNavigation);

export const getSectionById = (id: string): SectionConfig | undefined =>
  sectionConfigs.find(section => section.id === id);

export const getSectionIds = (): string[] =>
  getEnabledSections().map(section => section.id); 