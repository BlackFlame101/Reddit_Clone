import express from 'express'
import { PORT, mongoDBURL } from './config.js'
import mongoose from 'mongoose'
import postRoutes from '../routes/postRoutes.js'
import userRoutes from '../routes/userRoutes.js'
import commentRoutes from '../routes/commentRoutes.js'

const app = express();

app.use(express.json());
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/comment", commentRoutes);

mongoose.connect(mongoDBURL)
    .then(() => {
        try {
            app.listen(PORT, () => {
                console.log('Connected to database!');
                console.log(`App listening to port: ${PORT}`);
            })
        } catch (error) {
            console.log(error);
            res.send({ message: error.message });
        }
    })

app.get('/', (req, res) => {
    res.send('Hello!');
})
