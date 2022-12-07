import Axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import grades from "../../constants/grades";
import pickups from "../../constants/pickups";
import schools from "../../constants/schools";
import sessionStatus from "../../constants/sessionStatus";
import yesno from "../../constants/yesno";
import DateForm from "../forms/date";
import Dropdown from "../forms/dropdown";
import InputForm from "../forms/input";
import FormStyles from "../../styles/Forms.module.css";

const SessionEdit = ({ id, user_id }) => {
  const router = useRouter();
  const [session, setSession] = useState();
  const sessionInfo = () => {
    if (id) {
      Axios.get(
        "/api/session/read/",
        { params: { key: 0, tag: id } } // key=0 matches session.id to tag
      )
        .then((response) => {
          setSession(response.data[0]);
        })
        .catch((err) => {
          console.log(err);
          // If unauthorized, redirect back to login page
          if (err.response.status === 401) {
            router.push("/app/login");
          }
        });
    } else {
      // if no id is passed, then we want to create a new session
      // use new object with matching user_id field
      setSession({ user_id: user_id });
    }
  };

  /* useEffect calls sessionInfo on mount only */
  useEffect(() => {
    sessionInfo();
  }, []);

  const onSave = () => {
    const body = {
      intake_date:
        intakeDateRef.current.value != "" ? intakeDateRef.current.value : null,
      consented:
        consentedRef.current.value != "" ? consentedRef.current.value : null,
      grade: gradeRef.current.value != "" ? gradeRef.current.value : null,
      school: schoolRef.current.value != "" ? schoolRef.current.value : null,
      school_administrator:
        schoolAdminRef.current.value != ""
          ? schoolAdminRef.current.value
          : null,
      social_worker:
        socialWorkerRef.current.value != ""
          ? socialWorkerRef.current.value
          : null,
      school_counselor:
        schoolCounselorRef.current.value != ""
          ? schoolCounselorRef.current.value
          : null,
      student_pickup:
        schoolPickupRef.current.value != ""
          ? schoolPickupRef.current.value
          : null,
      status: statusRef.current.value != "" ? statusRef.current.value : null,
      notes: notesRef.current.value != "" ? notesRef.current.value : null,
    };

    if (id) {
      // if id is present, then update the matching session
      body.id = id;
      Axios.post("/api/session/update", body)
        .then((response) => {
          router.push(`/app/dashboard/admin/studentprofile/${session.user_id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // otherwise, create a new session with the matching user_id
      body.user_id = user_id;
      Axios.post("/api/session/create", body)
        .then((response) => {
          router.push(
            `/app/dashboard/admin/studentprofile/${session.user_id}/session/${response.data.session_id}/days/add/`
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onDelete = () => {
    // extra step for user before they delete
    if (deleteRef.current.value.toLowerCase().trim() == "confirm") {
      Axios.post("/api/session/delete", {
        session_id: id,
      })
        .then(
          router.push(`/app/dashboard/admin/studentprofile/${session.user_id}`)
        )
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const intakeDateRef = useRef();
  const consentedRef = useRef();
  const gradeRef = useRef();
  const schoolRef = useRef();
  const schoolAdminRef = useRef();
  const socialWorkerRef = useRef();
  const schoolCounselorRef = useRef();
  const schoolPickupRef = useRef();
  const statusRef = useRef();
  const notesRef = useRef();
  const deleteRef = useRef();

  return (
    <div
      className={FormStyles.editForm}
      style={{ width: "40%", height: "120%" }}
    >
      {session && (
        <>
          <DateForm
            ref={intakeDateRef}
            label="Intake Date"
            passedValue={session.intake_date}
          />
          <Dropdown
            ref={consentedRef}
            label="Consented"
            passedValue={session.consented}
            passedOptions={yesno}
          />
          <Dropdown
            ref={gradeRef}
            label="Grade"
            passedValue={session.grade}
            passedOptions={grades}
          />
          <Dropdown
            ref={schoolRef}
            label="School"
            passedValue={session.school}
            passedOptions={schools}
          />
          <InputForm
            ref={schoolAdminRef}
            label="School Administrator"
            passedValue={session.school_administrator}
          />
          <InputForm
            ref={socialWorkerRef}
            label="Social Worker"
            passedValue={session.social_worker}
          />
          <InputForm
            ref={schoolCounselorRef}
            label="School Counselor"
            passedValue={session.school_counselor}
          />
          <Dropdown
            ref={schoolPickupRef}
            label="Pickup"
            passedValue={session.pickup}
            passedOptions={pickups}
          />
          <Dropdown
            ref={statusRef}
            label="Session Status"
            passedValue={session.status}
            passedOptions={sessionStatus}
          />
          <InputForm
            ref={notesRef}
            label="Additional Notes"
            passedValue={session.notes}
          />
          {/* For existing session */}
          {id && (
            <div>
              <div>
                <input type="submit" value="Save" onClick={onSave} />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Type 'confirm' to delete"
                  ref={deleteRef}
                />
                <input type="button" value="Delete" onClick={onDelete} />
              </div>
            </div>
          )}
          {/* For new session */}
          {user_id && <input type="submit" value="Add" onClick={onSave} />}
        </>
      )}
    </div>
  );
};

export default SessionEdit;
