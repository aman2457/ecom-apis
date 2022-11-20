import { Pool } from "pg";
import { dbConfig } from "./dbConfig";

export async function getConnectedClient() {
  const client = new Pool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    port: parseInt(dbConfig.port || "5432"),
  });
  try {
    await client.connect();
    console.log("Db connection established...");
    return client;
  } catch (error) {
    console.log("Db connection failed...");
    throw error;
  }
}