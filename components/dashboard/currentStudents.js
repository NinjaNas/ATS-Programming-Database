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
      params: { key: 1, tag: 0 },
    })
      .then((response) => {
        setStudents(response.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401){
          router.push("/app/login")
        }
      });
  };

  const activeSessions = () => {
    Axios.get("/api/session/read", {
      params: {key: 2}
    })
    .then(response => {
      setSessions(response.data)
      allTasks();
      attendance();
    })
    .catch(err => {
      console.log(err);
    })
  }



	const attendance = () => {
    Axios.get("/api/session/day/read").then((response) => {
      const data = response.data.sort(
        (a, b) => new Date(a.attendance_day) - new Date(b.attendance_day)
      );
      setDays(data);
    });
  };

	const allTasks = () => {
    // Grab current session id for user to render tasks
        Axios.get("/api/session/task/read")
          .then((response) => {
            setTasks(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
  };


  /*UseEffect calls allStudents on page Mount only*/
  useEffect(() => {
    allStudents();
    activeSessions();
  }, []);

  const getPercentage = (session_id) => {
    let session_tasks = tasks.filter(task => task.session_id == session_id && task.task_type != 2)
    let session_days = days.filter(day => day.session_id == session_id)
    let attended = session_days.filter(day => day.status == 1)
    let completed = session_tasks.filter(task => task.status == 3)
    let result = Math.round((attended.length + completed.length)/
    (session_tasks.length + session_days.length) * 100)    
    return result || 0;
  }

  const allItems = () => students && sessions && tasks && days
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
          {allItems() && sessions.map(session => 
            students.filter(student => student.id == session.user_id)
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
                  <ProgressBar completed = {
                    getPercentage(session.id)
                  }></ProgressBar>
                </td>
              </tr>
            </>
          )))}
        </tbody>
      </table>
    </div>
  );
}

export default currentStudents;
