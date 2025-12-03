import Database from "better-sqlite3";

const db = new Database("./db/reviewdb.db");

try {
  db.prepare(
    `CREATE TABLE IF NOT EXISTS reviews (
      reviewId INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      gameId TEXT,
      reviewScore INTEGER,
      reviewTitle TEXT,
      reviewBody TEXT,
      category TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )`
  ).run();
} catch (error) {
  console.log("Error creating reviews table:", error);
}

export default db;
