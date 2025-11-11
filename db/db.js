import Database from "better-sqlite3"

const db = new Database("./db/reviewdb.db");

try {
    db.prepare(
        "CREATE TABLE IF NOT EXISTS reviews (reviewId INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, gameId INTEGER, reviewScore INTEGER, review TEXT)"
    ).run();

    // db.exec(
    //     "INSERT into reviews (userId, gameId, reviewScore, review) VALUES (111, 222, 8, 'This game was great!')"
    // )

} catch (error) {
    console.log("Error creating reviews table:", error);
}

export default db;