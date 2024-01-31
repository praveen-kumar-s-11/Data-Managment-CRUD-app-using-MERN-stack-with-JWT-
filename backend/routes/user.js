import express from "express";
import userdata from "../models/Userdata.js"; 

const router = express.Router();

router.post('/users', async (req, res) => {
    try {
        const { data } = req.body; 
        const newUser = new userdata({ userdata: data }); 
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.get('/users', async (req, res) => {
    try {
        const users = await userdata.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
