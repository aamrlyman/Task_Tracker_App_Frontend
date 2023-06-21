import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { URL_HOST } from "../../urlHost";
import "./TaskList.css"
import Task from "../../components/Task/Task"

import axios from "axios";

const TaskList = () => {
  const [user, token] = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        let response = await axios.get(`${URL_HOST}/api/tasks/user/`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setTasks(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchTasks();
  }, [token]);
  return (
    <div className="taskListcontainer">
      <div className="listTitleContainer">
        <h1>{user.username}'s Tasks</h1>
      </div>
      <div className="tasksContainer">
        {tasks &&
          tasks.map((task) => (
           <Task key={task.id} task={task}/>
          ))}
      </div>
    </div>
  );
};

export default TaskList;
