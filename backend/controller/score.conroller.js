import Score from "../models/score.model.js";
import User from "../models/user.model.js";

export const addScore = async (req, res) => {

    try {
        const { token, difficulty, scoreValue } = req.body;

        const user = await User.findOne({ token });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newScore = new Score({
            userId : user._id,
            difficulty,
            score: scoreValue,
        });
        await newScore.save();
        res.status(201).json({ message: "Score added successfully", score: newScore });
    } catch (error) {
        res.status(500).json({ message: "Error adding score", error: error.message });
    }
};


export const getScores = async (req, res) => {
    try {
        const {token} = req.body;

        const user = await User.findOne({ token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const scores = await Score.find({ userId: user._id });
        res.status(200).json({ scores });

    } catch (error) {
        res.status(500).json({ message: "Error fetching scores", error: error.message });
    }
};