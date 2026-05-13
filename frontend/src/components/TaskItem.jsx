import { useState, useEffect } from "react";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");

  // Sync state if task changes
  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description || "");
  }, [task]);

  const handleSave = () => {
    if (!title.trim()) return;
    onEdit(task.id, { title, description, status: task.status });
    setIsEditing(false);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="task-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          {/* Toggle */}
          <input
            type="checkbox"
            checked={task.status === "completed"}
            onChange={() => onToggle(task.id)}
          />

          {/* Content (ONLY this gets strikethrough) */}
          <div
            className={`task-content ${
              task.status === "completed" ? "completed" : ""
            }`}
          >
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            <small>
              Created: {new Date(task.created_at).toLocaleDateString()}
            </small>
          </div>

          {/* Actions */}
          <div className="task-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;
