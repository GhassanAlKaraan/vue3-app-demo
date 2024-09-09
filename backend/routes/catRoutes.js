import express from "express";
const router = express.Router();
import {
    getCats,
    getCat,
    addCat,
    updateCat,
    deleteCat,
} from "../controllers/catController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getCats).post(protect, addCat);
router.route("/:id").put(protect, updateCat).get(protect, getCat).delete(protect, deleteCat);

export default router;
