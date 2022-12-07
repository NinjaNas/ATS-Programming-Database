import React from "react";
import navbarStyles from "../../styles/Nav.module.css";
import Link from "next/link";
import Axios from "axios";

// This Component creates a Navbar by using Next.js Link tag//
function Navbar() {
  function logOut() {
    Axios.post("/api/logout")
      .then(() => {
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <nav className={navbarStyles.navBar}>
      <img className={navbarStyles.boomerangImg} src={"/smallLogo.png"} />
      <span className={navbarStyles.menu}>
        <Link href="/app/dashboard/admin">
          <a className={navbarStyles.menuItem} title="home">
            Home
          </a>
        </Link>
        <Link href="/app/dashboard/admin/allstudents">
          <a className={navbarStyles.menuItem} title="students">
            Students
          </a>
        </Link>
        <Link href="/app/dashboard/admin/user">
          <a className={navbarStyles.menuItem} title="users">
            Users
          </a>
        </Link>
        <span className={navbarStyles.menuItem}>
          <Link href="/app/dashboard/admin/data">
            <a className={navbarStyles.menuItem} title="data">
              Data
            </a>
          </Link>
          <div className={navbarStyles.subnavContent}>
            <Link href="/app/dashboard/admin/data/demographics">
              <a
                style={{ display: "block" }}
                className={navbarStyles.subNavText}
                title="demographics"
              >
                Demographics
              </a>
            </Link>
            <Link href="/app/dashboard/admin/data/programhrs">
              <a
                style={{ display: "block" }}
                className={navbarStyles.subNavText}
                title="programhrs"
              >
                Program Hrs
              </a>
            </Link>
          </div>
        </span>

        <Link href="/app/login">
          <a onClick={logOut} className={navbarStyles.menuItem} title="logout">
            Log out
          </a>
        </Link>
        {/* The referral page is not implemented at this time */}
        {/*
				<Link href='/app/referral'>
					<a title='Referral'>Referral</a>
				</Link>
                */}
      </span>
    </nav>
  );
}

export default Navbar;
