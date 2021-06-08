const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId }
} = Schema;

const commentSchema = new Schema({
  writer: {
    type: ObjectId,
    required: true,
    ref: "User"
  },
  postId: {
    type: ObjectId,
    required: true,
    ref: "Board"
  },
  responseTo: {
      type: ObjectId,
      ref: "User",
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;