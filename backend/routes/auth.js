
import express from "express"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import dotenv from 'dotenv';


const router = express.Router();

dotenv.config();



// Register route
router.post('/register', async (req, res) => {
  
try {
  const { username, password } = req.body;
  
  const existingUser = await User.findOne({ username });
  if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  
  res.status(201).send("User has been created.");
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
}
});

// Login route
router.post('/login', async (req, res) => {
  try {
    
console.log('Request received for login:', req.body);



    const { username, password } = req.body;
  
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ users: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ token  });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
}
});

export default router;

