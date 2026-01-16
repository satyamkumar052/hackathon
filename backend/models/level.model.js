import mongoose from "mongoose";


const levelSchema = new mongoose.Schema({
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question"
  }]
});

export default mongoose.model("Level", levelSchema);
