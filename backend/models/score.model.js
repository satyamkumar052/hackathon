import mongoose from "mongoose";


const levelSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        required: true
    },
    score: {
        type: Number,
        required: true
    }
});

const Score = mongoose.model("Score", levelSchema);

export default Score;
