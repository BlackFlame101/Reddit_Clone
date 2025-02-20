import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    content: String,
    user_id: Number,
    post_id: Number
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;