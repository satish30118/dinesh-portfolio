import express from "express";
import AchievementsModel from "../models/Achievements.js";
import verifyToken from "../middleware/authMiddleware.js"; // Middleware to protect routes

const router = express.Router();

// Get All Achievements
router.get("/", async (req, res) => {
  try {
    const achievements = await AchievementsModel.find();
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: "Error fetching achievements" });
  }
});

// Add New Achievement (Protected)
router.post("/",verifyToken, async (req, res) => {
  try {
    const newAchievement = new AchievementsModel(req.body);
    await newAchievement.save();
    res.json({ message: "Achievement Added Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding achievement" });
  }
});

// Update Achievement (Protected)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    await AchievementsModel.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Achievement Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating achievement" });
  }
});

// Delete Achievement (Protected)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await AchievementsModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Achievement Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting achievement" });
  }
});

export default router;
