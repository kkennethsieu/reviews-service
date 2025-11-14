import db from "../db/db.js"
import dotenv from "dotenv"
dotenv.config();

export const serverStatus = (req, res) => {
    res.json({ message: "Server is running", status: "OK"});
}

// Louie
export const getReview = () => {};

// Abraham
export const createReview = () => {};
// export const updateReview = () => {};

// Jordan
export const deleteReview = () => {};
// export const getScore = () => {};