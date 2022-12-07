import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import BarChart from "../barChart";
import { useRouter } from "next/router";
//Component that graphs student numbers for each race//
function race() {
  const [demographics, setDemographics] = useState([]);
  const router = useRouter();
  //Call to API to get demographic
  const allDemographics = () => {
    Axios.get("/api/demographics")
      .then((response) => {
        setDemographics(response.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          router.push("/app/login");
        }
      });
  };

  let africanAmerican = 0;
  let americanIndian = 0;
  let asian = 0;
  let pacIslander = 0;
  let white = 0;
  let other = 0;
  //map through demographics and count up number of students from each race//
  demographics.map((demographic) =>
    demographic.race_bl == 1
      ? africanAmerican++
      : demographic.race_ai == 1
      ? americanIndian++
      : demographic.race_as == 1
      ? asian++
      : demographic.race_nhpi == 1
      ? pacIslander++
      : demographic.race_wh == 1
      ? white++
      : demographic.race_other == 1
      ? other++
      : null
  );
  //Create key-value data structure to pass to barchart
  let raceData = [
    { datapoint: "African-American", Race: africanAmerican },
    { datapoint: "American-Indian", Race: americanIndian },
    { datapoint: "Asian", Race: asian },
    { datapoint: "Pacific-Islander", Race: pacIslander },
    { datapoint: "White", Race: white },
    { datapoint: "Other", Race: other },
  ];
  useEffect(() => {
    allDemographics();
  }, []);

  return (
    <BarChart data={raceData} dataKey={"datapoint"} barKey={"Race"}></BarChart>
  );
}

export default race;
