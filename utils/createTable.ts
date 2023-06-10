import { client } from "../server";

async function createTable() {
  try {
    await client.query(
      "CREATE TABLE IF NOT EXISTS ads ( id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, image_url VARCHAR(255) NOT NULL )"
    );
    console.log("Table 'ads' created or already exists");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

export default createTable;