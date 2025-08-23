const express = require("express");
const router = express.Router();
const Role = require("../middleware/roleMiddleware");
const auth = require("../middleware/authMiddleware");
const {
  createUser,
  updateUser,
  deleteUser,
} = require("../Controllers/adminController");

router.use(auth, Role("Admin"));
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
