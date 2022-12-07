import React, { useRef } from "react";
import Axios from "axios";
import attendanceStatus from "../../constants/attendanceStatus";
import attendanceType from "../../constants/attendanceType";
import DateForm from "../forms/date";
import Dropdown from "../forms/dropdown";
import InputForm from "../forms/input";
import FormStyles from "../../styles/Forms.module.css";
import TableStyles from "../../styles/Table.module.css";
import { useRouter } from "next/router";

const Day = ({ id, session_id, date, status, type, reason_missed, onadd }) => {
  const dateRef = useRef();
  const statusRef = useRef();
  const typeRef = useRef();
  const missedRef = useRef();

  const submit = () => {
    const body = {
      attendance_day:
        dateRef.current.value != "" ? dateRef.current.value : null,
      type: typeRef.current.value != "" ? typeRef.current.value : null,
      status: statusRef.current.value != "" ? statusRef.current.value : null,
      reason_missed:
        missedRef.current.value != "" ? missedRef.current.value : null,
    };
    if (id) {
      body.id = id;
      Axios.post("/api/session/day/update", body)
        .then((response) => {
          onadd();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      body.session_id = session_id;
      Axios.post("/api/session/day/create", body)
        .then((response) => {
          onadd();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // This component is currently assumed to be in a table.
  // This could probably use some refactoring and re-styling
  return (
    <tr className={`${TableStyles.attendance}`}>
      <td>
        <DateForm ref={dateRef} label="Date" passedValue={date} />
      </td>
      <td>
        <Dropdown
          ref={typeRef}
          label="Type"
          passedValue={id ? type : ""}
          passedOptions={attendanceType}
        />
      </td>
      <td>
        <Dropdown
          ref={statusRef}
          label="Status"
          passedValue={id ? status : ""}
          passedOptions={attendanceStatus}
        />
      </td>
      <td>
        <InputForm
          ref={missedRef}
          label="Excuse"
          passedValue={id ? reason_missed : ""}
        />
      </td>
      <td>
        {id && (
          <input
            className={FormStyles.submit2}
            type="submit"
            value={"Save"}
            onClick={submit}
          />
        )}
        {session_id && (
          <input
            className={FormStyles.submit2}
            type="submit"
            value={"Add"}
            onClick={submit}
          />
        )}
      </td>
    </tr>
  );
};

export default Day;
