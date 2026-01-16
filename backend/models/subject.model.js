import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswerIndex: Number
});

const levelSchema = new mongoose.Schema({
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"]
  },
  questions: [questionSchema]
});

const chapterSchema = new mongoose.Schema({
  chapterName: String,
  levels: [levelSchema]
});

const subjectSchema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true,
      unique: true
    },
    chapters: [chapterSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Subject", subjectSchema);
