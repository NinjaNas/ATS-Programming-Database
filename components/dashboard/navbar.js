import React from "react";
import navbarStyles from "../../styles/Nav.module.css";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
	return (
		<nav className={navbarStyles.navBar}>
			<Image
				className={navbarStyles.boomerangImg}
				src={"/smallLogo.png"}
				width={65}
				height={65}
			/>
			<span className={navbarStyles.menu}>
				<Link href='/dashboard/admin'>
					<a title='participants'>Home</a>
				</Link>
				<Link href='/user/all'>
					<a title='participants'>Students</a>
				</Link>
				<Link href='/data'>
					<a title='Data'>Data</a>
				</Link>
				<Link href='/referral'>
					<a title='Referral'>Referral</a>
				</Link>
			</span>
		</nav>
	);
}

export default Navbar;
