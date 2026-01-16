import { Router } from "express";
import { addScore, getScores } from "../controller/score.conroller.js";

const router = Router();

router.post("/add_score", addScore);
router.get("/all_scores", getScores);

export default router;
