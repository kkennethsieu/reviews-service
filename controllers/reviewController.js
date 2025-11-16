import dotenv from "dotenv"
import * as ReviewModel from "../models/reviewModel.js";  

dotenv.config();

export const serverStatus = (req, res) => {
    res.json({ message: "Server is running", status: "OK"});
}

// Louie
export const getReviewsByGame = async (req, res) => {
    const game = req.params.gameId;
    const result = ReviewModel.getReviewsByGame(game);
    console.log("Getting reviews by game: ", game);
    return res.status(200).json(result);
};

// Louie
export const getReviewsByUser = async (req, res) => {
    const user = req.params.userId;
    const result = ReviewModel.getReviewsByUser(user);
    console.log("Getting reviews by user: ", user);
    return res.status(200).json(result);
};

// Abraham
export const createReview = async (req, res) => {
    try {
        const { userId, gameId, reviewScore, review } = req.body;
        
        // Validate required fields
        if (!userId || !gameId || reviewScore === undefined || !review) {
            return res.status(400).json({ 
                message: "Missing required fields: userId, gameId, reviewScore, and review are all required" 
            });
        }
        
        // Validate reviewScore is between 1-10
        if (reviewScore < 1 || reviewScore > 10) {
            return res.status(400).json({ 
                message: "Review score must be between 1 and 10" 
            });
        }
        
        const result = ReviewModel.createReview(userId, gameId, reviewScore, review);
        console.log("Creating review for user:", userId, "game:", gameId);
        
        if (result.changes > 0) {
            res.status(201).json({ 
                message: "Review created successfully", 
                reviewId: result.lastInsertRowid 
            });
        } else {
            res.status(500).json({ message: "Failed to create review" });
        }
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Jordan
export const deleteReview = (req, res) => {
    const reviewId = req.params.reviewId;
    const result = ReviewModel.deleteReview(reviewId)
    console.log(result)
    if (result.changes > 0) {
        res.status(200).json({message: `Delete successful`});
    }
    else {
        res.status(404).json({message: `Review not found`});
    }
};
