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
