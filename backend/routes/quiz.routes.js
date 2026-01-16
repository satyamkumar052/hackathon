import express from "express";

const router = express.Router();

/**
 * GET /quiz/:subject/:chapter
 * Example: /quiz/Science/Work%20and%20Energy
 */
router.get("/quiz/:subject/:chapter", async (req, res) => {
  try {
    const { subject, chapter } = req.params;

    const data = await Subject.findOne(
      { subjectName: subject, "chapters.chapterName": chapter },
      { "chapters.$": 1 }
    );

    if (!data) {
      return res.status(404).json({ message: "Subject or chapter not found" });
    }

    const levels = data.chapters[0].levels;

    const response = {
      easy: levels.find(l => l.difficulty === "easy")?.questions || [],
      medium: levels.find(l => l.difficulty === "medium")?.questions || [],
      hard: levels.find(l => l.difficulty === "hard")?.questions || []
    };

    res.json(response);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
