import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
const app = express()

app.use(cors({
    origin:process.env.ORIGIN,
    Credential:true
}))
app.use(express.json({
    limit:"16kb"
}))
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())


// Import Routes 
// import UserRouter from "./routes/User.route.js"
import UserRouter from "./routes/User.route.js"

// routes declare 
app.use("/users",UserRouter)
app.post("/users",(req,res)=>{
    res.status(200).json({
        message:"its working till here "
    })
})
export {app}