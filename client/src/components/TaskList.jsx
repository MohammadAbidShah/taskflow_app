import { useState, useMemo } from "react";

function TaskList({ tasks, onDelete, onStatusChange }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // useMemo avoids recalculating this on every render unless tasks/filter/sort actually change
  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    // Filtering
    if (statusFilter !== "all") {
      result = result.filter((task) => task.status === statusFilter);
    }

    // Sorting
    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      result.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
      );
    } else if (sortBy === "dueDate") {
      result.sort((a, b) => {
        if (!a.dueDate) return 1; // tasks without due dates go last
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    }

    return result;
  }, [tasks, statusFilter, sortBy]);

  return (
    <div className="task-list">
      <h2>Tasks ({filteredAndSortedTasks.length})</h2>

      <div className="controls">
        <div className="control-group">
          <label>Filter by status: </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="control-group">
          <label>Sort by: </label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>
      </div>

      {filteredAndSortedTasks.length === 0 ? (
        <p className="empty-state">No tasks match this filter.</p>
      ) : (
        <ul>
          {filteredAndSortedTasks.map((task) => (
            <li
              key={task._id}
              className={`task-card priority-${task.priority}`}
            >
              <div className="task-header">
                <h3>{task.title}</h3>
                <span className={`badge status-${task.status}`}>
                  {task.status}
                </span>
              </div>
              {task.description && <p>{task.description}</p>}
              <div className="task-meta">
                <span>👤 {task.assignedTo}</span>
                <span>⚡ {task.priority}</span>
                {task.dueDate && (
                  <span>📅 {new Date(task.dueDate).toLocaleDateString()}</span>
                )}
              </div>
              <div className="task-actions">
                <select
                  value={task.status}
                  onChange={(e) => onStatusChange(task._id, e.target.value)}
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
                <button onClick={() => onDelete(task._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
