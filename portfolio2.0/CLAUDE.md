# Portfolio 2.0 - Project Context for Claude

## Project Overview
This is a personal portfolio website for Jonah Skinner, built with TypeScript React using Create React App. It's a modern, performant single-page application showcasing software engineering work with a focus on mobile development.

## Tech Stack & Architecture
- **React 19.1.0** with **TypeScript** (strict mode)
- **Styled Components** for CSS-in-JS styling
- **Framer Motion** for animations
- **React Scroll** for smooth navigation
- **Google Analytics 4** for tracking
- **Create React App** for build tooling

## Project Structure
```
src/
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── sections/        # Hero, Portfolio, Skills, etc.
│   └── ui/             # Reusable components (Card, etc.)
├── config/
│   ├── sections.ts      # Section configuration & feature flags
│   ├── environment.ts   # Environment settings
│   └── navigation.ts    # Navigation structure
├── data/
│   └── content.ts       # Centralized content management
├── hooks/               # Custom React hooks
└── types/              # TypeScript type definitions
```

## Key Patterns & Conventions

### Configuration-Driven Architecture
- Sections are controlled via `SectionConfig` objects in `/src/config/sections.ts`
- Each section can be enabled/disabled and has configurable properties
- Feature flags control analytics, navigation visibility, etc.

### Component Organization
- **Layout components**: Fixed UI elements (Navbar, Footer)
- **Section components**: Main content areas with consistent interfaces
- **UI components**: Reusable styled components with TypeScript props

### Styling Approach
- **Styled Components** with TypeScript integration
- **Theme system** with consistent design tokens:
  - Primary: `#0c1833` (deep blue)
  - Accent: `#27cc91` (teal)
  - Font: Poppins family
- **Responsive breakpoints**: 768px (tablet), 1050px (desktop)
- **Animation variants** using Framer Motion

### Data Management
- All content centralized in `/src/data/content.ts`
- TypeScript interfaces for all data structures
- Helper functions for filtering and sorting

## Development Scripts
- `npm start` - Development server
- `npm build` - Production build  
- `npm test` - Run tests with coverage
- `npm run lint` - ESLint checks
- `npm run type-check` - TypeScript validation

## Testing Strategy
- **Jest** with **React Testing Library**
- Component testing with realistic mocking
- Analytics tracking verification
- Utility function unit tests
- Target: 95%+ test coverage

## Code Quality Standards
- **ESLint** with React-specific rules
- **TypeScript strict mode** enabled
- Consistent naming conventions (camelCase, PascalCase)
- Comprehensive error handling
- No unused imports/variables

## Analytics & Tracking
- Google Analytics 4 integration
- Custom event tracking for:
  - Section interactions
  - Social media clicks
  - Navigation behavior
- Environment-based analytics toggling

## Performance Considerations
- Environment-based feature flags
- Image optimization (WebP format)
- Bundle size monitoring
- Intersection Observer for animations
- Smooth scrolling implementation

## When Working on This Project

### Adding New Sections
1. Create component in `/src/components/sections/`
2. Add to section configuration in `/src/config/sections.ts`
3. Update navigation if needed
4. Add analytics tracking
5. Write comprehensive tests

### Modifying Styling
- Use existing theme tokens from styled components
- Maintain responsive design patterns
- Test across all breakpoints (mobile, tablet, desktop)
- Follow animation patterns using Framer Motion variants

### Adding Dependencies
- Check if similar functionality exists
- Consider bundle size impact
- Update TypeScript types if needed
- Add appropriate testing

### Best Practices
- Always use TypeScript interfaces for props
- Follow existing component patterns
- Test new functionality thoroughly
- Maintain accessibility standards
- Keep animations subtle and purposeful

## Common Commands
```bash
# Start development
npm start

# Build for production
npm run build

# Run tests
npm test

# Check code quality
npm run lint && npm run type-check

# Run tests with coverage
npm test -- --coverage --watchAll=false
```

## Environment Variables
Create `.env.local` for local development:
```
REACT_APP_GA_MEASUREMENT_ID=your-ga-id
REACT_APP_ENVIRONMENT=development
```