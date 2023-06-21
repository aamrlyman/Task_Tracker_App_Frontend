import React, { useState, useEffect } from "react";
import "./Task.css"
import TaskStatus from "../TaskStatus/TaskStatus";

const Task = ({ task }) => {
  return (
    <div className="taskContainer">
      <div className="TitleStatusContainer">
        <TaskStatus status={task.status}/>
        <h2>{task.title}</h2>
      </div>
      <div> {task.description}</div>
      <div> {task.due_date}</div>
    </div>
  );
};

// <i class="fa-solid fa-circle"></i>
export default Task;
