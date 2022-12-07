import React from "react";
import Tasks from "../../components/dashboard/taskPage.js";
import AddTask from "../../components/dashboard/addTask.js";
import pageStyles from "../../styles/Dashboard.module.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useRouter } from "next/router.js";

function studentTasklistWrapper() {
  const [tasks, setTasks] = useState([]);
  const [updateToggle, setUpdateToggle] = useState(false);
  const router = useRouter();
  const allTasks = () => {
    // Grab current session id for user to render tasks
    Axios.get("/api/sessionData")
      .then((res) => {
        console.log(res);
        const session_id = res.data.id;
        Axios.get("/api/session/task/read", {
          params: { key: 0, tag: session_id }, // key=0 fetches tasks with session_id matching tag
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
        if (err.response.status === 401 || err.response.status === 400) {
          router.push("/app/login");
        }
      });
  };
  const handleTask = () => {
    setUpdateToggle(!updateToggle);
  };

  /*UseEffect calls allTasks on page Mount only*/
  useEffect(() => {
    allTasks();
  }, []);

  /*UseEffect calls allTasks on task update*/
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
