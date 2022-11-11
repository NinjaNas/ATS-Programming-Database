import React from "react";
import navbarStyles from "../../styles/Nav.module.css";
import Image from "next/image";
import Link from "next/link";
import Axios from "axios";
import { useRouter } from "next/router";

function Navbar() {
	const router = useRouter();

	function logOut(){
		Axios.post("http://localhost:3000/api/logout")
		.then(() => {
			router.push("/app/login");
		}
		)
	}
	return (
		<nav className={navbarStyles.navBar}>
			<img
				className={navbarStyles.boomerangImg}
				src={"/smallLogo.png"}
			/>
			<span className={navbarStyles.menu}>
				<Link href='/app/dashboard/admin'>
					<a
						className={navbarStyles.menuItem}
						title='home'>
						Home
					</a>
				</Link>
				<Link href='/app/dashboard/admin/allstudents'>
					<a
						className={navbarStyles.menuItem}
						title='students'>
						Students
					</a>
				</Link>
				<Link href='/app/user'>
					<a
						className={navbarStyles.menuItem}
						title='users'>
						Users
					</a>
				</Link>
				<Link href='/app/data'>
					<a
						className={navbarStyles.menuItem}
						title='data'>
						Data
					</a>
				</Link>
				<Link href="">
					<a onClick={logOut}
						className={navbarStyles.menuItem}
						title='logout'>
						Log out
					</a>
				</Link>
				{/*
				<Link href='/app/referral'>
					<a title='Referral'>Referral</a>
				</Link>
                */}
			</span>
		</nav>
	);
}

export default Navbar;
