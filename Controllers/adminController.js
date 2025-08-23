const bcrypt = require("bcrypt");
const User = require("../Models/userModel");

exports.createUser = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const newUser = await User.create(data);
    const userData = newUser.get({ plain: true });
    delete userData.password;
    res.status(201).json(userData);
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const updates = { ...req.body };
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    await user.update(updates);
    const userData = user.get({ plain: true });
    delete userData.password;
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { user_id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};
