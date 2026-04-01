// Experiment 17: GraphQL Server
// Apollo GraphQL with queries and mutations

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ============================================
// SAMPLE DATA
// ============================================

let students = [
  { id: 1, name: 'Alice', email: 'alice@univ.edu', grade: 'A', courses: [1, 2] },
  { id: 2, name: 'Bob', email: 'bob@univ.edu', grade: 'B', courses: [2, 3] },
  { id: 3, name: 'Charlie', email: 'charlie@univ.edu', grade: 'A', courses: [1, 3] }
];

let courses = [
  { id: 1, title: 'React Basics', instructor: 'John', credits: 3 },
  { id: 2, title: 'Node.js API', instructor: 'Jane', credits: 4 },
  { id: 3, title: 'GraphQL', instructor: 'Bob', credits: 3 }
];

// ============================================
// GRAPHQL SCHEMA
// ============================================

const typeDefs = gql`
  type Student {
    id: ID!
    name: String!
    email: String!
    grade: String!
    courses: [Course!]!
    courseCount: Int!
  }

  type Course {
    id: ID!
    title: String!
    instructor: String!
    credits: Int!
    students: [Student!]!
  }

  type Query {
    students: [Student!]!
    student(id: ID!): Student
    studentsByGrade(grade: String!): [Student!]!
    courses: [Course!]!
    course(id: ID!): Course
  }

  type Mutation {
    createStudent(name: String!, email: String!, grade: String!): Student!
    updateStudent(id: ID!, grade: String): Student
    deleteStudent(id: ID!): Boolean!
    createCourse(title: String!, instructor: String!, credits: Int!): Course!
    enrollStudent(studentId: ID!, courseId: ID!): Student!
  }
`;

// ============================================
// GRAPHQL RESOLVERS
// ============================================

const resolvers = {
  Query: {
    students: () => students,

    student: (_, { id }) => {
      return students.find(s => s.id === parseInt(id));
    },

    studentsByGrade: (_, { grade }) => {
      return students.filter(s => s.grade === grade);
    },

    courses: () => courses,

    course: (_, { id }) => {
      return courses.find(c => c.id === parseInt(id));
    }
  },

  Mutation: {
    createStudent: (_, { name, email, grade }) => {
      const newStudent = {
        id: Math.max(...students.map(s => s.id), 0) + 1,
        name,
        email,
        grade,
        courses: []
      };
      students.push(newStudent);
      return newStudent;
    },

    updateStudent: (_, { id, grade }) => {
      const student = students.find(s => s.id === parseInt(id));
      if (student && grade) {
        student.grade = grade;
      }
      return student;
    },

    deleteStudent: (_, { id }) => {
      const index = students.findIndex(s => s.id === parseInt(id));
      if (index !== -1) {
        students.splice(index, 1);
        return true;
      }
      return false;
    },

    createCourse: (_, { title, instructor, credits }) => {
      const newCourse = {
        id: Math.max(...courses.map(c => c.id), 0) + 1,
        title,
        instructor,
        credits
      };
      courses.push(newCourse);
      return newCourse;
    },

    enrollStudent: (_, { studentId, courseId }) => {
      const student = students.find(s => s.id === parseInt(studentId));
      if (student && !student.courses.includes(parseInt(courseId))) {
        student.courses.push(parseInt(courseId));
      }
      return student;
    }
  },

  Student: {
    courses: (student) => {
      return courses.filter(c => student.courses.includes(c.id));
    },

    courseCount: (student) => {
      return student.courses.length;
    }
  },

  Course: {
    students: (course) => {
      return students.filter(s => s.courses.includes(course.id));
    }
  }
};

// ============================================
// APOLLO SERVER SETUP
// ============================================

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`✓ GraphQL Server running at http://localhost:${PORT}/graphql`);
    console.log('\nGraphQL Playground available');
  });
}

startServer();

module.exports = app;

// ============================================
// GRAPHQL QUERIES AND MUTATIONS EXAMPLES
// ============================================

/*

QUERIES:

1. Get all students
query {
  students {
    id
    name
    email
    grade
    courseCount
  }
}

2. Get student with courses
query {
  student(id: "1") {
    id
    name
    email
    grade
    courses {
      title
      instructor
    }
  }
}

3. Get students by grade
query {
  studentsByGrade(grade: "A") {
    id
    name
    email
  }
}

4. Get course with enrolled students
query {
  course(id: "1") {
    title
    instructor
    credits
    students {
      name
      email
    }
  }
}

MUTATIONS:

1. Create student
mutation {
  createStudent(name: "David", email: "david@univ.edu", grade: "B") {
    id
    name
    email
  }
}

2. Update student grade
mutation {
  updateStudent(id: "1", grade: "A+") {
    id
    name
    grade
  }
}

3. Enroll student in course
mutation {
  enrollStudent(studentId: "1", courseId: "3") {
    id
    name
    courseCount
    courses {
      title
    }
  }
}

4. Create course
mutation {
  createCourse(title: "TypeScript", instructor: "Alex", credits: 3) {
    id
    title
    instructor
  }
}

*/
