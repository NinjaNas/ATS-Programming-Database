import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import DashboardStyles from "../../styles/Dashboard.module.css";

function task({ id, task_name, due_date, task_description, status }) {
  const statusDict = ["Started", "Completed", "Verified"];
  const [type, setType] = useState([]);
  const [trackedStatus, setStatus] = useState(status);
  const [checkedStudent, setCheckedStudent] = useState(trackedStatus != 1);
  const [toggleStudent, setToggleStudent] = useState(
    trackedStatus != 1 && trackedStatus != 2
  );
  const [checkedAdmin, setCheckedAdmin] = useState(
    trackedStatus != 1 && trackedStatus != 2
  );
  const [toggleAdmin, setToggleAdmin] = useState(
    trackedStatus != 2 && trackedStatus != 3
  );
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
    switch (trackedStatus) {
      case 1:
        Axios.post("http://localhost:3000/api/session/task/update", {
          column: "status",
          new_value: 2,
          task_id: id,
        })
          .then(() => {
            setCheckedStudent(true);
            setStatus(2);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case 2:
        Axios.post("http://localhost:3000/api/session/task/update", {
          column: "status",
          new_value: 1,
          task_id: id,
        })
          .then(() => {
            setCheckedStudent(false);
            setStatus(1);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case 3:
        // Disable checked
        setToggleStudent(true);
        setCheckedStudent(true);
        break;
      default:
        setCheckedStudent(false);
    }
  };

  const adminButtonClick = () => {
    switch (trackedStatus) {
      case 1:
        // Do nothing
        setToggleAdmin(true);
        setCheckedAdmin(false);
        break;
      case 2:
        Axios.post("http://localhost:3000/api/session/task/update", {
          column: "status",
          new_value: 3,
          task_id: id,
        })
          .then(() => {
            setCheckedAdmin(true);
            setStatus(3);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case 3:
        Axios.post("http://localhost:3000/api/session/task/update", {
          column: "status",
          new_value: 2,
          task_id: id,
        })
          .then(() => {
            setCheckedAdmin(false);
            setStatus(2);
          })
          .catch((err) => {
            console.log(err);
          });

        break;
      default:
        setCheckedAdmin(false);
    }
  };

  // Render different for students
  if (type === "student" || type === "parent") {
    return (
      <div>
        <h4 className={DashboardStyles.taskName}>{task_name}</h4>
        <h5 className={DashboardStyles.taskRest}>
          Due: {new Date(due_date).toLocaleDateString("en-US")}
          <input
            className={DashboardStyles.taskRest}
            type="checkbox"
            checked={checkedStudent}
            onChange={studentButtonClick}
            disabled={toggleStudent}
          ></input>
          <p>Status: {statusDict[trackedStatus - 1]}</p>
        </h5>

        {/*<h5 className={DashboardStyles.text}>
				{status > 0 ? statusDict[status] : statusDict[0]}
			</h5>*/}
      </div>
    );
  } else if (type === "admin" || type === "counselor") {
    return (
      <div>
        <h4 className={DashboardStyles.taskName}>{task_name}</h4>
        <h5 className={DashboardStyles.taskRest}>
          Due: {new Date(due_date).toLocaleDateString("en-US")}
          <input
            className={DashboardStyles.taskRest}
            type="checkbox"
            checked={checkedAdmin}
            onChange={adminButtonClick}
            disabled={toggleAdmin}
          ></input>
          <p>Status: {statusDict[trackedStatus - 1]}</p>
        </h5>

        {/*<h5 className={DashboardStyles.text}>
				{status > 0 ? statusDict[status] : statusDict[0]}
			</h5>*/}
      </div>
    );
  }
}

export default task;
