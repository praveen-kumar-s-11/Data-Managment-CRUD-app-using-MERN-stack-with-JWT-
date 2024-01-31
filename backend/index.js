import mongoose  from "mongoose";
import express from "express";
import dotenv from 'dotenv';
import authRoutes  from './routes/auth.js'; 
import userRoute from "./routes/user.js"
import protectedRoutes from './routes/protected.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import verifyToken from './middleware/auth.js';

const app=express();

dotenv.config();


app.use(cors({
    origin: ['https://deploy'],
    methods:["POST","GET"],
    credentials: true
}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});


app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/userroute',verifyToken,userRoute);    


app.use('/protected', protectedRoutes);
app.get("/",(req,res)=>{
    res.json("HELLO")
})




const connect=async() =>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongodb")
    } catch(error){
        throw error;
    }
    };
    
    mongoose.connection.on("disconnected", ()=>{
        console.log("Mongodb disconnected")
    }
)




app.listen(8800,async ()=>{
    try {
        await connect();
        console.log(`Server started on port 8800`);
    } catch (error) {
        console.error("Error starting server:", error);
    }
});
