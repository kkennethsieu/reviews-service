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
  // db.exec("DROP TABLE reviews");
  // db.exec(`
  //   INSERT INTO reviews (userId, gameId, reviewScore, reviewTitle, reviewBody, category)
  //   VALUES
  //     (
  //       19,
  //       '1145360',
  //       8,
  //       'Unique and Refreshing',
  //       'This game surprised me in the best way possible. The mechanics feel incredibly fresh compared to the typical titles in this genre. The movement system feels smooth, the progression loop is satisfying, and the overall presentation keeps you hooked for hours. There are a few areas where the pacing slows down, but the creativity and charm easily outweigh the rough edges. Definitely worth playing if you enjoy games that take risks.',
  //       'Highly Recommended'
  //     ),
  //     (
  //       19,
  //       '427520',
  //       7,
  //       'Good but Slow in Places',
  //       'A very solid experience with strong core gameplay, but the pacing holds it back from greatness. Some levels feel drawn out, and a few mechanics don’t get introduced until very late in the campaign. Still, when the game hits its stride, it is genuinely fun and rewarding. With a few balance tweaks, this could easily climb into the top tier of the genre.',
  //       'Recommended'
  //     ),
  //     (
  //       19,
  //       '782330',
  //       9,
  //       'Fantastic and Memorable',
  //       'One of the most enjoyable games I’ve played in a long time. The atmosphere is top-notch, the soundtrack sets the tone perfectly, and the gameplay constantly keeps you engaged. Boss fights are intense and memorable, and the story beats land really well. There are small bugs here and there, but nothing that breaks immersion. Easily a must-play for fans of the genre.',
  //       'Critically Acclaimed'
  //     ),
  //     (
  //       19,
  //       '548430',
  //       6,
  //       'Fun but Unpolished',
  //       'The game has a solid foundation and a fun core loop, but it struggles with consistency. Some missions feel amazing, full of action and creativity, while others feel rushed or lacking in direction. The potential is definitely there, and future updates might elevate it significantly. For now, it is enjoyable but clearly imperfect.',
  //       'Mixed'
  //     ),
  //     (
  //       19,
  //       '1174180',
  //       10,
  //       'An Absolute Masterpiece',
  //       'From beginning to end, this game delivers an experience that is both emotionally captivating and mechanically satisfying. Every detail, from the sound design to the world-building, feels handcrafted with intent. The story is powerful and unpredictable, and the gameplay complements it beautifully. This is one of those rare titles that stays with you long after the credits roll.',
  //       'Masterpiece'
  //     );
  // `);
  // const row = db.prepare(`SELECT * FROM REVIEWS`).all();
  // console.log(row);
  // db.exec(
  //     "DELETE FROM reviews WHERE reviewId = 4"
  // )
} catch (error) {
  console.log("Error creating reviews table:", error);
}

export default db;
