import Axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import meetingAttend from "../../constants/meetingAttend";
import meetingStatus from "../../constants/meetingStatus";
import wrapupLocations from "../../constants/wrapupLocations";
import yesno from "../../constants/yesno";
import DateForm from "../forms/date";
import Dropdown from "../forms/dropdown";
import InputForm from "../forms/input";
import TimeForm from "../forms/time";
import Attendance from "../studentProfile/Attendance";
import TaskWrapper from "../dashboard/adminTasklistWrapper";
import sessionStatus from "../../constants/sessionStatus";
import Styles from "../../styles/Cards.module.css";
import FormStyles from "../../styles/Forms.module.css";

const WrapUp = ({ session_id }) => {
  const router = useRouter();
  const [session, setSession] = useState();
  const [meeting, setMeeting] = useState();
  const [user, setUser] = useState();
  const sessionInfo = () => {
    Axios.get("/api/session/read/", {
      params: { key: 0, tag: session_id }, // key=0 matches session.id to tag
    })
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
  };

  const wrapUpInfo = () => {
    // Grab the session wrap-up meeting from the database
    Axios.get("/api/session/wrapup/read/", {
      params: { key: 0, tag: session_id }, // key=0 matches wrap_up_meeting.session_id to tag
    }).then((response) => {
      if (response.data.length > 0) {
        setMeeting(response.data[0]);
      } else {
        // if no wrap up meeting is found, create the meeting and re-run function to retrieve from db
        // to ensure it was properly created
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
    Axios.get("/api/userData/")
      .then((response) => {
        setUser(response.data[0][0]);
      })
      .catch((err) => {
        console.log(err);
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
      meeting_date:
        meetingDateRef.current.value != ""
          ? meetingDateRef.current.value
          : null,
      meeting_time:
        meetingTimeRef.current.value != ""
          ? meetingTimeRef.current.value
          : null,
      location:
        meetingLocationRef.current.value != ""
          ? meetingLocationRef.current.value
          : null,
      family_rep:
        familyRepRef.current.value != "" ? familyRepRef.current.value : null,
      family_rep_attend:
        familyRepAttendRef.current.value != ""
          ? familyRepAttendRef.current.value
          : null,
      school_rep:
        schoolRepRef.current.value != "" ? schoolRepRef.current.value : null,
      school_rep_attend:
        schoolRepAttendRef.current.value != ""
          ? schoolRepAttendRef.current.value
          : null,
      other_rep:
        otherRepRef.current.value != "" ? otherRepRef.current.value : null,
      other_rep_attend:
        otherRepAttend.current.value != ""
          ? otherRepAttend.current.value
          : null,
      parent_translator:
        parentTranslatorRef.current.value != ""
          ? parentTranslatorRef.current.value
          : null,
      school_translator:
        schoolTranslatorRef.current.value != ""
          ? schoolTranslatorRef.current.value
          : null,
      outside_translator:
        outsideTranslatorRef.current.value != ""
          ? outsideTranslatorRef.current.value
          : null,
      court_involved:
        courtInvolvedRef.current.value != ""
          ? courtInvolvedRef.current.value
          : null,
      court_counselor:
        courtCounselorRef.current.value != ""
          ? courtCounselorRef.current.value
          : null,
      meeting_status:
        meetingStatusRef.current.value != ""
          ? meetingStatusRef.current.value
          : null,
      performing_admin: user.id,
      notes:
        meetingNotesRef.current.value != ""
          ? meetingNotesRef.current.value
          : null,
    };

    Axios.post("/api/session/wrapup/update", wrapup)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    // const sessionData = {...session, status: statusRef.current.value}
    const sessionData = { ...session };
    sessionData.status = statusRef.current.value;
    sessionData.intake_date = new Date(session.intake_date).toLocaleDateString(
      "en-CA"
    );

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
          <div className={Styles.subSession}>
            <div style={{ width: "20%" }}>
              <DateForm
                ref={meetingDateRef}
                label="Meeting Date"
                passedValue={meeting.meeting_date}
              />
            </div>
            <div style={{ width: "20%" }}>
              <TimeForm
                ref={meetingTimeRef}
                label="Meeting Time"
                passedValue={meeting.meeting_time}
              />
            </div>
            <div style={{ width: "20%" }}>
              <Dropdown
                ref={meetingLocationRef}
                label="Location"
                passedValue={meeting.location}
                passedOptions={wrapupLocations}
              />
            </div>
            <div style={{ width: "20%" }}>
              <InputForm
                ref={familyRepRef}
                label="Family Rep(s)"
                passedValue={meeting.family_rep}
              />
            </div>
            <div style={{ width: "20%" }}>
              <Dropdown
                ref={familyRepAttendRef}
                label="Family Rep Attendance?"
                passedValue={meeting.family_rep_attend}
                passedOptions={meetingAttend}
              />
            </div>
            <div style={{ width: "20%" }}>
              <InputForm
                ref={schoolRepRef}
                label="School Rep(s)"
                passedValue={meeting.school_rep}
              />
            </div>
            <div style={{ width: "20%" }}>
              <Dropdown
                ref={schoolRepAttendRef}
                label="School Rep Attendance?"
                passedValue={meeting.school_rep_attend}
                passedOptions={meetingAttend}
              />
            </div>
            <div style={{ width: "20%" }}>
              <InputForm
                ref={otherRepRef}
                label="Other"
                passedValue={meeting.other_rep}
              />
            </div>
            <div style={{ width: "20%" }}>
              <Dropdown
                ref={otherRepAttend}
                label="Other Rep Attendance?"
                passedValue={meeting.other_rep_attend}
                passedOptions={meetingAttend}
              />
            </div>
            <div style={{ width: "20%" }}>
              <Dropdown
                ref={parentTranslatorRef}
                label="Parent Translator Required"
                passedValue={meeting.parent_translator}
                passedOptions={yesno}
              />
            </div>
            <div style={{ width: "20%" }}>
              <Dropdown
                ref={schoolTranslatorRef}
                label="Interpreter requested via school for wrap up"
                passedValue={meeting.school_translator}
                passedOptions={yesno}
              />
            </div>
            <div style={{ width: "20%" }}>
              <Dropdown
                ref={outsideTranslatorRef}
                label="Family to provide own translator"
                passedValue={meeting.outside_translator}
                passedOptions={yesno}
              />
            </div>
            <div style={{ width: "20%" }}>
              <Dropdown
                ref={courtInvolvedRef}
                label="Court Involved?"
                passedValue={meeting.court_involved}
                passedOptions={yesno}
              />
            </div>
            <div style={{ width: "20%" }}>
              <InputForm
                ref={courtCounselorRef}
                label="Other"
                passedValue={meeting.court_counselor}
              />
            </div>
            <div style={{ width: "20%" }}>
              <Dropdown
                ref={meetingStatusRef}
                label="Meeting Status"
                passedValue={meeting.meeting_status}
                passedOptions={meetingStatus}
              />
            </div>
            <div style={{ width: "20%" }}>
              <InputForm
                ref={meetingNotesRef}
                label="Notes"
                passedValue={meeting.notes}
              />
            </div>
          </div>
          <div className={Styles.subSession}>
            <Attendance session_id={session_id} />
            <TaskWrapper session_id={session_id} />
          </div>
          <div
            style={{
              width: "20%",
              color: "#595959",
              fontFamily: "sans-serifs",
            }}
          >
            <Dropdown
              ref={statusRef}
              label="Session Status"
              passedValue={session.status}
              passedOptions={sessionStatus}
            />
          </div>
          <div style={{ width: "7%" }}>
            <input
              className={FormStyles.submit2}
              type="Submit"
              onClick={submit}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default WrapUp;
