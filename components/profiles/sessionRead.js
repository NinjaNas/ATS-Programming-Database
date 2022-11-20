import React, { useEffect, useRef, useState } from "react";
import TaskList from "../dashboard/tasklist";
import Axios from "axios";
import Attendance from "../studentProfile/Attendance";
import CardStyles from "../../styles/Cards.module.css";
import TableStyles from "../../styles/Table.module.css";
import Link from "next/link";
import schools from "../../constants/schools";
import sessionStatus from "../../constants/sessionStatus";
import pickups from "../../constants/pickups";

const SessionRead = ({ user_id }) => {
  const [session, setSession] = useState([]);

  const sessionInfo = () => {
    Axios.get("/api/session/read/", {
      params: { key: 1, tag: user_id },
    }).then((response) => {
      // setDemographics(response.data.filter(s => s.user_id == id));
      setSession(response.data);
    });
  };

  useEffect(() => {
    sessionInfo();
  }, []);



  return (
    <div className={CardStyles.card}>
      {session.map((s) => (
        <div className={CardStyles.card}>
          <Link href=""><a>Intake Date: {(new Date(s.intake_date)).toLocaleDateString()} {sessionStatus[s.status]}</a></Link>
          <p>{s.grade}th grade, {schools[s.school]}</p>
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
          <TaskList session_id={s.id} />
          <Attendance session_id={s.id} />
        </div>
      ))}
    </div>
  );
};

export default SessionRead;
