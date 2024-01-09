import mongoose from "mongoose";
import { Schema } from "mongoose";

const OrderSchema= new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    sub_total:{
        type:Number,
        default:1,
        require:true,
    },
    phoneNumber:{
        type:String,
        require:true,
    }
},{timestamps:true})

export const Order=mongoose.model("order",OrderSchema)