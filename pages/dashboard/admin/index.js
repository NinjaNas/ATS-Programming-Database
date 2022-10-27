//Landing Page for Boomerang Staff
import React from "react";
import styles from "../../../styles/Dashboard.module.css";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";

function Admin() {
	return (
		<div className={styles.mainPage}>
			<nav>
				<div>
					<Link href='/user/all'>
						<a title='participants'>Students</a>
					</Link>
					<Link href='/data'>
						<a title='Data'>Data</a>
					</Link>
					<Link href='/referral'>
						<a title='Referral'>Referral</a>
					</Link>
				</div>
			</nav>
		</div>
	);
}

export default Admin;
