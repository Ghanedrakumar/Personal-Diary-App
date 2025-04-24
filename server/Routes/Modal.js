import express ,{ Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import AddModal from "../models/AddModal.js";
import { verifyToken } from "../utils/verifyUser.js";
import { errorHandler } from "../utils/error.js";
const router = Router()
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
// router.use(cors())
router.use(cors({
    origin: "http://localhost:5173", // adjust to your frontend URL
    credentials: true, // 🔑 This allows cookies
  }));
  

router.use(cookieParser()); 
router.post("/modal", async (req, res,next) => {
    const { title, content,tags} = req.body;
    
    // const {id} =req.user;
    if(!title){
        return next(errorHandler(400 , "Title is required"))
    }
    if(!content){
        return next(errorHandler(400 , "Content is required"))
    }

    try {
        const newNote = new AddModal({
            title,
            content,
            tags: tags||[], // Initialize with an empty array or set it to null if you want
            date: new Date(),
            isPinned: false,
            // UserId:id,
        });
        console.log(newNote)

        await newNote.save();
        res.status(201).json({ message: "Note created successfully", note: newNote });
    }
    catch (error) {
        console.error("Error creating note:", error);
        next(error); // Pass errors to your error handler
    }

}
);


export default router;