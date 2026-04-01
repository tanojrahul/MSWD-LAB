# Experiment 5: Bootstrap Integration

## Overview
This experiment demonstrates Bootstrap integration in React:
- Responsive grid system
- Bootstrap components
- Filtering and sorting
- Theme customization
- Bootstrap-based responsive design

## Components Included

### 1. **Jobs Catalog**
Responsive job listings with filtering and sorting

**Features:**
- Grid layout for job cards
- Filter by location
- Sort by type (Full-time, Part-time, Contract)
- Sort by title or salary
- Job cards with company info, salary, and apply button
- Responsive design (mobile and desktop)

### 2. **Bootstrap Navigation Bar**
Responsive navigation using Bootstrap

**Features:**
- Hamburger menu for mobile
- Navigation links
- Login button
- Responsive collapse behavior

### 3. **Bootstrap Themes**
Theme switcher using Bootstrap utility classes

**Features:**
- Multiple theme options (Light, Dark, Primary, Success)
- Dynamic theme switching
- Bootstrap color utilities

## Installation

```bash
npm install bootstrap
```

## How to Run

1. Navigate to the experiment folder:
```bash
cd experiments/exp5-bootstrap
```

2. Import Bootstrap in your main React file or index.js:
```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
```

3. Start the React application:
```bash
npm start
```

## File Structure
- `App.js` - Main application entry point
- `JobsCatalog.js` - Jobs listing with filtering/sorting
- `BootstrapNavBar.js` - Responsive navigation bar
- `BootstrapThemes.js` - Theme customization demo
- `README.md` - This file

## Learning Objectives
✓ Integrate Bootstrap with React
✓ Use Bootstrap grid system
✓ Create responsive layouts
✓ Implement filtering and sorting
✓ Use Bootstrap components
✓ Understand Bootstrap breakpoints
✓ Apply Bootstrap themes

## Bootstrap Features Used
- Grid system (container, row, col)
- Navigation bar (navbar)
- Cards
- Buttons (various variants)
- Badges
- Alerts
- Tab navigation
- Responsive breakpoints (xs, sm, md, lg, xl)
- Utility classes (spacing, colors, borders)

## Technologies Used
- React 19.x
- Bootstrap 5+
- JavaScript ES6+
- CSS Bootstrap utilities

## Key Features
1. Mobile-first responsive design
2. Pre-built components
3. CSS-only styling (no JavaScript required for basic features)
4. Consistent spacing and sizing
5. Theme customization using CSS variables (Bootstrap 5+)

## Bootstrap Breakpoints
- Extra small: < 576px (xs)
- Small: ≥ 576px (sm)
- Medium: ≥ 768px (md)
- Large: ≥ 992px (lg)
- Extra large: ≥ 1200px (xl)

## Filtering and Sorting Logic
- Filter by location: Case-insensitive string matching
- Filter by job type: Exact matching
- Sort by title: Alphabetical order
- Sort by salary: Numerical order (highest to lowest)

## Bootstrap Classes Used
- `.container`, `.container-fluid` - Main containers
- `.row`, `.col-*` - Grid system
- `.navbar`, `.navbar-nav` - Navigation
- `.card` - Card components
- `.badge` - Badge labels
- `.btn` - Buttons and button groups
- `.nav`, `.nav-tabs` - Tab navigation
- `.alert` - Alert messages
- `.shadow-*` - Box shadows
- `bg-*`, `text-*` - Background and text colors

## Important Notes
- Bootstrap requires a responsive meta viewport tag in HTML head
- Bootstrap classes provide responsive behavior out of the box
- Combine Bootstrap classes for complex layouts
- Use Bootstrap utilities for spacing, sizing, and styling
- Bootstrap provides a grid system that adapts to screen size

## Future Enhancements
- Add pagination to job listings
- Implement advanced search
- Add job details modal
- Implement saved jobs feature
- Add job application form
- Create user profile section
