// Experiment 8: MongoDB CRUD Operations
// Complete examples of Create, Read, Update, Delete operations

// ============================================
// DATABASE: EvaluationBoard
// COLLECTION: evaluations
// ============================================

// 1. CREATE OPERATIONS
// ============================================

// Create single evaluation record
db.evaluations.insertOne({
  _id: 1,
  employeeId: "EMP001",
  employeeName: "Alice Johnson",
  evaluationDate: new Date("2024-04-15"),
  reviewer: "Manager A",
  department: "Engineering",
  performances: {
    communication: 8,
    teamwork: 9,
    technical: 9,
    leadership: 7,
    punctuality: 10
  },
  feedback: "Excellent technical skills and strong team player",
  rating: "Excellent",
  status: "completed"
});

// Create multiple evaluation records
db.evaluations.insertMany([
  {
    _id: 2,
    employeeId: "EMP002",
    employeeName: "Bob Smith",
    evaluationDate: new Date("2024-04-16"),
    reviewer: "Manager B",
    department: "Marketing",
    performances: {
      communication: 8,
      teamwork: 7,
      technical: 6,
      leadership: 8,
      punctuality: 8
    },
    feedback: "Good communication skills, needs improvement in technical knowledge",
    rating: "Good",
    status: "completed"
  },
  {
    _id: 3,
    employeeId: "EMP003",
    employeeName: "Carol Williams",
    evaluationDate: new Date("2024-04-17"),
    reviewer: "Manager C",
    department: "Sales",
    performances: {
      communication: 9,
      teamwork: 8,
      technical: 7,
      leadership: 9,
      punctuality: 9
    },
    feedback: "Strong leader with excellent communication",
    rating: "Excellent",
    status: "completed"
  },
  {
    _id: 4,
    employeeId: "EMP004",
    employeeName: "David Brown",
    evaluationDate: new Date("2024-04-18"),
    reviewer: "Manager A",
    department: "Engineering",
    performances: {
      communication: 5,
      teamwork: 6,
      technical: 8,
      leadership: 5,
      punctuality: 7
    },
    feedback: "Good technical skills but needs improvement in soft skills",
    rating: "Average",
    status: "completed"
  }
]);

// 2. READ OPERATIONS
// ============================================

// Retrieve all evaluations
db.evaluations.find();

// Retrieve evaluations from specific department
db.evaluations.find({ department: "Engineering" });

// Retrieve evaluations with specific rating
db.evaluations.find({ rating: "Excellent" });

// Retrieve evaluations with filter and projection
db.evaluations.find(
  { department: "Engineering" },
  { employeeName: 1, rating: 1, _id: 0 }
);

// Retrieve specific evaluation by ID
db.evaluations.findOne({ _id: 1 });

// Retrieve evaluations with performance threshold
db.evaluations.find({
  "performances.technical": { $gte: 8 }
});

// Count evaluations by rating
db.evaluations.countDocuments({ rating: "Excellent" });

// Get evaluations sorted by rating (descending)
db.evaluations.aggregate([
  { $sort: { evaluationDate: -1 } },
  { $limit: 3 }
]);

// 3. UPDATE OPERATIONS
// ============================================

// Update single field
db.evaluations.updateOne(
  { _id: 1 },
  { $set: { rating: "Outstanding" } }
);

// Update multiple fields
db.evaluations.updateOne(
  { _id: 2 },
  {
    $set: {
      rating: "Excellent",
      feedback: "Improved significantly",
      "performances.technical": 8
    }
  }
);

// Update array element (nested object)
db.evaluations.updateOne(
  { _id: 3 },
  { $set: { "performances.leadership": 10 } }
);

// Update multiple documents (all employees in Engineering)
db.evaluations.updateMany(
  { department: "Engineering" },
  { $set: { feedback: "Performance review updated", status: "reviewed" } }
);

// Increment numeric values
db.evaluations.updateOne(
  { _id: 4 },
  { $inc: { "performances.communication": 2 } }
);

// Push new item to array (if array field exists)
db.evaluations.updateOne(
  { _id: 1 },
  { $push: { comments: "Good progress in quarter 2" } }
);

// Add new field to document
db.evaluations.updateOne(
  { _id: 1 },
  { $set: { promotionEligible: true, yearsOfService: 5 } }
);

// 4. DELETE OPERATIONS
// ============================================

// Delete single document
db.evaluations.deleteOne({ _id: 4 });

// Delete multiple documents by criteria
db.evaluations.deleteMany({ rating: "Average" });

// Delete all evaluations from specific department
db.evaluations.deleteMany({ department: "Sales" });

// Delete with complex filter
db.evaluations.deleteOne({
  "performances.communication": { $lt: 5 }
});

// 5. COMPLEX QUERIES & FILTERING
// ============================================

// Find employees with all performance ratings >= 8
db.evaluations.find({
  "performances.communication": { $gte: 8 },
  "performances.teamwork": { $gte: 8 },
  "performances.technical": { $gte: 8 }
});

// Find evaluations with multiple conditions
db.evaluations.find({
  $and: [
    { rating: "Excellent" },
    { evaluationDate: { $gte: new Date("2024-04-15") } }
  ]
});

// Find employees NOT in Engineering department
db.evaluations.find({
  department: { $ne: "Engineering" }
});

// Find with regex pattern
db.evaluations.find({
  employeeName: { $regex: "^A" }
});

// 6. AGGREGATION QUERIES
// ============================================

// Group by rating and count
db.evaluations.aggregate([
  { $group: { _id: "$rating", count: { $sum: 1 } } }
]);

// Group by department and average technical rating
db.evaluations.aggregate([
  { $group: {
      _id: "$department",
      avgTechnical: { $avg: "$performances.technical" },
      count: { $sum: 1 }
    }
  }
]);

// Get all data sorted by evaluation date (newest first)
db.evaluations.aggregate([
  { $sort: { evaluationDate: -1 } }
]);

// Find high performers (all skills >= 8)
db.evaluations.aggregate([
  { $project: {
      employeeName: 1,
      avgPerformance: {
        $avg: [
          "$performances.communication",
          "$performances.teamwork",
          "$performances.technical",
          "$performances.leadership",
          "$performances.punctuality"
        ]
      }
    }
  },
  { $match: { avgPerformance: { $gte: 8 } } }
]);

// 7. INDEXES FOR PERFORMANCE
// ============================================

db.evaluations.createIndex({ employeeId: 1 });
db.evaluations.createIndex({ department: 1 });
db.evaluations.createIndex({ rating: 1 });
db.evaluations.createIndex({ evaluationDate: 1 });
db.evaluations.createIndex({ "performances.technical": 1 });

// ============================================
// SUMMARY OF OPERATIONS
// ============================================
// CREATE: insertOne, insertMany
// READ: find, findOne, count
// UPDATE: updateOne, updateMany, $set, $inc, $push
// DELETE: deleteOne, deleteMany
// FILTER: $eq, $ne, $gt, $gte, $lt, $lte, $and, $or, $regex
// AGGREGATION: $group, $sort, $project, $match, $avg, $sum
