// Experiment 7: MongoDB Event Platform Database Design
// Collections: Events and Feedback

// ============================================
// EVENTS Collection
// ============================================

db.createCollection("events");
db.events.insertMany([
  {
    _id: 1,
    title: "Web Development Workshop",
    description: "Learn modern web development with React and Node.js",
    category: "Technology",
    date: new Date("2024-05-15"),
    time: "10:00 AM",
    location: "Tech Hub, San Francisco",
    capacity: 50,
    registeredCount: 35,
    organizer: "Tech Academy",
    price: 49.99,
    image: "web-workshop.jpg",
    tags: ["React", "JavaScript", "Web Development"],
    status: "upcoming",
    createdAt: new Date("2024-04-01")
  },
  {
    _id: 2,
    title: "Cloud Computing Bootcamp",
    description: "Intensive training on AWS and Azure cloud platforms",
    category: "Cloud",
    date: new Date("2024-06-01"),
    time: "9:00 AM",
    location: "Online",
    capacity: 100,
    registeredCount: 78,
    organizer: "CloudLearn",
    price: 199.99,
    image: "cloud-bootcamp.jpg",
    tags: ["AWS", "Azure", "Cloud"],
    status: "upcoming",
    createdAt: new Date("2024-04-05")
  },
  {
    _id: 3,
    title: "AI and Machine Learning Conference",
    description: "Discover the latest trends in AI and ML",
    category: "AI",
    date: new Date("2024-07-10"),
    time: "2:00 PM",
    location: "Convention Center, NYC",
    capacity: 200,
    registeredCount: 145,
    organizer: "AI Experts",
    price: 99.99,
    image: "ai-conference.jpg",
    tags: ["AI", "Machine Learning", "Python"],
    status: "upcoming",
    createdAt: new Date("2024-04-10")
  }
]);

// ============================================
// FEEDBACK Collection
// ============================================

db.createCollection("feedback");
db.feedback.insertMany([
  {
    _id: 101,
    eventId: 1,
    userId: "user123",
    userName: "John Doe",
    rating: 5,
    comment: "Excellent workshop! Very informative and well-structured.",
    date: new Date("2024-05-16"),
    helpful: 12,
    sentiment: "positive"
  },
  {
    _id: 102,
    eventId: 1,
    userId: "user456",
    userName: "Jane Smith",
    rating: 4,
    comment: "Good content but pace was a bit fast.",
    date: new Date("2024-05-17"),
    helpful: 8,
    sentiment: "positive"
  },
  {
    _id: 103,
    eventId: 2,
    userId: "user789",
    userName: "Bob Johnson",
    rating: 5,
    comment: "Best cloud training I've attended. Highly recommended!",
    date: new Date("2024-06-02"),
    helpful: 15,
    sentiment: "positive"
  },
  {
    _id: 104,
    eventId: 2,
    userId: "user101",
    userName: "Alice Brown",
    rating: 3,
    comment: "Decent bootcamp, but could use more hands-on labs.",
    date: new Date("2024-06-03"),
    helpful: 6,
    sentiment: "neutral"
  },
  {
    _id: 105,
    eventId: 3,
    userId: "user202",
    userName: "Charlie Wilson",
    rating: 4,
    comment: "Great conference with excellent speakers.",
    date: new Date("2024-07-11"),
    helpful: 10,
    sentiment: "positive"
  }
]);

// ============================================
// QUERIES TO INSERT, RETRIEVE, UPDATE DATA
// ============================================

// 1. INSERT new event
db.events.insertOne({
  _id: 4,
  title: "Python Advanced Techniques",
  description: "Master advanced Python programming",
  category: "Programming",
  date: new Date("2024-08-05"),
  time: "6:00 PM",
  location: "Tech Hub, Austin",
  capacity: 40,
  registeredCount: 28,
  organizer: "Python Masters",
  price: 79.99,
  tags: ["Python", "Advanced"],
  status: "upcoming",
  createdAt: new Date("2024-04-15")
});

// 2. INSERT new feedback
db.feedback.insertOne({
  _id: 106,
  eventId: 3,
  userId: "user303",
  userName: "Diana Davis",
  rating: 5,
  comment: "Amazing AI conference! Learned so much.",
  date: new Date("2024-07-12"),
  helpful: 9,
  sentiment: "positive"
});

// 3. RETRIEVE all events
db.events.find();

// 4. RETRIEVE events by category
db.events.find({ category: "Cloud" });

// 5. RETRIEVE feedback for specific event
db.feedback.find({ eventId: 1 });

// 6. RETRIEVE high-rated feedback (rating >= 4)
db.feedback.find({ rating: { $gte: 4 } });

// 7. UPDATE event registration count
db.events.updateOne(
  { _id: 1 },
  { $set: { registeredCount: 40 } }
);

// 8. UPDATE event status
db.events.updateOne(
  { _id: 1 },
  { $set: { status: "completed" } }
);

// 9. UPDATE multiple feedback helpfulness count
db.feedback.updateMany(
  { eventId: 1 },
  { $inc: { helpful: 1 } }
);

// 10. AGGREGATE - Average rating per event
db.feedback.aggregate([
  { $group: { _id: "$eventId", avgRating: { $avg: "$rating" }, count: { $sum: 1 } } }
]);

// 11. AGGREGATE - Event with feedback details
db.events.aggregate([
  { $lookup: {
      from: "feedback",
      localField: "_id",
      foreignField: "eventId",
      as: "feedbackList"
    }
  }
]);

// 12. Find events with positive feedback count
db.feedback.aggregate([
  { $match: { sentiment: "positive" } },
  { $group: { _id: "$eventId", positiveCount: { $sum: 1 } } }
]);

// ============================================
// INDEXES
// ============================================
db.events.createIndex({ category: 1 });
db.events.createIndex({ date: 1 });
db.events.createIndex({ status: 1 });
db.feedback.createIndex({ eventId: 1 });
db.feedback.createIndex({ userId: 1 });
db.feedback.createIndex({ rating: 1 });
db.feedback.createIndex({ date: 1 });
