const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.Token;
    if (!token) return res.status(401).json({ message: "Not loged in" });

    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(data.user_id);

    if (!user) return res.status(404).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (error) {
    console.error("auth error", error);
    res.status(401).json({ message: "You are not allowed to access this" });
  }
};
module.exports = auth;
