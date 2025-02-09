import mongoose from "mongoose";

const achievementsSchema = new mongoose.Schema({
  title: { type: String, required: true }
});

export default mongoose.model("Achievements", achievementsSchema);
