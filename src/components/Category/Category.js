import { useContext, useState } from "react";
import TaskCtx from "../../store/task-context";
import classes from "./Category.module.css";

const Category = () => {
  const ctx = useContext(TaskCtx);

  const [isAdding, setIsAdding] = useState(false);
  const [newCat, setNewCat] = useState("");
  const selectHandler = (e) => {
    ctx.category(e.target.value);
  };

  const addCatHandler = (e) => {
    e.preventDefault();
    setIsAdding((prev) => !prev);
  };
  const delCatHandler = (e) => {
    e.preventDefault();
    ctx.delCategory(ctx.curCategory);
  };

  const submitCat = (e) => {
    e.preventDefault();
    if (newCat === "") return;
    ctx.addCategory(newCat);
    setIsAdding(false);
    setNewCat("");
  };

  const plus = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
    </svg>
  );
  const trash = (
    <svg
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m3-19h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z" />
    </svg>
  );

  const selectPart = (
    <select className={classes["category-select"]} onChange={selectHandler}>
      {ctx.allCategory.map((cat) => {
        return (
          <option value={cat} key={cat}>
            {cat}
          </option>
        );
      })}
    </select>
  );

  const inputPart = (
    <form onSubmit={submitCat}>
      <input
        className={classes["category-input"]}
        type="text"
        value={newCat}
        placeholder="New category"
        onChange={(e) => setNewCat(e.target.value)}
      />
    </form>
  );

  const addButtonClass = `${classes["category-add"]} ${
    isAdding ? classes["rotate"] : ""
  }`;

  return (
    <div className={classes["category-section"]}>
      {isAdding ? inputPart : selectPart}
      <button className={addButtonClass} onClick={addCatHandler}>
        {plus}
      </button>
      <button className={classes["category-trash"]} onClick={delCatHandler}>
        {trash}
      </button>
    </div>
  );
};

export default Category;
