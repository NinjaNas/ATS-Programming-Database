import React from "react";
import Task from "./task.js";
import DashboardStyles from "../../styles/Dashboard.module.css";

function tasklist({ tasks, type, title, handler }) {
  return (
    <div
      style={{ display: "inline-block" }}
      className={DashboardStyles.taskBox}
    >
      <h2
        style={{ marginLeft: 9, marginTop: 0 }}
        className={DashboardStyles.title}
      >
        {`${title} (${
          tasks.filter((t) =>
            title === "Academic"
              ? t.task_type == 2 && t.status == 3
              : t.task_type != 2 && t.status == 3
          ).length
        }/${
          tasks.filter((t) =>
            title === "Academic" ? t.task_type == 2 : t.task_type != 2
          ).length
        })`}
      </h2>

      <div
        className={
          type == "admin"
            ? DashboardStyles.taskpageAdmin
            : DashboardStyles.tasklist
        }
      >
        {tasks.map((task) =>
          title === "Academic" && task.task_type == 2 ? (
            <Task
              id={task.id}
              task_name={task.task_name}
              due_date={task.due_date}
              task_type={task.task_type}
              status={task.status}
              handler={handler}
            />
          ) : title === "Boomerang" && task.task_type != 2 ? (
            <Task
              id={task.id}
              task_name={task.task_name}
              due_date={task.due_date}
              task_type={task.task_type}
              status={task.status}
              handler={handler}
            />
          ) : null
        )}
      </div>
    </div>
    // <div className={DashboardStyles.taskBox}>
    //   <h2 style={{ marginLeft: 9 }} className={DashboardStyles.title}>
    //     My Tasks
    //   </h2>
    //   <div
    //     className={
    //       type == "admin"
    //         ? DashboardStyles.tasklistAdmin
    //         : DashboardStyles.tasklist
    //     }
    //   >
    //     <div>
    //       <h3 className={DashboardStyles.subtitle}>Academic</h3>
    //       {tasks.map((task) =>
    //         task.task_type == 2 ? (
    //           <Task
    //             id={task.id}
    //             task_name={task.task_name}
    //             due_date={new Date(task.due_date).toLocaleDateString()}
    //             task_description={task.task_description}
    //             status={task.status}
    //           />
    //         ) : null
    //       )}
    //       <h3 className={DashboardStyles.subtitle}>Boomerang</h3>
    //       {tasks.map((task) =>
    //         task.task_type != 2 ? (
    //           <Task
    //             id={task.id}
    //             task_name={task.task_name}
    //             due_date={new Date(task.due_date).toLocaleDateString()}
    //             task_description={task.task_description}
    //             status={task.status}
    //           />
    //         ) : null
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
}

export default tasklist;
