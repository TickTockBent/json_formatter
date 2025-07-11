# Clocktower Developer Tools Style Guide

This style guide defines the visual design system for the Clocktower & Associates developer tools suite. Follow these guidelines to ensure consistency across all tools.

## Table of Contents
1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing System](#spacing-system)
4. [Component Library](#component-library)
5. [Layout Patterns](#layout-patterns)
6. [Interactive States](#interactive-states)
7. [Animations & Transitions](#animations--transitions)
8. [Dark Mode](#dark-mode)
9. [SEO & Meta Tags](#seo--meta-tags)
10. [File Structure](#file-structure)

## Color Palette

### Primary Colors (Orange)
```css
--primary-50: #FFF7ED;
--primary-100: #FFEDD5;
--primary-200: #FED7AA;
--primary-300: #FDBA74;
--primary-400: #FB923C;
--primary-500: #F97316;  /* Main brand color */
--primary-600: #EA580C;  /* Hover state */
--primary-700: #C2410C;
--primary-800: #9A3412;
--primary-900: #7C2D12;
```

### Secondary Colors (Purple)
```css
--secondary-50: #FAF5FF;
--secondary-100: #F3E8FF;
--secondary-200: #E9D5FF;
--secondary-300: #D8B4FE;
--secondary-400: #C084FC;
--secondary-500: #A855F7;  /* Main accent */
--secondary-600: #9333EA;  /* Hover state */
--secondary-700: #7C3AED;
--secondary-800: #6B21A8;
--secondary-900: #581C87;
```

### Neutral Colors (Gray)
```css
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;
```

### Semantic Colors
```css
/* Light Mode */
--bg-primary: #FFFFFF;
--bg-secondary: var(--gray-50);
--bg-tertiary: var(--gray-100);
--text-primary: var(--gray-900);
--text-secondary: var(--gray-600);
--text-tertiary: var(--gray-500);
--border-color: var(--gray-200);
--shadow-color: rgba(0, 0, 0, 0.1);

/* Dark Mode */
--bg-primary: var(--gray-900);
--bg-secondary: var(--gray-800);
--bg-tertiary: var(--gray-700);
--text-primary: var(--gray-50);
--text-secondary: var(--gray-300);
--text-tertiary: var(--gray-400);
--border-color: var(--gray-700);
--shadow-color: rgba(0, 0, 0, 0.3);
```

## Typography

### Font Families
```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-display: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-mono: 'Monaco', 'Consolas', 'Courier New', monospace;
```

### Font Sizes & Weights
```css
/* Hero Title */
font-size: 3.5rem;  /* Desktop */
font-size: 2.5rem;  /* Mobile */
font-weight: 700;
font-family: var(--font-display);

/* Section Title */
font-size: 2rem;
font-weight: 700;
font-family: var(--font-display);

/* Card Title */
font-size: 1.25rem;
font-weight: 600;

/* Body Text */
font-size: 1rem;
line-height: 1.5;

/* Small Text */
font-size: 0.875rem;
color: var(--text-secondary);

/* Tiny Text */
font-size: 0.75rem;
color: var(--text-tertiary);
```

### Text Treatments
```css
/* Gradient Text */
background: linear-gradient(135deg, var(--primary-600) 0%, var(--secondary-600) 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

## Spacing System

### Base Units
```css
--space-xs: 0.5rem;   /* 8px */
--space-sm: 0.75rem;  /* 12px */
--space-md: 1rem;     /* 16px */
--space-lg: 1.5rem;   /* 24px */
--space-xl: 2rem;     /* 32px */
--space-2xl: 3rem;    /* 48px */
--space-3xl: 4rem;    /* 64px */
```

### Border Radius
```css
--radius-sm: 0.375rem;  /* 6px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-full: 9999px;  /* Pill shape */
```

## Component Library

### Header with Logo, Version, and Theme Toggle
```css
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(12px);
  background-color: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  height: 4rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.logo-meta {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.logo-text {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--secondary-500) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-badge {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-tertiary);
  background-color: var(--bg-tertiary);
  padding: 0.125rem var(--space-xs);
  border-radius: var(--radius-sm);
}

.logo-badge-link {
  text-decoration: none;
  transition: all var(--transition-base);
  cursor: pointer;
}

.logo-badge-link:hover {
  color: var(--primary-500);
  background-color: var(--primary-50);
  transform: translateY(-1px);
}

html.dark-mode .logo-badge-link:hover {
  color: var(--primary-400);
  background-color: var(--primary-900);
}

.version-badge {
  font-size: 0.625rem;
  font-weight: 500;
  font-family: var(--font-mono);
  color: var(--primary-600);
  background-color: var(--primary-50);
  padding: 0.125rem 0.375rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--primary-200);
  opacity: 0.8;
  transition: opacity var(--transition-base);
  text-decoration: none;
}

.version-badge:hover {
  opacity: 1;
}

.version-badge-link {
  text-decoration: none;
  transition: all var(--transition-base);
  cursor: pointer;
}

.version-badge-link:hover {
  color: var(--primary-700);
  background-color: var(--primary-100);
  border-color: var(--primary-300);
  transform: translateY(-1px);
}

html.dark-mode .version-badge {
  color: var(--primary-400);
  background-color: var(--primary-900);
  border-color: var(--primary-800);
}

html.dark-mode .version-badge-link:hover {
  color: var(--primary-300);
  background-color: var(--primary-800);
  border-color: var(--primary-700);
}
```

#### HTML Structure:
```html
<header class="header">
  <div class="container">
    <div class="header-content">
      <div class="logo">
        <h1 class="logo-text">Tool Name</h1>
        <div class="logo-meta">
          <a href="https://www.clocktowerassoc.com" target="_blank" rel="noopener" class="logo-badge logo-badge-link">by Clocktower</a>
          <a href="#" class="version-badge version-badge-link" id="versionBadge" target="_blank" rel="noopener">v1.0.0</a>
        </div>
      </div>
      <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">
        <!-- Theme toggle icons -->
      </button>
    </div>
  </div>
</header>
```

### Container
```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-md);
}

@media (min-width: 640px) {
  .container { padding: 0 var(--space-lg); }
}

@media (min-width: 1024px) {
  .container { padding: 0 var(--space-xl); }
}
```

### Buttons
```css
/* Base Button */
.btn {
  font-family: var(--font-sans);
  font-weight: 500;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 150ms ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  position: relative;
  overflow: hidden;
}

/* Button Sizes */
.btn-sm { 
  font-size: 0.875rem; 
  padding: 0.375rem 0.75rem; 
}

.btn-md { 
  font-size: 1rem; 
  padding: 0.5rem 1rem; 
}

.btn-lg { 
  font-size: 1.125rem; 
  padding: 0.75rem 1.5rem; 
}

/* Primary Button */
.btn-primary {
  background-color: var(--primary-500);
  color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.btn-primary:hover {
  background-color: var(--primary-600);
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(249, 115, 22, 0.25);
}

/* Secondary Button */
.btn-secondary {
  background-color: var(--bg-tertiary);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background-color: var(--gray-50);
  color: var(--text-primary);
  border-color: var(--gray-300);
}

/* Button State Styles */
.btn-success {
  background-color: #10B981 !important;
  color: white !important;
}

.btn-success:hover {
  background-color: #059669 !important;
}

.btn-danger {
  background-color: #EF4444 !important;
  color: white !important;
}

.btn-danger:hover {
  background-color: #DC2626 !important;
}

.btn-warning {
  background-color: #F59E0B !important;
  color: white !important;
}

.btn-warning:hover {
  background-color: #D97706 !important;
}

/* Button Shimmer Effect */
.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.btn:hover::before {
  transform: translateX(100%);
}
```

### Panels/Cards
```css
.panel {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.panel:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--space-lg);
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
}

.panel-body {
  padding: var(--space-lg);
}
```

### Collapsible Hero Section
```css
.hero {
  text-align: center;
  margin-bottom: var(--space-3xl);
  position: relative;
}

.hero-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  position: relative;
}

.hero-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid var(--border-color);
  background-color: var(--bg-primary);
  color: var(--text-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
  position: absolute;
  right: -3rem;
  top: 50%;
  transform: translateY(-50%);
}

.hero-toggle:hover {
  background-color: var(--bg-tertiary);
  color: var(--primary-500);
  border-color: var(--primary-500);
}

.hero-toggle-icon {
  transition: transform var(--transition-base);
}

.hero-content {
  overflow: hidden;
  transition: all var(--transition-slow);
}

/* Initial state based on data attribute (prevents flash) */
html[data-hero-collapsed="true"] .hero-content {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
  padding-top: 0;
}

html[data-hero-collapsed="true"] .hero-toggle-icon {
  transform: rotate(-90deg);
}

/* JavaScript-controlled states (after page load) */
.hero-content.collapsed {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
  padding-top: 0;
}

.hero-content:not(.collapsed) {
  max-height: 500px;
  opacity: 1;
  margin-top: var(--space-lg);
  padding-top: 0;
}

.hero.collapsed .hero-toggle-icon {
  transform: rotate(-90deg);
}

.hero-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, var(--primary-500), var(--secondary-500));
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: var(--radius-full);
  margin-bottom: var(--space-lg);
}

.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-xl);
  margin-top: var(--space-xl);
  flex-wrap: wrap;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--text-primary);
  font-family: var(--font-display);
}

