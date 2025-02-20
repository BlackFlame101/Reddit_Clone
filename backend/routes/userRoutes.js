import { Router } from "express";
import User from "../models/User.js";
import mongoose from "mongoose";

const router = Router();

// get users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});

        if (users.length == 0) return res.status(400).send({ message: "No user found!" });

        return res.status(200).send({ count: users.length, data: users });
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
})

// get one user
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: "Invalid ID!"});

        const user = await User.findById(id);

        if (!user) return res.status(404).send({ message: "No user found with this ID!" });

        return res.status(200).send({ data: user });
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
})

// create user
router.post('/create', async (req, res) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).send({ message: "All fields are required!" });
        }

        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            image: req.body.image
        }

        await User.create(user);

        return res.status(200).send({ message: "User created successfully!" });
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
})

// update user
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: "Invalid ID!"});

        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).send({ message: "All fields are required!" });
        }

        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            image: req.body.image
        }
        const user = await User.findByIdAndUpdate(id, data);

        if (!user) return res.status(404).send({ message: "No user found with this ID!" });

        return res.status(200).send({ message: "User updated successfully!" });
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
})

// delete user
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: "Invalid ID!"});

        const user = await User.findByIdAndDelete(id);

        if (!user) return res.status(400).send({ message: "No user found with this id!" });
        
        return res.status(200).send({ message: "User deleted successfully!" });
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
})

export default router;