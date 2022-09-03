import "./App.css";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskForm from "./components/TaskForm";
import NavBar from "./components/NavBar";

// const allTasks = [
//   { title: "Dishes", status: false, date: "08/12", id: 1 },
//   { title: "book", status: false, date: "08/16", id: 2 },
//   { title: "car", status: false, date: "08/13", id: 3 },
// ];

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/new" element={<TaskForm />}></Route>
          <Route path="/alltasks/:id" element={<TaskForm />}></Route>
        </Routes>
        <NavBar />
      </div>
    </Router>
  );
}

export default App;
