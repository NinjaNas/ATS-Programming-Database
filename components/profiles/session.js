import React, { useEffect, useRef, useState } from "react";
import TaskList from "../../components/dashboard/tasklist";
import Axios from "axios";
import Attendance from "../studentProfile/Attendance";

const Session = ({ user_id }) => {
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

  return (
    <div>
      {session.map((s) => (
        <>
          <p>{s.intake_date}</p>
          <TaskList session_id={s.id} />
          <Attendance session_id={s.id} />
        </>
      ))}
    </div>
  );
};

export default Session;
