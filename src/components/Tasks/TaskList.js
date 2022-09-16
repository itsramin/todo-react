import { useContext, useState } from "react";
import TaskCtx from "../../store/task-context";
import TaskItem from "./TaskItem";
import classes from "./TaskList.module.css";
const TaskList = (props) => {
  const ctx = useContext(TaskCtx);
  const curCat = ctx.curCategory;
  let allTasksList = [];

  if (ctx.curSort === "due date") {
    allTasksList = ctx.allTasks
      .filter((task) => task.category === curCat)
      .sort((a, b) => {
        const aa = a.date ? a.date : new Date("4222-01-01");
        const bb = b.date ? b.date : new Date("4222-01-01");
        if (+new Date(aa) > +new Date(bb)) return 1;
        if (+new Date(aa) < +new Date(bb)) return -1;
        return 0;
      });
  } else if (ctx.curSort === "creation date") {
    allTasksList = ctx.allTasks
      .filter((task) => task.category === curCat)
      .sort((a, b) => +new Date(b.creationDate) - +new Date(a.creationDate));
  } else if (ctx.curSort === "alphabet") {
    allTasksList = ctx.allTasks
      .filter((task) => task.category === curCat)
      .sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        return 0;
      });
  } else if (ctx.curSort === "all due date") {
    allTasksList = ctx.allTasks.sort((a, b) => {
      const aa = a.date ? a.date : new Date("4222-01-01");
      const bb = b.date ? b.date : new Date("4222-01-01");
      if (+new Date(aa) > +new Date(bb)) return 1;
      if (+new Date(aa) < +new Date(bb)) return -1;
      return 0;
    });
  } else if (ctx.curSort === "all creation date") {
    allTasksList = ctx.allTasks.sort(
      (a, b) => +new Date(b.creationDate) - +new Date(a.creationDate)
    );
  } else if (ctx.curSort === "all alphabet") {
    allTasksList = ctx.allTasks.sort((a, b) => {
      if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
      return 0;
    });
  }

  if (ctx.searchWord.length > 0) {
    allTasksList = allTasksList.filter((task) =>
      task.title.includes(ctx.searchWord)
    );
  }

  const compeletedAmount = allTasksList.filter(
    (task) => task.status === true
  ).length;
  const inCompeletedAmount = allTasksList.filter(
    (task) => task.status === false
  ).length;
  const allAmount = allTasksList.length;

  const [todoShown, setTodoShown] = useState(true);
  const [compShown, setCompShown] = useState(true);

  const showTodoListHandler = () => {
    setTodoShown((prev) => !prev);
  };
  const showCompListHandler = () => {
    setCompShown((prev) => !prev);
  };

  const todoClass = `
  ${
    todoShown ? classes["task-list__items"] : classes["task-list__items--hide"]
  }`;
  const compeleteClass = `
  ${
    compShown ? classes["task-list__items"] : classes["task-list__items--hide"]
  }`;

  return (
    <div className={classes["task-lists"]}>
      <div className={classes["task-list"]}>
        <div
          className={classes["task-list__header"]}
          onClick={showTodoListHandler}
        >
          <span className={classes["task-list__label"]}>&gt; Todo</span>
          <span className={classes["task-list__count"]}>
            {inCompeletedAmount}/{allAmount}
          </span>
        </div>
        <div className={todoClass}>
          {allTasksList
            .filter((task) => task.status === false)
            .map((task) => {
              return (
                <TaskItem
                  task={task}
                  key={task.id}
                  onIdChange={props.onIdChange}
                />
              );
            })}
        </div>
      </div>
      <div className={classes["task-list"]}>
        <div
          className={classes["task-list__header"]}
          onClick={showCompListHandler}
        >
          <span className={classes["task-list__label"]}>&gt; Completed</span>
          <span className={classes["task-list__count"]}>
            {compeletedAmount}/{allAmount}
          </span>
        </div>
        <div className={compeleteClass}>
          {allTasksList
            .filter((task) => task.status === true)
            .map((task) => {
              return (
                <TaskItem
                  task={task}
                  key={task.id}
                  onIdChange={props.onIdChange}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
