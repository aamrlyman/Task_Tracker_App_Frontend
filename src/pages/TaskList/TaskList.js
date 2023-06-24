import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { URL_HOST } from "../../urlHost";
import "./TaskList.css";
import Task from "../../components/Task/Task";
import CreateTask from "../../components/CreateTask/CreateTask";
import SortTasks from "../../components/SortTasks/SortTasks";
import axios from "axios";

const TaskList = () => {
  const [user, token] = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isCreateTask, setIsCreateTask] = useState();
  const [sortOption, setSortOption] = useState("status");

  const fetchTasks = async () => {
    try {
      let response = await axios.get(`${URL_HOST}/api/tasks/user/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      handleSort(sortOption,response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleSort = (option, array) => {
    // Implement the sorting logic based on the selected option
    // Update the tasks array accordingly
    // For example:
    let sortedTasks = [];
    switch (option) {
      case "title":
        sortedTasks = array.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "description":
        sortedTasks = array.sort((a, b) =>
          a.description.localeCompare(b.description)
        );
        break;
      case "dueDate":
        sortedTasks = array.sort(
          (a, b) => new Date(a.due_date) - new Date(b.due_date)
        );
        break;
      case "status":
        sortedTasks = array.sort((b, a) => a.status.localeCompare(b.status));
        break;
      default:
        sortedTasks = array;
        break;
    }

    setTasks(sortedTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  return (
    <div className="main">
      <div className="taskListcontainer">
        <div className="listTitleContainer">
          <h1>{user.username}'s Tasks</h1>
        </div>
        <div>
          <SortTasks
            handleSort={handleSort}
            sortOption={sortOption}
            setSortOption={setSortOption}
            tasks={tasks}
          />
        </div>
        <div className="tasksContainer">
          {tasks &&
            tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                fetchTasks={fetchTasks}
                handleSort={handleSort}
              />
            ))}
        </div>
        {isCreateTask ? (
          <CreateTask
            fetchTasks={fetchTasks}
            setIsCreateTask={setIsCreateTask}
            handleSort={handleSort}
          />
        ) : (
          <button
            className="addTaskButton"
            onClick={() => setIsCreateTask(true)}
          >
            Add Task
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskList;
