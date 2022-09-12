import { useContext } from "react";
import TaskCtx from "../../store/task-context";
import TaskItem from "./TaskItem";
import classes from "./TaskList.module.css";
const TaskList = (props) => {
  // const DUMMY_TASKS = [
  //   { id: 0, title: "book", date: "9/3/2022" },
  //   { id: 1, title: "phone", date: "9/5/2022" },
  // ];

  const ctx = useContext(TaskCtx);
  const curCat = ctx.curCategory;
  const searchList = ctx.searchRes.filter((task) => task.category === curCat);
  const taskList = ctx.allTasks.filter((task) => task.category === curCat);

  const unCompeleteList = ctx.isSearching
    ? searchList.filter((task) => task.status === false)
    : taskList.filter((task) => task.status === false);

  const compeleteList = ctx.isSearching
    ? searchList.filter((task) => task.status === true)
    : taskList.filter((task) => task.status === true);

  const compeletedAmount = compeleteList.length;

  return (
    <div className={classes["task-list"]}>
      <div className={classes["task-incompeleted"]}>
        {unCompeleteList.map((task) => {
          return (
            <TaskItem task={task} key={task.id} onIdChange={props.onIdChange} />
          );
        })}
      </div>
      <div className={classes["task-compeleted"]}>
        <div className={classes["task-compeleted__header"]}>
          <span className={classes["task-compeleted__label"]}>Completed</span>
          <span className={classes["task-compeleted__count"]}>
            {compeletedAmount}
          </span>
        </div>
        {compeleteList.map((task) => {
          return (
            <TaskItem task={task} key={task.id} onIdChange={props.onIdChange} />
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;
