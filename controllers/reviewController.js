import db from "../db/db.js"
import dotenv from "dotenv"
import * as ReviewModel from "../models/reviewModel.js";  

dotenv.config();

export const serverStatus = (req, res) => {
    res.json({ message: "Server is running", status: "OK"});
}

// Louie
export const getReview = () => {};

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
