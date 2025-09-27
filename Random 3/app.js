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
app.post('/shortener', async(req, res)=>{
    const {longUrl} = req.body
    const baseUrl = `http://localhost:${process.env.PORT}`

    try{
        let url = await Url.findone({longUrl})
        if(url){
            res.json(url)
        }else {
            const urlCode = shortid.generate()
            const shortUrl = `${baseUrl}/${urlCode}`
            url = new url ({
                longUrl,
                shortUrl,
                urlCode,
                date: new Date()
            })
            await url.save()
            res.json(url)
        }
    }catch(err){
        console.error(err)
        res.status(500).json('Server error')
    }
})