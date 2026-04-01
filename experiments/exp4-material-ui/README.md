# Experiment 4: Material-UI Components

## Overview
This experiment demonstrates Material-UI (MUI) components and features:
- Material-UI form components
- Responsive navigation bar
- Material-UI theming
- Common UI components

## Components Included

### 1. **Train Reservation Form**
Complex form using Material-UI components

**Features:**
- TextField for text inputs
- Select dropdowns for stations and classes
- Date picker
- Form validation
- Submit and clear buttons

### 2. **Responsive Navigation Bar**
AppBar with responsive design

**Features:**
- Navigation menu
- Hamburger menu for mobile
- Notification badge
- User profile dropdown
- Settings icon

### 3. **Material-UI Components Showcase**
Display of commonly used MUI components

**Components Shown:**
- Cards
- Buttons (various variants)
- Chips
- Lists
- Paper containers

### 4. **Theme Customization**
Dark/Light theme switcher

**Features:**
- Custom theme creation
- Light and dark color palettes
- Dynamic theme switching
- CssBaseline for consistent styling

## Installation

```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```

## How to Run

1. Navigate to the experiment folder:
```bash
cd experiments/exp4-material-ui
```

2. Install Material-UI dependencies:
```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```

3. Start the React application:
```bash
npm start
```

## File Structure
- `App.js` - Main application with tabbed interface
- `TrainReservationForm.js` - Complex form example
- `ResponsiveNavBar.js` - Responsive navigation component
- `MaterialUIComponents.js` - Component showcase
- `ThemeCustomization.js` - Theme switching demo
- `README.md` - This file

## Learning Objectives
✓ Use Material-UI form components
✓ Create responsive layouts with Grid
✓ Implement AppBar and Toolbar
✓ Use Material-UI theming
✓ Handle form submissions
✓ Create responsive navigation

## Material-UI Hooks/APIs Used
- `createTheme()` - Create custom themes
- `ThemeProvider` - Apply theme globally
- `CssBaseline` - Baseline styles
- `useTheme()` - Access theme in components

## Technologies Used
- React 19.x
- Material-UI v5+
- @emotion/react and @emotion/styled
- Material-UI Icons
- JavaScript ES6+

## Key Features
1. Professional styling out of the box
2. Responsive design built-in
3. Consistent color schemes
4. Accessibility features included
5. Easy theme customization

## Theme Properties
- Color palette (primary, secondary, error, warning, info, success)
- Typography settings
- Component overrides
- Spacing system
- Breakpoints for responsive design

## Material-UI Components Used
- AppBar
- Toolbar
- Card
- CardContent
- CardActions
- Button
- TextField
- Select
- MenuItem
- Grid
- Container
- Paper
- Typography
- Box
- Chip
- List
- ListItem
- Avatar
- Badge
- Menu
- Tab
- Tabs

## Important Notes
- Material-UI requires Emotion for styling
- ThemeProvider must wrap the app for theming
- CssBaseline should be included for consistent styling
- Responsive design uses breakpoints: xs, sm, md, lg, xl

## Future Enhancements
- Add form validation with error messages
- Implement snackbar notifications
- Add dialog/modal components
- Use more advanced MUI components
- Implement data persistence
