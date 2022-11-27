import Axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import Navbar from "../../../../../../../../components/dashboard/adminNav";
import StudentHeader from "../../../../../../../../components/studentProfile/StudentHeader";
import WrapUp from "../../../../../../../../components/profiles/WrapUp";
import Footer from "../../../../../../../../components/dashboard/footer.js";



const editContact = () => {
  const router = useRouter();
  const { studentid, sessionid } = router.query
  const [student, setStudent] = useState();

  
  const studentInfo = () => {
    Axios.get("/api/user/read", {params: {key:0, tag:studentid}}).then((response) => {
      // console.log(studentid);
      //  setStudent(response.data.filter(s => s.id == studentid));
      setStudent(response.data[0])
      //  setStudent[student.filter(s => student.id == studentid)]
    });
  };


  useEffect(() => {
    studentInfo();
  }, [studentid])

  return (
    <>
      <Navbar />
      {studentid && student && <StudentHeader id={studentid} firstName={student.first_name} lastName={student.last_name}/>}
      {/* {sessionid && <SessionEdit id={sessionid} />} */}
      {sessionid && <WrapUp session_id={sessionid} />}
      <Footer></Footer>
    </>
    )
}

export default editContact
