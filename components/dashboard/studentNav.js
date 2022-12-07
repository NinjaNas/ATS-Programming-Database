import React from "react";
import navbarStyles from "../../styles/Nav.module.css";
import Link from "next/link";
import Axios from "axios";
import { useRouter } from "next/router";

function studentNav() {
	const router = useRouter();

	function logOut() {
		Axios.post("/api/logout")
			.then(() => {
				console.log("success");
			})
			.catch((err) => {
				console.log(err);
			});
	}
	return (
		<nav className={navbarStyles.navBar}>
			<img
				className={navbarStyles.boomerangImg}
				src={"/smallLogo.png"}
			/>

			<span className={navbarStyles.menu}>
				<Link href='/app/dashboard/student'>
					<a
						className={navbarStyles.menuItem}
						title='participants'>
						Home
					</a>
				</Link>
				<Link href='/app/dashboard/student/questionnaire'>
					<a
						className={navbarStyles.menuItem}
						title='participants'>
						My Questionnare
					</a>
				</Link>
				<Link href='/app/dashboard/student/help'>
					<a
						className={navbarStyles.menuItem}
						title='participants'>
						Help
					</a>
				</Link>
				<Link href='/app/login'>
					<a
						onClick={logOut}
						className={navbarStyles.menuItem}
						title='logout'>
						Log out
					</a>
				</Link>

			</span>
		</nav>
	);
}

export default studentNav;
