# Experiment 7: MongoDB Database Design

## Overview
This experiment demonstrates MongoDB database design for two different scenarios:
1. Travel Agency System
2. Event Platform

## Database 1: Travel Agency System

### Collections:
1. **Customers**
   - Stores customer information
   - Fields: name, email, phone, address, createdAt, memberSince

2. **Bookings**
   - Travel bookings made by customers
   - Fields: customerId, destination, dates, packageType, totalPrice, status, activities

3. **Payments**
   - Payment records for bookings
   - Fields: bookingId, customerId, amount, paymentMethod, status, transactionId

### Sample Data Included:
- 3 customers
- 3 bookings (2 confirmed, 1 pending)
- 3 payments (2 completed, 1 pending)

### Key Relationships:
- Customers → Bookings (one-to-many)
- Bookings → Payments (one-to-one)

---

## Database 2: Event Platform

### Collections:
1. **Events**
   - Information about events/workshops
   - Fields: title, description, category, date, location, capacity, registeredCount, price, status, tags

2. **Feedback**
   - User feedback and reviews for events
   - Fields: eventId, userId, rating, comment, date, sentiment

### Sample Data Included:
- 3+ events (Web Workshop, Cloud Bootcamp, AI Conference)
- 5+ feedback entries with ratings

### Key Relationships:
- Events → Feedback (one-to-many)
- Users → Feedback (one-to-many)

---

## MongoDB Operations Covered

### INSERT Operations
- Insert single document: `db.collection.insertOne()`
- Insert multiple documents: `db.collection.insertMany()`

### RETRIEVE Operations
- Find all documents: `db.collection.find()`
- Find with filters: `db.collection.find({ field: value })`
- Find with comparison: `db.collection.find({ field: { $gte: value } })`

### UPDATE Operations
- Update single document: `db.collection.updateOne()`
- Update multiple documents: `db.collection.updateMany()`
- Set values: `{ $set: { field: value } }`
- Increment values: `{ $inc: { field: increment } }`

### AGGREGATION Queries
- Group by field
- Calculate averages
- Join collections with $lookup
- Filter results with $match

---

## Schema Design Best Practices

1. **Normalization vs Denormalization**
   - Use references for large, frequently updated data
   - Embed data for related information accessed together

2. **Indexing**
   - Index frequently queried fields
   - Create composite indexes for common query patterns

3. **Data Validation**
   - Use schema validation
   - Enforce data types

4. **Relationships**
   - Use foreign keys for references
   - Use arrays for one-to-many relationships

---

## How to Use These Schemas

### In MongoDB Compass:
1. Create database: `travel_agency` or `event_platform`
2. Copy and execute the JavaScript files
3. Explore collections and run queries

### In Node.js with MongoDB driver:
```javascript
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');

async function connect() {
  await client.connect();
  const db = client.db('travel_agency');
  
  // Run queries
  const customers = await db.collection('customers').find({}).toArray();
  console.log(customers);
}
```

### In MongoDB Shell:
```bash
mongosh
use travel_agency
db.customers.find()
```

---

## Queries Explained

### Query: Get customer booking history
```javascript
db.bookings.aggregate([
  { $match: { customerId: 1 } },
  { $lookup: {
      from: "payments",
      localField: "_id",
      foreignField: "bookingId",
      as: "paymentInfo"
    }
  }
]);
```
This retrieves all bookings for customer 1 with associated payment information.

### Query: Calculate average event rating
```javascript
db.feedback.aggregate([
  { $group: { _id: "$eventId", avgRating: { $avg: "$rating" }, count: { $sum: 1 } } }
]);
```
This groups feedback by event and calculates average rating and count per event.

---

## Performance Considerations

1. **Indexes Created:**
   - Email index on customers (fast lookups)
   - customerId index on bookings (fast filtering)
   - eventId and userId indexes on feedback

2. **Query Optimization:**
   - Use indexes for commonly filtered fields
   - Denormalize for frequently accessed related data
   - Use projection to limit fields returned

---

## Data Model Advantages

**Travel Agency:**
- Flexible schema for different package types
- Easy scalability for growing customer base
- Clear audit trail with timestamps

**Event Platform:**
- Support for tags and categories
- Feedback system with sentiment analysis potential
- Real-time registration counting

---

## File Contents

- **TravelAgencySchema.js**: Complete schema design for travel agency
- **EventPlatformSchema.js**: Complete schema design for event platform
- **README.md**: This documentation file

## Learning Objectives
✓ Understand MongoDB collection design
✓ Learn document structure and validation
✓ Practice inserting and querying data
✓ Implement relationships between collections
✓ Use aggregation pipeline for complex queries
✓ Optimize with proper indexing
