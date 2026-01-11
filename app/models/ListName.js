import mongoose from "mongoose";

const listNameSchema = new mongoose.Schema({
  listName: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.models.ListName ||
  mongoose.model("ListName", listNameSchema);
