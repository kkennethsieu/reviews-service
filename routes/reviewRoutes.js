import express from "express";
import {
    serverStatus,
    getReviewsByGame,
    getReviewsByUser,
    createReview,
    deleteReview,
    } from "../controllers/reviewController.js";

const router = express.Router();

router.get("/", serverStatus);

router.get("/:gameId", getReviewsByGame);

router.get("/:userId", getReviewsByUser);

router.post("/create", createReview);

router.post("/delete/:reviewId", deleteReview)

export default router;