import React from "react";
import pageStyles from "../../../../../styles/Dashboard.module.css";
import Navbar from "../../../../../components/dashboard/adminNav.js";
import Footer from "../../../../../components/dashboard/footer.js";

function UserProfile() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
	const [searchedU, setSearchedU] = useState([]);
	return (
		<div className={pageStyles.mainPage}>
			<Navbar></Navbar>
			<div style={{ height: "90%" }}></div>
			<Footer></Footer>
		</div>
	);
}

export default UserProfile;
