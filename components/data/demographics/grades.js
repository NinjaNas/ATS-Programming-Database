import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import BarChart from "../barChart";
import { useRouter } from "next/router";

function demographics() {
  const [sessions, setSessions] = useState([]);
  const router = useRouter();
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

  {
    sessions.map((session) =>
      session.grade < 9 ? middleshcool++ : highschool++
    );
  }

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
