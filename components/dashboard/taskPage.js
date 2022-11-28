import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import Task from "./task.js";
import DashboardStyles from "../../styles/Dashboard.module.css";

function tasklist({ tasks, title, handler }) {
  return (
    <div
      className={DashboardStyles.taskBox}
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
              task_type={task.task_type}
              status={task.status}
              handler={handler}
            />
          ) : title === "Boomerang" && task.task_type != 2 ? (
            <Task
              id={task.id}
              task_name={task.task_name}
              due_date={task.due_date}
              task_type={task.task_type}
              status={task.status}
              handler={handler}
            />
          ) : null
        )}
      </div>
    </div>
  );
}

export default tasklist;
