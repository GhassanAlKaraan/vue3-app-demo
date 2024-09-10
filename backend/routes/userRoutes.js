import express from "express";
const router = express.Router();
import {
  login,
  registerUser,
  getUser,
  logout,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/register").post(registerUser);
router.route("/profile").get(protect, getUser);

export default router;
