import React from "react";
import Tasks from "../../components/dashboard/taskPage.js";
import AddTask from "../../components/dashboard/addTask.js";
import pageStyles from "../../styles/Dashboard.module.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function studentTasklistWrapper() {
  const [tasks, setTasks] = useState([]);
  const [updateToggle, setUpdateToggle] = useState(false);
  const allTasks = () => {
    // Grab current session id for user to render tasks
    Axios.get("/api/sessionData")
      .then((res) => {
        const session_id = res.data.id;
        Axios.get("/api/session/task/read", {
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
  const handleTask = () => {
    setUpdateToggle(!updateToggle);
  };

  /*UseEffect calls allStudents on page Mount only*/
  useEffect(() => {
    allTasks();
  }, []);

  useEffect(() => {
    allTasks();
  }, [updateToggle]);
  return (
    <div className={pageStyles.studentDash}>
      <Tasks tasks={tasks} title="Academic" handler={handleTask}></Tasks>
      <Tasks tasks={tasks} title="Boomerang" handler={handleTask}></Tasks>
      <div className={pageStyles.addTask}>
        <AddTask handler={handleTask}></AddTask>
      </div>
    </div>
  );
}

export default studentTasklistWrapper;