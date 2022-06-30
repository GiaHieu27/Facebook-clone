const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const reactSchema = mongoose.Schema({
  react: {
    type: String,
    enum: ["like", "love", "haha", "wow", "sad", "angry"],
    require: true,
  },
  postRef: {
    type: ObjectId,
    ref: "Post",
  },
  reactBy: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("React", reactSchema);
