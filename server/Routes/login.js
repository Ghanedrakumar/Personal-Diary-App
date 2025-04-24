
import express ,{Router} from "express";
import Biometric from "../models/registration.js";
import bodyParser from "body-parser";
import cors from "cors";

const router =Router()
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
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);
export default router;