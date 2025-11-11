const userModel = require("../model/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

module.exports.registerAdmin = async (req, res) => {
  try {
    const existAdmin = await userModel.findOne({ email: req.body.email });
    if (existAdmin) {
      return res.status(400).json({ message: "Admin Already Exist" });
    }
    if (req.file) req.body.profile = `/uploads/${req.file.filename}`;
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.role = "Admin";

    await userModel.create(req.body);

    return res.status(200).json({ message: "Register Admin Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.loginAdmin = async (req, res) => {
  try {

    const admin = await userModel.findOne({ email: req.body.email, role: "Admin" });
    if (!admin) return res.status(404).json({ message: "Admin Not Found" });
    const isMatch = await bcrypt.compare(req.body.password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid Credentials" });


    const token = jwt.sign({ userId: admin._id }, "testing");
    return res.status(200).json({ message: "Login Success", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.myProfile = async (req, res) => {
  return res.status(200).json({ message: "Profile Data", data: req.user });
};

module.exports.editAdmin = async (req, res) => {
  try {
    const { id } = req.query;
    const admin = await userModel.findById(id);
    if (!admin) return res.status(404).json({ message: "Admin Not Found" });
    if (req.file && admin.profile) {
      const oldPath = path.join(__dirname, "../", admin.profile);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    if (req.file) req.body.profile = `/uploads/${req.file.filename}`;
    const updated = await userModel.findByIdAndUpdate(id, req.body, { new: true }).select("-password");
    return res.status(200).json({ message: "Admin Updated", data: updated });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.query;
    if (req.user._id.toString() === id)
      return res.status(400).json({ message: "Cannot delete own account" });

    const admin = await userModel.findById(id);
    if (!admin) return res.status(404).json({ message: "Admin Not Found" });
    if (admin.isDelete) return res.status(400).json({ message: "Admin Already Deleted" });

    await userModel.findByIdAndUpdate(id, { isDelete: true });
    return res.status(200).json({ message: "Admin Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.allAdmin = async (req, res) => {
  try {
    const admins = await userModel.find({ role: "Admin", isDelete: false }).select("-password");
    return res.status(200).json({ message: "All Admins", data: admins });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.addManager = async (req, res) => {
  try {
    const exist = await userModel.findOne({ email: req.body.email });
    if (exist) return res.status(400).json({ message: "Manager Already Exist" });

    if (req.file) req.body.profile = `/uploads/${req.file.filename}`;
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.role = "Manager";

    await userModel.create(req.body);
    return res.status(200).json({ message: "Manager Added Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.allManager = async (req, res) => {
  try {
    const managers = await userModel.find({ role: "Manager", isDelete: false }).select("-password");
    return res.status(200).json({ message: "All Managers", data: managers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.editManager = async (req, res) => {
  try {
    const { id } = req.query;
    const manager = await userModel.findById(id);
    if (!manager) return res.status(404).json({ message: "Manager Not Found" });

    if (req.file && manager.profile) {
      const oldPath = path.join(__dirname, "../", manager.profile);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    if (req.file) req.body.profile = `/uploads/${req.file.filename}`;

    const updated = await userModel.findByIdAndUpdate(id, req.body, { new: true }).select("-password");
    return res.status(200).json({ message: "Manager Updated", data: updated });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.deleteManager = async (req, res) => {
  try {
    const { id } = req.query;
    const manager = await userModel.findById(id);
    if (!manager) return res.status(404).json({ message: "Manager Not Found" });
    if (manager.isDelete) return res.status(400).json({ message: "Manager Already Deleted" });

    await userModel.findByIdAndUpdate(id, { isDelete: true });
    return res.status(200).json({ message: "Manager Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.addEmployee = async (req, res) => {
  try {
    const exist = await userModel.findOne({ email: req.body.email });
    if (exist) return res.status(400).json({ message: "Employee Already Exist" });

    if (req.file) req.body.profile = `/uploads/${req.file.filename}`;
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.role = "Employee";
    await userModel.create(req.body);
    return res.status(200).json({ message: "Employee Added Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.allEmployee = async (req, res) => {
  try {
    const employees = await userModel.find({ role: "Employee", isDelete: false }).select("-password");
    return res.status(200).json({ message: "All Employees", data: employees });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.editEmployee = async (req, res) => {
  try {
    const { id } = req.query;
    const employee = await userModel.findById(id);
    if (!employee) return res.status(404).json({ message: "Employee Not Found" });

    if (req.file && employee.profile) {
      const oldPath = path.join(__dirname, "../", employee.profile);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    if (req.file) req.body.profile = `/uploads/${req.file.filename}`;

    const updated = await userModel.findByIdAndUpdate(id, req.body, { new: true }).select("-password");
    return res.status(200).json({ message: "Employee Updated", data: updated });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.query;
    const employee = await userModel.findById(id);
    if (!employee) return res.status(404).json({ message: "Employee Not Found" });
    if (employee.isDelete) return res.status(400).json({ message: "Employee Already Deleted" });

    await userModel.findByIdAndUpdate(id, { isDelete: true });
    return res.status(200).json({ message: "Employee Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
