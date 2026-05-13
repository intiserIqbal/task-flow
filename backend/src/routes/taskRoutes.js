const express = require("express");

const router = express.Router();

const taskController = require("../controllers/taskController");
const validateCreateTask = require("../middleware/validateCreateTask");

router.get("/", taskController.getTasks);

router.post("/", validateCreateTask, taskController.createTask);

router.put("/:id", taskController.updateTask);

router.patch("/:id/toggle", taskController.toggleTask);

router.delete("/:id", taskController.deleteTask);

module.exports = router;
