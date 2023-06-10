import { Client } from "pg";
import express from "express";
import createTable from "./utils/createTable";
import scrapeAds from "./utils/scrapeAds";
const app = express();

export const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "sreality",
  password: "password",
  port: 5432,
});

client
  .connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

app.get("/ads", async (req, res) => {
  try {
    await createTable();
    const ads = await scrapeAds();
    await Promise.all(
      ads.map((ad) => {
        client.query("INSERT INTO ads (title, image_url) VALUES ($1, $2)", [ad.title, ad.imageUrl])
      })
    )
    res.status(200).json({ message: "Ads saved to the database", ads });
  } catch (error) {
    console.error("Error scraping ads:", error);
    res.status(500).json({ error: "Failed to scrape ads" });
  }
});

app.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const countResult = await client.query("SELECT COUNT(*) FROM ads");
    const totalCount = countResult.rows[0].count;

    const queryResult = await client.query(
      "SELECT * FROM ads ORDER BY id OFFSET $1 LIMIT $2",
      [offset, limit]
    );

    const ads = queryResult.rows;
    const totalPages = Math.ceil(totalCount / Number(limit));

    res.status(200).json({ ads, totalPages });
  } catch (error) {
    console.error("Error retrieving ads:", error);
    res.status(500).json({ error: "Failed to retrieve ads" });
  }
});

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
