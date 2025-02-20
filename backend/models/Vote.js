import mongoose from "mongoose";

const voteSchema = {
    type: {
        String,
    },
    user_id: {
        Number,
        require
    },
    post_id: {
        Number,
        require
    }
}

const Vote = mongoose.model('Vote', voteSchema);

export default Vote;