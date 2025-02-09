import mongoose from "mongoose";

const conferencesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

export default mongoose.model("Conferences", conferencesSchema);
