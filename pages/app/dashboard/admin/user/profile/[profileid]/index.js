import React from "react";
import pageStyles from "../../../../../../../styles/Dashboard.module.css";
import Navbar from "../../../../../../../components/dashboard/adminNav";
import StudentHeader from "../../../../../../../components/studentProfile/StudentHeader";
import UserEdit from "../../../../../../../components/profiles/userEdit";
import Footer from "../../../../../../../components/dashboard/footer.js";
import { useRouter } from "next/router";
import Axios from "axios";
import { useState, useEffect } from "react";

function UserProfile() {
  const router = useRouter();
  const { profileid } = router.query;
  const [user, setUser] = useState();

  const userInfo = () => {
    Axios.get("/api/user/read", {
      params: { key: 0, tag: profileid },
    }).then((response) => {
      setUser(response.data[0]);
    });
  };

  useEffect(() => {
    userInfo();
  }, [profileid]);

  return (
    <div className={pageStyles.mainPage}>
      <Navbar></Navbar>
      {profileid && user && (
        <>
          <div style={{ marginTop: "0px" }}>
            <StudentHeader
              key={user.id}
              firstName={user.first_name}
              lastName={user.last_name}
            />
          </div>
          <div className={pageStyles.transparentDash}>
            <UserEdit id={user.id} />
          </div>
        </>
      )}

      <Footer></Footer>
    </div>
  );
}

export default UserProfile;
