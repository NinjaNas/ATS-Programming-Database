import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import DashboardStyles from "../../styles/Dashboard.module.css";
import ProgressBar from "./progressBar.js";
import { useRouter } from "next/router";

function currentStudents() {
  /*Creat state to load student data*/
  const [students, setStudents] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [days, setDays] = useState([]);

  /*Router call in case of redirect*/
  const router = useRouter();
  /*Axios call to get student data*/
  const allStudents = () => {
    Axios.get("/api/user/read", {
      params: { key: 1, tag: 0 }, // key=1 indicates active users, tag=0 is just a placeholder
    })
      .then((response) => {
        setStudents(response.data);
      })
      .catch((err) => {
        console.log(err);
        // If unauthorized, redirect back to login page
        if (err.response.status === 401) {
          router.push("/app/login");
        }
      });
  };

  const activeSessions = () => {
    Axios.get("/api/session/read", {
      params: { key: 2 }, // key=2 indicates that session is active/incomplete
    })
      .then((response) => {
        setSessions(response.data);
        // if successful, get tasks and attendance
        allTasks();
        attendance();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const attendance = () => {
    // Grab all attendance days
    Axios.get("/api/session/day/read").then((response) => {
      const data = response.data.sort(
        (a, b) => new Date(a.attendance_day) - new Date(b.attendance_day) // sort in chronological order
      );
      setDays(data);
    });
  };

  const allTasks = () => {
    // Grab all the tasks
    Axios.get("/api/session/task/read")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /*UseEffect calls allStudents and activeSessions on page Mount only*/
  useEffect(() => {
    allStudents();
    activeSessions();
  }, []);

  /* Get the percentage of
   * verified Boomerange tasks + days attended compared to the total
   * for a single session*/
  const getPercentage = (session_id) => {
    // get all non-academic tasks matching the session
    let session_tasks = tasks.filter(
      (task) => task.session_id == session_id && task.task_type != 2
    );
    // get all days that match the session
    let session_days = days.filter((day) => day.session_id == session_id);
    // get the number of attended days
    let attended = session_days.filter((day) => day.status == 1);
    // get the number of verified tasks
    let completed = session_tasks.filter((task) => task.status == 3);

    let result = Math.round(
      ((attended.length + completed.length) /
        (session_tasks.length + session_days.length)) *
        100
    );
    return result || 0;
  };

  const allItems = () => students && sessions && tasks && days;
  return (
    <div className={DashboardStyles.currentStud}>
      <h3 className={DashboardStyles.title}>Current Students</h3>
      <table className={DashboardStyles.subtitle}>
        <tbody>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          {allItems() &&
            sessions.map((session) =>
              students
                .filter((student) => student.id == session.user_id)
                .map((student) => (
                  <>
                    <tr>
                      <td>
                        <a
                          href={`/app/dashboard/admin/studentprofile/${student.id}`}
                          className={DashboardStyles.subtitle}
                        >
                          {student.first_name}
                        </a>
                      </td>
                      <td className={DashboardStyles.tdNames}>
                        <a
                          href={`/app/dashboard/admin/studentprofile/${student.id}`}
                          className={DashboardStyles.subtitle}
                        >
                          {student.last_name}
                        </a>
                      </td>
                      <td className={DashboardStyles.tdProgress}>
                        <ProgressBar
                          completed={getPercentage(session.id)}
                        ></ProgressBar>
                      </td>
                    </tr>
                  </>
                ))
            )}
        </tbody>
      </table>
    </div>
  );
}

export default currentStudents;
