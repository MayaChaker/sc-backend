const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  register,
} = require("../Controllers/UserController.js");
router.get("/", getAllUsers);
router.get("/:user_id", getUserById);
router.post("/", createUser);
router.put("/:user_id", updateUser);
router.delete("/:user_id", deleteUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/register", register);

module.exports = router;
