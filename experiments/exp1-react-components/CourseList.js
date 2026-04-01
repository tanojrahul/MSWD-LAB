import React from 'react';

const CourseCard = ({ course }) => (
  <div style={{
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }}>
    <h3 style={{ marginTop: 0, color: '#007bff' }}>{course.title}</h3>
    <p><strong>Instructor:</strong> {course.instructor}</p>
    <p><strong>Duration:</strong> {course.duration}</p>
    <p><strong>Level:</strong> <span style={{ backgroundColor: '#e7f3ff', padding: '3px 8px', borderRadius: '3px' }}>{course.level}</span></p>
    <p><strong>Students Enrolled:</strong> {course.enrolled}</p>
    <p style={{ color: '#666' }}>{course.description}</p>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#28a745' }}>${course.price}</span>
      <button style={{
        padding: '8px 15px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        Enroll Now
      </button>
    </div>
  </div>
);

const CourseList = () => {
  const courses = [
    {
      id: 1,
      title: 'React Fundamentals',
      instructor: 'John Smith',
      duration: '4 weeks',
      level: 'Beginner',
      enrolled: 234,
      price: 49,
      description: 'Learn React basics including components, hooks, and state management.'
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      instructor: 'Jane Doe',
      duration: '6 weeks',
      level: 'Intermediate',
      enrolled: 189,
      price: 69,
      description: 'Master async programming, closures, prototypes, and modern ES6+ features.'
    },
    {
      id: 3,
      title: 'Full Stack Development',
      instructor: 'Mike Johnson',
      duration: '12 weeks',
      level: 'Advanced',
      enrolled: 156,
      price: 129,
      description: 'Complete course covering frontend, backend, database, and deployment.'
    },
    {
      id: 4,
      title: 'Web Design Essentials',
      instructor: 'Sarah Williams',
      duration: '3 weeks',
      level: 'Beginner',
      enrolled: 312,
      price: 39,
      description: 'Learn CSS, responsive design, and UI/UX principles.'
    },
    {
      id: 5,
      title: 'Node.js & Express',
      instructor: 'Robert Brown',
      duration: '5 weeks',
      level: 'Intermediate',
      enrolled: 198,
      price: 59,
      description: 'Build scalable backend applications with Node.js and Express framework.'
    }
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h1>Course Catalog</h1>
      <p style={{ color: '#666' }}>Explore our comprehensive collection of programming courses</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {courses.slice(0, 3).map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      <div>
        {courses.slice(3).map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      <div style={{
        backgroundColor: '#e7f3ff',
        padding: '15px',
        borderRadius: '5px',
        marginTop: '20px'
      }}>
        <p><strong>Total Courses Available:</strong> {courses.length}</p>
        <p><strong>Total Students Enrolled:</strong> {courses.reduce((sum, c) => sum + c.enrolled, 0)}</p>
      </div>
    </div>
  );
};

export default CourseList;
