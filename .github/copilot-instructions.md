# StokApp Tailwind CSS Development Guide

## Introduction

This document outlines the principles, rules, and best practices for maintaining the Tailwind CSS implementation in the StokApp project. Following these guidelines will help prevent CSS duplication and ensure a consistent development experience. **This project follows a strict mobile-first approach.**

**Note:** While the user-facing language of the application is Turkish, all code, documentation, and development communication should be in English.

## Project Structure

- Tailwind CSS is the primary styling framework used in this project
- The build process uses PostCSS with autoprefixer
- All custom CSS is kept to a minimum and placed in `wwwroot/css/site.css`
- Tailwind's utility classes should be used whenever possible instead of custom CSS
- **All designs must start with mobile layouts first** before adding responsive variants

## Mobile-First Design Principles

### Core Principles

1. **Design for mobile devices first**
   - Start by designing and implementing the mobile layout
   - Only after the mobile experience is complete, adapt for larger screens

2. **Progressive enhancement over graceful degradation**
   - Add features and visual enhancements as screen size increases
   - Don't design for desktop and then remove features for mobile

3. **Performance is paramount**
   - Optimize images, minimize JavaScript, and keep CSS lean
   - Test performance on actual mobile devices regularly

4. **Touch-friendly interfaces**
   - Buttons and interactive elements should have a minimum touch target size of 44x44px
   - Provide adequate spacing between clickable elements (min 8px padding)

### Implementation in Tailwind

1. **Write base styles for mobile first**
   - Default styles (without breakpoint prefixes) should be for mobile
   - Add responsive prefixes (`sm:`, `md:`, `lg:`, etc.) only for larger screens

2. **Test on real mobile devices**
   - Don't rely solely on browser dev tools for mobile testing
   - Test on various devices with different screen sizes and browsers

3. **Use relative units**
   - Prefer `rem` and `em` over fixed pixel values when possible
   - Use Tailwind's responsive padding/margin utilities

## Preventing CSS Duplication

### General Principles

1. **Use Tailwind utility classes exclusively** whenever possible
   - Avoid writing custom CSS that duplicates functionality already provided by Tailwind

2. **Maintain a single source of truth** for styling
   - All styling should come from Tailwind utility classes used directly in HTML
   - Only define custom styles when absolutely necessary

3. **Leverage Tailwind's configuration** for customization
   - Use `tailwind.config.js` to extend or modify the default theme
   - Create custom theme values rather than using arbitrary values in HTML

4. **Use component extraction** for repeated patterns
   - Extract common patterns to reusable Razor partial views
   - For complex components, use Razor components

### Specific Rules

1. **Never add Bootstrap or other CSS frameworks**
   - The project has migrated from Bootstrap to Tailwind CSS
   - Do not reintroduce Bootstrap classes or components

2. **Avoid inline styles**
   - Use Tailwind utility classes instead of inline CSS
   - This improves consistency and makes tracking styles easier

3. **Follow the mobile-first responsive approach**
   - Start with mobile layout and add responsive variants as needed (`sm:`, `md:`, etc.)
   - Example: `class="block sm:flex lg:justify-between"`
   - Never start with desktop styles and then override for mobile screens

4. **Use the @apply directive sparingly**
   - Only use @apply when creating reusable components that appear frequently
   - Document any custom component classes in a comment

## Tailwind CSS Best Practices

### Classes Organization

Organize your utility classes in the following order for consistency:

1. Layout (display, position, etc.)
2. Box model (width, height, margin, padding)
3. Typography (font, text)
4. Visual (color, background, borders)
5. Responsive variants (grouped by breakpoint)
6. Misc (cursor, user-select, etc.)

Example (mobile-first approach):
```html
<!-- Mobile styles first (no prefix) -->
<div class="flex flex-col w-full px-4 py-2 bg-white text-gray-800 shadow-md
           <!-- Tablet styles (sm:) -->
           sm:flex-row sm:justify-between sm:items-center
           <!-- Desktop styles (lg:) -->
           lg:max-w-7xl lg:mx-auto lg:px-6">
</div>
```

### Handling Responsiveness

- **Mobile designs must come first**, then progressively enhance for larger screens
- Default styles (without breakpoint prefixes) should always be for the smallest screens
- Use responsive variants in ascending order of screen size
- Use standard breakpoints consistently:
  - `sm:` (640px and up)
  - `md:` (768px and up)
  - `lg:` (1024px and up)
  - `xl:` (1280px and up)
  - `2xl:` (1536px and up)
- Common responsive patterns:
  - `flex-col sm:flex-row` (stack on mobile, row on larger screens)
  - `w-full md:w-auto` (full width on mobile, auto width on desktop)
  - `px-4 lg:px-6` (less padding on mobile, more on desktop)

### Responsive Layout Examples

