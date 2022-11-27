import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import BarChart from "../barChart";

function ethnicity() {
  const [demographics, setDemographics] = useState([]);
  const allDemographics = () => {
    Axios.get("/api/demographics").then((response) => {
      setDemographics(response.data);
    });
  };

  let hispanic = 0;
  let non_hispanic = 0;

  {
    demographics.map((demographic) =>
      demographic.ethnicity == 1 ? hispanic++ : non_hispanic++
    );
  }

  useEffect(() => {
    allDemographics();
  }, []);

  let hispanicData = [
    { datapoint: "Hispanic", ethnicity: hispanic },
    { datapoint: "Non-Hispanic", ethnicity: non_hispanic },
  ];

  return (
    <BarChart
      data={hispanicData}
      dataKey={"datapoint"}
      barKey={"ethnicity"}
    ></BarChart>
  );
}

export default ethnicity;
