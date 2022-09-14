import { useState } from "react";
import "./App.css";
import Category from "./components/Category/Category";
import Header from "./components/Layout/Header";
import NewTask from "./components/Tasks/NewTask";
import TaskDetailBox from "./components/Tasks/TaskDetailBox";
import TaskList from "./components/Tasks/TaskList";
import TaskProvider from "./store/TaskProvider";
import Sort from "./components/Sort/Sort";
import Error from "./components/Error/Error";

function App() {
  const [curId, setCurId] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorNum, setErrorNum] = useState(0);
  const [taskId, setTaskId] = useState(0);

  const idChangeHandler = (id) => {
    setCurId(id);
  };
  const closeDetailBoxHandler = () => {
    if (curId === "") return;
    setCurId("");
  };
  const closeErrorHandler = () => {
    setIsError(false);
  };
  const errorHandler = (errorId, taskId) => {
    setTaskId(taskId);
    setErrorNum(errorId);
    setIsError(true);
  };

  return (
    <TaskProvider>
      {isError && (
        <Error
          errorNum={errorNum}
          taskId={taskId}
          onCloseError={closeErrorHandler}
        />
      )}
      <Header />
      <main className="main">
        <div className="lists" onClick={closeDetailBoxHandler}>
          <div className="row">
            <Category onError={errorHandler} />
            <Sort />
          </div>

          <NewTask onError={errorHandler} />
          <TaskList onIdChange={idChangeHandler} />
        </div>
        {curId.length > 0 && (
          <div className="box">
            <TaskDetailBox
              id={curId}
              onClose={closeDetailBoxHandler}
              onError={errorHandler}
            />
          </div>
        )}
      </main>
    </TaskProvider>
  );
}

export default App;
