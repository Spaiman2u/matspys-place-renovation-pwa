import React from "react";
import {
  GanttComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject
} from "@syncfusion/ej2-react-gantt";

function HandymanGantt({ handymen }) {
  const tasks = handymen
    .filter((h) => h.startDate && h.duration > 0)
    .map((h, i) => ({
      TaskID: i + 1,
      TaskName: `${h.name} (${h.specialty})`,
      StartDate: new Date(h.startDate),
      Duration: h.duration,
      Progress: 100
    }));

  const taskFields = {
    id: "TaskID",
    name: "TaskName",
    startDate: "StartDate",
    duration: "Duration",
    progress: "Progress"
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>📅 Gantt Timeline</h3>
      {tasks.length > 0 ? (
        <GanttComponent
          dataSource={tasks}
          taskFields={taskFields}
          height="350px"
        >
          <ColumnsDirective>
            <ColumnDirective field="TaskID" headerText="ID" width="60" />
            <ColumnDirective field="TaskName" headerText="Name" width="200" />
            <ColumnDirective field="StartDate" headerText="Start" />
            <ColumnDirective field="Duration" headerText="Days" />
            <ColumnDirective field="Progress" headerText="%" />
          </ColumnsDirective>
          <Inject services={[]} />
        </GanttComponent>
      ) : (
        <p>No jobs scheduled yet.</p>
      )}
    </div>
  );
}

export default HandymanGantt;

