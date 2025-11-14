import db from "../db/db.js";

// Louie
export const getReview = () => {};

// Abraham
export const createReview = () => {};

// Jordan
export const deleteReview = (reviewId) => {
    return db.prepare("DELETE FROM reviews WHERE reviewId = ?").run(reviewId)
};