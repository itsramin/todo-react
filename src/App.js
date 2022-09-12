import { useState } from "react";
import "./App.css";
import Category from "./components/Category/Category";
import Header from "./components/Layout/Header";
import NewTask from "./components/Tasks/NewTask";
import TaskDetailBox from "./components/Tasks/TaskDetailBox";
import TaskList from "./components/Tasks/TaskList";
import TaskProvider from "./store/TaskProvider";

function App() {
  const [curId, setCurId] = useState("");
  const idChangeHandler = (id) => {
    setCurId(id);
  };
  const closeDetailBoxHandler = () => {
    if (curId === "") return;
    setCurId("");
  };

  return (
    <TaskProvider>
      <Header />
      <main className="main">
        <div className="lists" onClick={closeDetailBoxHandler}>
          <Category />
          <NewTask />
          <TaskList onIdChange={idChangeHandler} />
        </div>
        {curId.length > 0 && (
          <div className="box">
            <TaskDetailBox id={curId} onClose={closeDetailBoxHandler} />
          </div>
        )}
      </main>
    </TaskProvider>
  );
}

export default App;
