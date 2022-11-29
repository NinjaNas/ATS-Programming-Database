import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import Attendance from "../studentProfile/Attendance";
import CardStyles from "../../styles/Cards.module.css";
import TableStyles from "../../styles/Table.module.css";
import Link from "next/link";
import schools from "../../constants/schools";
import sessionStatus from "../../constants/sessionStatus";
import pickups from "../../constants/pickups";
import TaskWrapper from "../../components/dashboard/adminTasklistWrapper";
import SelView from "./SelView";

const SessionRead = ({ user_id }) => {
  const [session, setSession] = useState([]);
  const [days, setDays] = useState([]);
  const [display, setDisplay] = useState("none");
  const [subSes, setSubses] = useState("none");

  const sessionInfo = () => {
    Axios.get("/api/session/read/", {
      params: { key: 1, tag: user_id },
    }).then((response) => {
      // setDemographics(response.data.filter(s => s.user_id == id));
      setSession(response.data);
    });
  };

  const attendance = (data) => {
    setDays(data);
  };
  const expand = () => {
    display == "none" ? setDisplay("block") : setDisplay("none");
  };

  const expandSubS = () => {
    subSes == "none" ? setSubses("block") : setSubses("none");
  };
  useEffect(() => {
    sessionInfo();
  }, []);

  return (
    <div className={CardStyles.card}>
      <button className={CardStyles.displayLink} onClick={expand}>
        Sessions
      </button>
      {session.map((s) => (
        <div style={{ display: display }} className={CardStyles.subSession}>
          <Link
            href={`/app/dashboard/admin/studentprofile/${user_id}/session/${s.id}/edit`}
          >
            <a className={CardStyles.Link}>
              Intake Date: {new Date(s.intake_date).toLocaleDateString()}{" "}
              {sessionStatus[s.status]}
            </a>
          </Link>
          {days.length > 0 && (
            <h3>
              Session Days:{" "}
              {new Date(days[0].attendance_day).toLocaleDateString()} -
              {new Date(
                days[days.length - 1].attendance_day
              ).toLocaleDateString()}
              {" ("}
              {days.length}
              {")"}
            </h3>
          )}
          <p>
            {s.grade}th grade, {schools[s.school]}
          </p>
          <table>
            <thead>
              <th className={TableStyles.column}>School Administrator</th>
              <th className={TableStyles.column}>Social Worker</th>
              <th className={TableStyles.column}>School Counselor</th>
            </thead>
            <tbody>
              <tr>
                <td className={TableStyles.column}>{s.school_administrator}</td>
                <td className={TableStyles.column}>{s.social_worker}</td>
                <td className={TableStyles.column}>{s.school_counselor}</td>
              </tr>
            </tbody>
          </table>
          <p>Pickup: {pickups[s.student_pickup]}</p>
          <TaskWrapper session_id={s.id}></TaskWrapper>
          <Attendance session_id={s.id} onfetch={attendance} />
          <SelView session_id={s.id} />
          <Link
            href={`/app/dashboard/admin/studentprofile/${user_id}/session/${s.id}/wrapup`}
          >
            <a>Wrap-up Meeting</a>
          </Link>
        </div>
      ))}
      {session.filter(s => s.status==0).length ===0 && <Link href={`/app/dashboard/admin/studentprofile/${user_id}/session/add`}>
        <a className={CardStyles.Link}>Add Session</a>
      </Link>}
    </div>
  );
};

export default SessionRead;
