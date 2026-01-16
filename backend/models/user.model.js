import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true 
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    token: {
        type: String,
        default: ""
    },
    totalPoints: {
        type: Number,
        default: 0
    }
});
const User = mongoose.model("User", userSchema);

export default User;