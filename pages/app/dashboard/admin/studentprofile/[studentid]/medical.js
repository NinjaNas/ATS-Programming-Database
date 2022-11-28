import Axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import Navbar from "../../../../../../components/dashboard/adminNav";
import MedicalEdit from "../../../../../../components/profiles/medicalEdit";
import StudentHeader from "../../../../../../components/studentProfile/StudentHeader";

const medical = () => {
  const router = useRouter();
  const { studentid } = router.query
  const [student, setStudent] = useState();

  const studentInfo = () => {
    Axios.get("/api/user/read", {params: {key:0, tag:studentid}}).then((response) => {
      setStudent(response.data[0])
    });
  };


  useEffect(() => {
    studentInfo();
  }, [studentid])

  return (
    <>
      <Navbar />
      {studentid && student && <StudentHeader id={studentid} firstName={student.first_name} lastName={student.last_name}/>}
      {studentid && <MedicalEdit id={studentid} />}
    </>
    )
}

export default medical
