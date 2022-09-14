import { useContext } from "react";
import TaskCtx from "../../store/task-context";
import TaskItem from "./TaskItem";
import classes from "./TaskList.module.css";
const TaskList = (props) => {
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

  if (ctx.curSort === "due date") {
    unCompeleteList.sort((a, b) => {
      const aa = a.date ? a.date : new Date("4222-01-01");
      const bb = b.date ? b.date : new Date("4222-01-01");
      if (+new Date(aa) > +new Date(bb)) return 1;
      if (+new Date(aa) < +new Date(bb)) return -1;
      return 0;
    });
    compeleteList.sort((a, b) => {
      const aa = a.date ? a.date : new Date("4222-01-01");
      const bb = b.date ? b.date : new Date("4222-01-01");
      if (+new Date(aa) > +new Date(bb)) return 1;
      if (+new Date(aa) < +new Date(bb)) return -1;
      return 0;
    });
  } else if (ctx.curSort === "creation date") {
    unCompeleteList.sort(
      (a, b) => +new Date(b.creationDate) - +new Date(a.creationDate)
    );
    compeleteList.sort(
      (a, b) => +new Date(b.creationDate) - +new Date(a.creationDate)
    );
  } else if (ctx.curSort === "alphabet") {
    unCompeleteList.sort((a, b) => {
      if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
      return 0;
    });
    compeleteList.sort((a, b) => {
      if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
      return 0;
    });
  }

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
