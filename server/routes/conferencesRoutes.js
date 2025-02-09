import express from "express";
import ConferencesModel from "../models/Conferences.js";
import verifyToken from "../middleware/authMiddleware.js"; // Middleware to protect routes

const router = express.Router();

// Get All Conferences
router.get("/", async (req, res) => {
  try {
    const conferences = await ConferencesModel.find();
    res.json(conferences);
  } catch (error) {
    res.status(500).json({ message: "Error fetching conferences" });
  }
});

// Add New Conference (Protected)
router.post("/", verifyToken, async (req, res) => {
  try {
    const newConference = new ConferencesModel(req.body);
    await newConference.save();
    res.json({ message: "Conference Added Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding conference" });
  }
});

// Update Conference (Protected)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    await ConferencesModel.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Conference Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating conference" });
  }
});

// Delete Conference (Protected)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await ConferencesModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Conference Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting conference" });
  }
});

export default router;
