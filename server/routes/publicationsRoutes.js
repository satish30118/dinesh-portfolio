import express from "express";
import PublicationsModel from "../models/Publications.js";
import verifyToken from "../middleware/authMiddleware.js"; // Middleware to protect routes

const router = express.Router();

// Get All Publications
router.get("/", async (req, res) => {
  try {
    const publications = await PublicationsModel.find();
    res.json(publications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching publications" });
  }
});

// Add New Publication (Protected)
router.post("/", verifyToken, async (req, res) => {
  try {
    const newPublication = new PublicationsModel(req.body);
    await newPublication.save();
    res.json({ message: "Publication Added Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding publication" });
  }
});

// Update Publication (Protected)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    await PublicationsModel.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Publication Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating publication" });
  }
});

// Delete Publication (Protected)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await PublicationsModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Publication Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting publication" });
  }
});

export default router;
