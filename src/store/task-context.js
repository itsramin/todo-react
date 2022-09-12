import React from "react";

const TaskCtx = React.createContext({ allTasks: [], curCategory: "main" });

export default TaskCtx;
