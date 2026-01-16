import mongoose from "mongoose";
import dotenv from "dotenv";
import Subject from "../models/subject.model.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URL);

await Subject.create({
  subjectName: "Science",
  chapters: [
    {
      chapterName: "Work and Energy",
      levels: [
        {
          difficulty: "easy",
          questions: [
            { question: "What is the SI unit of work?", options: ["Watt", "Newton", "Joule", "Erg"], correctAnswerIndex: 2 },
            { question: "What is the SI unit of power?", options: ["Joule", "Watt", "Newton-meter", "Horsepower"], correctAnswerIndex: 1 }
          ]
        },
        {
          difficulty: "medium",
          questions: [
            { question: "How much work is done by gravity on a moving satellite?", options: ["Positive", "Negative", "Zero", "Infinite"], correctAnswerIndex: 2 }
          ]
        },
        {
          difficulty: "hard",
          questions: [
            { question: "What is the kinetic energy of a 250g object moving at 2m/s?", options: ["1 J", "0.5 J", "2 J", "0.25 J"], correctAnswerIndex: 1 }
          ]
        }
      ]
    }
  ]
});

console.log("Science → Work & Energy inserted");
process.exit();
