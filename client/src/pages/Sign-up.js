import React from "react";
import {useState} from "react";
import Axios from "axios";

   
function SignUp(){
    //Keeps track of changes to name input box
    const [fname, setFname] = useState("");
    //Keeps track of changes to  last name input box
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");

    /*
    Meant to be the function that sends "credentials" input on the boxes
    to the backend to be added to users database. Currently is just making a get request to /insert
    but I envisioned been whatever creation endpoint we are thinking of
    */
    const addStudent = () =>{
        Axios.post('http://localhost:3000/insert',
        {
        fname: fname,
        lname: lname,
        email: email,
        }).then(()=> {
        console.log("succes")
        });
    };
    
    return <div className="App">
        <div className="information">
        {/*First name input box*/}
        <label>First Name:</label>
        <input 
            type="text"
            onChange={(event) => {
            setFname(event.target.value);
            }} />
        {/*Last name input box*/}
        <label>Last Name:</label>
        <input 
            type="text"
            onChange={(event) => {
            setLname(event.target.value);
            }} />
        {/*Email input box*/}
        <label>Email:</label>
        <input 
            type="text" 
            onChange={(event) => {
            setEmail(event.target.value);
            }}/>
        {/*Sign-up button that will fire the call to endpoint in the backend*/}
        <button onClick={addStudent} >Add Student</button>
        </div>
    </div>;
    }

export default SignUp;