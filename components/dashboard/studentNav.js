import React from "react";
import navbarStyles from "../../styles/Nav.module.css";
import Image from "next/image";
import Link from "next/link";
import Axios from "axios";
import { useRouter } from "next/router";

function studentNav() {
  const router = useRouter();

  function logOut() {
    Axios.post("http://localhost:3000/api/logout")
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
        <Link href="/app/dashboard/student">
          <a className={navbarStyles.menuItem} title="participants">
            Home
          </a>
        </Link>
        <Link href="/app/dashboard/student/tasklist">
          <a className={navbarStyles.menuItem} title="participants">
            My Tasks
          </a>
        </Link>
        <Link href="/app/dashboard/student/calendar">
          <a className={navbarStyles.menuItem} title="Data">
            My Calendar
          </a>
        </Link>
        <Link href="/app/dashboard/student/questionnaire">
          <a className={navbarStyles.menuItem} title="participants">
            My Questionnare
          </a>
        </Link>
        <Link href="/app/login">
          <a onClick={logOut} className={navbarStyles.menuItem} title="logout">
            Log out
          </a>
        </Link>
        {/*
                <Link href='/app/dashboard/student/questionnare'>
                    <a title='Referral'>Questionnare</a>
                </Link>
                */}
      </span>
    </nav>
  );
}

export default studentNav;
