import Axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import Navbar from "../../../../../../../../../components/dashboard/adminNav";
import StudentHeader from "../../../../../../../../../components/studentProfile/StudentHeader";
import Day from "../../../../../../../../../components/studentProfile/Day";
import { session } from "passport";
import Attendance from "../../../../../../../../../components/studentProfile/Attendance";


const addSession = () => {
  const router = useRouter();
  const { studentid, sessionid } = router.query
  const [student, setStudent] = useState();
  const [attendance, setAttendance] = useState([])


  const studentInfo = () => {
    Axios.get("/api/user/read", {params: {key:0, tag:studentid}}).then((response) => {
      // console.log(studentid);
      //  setStudent(response.data.filter(s => s.id == studentid));
      setStudent(response.data[0])
      //  setStudent[student.filter(s => student.id == studentid)]
    });
  };

  const addDay = () => {
    setAttendance([...attendance, sessionid])
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
      {sessionid && <Attendance session_id={sessionid}/>}
      <input type="submit" value="Finish" />
    </>
    )
}

export default addSession
