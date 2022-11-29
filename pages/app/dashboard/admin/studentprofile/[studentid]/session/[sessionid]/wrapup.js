import Axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../../../../../../../components/dashboard/adminNav";
import StudentHeader from "../../../../../../../../components/studentProfile/StudentHeader";
import WrapUp from "../../../../../../../../components/profiles/WrapUp";
import Footer from "../../../../../../../../components/dashboard/footer.js";
import Styles from "../../../../../../../../styles/Dashboard.module.css";

const editContact = () => {
	const router = useRouter();
	const { studentid, sessionid } = router.query;
	const [student, setStudent] = useState();

	const studentInfo = () => {
		Axios.get("/api/user/read", { params: { key: 0, tag: studentid } }).then(
			(response) => {
				setStudent(response.data[0]);
			}
		);
	};

	useEffect(() => {
		studentInfo();
	}, [studentid]);

	return (
		<div className={Styles.mainPage}>
			<Navbar />
      <div className={Styles.currentStud}>
			{studentid && student && (
				<StudentHeader
					id={studentid}
					firstName={student.first_name}
					lastName={student.last_name}
				/>
			)}
			{/* {sessionid && <SessionEdit id={sessionid} />} */}
			{sessionid && <WrapUp session_id={sessionid} />}
      </div>
			<Footer></Footer>
		</div>
	);
};

export default editContact;
