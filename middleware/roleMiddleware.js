const Role = (role) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role === role) {
      return res
        .status(401)
        .json({ message: "You do not have permission for this role" });
    } else {
      next();
    }
  };
};
module.exports = Role;
