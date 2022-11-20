import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import Task from "./task.js";
import DashboardStyles from "../../styles/Dashboard.module.css";

function tasklist({ title, type }) {
  const [tasks, setTasks] = useState([]);
  const allTasks = () => {
    // Grab current session id for user to render tasks
    Axios.get("http://localhost:3000/api/sessionData")
      .then((res) => {
        const session_id = res.data.id;
        Axios.get("http://localhost:3000/api/session/task/read", {
          params: { key: 0, tag: session_id },
        })
          .then((response) => {
            setTasks(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /*UseEffect calls allStudents on page Mount only*/
  useEffect(() => {
    allTasks();
  }, []);
  return (
    <div
      className={DashboardStyles.studentDash}
      style={{ display: "inline-block" }}
    >
      <h2
        style={{ marginLeft: 9, marginTop: 0 }}
        className={DashboardStyles.title}
      >
        {title}
      </h2>

      <div className={DashboardStyles.taskpage}>
        {tasks.map((task) =>
          title === "Academic" && task.task_type == 2 ? (
            <Task
              id={task.id}
              task_name={task.task_name}
              due_date={task.due_date}
              task_description={task.task_description}
              status={task.status}
            />
          ) : title === "Boomerang" && task.task_type != 2 ? (
            <Task
              id={task.id}
              task_name={task.task_name}
              due_date={task.due_date}
              task_description={task.task_description}
              status={task.status}
            />
          ) : null
        )}
      </div>
    </div>
  );
}

export default tasklist;
