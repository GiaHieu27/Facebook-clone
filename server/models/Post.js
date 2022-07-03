const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const postSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["profilePicture", "cover", null],
      default: null,
    },
    text: {
      type: String,
    },
    images: {
      type: Array,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    background: {
      type: String,
    },
    comments: [
      {
        comment: {
          type: String,
        },
        images: {
          type: String,
        },
        commentBy: {
          type: ObjectId,
          ref: "User",
        },
        commentAt: {
          type: Date,
          require: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
