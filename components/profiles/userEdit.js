import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import InputForm from "../forms/input";
import Dropdown from "../forms/dropdown";
import { useRouter } from "next/router";
import pronouns from "../../constants/pronouns";
import status from "../../constants/status";

function UserEdit({ id }) {
  const [info, setInfo] = useState();

  const router = useRouter();

  const userInfo = () => {
    Axios.get("/api/user/read/", { params: { key: 0, tag: id } }).then(
      (response) => {
        // setDemographics(response.data.filter(s => s.user_id == id));
        setInfo(response.data[0]);
        console.log(response.data[0]);
      }
    );
  };

  const onSave = () => {
    let body = {
      first_name: fNameRef.current.value,
      last_name: lNameRef.current.value,
      email: emailRef.current.value,
      status: statusRef.current.value,
      notes: noteRef.current.value,
      pronouns: pronounRef.current.value,
      user_id: info.id,
      password: passRef.current.value != "" ? passRef.current.value : null,
    };

    // Password is not passed if it is not needed to be updated

    Axios.post("/api/user/update", body)
      .then(router.push(`/app/user/profile/${id}`))
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
        .then(router.push(`/app/user`))
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
    <div>
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
          <input type="submit" value="Save" onClick={onSave} />
          <div>
            <input type="text" placeholder="Type 'confirm'" ref={deleteRef} />
            <input type="button" value="Delete" onClick={onDelete} />
          </div>
        </>
      )}
    </div>
  );
}

export default UserEdit;
