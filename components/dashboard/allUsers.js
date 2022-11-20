import React from "react";
import Axios from "axios";
import pageStyles from "../../styles/Dashboard.module.css";
import Search from "../dashboard/searchBar.js"
import { useState, useEffect } from "react";

function allUsers() {
	const [users, setUsers] = useState([]);
	const [searchedU, setSearchedU] = useState([]);

	const allStudents = () => {
		Axios.get("http://localhost:3000/api/user/read", {
			params: { key: -1, tag: 2 },
		})
			.then((response) => {
				setUsers(response.data);
				setSearchedU(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		allStudents();
	}, []);

	return (
		<div className={pageStyles.mainPage}>
			<div className={pageStyles.currentStud}>
				<Search
					users={users}
					setUsers={setSearchedU}></Search>
				<table className={pageStyles.subtitle}>
					{searchedU.map((user) => {
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
											href={`/app/user/profile/${user.id}`}>
											{user.first_name}
										</a>
									</td>
									<td className={pageStyles.tdNames}>
										<a
											className={pageStyles.subtitle}
											style={{ display: "block" }}
											href={`/app/user/profile/${user.id}`}>
											{user.last_name}
										</a>
									</td>
									<td className={pageStyles.tdButton}>
										<button className={pageStyles.button}>
											<a
												style={{ color: "#177457" }}
												href='/app/user/edit'>
												edit
											</a>
										</button>
									</td>
								</tr>
							</>
						);
					})}
				</table>
			</div>
		</div>
	);
}

export default allUsers;
