import Search from "../Search/search";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.header}>
      <h1>To Do</h1>
      <Search />
      <div className={classes.theme}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className={classes["theme-icon"]}
        >
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.685 21.965c3.205-2.154 5.315-5.813 5.315-9.965s-2.11-7.811-5.315-9.965c5.202.353 9.315 4.673 9.315 9.965s-4.113 9.612-9.315 9.965z" />
        </svg>
      </div>
    </div>
  );
};

export default Header;