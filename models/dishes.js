const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const dishSchema = new Schema({
  name: {
      type: String,
      required: true,
      unique: true
  },
  description: {
      type: String,
      required: true
  },
  image: {
      type: String,
      required: true
  },
  category: {
      type: String,
      required: true
  },
  label: {
      type: String,
      default: ''
  },
  price: {
      type: Number,
      required: true,
      min: 0
  },
  featured: {
      type: Boolean,
      default:false      
  },
  comments:[{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {
  timestamps: true
});


const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;