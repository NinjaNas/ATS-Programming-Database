import Axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import addressStatus from "../../constants/addressStatus";
import CardStyles from "../../styles/Cards.module.css"

const ContactRead = ({ user_id }) => {
  const [contact, setContact] = useState([]);
  const contactInfo = () => {
    Axios.get("/api/contact/read/", { params: { key: 0, tag: user_id } }).then(
      (response) => {
        // setDemographics(response.data.filter(s => s.user_id == id));
        setContact(response.data);
      }
    );
  };


  useEffect(() => {
    contactInfo();
  }, []);

  return (
    <div className={CardStyles.card}>
      <h2>Contact Information</h2>
      {contact.map(({ id, phone, address, city, zip, status }) => (
        <div className={CardStyles.card}>
          <Link
            href={`/app/dashboard/admin/studentprofile/${user_id}/contactInfo/${id}/edit`}
          >
            <a>
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
      <Link href={`/app/dashboard/admin/studentprofile/${user_id}/contactInfo/add`}><a>Add</a></Link>
    </div>
  );
};

export default ContactRead;
