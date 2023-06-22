import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { URL_HOST } from "../../urlHost";

const DeleteTask = ({ task, fetchTasks }) => {
  const [user, token] = useAuth();

  async function deleteTask() {
    try {
      let response = await axios.delete(`${URL_HOST}/api/tasks/${task.id}/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      fetchTasks();
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="deleteButtonContainer">
      <button
        className="noBorderLessPaddingBtn"
        type="button"
        onClick={() => deleteTask()}
      >
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </div>
  );
};

export default DeleteTask;