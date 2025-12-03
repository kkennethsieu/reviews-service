import express from "express";
import {
  serverStatus,
  getReviewsById,
  getReviewsByGame,
  getReviewsByUser,
  createReview,
  deleteReview,
  updateReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.get("/", serverStatus);
//get review by id
router.get("/review/:reviewId", getReviewsById);

//get review for a specific game
router.get("/game/:gameId", getReviewsByGame);

// get reviews for a certain user
router.get("/user/:userId", getReviewsByUser);

router.post("/create", createReview);

router.patch("/update/:reviewId", updateReview);

router.delete("/delete/:reviewId", deleteReview);

export default router;
