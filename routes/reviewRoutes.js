import express from "express";
import {
    serverStatus,
    getReview,
    createReview,
    deleteReview,
    } from "../controllers/reviewController.js";

const router = express.Router();

router.get("/", serverStatus);

router.get("/:gameId", getReview);

router.post("/create", createReview);

router.get("/delete/:reviewId", deleteReview)

export default router;