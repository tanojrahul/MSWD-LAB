// Experiment 9: MongoDB Atlas Connection and CRUD Operations
// Node.js program to connect to MongoDB Atlas

const { MongoClient } = require('mongodb');

// MongoDB Atlas Connection String
// Format: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

const MONGODB_URI = 'mongodb+srv://username:password@cluster0.mongodb.net/studentdb?retryWrites=true&w=majority';
const client = new MongoClient(MONGODB_URI);

// ============================================
// CONNECT TO MONGODB ATLAS
// ============================================

async function connectDatabase() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('✓ Successfully connected to MongoDB Atlas');
    return client;
  } catch (error) {
    console.error('Connection error:', error);
    throw error;
  }
}

// ============================================
// CREATE OPERATIONS
// ============================================

async function createStudent(db, studentData) {
  try {
    const result = await db.collection('students').insertOne(studentData);
    console.log('✓ Student created:', result.insertedId);
    return result;
  } catch (error) {
    console.error('Create error:', error);
  }
}

async function createMultipleStudents(db, studentsData) {
  try {
    const result = await db.collection('students').insertMany(studentsData);
    console.log('✓ Students created:', result.insertedCount);
    return result;
  } catch (error) {
    console.error('Batch create error:', error);
  }
}

// ============================================
// READ OPERATIONS
// ============================================

async function getAllStudents(db) {
  try {
    const students = await db.collection('students').find({}).toArray();
    console.log('✓ Retrieved', students.length, 'students');
    return students;
  } catch (error) {
    console.error('Read error:', error);
  }
}

async function getStudentById(db, studentId) {
  try {
    const student = await db.collection('students').findOne({ _id: studentId });
    console.log('✓ Retrieved student:', student);
    return student;
  } catch (error) {
    console.error('Read error:', error);
  }
}

async function getStudentsByGrade(db, grade) {
  try {
    const students = await db.collection('students')
      .find({ grade: grade })
      .sort({ marks: -1 })
      .toArray();
    console.log('✓ Retrieved', students.length, 'students with grade', grade);
    return students;
  } catch (error) {
    console.error('Read error:', error);
  }
}

async function getSortedStudents(db, sortBy = 'name') {
  try {
    const sortObject = {};
    sortObject[sortBy] = 1;
    
    const students = await db.collection('students')
      .find({})
      .sort(sortObject)
      .toArray();
    console.log('✓ Retrieved students sorted by', sortBy);
    return students;
  } catch (error) {
    console.error('Sort error:', error);
  }
}

async function getFilteredStudents(db, filter) {
  try {
    const students = await db.collection('students')
      .find(filter)
      .toArray();
    console.log('✓ Retrieved', students.length, 'filtered students');
    return students;
  } catch (error) {
    console.error('Filter error:', error);
  }
}

// ============================================
// UPDATE OPERATIONS
// ============================================

async function updateStudent(db, studentId, updateData) {
  try {
    const result = await db.collection('students').updateOne(
      { _id: studentId },
      { $set: updateData }
    );
    console.log('✓ Student updated:', result.modifiedCount, 'document(s)');
    return result;
  } catch (error) {
    console.error('Update error:', error);
  }
}

async function updateMultipleStudents(db, filter, updateData) {
  try {
    const result = await db.collection('students').updateMany(
      filter,
      { $set: updateData }
    );
    console.log('✓ Updated', result.modifiedCount, 'students');
    return result;
  } catch (error) {
    console.error('Batch update error:', error);
  }
}

// ============================================
// DELETE OPERATIONS
// ============================================

async function deleteStudent(db, studentId) {
  try {
    const result = await db.collection('students').deleteOne({ _id: studentId });
    console.log('✓ Deleted', result.deletedCount, 'student');
    return result;
  } catch (error) {
    console.error('Delete error:', error);
  }
}

async function deleteMultipleStudents(db, filter) {
  try {
    const result = await db.collection('students').deleteMany(filter);
    console.log('✓ Deleted', result.deletedCount, 'students');
    return result;
  } catch (error) {
    console.error('Batch delete error:', error);
  }
}

// ============================================
// AGGREGATION OPERATIONS
// ============================================

async function getStudentStatistics(db) {
  try {
    const stats = await db.collection('students').aggregate([
      {
        $group: {
          _id: '$grade',
          averageMarks: { $avg: '$marks' },
          count: { $sum: 1 },
          maxMarks: { $max: '$marks' },
          minMarks: { $min: '$marks' }
        }
      },
      { $sort: { averageMarks: -1 } }
    ]).toArray();
    
    console.log('✓ Retrieved statistics');
    return stats;
  } catch (error) {
    console.error('Aggregation error:', error);
  }
}

// ============================================
// MAIN FUNCTION
// ============================================

async function main() {
  let connection;
  try {
    connection = await connectDatabase();
    const db = connection.db('studentdb');
    
    // Create collection if it doesn't exist
    await db.createCollection('students').catch(() => {});
    
    // STEP 1: Create students
    console.log('\n=== CREATE OPERATIONS ===');
    const newStudents = [
      {
        _id: 1,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        rollNo: '101',
        grade: 'A',
        marks: 95,
        department: 'CSE',
        createdAt: new Date()
      },
      {
        _id: 2,
        name: 'Bob Smith',
        email: 'bob@example.com',
        rollNo: '102',
        grade: 'B',
        marks: 75,
        department: 'ECE',
        createdAt: new Date()
      },
      {
        _id: 3,
        name: 'Carol Davis',
        email: 'carol@example.com',
        rollNo: '103',
        grade: 'A',
        marks: 92,
        department: 'CSE',
        createdAt: new Date()
      }
    ];
    
    await createMultipleStudents(db, newStudents);
    
    // STEP 2: Read all students
    console.log('\n=== READ OPERATIONS ===');
    const allStudents = await getAllStudents(db);
    console.log('All students:', JSON.stringify(allStudents, null, 2));
    
    // STEP 3: Read with filters
    console.log('\n=== FILTERED READS ===');
    const aGradeStudents = await getStudentsByGrade(db, 'A');
    const sortedByMarks = await getSortedStudents(db, 'marks');
    
    // STEP 4: Update student
    console.log('\n=== UPDATE OPERATIONS ===');
    await updateStudent(db, 1, { marks: 98, grade: 'A+' });
    
    // STEP 5: Get statistics
    console.log('\n=== AGGREGATION OPERATIONS ===');
    const statistics = await getStudentStatistics(db);
    console.log('Statistics:', JSON.stringify(statistics, null, 2));
    
    // STEP 6: Final read
    console.log('\n=== FINAL DATA ===');
    const finalStudents = await getAllStudents(db);
    
    console.log('\n✓ All operations completed successfully');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (connection) {
      await connection.close();
      console.log('\n✓ Connection closed');
    }
  }
}

// Run main function
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  connectDatabase,
  createStudent,
  createMultipleStudents,
  getAllStudents,
  getStudentById,
  getStudentsByGrade,
  getSortedStudents,
  getFilteredStudents,
  updateStudent,
  updateMultipleStudents,
  deleteStudent,
  deleteMultipleStudents,
  getStudentStatistics
};
