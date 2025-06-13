// Google Tag Manager configuration and tracking utilities
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Environment variables with fallbacks
const getEnvVar = (key: string, fallback: string = ''): string => {
  const value = process.env[key];
  if (process.env.NODE_ENV === 'development') {
    console.log(`Environment variable ${key}:`, value || 'not found');
  }
  return value || fallback;
};

// Your GTM Container ID
export const GTM_ID = getEnvVar('REACT_APP_GTM_ID');
// Your GA4 Measurement ID
export const GA4_ID = getEnvVar('REACT_APP_GA_MEASUREMENT_ID');

// Debug logging for environment variables
if (process.env.NODE_ENV === 'development') {
  console.log('Environment Variables:', {
    GTM_ID,
    GA4_ID,
    NODE_ENV: process.env.NODE_ENV,
    REACT_APP_GTM_ID: process.env.REACT_APP_GTM_ID,
    REACT_APP_GA_MEASUREMENT_ID: process.env.REACT_APP_GA_MEASUREMENT_ID
  });
}

// Validate GTM ID format
const isValidGTMId = (id: string): boolean => {
  return /^GTM-[A-Z0-9]+$/.test(id);
};

// Validate GA4 ID format
const isValidGA4Id = (id: string): boolean => {
  return /^G-[A-Z0-9]+$/.test(id);
};

// Initialize Google Tag Manager
export const initGTM = () => {
  if (!GTM_ID) {
    console.warn('Google Tag Manager ID not found');
    return;
  }

  if (!isValidGTMId(GTM_ID)) {
    console.error('Invalid Google Tag Manager ID format. ID should start with "GTM-" followed by alphanumeric characters.');
    return;
  }

  if (!GA4_ID) {
    console.warn('Google Analytics 4 Measurement ID not found');
  } else if (!isValidGA4Id(GA4_ID)) {
    console.error('Invalid Google Analytics 4 Measurement ID format. ID should start with "G-" followed by alphanumeric characters.');
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];

  // Add GTM script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);

  // Add GTM noscript iframe
  const noscript = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  noscript.appendChild(iframe);
  document.body.insertBefore(noscript, document.body.firstChild);

  // Push initial dataLayer event with GA4 configuration
  window.dataLayer.push({
    'event': 'gtm.js',
    'gtm.start': new Date().getTime(),
    'ga4_id': GA4_ID // This will be used by GTM to configure GA4
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('GTM Initialized with:', {
      GTM_ID,
      GA4_ID,
      dataLayer: window.dataLayer
    });
  }
};

// Debug mode for development
const DEBUG = process.env.NODE_ENV === 'development';

// Push events to dataLayer
export const pushToDataLayer = (data: any) => {
  if (window.dataLayer) {
    window.dataLayer.push(data);
    if (DEBUG) {
      console.log('GTM Event:', data);
    }
  } else if (DEBUG) {
    console.warn('dataLayer not initialized');
  }
};

// Track page views
export const trackPageView = (pageName: string) => {
  pushToDataLayer({
    event: 'page_view',
    page_title: pageName,
    page_location: window.location.href,
  });
};

// Track section visits
export const trackSectionView = (sectionName: string) => {
  pushToDataLayer({
    event: 'section_view',
    event_category: 'Navigation',
    event_label: sectionName,
    custom_parameter: sectionName,
  });
};

// Track project interactions
export const trackProjectClick = (projectName: string, projectType: 'github' | 'demo' | 'featured') => {
  pushToDataLayer({
    event: 'project_click',
    event_category: 'Projects',
    event_label: projectName,
    project_type: projectType,
  });
};

// Track social media clicks
export const trackSocialClick = (platform: string) => {
  pushToDataLayer({
    event: 'social_click',
    event_category: 'Social Media',
    event_label: platform,
    outbound: true,
  });
};

// Track contact form interactions
export const trackContactInteraction = (action: 'view' | 'click' | 'email_click') => {
  pushToDataLayer({
    event: 'contact_interaction',
    event_category: 'Contact',
    event_label: action,
  });
};

// Track skill card interactions
export const trackSkillInteraction = (skillName: string) => {
  pushToDataLayer({
    event: 'skill_interaction',
    event_category: 'Skills',
    event_label: skillName,
  });
};

// Track navigation interactions
export const trackNavigation = (section: string, source: 'desktop' | 'mobile' | 'logo') => {
  pushToDataLayer({
    event: 'navigation_click',
    event_category: 'Navigation',
    event_label: section,
    navigation_source: source,
  });
}; 