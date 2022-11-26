import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import attendanceStatus from "../../constants/attendanceStatus";
import attendanceType from "../../constants/attendanceType";
import DateForm from "../forms/date";
import Dropdown from "../forms/dropdown";
import InputForm from "../forms/input";
import CardStyles from "../../styles/Cards.module.css"
import TableStyles from "../../styles/Table.module.css"
import { useRouter } from "next/router";


const Day = ({ id, session_id, date, status, type, reason_missed, onadd }) => {
  const dateRef = useRef();
  const statusRef = useRef();
  const typeRef = useRef();
  const missedRef = useRef();

  const router = useRouter();
  
  const submit = () => {
    const body = {
      attendance_day: dateRef.current.value,
      type: typeRef.current.value,
      status: statusRef.current.value,
      reason_missed: missedRef.current.value,
    };
    if (id) {
      body.id = id;
      Axios.post("/api/session/day/update", body)
        .then((response) => {
          // router.reload()
          console.log("update")
          onadd();
        //   router.push(`/app/dashboard/admin/studentprofile/${session.user_id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      body.session_id = session_id;
      Axios.post("/api/session/day/create", body)
        .then((response) => {
        //   router.push(`/app/dashboard/admin/studentprofile/${session.user_id}`);
        // router.reload()
        console.log("create")
        onadd();
      })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    // <tr className={session_id ? `${CardStyles.card} ` : " " + `${TableStyles.attendance}`}>
    <tr className={`${TableStyles.attendance}`}>
      <td><DateForm ref={dateRef} label="Date" passedValue={date} /></td>
      <td><Dropdown
        ref={typeRef}
        label="Type"
        passedValue={id ? type : ""}
        passedOptions={attendanceType}
      /></td>
      <td><Dropdown
        ref={statusRef}
        label="Status"
        passedValue={id ? status : ""}
        passedOptions={attendanceStatus}
      /></td>
      <td><InputForm
        ref={missedRef}
        label="Reason Missed"
        passedValue={id ? reason_missed : ""}
      /></td>
      <td>{id && <input type="submit" value={"Save"} onClick={submit} />}
      {session_id && <input type="submit" value={"Add"} onClick={submit} />}
      </td>
    </tr>
  );
};

export default Day;
