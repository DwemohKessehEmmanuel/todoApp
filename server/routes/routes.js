const express = require("express");
const {
  getAllTodo,
  postTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/tasksController");

const { registerUser, loginUser } = require("../controllers/userController");

const router = express.Router();

router.route("/todos/:userEmail").get(getAllTodo);
router.route("/todos").post(postTodo);
router.route("/todos/:id").put(updateTodo);
router.route("/todos/:id").delete(deleteTodo);
router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router
