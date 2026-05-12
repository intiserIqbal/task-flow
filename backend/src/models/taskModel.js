const db = require("../db/database");

const getAllTasks = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM tasks ORDER BY created_at DESC", [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getTaskById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM tasks WHERE id = ?", [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const createTask = (title, description) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO tasks (title, description)
      VALUES (?, ?)
    `;

    db.run(sql, [title, description], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          id: this.lastID,
          title,
          description,
          status: "pending",
        });
      }
    });
  });
};

const updateTask = (id, title, description, status) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE tasks
      SET
        title = ?,
        description = ?,
        status = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    db.run(sql, [title, description, status, id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
};

const toggleTaskStatus = (id, currentStatus) => {
  return new Promise((resolve, reject) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";

    const sql = `
      UPDATE tasks
      SET
        status = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    db.run(sql, [newStatus, id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(newStatus);
      }
    });
  });
};

const deleteTask = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  toggleTaskStatus,
  deleteTask,
};
