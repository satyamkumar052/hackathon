import express from 'express';
const app = express();

import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserRouter from "./routes/user.routes.js";
import SeedRouter from "./routes/seed.routes.js";
import QuizRouter from "./routes/quiz.routes.js";
import ScoreRouter from "./routes/score.routes.js";


dotenv.config();


// middleware
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));
app.use(express.static("public"));


app.use("/", UserRouter);
app.use("/admin", SeedRouter);
app.use("/", QuizRouter);
app.use("/", ScoreRouter);




app.get("/", (req, res) => {
    res.send("API is running...");
});


const start = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected!'));
};

app.listen(8080, () => {
    console.log("Server running on 8080");
    start();
});

