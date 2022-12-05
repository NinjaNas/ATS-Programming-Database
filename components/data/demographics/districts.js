import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import BarChart from "../barChart";
import { useRouter } from "next/router";

function districts() {
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

  let chapCarr = 0;
  let orange = 0;

  {
    sessions.map((session) =>
      0 < session.school < 9
        ? chapCarr++
        : 8 > session.school < 15
        ? orange++
        : null
    );
  }

  let districtsData = [
    { datapoint: "Chapel Hill- Carrboro", School_District: chapCarr },
    { datapoint: "Orange", School_District: orange },
  ];

  useEffect(() => {
    allSessions();
  }, []);

  return (
    <BarChart
      data={districtsData}
      dataKey={"datapoint"}
      barKey={"School_District"}
    ></BarChart>
  );
}

export default districts;
