// Dependencies
const express = require("express");
const router = express.Router();
const pool = require("../../utils/pool");
const { authorize } = require("../../utils/authorize");

/**
 * async function, using mysql2/promise wrapper
 * https://www.npmjs.com/package/mysql2#using-promise-wrapper
 */
router.post("/", authorize(["admin", "counselor"]), async (req, res) => {
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

  let [rows, fields] = await pool
    .query("SELECT * FROM sel_questionnaire WHERE session_id=? AND type=?;", [session_id, type])
    .catch((err) => {
      // Do not throw error inside of promise
      console.log(err);
    });

    //Overrides arguments with what's currently in the database if empty (Very good code)
    if (questionnaire_date == "") {
        questionnaire_date = rows[0].questionnaire_date;
    } if (question_strengths == "") {
        question_strengths = rows[0].question_strengths;
    } if (question_help = "") {
        question_help = rows[0].question_help;
    } if (question_pride = "") {
        question_pride = rows[0].question_pride;
    } if (question_relationships = "") {
        question_relationships = rows[0].question_relationships;
    } if (question_collaboration = "") {
        question_collaboration = rows[0].question_collaboration;
    } if (question_composure = "") {
        question_composure = rows[0].question_composure;
    } if (question_goals = "") {
        question_goals = rows[0].question_goals;
    } if (status = "") {
        status = rows[0].status;
    } if (notes = "") {
        notes = rows[0].notes;
    }

    /**
     * Checks for a session_id and updates all items.
     * Should write a way to update singles, maybe by pulling those values from the table,
     * overriding the ones we need to change, and updating the table with those.
    */
    await pool
      .execute(
        "UPDATE session SET (questionnaire_date, question_strengths, question_help, question_pride, question_relationships, question_collaboration, question_composure, question_goals, status, notes) WHERE session_id=(session_id) AND type=(type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [
            questionnaire_date,
            question_strengths,
            question_help,
            question_pride,
            question_relationships,
            question_collaboration,
            question_composure,
            question_goals,
            status,
            notes,
            session_id,
            type
        ]
      )
      .then(() => {
        const beginend = "beginning"
        if (type == 2) { beginend = "end" }
        console.log("Questionnaire values updated for session id " + session_id + "at the " + beginend);
      })
      .catch((err) => {
        console.log(err);
      });
  // Successful HTTPS
  res.sendStatus(201);
});

module.exports = router;
