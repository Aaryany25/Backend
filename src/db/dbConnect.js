import  dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()
// MongoDB Connection Logic
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MongoDb_URI);
        // console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log("MongoDb connected")
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};
export default connectDB

