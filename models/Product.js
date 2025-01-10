
const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    img: { type: String, required: true },
    originalPrice: { type: String, required: true },
    sellingPrice: { type: String, required: true },
    category: { type: String, required: true },
    size: { type: Array, default: [] },
    sleeve: { type: Array, default: [] },
  },
  { timestamps: true }
);


 module.exports = mongoose.model("Products", ProductSchema);