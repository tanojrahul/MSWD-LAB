import React, { useState } from "react";

function StudentAttendance({ students }) {
  const [data, setData] = useState(students);

  const toggleAttendance = (index) => {
    const updated = [...data];
    updated[index].absent = !updated[index].absent;
    setData(updated);
  };

  return (
    <div>
      <h2>Student Attendance</h2>
      {data.map((s, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={s.absent}
            onChange={() => toggleAttendance(index)}
          />
          {s.name} ({s.branch})
        </div>
      ))}
    </div>
  );
}

export default StudentAttendance;
export { StudentAttendance };