import React, { useState, useEffect } from "react";
import "./Task.css";
import TaskStatus from "../TaskStatus/TaskStatus";
import EditTask from "../../components/EditTask/EditTask";

const Task = ({ task, fetchTasks, handleSort }) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className="taskandEditContainer">
      <TaskStatus task={task} fetchTasks={fetchTasks} handleSort={handleSort} />
      {!isEdit ? (
        <div className="taskContainer" onClick={() => setIsEdit(true)}>
          <p className="title">{task.title}</p>
          <p className="description">{task.description}</p>
          <p className="date">{task.due_date}</p>
        </div>
      ) : (
        <div>
          <EditTask
            task={task}
            fetchTasks={fetchTasks}
            setIsEdit={setIsEdit}
            handleSort={handleSort}
          />
        </div>
      )}
    </div>
  );
};

export default Task;
