import mongoose from "mongoose";

export const connectDB=async ()=>{
    try {
        const MONGO_URI=process.env.MONGO_URI
        const instance= await mongoose.connect(MONGO_URI)
        console.log(`MongDB Connected: ${instance.connection.host}`)
        
    } catch (error) {
        console.log("Cannot connect to database", error)
    }
}