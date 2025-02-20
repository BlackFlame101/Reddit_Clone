import { Router } from "express";
import Post from '../models/Post.js'
import mongoose from "mongoose";

const router = Router();

// get posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({});

        if (posts.length == 0) return res.status(400).send({ message: "No post found!" });

        return res.status(200).send({ count: posts.length, data: posts });
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
})

// get one post
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: "Invalid ID!"});

        const post = await Post.findById(id);

        if (!post) return res.status(404).send({ message: "No post found with this ID!" });

        return res.status(200).send({ data: post });
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
})

// create post
router.post('/create', async (req, res) => {
    try {
        if (!req.body.image_path || !req.body.title || !req.body.content) {
            return res.status(400).send({ message: "All fields are required!" });
        }

        const user_id = 1;
        const post = {
            image_path: req.body.image_path,
            title: req.body.title,
            content: req.body.content,
            user_id: user_id
        }

        await Post.create(post);

        return res.status(200).send({ message: "Post created successfully!" });
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
})

// update post
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: "Invalid ID!"});

        if (!req.body.image_path || !req.body.title || !req.body.content) {
            return res.status(400).send({ message: "All fields are required!" });
        }

        const data = {
            image_path: req.body.image_path,
            title: req.body.title,
            content: req.body.content
        };
        const post = await Post.findByIdAndUpdate(id, data);

        if (!post) return res.status(404).send({ message: "No post found with this ID!" });

        return res.status(200).send({ message: "Post updated successfully!" });
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
})

// delete post
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: "Invalid ID!"});

        const post = await Post.findByIdAndDelete(id);

        if (!post) return res.status(400).send({ message: "No post found with this id!" });
        
        return res.status(200).send({ message: "Post deleted successfully!" });
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
})

export default router;