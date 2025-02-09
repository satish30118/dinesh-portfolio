import mongoose from "mongoose";

const academicsSchema = new mongoose.Schema({
    degree: { type: String, required: true },
    timeline: { type: String, required: true },
    institute: { type: String, required: true },
    cgpa: { type: String, required: true }
});

export default mongoose.model("Academics", academicsSchema);
