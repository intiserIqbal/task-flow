import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  toggleTask,
  deleteTask,
  updateTask,
} from "./services/taskService";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import "./styles/app.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (taskData) => {
    try {
      await createTask(taskData);
      setFilter("all"); // ensures visibility
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleTask = async (id) => {
    try {
      await toggleTask(id);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );
    if (!confirmed) return;
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditTask = async (id, updatedTask) => {
    try {
      await updateTask(id, updatedTask);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") {
      return task.status === "pending";
    }
    if (filter === "completed") {
      return task.status === "completed";
    }
    return true;
  });

  return (
    <div className="container">
      <h1>Task-Flow</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      <TaskForm onAddTask={handleAddTask} />
      <FilterBar filter={filter} setFilter={setFilter} />
      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />
    </div>
  );
}

export default App;
