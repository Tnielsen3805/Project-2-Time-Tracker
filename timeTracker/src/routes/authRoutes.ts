import { Router } from "express";
import {   login, register, updateEmail, updatePassword } from "../controller/authController.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";


const router = Router();
router.post("/register", register);
router.post("/login", login);
// router.post("/logout", logout);
router.put("/update-email", authMiddleware, updateEmail);
router.put("/update-password", authMiddleware, updatePassword);
export default router;