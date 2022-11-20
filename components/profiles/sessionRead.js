import React, { useEffect, useRef, useState } from "react";
import TaskList from "../dashboard/tasklist";
import Axios from "axios";
import Attendance from "../studentProfile/Attendance";
import CardStyles from "../../styles/Cards.module.css";
import TableStyles from "../../styles/Table.module.css";
import Link from "next/link";

const SessionRead = ({ user_id }) => {
  const [session, setSession] = useState([]);

  const sessionInfo = () => {
    Axios.get("http://localhost:3000/api/session/read/", {
      params: { key: 1, tag: user_id },
    }).then((response) => {
      // setDemographics(response.data.filter(s => s.user_id == id));
      setSession(response.data);
    });
  };

  useEffect(() => {
    sessionInfo();
  }, []);

  const schools = {
    1: "Culbreth Middle School",
    2: "McDougle Middle School",
    3: "Phillips Middle School",
    4: "Smith Middle School",
    5: "Carrboro High School",
    6: "Chapel Hill High School",
    7: "East Chapel Hill High School",
    8: "Phoenix Academy High School",
    9: "AL Stanback Middle School",
    10: "Orange Middle School",
    11: "Gravelly Hills Middle School",
    12: "Cedar Ridge High School",
    13: "Orange High School",
    14: "Partnership Academy High School",
  }

  const pickups = {
    1: "Designated Pick up Person",
    2: "Walk home" ,
    3: "Student will drive themselves" ,
    4: "Public Transportation" ,
    5: "School will arrange transportation"
  }

  const sessionStatus = {
    0: "Incomplete",
    1: "Unsuccessful",
    2: "Satisfactory",
    3: "Successful"
  }

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
