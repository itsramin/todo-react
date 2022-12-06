import classes from "./TaskDetailBox.module.css";
import { useContext, useRef } from "react";
import TaskCtx from "../../store/task-context";

const TaskDetailBox = (props) => {
  const ctx = useContext(TaskCtx);
  const taskIndex = ctx.allTasks.findIndex((task) => task.id === props.id);
  const targetTask = ctx.allTasks[taskIndex];

  const titleRef = useRef(targetTask.title);
  const dateRef = useRef();
  const desRef = useRef(targetTask.description);
  const categoryRef = useRef(targetTask.category);

  const repeatRef = useRef(targetTask.repeat.amount);
  const periodRef = useRef(targetTask.repeat.period);

  const dekTaskHandler = () => {
    props.onError("task2", props.id);
  };
  const cancelHandler = () => {
    props.onClose();
  };
  const clearRepeatHandler = () => {
    repeatRef.current.value = "";
    periodRef.current.value = "";
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (titleRef.current.value === "") return props.onError("task1");
    ctx.editTask({
      title: titleRef.current.value,
      date: dateRef.current.value,
      description: desRef.current.value,
      id: props.id,
      category: categoryRef.current.value,
      repeat: {
        amount: repeatRef.current.value,
        period: periodRef.current.value,
      },
    });
    props.onClose();
  };
  return (
    <form className={classes["new-task__form"]} onSubmit={submitHandler}>
      <div className={classes["new-task__section"]}>
        <label htmlFor="title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={classes["new-task__icon"]}
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M7.127 22.564l-7.126 1.436 1.438-7.125 5.688 5.689zm-4.274-7.104l5.688 5.689 15.46-15.46-5.689-5.689-15.459 15.46z" />
          </svg>
        </label>
        <input
          type="text"
          id="title"
          className={classes["new-task__title"]}
          placeholder="Add a task"
          ref={titleRef}
          defaultValue={targetTask.title}
          autoFocus
          spellCheck="false"
        />
      </div>
      <div className={classes["new-task__section"]}>
        <label htmlFor="date">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={classes["new-task__icon"]}
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z" />
          </svg>
        </label>
        <input
          id="date"
          type="date"
          className={classes["new-task--date"]}
          ref={dateRef}
          defaultValue={targetTask.date}
        />
      </div>
      <div className={classes["new-task__section"]}>
        <label htmlFor="repeat">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={classes["new-task__icon"]}
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M2 12c0 .999.381 1.902.989 2.604l-1.098.732-.587.392c-.814-1.025-1.304-2.318-1.304-3.728 0-3.313 2.687-6 6-6h9v-3l6 4-6 4v-3h-9c-2.206 0-4 1.794-4 4zm20.696-3.728l-.587.392-1.098.732c.608.702.989 1.605.989 2.604 0 2.206-1.795 4-4 4h-9v-3l-6 4 6 4v-3h9c3.313 0 6-2.687 6-6 0-1.41-.489-2.703-1.304-3.728z" />
          </svg>
        </label>
        <input
          id="repeat"
          type="number"
          min="1"
          className={classes["new-task__repeat"]}
          ref={repeatRef}
          defaultValue={targetTask.repeat.amount}
        />
        <select
          className={classes["new-task__repeat-period"]}
          ref={periodRef}
          defaultValue={targetTask.repeat.period}
        >
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
          <option value="months">Months</option>
          <option value="years">Years</option>
        </select>
        <div onClick={clearRepeatHandler}>
          <svg
            className={classes["new-task__repeat-cancel"]}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
          </svg>
        </div>
      </div>
      <div className={classes["new-task__section"]}>
        <label htmlFor="category">
          <svg
            className={classes["new-task__icon"]}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M24 22h-24v-14h7.262c1.559 0 2.411-.708 5.07-3h11.668v17zm-16.738-16c.64 0 1.11-.271 2.389-1.34l-2.651-2.66h-7v4h7.262z" />
          </svg>
        </label>
        <select
          className={classes["new-task__category"]}
          ref={categoryRef}
          defaultValue={targetTask.category}
        >
          {ctx.allCategory.map((cat) => {
            return (
              <option value={cat} key={cat}>
                {cat}
              </option>
            );
          })}
        </select>
      </div>
      <div className={classes["new-task__section"]}>
        <label htmlFor="description">
          <svg
            className={classes["new-task__icon"]}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M22 13v-13h-20v24h8.409c4.857 0 3.335-8 3.335-8 3.009.745 8.256.419 8.256-3zm-4-7h-12v-1h12v1zm0 3h-12v-1h12v1zm0 3h-12v-1h12v1zm-2.091 6.223c2.047.478 4.805-.279 6.091-1.179-1.494 1.998-5.23 5.708-7.432 6.881 1.156-1.168 1.563-4.234 1.341-5.702z" />
          </svg>
        </label>
        <textarea
          className={classes["new-task__description"]}
          placeholder="Add description..."
          ref={desRef}
          id="description"
          defaultValue={targetTask.description}
        />
      </div>
      {targetTask.completionDate.length > 0 && (
        <div className={classes["new-task__section"]}>
          <svg
            className={classes["new-task__icon"]}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M19 0h-14c-2.762 0-5 2.239-5 5v14c0 2.761 2.238 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-8.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" />
          </svg>

          <div className={classes["new-task__comp-date"]}>
            {targetTask.completionDate}
          </div>
        </div>
      )}
      <div className={classes["new-task__section"]}>
        <div className={classes["creation-date"]}>
          created on {targetTask.creationDate}
        </div>
      </div>
      <div className={classes["new-task__buttons"]}>
        <button type="submit" className={classes["new-task--add"]}>
          Save
        </button>
        <button
          type="submit"
          className={classes["new-task--dell"]}
          onClick={dekTaskHandler}
        >
          Delete
        </button>
        <button
          type="submit"
          className={classes["new-task--cancel"]}
          onClick={cancelHandler}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskDetailBox;
