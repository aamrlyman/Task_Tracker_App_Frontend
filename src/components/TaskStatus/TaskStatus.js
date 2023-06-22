import React, { useState, useEffect } from "react";
import { URL_HOST } from "../../urlHost";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./TaskStatus.css"

const TaskStatus = ({ task, fetchTasks }) => {
  const [user, token] = useAuth();
  const toggleStatus = async (taskId) => {
    try {
      let response = await axios.put(
        `${URL_HOST}/api/tasks/${taskId}/status/`, task,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      fetchTasks();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="statusIconContainer" onClick={() => toggleStatus(task.id)}>
        {task && task.status === "ready" ? (
          <i className="fa-regular fa-circle"></i>
        ) : (
          <i className={`fa-solid fa-circle ${task.status}`}></i>
        )}
    
    </div>
  );
};

export default TaskStatus;
