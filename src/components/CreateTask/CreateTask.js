import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import axios from "axios";
import { URL_HOST } from "../../urlHost";
import { useRef } from "react";

let initialValues = {
  title: "",
  due_date: "",
  description: "",
};

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };
  return [htmlElRef, setFocus];
  // https://stackoverflow.com/questions/28889826/how-to-set-focus-on-an-input-field-after-rendering/54159564#54159564
};

const CreateTask = ({ fetchTasks, setIsCreateTask}) => {
  const [inputRef, setInputFocus] = useFocus();
  const [user, token] = useAuth();
  const [isNameAlertHidden, setIsNameAlertHidden] = useState(true);
  const [isQuantityAlertHidden, setIsQuantityAlertHidden] = useState(true);
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    initialValues,
    createTask
  );

    const checkCharacterLengths = () => {
      if (formData.title.length === 300) {
        setIsNameAlertHidden(false);
      } else {
        setIsNameAlertHidden(true);
      }
      if (formData.description.length === 1000) {
        setIsQuantityAlertHidden(false);
      } else {
        setIsQuantityAlertHidden(true);
      }
    };
    useEffect(() => {
      checkCharacterLengths();
    }, [formData.title, formData.description]);

  async function createTask() {
    if (formData.due_date === "") formData.due_date = null;
    try {
      let response = await axios.post(`${URL_HOST}/api/tasks/user/`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      fetchTasks();
      reset();
      setInputFocus();
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="addTaskForm">
        <button
          className="cancleCreateTaskButton"
          type="button"
          onClick={() => setIsCreateTask(false)}
        >
          cancle
        </button>
        <label>
          <input
            ref={inputRef}
            className="TaskTitleInput"
            type="text"
            placeholder="New Task"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            autoFocus
            maxLength="300"
          ></input>
          {isNameAlertHidden ? (
            ""
          ) : (
            <p className="AlertP" style={{ textAlign: "center" }}>
              Too many characters
            </p>
          )}
        </label>
        <label>
          <input
            className="dueDateInput"
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleInputChange}
            maxLength="30"
          ></input>
        </label>
        <label>
          <input
            className="descriptionInput"
            type="text"
            name="description"
            placeholder="Notes"
            value={formData.description}
            onChange={handleInputChange}
            maxLength="1000"
          ></input>
          {isQuantityAlertHidden ? (
            ""
          ) : (
            <p className="AlertP" style={{ textAlign: "center" }}>
              Too many characters
            </p>
          )}
        </label>

        <button className="saveTaskButton" type="submit">
          <i className="fa-solid fa-floppy-disk"></i>
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
