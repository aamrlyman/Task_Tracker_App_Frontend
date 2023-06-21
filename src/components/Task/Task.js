import React, { useState, useEffect } from "react";
import "./Task.css"
import TaskStatus from "../TaskStatus/TaskStatus";

const Task = ({ task, fetchTasks}) => {
  return (
    <div className="taskContainer">
      <div className="TitleStatusContainer">
        <TaskStatus task={task} fetchTasks={fetchTasks}/>
        <h2>{task.title}</h2>
      </div>
      <div> {task.description}</div>
      <div> {task.due_date}</div>
    </div>
  );
};

export default Task;
