import Axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import Navbar from "../../../../../../../../../components/dashboard/adminNav";
import StudentHeader from "../../../../../../../../../components/studentProfile/StudentHeader";
import Day from "../../../../../../../../../components/studentProfile/Day";
import { session } from "passport";
import Attendance from "../../../../../../../../../components/studentProfile/Attendance";
import taskType from "../../../../../../../../../constants/taskType";


const addSession = () => {
  const router = useRouter();
  const { studentid, sessionid } = router.query
  const [student, setStudent] = useState();
  const [days, setDays] = useState([]);
  // const [attendance, setAttendance] = useState([])


  const studentInfo = () => {
    Axios.get("/api/user/read", {params: {key:0, tag:studentid}}).then((response) => {
      // console.log(studentid);
      //  setStudent(response.data.filter(s => s.id == studentid));
      setStudent(response.data[0])
      //  setStudent[student.filter(s => student.id == studentid)]
    });
  };

  // const addDay = () => {
  //   setAttendance([...attendance, sessionid])
  // }
  const attendance = (data) => {
    console.log(data)
    setDays(data);
  }

  const finish = () => {

    for (let i = 3; i <= 6; i++){
      let body = {         
        session_id: sessionid,
        task_type: i,
        task_name: `Need ${taskType[i]}`,
        start_date: null,
        due_date: new Date(days[days.length - 1].attendance_day).toLocaleDateString("en-CA"),
        task_description: null,
        status: 1,
        end_date: null
      }
      console.log(body)
      Axios.post("/api/session/task/create", body).then(response => {console.log(response)}); 
      // .then(response => {
      //   router.push(`/app/dashboard/admin/studentprofile/${studentid}`)
      // });
    }
    
    const q1 = {
      session_id: sessionid,
      questionnaire_date: new Date(days[0].attendance_day).toLocaleDateString("en-CA"),
      // questionnaire_date: days[0],
      type: 1,
      question_strengths: 0,
      question_help: 0,
      question_pride: 0,
      question_relationships:0 ,
      question_collaboration:0 ,
      question_composure: 0,
      question_goals: 0,
      status: 0,
      notes: null,
    }

    
    const q2 = {
      session_id: sessionid,
      // questionnaire_date: days[days.length - 1],
      questionnaire_date: new Date(days[days.length - 1].attendance_day).toLocaleDateString("en-CA"),
      type: 1,
      question_strengths: 0,
      question_help: 0,
      question_pride: 0,
      question_relationships:0 ,
      question_collaboration:0 ,
      question_composure: 0,
      question_goals: 0,
      status: 0,
      notes: null,
    }

    console.log(q1);
    console.log(q2);
    Axios.post("/api/session/questionnaire/create", q1).then(response => {console.log(response)}); 

    Axios.post("/api/session/questionnaire/create", q2).then(response => {
      console.log(response);
      router.push(`/app/dashboard/admin/studentprofile/${studentid}`)
    });
  }

  useEffect(() => {
    studentInfo();
  }, [studentid])

  return (
    <>
      <Navbar />
      {studentid && student && <StudentHeader id={studentid} firstName={student.first_name} lastName={student.last_name}/>}
      {/* {studentid && <SessionEdit user_id={studentid} />} */}
      {/* {<input type="submit" value="Add" onClick={addDay}/>} */}
      {/* {attendance.map(a => <Day session_id={a}/>)} */}
      {sessionid && <Attendance session_id={sessionid} onfetch={attendance}/>}
      <input type="submit" value="Finish" onClick={finish}/>
    </>
    )
}

export default addSession
