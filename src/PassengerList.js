import React, { useState } from "react";

function PassengerList({ passengers }) {
  const [list, setList] = useState([]);

  const addPassenger = (p) => {
    setList([...list, p]);
  };

  return (
    <div>
      <h2>Passengers</h2>
      {passengers.map((p, index) => (
        <div key={index}>
          <p>{p.name} | {p.mobile} | {p.source} → {p.destination} | {p.date}</p>
          <button onClick={() => addPassenger(p)}>Add</button>
        </div>
      ))}

      <h3>Added List</h3>
      {list.map((p, i) => (
        <p key={i}>{p.name}</p>
      ))}
    </div>
  );
}

export default PassengerList;
export { PassengerList };