import express from "express";
import connectDB from "./db/dbConnect.js";

const app = express()
connectDB()
.then(()=>{
    app.listen(3000,()=>{
    console.log("Server is Started")
})
})
.catch((error)=>{
    console.log("MongoDb connection Failed !!!".error)
});
app.get("/",(req,res)=>{
res.json({
    message:"server toh chal rha hai bhai "
})
})
app.get("/twiiter",(req,res)=>{
    res.send({
        message:"Main bhi chal rha hu "
    })
})
