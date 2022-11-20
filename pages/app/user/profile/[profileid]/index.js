import React from "react";
import pageStyles from "../../../../../styles/Dashboard.module.css";
import Navbar from "../../../../../components/dashboard/adminNav.js";
import Footer from "../../../../../components/dashboard/footer.js";
import { useRouter } from "next/router";
import Axios from "axios";
import { useState, useEffect } from "react";

function UserProfile() {
    const router = useRouter();
    const { uid } = router.query;
    const [user, setUser] = useState();

    const userInfo = () => {
        Axios.get("http://localhost:3000/api/user/read", {
          params: { key: -1 },
        }).then((response) => {
          // console.log(studentid);
          //  setStudent(response.data.filter(s => s.id == studentid));
          setUser(response.data[0]);
          //  setStudent[student.filter(s => student.id == studentid)]
        });
      };

      useEffect(() => {
        userInfo();
      }, [uid]);

	return (
		<div className={pageStyles.mainPage}>
			<Navbar></Navbar>
            "BOOK"
			<div style={{ height: "90%" }}></div>
			<Footer></Footer>
		</div>
	);
}

export default UserProfile;
