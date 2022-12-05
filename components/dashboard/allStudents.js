import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import DashboardStyles from "../../styles/Dashboard.module.css";
import Search from "../dashboard/searchBar.js";
import { useRouter } from "next/router";

function allStudents() {
  /*Creat state to load student data*/
  const [students, setStudents] = useState([]);
  const [searchedS, setSearchedS] = useState([]);
  /*Axios call to get student data*/

  const router = useRouter();
  /*Axios call to get user data*/

  const everyStudent = () => {
    Axios.get("/api/user/read", { params: { key: 2, tag: 1 } })
      .then((response) => {
        setStudents(response.data);
        setSearchedS(response.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          router.push("/app/login");
        }
      });
  };

  /*UseEffect calls allStudents on page Mount only*/
  useEffect(() => {
    everyStudent();
  }, []);

  /*UseEffect calls allStudents on page Mount only*/
  useEffect(() => {
    everyStudent();
  }, []);

  return (
    <div className={DashboardStyles.currentStud}>
      <h3 className={DashboardStyles.title}>All Students</h3>
      <Search students={students} setStudents={setSearchedS}></Search>

      <table className={DashboardStyles.subtitle}>
        <tbody>
          <tr>
            <th></th>
            <th></th>
          </tr>
          {searchedS.map((student) => (
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
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default allStudents;
