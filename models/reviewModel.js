import db from "../db/db.js";

// Louie
export const getReviewsByGame = (gameId) => {
  return db.prepare("SELECT userId, gameId, reviewScore, review FROM reviews WHERE gameId = ?").all(gameId);
};

//Louie
export const getReviewsByUser = (userId) => {
    return db.prepare("Select userId, gameId, reviewScore, review FROM reviews WHERE userId = ?").all(userId);
};

// Abraham
export const createReview = (userId, gameId, reviewScore, review) => {
  return db.prepare("INSERT INTO reviews (userId, gameId, reviewScore, review) VALUES (?, ?, ?, ?)").run(userId, gameId, reviewScore, review);
};

// Jordan
export const deleteReview = (reviewId) => {
    return db.prepare("DELETE FROM reviews WHERE reviewId = ?").run(reviewId)
};