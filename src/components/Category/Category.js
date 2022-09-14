import { useContext, useState } from "react";
import TaskCtx from "../../store/task-context";
import classes from "./Category.module.css";

const Category = (props) => {
  const ctx = useContext(TaskCtx);

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newCat, setNewCat] = useState("");

  // handlers
  const selectHandler = (e) => {
    ctx.category(e.target.value);
  };
  const addCatHandler = () => {
    setIsAdding((prev) => !prev);
  };
  const delCatHandler = () => {
    if (ctx.curCategory === "main") return props.onError("cat3");
    props.onError("cat4");
    // ctx.delCategory(ctx.curCategory);
  };
  const renameCatHandler = () => {
    if (ctx.curCategory === "main") return props.onError("cat2");
    setIsEditing((prev) => !prev);
    setNewCat(ctx.curCategory);
  };
  const closeEditCat = () => {
    setIsEditing((prev) => !prev);
    setNewCat("");
  };
  const closeNewCat = () => {
    setIsAdding((prev) => !prev);
    setNewCat("");
  };

  const submitEditCat = (e) => {
    e.preventDefault();
    if (ctx.allCategory.some((cat) => cat === newCat))
      return props.onError("cat1");
    ctx.editCategory(newCat);
    setIsEditing(false);
    setNewCat("");
  };
  const submitCat = (e) => {
    e.preventDefault();
    if (newCat === "") return props.onError("cat0");
    if (ctx.allCategory.some((cat) => cat === newCat))
      return props.onError("cat1");
    ctx.addCategory(newCat);
    setIsAdding(false);
    setNewCat("");
  };

  // Icons

  const plusIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={classes["sublist-item__icon"]}
    >
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
    </svg>
  );
  const trashIcon = (
    <svg
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      className={classes["sublist-item__icon"]}
    >
      <path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m3-19h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z" />
    </svg>
  );
  const renameIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={classes["sublist-item__icon"]}
    >
      <path d="M7.127 22.564l-7.126 1.436 1.438-7.125 5.688 5.689zm-4.274-7.104l5.688 5.689 15.46-15.46-5.689-5.689-15.459 15.46z" />
    </svg>
  );

  // input section

  const selectCategory = (
    <select
      className={classes["category-select"]}
      onChange={selectHandler}
      value={ctx.curCategory}
    >
      {ctx.allCategory.map((cat) => {
        return (
          <option value={cat} key={cat}>
            {cat}
          </option>
        );
      })}
    </select>
  );
  const newCategory = (
    <form
      onSubmit={submitCat}
      onBlur={closeNewCat}
      className={classes["category-new"]}
    >
      <input
        className={classes["category-input"]}
        type="text"
        value={newCat}
        placeholder="New category"
        onChange={(e) => setNewCat(e.target.value)}
        autoFocus
      />
      <div onClick={submitCat}>
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className={classes["check-icon"]}
        >
          <path d="M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z" />
        </svg>
      </div>
    </form>
  );
  const editCategory = (
    <form
      onSubmit={submitEditCat}
      onBlur={closeEditCat}
      className={classes["category-edit"]}
    >
      <input
        className={classes["category-input"]}
        type="text"
        value={newCat}
        placeholder="New category"
        onChange={(e) => setNewCat(e.target.value)}
        autoFocus
      />
      <div onClick={submitEditCat}>
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className={classes["check-icon"]}
        >
          <path d="M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z" />
        </svg>
      </div>
    </form>
  );
  let shownSection;
  if (isAdding) {
    shownSection = newCategory;
  } else if (isEditing) {
    shownSection = editCategory;
  } else {
    shownSection = selectCategory;
  }

  // const addButtonClass = `${classes["sublist-item"]} ${
  //   isAdding ? classes["rotate"] : ""
  // }`;

  return (
    <div className={classes["category-section"]}>
      {shownSection}

      <div className={classes["category-options"]}>
        <svg
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className={classes["category-icon"]}
        >
          <path d="m12 16.495c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm0-6.75c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm0-6.75c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25z" />
        </svg>
        <ul className={classes["category-sublist"]}>
          <li className={classes["sublist-item"]} onClick={addCatHandler}>
            {plusIcon} Add new category
          </li>
          <li
            className={classes["sublist-item"]}
            onClick={renameCatHandler}
            disabled={true}
          >
            {renameIcon} Rename category
          </li>
          <li className={classes["sublist-item"]} onClick={delCatHandler}>
            {trashIcon} Delete category
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Category;
