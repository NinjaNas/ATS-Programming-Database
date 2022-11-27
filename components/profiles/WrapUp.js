import Axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
// import grades from "../../constants/grades";
import meetingAttend from "../../constants/meetingAttend";
import meetingStatus from "../../constants/meetingStatus";
import wrapupLocations from "../../constants/wrapupLocations";
import yesno from "../../constants/yesno";
// import pickups from "../../constants/pickups";
// import schools from "../../constants/schools";
// import sessionStatus from "../../constants/sessionStatus";
// import yesno from "../../constants/yesno";
import DateForm from "../forms/date";
import Dropdown from "../forms/dropdown";
import InputForm from "../forms/input";
import TimeForm from "../forms/time";
import Attendance from "../studentProfile/Attendance";
import Tasklist from "../dashboard/tasklist";
import sessionStatus from "../../constants/sessionStatus";

const WrapUp = ({ session_id }) => {
  const router = useRouter();
  const [session, setSession] = useState();
  const [meeting, setMeeting] = useState();
  const [user, setUser] = useState();
  const sessionInfo = () => {
    // console.log(router.query);
    Axios.get("/api/session/read/", {
      params: { key: 0, tag: session_id },
    }).then((response) => {
      // console.log(response)
      setSession(response.data[0]);
    });
  };

  const wrapUpInfo = () => {
    Axios.get("/api/session/wrapup/read/", {
      params: { key: 0, tag: session_id },
    }).then((response) => {
      if (response.data.length > 0) {
        setMeeting(response.data[0]);
      } else {
        createMeeting();
        wrapUpInfo();
      }
    });
  };

  const createMeeting = () => {
      const wrapup = {
        session_id: session.id,
        meeting_date: new Date().toLocaleDateString("en-CA"),
        meeting_time: new Date().toLocaleTimeString("it-IT"),
        location: 1,
        family_rep: "",
        family_rep_attend: 0,
        school_rep: "",
        school_rep_attend: 0,
        other_rep: "",
        other_rep_attend: 0,
        parent_translator: 0,
        school_translator: 0,
        outside_translator: 0,
        court_involved: 0,
        court_counselor: "",
        meeting_status: 0,
        performing_admin: user.id,
        notes: "",
      };
      Axios.post("/api/session/wrapup/create/", wrapup);
    
  };

  const currentUser = () => {
    Axios.get("/api/userData/").then((response) => {
      console.log(response)

      setUser(response.data[0][0]);
    });
  };

  useEffect(() => {
    currentUser();
    sessionInfo();
  }, []);

  useEffect(() => {
    if (session && user) {
      wrapUpInfo();
    }
  }, [user, session]);

  const statusRef = useRef();

  const meetingDateRef = useRef();
  const meetingTimeRef = useRef();
  const meetingLocationRef = useRef();
  const familyRepRef = useRef();
  const familyRepAttendRef = useRef();
  const schoolRepRef = useRef();
  const schoolRepAttendRef = useRef();

  const otherRepRef = useRef();
  const otherRepAttend = useRef();
  const parentTranslatorRef = useRef();
  const schoolTranslatorRef = useRef();
  const outsideTranslatorRef = useRef();
  const courtInvolvedRef = useRef();
  const courtCounselorRef = useRef();
  const meetingStatusRef = useRef();
  // performing_admin
  const meetingNotesRef = useRef();

  const submit = () => {
    const wrapup = {
      id: meeting.id,
      meeting_date: meetingDateRef.current.value,
      meeting_time: meetingTimeRef.current.value,
      location: meetingLocationRef.current.value,
      family_rep: familyRepRef.current.value,
      family_rep_attend: familyRepAttendRef.current.value,
      school_rep: schoolRepRef.current.value,
      school_rep_attend: schoolRepAttendRef.current.value,
      other_rep: otherRepRef.current.value,
      other_rep_attend: otherRepAttend.current.value,
      parent_translator: parentTranslatorRef.current.value,
      school_translator: schoolTranslatorRef.current.value,
      outside_translator: outsideTranslatorRef.current.value,
      court_involved: courtInvolvedRef.current.value,
      court_counselor: courtCounselorRef.current.value,
      meeting_status: meetingStatusRef.current.value,
      performing_admin: user.id,
      notes: meetingNotesRef.current.value,
    };
    Axios.post("/api/session/wrapup/update", wrapup);
    // const sessionData = {...session, status: statusRef.current.value}
    const sessionData = { ...session };
    sessionData.status = statusRef.current.value;
    sessionData.intake_date = new Date(session.intake_date).toLocaleDateString(
      "en-CA"
    );

    console.log(sessionData);
    Axios.post("/api/session/update", sessionData).then(
      (response) => {
        router.push("/app/dashboard/admin");
      }
      // }
    );
  };

  return (
    <div>
      {meeting && session && (
        <>
          <DateForm
            ref={meetingDateRef}
            label="Meeting Date"
            passedValue={meeting.meeting_date}
          />
          <TimeForm
            ref={meetingTimeRef}
            label="Meeting Time"
            passedValue={meeting.meeting_time}
          />
          <Dropdown
            ref={meetingLocationRef}
            label="Location"
            passedValue={meeting.location}
            passedOptions={wrapupLocations}
          />
          <InputForm
            ref={familyRepRef}
            label="Family Rep(s)"
            passedValue={meeting.family_rep}
          />
          <Dropdown
            ref={familyRepAttendRef}
            label="Family Rep Attendance?"
            passedValue={meeting.family_rep_attend}
            passedOptions={meetingAttend}
          />
          <InputForm
            ref={schoolRepRef}
            label="School Rep(s)"
            passedValue={meeting.school_rep}
          />
          <Dropdown
            ref={schoolRepAttendRef}
            label="School Rep Attendance?"
            passedValue={meeting.school_rep_attend}
            passedOptions={meetingAttend}
          />
          <InputForm
            ref={otherRepRef}
            label="Other"
            passedValue={meeting.other_rep}
          />
          <Dropdown
            ref={otherRepAttend}
            label="Other Rep Attendance?"
            passedValue={meeting.other_rep_attend}
            passedOptions={meetingAttend}
          />
          <Dropdown
            ref={parentTranslatorRef}
            label="Parent Translator Required"
            passedValue={meeting.parent_translator}
            passedOptions={yesno}
          />
          <Dropdown
            ref={schoolTranslatorRef}
            label="Interpreter requested via school for wrap up"
            passedValue={meeting.school_translator}
            passedOptions={yesno}
          />
          <Dropdown
            ref={outsideTranslatorRef}
            label="Family to provide own translator"
            passedValue={meeting.outside_translator}
            passedOptions={yesno}
          />
          <Dropdown
            ref={courtInvolvedRef}
            label="Court Involved?"
            passedValue={meeting.court_involved}
            passedOptions={yesno}
          />
          <InputForm
            ref={courtCounselorRef}
            label="Other"
            passedValue={meeting.court_counselor}
          />
          <Dropdown
            ref={meetingStatusRef}
            label="Meeting Status"
            passedValue={meeting.meeting_status}
            passedOptions={meetingStatus}
          />
          <InputForm
            ref={meetingNotesRef}
            label="Notes"
            passedValue={meeting.notes}
          />
          <Attendance session_id={session_id} />
          <Tasklist session_id={session_id} type="admin" />
          <Dropdown
            ref={statusRef}
            label="Session Status"
            passedValue={session.status}
            passedOptions={sessionStatus}
          />
          <input type="Submit" onClick={submit} />
        </>
      )}
    </div>
  );
};

export default WrapUp;
