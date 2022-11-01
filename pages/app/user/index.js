import React from "react";

const allStudents = () => {
	Axios.get("http://localhost:3000/api/users/");
};

function current() {
	return <div>{allStudents}</div>;
}

export default current;
