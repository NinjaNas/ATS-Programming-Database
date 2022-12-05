import Axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../../../../../../../../components/dashboard/adminNav";
import StudentHeader from "../../../../../../../../../components/studentProfile/StudentHeader";
import Attendance from "../../../../../../../../../components/studentProfile/Attendance";
import taskType from "../../../../../../../../../constants/taskType";

const addSession = () => {
  const router = useRouter();
  const { studentid, sessionid } = router.query;
  const [student, setStudent] = useState();
  const [days, setDays] = useState([]);
  // const [attendance, setAttendance] = useState([])

  const studentInfo = () => {
    Axios.get("/api/user/read", { params: { key: 0, tag: studentid } })
      .then((response) => {
        setStudent(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          router.push("/app/login");
        }
      });
  };

  // const addDay = () => {
  //   setAttendance([...attendance, sessionid])
  // }
  const attendance = (data) => {
    setDays(data);
  };

  const finish = () => {
    for (let i = 3; i <= 6; i++) {
      let body = {
        session_id: sessionid,
        task_type: i,
        task_name: `${taskType[i]}`,
        start_date: null,
        due_date: new Date(
          days[days.length - 1].attendance_day
        ).toLocaleDateString("en-CA"),
        task_description: null,
        status: 1,
        end_date: null,
      };
      Axios.post("/api/session/task/create", body).then((response) => {
        console.log(response);
      });
    }

    const q1 = {
      session_id: sessionid,
      questionnaire_date: new Date(days[0].attendance_day).toLocaleDateString(
        "en-CA"
      ),
      type: 1,
      question_strengths: 0,
      question_help: 0,
      question_pride: 0,
      question_relationships: 0,
      question_collaboration: 0,
      question_composure: 0,
      question_goals: 0,
      status: 0,
      notes: null,
    };

    const q2 = {
      session_id: sessionid,
      // questionnaire_date: days[days.length - 1],
      questionnaire_date: new Date(
        days[days.length - 1].attendance_day
      ).toLocaleDateString("en-CA"),
      type: 2,
      question_strengths: 0,
      question_help: 0,
      question_pride: 0,
      question_relationships: 0,
      question_collaboration: 0,
      question_composure: 0,
      question_goals: 0,
      status: 0,
      notes: null,
    };

    Axios.post("/api/session/questionnaire/create", q1).then((response) => {
      console.log(response);
    });

    Axios.post("/api/session/questionnaire/create", q2).then((response) => {
      router.push(`/app/dashboard/admin/studentprofile/${studentid}`);
    });
  };

  useEffect(() => {
    studentInfo();
  }, [studentid]);

  return (
    <>
      <Navbar />
      {studentid && student && (
        <StudentHeader
          id={studentid}
          firstName={student.first_name}
          lastName={student.last_name}
        />
      )}
      {sessionid && <Attendance session_id={sessionid} onfetch={attendance} />}
      {days.length > 0 && (
        <input type="submit" value="Finish" onClick={finish} />
      )}
    </>
  );
};

export default addSession;
