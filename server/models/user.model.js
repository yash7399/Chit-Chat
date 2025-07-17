import mongoose from "mongoose"

// we will make schema or we can say structure of the collection

const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    gender: {
      type: String,
      required: true,
    },
    avatar:{
        type:String,
        required:true,
    }
},{
    timestamps:true
})

export const User=mongoose.model("User",userSchema) // this will create m collection


