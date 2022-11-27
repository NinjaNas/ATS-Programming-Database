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

const SessionEdit = ({ id, user_id }) => {
  const router = useRouter();
  const [session, setSession] = useState();
  const sessionInfo = () => {
    if (id) {
      Axios.get("/api/session/read/", { params: { key: 0, tag: id } }).then(
        (response) => {
          setSession(response.data[0]);
        }
      );
    } else {
      setSession({ user_id: user_id });
    }
  };

  useEffect(() => {
    sessionInfo();
  }, []);

  // TODO: Update correct params
  const onSave = () => {
    const body = {
      // id: contact.id,

      intake_date: intakeDateRef.current.value,
      consented: consentedRef.current.value,
      grade: gradeRef.current.value,
      school: schoolRef.current.value,
      school_administrator: schoolAdminRef.current.value,
      social_worker: socialWorkerRef.current.value,
      school_counselor: schoolCounselorRef.current.value,
      student_pickup: schoolPickupRef.current.value,
      status: statusRef.current.value,
      notes: notesRef.current.value || "",
    };

    if (id) {
      body.id = id;
      Axios.post("/api/session/update", body)
        .then((response) => {
          router.push(`/app/dashboard/admin/studentprofile/${session.user_id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
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
    <div>
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
          {user_id && <input type="submit" value="Add" onClick={onSave} />}
        </>
      )}
    </div>
  );
};

export default SessionEdit;
