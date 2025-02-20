import { Router } from "express";
import Comment from "../models/Comment.js";
import mongoose from "mongoose";

const router = Router();

// get comment
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: "Invalid ID!"});

        const comment = await Comment.findById(id);

        if (!comment) return res.status(404).send({ message: "No comment found with this ID!" });

        return res.status(200).send({ data: comment });
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
})

// create comment
router.post('/create', async (req, res) => {
    try {
        if (!req.body.content || !req.body.post_id) {
            return res.status(400).send({ message: "All fields are required!" });
        }

        const user_id = 1;
        const comment = {
            content: req.body.content,
            user_id: user_id,
            post_id: req.body.post_id
        }

        await Comment.create(comment);

        return res.status(200).send({ message: "Comment created successfully!" });
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
})

// delete comment
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: "Invalid ID!"});

        const comment = await Comment.findByIdAndDelete(id);

        if (!comment) return res.status(400).send({ message: "No comment found with this id!" });
        
        return res.status(200).send({ message: "Comment deleted successfully!" });
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
})

export default router;