# Experiment 9: MongoDB Atlas Integration

## Overview
This experiment demonstrates how to:
- Create and connect to MongoDB Atlas (cloud database)
- Perform CRUD operations using Node.js
- Use MongoDB Shell for command-line operations
- Integrate with React applications
- Implement sorting, filtering, and aggregation

## MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new cluster (free tier available)
4. Wait for cluster to initialize

### Step 2: Create Database User
1. Go to Database Access
2. Add a database user with strong password
3. Note username and password

### Step 3: Get Connection String
1. Go to Clusters
2. Click "Connect"
3. Choose "Connect your application"
4. Copy connection string:
```
mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
```

### Step 4: Whitelist IP Address
1. Go to Network Access
2. Add your IP address (or 0.0.0.0/0 for testing)

## Files Included

### 1. **mongoAtlasConnection.js**
Node.js program for connecting to MongoDB Atlas with CRUD operations

**Functions included:**
- `connectDatabase()` - Establish connection
- `createStudent()` - Insert single document
- `createMultipleStudents()` - Insert multiple documents
- `getAllStudents()` - Retrieve all students
- `getStudentById()` - Find specific student
- `getStudentsByGrade()` - Filter by grade
- `getSortedStudents()` - Sort by field
- `getFilteredStudents()` - Apply custom filters
- `updateStudent()` - Update single document
- `updateMultipleStudents()` - Batch update
- `deleteStudent()` - Delete single document
- `deleteMultipleStudents()` - Batch delete
- `getStudentStatistics()` - Aggregation pipeline

### 2. **mongoShellCommands.js**
MongoDB Shell (mongosh) commands for interactive database operations

**Commands covered:**
- Connection
- CRUD operations
- Sorting and filtering
- Aggregation
- Indexing
- Database operations

## Installation

```bash
npm install mongodb
```

## How to Use

### Using Node.js

```javascript
// 1. Import the module
const db = require('./mongoAtlasConnection');

// 2. Connect and perform operations
async function demo() {
  const connection = await db.connectDatabase();
  const students = await db.getAllStudents(connection.db('studentdb'));
  console.log(students);
  await connection.close();
}

demo();
```

### Using MongoDB Shell

```bash
# Install mongosh if not already installed
brew install mongosh

# Connect to MongoDB Atlas
mongosh "mongodb+srv://username:password@cluster.mongodb.net/studentdb"

# Run queries in interactive shell
db.students.find()
db.students.find().sort({ marks: -1 })
```

## Database Schema

```javascript
{
  _id: Number,           // Unique identifier
  name: String,          // Student name
  email: String,         // Email address
  rollNo: String,        // Roll number
  grade: String,         // Grade (A, B, C, etc)
  marks: Number,         // Total marks
  department: String,    // Department name
  enrollmentDate: Date,  // Enrollment date
  active: Boolean        // Active status
}
```

## CRUD Operations

### CREATE
```javascript
// Insert single
db.students.insertOne({ name: "Alice", marks: 95 });

// Insert multiple
db.students.insertMany([{ name: "Bob" }, { name: "Carol" }]);
```

### READ
```javascript
// Find all
db.students.find();

// Find with filter
db.students.find({ grade: "A" });

// Find sorted
db.students.find().sort({ marks: -1 });
```

### UPDATE
```javascript
// Update single
db.students.updateOne({ _id: 1 }, { $set: { marks: 98 } });

// Update multiple
db.students.updateMany({ grade: "B" }, { $set: { grade: "B+" } });
```

### DELETE
```javascript
// Delete single
db.students.deleteOne({ _id: 1 });

// Delete multiple
db.students.deleteMany({ active: false });
```

## Aggregation Examples

### Group by Grade
```javascript
db.students.aggregate([
  { $group: { _id: "$grade", count: { $sum: 1 } } }
]);
```

### Top Performers per Department
```javascript
db.students.aggregate([
  { $sort: { marks: -1 } },
  { $group: {
      _id: "$department",
      topStudent: { $first: "$name" },
      topMarks: { $first: "$marks" }
    }
  }
]);
```

## Sorting and Filtering

### Sort Options
```javascript
// Sort by marks descending
.sort({ marks: -1 })

// Sort by name ascending
.sort({ name: 1 })

// Multiple sorting
.sort({ department: 1, marks: -1 })
```

### Filter Examples
```javascript
// Equality
{ grade: "A" }

// Comparison
{ marks: { $gte: 90 } }

// Range
{ marks: { $gte: 70, $lte: 90 } }

// Text search
{ name: { $regex: "^A" } }

// AND condition
{ $and: [{ grade: "A" }, { marks: { $gte: 90 } }] }
```

## Indexing for Performance

```javascript
// Single field index
db.students.createIndex({ email: 1 });

// Composite index
db.students.createIndex({ department: 1, grade: 1 });

// View indexes
db.students.getIndexes();
```

## Best Practices

1. **Security**
   - Never commit connection strings
   - Use environment variables for credentials
   - Whitelist only necessary IP addresses

2. **Performance**
   - Create indexes on frequently queried fields
   - Use projection to limit fields returned
   - Use batch operations for multiple inserts

3. **Error Handling**
   - Always use try-catch blocks
   - Close connections properly
   - Handle async operations correctly

4. **Data Validation**
   - Validate data before insertion
   - Use MongoDB schema validation
   - Implement proper error messages

## Connection String Format

```
mongodb+srv://username:password@cluster-name.mongodb.net/dbname?retryWrites=true&w=majority
```

**Parameters:**
- `username` - Database user
- `password` - User password
- `cluster-name` - Your cluster name
- `dbname` - Database name

## Environment Setup

Create `.env` file in your project:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/studentdb
MONGODB_USERNAME=your_username
MONGODB_PASSWORD=your_password
```

Then load in Node.js:
```javascript
require('dotenv').config();
const uri = process.env.MONGODB_URI;
```

## Learning Objectives
✓ Set up MongoDB Atlas cloud database
✓ Connect from Node.js applications
✓ Perform all CRUD operations
✓ Implement sorting and filtering
✓ Use aggregation pipelines
✓ Create efficient indexes
✓ Handle async operations
✓ Manage database connections

## Troubleshooting

**Connection failed:** Check whitelist IP addresses and credentials

**Operation timeout:** Check network connection and cluster availability

**Command not found:** Ensure MongoDB tools are installed and in PATH

**Permission denied:** Verify database user has correct role/permissions

## Resources
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [MongoDB Node.js Driver](https://docs.mongodb.com/drivers/node)
- [MongoDB Shell Documentation](https://docs.mongodb.com/mongodb-shell)
