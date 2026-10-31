// Google Analytics 4 configuration and tracking utilities
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Your Google Analytics Measurement ID (replace with your actual ID)
export const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || '';

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics Measurement ID not found');
    return;
  }

  // Create gtag script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: 'Jonah Skinner Portfolio',
    page_location: window.location.href,
  });
};

// Track page views
export const trackPageView = (pageName: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
    });
  }
};

// Track section visits
export const trackSectionView = (sectionName: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'section_view', {
      event_category: 'Navigation',
      event_label: sectionName,
      custom_parameter: sectionName,
    });
  }
};

// Track project interactions
export const trackProjectClick = (projectName: string, projectType: 'github' | 'demo' | 'featured') => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'project_click', {
      event_category: 'Projects',
      event_label: projectName,
      project_type: projectType,
    });
  }
};

// Track social media clicks
export const trackSocialClick = (platform: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'social_click', {
      event_category: 'Social Media',
      event_label: platform,
      outbound: true,
    });
  }
};

// Track contact form interactions
export const trackContactInteraction = (action: 'view' | 'click' | 'email_click') => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'contact_interaction', {
      event_category: 'Contact',
      event_label: action,
    });
  }
};

// Track skill card interactions
export const trackSkillInteraction = (skillName: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'skill_interaction', {
      event_category: 'Skills',
      event_label: skillName,
    });
  }
};

// Track navigation interactions
export const trackNavigation = (section: string, source: 'desktop' | 'mobile' | 'logo') => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'navigation_click', {
      event_category: 'Navigation',
      event_label: section,
      navigation_source: source,
    });
  }
}; 