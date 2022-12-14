import Axios from "axios";
import React, { useEffect, useState } from "react";
import selAnswers from "../../constants/selAnswers";
import selQuestions from "../../constants/selQuestions";
import selTypes from "../../constants/selTypes";

const SelView = ({ session_id }) => {
  const [questionnaire, setQuestionnaire] = useState();

  const getQuestionnaire = () => {
    Axios.get("/api/session/questionnaire/read", {
      params: { key: 0, tag: session_id }, // key=0 matches sel_questionnaire.session_id to tag
    })
      .then((response) => {
        setQuestionnaire(response.data);
      })
      .catch((err) => {
        console.log(err);
        // If unauthorized, redirect back to login page
        if (err.response.status === 401) {
          router.push("/app/login");
        }
      });
  };

  useEffect(() => {
    getQuestionnaire();
  }, []);

  return (
    <div>
      <h2>Completed Questionnaires</h2>
      {questionnaire &&
        questionnaire
          .filter((q) => q.status == 1)
          .map((q) => (
            <div>
              <h3>{selTypes[q.type]}</h3>
              {Object.entries(selQuestions).map(([key, value]) => (
                <p>
                  {value}:{" "}
                  <strong>
                    {selAnswers[q[key]]} ({q[key]})
                  </strong>
                </p>
              ))}
            </div>
          ))}
    </div>
  );
};

export default SelView;
