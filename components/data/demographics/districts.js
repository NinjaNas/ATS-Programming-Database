import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import BarChart from "../barChart";
import { useRouter } from "next/router";
//Component that graphs number of students from the two school distrcits ATS serves//
function districts() {
  const [sessions, setSessions] = useState([]);
  const router = useRouter();
  //Call to API to get all sessions//
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
  //Map through sessions and count number of students from each district//
  {
    sessions.map((session) =>
      0 < session.school < 9
        ? chapCarr++
        : 8 > session.school < 15
        ? orange++
        : null
    );
  }
  //Create key-value data structure to pass to barchart//
  let districtsData = [
    { datapoint: "Chapel Hill- Carrboro", School_District: chapCarr },
    { datapoint: "Orange", School_District: orange },
  ];

  useEffect(() => {
    allSessions();
  }, []);

  return (
    //Use Barchart and pass key-value data structure created//
    <BarChart
      data={districtsData}
      dataKey={"datapoint"}
      barKey={"School_District"}
    ></BarChart>
  );
}

export default districts;
