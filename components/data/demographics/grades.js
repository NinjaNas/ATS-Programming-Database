import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import BarChart from "../barChart";
import { useRouter } from "next/router";
//Component that graphs number of students from HighSchool vs MiddleSchool
function demographics() {
  const [sessions, setSessions] = useState([]);
  const router = useRouter();
  //Call to API to get all sessions
  const allSessions = () => {
    Axios.get("/api/session")
      .then((response) => {
        setSessions(response.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          router.push("/app/login");
        }
      });
  };

  let highschool = 0;
  let middleshcool = 0;
  //Map through sessions and count number of students from each level
  {
    sessions.map((session) =>
      session.grade < 9 ? middleshcool++ : highschool++
    );
  }
  //Create key-value data structure to pass to barchart
  let gradesData = [
    { datapoint: "High_School", "": highschool },
    { datapoint: "Middle_School", "": middleshcool },
  ];
  useEffect(() => {
    allSessions();
  }, []);

  return (
    <BarChart data={gradesData} dataKey={"datapoint"} barKey={""}></BarChart>
  );
}

export default demographics;
