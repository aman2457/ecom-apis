import * as dotenv from "dotenv";
dotenv.config();

export const dbConfig = {
  user: process.env.PGUSER,
  host: process.env.HOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PORT,
};