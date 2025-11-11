import express from "express";
import {
    serverStatus,
    getReview,
    createReview,
    updateReview,
    deleteReview,
    getScore} from "../controllers/reviewController.js";

const router = express.Router();

router.get("/", serverStatus);

export default router;