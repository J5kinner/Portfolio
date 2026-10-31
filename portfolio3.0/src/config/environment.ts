export interface EnvironmentConfig {
  isDevelopment: boolean;
  isProduction: boolean;
  enableAnalytics: boolean;
  enableAnimations: boolean;
  enablePerformanceOptimizations: boolean;
  apiBaseUrl?: string;
  gaTrackingId?: string;
  features: {
    darkMode: boolean;
    contactForm: boolean;
    blog: boolean;
    testimonials: boolean;
    certifications: boolean;
    downloadResume: boolean;
  };
}

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

export const environment: EnvironmentConfig = {
  isDevelopment,
  isProduction,
  enableAnalytics: isProduction && !!process.env.REACT_APP_GA_MEASUREMENT_ID,
  enableAnimations: true,
  enablePerformanceOptimizations: isProduction,
  gaTrackingId: process.env.REACT_APP_GA_MEASUREMENT_ID,
  
  features: {
    darkMode: false, // Future feature
    contactForm: false, // Future feature
    blog: false, // Future feature
    testimonials: false, // Future feature
    certifications: false, // Future feature
    downloadResume: true,
  }
};

// Helper functions
export const isFeatureEnabled = (feature: keyof EnvironmentConfig['features']): boolean =>
  environment.features[feature];

export const shouldEnableAnalytics = (): boolean =>
  environment.enableAnalytics;

export const shouldOptimizePerformance = (): boolean =>
  environment.enablePerformanceOptimizations; 