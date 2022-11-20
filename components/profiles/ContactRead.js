import Axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

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

  const addressStatus = {
    1: "Primary",
    2: "Secondary",
    9: "Old",
  };

  useEffect(() => {
    contactInfo();
  }, []);

  return (
    <div>
      {contact.map(({ id, phone, address, city, zip, status }) => (
        <>
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
        </>
      ))}
      <Link href={`/app/dashboard/admin/studentprofile/${user_id}/contactInfo/add`}><a>Add</a></Link>
    </div>
  );
};

export default ContactRead;