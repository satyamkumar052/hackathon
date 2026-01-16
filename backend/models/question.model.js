import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true,
    validate: v => v.length === 4
  },
  correctAnswerIndex: {
    type: Number,
    required: true,
    min: 0,
    max: 3
  }
});

export default mongoose.model("Question", questionSchema);
