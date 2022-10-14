import classes from "./NewTask.module.css";
import { useContext, useState } from "react";
import TaskCtx from "../../store/task-context";
const NewTask = (props) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [repAmount, setRepAmount] = useState("");
  const [repPeriod, setRepPeriod] = useState("");
  const [optionsShow, setOptionsShow] = useState(false);

  const ctx = useContext(TaskCtx);

  const inputClickHandler = () => {
    setOptionsShow(true);
  };

  // date handlers
  const dateHandler = (e) => {
    setDate(e.target.value);
  };
  const addTodayHandler = () => {
    const today = new Date();
    setDate(today.toISOString().slice(0, 10));
  };
  const addTomorrowHandler = () => {
    const today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow = tomorrow.toISOString().slice(0, 10);
    setDate(tomorrow);
  };
  const clearDateHandler = () => {
    setDate("");
  };

  // repeat handler
  const repAmountHandler = (e) => {
    setRepAmount(e.target.value);
  };
  const repPeriodHandler = (e) => {
    setRepPeriod(e.target.value);
  };
  const addEverydayHandler = () => {
    setRepAmount(1);
    setRepPeriod("days");
  };
  const addWeeklyHandler = () => {
    setRepAmount(1);
    setRepPeriod("weeks");
  };
  const addMonthlyHandler = () => {
    setRepAmount(1);
    setRepPeriod("months");
  };
  const clearRepeatHandler = () => {
    setRepAmount("");
    setRepPeriod("");
  };

  // classes for icons
  const calIconClass = `${classes["option-icon"]} ${classes["calendar-icon"]} ${
    date.length > 0 ? classes["option-icon--blue"] : ""
  }`;
  const repIconClass = `${classes["option-icon"]}  ${classes["repeat-icon"]} ${
    repAmount > 0 ? classes["option-icon--blue"] : ""
  }`;

  // entered data shown text
  let shownRep = "";
  if (repAmount === 1 && repPeriod === "days") {
    shownRep = "Everyday";
  } else if (repAmount === 1 && repPeriod === "weeks") {
    shownRep = "Weekly";
  } else if (repAmount === 1 && repPeriod === "months") {
    shownRep = "Monthly";
  } else if (repAmount > 0) {
    shownRep = `Every ${repAmount} ${repPeriod}`;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (title === "") return props.onError("task1");
    setTitle("");
    setDate("");
    setRepAmount("");
    setOptionsShow(false);
    let updateDate = date;
    if (repAmount > 0 && date.length === 0) {
      updateDate = new Date().toISOString().slice(0, 10);
    }

    ctx.addTask({
      title,
      id: Math.random().toString(),
      date: updateDate,
      status: false,
      category: ctx.curCategory,
      description: "",
      completionDate: "",
      repeat: { amount: repAmount, period: repPeriod },
      creationDate: new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <form className={classes["new-task__form"]} onSubmit={submitHandler}>
      <input
        type="text"
        className={classes["new-task__title"]}
        placeholder="Add a task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onClick={inputClickHandler}
      ></input>
      {optionsShow && (
        <div className={classes["new-task__options"]}>
          <div className={classes["new-task__options-left"]}>
            <div className={classes["new-task__option"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className={calIconClass}
              >
                <path d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z" />
              </svg>
              <ul className={classes["option-sublist"]}>
                <h4 className={classes["sublist-header"]}>Due to</h4>
                <li
                  className={classes["sublist-item"]}
                  onClick={addTodayHandler}
                >
                  Today
                </li>
                <li
                  className={classes["sublist-item"]}
                  onClick={addTomorrowHandler}
                >
                  Tomorrow
                </li>

                <input
                  type="date"
                  className={classes["new-task__input--date"]}
                  value={date}
                  onChange={dateHandler}
                />

                {date.length > 0 && (
                  <li
                    className={classes["btn-clear"]}
                    onClick={clearDateHandler}
                  >
                    <svg
                      clipRule="evenodd"
                      fillRule="evenodd"
                      strokeLinejoin="round"
                      strokeMiterlimit="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className={classes["btn-clear__icon"]}
                    >
                      <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
                    </svg>
                    <span>Clear</span>
                  </li>
                )}
              </ul>
              <div className={classes["entered-data"]}>{date}</div>
            </div>
            <div className={classes["new-task__option"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={repIconClass}
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M2 12c0 .999.381 1.902.989 2.604l-1.098.732-.587.392c-.814-1.025-1.304-2.318-1.304-3.728 0-3.313 2.687-6 6-6h9v-3l6 4-6 4v-3h-9c-2.206 0-4 1.794-4 4zm20.696-3.728l-.587.392-1.098.732c.608.702.989 1.605.989 2.604 0 2.206-1.795 4-4 4h-9v-3l-6 4 6 4v-3h9c3.313 0 6-2.687 6-6 0-1.41-.489-2.703-1.304-3.728z" />
              </svg>
              <ul className={classes["option-sublist"]}>
                <h4 className={classes["sublist-header"]}>Repeat</h4>
                <li
                  className={classes["sublist-item"]}
                  onClick={addEverydayHandler}
                >
                  Everyday
                </li>
                <li
                  className={classes["sublist-item"]}
                  onClick={addWeeklyHandler}
                >
                  Weekly
                </li>
                <li
                  className={classes["sublist-item"]}
                  onClick={addMonthlyHandler}
                >
                  Monthly
                </li>
                <li className={classes["new-task__input--repeat"]}>
                  <input
                    id="repeat"
                    type="number"
                    min="1"
                    className={classes["new-task__repeat"]}
                    value={repAmount}
                    onChange={repAmountHandler}
                  />
                  <select
                    className={classes["new-task__repeat-period"]}
                    value={repPeriod}
                    onChange={repPeriodHandler}
                  >
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
                </li>
                {repAmount > 0 && (
                  <li
                    className={classes["btn-clear"]}
                    onClick={clearRepeatHandler}
                  >
                    <svg
                      clipRule="evenodd"
                      fillRule="evenodd"
                      strokeLinejoin="round"
                      strokeMiterlimit="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className={classes["btn-clear__icon"]}
                    >
                      <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
                    </svg>
                    <span>Clear</span>
                  </li>
                )}
              </ul>
              <div className={classes["entered-data"]}>{shownRep}</div>
            </div>
          </div>
          <button type="submit" className={classes["new-task__btn"]}>
            Add
          </button>
        </div>
      )}
    </form>
  );
};

export default NewTask;
