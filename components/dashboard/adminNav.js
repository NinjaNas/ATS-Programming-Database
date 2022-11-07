import React from "react";
import navbarStyles from "../../styles/Nav.module.css";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
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
						title='participants'>
						Home
					</a>
				</Link>
				<Link href='/app/user'>
					<a
						className={navbarStyles.menuItem}
						title='participants'>
						Students
					</a>
				</Link>
				<Link href='/app/data'>
					<a
						className={navbarStyles.menuItem}
						title='Data'>
						Data
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
