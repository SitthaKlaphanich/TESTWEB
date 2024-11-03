const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
  _id: { type: Number }, // ปรับให้เป็น Number
  name: { type: String, required: true },  
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// ใช้ AutoIncrement เพื่อสร้าง _id อัตโนมัติ
userSchema.plugin(AutoIncrement, { id: 'user_seq', inc_field: '_id' });

module.exports = mongoose.model('User', userSchema);