import connectDB from "./db/dbConnect.js";
import { app } from "./app.js";
connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
    console.log("Server is Started on ")
})
})
.catch((error)=>{
    console.log("MongoDb connection Failed !!!".error)
});
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"ok"
    })
})
