import Axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import addressStatus from "../../constants/addressStatus";
import Dropdown from "../forms/dropdown";
import InputForm from "../forms/input";
import FormStyles from "../../styles/Forms.module.css";

const ContactEdit = ({ id, user_id }) => {
	const router = useRouter();
	const [contact, setContact] = useState();
	const contactInfo = () => {
		if (id) {
			Axios.get("/api/contact/read/", { params: { key: 1, tag: id } }).then(
				(response) => {
					setContact(response.data[0]);
				}
			);
		} else {
			setContact({ user_id: user_id });
		}
	};

	useEffect(() => {
		contactInfo();
	}, []);

	const onSave = () => {
		const body = {
			// id: contact.id,
			phone: phoneRef.current.value,
			address: addressRef.current.value,
			city: cityRef.current.value,
			zip: zipRef.current.value,
			status: statusRef.current.value,
		};
		if (id) {
			body.id = id;
			Axios.post("/api/contact/update", body)
				.then((response) => {
					router.push(`/app/dashboard/admin/studentprofile/${contact.user_id}`);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			body.user_id = user_id;
			Axios.post("/api/contact/create", body)
				.then((response) => {
					router.push(`/app/dashboard/admin/studentprofile/${contact.user_id}`);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const phoneRef = useRef();
	const addressRef = useRef();
	const cityRef = useRef();
	const zipRef = useRef();
	const statusRef = useRef();

	return (
		<div className={FormStyles.editForm}>
			{contact && (
				<>
					<InputForm
						ref={phoneRef}
						label='Phone Number'
						passedValue={contact.phone}
					/>
					<InputForm
						ref={addressRef}
						label='Address'
						passedValue={contact.address}
					/>
					<InputForm
						ref={cityRef}
						label='City'
						passedValue={contact.city}
					/>
					<InputForm
						ref={zipRef}
						label='Zip'
						passedValue={contact.zip}
					/>
					<Dropdown
						ref={statusRef}
						label='Address Type'
						passedValue={contact.status}
						passedOptions={addressStatus}
					/>
					<input
						type='submit'
						value='Save'
						onClick={onSave}
					/>
				</>
			)}
		</div>
	);
};

export default ContactEdit;
