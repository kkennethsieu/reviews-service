import db from "../db/db.js"
import dotenv from "dotenv"
dotenv.config();

export const serverStatus = (req, res) => {
    res.json({ message: "Server is running", status: "OK"});
}
export const getReview = () => {};
export const createReview = () => {};
export const updateReview = () => {};
export const deleteReview = () => {};
export const getScore = () => {};