import express, { Router } from "express";
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
// This is for storing the title content and tags in mongodb

router.post("/modal", verifyToken, async (req, res, next) => {
    const { title, content, tags } = req.body;

    const { id } = req.user;
    // const userId = req.user.id;

    if (!title) {
        return next(errorHandler(400, "Title is required"))
    }
    if (!content) {
        return next(errorHandler(400, "Content is required"))
    }

    try {
        const newNote = new AddModal({
            title,
            content,
            tags: tags || [], // Initialize with an empty array or set it to null if you want
            date: new Date(),
            isPinned: false,
            userId: id,
        });
        console.log(newNote)

        await newNote.save();
        res.status(201).json({ success: "true", message: "Note created successfully", note: newNote });
    }
    catch (error) {
        console.error("Error creating note:", error);
        next(error); // Pass errors to your error handler
    }

}
);

// This is used for edit notes

router.post("/edit/:noteId", verifyToken, async (req, res, next) => {

    const note = await AddModal.findById(req.params.noteId)
    console.log("NoteId is :",req.params.noteId); 
    if (!note) {
        return next(errorHandler(404, "Notes not found"))
    }
    console.log(req.params.noteId)
    console.log(note.id)
    if (req.params.noteId!== note.id) {
        return next(errorHandler(401, "You can only update Your own note!"))
    }

    const { title, content, tags, isPinned } = req.body
    if (!title && !content && (!tags || tags.length === 0)) {
        return next(errorHandler(404, "No changes provided"))
    }
    try {
        if (title) {
            note.title = title
        }
        if (content) {
            note.content = content
        }
        if (tags) {
            note.tags = tags
        }
        if (isPinned) {
            note.isPinned = isPinned
        }
        await note.save()
        res.status(200).json({
            success: "true",
            message: "Note updated successfully",
            note
        })

    } catch (error) {
        next(error)
    }

})

router.get("/all",verifyToken, async(req,res,next)=>{
    const userId =req.user.id 
    console.log(userId)
    try {
        const notes =await AddModal.find({userId:userId}).sort({isPinned:-1})
        console.log(notes)
        res.status(200).json({
            success:"true",
            message:"All notes retrived successfully",
            notes,
        })
    } catch (error) {
        next(Error);
    }

})


export default router;
