import React from "react";
import PassengerList from "./PassengerList.js";
import StudentAttendance from "./StudentAttendance.js";

function App() {
  const passengers = [
    { name: "Rahul", mobile: "999999", source: "Hyd", destination: "Blr", date: "2026-03-25" },
    { name: "Priya", mobile: "888888", source: "Chennai", destination: "Delhi", date: "2026-03-26" }
  ];

  const students = [
    { id: 1, name: "Amit", branch: "CSE", absent: false },
    { id: 2, name: "Neha", branch: "AI", absent: true }
  ];

  return (
    <div>
      <PassengerList passengers={passengers} />
      <StudentAttendance students={students} />
    </div>
  );
}

export default App;