const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  product_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  size: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  ic_rent_mrp: {
    type: Number,
    required: true,
  },
  quantity_available: {
    type: Number,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
