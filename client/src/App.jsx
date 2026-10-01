import { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all tasks when the component first mounts
  useEffect(() => {
    fetchTasks();
  }, []); // empty dependency array = run once, on mount only

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load tasks. Is the server running?");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = async (formData) => {
    try {
      const response = await axios.post(API_URL, formData);
      setTasks((prev) => [response.data, ...prev]); // add new task to the top
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Failed to create task. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task.");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        status: newStatus,
      });
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? response.data : task)),
      );
    } catch (err) {
      console.error("Error updating task:", err);
      alert("Failed to update task.");
    }
  };

  if (loading)
    return (
      <div className="app">
        <p>Loading tasks...</p>
      </div>
    );

  return (
    <div className="app">
      <h1>TaskFlow</h1>
      {error && <p className="error-banner">{error}</p>}
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}

export default App;
