import React from "react";
import pageStyles from "../../../../styles/Dashboard.module.css";
import StudentNav from "../../../../components/dashboard/studentNav.js";
import TaskWrapper from "../../../../components/dashboard/studentTasklistWrapper";
import Footer from "../../../../components/dashboard/footer";

function tasklist() {
  return (
    <div className={pageStyles.mainPage}>
      <StudentNav></StudentNav>
      <br></br>
      This is your one stop for how to use your student dashboard.
      <h3>Creating a new task</h3>
      The "home" page has a "new task" section to the right. You fill out the
      task name, what type of task it is (if it was homework given to you by
      school, it is most likely an Academic type. If you're not sure about the
      type, ask a Boomerang administrator.) and the due date. Description does
      not need to be filled out, unless you want to use it to be more specific.
      If you accidently add a task that needs to be deleted or edited, please
      speak to a Boomerang administrator.
      <h3>Completing a task</h3>
      On the left hand side of the "home" window, you are given two windows
      labelled "Academic" and "Boomerang", which hold your academic and other
      tasks respectively. Inside those windows are displayed the task name, its
      due date, and your status on it. You may click the checkbox to mark the
      task as complete. Once you do so, a Boomerang administrator will have the
      option to confirm that task's completion (making it so you can't uncheck
      the box anymore) or reject it (unchecking the box but allowing you to
      recheck it upon completion).
      <h3>Questionnaire</h3>
      Upon the start of your session, you are assigned two tasks to complete a
      questionnaire at the beginning and end of your session. You would complete
      this by going to the "My Questionnaire" page at the top and selecting
      whether you are completing your first or last day questionnaires. You are
      able to modify your response at any time by re-submitting that
      questionnaire.
      <br></br>
      <Footer></Footer>
    </div>
  );
}

export default tasklist;
