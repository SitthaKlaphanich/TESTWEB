// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Team = require('./teamModel');
const Gallery = require('./galleryModel');
const Clients = require('./clientsModel');

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

// เพิ่ม endpoint สำหรับดึงข้อมูล gallery
app.get('/api/gallery', async (req, res) => {
  try {
    const galleryItems = await Gallery.find(); // แทนที่ Gallery ด้วยชื่อโมเดลของคุณ
    res.json(galleryItems);
  } catch (error) {
    res.status(500).send('Error fetching gallery data');
  }
});

app.get("/api/client", async (req, res) => {
  try {
    const clientpeople = await Clients.find();
    res.json(clientpeople);
  } catch (err) {
    res.status(500).json( 'Error fetching gallery data' );
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
