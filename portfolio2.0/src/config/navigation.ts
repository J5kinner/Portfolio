export interface NavItem {
  id: string;
  label: string;
  path?: string;
  isExternal?: boolean; 
}

export const mainNavItems: NavItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'featured', label: 'Featured' },
  { id: 'skills', label: 'Skills' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'hire', label: 'Hire Me' }
];

export const socialNavItems: NavItem[] = [
  { 
    id: 'github',
    label: 'GitHub',
    path: 'https://github.com/J5kinner',
    isExternal: true
  },
  { 
    id: 'linkedin',
    label: 'LinkedIn',
    path: 'https://www.linkedin.com/in/jonah-skinner/',
    isExternal: true
  },
  { 
    id: 'codepen',
    label: 'CodePen',
    path: 'https://codepen.io/your-work/',
    isExternal: true
  }
]; 