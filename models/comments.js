
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

var commentSchema = new Schema({
  rating:  {
      type: Number,
      min: 1,
      max: 5,
      required: true
  },
  comment:  {
      type: String,
      required: true
  },
  author:  {
      type: Schema.Types.ObjectId,
      ref: 'User'
  }
}, {
  timestamps: true
});


const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;