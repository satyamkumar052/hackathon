import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import callGemini from "../utils/gemini.js";


export const register = async (req, res) => {
    try {

        const {email, password, username } = req.body;

        if (!email || !password || !username) return res.status(400).json({ message: "All fields are required" });

        if(password.length < 6) return res.status(400).json({message: "Password must be at least 6 characters long"});
        
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({message: "User already exists"});

        const hashedPassword = await bcrypt.hash (password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            username
        });
        
        await newUser.save();


        res.json({message : "User registered succesfully"});

    } catch (err) {

        return res.status(500).json({ message: err.message });

    }
};


export const login = async (req, res) =>{
    try {

        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "All fields are required" });

        if(password.length < 6) return res.status(400).json({message: "Password must be at least 6 characters long"});

        const user = await User.findOne({ email });
        
        if (!user) return res.status(404).json({message: "User does not exists"});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: "Invalid Credentials"});

        const token = crypto.randomBytes(32).toString("hex");

        await User.updateOne({ _id : user._id}, { token });

        res.json({token : token});


    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


export const uploadProfilePicture = async (req, res) => {
    try {
        const {token} = req.body;
    
        const user = await User.findOne({token: token });
        if(!user) return res.status(404).json({message: "User not found"});

        user.profilePicture = req.file.filename;

        await user.save();

        res.json({message: "Profile Picture Updated"});

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const ask_gemini = async (req, res) => {
    try {

        const { token, question } = req.body;

        const user = await User.findOne({ token: token });

        if (!user) return res.status(404).json({ message: "User not found" });

        console.log("Gemini Answer 1");
        const answer =  await callGemini(question);
        console.log("Gemini Answer: ", answer);
        res.json({ answer: answer });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }   
};