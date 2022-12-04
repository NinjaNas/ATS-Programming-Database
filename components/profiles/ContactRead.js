import Axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import addressStatus from "../../constants/addressStatus";
import CardStyles from "../../styles/Cards.module.css";

const ContactRead = ({ user_id }) => {
	const [contact, setContact] = useState([]);
	const [display, setDisplay] = useState("none");
	const contactInfo = () => {
		Axios.get("/api/contact/read/", { params: { key: 0, tag: user_id } }).then(
			(response) => {
				setContact(response.data);
			}
		);
	};

	const expand = () => {
		display == "none" ? setDisplay("block") : setDisplay("none");

	};

	useEffect(() => {
		contactInfo();
	}, []);

	return (
		<div className={CardStyles.card}>
			<button
				className={CardStyles.displayLink}
				onClick={expand}>
				Contact Information
			</button>
			<div style={{ display: display }}>
				{contact.map(({ id, phone, address, city, zip, status }) => (
					<div>
						<Link
							href={`/app/dashboard/admin/studentprofile/${user_id}/contactInfo/${id}/edit`}>
							<a className={CardStyles.Link}>
								<h3>{addressStatus[status]} </h3>
							</a>
						</Link>
						<p>
							{phone.slice(0, 3)}-{phone.slice(3, 6)}-{phone.slice(6)}
						</p>
						<p>
							{address}, {city}, {zip}
						</p>
					</div>
				))}
				<Link
					href={`/app/dashboard/admin/studentprofile/${user_id}/contactInfo/add`}>
					<a className={CardStyles.Link}>Add</a>
				</Link>
			</div>
		</div>
	);
};

export default ContactRead;
