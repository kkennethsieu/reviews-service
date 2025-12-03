import dotenv from "dotenv";
import * as ReviewModel from "../models/reviewModel.js";

dotenv.config();

export const serverStatus = (req, res) => {
  res.json({ message: "Server is running", status: "OK" });
};

//get review by id
export const getReviewsById = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const result = ReviewModel.getReviewById(reviewId);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get reviews by game
export const getReviewsByGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    const result = ReviewModel.getReviewsByGame(gameId);
    console.log("Getting reviews by game:", gameId);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

// Get reviews by user
export const getReviewsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = ReviewModel.getReviewsByUser(userId);
    console.log("Getting reviews by user:", userId);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

// Create review
export const createReview = async (req, res) => {
  try {
    const { userId, gameId, reviewScore, reviewTitle, reviewBody, category } =
      req.body;

    // Validate required fields
    if (
      !userId ||
      !gameId ||
      reviewScore === undefined ||
      !reviewBody ||
      !reviewTitle ||
      !category
    ) {
      return res.status(400).json({
        message:
          "Missing required fields: userId, gameId, reviewScore, reviewTitle, reviewBody, category",
      });
    }

    // Validate score
    if (reviewScore < 1 || reviewScore > 10) {
      return res
        .status(400)
        .json({ message: "Review score must be between 1 and 10" });
    }

    const result = ReviewModel.createReview(
      userId,
      gameId,
      reviewScore,
      reviewTitle,
      reviewBody,
      category
    );
    console.log("Creating review for user:", userId, "game:", gameId);

    if (result.changes > 0) {
      res.status(201).json({
        message: "Review created successfully",
        reviewId: result.lastInsertRowid,
      });
    } else {
      res.status(500).json({ message: "Failed to create review" });
    }
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete review
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const result = ReviewModel.deleteReview(reviewId);

    if (result.changes > 0) {
      res.status(200).json({ message: "Delete successful" });
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Review

export const updateReview = async (req, res) => {
  try {
    const { userId, gameId, reviewScore, reviewTitle, reviewBody, category } =
      req.body;
    const { reviewId } = req.params;

    const result = ReviewModel.updateReview(
      reviewId,
      reviewScore,
      reviewTitle,
      reviewBody,
      category
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json({ success: true, updated: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
