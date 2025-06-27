import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
});

export default mongoose.models.Item || mongoose.model("Item", ItemSchema);
