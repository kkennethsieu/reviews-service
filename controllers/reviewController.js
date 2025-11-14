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
    res.send(`Attempted to delete reviewId ${reviewId} with result ${JSON.stringify(result)}`);
};
