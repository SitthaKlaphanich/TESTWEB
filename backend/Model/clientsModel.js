const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    text: { type: String, required: true },
    img: { type: String, required: true}
});

module.exports = mongoose.model('client', clientSchema);