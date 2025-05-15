import React from "react";
import TaskList from "./TaskList";
import HandymanList from "./HandymanList";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>🏡 MatSpys' Place</h1>
      <TaskList />
      <HandymanList />
    </div>
  );
}

export default App;
