import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import DashboardStyles from "../../styles/Dashboard.module.css";
import SearchStyles from "../../styles/Search.module.css";
import Search from "../dashboard/searchBar.js";
import { useRouter } from "next/router";

function allUsers() {
  /*Creat state to load user data*/
  const [users, setUsers] = useState([]);
  const [searchedU, setSearchedU] = useState([]);

  const router = useRouter();
  /*Axios call to get user data*/

  const everyUser = () => {
    Axios.get("/api/user").then((response) => {
      setUsers(response.data);
      setSearchedU(response.data);
    });
  };

  /*UseEffect calls allUsers on page Mount only*/
  useEffect(() => {
    everyUser();
  }, []);

  const createUser = () => {
    router.push("/app/dashboard/admin/createuser");
  };

  return (
    <div className={DashboardStyles.currentStud}>
      <h3 className={DashboardStyles.title}>All Users</h3>
      <div>
        <div className={SearchStyles.child}>
          <Search students={users} setStudents={setSearchedU}></Search>{" "}
        </div>
        <div className={SearchStyles.child}>
          <input type="button" value="Create user" onClick={createUser}></input>{" "}
        </div>
      </div>
      <table className={DashboardStyles.subtitle}>
        <tbody>
          <tr>
            <th></th>
            <th></th>
          </tr>
          {searchedU.map((user) => (
            <>
              <tr>
                <td>
                  <a
                    href={`/app/user/profile/${user.id}`}
                    className={DashboardStyles.subtitle}
                  >
                    {user.first_name}
                  </a>
                </td>
                <td className={DashboardStyles.tdNames}>
                  <a
                    href={`/app/user/profile/${user.id}`}
                    className={DashboardStyles.subtitle}
                  >
                    {user.last_name}
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

export default allUsers;
