# Experiment 6: Axios & API Integration

## Overview
This experiment demonstrates API integration in React using Axios:
- Fetching data with GET requests
- Submitting data with POST requests
- Handling loading and error states
- Consuming third-party APIs
- Using JSONPlaceholder for mock data

## Components Included

### 1. **ProfileData Component**
Fetches and displays user profile using GET request

**Features:**
- Axios GET request to fetch user data
- Loading state handling
- Error handling
- Refresh button
- Display user information (name, email, phone, company)

### 2. **AddStudentForm Component**
Submits student data using POST request

**Features:**
- Form with multiple fields
- Axios POST request
- Form validation
- Success/error messages
- Form reset after submission

### 3. **ProductAPIConsumer Component**
Fetches and displays products

**Features:**
- Axios GET request with limit parameter
- Grid display of products
- Product cards with images
- Add to cart buttons
- Refresh functionality

### 4. **CustomerAPIConsumer Component**
Fetches customers and their purchases

**Features:**
- Axios GET request for customers list
- Related GET request for purchases by customer ID
- Table display of customers
- Nested data fetching
- Back navigation

## Installation

```bash
npm install axios
```

## How to Run

1. Navigate to the experiment folder:
```bash
cd experiments/exp6-axios-api
```

2. Install Axios:
```bash
npm install axios
```

3. Start the React application:
```bash
npm start
```

## File Structure
- `App.js` - Main application with tab navigation
- `ProfileData.js` - GET request example
- `AddStudentForm.js` - POST request example
- `ProductAPIConsumer.js` - Data fetching with limits
- `CustomerAPIConsumer.js` - Related data fetching
- `README.md` - This file

## Learning Objectives
✓ Understand HTTP methods (GET, POST)
✓ Use Axios for API calls
✓ Handle async operations
✓ Manage loading and error states
✓ Parse and display API response data
✓ Submit form data to API
✓ Work with third-party APIs

## Axios Concepts Covered
- GET requests (`axios.get()`)
- POST requests (`axios.post()`)
- Try-catch error handling
- Loading state management
- Query parameters

## API Integration Methods

### GET Request
```javascript
const response = await axios.get('https://api.example.com/data');
```

### POST Request
```javascript
const response = await axios.post('https://api.example.com/data', {
  name: 'John',
  email: 'john@example.com'
});
```

### Error Handling
```javascript
try {
  const response = await axios.get('url');
} catch (error) {
  console.error('Error:', error);
}
```

## APIs Used for Testing
- **JSONPlaceholder**: Fake JSON API for testing and prototyping
  - Users: `https://jsonplaceholder.typicode.com/users`
  - Photos: `https://jsonplaceholder.typicode.com/photos`
  - Albums: `https://jsonplaceholder.typicode.com/albums`
  - Posts: `https://jsonplaceholder.typicode.com/posts`

## Technologies Used
- React 19.x
- Axios HTTP client
- JavaScript async/await
- ES6+ features

## State Management Pattern
```javascript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const fetchData = async () => {
  try {
    setLoading(true);
    const response = await axios.get('url');
    setData(response.data);
    setError(null);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

## Important Notes
- Always handle loading state before rendering data
- Implement error handling for failed requests
- Use try-catch for async operations
- Clean up axios requests if needed (using AbortController)
- Consider rate limiting when making multiple requests
- JSONPlaceholder accepts dummy POST/PUT/DELETE requests (data is not actually stored)

## Future Enhancements
- Add request interceptors for authentication
- Implement pagination
- Add search and filter functionality
- Use React Query or SWR for caching
- Add retry logic for failed requests
- Implement request cancellation
- Add request timeout handling
