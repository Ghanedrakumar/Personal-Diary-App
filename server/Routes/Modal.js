import express ,{ Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import AddModal from "../models/AddModal.js";
const router = Router()
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(cors())
router.post("/modal", async (req, res) => {
    const { title, content,tags} = req.body;
    console.log(req.body);
    try {
        const newNote = new AddModal({
            title: title,
            content:content,
            tags: tags||[], // Initialize with an empty array or set it to null if you want
            date: new Date(),
            isPinned: false,
            UserId:req.body.id,
        });
        console.log(newNote)

        await newNote.save();
        res.status(201).json({ message: "Note created successfully", note: newNote });
    }
    catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}
);
export default router;


