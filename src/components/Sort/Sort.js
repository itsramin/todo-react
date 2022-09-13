import { useContext } from "react";
import TaskCtx from "../../store/task-context";
import style from "./Sort.module.css";

const Sort = () => {
  const ctx = useContext(TaskCtx);

  const dueHandler = () => {
    ctx.sort("due date");
  };
  const creatHandler = () => {
    ctx.sort("creation date");
  };
  const alphaHandler = () => {
    ctx.sort("alphabet");
  };
  return (
    <div className={style["sort"]}>
      <div className={style["sort-btn"]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className={style["sort-icon"]}
        >
          <path d="M13 6h4l-5-6-5 6h4v12h-4l5 6 5-6h-4z" />
        </svg>
        Sort: {ctx.curSort}
      </div>
      <ul className={style.sublist}>
        <li className={style["sublist-item"]} onClick={dueHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={style["item-icon"]}
          >
            <path d="M8 10v4h4l-6 7-6-7h4v-4h-4l6-7 6 7h-4zm16 5h-10v2h10v-2zm0 6h-10v-2h10v2zm0-8h-10v-2h10v2zm0-4h-10v-2h10v2zm0-4h-10v-2h10v2z" />
          </svg>
          By due date
        </li>
        <li className={style["sublist-item"]} onClick={creatHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={style["item-icon"]}
          >
            <path d="M8 10v4h4l-6 8-6-8h4v-4h-4l6-8 6 8h-4zm12.206-5.236v6.236h1.794v-9h-1.462c0 1.61-2.089 1.552-2.538 1.572v1.192h2.206zm-1.396 13.451c1.006.896 2.661 1.016 3.486-.021-.055 1.139-.254 2.417-1.409 2.417-.583 0-.937-.355-1.014-.855h-1.688c.153 1.472 1.344 2.244 2.626 2.244 2.432 0 3.189-2.163 3.189-4.596 0-1.073-.139-1.938-.416-2.595-.909-2.167-3.585-2.155-4.771-.881-1.034 1.11-1.112 3.298-.003 4.287zm1.231-1.051c-.42-.516-.478-1.928.176-2.438.448-.353 1.248-.354 1.678.185.465.582.529 1.946-.234 2.435-.515.333-1.275.24-1.62-.182z" />
          </svg>
          By creation date
        </li>
        <li className={style["sublist-item"]} onClick={alphaHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={style["item-icon"]}
          >
            <path d="M8 10v4h4l-6 8-6-8h4v-4h-4l6-8 6 8h-4zm10.19-1.016h3.237l.581 1.807h1.992l-3.11-8.791h-2.078l-3.138 8.792h1.921l.595-1.808zm1.641-4.974l1.11 3.459h-2.251l1.141-3.459zm-1.393 16.439h4.562v1.551h-6.787v-1.551l4.493-5.684h-4.38v-1.557h6.662v1.473l-4.55 5.768z" />
          </svg>
          By alphabet
        </li>
      </ul>
    </div>
  );
};

export default Sort;
