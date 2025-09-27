import express from "express";
import mongoose from "mongoose";
import shortid from "shortid";
import dotenv from "dotenv";

import Url from "./models/url.js";

dotenv.config();

const app = express()

app.use(express.json)

const connectdb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB Connected');
        
    }catch(err){
        console.error(err.message)
    }
}

connectdb()