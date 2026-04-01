# Experiment 8: MongoDB CRUD Operations

## Overview
This experiment demonstrates complete CRUD (Create, Read, Update, Delete) operations in MongoDB using the EvaluationBoard database.

## Database: EvaluationBoard

### Collection: evaluations
Stores employee evaluation records with performance ratings.

## Operations Covered

### 1. CREATE (C)
Methods for adding data to the database:
- **insertOne()** - Insert a single document
- **insertMany()** - Insert multiple documents at once

```javascript
// Single insert
db.evaluations.insertOne({ /* document */ });

// Multiple insert
db.evaluations.insertMany([{ /* doc1 */ }, { /* doc2 */ }]);
```

### 2. READ (R)
Methods for retrieving data from the database:
- **find()** - Retrieve multiple documents
- **findOne()** - Retrieve single document
- **countDocuments()** - Count matching documents

```javascript
// Find all
db.evaluations.find();

// Find with filter
db.evaluations.find({ department: "Engineering" });

// Find with projection
db.evaluations.find(
  { rating: "Excellent" },
  { employeeName: 1, rating: 1 }
);
```

### 3. UPDATE (U)
Methods for modifying existing data:
- **updateOne()** - Update single document
- **updateMany()** - Update multiple documents
- **$set** - Set field values
- **$inc** - Increment numeric values
- **$push** - Add to array

```javascript
// Simple update
db.evaluations.updateOne(
  { _id: 1 },
  { $set: { rating: "Outstanding" } }
);

// Update nested field
db.evaluations.updateOne(
  { _id: 1 },
  { $set: { "performances.technical": 9 } }
);

// Increment
db.evaluations.updateOne(
  { _id: 1 },
  { $inc: { "performances.communication": 1 } }
);
```

### 4. DELETE (D)
Methods for removing data:
- **deleteOne()** - Delete single document
- **deleteMany()** - Delete multiple documents

```javascript
// Delete single document
db.evaluations.deleteOne({ _id: 1 });

// Delete multiple documents
db.evaluations.deleteMany({ rating: "Average" });
```

---

## Query Filters & Operators

### Comparison Operators
- `$eq` - Equal
- `$ne` - Not equal
- `$gt` - Greater than
- `$gte` - Greater than or equal
- `$lt` - Less than
- `$lte` - Less than or equal

### Logical Operators
- `$and` - AND condition
- `$or` - OR condition

### Pattern Matching
- `$regex` - Regular expression matching
- `$in` - Value in array
- `$nin` - Value not in array

### Examples
```javascript
// Greater than
db.evaluations.find({ "performances.technical": { $gte: 8 } });

// Multiple conditions (AND)
db.evaluations.find({
  $and: [
    { rating: "Excellent" },
    { department: "Engineering" }
  ]
});

// Pattern matching
db.evaluations.find({
  employeeName: { $regex: "^A" }
});
```

---

## Data Filtering Examples

### Filter by single field
```javascript
db.evaluations.find({ department: "Engineering" });
```

### Filter with multiple conditions
```javascript
db.evaluations.find({
  "performances.communication": { $gte: 8 },
  "performances.teamwork": { $gte: 8 }
});
```

### Filter and display specific fields (Projection)
```javascript
db.evaluations.find(
  { rating: "Excellent" },
  { employeeName: 1, rating: 1, _id: 0 }
);
```

### Delete selected documents
```javascript
// Delete specific employees
db.evaluations.deleteMany({ rating: "Average" });

// Delete from specific department
db.evaluations.deleteMany({ department: "Sales" });
```

---

## Aggregation Pipeline

The aggregation pipeline processes documents through stages:

```javascript
db.evaluations.aggregate([
  { $match: { department: "Engineering" } },      // Filter stage
  { $group: { _id: "$rating", count: { $sum: 1 } } },  // Group stage
  { $sort: { _id: 1 } }                            // Sort stage
]);
```

### Common Aggregation Stages
- `$match` - Filter documents
- `$group` - Group by field
- `$sort` - Sort results
- `$project` - Shape output documents
- `$limit` - Limit result count
- `$skip` - Skip documents
- `$avg` - Calculate average
- `$sum` - Calculate sum

---

## Sample Data Structure

```javascript
{
  _id: 1,
  employeeId: "EMP001",
  employeeName: "Alice Johnson",
  evaluationDate: Date,
  reviewer: "Manager A",
  department: "Engineering",
  performances: {
    communication: 8,
    teamwork: 9,
    technical: 9,
    leadership: 7,
    punctuality: 10
  },
  feedback: "Excellent technical skills",
  rating: "Excellent",
  status: "completed"
}
```

---

## Performance Optimization

### Indexes Created
```javascript
db.evaluations.createIndex({ employeeId: 1 });
db.evaluations.createIndex({ department: 1 });
db.evaluations.createIndex({ rating: 1 });
db.evaluations.createIndex({ "performances.technical": 1 });
```

### Why Indexes?
- Faster query execution
- Efficient filtering
- Better for large datasets
- Reduced database load

---

## Common CRUD Scenarios

### Scenario 1: Add new evaluation
```javascript
db.evaluations.insertOne({
  employeeId: "EMP005",
  employeeName: "New Employee",
  // ... other fields
});
```

### Scenario 2: Update employee rating
```javascript
db.evaluations.updateOne(
  { employeeId: "EMP001" },
  { $set: { rating: "Excellent", "performances.technical": 9 } }
);
```

### Scenario 3: Find top performers
```javascript
db.evaluations.find({
  "performances.technical": { $gte: 9 },
  "performances.leadership": { $gte: 9 }
});
```

### Scenario 4: Remove outdated evaluations
```javascript
db.evaluations.deleteMany({
  evaluationDate: { $lt: new Date("2024-01-01") }
});
```

---

## Best Practices

1. **Always use indexes** for frequently filtered fields
2. **Use projection** to limit data returned
3. **Validate data** before insertion
4. **Use batch operations** for multiple documents
5. **Handle errors** in production code
6. **Use transactions** for related updates
7. **Archive old data** instead of deleting

---

## File Contents
- **MongoCRUDOperations.js** - Complete CRUD operation examples
- **README.md** - This documentation file

## Learning Objectives
✓ Understand basic CRUD operations
✓ Learn MongoDB query syntax
✓ Practice filtering and projection
✓ Master update operators
✓ Implement deletion strategies
✓ Use aggregation pipelines
✓ Optimize with indexes
