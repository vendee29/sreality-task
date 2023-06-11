import { Client } from "pg";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import createTable from "./utils/createTable";
import scrapeAds from "./utils/scrapeAds";

dotenv.config();
const app = express();
const port = process.env.PORT;

export const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) ?? 5432,
});

client
  .connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

app.use(express.static(path.join(__dirname, "..", "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.get("/ads", async (req, res) => {
  try {
    await createTable();

    const countRowResult = await client.query("SELECT COUNT(*) FROM ads");
    const rowCount = parseInt(countRowResult.rows[0].count, 10);

    if (rowCount < 500) {
      const scrapedAds = await scrapeAds();
      await Promise.all(
        scrapedAds.map((ad) => {
          client.query("INSERT INTO ads (title, image_url) VALUES ($1, $2)", [
            ad.title,
            ad.imageUrl,
          ]);
        })
      );
    }

    const { page = 1, limit = 8 } = req.query;
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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
