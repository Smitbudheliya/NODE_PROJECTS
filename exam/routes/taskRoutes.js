const express = require("express");
const router = express.Router();
const { addTask, getMyTasks, deleteTask } = require("../controllers/taskController");
const { auth } = require("../middlewares/auth");

router.post("/add", auth, addTask);
router.get("/", auth, getMyTasks);
router.delete("/:id", auth, deleteTask);

module.exports = router;
