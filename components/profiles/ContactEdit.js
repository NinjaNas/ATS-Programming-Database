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
      // Grab the contact information for the specified user
      Axios.get(
        "/api/contact/read/",
        { params: { key: 1, tag: id } } // key=1 checks that the contact.id matches the tag
      )
        .then((response) => {
          setContact(response.data[0]);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) {
            router.push("/app/login");
          }
        });
    } else {
      // if no id is provided, then create a new contact object with a matching user_id
      setContact({ user_id: user_id });
    }
  };

  /* useEffect on mount calls contactInfo */
  useEffect(() => {
    contactInfo();
  }, []);

  const onSave = () => {
    // Create a body object to send to the server
    const body = {
      phone: phoneRef.current.value != "" ? phoneRef.current.value : null,
      address: addressRef.current.value != "" ? addressRef.current.value : null,
      city: cityRef.current.value != "" ? cityRef.current.value : null,
      zip: zipRef.current.value != "" ? zipRef.current.value : null,
      status: statusRef.current.value != "" ? statusRef.current.value : null,
    };
    if (id) {
      // if an id was given, then update the contact
      body.id = id;
      Axios.post("/api/contact/update", body)
        .then((response) => {
          router.push(`/app/dashboard/admin/studentprofile/${contact.user_id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // if a user_id was given, then creat a new contact for that user
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
            label="Phone Number"
            passedValue={contact.phone}
          />
          <InputForm
            ref={addressRef}
            label="Address"
            passedValue={contact.address}
          />
          <InputForm ref={cityRef} label="City" passedValue={contact.city} />
          <InputForm ref={zipRef} label="Zip" passedValue={contact.zip} />
          <Dropdown
            ref={statusRef}
            label="Address Type"
            passedValue={contact.status}
            passedOptions={addressStatus}
          />
          <input type="submit" value="Save" onClick={onSave} />
        </>
      )}
    </div>
  );
};

export default ContactEdit;
