import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newCategory, setNewCategory] = useState("General");
  const [newCost, setNewCost] = useState("");

  const tasksRef = collection(db, "tasks");

  // 🔄 Real-time listener
  useEffect(() => {
    const q = query(tasksRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(data);
    });
    return () => unsubscribe();
  }, []);

  // ➕ Add task
  const addTask = async () => {
    if (newTask.trim() === "" || newCost === "") return;

    await addDoc(tasksRef, {
      text: newTask,
      category: newCategory,
      cost: parseFloat(newCost),
      done: false,
      createdAt: new Date()
    });

    setNewTask("");
    setNewCategory("General");
    setNewCost("");
  };

  // ✅ Toggle done
  const toggleDone = async (id, currentStatus) => {
    const taskDoc = doc(db, "tasks", id);
    await updateDoc(taskDoc, {
      done: !currentStatus
    });
  };

  // 🗑 Delete task
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  // 💰 Total cost
  const totalCost = tasks.reduce((sum, t) => sum + (t.cost || 0), 0);

  return (
    <div>
      <h2>🧱 Renovation Tasks</h2>
      <div style={{ marginBottom: "1rem" }}>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="e.g. Paint the living room"
        />
        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        >
          <option>General</option>
          <option>Painting</option>
          <option>Plumbing</option>
          <option>Electrical</option>
          <option>Flooring</option>
          <option>Other</option>
        </select>
        <input
          type="number"
          value={newCost}
          onChange={(e) => setNewCost(e.target.value)}
          placeholder="€ Cost"
          style={{ width: "80px" }}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <label style={{ textDecoration: task.done ? "line-through" : "none" }}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task.id, task.done)}
              />
              {task.text}{" "}
              <span style={{ fontSize: "0.9em", color: "#555", marginLeft: "0.5em" }}>
                ({task.category} - €{task.cost})
              </span>
            </label>
            <button
              onClick={() => deleteTask(task.id)}
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

      <h3>💰 Total Task Cost: €{totalCost.toFixed(2)}</h3>
    </div>
  );
}

export default TaskList;
