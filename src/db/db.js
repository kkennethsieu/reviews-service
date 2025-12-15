import Database from "better-sqlite3";

let db;

if (process.env.NODE_ENV === "test") {
  db = new Database(":memory:"); // in-memory DB for tests
} else {
  db = new Database("./src/db/reviewdb.db");
}

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS reviews (
    reviewId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    gameId TEXT,
    reviewScore INTEGER,
    reviewTitle TEXT,
    reviewBody TEXT,
    category TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  )
`
).run();

export default db;
