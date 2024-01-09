import { Router } from "express";
import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router=Router();
const JWT_SECRET="danish";

router.post("/add-user",async(req,res)=>{
    const {name,phoneNumber,password}=req.body;
    if([name,phoneNumber,password].some((field)=>field?.trim()==="")){
        res.status(400).json({
            message:"Field cannot be empty"
        })
    }
    const checkUser=await User.findOne({phoneNumber:phoneNumber});
    if(checkUser){
        res.status(300).json({
            message:"User Already Exist"
        })
    }
    const user=await User.create({
        name:name,
        phoneNumber:phoneNumber,
        password:password
    })
    res.status(200).json({
        data:user,
        message:"User added Successfully"
    })

});

router.post('/login-user',async (req, res) => {
        const { phoneNumber, password } = req.body;
        try {
            let user = await User.findOne({ phoneNumber:phoneNumber});
            if (!user) {
                return res.status(400).json({ error: "Incorrect Credebtials" });
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({success, error: "Incorrect Credebtials" });
            }
            const data = {
                user: {
                    id: user._id,
                }
            }
            const token = jwt.sign(data, JWT_SECRET);
            res.status(200).json({ token });
        }
        catch {
            res.status(500).send("Internal Server Error");
        }
    })

export default router;