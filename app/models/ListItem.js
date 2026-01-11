import mongoose from "mongoose";

const listItemSchema = new mongoose.Schema({
  listItem: {
    type: String,
    required: true,
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ListName",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.models.ListItem ||
  mongoose.model("ListItem", listItemSchema);
