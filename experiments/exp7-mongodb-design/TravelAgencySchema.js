// Experiment 7: MongoDB Database Design
// Travel Agency System with Customers, Bookings, and Payments

// ============================================
// DATABASE SCHEMA DESIGN
// ============================================

// 1. CUSTOMERS Collection
db.createCollection("customers");
db.customers.insertMany([
  {
    _id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "555-0001",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001"
    },
    createdAt: new Date("2024-01-15"),
    memberSince: new Date("2023-06-01")
  },
  {
    _id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "555-0002",
    address: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001"
    },
    createdAt: new Date("2024-02-20"),
    memberSince: new Date("2023-09-15")
  },
  {
    _id: 3,
    name: "Carol Williams",
    email: "carol@example.com",
    phone: "555-0003",
    address: {
      street: "789 Pine Rd",
      city: "Chicago",
      state: "IL",
      zipCode: "60601"
    },
    createdAt: new Date("2024-03-10"),
    memberSince: new Date("2024-01-01")
  }
]);

// 2. BOOKINGS Collection
db.createCollection("bookings");
db.bookings.insertMany([
  {
    _id: 101,
    customerId: 1,
    destination: "Paris, France",
    departureDate: new Date("2024-06-15"),
    returnDate: new Date("2024-06-22"),
    duration: 7,
    numberOfPeople: 2,
    packageType: "Luxury",
    totalPrice: 4500,
    status: "confirmed",
    activities: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise"],
    bookingDate: new Date("2024-04-01"),
    hotel: {
      name: "Le Marais Hotel",
      stars: 5,
      nights: 7
    }
  },
  {
    _id: 102,
    customerId: 2,
    destination: "Tokyo, Japan",
    departureDate: new Date("2024-07-20"),
    returnDate: new Date("2024-08-03"),
    duration: 14,
    numberOfPeople: 1,
    packageType: "Premium",
    totalPrice: 5800,
    status: "confirmed",
    activities: ["Senso-ji Temple", "Shibuya Crossing", "Mount Fuji"],
    bookingDate: new Date("2024-04-05"),
    hotel: {
      name: "Shinjuku Grand Hotel",
      stars: 4,
      nights: 14
    }
  },
  {
    _id: 103,
    customerId: 1,
    destination: "Bali, Indonesia",
    departureDate: new Date("2024-09-01"),
    returnDate: new Date("2024-09-10"),
    duration: 9,
    numberOfPeople: 3,
    packageType: "Standard",
    totalPrice: 3200,
    status: "pending",
    activities: ["Beach Relaxation", "Temples", "Mountain Trekking"],
    bookingDate: new Date("2024-04-10"),
    hotel: {
      name: "Bali Paradise Resort",
      stars: 4,
      nights: 9
    }
  }
]);

// 3. PAYMENTS Collection
db.createCollection("payments");
db.payments.insertMany([
  {
    _id: 1001,
    bookingId: 101,
    customerId: 1,
    amount: 4500,
    currency: "USD",
    paymentDate: new Date("2024-04-01"),
    paymentMethod: "Credit Card",
    status: "completed",
    transactionId: "TXN-CC-20240401-001",
    cardLast4: "4242"
  },
  {
    _id: 1002,
    bookingId: 102,
    customerId: 2,
    amount: 5800,
    currency: "USD",
    paymentDate: new Date("2024-04-05"),
    paymentMethod: "Bank Transfer",
    status: "completed",
    transactionId: "TXN-BT-20240405-001",
    bankAccount: "****5432"
  },
  {
    _id: 1003,
    bookingId: 103,
    customerId: 1,
    amount: 1600,
    currency: "USD",
    paymentDate: new Date("2024-04-10"),
    paymentMethod: "Credit Card",
    status: "pending",
    transactionId: "TXN-CC-20240410-001",
    cardLast4: "5555"
  }
]);

// ============================================
// RELATIONSHIPS & QUERIES
// ============================================

// Query 1: Get all bookings for a specific customer
db.bookings.find({ customerId: 1 });

// Query 2: Get all confirmed bookings
db.bookings.find({ status: "confirmed" });

// Query 3: Get payment details for a booking
db.payments.find({ bookingId: 101 });

// Query 4: Get total revenue from completed payments
db.payments.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }
]);

// Query 5: Get customer booking history
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

// ============================================
// INDEXES for Performance
// ============================================
db.customers.createIndex({ email: 1 });
db.bookings.createIndex({ customerId: 1 });
db.bookings.createIndex({ status: 1 });
db.payments.createIndex({ bookingId: 1 });
db.payments.createIndex({ customerId: 1 });

// ============================================
// COLLECTION STATISTICS
// ============================================
// Customers: 3 documents
// Bookings: 3 documents with 2 confirmed, 1 pending
// Payments: 3 documents with 2 completed, 1 pending
// Total Revenue: $10,300 (from completed payments)
