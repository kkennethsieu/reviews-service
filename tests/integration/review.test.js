import request from "supertest";
import app from "../../src/app.js";
import db from "../../src/db/db.js";

// Helper function to create a review in DB
function createTestReview() {
  const info = db
    .prepare(
      `
      INSERT INTO reviews (userId, gameId, reviewScore, reviewTitle, reviewBody, category)
      VALUES (?, ?, ?, ?, ?, ?)
    `
    )
    .run(1, "1", 9, "Great Game!", "Loved it", "Action");

  // Get the inserted row
  const review = db
    .prepare("SELECT * FROM reviews WHERE reviewId = ?")
    .get(info.lastInsertRowid);

  return review;
}

beforeEach(() => {
  // Reset table before each test
  db.prepare("DELETE FROM reviews").run();
});

afterAll(() => {
  db.close(); // close DB after all tests
});

// testing posting a review
describe("POST /reviews", () => {
  it("should create a review successfully", async () => {
    const newReview = {
      userId: 1,
      gameId: "1",
      reviewScore: 9,
      reviewTitle: "Great Game!",
      reviewBody: "Loved it",
      category: "Action",
    };

    const res = await request(app).post("/reviews/create").send(newReview);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("reviewId");
  });

  it("should fail if required fields are missing", async () => {
    const res = await request(app).post("/reviews/create").send({ userId: 1 });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("should fail if review score is not between 1 & 10", async () => {
    const newReview = {
      userId: 1,
      gameId: "1",
      reviewScore: 12,
      reviewTitle: "Great Game!",
      reviewBody: "Loved it",
      category: "Action",
    };

    const res = await request(app).post("/reviews/create").send(newReview);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});

//getting a review by reviewId
describe("GET /reviews/:reviewId", () => {
  it("should return a review by id", async () => {
    const review = createTestReview();
    const reviewId = review.reviewId;

    const res = await request(app).get(`/reviews/review/${reviewId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("reviewId", reviewId);
    expect(res.body.reviewTitle).toBe("Great Game!");
  });

  it("should return 404 if review does not exist", async () => {
    const res = await request(app).get("/reviews/review/9999");
    expect(res.status).toBe(404);
  });
});

// //getting all reviews by gameId
describe("GET /game/:gameId", () => {
  it("should return a review by gameId", async () => {
    const review = createTestReview();
    const gameId = review.gameId;

    const res = await request(app).get(`/reviews/game/${gameId}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("gameId", "1");
  });

  it("should return 404 if review does not exist", async () => {
    const res = await request(app).get("/reviews/game/9999");
    expect(res.status).toBe(404);
  });
});

// getting all reviews by userId
describe("GET /user/:userId", () => {
  it("should return a review by userId", async () => {
    const review = createTestReview();
    const userId = review.userId;

    const res = await request(app).get(`/reviews/user/${userId}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("userId", 1);
  });

  it("should return 404 if review does not exist", async () => {
    const res = await request(app).get("/reviews/user/9999");
    expect(res.status).toBe(404);
  });
});

// updating a review
describe("PATCH /update/:reviewId", () => {
  it("should update a review", async () => {
    const review = createTestReview();
    const reviewId = review.reviewId;

    const updatedReview = {
      reviewScore: 4,
      reviewTitle: "Poor Game!",
      reviewBody: "Hated it",
    };

    const res = await request(app)
      .patch(`/reviews/update/${reviewId}`)
      .send(updatedReview);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.updated.reviewScore).toBe(4);
  });

  it("should return 404 if review does not exist", async () => {
    const res = await request(app).patch("/reviews/update/9999");
    expect(res.status).toBe(404);
  });
});

//deleting a review

describe("DELETE /delete/:reviewId", () => {
  it("Should delete a review", async () => {
    const review = createTestReview();
    const reviewId = review.reviewId;
    const res = await request(app).delete(`/reviews/delete/${reviewId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Delete successful");
  });

  it("should return 404 if review does not exist", async () => {
    const res = await request(app).delete("/reviews/delete/9999");

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});
