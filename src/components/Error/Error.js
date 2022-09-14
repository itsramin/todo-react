import { useContext } from "react";
import TaskCtx from "../../store/task-context";
import Modal from "../UI/Modal";
import style from "./Error.module.css";
const Error = (props) => {
  const ctx = useContext(TaskCtx);
  const errorList = [
    {
      id: "cat0",
      text: "Invalid name for category",
    },
    {
      id: "cat1",
      text: "Duplicate name for category",
    },
    {
      id: "cat2",
      text: "You can't rename Main Category",
    },
    {
      id: "cat3",
      text: "You can't delete Main Category",
    },
    {
      id: "cat4",
      text: "Are you sure you want to delete this category?",
      question: true,
      func: ctx.delCategory.bind(null, ctx.curCategory),
    },
    {
      id: "task1",
      text: "Enter a title for task",
    },
    {
      id: "task2",
      text: "Are you sure you want to delete this task?",
      question: true,
      func: ctx.delete.bind(null, props.taskId),
    },
  ];
  const errorIndex = errorList.findIndex((err) => err.id === props.errorNum);

  const yesHandler = () => {
    errorList[errorIndex].func();
    props.onCloseError();
  };
  const noHandler = () => {
    props.onCloseError();
  };
  return (
    <Modal onCloseError={props.onCloseError}>
      <div className={style["error-box"]}>
        <div className={style["error-header"]}>
          <svg
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={style["alert-icon"]}
          >
            <path
              d="m2.095 19.886 9.248-16.5c.133-.237.384-.384.657-.384.272 0 .524.147.656.384l9.248 16.5c.064.115.096.241.096.367 0 .385-.309.749-.752.749h-18.496c-.44 0-.752-.36-.752-.749 0-.126.031-.252.095-.367zm9.907-6.881c-.414 0-.75.336-.75.75v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5c0-.414-.336-.75-.75-.75zm-.002-3c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z"
              fillRule="nonzero"
            />
          </svg>
        </div>
        <div className={style["error-message"]}>
          {errorList[errorIndex].text}
        </div>
        {errorList[errorIndex].question && (
          <div className={style["error-buttons"]}>
            <div className={style["error-btn--yes"]} onClick={yesHandler}>
              Yes
            </div>
            <div className={style["error-btn--no"]} onClick={noHandler}>
              No
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default Error;
