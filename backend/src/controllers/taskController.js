const taskModel = require("../models/taskModel");

const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.getAllTasks();

    res.status(200).json({
      tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await taskModel.createTask(title, description || "");

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const existingTask = await taskModel.getTaskById(id);

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // fallback to existing values if not provided
    const updatedTitle = title ?? existingTask.title;
    const updatedDescription = description ?? existingTask.description;
    const updatedStatus = status ?? existingTask.status;

    await taskModel.updateTask(
      id,
      updatedTitle,
      updatedDescription,
      updatedStatus,
    );

    const updatedTask = await taskModel.getTaskById(id);

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const toggleTask = async (req, res) => {
  try {
    const { id } = req.params;

    const existingTask = await taskModel.getTaskById(id);

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const updatedStatus = await taskModel.toggleTaskStatus(
      id,
      existingTask.status,
    );

    res.status(200).json({
      message: "Task status updated",
      status: updatedStatus,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const existingTask = await taskModel.getTaskById(id);

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await taskModel.deleteTask(id);

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  toggleTask,
  deleteTask,
};
