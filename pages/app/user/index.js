import React from "react";
import Axios from "axios";
import pageStyles from "../../../styles/Dashboard.module.css";
import Navbar from "../../../components/dashboard/adminNav.js";
import Footer from "../../../components/dashboard/footer.js";
import { useState, useEffect } from "react";

function current(data) {
	const [users, setUsers] = useState([]);

	const allStudents = () => {
		Axios.get("http://localhost:3000/api/users").then((response) => {
			setUsers(response.data);
		});
	};

	useEffect(() => {
		allStudents();
	}, []);

	return (
		<div className={pageStyles.mainPage}>
			<Navbar></Navbar>
			<div className={pageStyles.currentStud}>
				<table className={pageStyles.subtitle}>
					{users.map((val, key) => {
						return (
							<>
								<tr>
									<th></th>
									<th></th>
									<th></th>
								</tr>
								<tr>
									<td>
										<a
											className={pageStyles.subtitle}
											style={{ display: "block" }}
											href='/app/user/profile'>
											{val.first_name}
										</a>
									</td>
									<td className={pageStyles.tdNames}>
										<a
											className={pageStyles.subtitle}
											style={{ display: "block" }}
											href='/app/user/profile'>
											{val.last_name}
										</a>
									</td>
									<td className={pageStyles.tdButton}>
										<button className={pageStyles.button}><a style={{color:"#177457"}} href="/app/user/edit">edit</a></button>
									</td>
								</tr>
							</>
						);
					})}
				</table>
			</div>
			<Footer></Footer>
		</div>
	);
}

export default current;
