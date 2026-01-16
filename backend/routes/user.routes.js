import { Router } from "express";
import User from "../models/user.model.js";
import { ask_gemini, login, register, uploadProfilePicture } from "../controller/user.contoller.js";
import multer from "multer";


const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

router.post("/update_profile_picture", upload.single('profile_picture'), uploadProfilePicture);
router.post("/register", register);
router.post("/login", login);
router.get("/ask_gemini", ask_gemini);

export default router;
