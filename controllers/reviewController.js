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
export const createReview = () => {};


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
