import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    image_path: String,
    title: String,
    content: String,
    user_id: Number
});

const Post = mongoose.model('Post', postSchema);

export default Post;