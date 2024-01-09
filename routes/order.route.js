import { Router } from "express";
import { Order } from "../models/order.model.js";
import { fetchuser } from "../middleware/fetchuser.js";

const router=Router();

router.post("/add-order",fetchuser,async(req,res)=>{
    const {sub_total,phoneNumber}=req.body;
    if(phoneNumber.trim()===""){
        res.status(400).json({
            message:"Field cannot be empty"
        })
    }
    const order=await Order.create({
        userId:req.user.id,
        phoneNumber,
        sub_total,
    })
    res.status(200).json({
        data:order,
        message:"Order added Successfully"
    })

});
router.get("/get-order",fetchuser,async(req,res)=>{
    const orders=await Order.find({userId:req.user.id});
    res.json(orders);
});


export default router;