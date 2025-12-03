import db from "../db/db.js";

//get review by id

export const getReviewById = (reviewId) => {
  const stmt = db.prepare(`SELECT * FROM reviews WHERE reviewId = ?`);
  const data = stmt.get(reviewId);
  return data;
};
// Get all reviews for a specific game
export const getReviewsByGame = (gameId) => {
  return db
    .prepare(
      "SELECT reviewId, userId, gameId, reviewScore, reviewTitle, reviewBody, category, createdAt FROM reviews WHERE gameId = ? ORDER BY createdAt DESC"
    )
    .all(gameId);
};

// Get all reviews for a specific user
export const getReviewsByUser = (userId) => {
  return db
    .prepare(
      "SELECT reviewId, userId, gameId, reviewScore, reviewTitle, reviewBody, category, createdAt FROM reviews WHERE userId = ? ORDER BY createdAt DESC"
    )
    .all(userId);
};

// Create a new review
export const createReview = (
  userId,
  gameId,
  reviewScore,
  reviewTitle,
  reviewBody,
  category
) => {
  return db
    .prepare(
      "INSERT INTO reviews (userId, gameId, reviewScore, reviewTitle, reviewBody, category) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .run(userId, gameId, reviewScore, reviewTitle, reviewBody, category);
};

//Update a review

export const updateReview = (
  reviewId,
  reviewScore,
  reviewTitle,
  reviewBody,
  category
) => {
  const fields = [];
  const values = [];

  if (reviewScore !== undefined) {
    fields.push("reviewScore = ?");
    values.push(reviewScore);
  }
  if (reviewTitle !== undefined) {
    fields.push("reviewTitle = ?");
    values.push(reviewTitle);
  }
  if (reviewBody !== undefined) {
    fields.push("reviewBody = ?");
    values.push(reviewBody);
  }
  if (category !== undefined) {
    fields.push("category = ?");
    values.push(category);
  }
  if (fields.length === 0) return;

  values.push(reviewId);

  const sql = `UPDATE reviews SET ${fields.join(", ")} WHERE reviewId = ?`;

  return db.prepare(sql).run(...values);
};

// Delete a review by its ID
export const deleteReview = (reviewId) => {
  return db.prepare("DELETE FROM reviews WHERE reviewId = ?").run(reviewId);
};
