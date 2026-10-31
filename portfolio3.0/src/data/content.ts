// Content types
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string; // poster/still image
  video?: string; // short muted looping clip (mp4)
  link?: string;
  // Optional case-study fields: rendered only when filled in.
  problem?: string;
  role?: string;
  outcome?: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'fullstack' | 'other';
  featured?: boolean;
  order?: number;
}

export interface Experience {
  id: string;
  company: string;
  technology: string;
  description: string; // placeholder: to be provided
  role?: string; // job title, shown when filled in
  startDate?: string; // e.g. 'Jan 2024'
  endDate?: string; // e.g. 'Present'
  bullets?: string[]; // achievements, shown when non-empty
  image?: string; // placeholder: image/gif to be provided
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'frontend' | 'backend' | 'mobile' | 'tools' | 'other';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  order?: number;
}

export interface ContactMethod {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  target?: '_blank' | '_self';
  primary?: boolean;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  codeLines: string[];
  description?: string;
}

// Content data
export const heroContent: HeroContent = {
  title: "Building Digital\nExperiences",
  subtitle: "Web and Mobile Developer",
  codeLines: [
    'class SoftwareEngineer {',
    ' private val skills = listOf(',
    '   "Android", "Kotlin",',
    '   "Jetpack Compose", "MVI",',
    '   "& much more..."',
    ' )',
    '}'
  ]
};

// Listed newest first; render order follows array order.
export const experiences: Experience[] = [
  { id: 'racing-com', company: 'Racing.com', technology: 'React Native', description: '' },
  { id: 'protecht', company: 'Protecht', technology: 'React Native', description: '' },
  { id: 'tyro-payments', company: 'Tyro Payments', technology: 'Kotlin Multiplatform', description: '' }
];

export const projects: Project[] = [
  {
    id: 'wanderer',
    title: 'Wanderer Travel App',
    subtitle: 'Mobile Application',
    description: 'Created a mobile application using expo/react-native in android studio. Using the app, the viewer is able to browse through categories such as restaurants, places to visit, places to stay, things to do for a particular city.',
    image: '/images/WandererNoBackground.webp',
    link: 'https://github.com/J5kinner/Mobile-Application-Development',
    technologies: ['React Native', 'Expo', 'Android Studio', 'JavaScript'],
    category: 'mobile',
    featured: true,
    order: 1
  },
  {
    id: 'paijolizmal',
    title: 'Paijolizmal',
    subtitle: 'MERN Stack Web App',
    description: 'A collaborative team project where the main idea is a web application for students who can write their own rants as "notes" after completing pomodoros, they receive coins which can be used to buy more notes.',
    image: '/images/paijolizmalMVP-poster.jpg',
    video: '/images/paijolizmalMVP.mp4',
    link: 'https://github.com/J5kinner/PaiJoLizMal',
    technologies: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    category: 'fullstack',
    order: 2
  },
  {
    id: 'elevator',
    title: 'Elevator Project',
    subtitle: 'Engineering Project',
    description: 'Working with the motor controls team of a elevator project, our arduino software needed to interface with 2 other software engineering teams code. We also got to experience what it was like working with all other different types of engineers including, civil, mechanical and electrical engineers.',
    image: '/images/liftWorking-poster.jpg',
    video: '/images/liftWorking.mp4',
    technologies: ['Arduino', 'C++', 'Hardware Integration'],
    category: 'other',
    order: 3
  },
  {
    id: 'swapstreet',
    title: 'Swap Street',
    subtitle: 'MERN Stack Web App',
    description: 'A collaborative project where the main idea is to give the community an application which allows trading of favours in exchange for more favours, these favours are tracked by using a coin system.',
    image: '/images/swapstreet-poster.jpg',
    video: '/images/swapstreet.mp4',
    link: 'https://infinite-refuge-32502.herokuapp.com/',
    technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Heroku'],
    category: 'fullstack',
    order: 4
  }
];

export const skills: Skill[] = [
  {
    id: 'software-engineering',
    title: 'Software Engineering',
    description: 'Studying software engineering at Macquarie University specialising in Java and JavaScript libraries',
    icon: 'Tools',
    category: 'other',
    level: 'advanced',
    order: 1
  },
  {
    id: 'frontend-development',
    title: 'Frontend Developer',
    description: 'Practicing HTML, CSS, SASS and JS fundamentals before moving onto frameworks like REACT and Express.js',
    icon: 'Code',
    category: 'frontend',
    level: 'intermediate',
    order: 2
  },
  {
    id: 'mobile-development',
    title: 'Web and Mobile Developer',
    description: 'Developing mobile applications using React Native, Kotlin, and Android development tools',
    icon: 'Mobile',
    category: 'mobile',
    level: 'intermediate',
    order: 3
  }
];

export const contactMethods: ContactMethod[] = [
  {
    id: 'email',
    title: 'Email',
    description: 'Drop me a line',
    href: 'mailto:jonahskinner03@gmail.com',
    icon: 'email',
    primary: true
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    description: 'Connect professionally',
    href: 'https://www.linkedin.com/in/jonah-skinner/',
    icon: 'linkedin',
    target: '_blank'
  },
  {
    id: 'github',
    title: 'GitHub',
    description: 'View my code',
    href: 'https://github.com/J5kinner',
    icon: 'github',
    target: '_blank'
  }
];

// Helper functions
export const getFeaturedProjects = (): Project[] => 
  projects.filter(project => project.featured).sort((a, b) => (a.order || 0) - (b.order || 0));

export const getProjectsByCategory = (category: Project['category']): Project[] =>
  projects.filter(project => project.category === category).sort((a, b) => (a.order || 0) - (b.order || 0));

export const getSkillsByCategory = (category: Skill['category']): Skill[] =>
  skills.filter(skill => skill.category === category).sort((a, b) => (a.order || 0) - (b.order || 0));

export const getPrimaryContactMethods = (): ContactMethod[] =>
  contactMethods.filter(method => method.primary); 