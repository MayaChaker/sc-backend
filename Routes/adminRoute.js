const express = require("express");
const router = express.Router();
const User = require("../Models/userModel");
const auth = require("../middleware/authMiddleware");

router.post("/users", auth, async (req, res) => {
  if (req.user.role !== "Admin") {
    return res.status(201).json({ message: "Only admin can create users" });
  }
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "failed to create user " });
  }
});
router.put("/users/:id", auth, async (req, res) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "only admin can update users" });
  }
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
});
router.delete("/users/:id", auth, async (req, res) => {
  if (req.user.role !== "Admin") {
    return res.status(404).json({ message: "Only Admin can delete users" });
  }
  try {
    const deleted = await User.destroy({ where: { user_id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});
module.exports = router;
