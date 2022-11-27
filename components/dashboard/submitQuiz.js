import React from "react";
import DashboardStyles from "../../styles/Dashboard.module.css";
import Axios from "axios";
import { useRef } from "react";
import { useRouter } from "next/router";

function submitQuiz() {
  const typeRef = useRef();
  const strRef = useRef();
  const helpRef = useRef();
  const prideRef = useRef();
  const relationRef = useRef();
  const collaborateRef = useRef();
  const composeRef = useRef();
  const goalRef = useRef();
  const noteRef = useRef();

  const router = useRouter();

  const submit = () => {

    // Grab current session id for user to create tasks
    Axios.get("/api/sessionData")
      .then((res) => {
        const session_id = res.data.id;
        console.log("session_id" + session_id);
        Axios.post("/api/session/questionnaire/update", {
          session_id: session_id,
          type: typeRef.current.value,
          question_strengths: strRef.current.value,
          question_help: helpRef.current.value,
          question_pride: prideRef.current.value,
          question_relationships: relationRef.current.value,
          question_collaboration: collaborateRef.current.value,
          question_composure: composeRef.current.value,
          question_goals: goalRef.current.value,
          status: 1,
          notes: noteRef.current.value
        })
          .then(() => {
            router.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ display: "inline-block" }}>
      <h2 className={DashboardStyles.title}>Questionnare</h2>

      <label style={{ display: "block" }} className={DashboardStyles.subtitle}>
        Type
      </label>
      <select name="type" id="type" ref={typeRef}>
        <option value="1">First Day</option>
        <option value="2">Last Day</option>
      </select>

      
      <label style={{ display: "block" }} className={DashboardStyles.subtitle}>
        I am aware of my own strengths
      </label>
      <select name="question_strengths" id="question_strengths" ref={strRef}>
        <option value="1">No</option>
        <option value="2">A little</option>
        <option value="3">Somewhat</option>
        <option value="4">Quite a bit</option>
        <option value="5">Yes</option>
      </select>

      <label style={{ display: "block" }} className={DashboardStyles.subtitle}>
        I know where to go for help when I need it
      </label>
      <select name="question_help" id="question_help" ref={helpRef}>
        <option value="1">No</option>
        <option value="2">A little</option>
        <option value="3">Somewhat</option>
        <option value="4">Quite a bit</option>
        <option value="5">Yes</option>
      </select>

      <label style={{ display: "block" }} className={DashboardStyles.subtitle}>
        I am proud of who I am
      </label>
      <select name="question_pride" id="question_pride" ref={prideRef}>
        <option value="1">No</option>
        <option value="2">A little</option>
        <option value="3">Somewhat</option>
        <option value="4">Quite a bit</option>
        <option value="5">Yes</option>
      </select>

      <label style={{ display: "block" }} className={DashboardStyles.subtitle}>
        I know how to have close and safe relationships
      </label>
      <select name="question_relationships" id="question_relationships" ref={relationRef}>
        <option value="1">No</option>
        <option value="2">A little</option>
        <option value="3">Somewhat</option>
        <option value="4">Quite a bit</option>
        <option value="5">Yes</option>
      </select>

      <label style={{ display: "block" }} className={DashboardStyles.subtitle}>
        I know how to work with others to solve problems
      </label>
      <select name="question_collaboration" id="question_collaboration" ref={collaborateRef}>
        <option value="1">No</option>
        <option value="2">A little</option>
        <option value="3">Somewhat</option>
        <option value="4">Quite a bit</option>
        <option value="5">Yes</option>
      </select>

      <label style={{ display: "block" }} className={DashboardStyles.subtitle}>
        I know how to stay calm in difficult situations
      </label>
      <select name="question_composure" id="question_composure" ref={composeRef}>
        <option value="1">No</option>
        <option value="2">A little</option>
        <option value="3">Somewhat</option>
        <option value="4">Quite a bit</option>
        <option value="5">Yes</option>
      </select>

      <label style={{ display: "block" }} className={DashboardStyles.subtitle}>
        I have goals and I have plans to reach them
      </label>
      <select name="question_goals" id="question_goals" ref={goalRef}>
        <option value="1">No</option>
        <option value="2">A little</option>
        <option value="3">Somewhat</option>
        <option value="4">Quite a bit</option>
        <option value="5">Yes</option>
      </select>

      <label style={{ display: "block" }} className={DashboardStyles.subtitle}>
        Other notes for staff
      </label>
      <input type="textarea" name="notes" ref={noteRef}></input>

      <button
        onClick={submit}
        style={{ display: "block" }}
        className={DashboardStyles.text}
      >
        Submit Quiz
      </button>
    </div>
  );
}

export default submitQuiz;