#### Navigation
```html
<!-- Mobile: Stacked/hidden navigation -->
<nav class="flex flex-col 
           sm:flex-row sm:items-center">
    <!-- Navigation items -->
</nav>
```

#### Grid Items
```html
<!-- Mobile: Single column, Tablet: Two columns, Desktop: Four columns -->
<div class="grid grid-cols-1 gap-4
           sm:grid-cols-2
           lg:grid-cols-4">
    <!-- Grid items -->
</div>
```

### Dark Mode

If implementing dark mode:
- Use the `dark:` variant consistently
- Test all dark mode styles thoroughly on both mobile and desktop devices
- Combine with responsive variants when needed: `dark:bg-gray-800 sm:dark:bg-gray-900`

## Project-Specific Conventions

### Form Elements

- Use the following pattern for form inputs (mobile-first):
```html
<input type="text" class="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 md:text-sm">
```

### Buttons

- Primary buttons (mobile-first with larger touch targets):
```html
<button class="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto">
```

- Secondary buttons:
```html
<button class="w-full px-4 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 sm:w-auto">
```

### Touch Targets

- All interactive elements should have sufficient size for touch interaction:
```html
<button class="min-h-[44px] min-w-[44px] p-2">Button</button>
```

### Navigation

- Follow the pattern established in `_Layout.cshtml` for consistent navigation elements
- Ensure navigation is accessible and usable on mobile devices first

## Development Workflow

1. **Start with mobile designs** before any other screen sizes
2. Run `npm run dev` during development to auto-compile Tailwind CSS
3. Test on mobile devices and small viewports first
4. Test on progressively larger screens and make adjustments using responsive utilities
5. Before committing, run `npm run build` to generate optimized production CSS
6. Verify all responsive designs across different device sizes

## Mobile Testing Guide

1. **Test on actual devices whenever possible**, not just emulators
2. Test on both iOS and Android devices
3. Test in portrait and landscape orientations
4. Test with different network conditions (3G, 4G, Wi-Fi)
5. Check touch target sizes and spacing
6. Verify that content is readable without zooming
7. Ensure no horizontal scrolling occurs on mobile screens

## Common Issues and Solutions

### Long Class Lists

When class lists become unwieldy:

1. **Consider extracting to a component** if the pattern is reused
2. **Group classes by breakpoint** for readability
3. **Use meaningful line breaks** in your HTML to organize classes
4. **Comment sections** for readability

### Custom Styling Needs

If you need styles not available in Tailwind:

1. **Check if it can be added to the theme** in `tailwind.config.js` first
2. **Use arbitrary values** (e.g., `class="w-[762px]"`) when necessary
3. **Only as a last resort**, add custom CSS to `site.css`

### Mobile-Specific Issues

1. **Touch target too small**: Increase padding or min-height/min-width
2. **Content overflow**: Use `overflow-x-hidden` or ensure proper wrapping
3. **Font size too small**: Use minimum 16px (1rem) for body text on mobile
4. **Form elements issues**: Use proper input sizing and spacing for mobile



## TypeScript Implementation Guidelines

### Directory Structure and File Organization

1. **Directory Structure**
   - `/Scripts` - Root directory for all TypeScript files
     - `/core` - Core functionality (theme, authentication, etc.)
     - `/components` - UI components (sidebar, notifications, etc.)
     - `/utils` - Utility functions and helper classes
   - Each directory should have an `index.ts` file to re-export contained modules

2. **File Naming Convention**
   - Use kebab-case for filenames (e.g., `user-menu.ts`)
   - Use singular names for files that export a single class
   - Use PascalCase for class names (e.g., `class UserMenu {}`)

3. **Module Organization**
   - Each file should export one primary class or function
   - Group related functionality in the same directory
   - Avoid dependencies between directories when possible (e.g., components shouldn't depend on other components)

### Code Structure and Patterns

1. **Class-based Components**
   - Use ES6+ class syntax for all UI components
   - Each component should be self-contained with its own initialization logic
   - Follow this structure for component classes:
     ```typescript
     export class ComponentName {
         // Private properties for DOM elements
         private elementRef: HTMLElement | null;
         
         constructor(selector?: string) {
             // Get DOM references in constructor
             this.elementRef = selector ? document.querySelector(selector) : null;
             
             // Initialize if elements exist
             if (this.elementRef) {
                 this.initialize();
             }
         }
         
         private initialize(): void {
             // Setup event listeners
             this.setupEventListeners();
         }
         
         private setupEventListeners(): void {
             // Add event listeners with proper binding
             this.elementRef?.addEventListener('click', this.handleClick.bind(this));
         }
         
         private handleClick(e: Event): void {
             // Event handler implementation
         }
     }



## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Mobile-First Design](https://tailwindcss.com/docs/responsive-design)
- [Mobile Web Best Practices](https://developer.mozilla.org/en-US/docs/Web/Guide/Mobile)