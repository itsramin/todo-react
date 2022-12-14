import TaskCtx from "./task-context";
import { useReducer } from "react";

const localAllTasks = JSON.parse(window.localStorage.getItem("allTasks"));
const localAllCategory = JSON.parse(window.localStorage.getItem("allCategory"));
const defaultTaskState = {
  searchWord: "",
  curCategory: "main",
  allCategory: localAllCategory ? localAllCategory : ["main"],
  allTasks: localAllTasks ? localAllTasks : [],
  curSort: "creation date",
};

const taskReducer = (state, action) => {
  if (action.type === "ADD") {
    const updateTasks = [action.task, ...state.allTasks];
    window.localStorage.setItem("allTasks", JSON.stringify(updateTasks));
    return {
      allTasks: updateTasks,
      curCategory: state.curCategory,
      allCategory: state.allCategory,
      searchWord: state.searchWord,
      curSort: state.curSort,
    };
  }
  if (action.type === "CHECK") {
    const taskIndex = state.allTasks.findIndex((task) => task.id === action.id);
    const taskItem = state.allTasks[taskIndex];
    const dateTime = `${new Date().toISOString().slice(0, 10)} ${new Date()
      .toISOString()
      .slice(11, 16)}`;

    const completionDate = !taskItem.status ? dateTime : "";
    const updateTask = {
      ...taskItem,
      status: !taskItem.status,
      completionDate: completionDate,
    };
    const updateTasks = [...state.allTasks];
    updateTasks[taskIndex] = updateTask;

    window.localStorage.setItem("allTasks", JSON.stringify(updateTasks));

    return {
      allTasks: updateTasks,
      curCategory: state.curCategory,
      searchWord: state.searchWord,
      allCategory: state.allCategory,
      curSort: state.curSort,
    };
  }
  if (action.type === "EDIT") {
    const taskIndex = state.allTasks.findIndex(
      (task) => task.id === action.task.id
    );
    const updateTask = {
      ...state.allTasks[taskIndex],
      title: action.task.title,
      date: action.task.date,
      description: action.task.description,
      category: action.task.category,
      repeat: {
        amount: action.task.repeat.amount,
        period: action.task.repeat.period,
      },
    };
    const updateTasks = [...state.allTasks];
    updateTasks[taskIndex] = updateTask;

    window.localStorage.setItem("allTasks", JSON.stringify(updateTasks));
    return {
      allTasks: updateTasks,
      curCategory: state.curCategory,
      searchWord: state.searchWord,
      allCategory: state.allCategory,
      curSort: state.curSort,
    };
  }
  if (action.type === "DELL") {
    const taskIndex = state.allTasks.findIndex((task) => task.id === action.id);
    const updateTasks = [...state.allTasks];
    updateTasks.splice(taskIndex, 1);
    window.localStorage.setItem("allTasks", JSON.stringify(updateTasks));
    return {
      allTasks: updateTasks,
      curCategory: state.curCategory,
      searchWord: state.searchWord,
      allCategory: state.allCategory,
      curSort: state.curSort,
    };
  }
  if (action.type === "SEARCH") {
    return {
      allTasks: state.allTasks,
      searchWord: action.value,
      curCategory: state.curCategory,
      allCategory: state.allCategory,
      curSort: state.curSort,
    };
  }
  if (action.type === "SORT") {
    return {
      allTasks: state.allTasks,
      searchWord: state.searchWord,
      curCategory: state.curCategory,
      allCategory: state.allCategory,
      curSort: action.value,
    };
  }
  if (action.type === "CATEGORY") {
    return {
      allTasks: state.allTasks,
      searchWord: state.searchWord,
      curCategory: action.value,
      allCategory: state.allCategory,
      curSort: "due date",
    };
  }
  if (action.type === "ADD_CATEGORY") {
    const updateCats = [...state.allCategory, action.value];
    window.localStorage.setItem("allCategory", JSON.stringify(updateCats));
    return {
      allTasks: state.allTasks,
      searchWord: state.searchWord,
      curCategory: action.value,
      allCategory: updateCats,
      curSort: state.curSort,
    };
  }
  if (action.type === "DELL_CATEGORY") {
    const index = state.allCategory.findIndex((cat) => cat === action.value);
    const updateAllCats = [...state.allCategory];
    updateAllCats.splice(index, 1);
    window.localStorage.setItem("allCategory", JSON.stringify(updateAllCats));

    const updateTasks = [...state.allTasks];
    updateTasks.forEach((task) => {
      if (task.category === action.value) task.category = "main";
    });

    window.localStorage.setItem("allTasks", JSON.stringify(updateTasks));
    return {
      allTasks: updateTasks,
      searchWord: state.searchWord,
      curCategory: "main",
      allCategory: updateAllCats,
      curSort: state.curSort,
    };
  }
  if (action.type === "EDIT_CATEGORY") {
    const index = state.allCategory.findIndex(
      (cat) => cat === state.curCategory
    );
    const updateAllCats = [...state.allCategory];
    updateAllCats[index] = action.value;
    window.localStorage.setItem("allCategory", JSON.stringify(updateAllCats));

    const updateTasks = [...state.allTasks];

    updateTasks.forEach((task) => {
      if (task.category === state.curCategory) task.category = action.value;
    });

    window.localStorage.setItem("allTasks", JSON.stringify(updateTasks));
    return {
      allTasks: updateTasks,
      searchWord: state.searchWord,
      curCategory: action.value,
      allCategory: updateAllCats,
      curSort: state.curSort,
    };
  }
  return defaultTaskState;
};

const TaskProvider = (props) => {
  const [taskState, dispatchTask] = useReducer(taskReducer, defaultTaskState);
  const addTaskHandler = (task) => {
    dispatchTask({ type: "ADD", task: task });
  };
  const checkHandler = (id) => {
    dispatchTask({ type: "CHECK", id: id });
  };
  const deleteHandler = (id) => {
    dispatchTask({ type: "DELL", id: id });
  };
  const searchHandler = (value) => {
    dispatchTask({ type: "SEARCH", value: value });
  };
  const categoryHandler = (value) => {
    dispatchTask({ type: "CATEGORY", value: value });
  };
  const addCategoryHandler = (value) => {
    dispatchTask({ type: "ADD_CATEGORY", value: value });
  };
  const delCategoryHandler = (value) => {
    dispatchTask({ type: "DELL_CATEGORY", value: value });
  };
  const editTaskHandler = (task) => {
    dispatchTask({ type: "EDIT", task: task });
  };
  const sortHandler = (value) => {
    dispatchTask({ type: "SORT", value: value });
  };
  const editCatHandler = (value) => {
    dispatchTask({ type: "EDIT_CATEGORY", value: value });
  };

  const taskValues = {
    allTasks: taskState.allTasks,
    addTask: addTaskHandler,
    check: checkHandler,
    editTask: editTaskHandler,
    delete: deleteHandler,
    search: searchHandler,
    searchWord: taskState.searchWord,
    category: categoryHandler,
    curCategory: taskState.curCategory,
    addCategory: addCategoryHandler,
    allCategory: taskState.allCategory,
    delCategory: delCategoryHandler,
    sort: sortHandler,
    curSort: taskState.curSort,
    editCategory: editCatHandler,
  };
  return (
    <TaskCtx.Provider value={taskValues}>{props.children}</TaskCtx.Provider>
  );
};

export default TaskProvider;
