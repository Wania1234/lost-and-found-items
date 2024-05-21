const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
