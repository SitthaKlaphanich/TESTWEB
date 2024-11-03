// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./userModel');
const Team = require('./teamModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// เชื่อมต่อกับ MongoDB
mongoose.connect(process.env.MONGODB_URI, {
})
.then(() => console.log('MongoDB connected'))
.then(() => console.log('You successfully connected to MongoDB'))
.catch(err => console.error(err));


// เพิ่มสมาชิกใหม่
app.post('/api/team', async (req, res) => {
  const { name, job, img } = req.body;
  const newTeamMember = new Team({ name, job, img });
  
  try {
    await newTeamMember.save();
    res.status(201).send('Team member added');
  } catch (error) {
    res.status(400).send('Error adding team member');
  }
});

// ดึงข้อมูลทีมทั้งหมด
app.get('/api/team', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).send('Error fetching team data');
  }
});

// ลงทะเบียนผู้ใช้
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();
  
  res.status(201).send('User registered');
});

// เข้าสู่ระบบผู้ใช้
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid credentials');
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid credentials');
  
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
