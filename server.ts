import cheerio from "cheerio";
import { Client } from "pg";

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "sreality",
  password: "password",
  port: 5432,
});
