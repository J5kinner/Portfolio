import {
  initGA,
  trackPageView,
  trackSectionView,
  trackProjectClick,
  trackSocialClick,
  trackContactInteraction,
  trackSkillInteraction,
  trackNavigation,
  GA_MEASUREMENT_ID
} from '../analytics';

// Mock gtag function
const mockGtag = jest.fn();
const mockDataLayer: any[] = [];

// Mock environment variable before any tests
const originalEnv = process.env;
beforeAll(() => {
  process.env = {
    ...originalEnv,
    REACT_APP_GA_MEASUREMENT_ID: 'G-TEST123'
  };
});

afterAll(() => {
  process.env = originalEnv;
});

// Setup global mocks
beforeEach(() => {
  // Reset mocks
  mockGtag.mockClear();
  mockDataLayer.length = 0;
  
  // Mock window.gtag and dataLayer
  Object.defineProperty(window, 'gtag', {
    value: mockGtag,
    writable: true
  });
  
  Object.defineProperty(window, 'dataLayer', {
    value: mockDataLayer,
    writable: true
  });

  // Mock document.head.appendChild
  jest.spyOn(document.head, 'appendChild').mockImplementation(() => ({} as any));
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Analytics Utilities', () => {

  describe('trackPageView', () => {
    it('should track page view with correct parameters', () => {
      trackPageView('Test Page');
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'page_view', {
        page_title: 'Test Page',
        page_location: window.location.href,
      });
    });

    it('should not call gtag when gtag is not available', () => {
      // Remove gtag function
      Object.defineProperty(window, 'gtag', {
        value: undefined,
        writable: true
      });
      
      trackPageView('Test Page');
      
      expect(mockGtag).not.toHaveBeenCalled();
    });
  });

  describe('trackSectionView', () => {
    it('should track section view with correct parameters', () => {
      trackSectionView('skills');
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'section_view', {
        event_category: 'Navigation',
        event_label: 'skills',
        custom_parameter: 'skills',
      });
    });
  });

  describe('trackProjectClick', () => {
    it('should track project click with correct parameters', () => {
      trackProjectClick('Wanderer App', 'featured');
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'project_click', {
        event_category: 'Projects',
        event_label: 'Wanderer App',
        project_type: 'featured',
      });
    });

    it('should handle different project types', () => {
      trackProjectClick('Test Project', 'github');
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'project_click', {
        event_category: 'Projects',
        event_label: 'Test Project',
        project_type: 'github',
      });
    });
  });

  describe('trackSocialClick', () => {
    it('should track social media click with correct parameters', () => {
      trackSocialClick('github');
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'social_click', {
        event_category: 'Social Media',
        event_label: 'github',
        outbound: true,
      });
    });
  });

  describe('trackContactInteraction', () => {
    it('should track contact interaction with correct parameters', () => {
      trackContactInteraction('email_click');
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'contact_interaction', {
        event_category: 'Contact',
        event_label: 'email_click',
      });
    });

    it('should handle different contact actions', () => {
      const actions: Array<'view' | 'click' | 'email_click'> = ['view', 'click', 'email_click'];
      
      actions.forEach(action => {
        trackContactInteraction(action);
        
        expect(mockGtag).toHaveBeenCalledWith('event', 'contact_interaction', {
          event_category: 'Contact',
          event_label: action,
        });
      });
    });
  });

  describe('trackSkillInteraction', () => {
    it('should track skill interaction with correct parameters', () => {
      trackSkillInteraction('React');
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'skill_interaction', {
        event_category: 'Skills',
        event_label: 'React',
      });
    });
  });

  describe('trackNavigation', () => {
    it('should track navigation with correct parameters', () => {
      trackNavigation('skills', 'desktop');
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'navigation_click', {
        event_category: 'Navigation',
        event_label: 'skills',
        navigation_source: 'desktop',
      });
    });

    it('should handle different navigation sources', () => {
      const sources: Array<'desktop' | 'mobile' | 'logo'> = ['desktop', 'mobile', 'logo'];
      
      sources.forEach(source => {
        trackNavigation('hero', source);
        
        expect(mockGtag).toHaveBeenCalledWith('event', 'navigation_click', {
          event_category: 'Navigation',
          event_label: 'hero',
          navigation_source: source,
        });
      });
    });
  });
}); 