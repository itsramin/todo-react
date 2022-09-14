import { useContext, useState } from "react";
import TaskCtx from "../../store/task-context";
import classes from "./TaskItem.module.css";

const TaskItem = (props) => {
  const ctx = useContext(TaskCtx);
  const [taskIsDone, setTaskIsDone] = useState(props.task.status);

  const checkHandler = () => {
    setTaskIsDone((prev) => !prev);
    ctx.check(props.task.id);

    if (!taskIsDone && props.task.repeat.amount > 0) {
      const pastDate = new Date(props.task.date);
      let calcDate = new Date(pastDate);
      const periodObj = { days: 1, weeks: 7, monthes: 30, years: 365 };
      calcDate.setDate(
        calcDate.getDate() +
          periodObj[props.task.repeat.period] * props.task.repeat.amount
      );
      calcDate = calcDate.toISOString().slice(0, 10);

      ctx.addTask({
        title: props.task.title,
        id: Math.random().toString(),
        date: calcDate,
        status: false,
        category: props.task.category,
        description: props.task.description,
        completionDate: "",
        repeat: {
          amount: props.task.repeat.amount,
          period: props.task.repeat.period,
        },
      });
    }
  };

  const clickHandler = (e) => {
    if (e.target.type === "checkbox") return;
    props.onIdChange(props.task.id);
  };

  // showing data
  const repAmount = props.task.repeat.amount;
  const repPeriod = props.task.repeat.period;
  let shownRep = "";

  if (repAmount === "1" && repPeriod === "days") {
    shownRep = "Everyday";
  } else if (repAmount === "1" && repPeriod === "weeks") {
    shownRep = "Weekly";
  } else if (repAmount === "1" && repPeriod === "months") {
    shownRep = "Monthly";
  } else if (repAmount > 0) {
    shownRep = `Repeat every ${repAmount} ${repPeriod}`;
  }

  //
  const date = +new Date(props.task.date);
  const today = +new Date(new Date().toISOString().slice(0, 10));
  const age = Math.trunc((date - today) / 1000 / 86400);
  let shownDate = "";

  if (age === 0) {
    shownDate = "Today";
  } else if (age === 1) {
    shownDate = "Tomorrow";
  } else if (age === -1) {
    shownDate = "Yesterday";
  } else {
    shownDate = props.task.date;
  }

  return (
    <div className={classes["task-row"]} onClick={clickHandler}>
      <input
        type="checkbox"
        className={classes["task-checkbox"]}
        checked={taskIsDone}
        onChange={checkHandler}
      />
      <div className={classes["task-summary"]}>
        <h3 className={classes["task-title"]}>{props.task.title}</h3>
        {shownDate && (
          <div>
            <span
              className={`${classes["task-date"]} ${
                age < 0 && classes["task-date--red"]
              }`}
            >
              {shownDate}
            </span>
            <span className={classes["task-repeat"]}>
              {props.task.repeat.amount > 0 ? shownRep : ""}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
