import React, { useEffect, useState } from "react";
import HandymanGantt from "./HandymanGantt";
import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc
} from "firebase/firestore";

function HandymanList() {
  const [handymen, setHandymen] = useState([]);
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("General");
  const [rate, setRate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");

  const handymanRef = collection(db, "handymen");

  // 🔄 Realtime listener from Firestore
  useEffect(() => {
    const q = query(handymanRef, orderBy("startDate", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setHandymen(data);
    });
    return () => unsubscribe();
  }, []);

  // ➕ Add new handyman to Firestore
  const addHandyman = async () => {
    if (name.trim() === "" || !startDate || !duration) return;

    await addDoc(handymanRef, {
      name,
      specialty,
      rate,
      startDate,
      duration: Number(duration)
    });

    // Reset form
    setName("");
    setSpecialty("General");
    setRate("");
    setStartDate("");
    setDuration("");
  };

  // 🗑 Delete handyman from Firestore
  const deleteHandyman = async (id) => {
    await deleteDoc(doc(db, "handymen", id));
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <h2>👷 Handyman Directory</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "1rem"
        }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          style={{ flex: 1 }}
        />
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <option value="General">General</option>
          <option value="Plumber">Plumber</option>
          <option value="Electrician">Electrician</option>
          <option value="Painter">Painter</option>
          <option value="Tiler">Tiler</option>
          <option value="Other">Other</option>
        </select>
        <input
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          type="number"
          placeholder="€/hr"
          style={{ width: "80px" }}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Days"
          style={{ width: "60px" }}
        />
        <button onClick={addHandyman}>Add</button>
      </div>

      <ul>
        {handymen.map((hm, i) => (
          <li key={hm.id || i}>
            {hm.name} — {hm.specialty} @ €{hm.rate || "?"}/hr | Starts:{" "}
            {hm.startDate || "?"}, Duration: {hm.duration || 0} day(s)
            <button
              onClick={() => deleteHandyman(hm.id)}
              style={{
                marginLeft: "1rem",
                background: "#ff4444",
                color: "#fff",
                border: "none",
                padding: "2px 6px",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <HandymanGantt handymen={handymen} />
    </div>
  );
}

export default HandymanList;
