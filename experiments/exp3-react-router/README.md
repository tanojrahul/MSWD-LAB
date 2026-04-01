# Experiment 3: React Router

## Overview
This experiment demonstrates React Router concepts:
- Basic routing with multiple pages
- Navigation using Link components
- Nested routing structure (Hospital Management)
- Dynamic routes with URL parameters
- Route hierarchies

## Pages Included

### 1. **Home Page**
Landing page with app overview and navigation instructions

### 2. **Friends Page**
Displays a list of friends with their online status

**Features:**
- Grid layout for friend cards
- Status indicators (Online, Away, Offline)
- View Profile button (interactive)

### 3. **Posts Page**
Social media feed with posts

**Features:**
- Post cards with author, title, content
- Like and comment buttons
- Like counter

### 4. **Chat Page**
Simple chat interface with message history

**Features:**
- Message display
- Message input form
- Send message functionality
- Sender identification
- Timestamp display

### 5. **Login Page**
Authentication form

**Features:**
- Email and password fields
- Login button
- Success message display
- Logout functionality

### 6. **Hospital Management (Nested Routing)**
Demonstrates nested routing structure

**Features:**
- Hospital list page
- Dynamic hospital detail pages (with parameters)
- Links to hospital details
- Nested route structure: `/hospital` and `/hospital/:hospitalId`

## How to Run

1. Navigate to the experiment folder:
```bash
cd experiments/exp3-react-router
```

2. Install React Router:
```bash
npm install react-router-dom
```

3. Start the React application:
```bash
npm start
```

4. Open http://localhost:3000 in your browser

## File Structure
- `App.js` - Main application with Router setup
- `pages/Home.js` - Home page
- `pages/Friends.js` - Friends list page
- `pages/Posts.js` - Posts feed page
- `pages/Chat.js` - Chat interface
- `pages/Login.js` - Login page
- `pages/HospitalManagement.js` - Hospital management with nested routes
- `README.md` - This file

## Route Structure
```
/ → Home
/friends → Friends List
/posts → Posts Feed
/chat → Chat Interface
/hospital → Hospital List (nested root)
/hospital/:hospitalId → Hospital Detail (nested with parameter)
/login → Login Page
```

## Learning Objectives
✓ Set up React Router with BrowserRouter
✓ Create routes with Route component
✓ Navigate between routes using Link component
✓ Implement nested routing
✓ Use URL parameters with useParams hook
✓ Create multi-page applications
✓ Understand routing hierarchy

## React Router Hooks Used
- `useParams` - Extract URL parameters from routes

## Technologies Used
- React 19.x
- React Router v6+
- JavaScript ES6+

## Key Routing Features Demonstrated

### 1. **Basic Routes**
Simple routes for different pages

### 2. **Dynamic Routes**
Hospital detail route with parameter: `/hospital/:hospitalId`

### 3. **Nested Routes**
Hospital management has nested structure with list and detail views

### 4. **Navigation**
Using Link component for client-side navigation

## Example Routes
```jsx
<Route path="/" element={<Home />} />
<Route path="/hospital" element={<HospitalManagement />} />
<Route path="/hospital/:hospitalId" element={<HospitalManagement />} />
```

## Important Notes
- React Router v6+ uses `element` instead of `component`
- Links use `to` prop instead of `href`
- Routes are defined inside `Routes` component
- `BrowserRouter` must wrap all routes
- `useParams` hook retrieves URL parameters

## Future Enhancements
- Add 404 Not Found page
- Implement route guards/authentication
- Add route transitions
- Implement lazy loading of routes
