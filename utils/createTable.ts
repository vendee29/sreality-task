import { client } from "../server";

async function createTable() {
  try {
    await client.query(
      "CREATE TABLE IF NOT EXISTS ads ( id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, image_url VARCHAR(255) NOT NULL )"
    );
  } catch (error) {
    console.error("Error creating table:", error);
    throw error;
  }
}

export default createTable;
