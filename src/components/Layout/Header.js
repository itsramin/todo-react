import Search from "../Search/search";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.header}>
      <h1>To Do</h1>
      <Search />
      <div className={classes.theme}>🌙</div>
    </div>
  );
};

export default Header;
