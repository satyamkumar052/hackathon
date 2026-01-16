import mongoose from "mongoose";


const chapterSchema = new mongoose.Schema({
  chapterName: {
    type: String,
    required: true
  },
  levels: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Level"
  }]
});

export default mongoose.model("Chapter", chapterSchema);