.stat-label {
  display: block;
  font-size: 0.875rem;
  color: var(--text-tertiary);
  margin-top: 0.25rem;
}

.stat-divider {
  width: 1px;
  height: 2.5rem;
  background-color: var(--border-color);
}

@media (max-width: 768px) {
  .hero-toggle {
    position: static;
    transform: none;
    margin-top: var(--space-sm);
  }
  
  .stat-divider {
    display: none;
  }
  
  .hero-stats {
    gap: var(--space-lg);
  }
}
```

#### HTML Structure:
```html
<section class="hero">
  <div class="hero-header">
    <div class="hero-badge">Developer Tool</div>
    <h2 class="hero-title">Tool Name & Description</h2>
    <button class="hero-toggle" id="heroToggle" aria-label="Toggle description">
      <svg class="hero-toggle-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
  </div>
  <div class="hero-content" id="heroContent">
    <p class="hero-subtitle">Tool description and benefits</p>
    <div class="hero-stats">
      <!-- Optional stats -->
    </div>
  </div>
</section>
```

### Background Effects
```css
/* Gradient Blur Orbs */
.main::before,
.main::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.15;
  pointer-events: none;
}

.main::before {
  width: 400px;
  height: 400px;
  background: var(--primary-500);
  top: -200px;
  right: -100px;
}

