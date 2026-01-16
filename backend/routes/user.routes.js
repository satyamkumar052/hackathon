import { Router } from "express";
import User from "../models/user.model.js";
import { login, register } from "../controller/user.contoller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;