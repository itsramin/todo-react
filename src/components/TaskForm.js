import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./components.css";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = { title, date, description };

    fetch("http://localhost:8000/allTasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          className="form__input"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date"
          className="form__input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="textarea"
          placeholder="Description"
          className="form__input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="form__btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
