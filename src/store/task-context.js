import React from "react";

const TaskCtx = React.createContext({
  allTasks: [],
  curCategory: "main",
  curSort: "creation date",
});

export default TaskCtx;
