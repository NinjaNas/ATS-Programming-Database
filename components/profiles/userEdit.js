import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import InputForm from "../forms/input";
import Dropdown from "../forms/dropdown";
import { useRouter } from "next/router";
import pronouns from "../../constants/pronouns";
import status from "../../constants/status";
import FormStyles from "../../styles/Forms.module.css";

function UserEdit({ id }) {
  const [info, setInfo] = useState();

  const router = useRouter();

  const userInfo = () => {
    Axios.get("/api/user/read/", { params: { key: 0, tag: id } })
      .then((response) => {
        setInfo(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
        // If unauthorized, redirect back to login page
        if (err.response.status === 401) {
          router.push("/app/login");
        }
      });
  };

  const onSave = () => {
    const body = {
      first_name: fNameRef.current.value != "" ? fNameRef.current.value : null,
      last_name: lNameRef.current.value != "" ? lNameRef.current.value : null,
      email: emailRef.current.value != "" ? emailRef.current.value : null,
      status: statusRef.current.value != "" ? statusRef.current.value : null,
      notes: noteRef.current.value != "" ? noteRef.current.value : null,
      pronouns:
        pronounRef.current.value != "" ? pronounRef.current.value : null,
      user_id: info.id,
      password: passRef.current.value != "" ? passRef.current.value : null,
    };

    // Password is not passed if it is not needed to be updated

    Axios.post("/api/user/update", body)
      .then(router.push(`/app/dashboard/admin/user/profile/${id}`))
      .catch((err) => {
        console.log(err);
      });
  };

  const onDelete = () => {
    if (deleteRef.current.value.toLowerCase().trim() == "confirm") {
      Axios.post("/api/user/delete", {
        user_id: info.id,
        type: info.type,
        email: emailRef.current.value,
      })
        .then(router.push(`/app/dashboard/admin/user`))
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const fNameRef = useRef();
  const lNameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const pronounRef = useRef();
  const statusRef = useRef();
  const noteRef = useRef();
  const deleteRef = useRef();

  useEffect(() => {
    console.log(id);
    userInfo();
  }, []);

  useEffect(() => {}, [info]);

  return (
    <div style={{ height: "580px" }} className={FormStyles.editForm}>
      {info && (
        <>
          <h3>Type: {info.type}</h3>
          {
            <InputForm
              label="First Name"
              ref={fNameRef}
              passedValue={info.first_name}
            />
          }
          {
            <InputForm
              label="Last Name"
              ref={lNameRef}
              passedValue={info.last_name}
            />
          }
          {<InputForm label="Email" ref={emailRef} passedValue={info.email} />}
          {<InputForm label="Password" ref={passRef} />}
          <Dropdown
            label="Pronouns"
            ref={pronounRef}
            passedValue={info.pronouns}
            passedOptions={pronouns}
          />
          <Dropdown
            label="Status"
            ref={statusRef}
            passedValue={info.status}
            passedOptions={status}
          />
          {<InputForm label="Notes" ref={noteRef} passedValue={info.notes} />}
          <input
            className={FormStyles.submit3}
            type="submit"
            value="Save"
            onClick={onSave}
          />
          <div>
            <input
              className={FormStyles.input}
              type="text"
              placeholder="Type 'confirm' to delete"
              ref={deleteRef}
            />
            <input
              className={FormStyles.submit3}
              type="button"
              value="Delete"
              onClick={onDelete}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default UserEdit;
