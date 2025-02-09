import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true }
});

export default mongoose.model("Gallery", gallerySchema);
