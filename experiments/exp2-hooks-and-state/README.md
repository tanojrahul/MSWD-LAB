# Experiment 2: Functional Components & Hooks

## Overview
This experiment demonstrates functional components with hooks and state management:
- Creating functional components with dynamic props
- Using useState hook for state management
- Handling default props values
- Building interactive components

## Components Included

### 1. **Greeting Component**
Functional component that accepts props with default values

**Features:**
- Props: `name` (default: 'Guest'), `message` (default: 'Welcome to React!')
- Displays personalized greeting
- Demonstrates default prop handling

### 2. **UserCard Component**
Displays user information with default values

**Features:**
- Props: `user` object with name, email, age
- Default user object provided
- Responsive card layout
- Interactive button (View Profile)

### 3. **Counter Component**
Interactive counter with increment/decrement functionality

**Key Features:**
- Props: `initialValue` (default: 0), `step` (default: 1)
- useState hook for state management
- Increment, Decrement, and Reset buttons
- Display current count value
- Customizable step size

### 4. **Toggle Component**
ON/OFF toggle switch

**Key Features:**
- useState hook for boolean state
- Animated toggle switch UI
- Displays current state (ON/OFF)
- Color changes based on state
- Button click or label click to toggle

## How to Run

1. Navigate to the experiment folder:
```bash
cd experiments/exp2-hooks-and-state
```

2. Install dependencies (if needed):
```bash
npm install
```

3. Start the React application:
```bash
npm start
```

4. Open http://localhost:3000 in your browser

## File Structure
- `App.js` - Main component with navigation and layout
- `Greeting.js` - Greeting component with default props
- `UserCard.js` - User card component
- `Counter.js` - Counter component with increment/decrement
- `Toggle.js` - Toggle switch component
- `README.md` - This file

## Learning Objectives
✓ Create functional components with props
✓ Understand default props pattern
✓ Use useState hook for state management
✓ Handle user interactions
✓ Create reusable components
✓ Conditional rendering with state
✓ Props vs State understanding

## React Hooks Used
- `useState` - For managing component state

## Technologies Used
- React 19.x
- React Hooks (useState)
- JavaScript ES6+
- Inline CSS styling

## Key Concepts Covered
1. **Props:** Parameters passed to components
2. **Default Props:** Default values when props are not provided
3. **State:** Data that changes over time
4. **useState Hook:** Function to add state to functional components
5. **Event Handlers:** Responding to user interactions

## Example Usage

### Greeting Component
```jsx
<Greeting name="John" message="Hello World" />
<Greeting /> // Uses default values
```

### Counter Component
```jsx
<Counter initialValue={0} step={1} />
<Counter initialValue={10} step={5} />
```

### Toggle Component
```jsx
<Toggle label="Power Toggle" />
```

## Author Notes
- All components use functional component syntax
- Inline styling for rapid development (can be converted to CSS modules)
- Components are self-contained and reusable
- Props demonstrate flexibility and reusability
