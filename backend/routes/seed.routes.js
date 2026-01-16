import express from "express";
import Subject from "../models/subject.model.js";

const router = express.Router();

router.post("/seed/work-energy", async (req, res) => {
  await Subject.create(req.body);
  res.json({ message: "Inserted" });
});

export default router;
