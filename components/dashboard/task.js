import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import DashboardStyles from "../../styles/Dashboard.module.css";

function task({ id, task_name, due_date, task_description }) {
  const statusDict = ["Started", "Completed", "Verified", "On Hold"];
  const [type, setType] = useState([]);
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState(0);
  /*UseEffect calls allStudents on page Mount only*/
  useEffect(() => {
    allTasks();
  }, []);

  const allTasks = () => {
    // Grab current session id for user to render tasks
    Axios.get("http://localhost:3000/api/userData")
      .then((res) => {
        setType(res.data[0][0].type);
      })
      .catch((err) => {
        console.log(err);
      });

    Axios.get("http://localhost:3000/api/session/task/read", {
      params: { key: 2, tag: id },
    })
      .then((res) => {
        setStatus(res.data[0].status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const studentButtonClick = () => {
    console.log(status);
    switch (status) {
      case 1:
        setChecked(true);
        Axios.post("http://localhost:3000/api/session/task/update", {
          column: "status",
          new_value: 2,
          task_id: id,
        })
          .then((res) => {
            setStatus(2);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case 2:
        setChecked(false);
        Axios.post("http://localhost:3000/api/session/task/update", {
          column: "status",
          new_value: 1,
          task_id: id,
        })
          .then((res) => {
            setStatus(1);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case 3:
        // Do nothing
        setChecked(true);
        break;
      // case 9:
      default:
        setChecked(false);
    }
  };

  // Render different for students
  if (type === "student") {
    return (
      <div>
        <h4 className={DashboardStyles.taskName}>{task_name}</h4>
        <h5 className={DashboardStyles.taskRest}>
          Due: {new Date(due_date).toLocaleDateString("en-US")}
          <input
            className={DashboardStyles.taskRest}
            type="checkbox"
            checked={checked}
            onChange={studentButtonClick}
          ></input>
          <p>Status: {statusDict[status - 1]}</p>
        </h5>

        {/*<h5 className={DashboardStyles.text}>
				{status > 0 ? statusDict[status] : statusDict[0]}
			</h5>*/}
      </div>
    );
  } else {
    return (
      <div>
        <h4 className={DashboardStyles.taskName}>{task_name}</h4>
        <h5 className={DashboardStyles.taskRest}>
          Due: {new Date(due_date).toLocaleDateString("en-US")}
          <input className={DashboardStyles.taskRest} type="checkbox"></input>
          <p>Status: {statusDict[status - 1]}</p>
        </h5>

        {/*<h5 className={DashboardStyles.text}>
				{status > 0 ? statusDict[status] : statusDict[0]}
			</h5>*/}
      </div>
    );
  }
}

export default task;
