import pg from "pg";
import DatabaseException from "../exceptions/DatabaseException";
import { logError } from "../utils/Utils";
const { Pool } = pg;
import { dbConfig } from "./DbConfig";

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
  } catch (error: any) {
    logError(error.message)
    throw new DatabaseException(500, "Internal Server Error");
  }
}
