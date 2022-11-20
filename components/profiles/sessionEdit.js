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
  const contactInfo = () => {
    if (id) {
      // TODO: update for session info
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
    contactInfo();
  }, []);

  // TODO: Update correct params
  const onSave = () => {
    const body = {
      // id: contact.id,
      phone: intakeDateRef.current.value,
      address: consentedRef.current.value,
      city: gradeRef.current.value,
      zip: schoolRef.current.value,
      status: schoolAdminRef.current.value,
    };
    if (id) {
      body.id = id;
      Axios.post("/api/contact/update", body)
        .then((response) => {
          router.push(`/app/dashboard/admin/studentprofile/${session.user_id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      body.user_id = user_id;
      Axios.post("/api/contact/create", body)
        .then((response) => {
          router.push(`/app/dashboard/admin/studentprofile/${session.user_id}`);
        })
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
          <Dropdown ref={gradeRef} label="Grade" passedValue={session.city} passedOptions={grades}/>
          <Dropdown ref={schoolRef} label="School" passedValue={session.school} passedOptions={schools} />
          <InputForm ref={schoolAdminRef} label="School Administrator" passedValue={session.school_administrator}/>
          <InputForm ref={socialWorkerRef} label="Social Worker" passedValue={session.school_counselor} />
          <InputForm ref={schoolCounselorRef} label="School Counselor" passedValue={session.school_counselor} />
          <Dropdown ref={schoolPickupRef} label="Pickup" passedValue={session.pickup} passedOptions={pickups} />
          <Dropdown ref={statusRef} label="Session Status" passedValue={session.status} passedOptions={sessionStatus} />
          <InputForm ref={notesRef} label="Additional Notes" passedValue={session.notes} />
          <input type="submit" value="Save" onClick={onSave} />
        </>
      )}
    </div>
  );
};

export default SessionEdit;
