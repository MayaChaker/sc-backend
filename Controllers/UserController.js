const User = require("../Models/userModel");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    const result = users.map((user) => {
      const info = {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        username: user.username,
        dob: user.dob,
        contact_number: user.contact_number,
        section_id: user.section_id,
      };
      if (user.role === "Doctor") {
        return {
          ...info,
          specialization: user.specialization,
        };
      } else if (user.role === "Patient") {
        return {
          ...info,
          gender: user.gender,
          address: user.address,
        };
      } else {
        return {
          ...info,
        };
      }
    });
    res.json(result);
  } catch (error) {
    console.error("getAllUsers error:", error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    console.error({ message: "getUserById error", error });
    res.status(404).json({ error: "Failed to retrieve user" });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      role,
      username,
      password,
      dob,
      gender,
      contact_number,
      specialization,
      section_id,
      address,
    } = req.body;

    if (role === "Doctor" && !specialization) {
      return res.status(404).json({ error: " specialization is required" });
    }
    if (
      role === "Patient" &&
      (!address || !gender || !contact_number || !dob)
    ) {
      return res.status(404).json({
        message: "All fields required",
      });
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      first_name,
      last_name,
      role,
      username,
      password: passwordHash,
      dob,
      gender,
      contact_number,
      specialization,
      address,
      gender,
      section_id,
    });
    const userData = newUser.get({ plain: true });
    delete userData.password;
    res.status(201).json(userData);
  } catch (error) {
    console.error("createUser error:", error);
    res.status(500).json({ error: "Failed to create user account" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ error: "User not exist" });

    const {
      first_name,
      last_name,
      role,
      username,
      password,
      contact_number,
      section_id,
    } = req.body;
    const updateUser = await user.update({
      first_name,
      last_name,
      role,
      username,
      password,
      contact_number,
      section_id,
    });

    res.json(updateUser);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to  update user account" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const deletee = await User.destroy({ where: { user_id } });
    if (!deletee) {
      return res.status(404).json({ message: "User not exist" });
    }
    return res.status(200).json({ message: "User account has deleted " });
  } catch (error) {
    console.error("deleteUser error:", error);
    res.status(500).json({ error: "Failed to delete the user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Please enter both username and password" });
    }
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: "User not exist" });
    }
    const exist = await bcrypt.compare(password, user.password);
    if (!exist) {
      return res.status(401).json({ error: "Incorrect Password" });
    }
    res.json({
      user: {
        user_id: user.user_id,
        username: user.username,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Failed to login" });
  }
};

const logoutUser = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("Token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .json({ message: "Logout seccessful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Failed to log out" });
  }
};

const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      username,
      password,
      role,
      contact_number,
      dob,
      gender,
      specialization,
      address,
    } = req.body;

    if (!username || !password || !role) {
      return res
        .status(400)
        .json({ error: "Required fields are not complete" });
    }

    const exist = await User.findOne({ where: { username } });
    if (exist) {
      return res.status(400).json({ error: "Username already exists" });
    }

    if (role === "Doctor" && !specialization) {
      return res
        .status(400)
        .json({ error: "specialization is required for doctors" });
    }
    if (
      role === "Patient" &&
      (!address || !gender || !contact_number || !dob)
    ) {
      return res.status(400).json({
        error: "All patient fields are required",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      first_name,
      last_name,
      username,
      password: passwordHash,
      role,
      contact_number,
      dob,
      gender,
      specialization,
      address,
    });
    const userData = newUser.get({ plain: true });
    delete userData.password;

    res.status(201).json(userData);
  } catch (error) {
    console.error("register error:", error);
    res.status(500).json({ error: "Failed to register" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  register,
};
