// Experiment 9: MongoDB Shell Commands for CRUD Operations
// These commands work in MongoDB Shell (mongosh) or MongoDB Atlas Web Interface

// ============================================
// CONNECT TO MONGODB ATLAS IN SHELL
// ============================================

// In MongoDB Shell/mongosh, connect using:
// mongosh "mongodb+srv://username:password@cluster.mongodb.net/studentdb"

// ============================================
// SWITCH TO DATABASE
// ============================================

use studentdb;

// ============================================
// CREATE (INSERT) OPERATIONS
// ============================================

// Insert single document
db.students.insertOne({
  _id: 1,
  name: "Alice Johnson",
  email: "alice@example.com",
  rollNo: "101",
  grade: "A",
  marks: 95,
  department: "Computer Science",
  enrollmentDate: new Date(),
  active: true
});

// Insert multiple documents
db.students.insertMany([
  {
    _id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    rollNo: "102",
    grade: "B",
    marks: 75,
    department: "Electronics",
    enrollmentDate: new Date(),
    active: true
  },
  {
    _id: 3,
    name: "Carol Williams",
    email: "carol@example.com",
    rollNo: "103",
    grade: "A",
    marks: 92,
    department: "Computer Science",
    enrollmentDate: new Date(),
    active: true
  },
  {
    _id: 4,
    name: "David Brown",
    email: "david@example.com",
    rollNo: "104",
    grade: "C",
    marks: 65,
    department: "Mechanical",
    enrollmentDate: new Date(),
    active: false
  }
]);

// ============================================
// READ (RETRIEVE) OPERATIONS
// ============================================

// Retrieve all documents
db.students.find();

// Retrieve with pretty formatting
db.students.find().pretty();

// Retrieve specific student by ID
db.students.findOne({ _id: 1 });

// Retrieve students with grade "A"
db.students.find({ grade: "A" });

// Retrieve students from Computer Science department
db.students.find({ department: "Computer Science" });

// Retrieve with multiple conditions
db.students.find({
  $and: [
    { marks: { $gte: 90 } },
    { active: true }
  ]
});

// Retrieve with projection (specific fields only)
db.students.find(
  { grade: "A" },
  { name: 1, marks: 1, _id: 0 }
);

// ============================================
// SORTING AND FILTERING
// ============================================

// Sort by marks (descending)
db.students.find().sort({ marks: -1 });

// Sort by name (ascending)
db.students.find().sort({ name: 1 });

// Sort by marks descending, limit to 3
db.students.find().sort({ marks: -1 }).limit(3);

// Count total students
db.students.countDocuments();

// Count students with grade "A"
db.students.countDocuments({ grade: "A" });

// ============================================
// UPDATE OPERATIONS
// ============================================

// Update single document
db.students.updateOne(
  { _id: 1 },
  { $set: { marks: 98, grade: "A+" } }
);

// Update multiple documents
db.students.updateMany(
  { grade: "B" },
  { $set: { grade: "B+" } }
);

// Increment marks
db.students.updateOne(
  { _id: 2 },
  { $inc: { marks: 5 } }
);

// Update nested field
db.students.updateOne(
  { _id: 3 },
  { $set: { "details.semester": 4 } }
);

// ============================================
// DELETE OPERATIONS
// ============================================

// Delete single document
db.students.deleteOne({ _id: 4 });

// Delete multiple documents
db.students.deleteMany({ grade: "C" });

// Delete inactive students
db.students.deleteMany({ active: false });

// ============================================
// AGGREGATION OPERATIONS
// ============================================

// Group by grade and count students
db.students.aggregate([
  { $group: { _id: "$grade", count: { $sum: 1 } } }
]);

// Group by department and calculate average marks
db.students.aggregate([
  { $group: {
      _id: "$department",
      averageMarks: { $avg: "$marks" },
      studentCount: { $sum: 1 }
    }
  }
]);

// Sort students by marks in descending order
db.students.aggregate([
  { $sort: { marks: -1 } },
  { $project: { name: 1, marks: 1, _id: 0 } }
]);

// Find top performer per department
db.students.aggregate([
  { $sort: { marks: -1 } },
  { $group: {
      _id: "$department",
      topStudent: { $first: "$name" },
      topMarks: { $first: "$marks" }
    }
  }
]);

// ============================================
// INDEX CREATION FOR PERFORMANCE
// ============================================

// Create index on email
db.students.createIndex({ email: 1 });

// Create index on grade
db.students.createIndex({ grade: 1 });

// Create index on marks
db.students.createIndex({ marks: 1 });

// Create composite index (multiple fields)
db.students.createIndex({ department: 1, grade: 1 });

// List all indexes
db.students.getIndexes();

// ============================================
// DATABASE OPERATIONS
// ============================================

// Show all databases
show databases;

// Show all collections in current database
show collections;

// Get database statistics
db.stats();

// Get collection statistics
db.students.stats();

// Drop entire collection
db.students.drop();

// Drop entire database
db.dropDatabase();

// ============================================
// USEFUL QUERIES
// ============================================

// Find students with marks between 70 and 90
db.students.find({
  marks: { $gte: 70, $lte: 90 }
});

// Find students whose name starts with 'A'
db.students.find({
  name: { $regex: "^A" }
});

// Find active students in CSE department sorted by marks
db.students.find({
  active: true,
  department: "Computer Science"
}).sort({ marks: -1 });

// Update multiple fields with current timestamp
db.students.updateMany(
  { active: true },
  { $set: { lastUpdated: new Date() } }
);

// Remove a specific field from all documents
db.students.updateMany({}, { $unset: { tempField: "" } });
