import React from "react";
import { useState } from "react";
import Axios from "axios";

function Del() {
  //Keeps track of changes to name input box
  const [user_id, setID] = useState("");
  /*
    Meant to be the function that sends "credentials" input on the boxes
    to the backend for authenctication. Currently is just making a get request to /insert
    but I envisioned been whatever authentication endpoint we are thinking of
    */
  const del = () => {
    Axios.post("/api/user/delete", {
    user_id: user_id
    })
    .then(() => {
        console.log("success");
    })
    .catch((err) => {
        console.log(err);
    });
  };

  return (
    <div className="App">
      <div className="information">
        {/*UUID input box*/}
        <label>UUID:</label>
        <input
          type="number"
          onChange={(event) => {
            setID(event.target.value);
          }}
        />
        {/*Sign-up button that will fire the call to endpoint in the backend*/}
        <button onClick={del}>Delete User</button>
      </div>
    </div>
  );
}
// TO-DO: REDIRECT TO SESSION CREATOR PAGE ON FRONT-END
export default Del;
