import express from "express";
import AcademicsModel from "../models/Academics.js";
import verifyToken from "../middleware/authMiddleware.js"; // Middleware to protect routes

const router = express.Router();

// Get All Academic Records
router.get("/", async (req, res) => {
  try {
    const academics = await AcademicsModel.find();
    res.json(academics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching academic records" });
  }
});

// Add New Academic Record (Protected)
router.post("/", verifyToken, async (req, res) => {
  try {
    const newRecord = new AcademicsModel(req.body);
    await newRecord.save();
    res.json({ message: "Academic Record Added Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding academic record" });
  }
});

// Update Academic Record (Protected)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    await AcademicsModel.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Academic Record Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating academic record" });
  }
});

// Delete Academic Record (Protected)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await AcademicsModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Academic Record Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting academic record" });
  }
});

export default router;
