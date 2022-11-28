import React from "react";
import { useState, useEffect } from "react";
import TaskList from "../dashboard/tasklist";
import AddTask from "../../components/dashboard/addTask.js";
import Axios from "axios";
function adminTasklistWrapper({ session_id }) {
  const [tasks, setTasks] = useState([]);
  const [updateToggle, setUpdateToggle] = useState(false);
  const allTasks = () => {
    // Grab current session id for user to render tasks
    Axios.get("/api/sessionData", {
      params: { query: session_id },
    })
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
    <div>
      <TaskList
        tasks={tasks}
        type="admin"
        title="Academic"
        handler={handleTask}
      />
      <TaskList
        tasks={tasks}
        type="admin"
        title="Boomerang"
        handler={handleTask}
      />
      <AddTask session_id={session_id} handler={handleTask}></AddTask>
    </div>
  );
}

export default adminTasklistWrapper;