.main::after {
  width: 600px;
  height: 600px;
  background: var(--secondary-500);
  bottom: -300px;
  left: -200px;
}
```

## Layout Patterns

### Standard Page Structure
```html
<body class="light-mode">
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <h1 class="logo-text">Tool Name</h1>
          <span class="logo-badge">by Clocktower</span>
        </div>
        <button class="theme-toggle" id="themeToggle">
          <!-- Theme toggle icons -->
        </button>
      </div>
    </div>
  </header>

  <main class="main">
    <div class="container">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-badge">Developer Tool</div>
        <h2 class="hero-title">Tool Title</h2>
        <p class="hero-subtitle">Tool description</p>
        <div class="hero-stats">
          <!-- Optional stats -->
        </div>
      </section>

      <!-- Tool Section -->
      <section class="tool-section">
        <!-- Tool interface -->
      </section>

      <!-- Features Section -->
      <section class="features">
        <!-- Feature cards -->
      </section>
    </div>
  </main>

  <footer class="footer">
    <div class="container">
      <!-- Footer content -->
    </div>
  </footer>
</body>
```

## Interactive States

### Hover Effects
- Buttons: Lift (-1px translateY) + shadow increase
- Cards: Lift (-2px to -4px translateY) + shadow increase
- Links: Color change to primary-500
- Theme toggle: Border color change + background fill

### Focus States
- Buttons: 3px ring with primary-500 at 50% opacity
- Inputs: Border color change to primary-500
- Remove default outlines, use custom focus rings

### Transitions
```css
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;
```

## Animations & Transitions

### Button Shimmer
```css
background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
transform: translateX(-100%) → translateX(100%) on hover
```

### Feature Card Icons
```css
transform: scale(1) → scale(1.1) on card hover
```

### Theme Toggle Ripple
```css
width/height: 0 → 100% on hover
opacity: 0.1
```

### Footer
```css
.footer {
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding: var(--space-xl) 0;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  text-align: center;
}

@media (min-width: 640px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
  }
}

