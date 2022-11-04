import React from "react";
import navbarStyles from "../../styles/Nav.module.css";
import Image from "next/image";
import Link from "next/link";

function studentNav() {
	return (
		<nav className={navbarStyles.navBar}>
			<Image
				className={navbarStyles.boomerangImg}
				src={"/smallLogo.png"}
				width={65}
				height={65}
			/>
			<span className={navbarStyles.menu}>
				<Link href='/app/dashboard/student'>
					<a
						className={navbarStyles.menuItem}
						title='participants'>
						Home
					</a>
				</Link>
				<Link href='/app/dashboard/student/tasklist'>
					<a
						className={navbarStyles.menuItem}
						title='participants'>
						My Tasks
					</a>
				</Link>
				<Link href='/app/dashboard/student/calendar'>
					<a
						className={navbarStyles.menuItem}
						title='Data'>
						My Calendar
					</a>
				</Link>
				{/*
                <Link href='/app/dashboard/student/questionnare'>
                    <a title='Referral'>Questionnare</a>
                </Link>
                */}
			</span>
		</nav>
	);
}

export default studentNav;
