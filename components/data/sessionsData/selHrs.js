import Axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import BarChart from "../barChart";

function selHrs() {
  const [days, setDays] = useState([]);
  const router = useRouter();
  const allDays = () => {
    Axios.get("/api/session/day/read")
      .then((response) => {
        setDays(response.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          router.push("/app/login");
        }
      });
  };

  useEffect(() => {
    allDays();
  }, []);

  let hours = 0;
  days.map((attended) => (attended.status == 1 ? hours++ : null));
  let selHours = 2 * hours;

  let programData = [
    { datapoint: "SEL Hours", Hours_Completed: selHours },
    { datapoint: "Program Days", Hours_Completed: hours },
  ];

  return (
    <BarChart
      data={programData}
      dataKey={"datapoint"}
      barKey={"Hours_Completed"}
    ></BarChart>
  );
}

export default selHrs;
