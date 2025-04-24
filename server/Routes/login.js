import jwt from "jsonwebtoken"
import express, { Router } from "express";
import Biometric from "../models/registration.js";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const router = Router()
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(cors())
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = await Biometric.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // const token =jwt.sign({id: user._id},process.env.JWT_SECRET)
        // ✅ Check secret
        if (!process.env.JWT_SECRET) {
            console.log("JWT_SECRET is missing!");
            return res.status(500).json({ message: "JWT secret not configured" });
        }

        // ✅ Create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        console.log("Generated token:", token);


        const { password: pass, ...rest } = user._doc

        // res.status(200).json({ message: "Login successful", user });
        // res.cookie("access_token",token,{httpOnly:true}).status(200).json({message:"Login Successful",user});

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: false,          // true if using HTTPS
            sameSite: "Lax"         // "None" for cross-domain + secure true
        })
            .status(200)
            .json({ message: "Login Successful", rest });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);
export default router;