import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from 'bcrypt'

const UserSchema= new Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
    },
    phoneNumber:{
        type:String,
        require:true,
        unique:true,
    }
},{timestamps:true})

UserSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
})

export const User=mongoose.model("user",UserSchema);