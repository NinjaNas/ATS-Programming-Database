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
  const sessionInfo = () => {
    
      Axios.get("/api/session/read/", { params: { key: 0, tag: session_id } }).then(
        (response) => {
          setSession(response.data[0]);
        }
      )
  };

  const wrapUpInfo = () => {
      Axios.get("/api/session/wrapup/read/", { params: { key: 0, tag: session_id } }).then(
        (response) => {
          setMeeting(response.data[0]);
          // console.log(meeting.meeting_date);

        }
      );
  };


  useEffect(() => {
    sessionInfo();
    wrapUpInfo();
  }, []);


  // const intakeDateRef = useRef();
  // const consentedRef = useRef();
  // const gradeRef = useRef();
  // const schoolRef = useRef();
  // const schoolAdminRef = useRef();
  // const socialWorkerRef = useRef();
  // const schoolCounselorRef = useRef();
  // const schoolPickupRef = useRef();
  const statusRef = useRef();
  // const notesRef = useRef();

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

  return (
    <div>
      {meeting && session && (
        <>
          <DateForm ref={meetingDateRef} label="Meeting Date" passedValue={meeting.meeting_date} />
          <TimeForm ref={meetingTimeRef} label="Meeting Time" passedValue={meeting.meeting_time} />
          <Dropdown ref={meetingLocationRef} label="Location" passedValue={meeting.location} passedOptions={wrapupLocations} />
          <InputForm ref={familyRepRef} label="Family Rep(s)" passedValue={meeting.family_rep} />
          <Dropdown ref={familyRepAttendRef} label="Family Rep Attendance?" passedValue={meeting.family_rep_attend} passedOptions={meetingAttend} />
          <InputForm ref={schoolRepRef} label="School Rep(s)" passedValue={meeting.school_rep} />
          <Dropdown ref={schoolRepAttendRef} label="School Rep Attendance?" passedValue={meeting.school_rep_attend} passedOptions={meetingAttend} />
          <InputForm ref={otherRepRef} label="Other" passedValue={meeting.other_rep} />
          <Dropdown ref={otherRepAttend} label="Other Rep Attendance?" passedValue={meeting.other_rep_attend} passedOptions={meetingAttend} />
          <Dropdown ref={parentTranslatorRef} label="Parent Translator Required" passedValue={meeting.parent_translator} passedOptions={yesno} />
          <Dropdown ref={schoolTranslatorRef} label="Interpreter requested via school for wrap up" passedValue={meeting.school_translator} passedOptions={yesno} />
          <Dropdown ref={outsideTranslatorRef} label="Family to provide own translator" passedValue={meeting.outside_translator} passedOptions={yesno} />
          <Dropdown ref={courtInvolvedRef} label="Court Involved?" passedValue={meeting.court_involved} passedOptions={yesno} />
          <InputForm ref={courtCounselorRef} label="Other" passedValue={meeting.court_counselor} />
          <Dropdown ref={meetingStatusRef} label="Meeting Status" passedValue={meeting.meeting_status} passedOptions={meetingStatus}/>
          <InputForm ref={meetingNotesRef} label="Notes" passedValue={meeting.notes} />
          <Attendance session_id={session_id} />
          <Tasklist session_id={session_id} type="admin" />
          <Dropdown ref={statusRef} label="Session Status" passedValue={session.status} passedOptions={sessionStatus} />
          <input type="Submit" />
        </>
      )}
    </div>
  );
};

export default WrapUp;
