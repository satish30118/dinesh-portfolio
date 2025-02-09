import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminModel from "../models/Admin.js";
import AchievementModel from "../models/Achievements.js";
import PublicationModel from "../models/Publications.js";
import ConferenceModel from "../models/Conferences.js";
import GalleryModel from "../models/Gallery.js";

import verifyToken from "../middleware/authMiddleware.js";
import AcademicsModel from "../models/Academics.js";

const router = express.Router();


// // **POST: Create Admin (One-time setup)**
// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const existingAdmin = await AdminModel.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({ message: "Admin already exists!" });
//     }

//     // **Create New Admin**
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newAdmin = new AdminModel({ name, email, password: hashedPassword });
//     await newAdmin.save();

//     res.status(201).json({ message: "Admin created successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error: Could not create admin." });
//   }
// });



// Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await AdminModel.findOne({ email });

  if (!admin) return res.status(401).json({ message: "Invalid Credentials" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid Credentials" });

  // **Generate Access & Refresh Tokens**
  const accessToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id: admin._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
  // **Set Refresh Token in HTTP-Only Cookie**
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.json({ accessToken });
});


// **2️⃣ REFRESH TOKEN API (Generate New Access Token)**
router.post("/refresh-token", (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.status(403).json({ message: "No refresh token provided" });

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid Refresh Token" });

    const newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    res.json({ accessToken: newAccessToken });
  });
});

// **3️⃣ LOGOUT API (Clear Refresh Token)**
router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully!" });
});



// Protected Route Verification
router.get("/dashboard", verifyToken, (req, res) => {
  res.json({ isAdmin: true });
});

// Get Admin Profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const admin = await AdminModel.findById(req.user.id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// Update Admin Profile
router.put("/profile", verifyToken, async (req, res) => {
  try {
    const { name } = req.body;
    await AdminModel.findByIdAndUpdate(req.user.id, { name });
    res.json({ message: "Profile updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
});

// Change Admin Password
router.put("/change-password", verifyToken, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const admin = await AdminModel.findById(req.user.id);

    // Check if old password is correct
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

    // Hash new password and update
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();

    res.json({ message: "Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error changing password" });
  }
});


// Get Admin Dashboard Stats
router.get("/stats", verifyToken, async (req, res) => {
  try {
    const totalAcademics = await AcademicsModel.countDocuments();
    const totalAchievements = await AchievementModel.countDocuments();
    const totalPublications = await PublicationModel.countDocuments();
    const totalConferences = await ConferenceModel.countDocuments();
    const totalImages = await GalleryModel.countDocuments();

    res.json({
      totalAcademics,
      totalAchievements,
      totalPublications,
      totalConferences,
      totalImages,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
  }
});

export default router;

