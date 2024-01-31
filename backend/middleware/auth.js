// middleware/auth.js

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized token not there' });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return next((403, "Token is not valid!"));
            req.user = user;
            next();
          });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized other eror' });
    }
};

export default verifyToken;
