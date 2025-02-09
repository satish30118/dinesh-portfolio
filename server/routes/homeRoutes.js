import express from "express";
import HomeModel from "../models/Home.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

// Get Home Data
router.get("/", async (req, res) => {
  try {
    const home = await HomeModel.findOne();
    if (!home) return res.status(404).json({ message: "Home data not found" });
    res.json(home);
  } catch (error) {
    res.status(500).json({ message: "Error fetching home data" });
  }
});

// Update Home Data (Protected)
router.put("/", verifyToken, async (req, res) => {
  try {
    let home = await HomeModel.findOne();
    if (!home) {
      home = new HomeModel(req.body);
    } else {
      home.image = req.body.image;
      home.about = req.body.about;
    }
    await home.save();
    res.json({ message: "Home updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating home data" });
  }
});

export default router;
