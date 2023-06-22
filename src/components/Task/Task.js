import React, { useState, useEffect } from "react";
import "./Task.css";
import TaskStatus from "../TaskStatus/TaskStatus";
import EditTask from "../../components/EditTask/EditTask";

const Task = ({ task, fetchTasks }) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className="taskandEditContainer">
      <TaskStatus task={task} fetchTasks={fetchTasks} />
      {!isEdit ? (
        <div className="taskContainer" onClick={() => setIsEdit(true)}>
          <div className="TitleContainer">
            <h2>{task.title}</h2>
          </div>
          <div> {task.description}</div>
          <div> {task.due_date}</div>
        </div>
      ) : (
        <div>
          <EditTask task={task} fetchTasks={fetchTasks} setIsEdit={setIsEdit} />
        </div>
      )}
    </div>
  );
};

export default Task;
