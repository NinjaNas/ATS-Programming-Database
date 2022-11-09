// Dependencies
const express = require("express");
const router = express.Router();
const pool = require("../../../utils/pool");
const { authorize } = require("../../../utils/authorize");

/**
 * async function, using mysql2/promise wrapper
 * https://www.npmjs.com/package/mysql2#using-promise-wrapper
 */
router.post("/", authorize(["admin", "counselor", "student"]), async (req, res) => {
  // Object destructuring
  const {
    session_id,
    questionnaire_date,
    type,
    question_strengths,
    question_help,
    question_pride,
    question_relationships,
    question_collaboration,
    question_composure,
    question_goals,
    status,
    notes
  } = req.body;

  /**
   * .execute(), prepared statement parameters are sent from the client as a serialized string and handled by the server
   * The VALUES(?) is standard way to insert variables into a SQL statement using an array
   */
  await pool
    .execute(
      "INSERT INTO sel_questionnaire (session_id, questionnaire_date, type, question_strengths, question_help, question_pride, question_relationships, question_collaboration, question_composure, question_goals, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [
        session_id,
        questionnaire_date,
        type,
        question_strengths,
        question_help,
        question_pride,
        question_relationships,
        question_collaboration,
        question_composure,
        question_goals,
        status,
        notes
      ]
    )
    .then(() => {
      console.log("New questionnaire created with associated session id " + session_id);
    })
    .catch((err) => {
      console.log(err);
    });
  // Successful HTTPS
  res.sendStatus(201);
});

module.exports = router;
