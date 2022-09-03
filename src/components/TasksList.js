const TasksList = (props) => {
  const allTasks = props.allTasks;
  return (
    <div>
      {allTasks.map((task) => {
        return (
          <div className="task-row" key={task.id}>
            <input type="checkbox" className="task-check" />
            <h3 className="task-title">{task.title}</h3>
            <p className="task-date">{task.date}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TasksList;
