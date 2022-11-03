//Landing Page for Boomerang Staff
import React from "react";
// import { useRef, useState } from "react";
// import Axios from "axios";
import LoginStyles from "../../styles/Login.module.css";
import Image from "next/image";
import Form from "../../components/form/Form";
// import { redirect } from "next/dist/server/api-utils";

function Login() {
	// const emailRef = useRef();
	//Keeps track of changes to password input box
	// const passwordRef = useRef();

	/*
    Meant to be the function that sends "credentials" input on the boxes
    to the backend for authenctication. Currently is just making a get request to /insert
    but I envisioned been whatever authentication endpoint we are thinking of
    */
	// const login = () => {
	// 	Axios.post("http://localhost:3000/api/login", {
	// 		email: emailRef.current.value,
	// 		password: passwordRef.current.value,
	// 	})
	// 		.then(() => {
	// 			console.log("success");
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };

	return (
		<div className={LoginStyles.login}>
			<div className={LoginStyles.form}>
				<Image
					src={"/smallLogo.png"}
					width={50}
					height={50}
				/>
				<h2 className={LoginStyles.title}>Welcome to Boomerang</h2>
				<Form action="/api/login" method="post"
				fields={[{
						tag: "input",
						type: "text",
						name: "email",
						description: "Email"
						},
						{
							tag: "input",
							type: "password",
							name: "password",
							description: "Password"
						},
						{
							tag: "input",
							type: "submit",
							name: "",
							description: "Login"
						},
					]
				}
				/>
			</div>
		</div>
	);
}

export default Login;
