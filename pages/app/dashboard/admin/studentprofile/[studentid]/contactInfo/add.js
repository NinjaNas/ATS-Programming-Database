import Axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../../../../../../components/dashboard/adminNav";
import StudentHeader from "../../../../../../../components/studentProfile/StudentHeader";
import ContactEdit from "../../../../../../../components/profiles/ContactEdit";

const addContact = () => {
  const router = useRouter();
  const { studentid } = router.query;
  const [student, setStudent] = useState();

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
      {studentid && <ContactEdit user_id={studentid} />}
    </>
  );
};

export default addContact;
