import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import attendanceStatus from "../../constants/attendanceStatus";
import attendanceType from "../../constants/attendanceType";
import DateForm from "../forms/date";
import Dropdown from "../forms/dropdown";
import InputForm from "../forms/input";

const Day = ({ id, session_id, date, status, type, reason_missed }) => {
  const dateRef = useRef();
  const statusRef = useRef();
  const typeRef = useRef();
  const missedRef = useRef();

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
        // .then((response) => {
        //   router.push(`/app/dashboard/admin/studentprofile/${session.user_id}`);
        // })
        .catch((err) => {
          console.log(err);
        });
    } else {
      body.session_id = session_id;
      Axios.post("/api/session/day/create", body)
        // .then((response) => {
        //   router.push(`/app/dashboard/admin/studentprofile/${session.user_id}`);
        // })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <DateForm ref={dateRef} label="Date" passedValue={date} />
      <Dropdown
        ref={typeRef}
        label="Type"
        passedValue={type}
        passedOptions={attendanceType}
      />
      <Dropdown
        ref={statusRef}
        label="Status"
        passedValue={status}
        passedOptions={attendanceStatus}
      />
      <InputForm
        ref={missedRef}
        label="Reason Missed"
        passedValue={reason_missed}
      />
      <input type="submit" value={"Save"} onClick={submit} />
    </div>
  );
};

export default Day;
