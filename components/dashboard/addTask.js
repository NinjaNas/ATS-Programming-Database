import React from "react";
import DashboardStyles from "../../styles/Dashboard.module.css";
import Axios from "axios";
import { useRef } from "react";
import { useRouter } from "next/router";

function addTask() {
  const nameRef = useRef();
  const typeRef = useRef();
  const dueDateRef = useRef();
  const descriptionRef = useRef();

  const router = useRouter();

  const postTask = () => {
    let type = null;

    switch (typeRef.current.value) {
      case "Boomerang":
        type = 1;
        break;
      case "Academic":
        type = 2;
        break;
      case "SMART Goal":
        type = 3;
        break;
      case "Schoolwork Plan":
        type = 4;
        break;
      case "Ecomap":
        type = 5;
        break;
      case "Tree Plan":
        type = 6;
        break;
      default:
        type = 1;
    }
    // Grab current session id for user to create tasks
    Axios.get("http://localhost:3000/api/sessionData")
      .then((res) => {
        const session_id = res.data.id;
        console.log("session_id" + session_id);
        Axios.post("http://localhost:3000/api/session/task/create", {
          session_id: session_id,
          task_type: type,
          task_name: nameRef.current.value,
          start_date: new Date().toISOString().split("T")[0],
          due_date: dueDateRef.current.value,
          task_description: descriptionRef.current.value,
          status: "1",
          end_date: null,
        })
          .then(() => {
            router.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ display: "inline-block" }}>
      <h2 className={DashboardStyles.title}>New Task</h2>
      <label style={{ display: "block" }} className={DashboardStyles.subtitle}>
        Task Name
      </label>
      <input type="text" name="task_name" ref={nameRef}></input>

      <label style={{ display: "block" }} className={DashboardStyles.subtitle}>
        Type
      </label>

      <select name="type" id="type" ref={typeRef}>
        <option value="Boomerang">Boomerang</option>
        <option value="Academic">Academic</option>
        <option value="SMART Goal">SMART Goal</option>
        <option value="Schoolwork Plan">Schoolwork Plan</option>
        <option value="Ecomap">Ecomap</option>
        <option value="Tree Plan">Tree Plan</option>
      </select>

      <label style={{ display: "block" }} className={DashboardStyles.subtitle}>
        Due Date
      </label>
      <input type="date" name="task_name" ref={dueDateRef}></input>

      <label style={{ display: "block" }} className={DashboardStyles.subtitle}>
        Description
      </label>
      <input type="text" name="task_name" ref={descriptionRef}></input>

      <button
        onClick={postTask}
        style={{ display: "block" }}
        className={DashboardStyles.text}
      >
        Add Task
      </button>
    </div>
  );
}

export default addTask;
