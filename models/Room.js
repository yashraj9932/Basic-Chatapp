const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  users: {
    type: [mongoose.Schema.ObjectId],
    ref: "User",
  },
  messages: [
    {
      from: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      text: {
        type: String,
        default: "",
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("Room", RoomSchema);
