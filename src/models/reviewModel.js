import db from "../db/db.js";

//get review by id
export const getReviewById = (reviewId) => {
  try {
    const stmt = db.prepare(`SELECT * FROM reviews WHERE reviewId = ?`);
    const review = stmt.get(reviewId);

    if (!review) throw new Error("Review not found");

    return review;
  } catch (err) {
    throw new Error(err.message || "Error fetching review by ID");
  }
};

// Get all reviews for a specific game
export const getReviewsByGame = (gameId) => {
  try {
    const stmt = db.prepare(`
      SELECT reviewId, userId, gameId, reviewScore, reviewTitle, reviewBody, category, createdAt
      FROM reviews
      WHERE gameId = ?
      ORDER BY createdAt DESC
    `);
    const reviews = stmt.all(gameId);

    if (!reviews || reviews.length === 0)
      throw new Error("No reviews found for this game");

    return reviews;
  } catch (err) {
    throw new Error(err.message || "Error fetching reviews by game");
  }
};

// Get all reviews for a specific user
export const getReviewsByUser = (userId) => {
  try {
    const stmt = db.prepare(`
      SELECT reviewId, userId, gameId, reviewScore, reviewTitle, reviewBody, category, createdAt
      FROM reviews
      WHERE userId = ?
      ORDER BY createdAt DESC
    `);
    const reviews = stmt.all(userId);

    if (!reviews || reviews.length === 0)
      throw new Error("No reviews found for this user");

    return reviews;
  } catch (err) {
    throw new Error(err.message || "Error fetching reviews by user");
  }
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

  const result = db.prepare(sql).run(...values);

  if (result.changes === 0) throw new Error("Review not found");

  // fetch the updated review
  const updatedReview = db
    .prepare("SELECT * FROM reviews WHERE reviewId = ?")
    .get(reviewId);

  return updatedReview;
};

// Delete a review by its ID
export const deleteReview = (reviewId) => {
  return db.prepare("DELETE FROM reviews WHERE reviewId = ?").run(reviewId);
};
