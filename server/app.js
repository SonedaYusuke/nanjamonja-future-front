import express from "express";

import cors    from "cors";
import fs      from "fs";
import db      from "./database/init.js";
import crypto  from "crypto";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

const PORT = process.env.PORT;

app.get("/api/cards", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  db.serialize(() => {
    db.all("SELECT * FROM cards ORDER BY updated_at DESC", (err, rows) => {
      if (err) {
        console.error(err);
        res.status(400).json({ message: 'Error!' });
      }

      res.json({ cards: rows });
    })
  })
});

app.get("/api/cards/:id", (req, res) => {
  res.setHeader("Content-Type", "image/jpeg");
  res.sendFile("./assets/cards/" + req.params.id + ".jpg");
});

app.post("/api/cards", (req, res) => {
  db.serialize(() => {
    const uuid = crypto.randomUUID()
    db.run(`INSERT INTO cards(uuid, user_name) values("${uuid}", "${req.body.user_name}")`);
    try {
      fs.writeFileSync(
        `./assets/cards/${uuid}.jpg`,
        req.body.data_uri.replace(/^data:image\/\w+;base64,/, ""),
        { encoding: "base64" }
        );
        res.setHeader("Content-Type", "application/json");
        res.json({ message: "Success!" });
    } catch(err) {
      console.error(err);
      res.status(400).json({ message: 'Error!' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
