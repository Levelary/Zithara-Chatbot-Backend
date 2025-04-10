// connecting to mysql database with ssl certificate
import mysql from "mysql2";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const ca = fs.readFileSync(
  path.join(
    __dirname,
    process.env.CERT_PATH ? process.env.CERT_PATH : "../cert/isrgrootx1.pem"
  )
);

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 2,
  queueLimit: 0,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 4000,
  dateStrings: true,
  ssl: {
    ca: ca,
  },
});
