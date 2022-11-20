import React from "react";
import pageStyles from "../../../../../styles/Dashboard.module.css";
import Navbar from "../../../../../components/dashboard/adminNav.js";
import Footer from "../../../../../components/dashboard/footer.js";
import StudentHeader from "../../../../../components/studentProfile/StudentHeader";
import { useRouter } from "next/router";
import Axios from "axios";
import { useState, useEffect } from "react";

function UserProfile() {
    const router = useRouter();
    const { userid } = router.query;
    const [user, setUser] = useState();
    console.log(userid)

    const userInfo = () => {
        Axios.get("http://localhost:3000/api/user/read", {
          params: { key: 0, tag: userid },
        }).then((response) => {
          setUser(response.data[0]);
        });
      };

      useEffect(() => {
        userInfo();
      }, [userid]);

	return (
		<div className={pageStyles.mainPage}>
			<Navbar></Navbar>
            {userid && user && (
                <>
                    <StudentHeader
                    key={user.id}
                    firstName={user.first_name}
                    lastName={user.last_name}
                    />
                </>
            )}
			<Footer></Footer>
		</div>
	);
}

export default UserProfile;
