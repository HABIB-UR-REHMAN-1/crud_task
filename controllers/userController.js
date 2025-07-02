const mongoose = require("mongoose");
const User = require("../models/userModel");

// 1. Create User
exports.createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const newUser = await User.create({
      name,
      email,
      role: role || "customer",
    });
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    if (error.name === "ValidationError" || error.code === 11000) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

// 2. Get Users
exports.getUsers = async (req, res) => {
  try {
    const { role, sortBy = "createdAt", order = "desc" } = req.query;
    const validRoles = ["admin", "customer"];
    const validSortBy = ["name", "createdAt"];
    const validOrder = ["asc", "desc"];

    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }
    if (!validSortBy.includes(sortBy)) {
      return res.status(400).json({ error: "Invalid sortBy" });
    }
    if (!validOrder.includes(order)) {
      return res.status(400).json({ error: "Invalid order" });
    }

    const filter = role ? { role } : {};
    const sortObj = { [sortBy]: order === "asc" ? 1 : -1 };

    const users = await User.find(filter).sort(sortObj);
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// 3. Get User By ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user id" });
  }
  const user = await User.findById(id).select("-password");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json({ data: user });
};

// 4. Update User
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user id" });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ data: updatedUser });
  } catch (error) {
    if (error.name === "ValidationError" || error.code === 11000) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

// 5. Delete User
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user id" });
  }
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json({ data: null });
};
