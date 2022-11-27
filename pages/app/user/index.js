//Landing Page for Boomerang Staff
import React from "react";
import pageStyles from "../../../styles/Dashboard.module.css";
import searchStyles from "../../../styles/Search.module.css";
import Navbar from "../../../components/dashboard/adminNav.js";
import AllUsers from "../../../components/dashboard/allUsers";
import Footer from "../../../components/dashboard/footer.js";

function Users() {
  return (
    <div className={pageStyles.mainPage}>
      <Navbar></Navbar>
      <AllUsers />
      <Footer></Footer>
    </div>
  );
}

export default Users;
