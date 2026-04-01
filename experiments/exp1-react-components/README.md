# Experiment 1: React Components

## Overview
This experiment demonstrates fundamental React component concepts including:
- Creating reusable React components
- Managing state with useState hook
- Displaying dynamic data
- Handling user interactions
- Event handling and list rendering

## Components Included

### 1. **PassengerList Component**
- Displays a list of passengers with their details
- Features to add new passengers
- Ability to remove passengers
- Shows passenger status (Confirmed, Pending, Cancelled)
- Uses form inputs to add new records

**Key Features:**
- Input fields for name, email, and status
- Add/Remove functionality
- Table display with all passenger information
- Total passenger count

### 2. **StudentAttendance Component**
- Tracks student attendance with present/absent toggle
- Displays attendance statistics
- Shows percentage calculation

**Key Features:**
- Checkbox toggle for attendance status
- Live statistics (Present, Absent, Percentage)
- Color-coded status badges
- Student roll numbers and names

### 3. **Timer Component** (Multiple Instances)
- Individual timer with start, pause, and reset functions
- Displays time in HH:MM:SS format
- Multiple timer instances can run independently

**Key Features:**
- Start/Pause/Reset buttons
- Time increment every second
- useEffect for interval management
- Independent timers

### 4. **CourseList Component**
- Displays available courses with details
- Shows course information using props
- Enrollment button for each course

**Key Features:**
- Course cards with title, instructor, duration, level
- Pricing display
- Student enrollment count
- Course description
- Grid layout for responsive design

## How to Run

1. Navigate to the experiment folder:
```bash
cd experiments/exp1-react-components
```

2. Install dependencies:
```bash
npm install
```

3. Start the React application:
```bash
npm start
```

4. Open http://localhost:3000 in your browser

## File Structure
- `App.js` - Main component with navigation between different components
- `PassengerList.js` - Passenger management component
- `StudentAttendance.js` - Student attendance tracker
- `Timer.js` - Reusable timer component
- `CourseList.js` - Course listing component
- `README.md` - This file

## Learning Objectives
✓ Understand component composition
✓ Manage component state using hooks
✓ Handle user events and interactions
✓ Create reusable components with props
✓ Render lists dynamically
✓ Apply conditional rendering
✓ Build forms in React

## Technologies Used
- React 19.x
- React Hooks (useState, useEffect)
- JavaScript ES6+

## Author Notes
- All components are functional components using hooks
- Inline styling is used for simplicity (can be replaced with CSS modules)
- Components are self-contained and can be reused
- No external UI library dependency (except React)
