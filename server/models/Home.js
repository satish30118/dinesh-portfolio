import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
  image: { type: String, required: true },
  about: { type: String, required: true },
});

export default mongoose.model("Home", homeSchema);
