# Portfolio 2.0

![CI Status](https://github.com/J5kinner/Portfolio/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/J5kinner/Portfolio/branch/main/graph/badge.svg)](https://codecov.io/gh/J5kinner/Portfolio)

Portfolio/
├── .github/workflows/
│   ├── ci.yml
│   └── ci-basic.yml
├── index.html                       (Old HTML portfolio)
├── css/, IMAGES/, etc.              (Old portfolio assets)
└── portfolio2.0/
    ├── src/
    ├── public/
    ├── package.json
    ├── .lighthouserc.json
    └── build/
        ├── index.html
        ├── static/
        └── ...other built files

## 🚀 Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Smooth Navigation** - Intelligent scroll-based section highlighting
- **Modern Animations** - Built with Framer Motion for fluid interactions
- **TypeScript** - Full type safety and excellent developer experience
- **Comprehensive Testing** - Well-tested components with high coverage
- **Performance Optimized** - Lighthouse audited for optimal performance

## 🛠️ Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Animation library
- **React Testing Library** - Component testing
- **Jest** - Test runner with coverage
- **GitHub Actions** - CI/CD pipeline

## 📋 Available Scripts

### Development

```bash
npm start
```
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### Testing

```bash
npm test
```
Launches the test runner in interactive watch mode

```bash
npm test -- --coverage
```
Runs tests with coverage report

```bash
npm test -- --watchAll=false
```
Runs all tests once (useful for CI)

### Building

```bash
npm run build
```
Builds the app for production to the `build` folder with optimized bundles

## 🧪 Testing Strategy

This project maintains high test coverage with comprehensive testing of:

- **Component Rendering** - All components render correctly
- **User Interactions** - Click, scroll, and navigation behaviors
- **Scroll Highlighting Logic** - Critical navbar section detection
- **Edge Cases** - Viewport boundaries and mobile responsiveness

### Key Test Files
- `src/components/layout/__tests__/Navbar.test.tsx` - Comprehensive navbar testing including scroll highlighting

## 🔄 CI/CD Pipeline

Our GitHub Actions workflow automatically:

- ✅ **Type Checks** - Validates TypeScript types
- ✅ **Runs Tests** - Executes full test suite with coverage
- ✅ **Builds Project** - Ensures production build succeeds
- ✅ **Tests Build** - Verifies built app serves correctly
- ✅ **Lighthouse Audit** - Performance and accessibility checks (on PRs)

### Quality Gates
- **Test Coverage** - Maintains high coverage with detailed reports
- **Type Safety** - All TypeScript must compile without errors
- **Build Success** - Production builds must complete successfully
- **Performance** - Lighthouse scores monitored for regressions

## 🎯 Key Components

### Navbar
The navigation component features intelligent scroll-based highlighting:
- Detects which section is most visible in viewport
- Highlights corresponding navigation item
- Handles edge cases for last section (Hire Me)
- Smooth scroll navigation between sections

### Sections
- **Hero** - Landing section with animated introduction
- **Featured** - Highlighted projects and achievements
- **Skills** - Technical expertise and capabilities
- **Portfolio** - Complete project showcase
- **Hire Me** - Contact information and availability

## 📱 Responsive Design

- **Mobile First** - Designed for mobile, enhanced for desktop
- **Breakpoints** - Tablet (768px) and Desktop (1050px)
- **Touch Friendly** - Optimized touch targets and interactions
- **Performance** - Optimized images and lazy loading

## 🚀 Deployment

The project is configured for easy deployment to various platforms:

- **Static Hosting** - Vercel, GitHub Pages
- **CDN Distribution** - Optimized for global content delivery
- **Performance** - Built with modern bundling and optimization

## 🔧 Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/J5kinner/Portfolio.git
   cd Portfolio/portfolio2.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Run tests**
   ```bash
   npm test
   ```

## 📊 Performance

- **Lighthouse Score** - Audited for performance, accessibility, and SEO
- **Bundle Size** - Optimized for fast loading
- **Core Web Vitals** - Meets Google's performance standards


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
