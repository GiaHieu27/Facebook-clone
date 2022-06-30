const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const codeSchema = mongoose.Schema({
  code: {
    type: String,
    require: true,
  },
  user: {
    type: ObjectId,
    ref: "User",
    require: true,
  },
});

module.exports = mongoose.model("Code", codeSchema);
