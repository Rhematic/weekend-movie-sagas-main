const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
  const query = `SELECT * FROM genres ORDER BY "name" ASC`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all genres", err);
      res.sendStatus(500);
    });
});

router.get("/:id", (req, res) => {
  const query = `SELECT "genres"."name" FROM "movies_genres"
  JOIN "genres" ON "genres"."id" = "movies_genres"."genre_id"
  WHERE "movies_genres"."movie_id" = $1;`;
  pool
    .query(query, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get movie details", err);
      res.sendStatus(500);
    });
});
