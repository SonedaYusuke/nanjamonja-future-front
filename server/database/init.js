import sqlite3 from "sqlite3";

const __dirname = new URL('.', import.meta.url).pathname;

const db = new sqlite3.Database(__dirname + "app.db");

db.serialize(() => {
  console.log('====== initialize database ======');
  // db.run('drop table if exists cards');
  db.run(`
    CREATE TABLE if not exists 
    cards(
      uuid TEXT PRIMARY KEY UNIQUE,
      user_name TEXT NOT NULL, 
      updated_at TEXT DEFAULT (datetime('now', 'localtime'))
    )
  `);
});

export default db;
