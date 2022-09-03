import TasksList from "./components/TasksList";
import useFetch from "./useFetch";

const Home = () => {
  const {
    data: allTasks,
    isPending,
    error,
  } = useFetch("http://localhost:8000/allTasks");

  return (
    <div className="Home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {allTasks && <TasksList allTasks={allTasks} />}
    </div>
  );
};

export default Home;
