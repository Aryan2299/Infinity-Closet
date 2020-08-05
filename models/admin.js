const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  adminUsername: {
    type: String,
    required: true,
  },
  adminFirstName: {
    type: String,
    required: true,
  },
  adminLastName: {
    type: String,
    required: true,
  },
  adminPassword: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Admin", adminSchema);
