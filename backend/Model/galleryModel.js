// galleryModel.js
const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  largeImage: { type: String, required: true, unique: true },
  smallImage: { type: String, required: true, unique: true},
});

module.exports = mongoose.model('Gallery', gallerySchema);