.footer-text {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.footer-links {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.875rem;
}

.footer-link {
  color: var(--primary-500);
  text-decoration: none;
  transition: color var(--transition-base);
}

.footer-link:hover {
  color: var(--primary-600);
  text-decoration: underline;
}

.footer-separator {
  color: var(--text-tertiary);
}
```

#### HTML Structure:
```html
<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <p class="footer-text">
        Built by <a href="https://www.clocktowerassoc.com" target="_blank" rel="noopener" class="footer-link">Clocktower & Associates</a>
      </p>
      <div class="footer-links">
        <a href="https://github.com/username/repo" target="_blank" rel="noopener" class="footer-link">GitHub</a>
        <span class="footer-separator">•</span>
        <a href="https://www.clocktowerassoc.com/support" target="_blank" rel="noopener" class="footer-link">Support Us</a>
      </div>
    </div>
  </div>
</footer>
```

## Automatic Version Numbering System

### GitHub Actions Workflow
Create `.github/workflows/version-bump.yml`:

```yaml
name: Update Version

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  update-version:
    if: "!contains(github.event.head_commit.message, 'chore: update version')"
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Configure Git
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
      
      - name: Calculate version
        id: version
        run: |
          REAL_COMMITS=$(git rev-list --count HEAD --grep="chore: update version" --invert-grep)
          COMMIT_HASH=$(git rev-parse --short=6 HEAD)
          VERSION="1.${REAL_COMMITS}.${COMMIT_HASH}"
          echo "version=${VERSION}" >> $GITHUB_OUTPUT
      
      - name: Update version files
        run: |
          cat > version.json << EOF
          {
            "version": "${{ steps.version.outputs.version }}",
            "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
            "commit": "${{ github.sha }}",
            "branch": "${{ github.ref_name }}"
          }
          EOF
          
          cat > health.json << EOF
          {
            "status": "ok",
            "service": "Tool Name",
            "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
            "version": "${{ steps.version.outputs.version }}"
          }
          EOF
      
      - name: Commit version update
        run: |
          git add version.json health.json
          git commit -m "chore: update version to ${{ steps.version.outputs.version }}"
          git push origin main
```

### Version Loading JavaScript
```javascript
// Load version information
async function loadVersion() {
    try {
        const response = await fetch('./version.json');
        if (response.ok) {
            const versionData = await response.json();
            const versionBadge = document.getElementById('versionBadge');
            versionBadge.textContent = `v${versionData.version}`;
            const lastRealCommitShort = versionData.lastRealCommit?.substring(0, 7) || 'unknown';
            versionBadge.title = `Version ${versionData.version}\nLast change: ${lastRealCommitShort}\nBuilt: ${versionData.timestamp || 'unknown'}`;
            
            // Set href to GitHub commit if commit hash is available
            // Use lastRealCommit if available, otherwise fall back to commit
            const commitHash = versionData.lastRealCommit || versionData.commit;
            if (commitHash) {
                versionBadge.href = `https://github.com/USERNAME/REPO_NAME/commit/${commitHash}`;
            }
        } else {
            const versionBadge = document.getElementById('versionBadge');
            versionBadge.textContent = 'v1.0.0';
            versionBadge.removeAttribute('href');
        }
    } catch (error) {
        const versionBadge = document.getElementById('versionBadge');
        versionBadge.textContent = 'v1.0.0';
        versionBadge.removeAttribute('href');
    }
}

// Call during initialization
document.addEventListener('DOMContentLoaded', () => {
    loadVersion();
});
```

## Flash Prevention System

### Inline Theme & State Detection
Add to `<head>` before CSS:

```html
<script>
    // Apply theme and hero state immediately to prevent flash
    (function() {
        const savedTheme = localStorage.getItem('theme') || 
                          (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.className = `${savedTheme}-mode`;
        
        // Apply hero collapse state
        const heroCollapsed = localStorage.getItem('heroCollapsed') === 'true';
        if (heroCollapsed) {
            document.documentElement.setAttribute('data-hero-collapsed', 'true');
        }
    })();
</script>
```

## Dark Mode

### Implementation
- Use CSS custom properties for all colors
- Toggle class on `html` element: `light-mode` / `dark-mode`
- Store preference in localStorage
- Respect system preference as default
- Apply immediately via inline script to prevent flash

### Dark Mode Adjustments
- Increase shadow opacity (0.1 → 0.3)
- Reduce background effect opacity (0.15 → 0.1)
- Invert gradients where appropriate
- Adjust Prism.js theme for dark mode

## SEO & Meta Tags

### Required Meta Tags
```html
<!-- Basic -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Tool Name | Fast Online Tool Description</title>
<meta name="description" content="Free online tool description. Key features and benefits. Built for developers by Clocktower & Associates.">
<meta name="keywords" content="tool specific keywords, online tool, developer tool">
<meta name="author" content="Clocktower & Associates">

<!-- Open Graph -->
<meta property="og:title" content="Tool Name - Fast Online Tool">
<meta property="og:description" content="Tool description for social sharing">
<meta property="og:type" content="website">
<meta property="og:url" content="https://toolname.www.clocktowerassoc.com">
<meta property="og:image" content="https://toolname.www.clocktowerassoc.com/og-image.svg">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">

<!-- Canonical -->
<link rel="canonical" href="https://toolname.www.clocktowerassoc.com">
```

### Standard Files
- `robots.txt` - Allow all crawlers
- `sitemap.xml` - Single page entry
- `favicon.svg` - Tool-specific icon with orange background

## File Structure

### Standard Files
```
/
├── index.html          # Main HTML file
├── styles.css          # All styles
├── script.js           # Tool functionality
├── favicon.svg         # Tool icon
├── og-image.svg        # Social share image
├── robots.txt          # SEO file
├── sitemap.xml         # SEO file
├── README.md           # Documentation
├── LICENSE             # MIT License
├── CONTRIBUTING.md     # Contribution guidelines
├── STYLE_GUIDE.md      # This file
├── .gitignore          # Git ignore file
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Pages deployment
```

### Naming Conventions
- Tool subdomain: `toolname.www.clocktowerassoc.com`
- Repository: `tool_name` (snake_case)
- Display name: "Tool Name" (Title Case)

## Implementation Checklist

When creating a new tool, ensure you:

### **Core Styling & Layout**
- [ ] Copy the color palette and CSS variables
- [ ] Include Inter and Poppins fonts from Google Fonts
- [ ] Implement both light and dark modes with flash prevention
- [ ] Add gradient blur orbs to main content background

### **Header Components**
- [ ] Add logo with gradient text effect
- [ ] Include clickable "by Clocktower" badge linking to www.clocktowerassoc.com
- [ ] Add version badge with monospace font
- [ ] Implement theme toggle with hover effects

### **Hero Section**
- [ ] Add collapsible hero section with toggle button
- [ ] Include "Developer Tool" badge
- [ ] Add hero stats section (optional)
- [ ] Implement collapse state persistence

### **Interactive Elements**
- [ ] Style buttons with shimmer effects and state variations
- [ ] Add focus states for accessibility
- [ ] Implement hover animations on cards/panels
- [ ] Include proper button state styles (success, warning, danger)

### **Footer**
- [ ] Add footer with Clocktower attribution link
- [ ] Include GitHub and Support Us links
- [ ] Implement responsive footer layout

### **Version System**
- [ ] Set up GitHub Actions version-bump workflow
- [ ] Create version.json and health.json files
- [ ] Add version loading JavaScript
- [ ] Configure repository permissions for Actions

### **SEO & Performance**
- [ ] Add all required meta tags (OpenGraph, Twitter, etc.)
- [ ] Create favicon.svg and og-image.svg
- [ ] Add robots.txt and sitemap.xml
- [ ] Set up GitHub Actions deployment workflow

### **Quality Assurance**
- [ ] Test flash prevention for dark mode and hero collapse
- [ ] Validate on multiple screen sizes and devices
- [ ] Check keyboard navigation and accessibility
- [ ] Validate HTML and CSS
- [ ] Test version numbering system
- [ ] Verify all links work correctly
- [ ] Ensure fast load times and smooth animations

### **Content & Documentation**
- [ ] Update tool-specific text and descriptions
- [ ] Test health check endpoint
- [ ] Update README with tool-specific features
- [ ] Verify uptime monitoring works

## CSS Reset & Base Styles

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-sans);
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  transition: background-color var(--transition-base), color var(--transition-base);
}
```

## Accessibility

- Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text
- All interactive elements must have focus states
- Use semantic HTML elements
- Include proper ARIA labels where needed
- Ensure keyboard navigation works properly

---

This style guide should be used as the foundation for all Clocktower & Associates developer tools to ensure a consistent, professional appearance across the entire suite.