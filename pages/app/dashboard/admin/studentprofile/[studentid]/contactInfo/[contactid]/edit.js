import Axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import Navbar from "../../../../../../../../components/dashboard/adminNav";
import StudentHeader from "../../../../../../../../components/studentProfile/StudentHeader";
import ContactEdit from "../../../../../../../../components/profiles/ContactEdit";

const editContact = () => {
  const router = useRouter();
  const { studentid, contactid } = router.query
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
      {contactid && <ContactEdit id={contactid} />}
    </>
    )
}

export default editContact
