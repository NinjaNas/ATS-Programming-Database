import React, { useEffect, useState } from "react";
import Axios from "axios";
import Day from "./Day";
import CardStyles from "../../styles/Cards.module.css";

const Attendance = ({ session_id, onfetch }) => {
  const [days, setDays] = useState([]);
  const [add, setAdd] = useState(true);
  // const [retrieve, setRetrieve] = useState(false);

  const attendance = () => {
    setAdd(false);
    Axios.get("/api/session/day/read", {
      params: { key: 0, tag: session_id },
    }).then((response) => {
      const data = response.data.sort(
        (a, b) => new Date(a.attendance_day) - new Date(b.attendance_day)
      );
      setDays(data);
      setAdd(true);
      onfetch && onfetch(data);
    });
  };
  /*UseEffect calls allStudents on page Mount only*/

  useEffect(() => {
    attendance();
  }, []);

  return (
    <div>
      <h2>Attendance</h2>
      {days && (
        <h3>{`${days.filter((d) => d.status == 1).length}/${
          days.length
        } Attended`}</h3>
      )}
      <table>
        {add && onfetch && (
          <Day
            session_id={session_id}
            onadd={attendance}
            style={CardStyles.card}
          />
        )}
        {days.map((d) => (
          <Day
            key={d.id}
            id={d.id}
            date={d.attendance_day}
            status={d.status}
            type={d.type}
            reason_missed={d.reason_missed}
            onadd={attendance}
          />
        ))}
      </table>
    </div>
  );
};

export default Attendance;
